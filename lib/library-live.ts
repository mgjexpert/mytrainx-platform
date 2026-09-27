import { createClient } from "@/lib/supabase/server";
import {
  getLibraryItem,
  libraryLaunchItems,
  type LibraryItem,
  type RecipeDetails,
} from "@/lib/library-launch";
import { libraryExpansion2026 } from "@/lib/library-expansion-2026";
import { libraryExpansion2026B } from "@/lib/library-expansion-2026-b";
import { libraryExpansion2026C } from "@/lib/library-expansion-2026-c";

type RecipeRow = {
  content_id: string;
  meal_type: string | null;
  servings: number | string | null;
  ingredients: unknown;
  steps: unknown;
  allergens: string[] | null;
  nutrition: unknown;
  metadata: unknown;
};

type ExerciseRow = {
  slug: string;
  name: string;
  canonical_name: string | null;
  difficulty: string;
  equipment: string[];
  primary_muscles: string[];
  secondary_muscles: string[];
  movement_patterns: string[];
  body_regions: string[];
  instructions: unknown;
  coaching_cues: unknown;
  common_mistakes: unknown;
  safety_notes: unknown;
};

type ContentRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  summary: string | null;
  tags: string[] | null;
  topics: string[] | null;
  access_policy: string;
  reading_time_minutes: number | null;
  published_at: string | null;
  updated_at: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function textList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function amountText(quantity: unknown, unit: unknown) {
  const q = quantity === null || quantity === undefined ? "" : String(quantity);
  const u = typeof unit === "string" ? unit : "";
  if (!q && !u) return "a gosto";
  const units: Record<string, string> = {
    unit: "un.",
    portion: "porção",
    handful: "punhado",
    cup: "xíc.",
    tbsp: "col. sopa",
    tsp: "col. chá",
    liter: "L",
    ml: "ml",
    g: "g",
    can: "lata",
    to_taste: "a gosto",
  };
  const pretty = units[u] || u;
  return q ? `${q} ${pretty}`.trim() : pretty;
}

function recipeFromRow(row: RecipeRow, fallback?: RecipeDetails): RecipeDetails {
  const ingredientRows = Array.isArray(row.ingredients) ? row.ingredients : [];
  const ingredients = ingredientRows
    .filter(isRecord)
    .map((ingredient) => ({
      item: typeof ingredient.name === "string" ? ingredient.name : "Ingrediente",
      amount: amountText(ingredient.quantity, ingredient.unit),
    }));

  const metadata = isRecord(row.metadata) ? row.metadata : {};
  const substitutions = textList(metadata.substitutions);
  const storage = textList(metadata.storage);
  const steps = textList(row.steps);

  return {
    servings: row.servings ? `${row.servings} ${Number(row.servings) === 1 ? "porção" : "porções"}` : fallback?.servings || "—",
    prepTime: fallback?.prepTime || "Preparação prática",
    cookTime: fallback?.cookTime || "Consulte o modo de preparo",
    profile: fallback?.profile || [row.meal_type || "receita", "MyTrainX Kitchen"],
    ingredients: ingredients.length ? ingredients : fallback?.ingredients || [],
    steps: steps.length ? steps : fallback?.steps || [],
    substitutions: substitutions.length ? substitutions : fallback?.substitutions || [],
    storage: storage.length ? storage : fallback?.storage || [],
  };
}

function accessLabel(policy: string): LibraryItem["access"] {
  if (policy === "public") return "PUBLIC";
  if (policy === "master") return "MASTER";
  return "REGISTERED";
}

function dateLabel(value: string | null | undefined) {
  return value ? value.slice(0, 10) : "2026-09-26";
}

function prettyToken(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function getLiveApprovedExercises(): Promise<LibraryItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("exercises")
      .select("slug,name,canonical_name,difficulty,equipment,primary_muscles,secondary_muscles,movement_patterns,body_regions,instructions,coaching_cues,common_mistakes,safety_notes")
      .eq("status", "published")
      .eq("review_status", "approved")
      .order("name", { ascending: true });

    if (error || !data?.length) return [];

    return (data as ExerciseRow[]).map((row) => {
      const fallback = getLibraryItem(row.slug);
      const instructions = textList(row.instructions);
      const primary = row.primary_muscles.map(prettyToken);
      const pattern = row.movement_patterns.map(prettyToken).join(" · ") || "Movimento";
      return {
        slug: row.slug,
        type: "exercise" as const,
        title: row.name,
        eyebrow: "ENCICLOPÉDIA DE EXERCÍCIOS",
        description: `${pattern}. Guia de execução, cues, erros comuns e segurança para uso educacional geral.`,
        readTime: "4 min",
        access: "PUBLIC" as const,
        featured: false,
        tags: [
          prettyToken(row.difficulty),
          ...row.movement_patterns.slice(0, 1).map(prettyToken),
          ...row.body_regions.slice(0, 1).map(prettyToken),
        ],
        updated: "2026-09-26",
        exercise: {
          movementPattern: pattern,
          difficulty: prettyToken(row.difficulty),
          equipment: row.equipment.map(prettyToken),
          primaryMuscles: primary,
          secondaryMuscles: row.secondary_muscles.map(prettyToken),
          setup: instructions.length ? [instructions[0]] : [],
          execution: instructions.length > 1 ? instructions.slice(1) : instructions,
          cues: textList(row.coaching_cues),
          mistakes: textList(row.common_mistakes),
          regressions: fallback?.exercise?.regressions || [],
          progressions: fallback?.exercise?.progressions || [],
          safety: textList(row.safety_notes),
        },
        sources: [{
          label: "ACSM — Resistance Training Guidelines Update, 2026",
          url: "https://acsm.org/resistance-training-guidelines-update-2026/",
        }],
      };
    });
  } catch {
    return [];
  }
}

export async function getLivePublicRecipes(): Promise<LibraryItem[]> {
  try {
    const supabase = await createClient();
    const { data: contents, error } = await supabase
      .from("content_items")
      .select("id,slug,title,subtitle,summary,tags,topics,access_policy,reading_time_minutes,published_at,updated_at")
      .eq("content_type", "recipe")
      .eq("status", "published")
      .eq("access_policy", "public")
      .order("featured", { ascending: false })
      .order("sort_priority", { ascending: false })
      .order("title", { ascending: true });

    if (error || !contents?.length) return [];

    const ids = contents.map((item) => item.id);
    const { data: recipes, error: recipeError } = await supabase
      .from("recipes")
      .select("content_id,meal_type,servings,ingredients,steps,allergens,nutrition,metadata")
      .in("content_id", ids);

    if (recipeError) return [];

    const recipeByContent = new Map(
      ((recipes || []) as RecipeRow[]).map((recipe) => [recipe.content_id, recipe] as const)
    );

    return (contents as ContentRow[]).flatMap((content) => {
      const recipe = recipeByContent.get(content.id);
      if (!recipe) return [];

      const fallback = getLibraryItem(content.slug);
      return [{
        slug: content.slug,
        type: "recipe" as const,
        title: content.title,
        eyebrow: "MYTRAINX KITCHEN",
        description: content.summary || content.subtitle || "Receita original MyTrainX.",
        readTime: content.reading_time_minutes ? `${content.reading_time_minutes} min` : "5 min",
        access: accessLabel(content.access_policy),
        featured: fallback?.featured || false,
        tags: content.tags || content.topics || [],
        updated: dateLabel(content.published_at || content.updated_at),
        recipe: recipeFromRow(recipe, fallback?.recipe),
      }];
    });
  } catch {
    return [];
  }
}

export async function getUnifiedLibraryItems(): Promise<LibraryItem[]> {
  const [liveRecipes, liveExercises] = await Promise.all([
    getLivePublicRecipes(),
    getLiveApprovedExercises(),
  ]);
  const liveSlugs = new Set([...liveRecipes, ...liveExercises].map((item) => item.slug));
  const publishableStatic = [...libraryLaunchItems, ...libraryExpansion2026, ...libraryExpansion2026B, ...libraryExpansion2026C].filter(
    (item) =>
      item.type !== "exercise" &&
      (item.type !== "recipe" || !liveSlugs.has(item.slug))
  );
  return [...publishableStatic, ...liveExercises, ...liveRecipes];
}

export async function getUnifiedLibraryItem(slug: string): Promise<LibraryItem | undefined> {
  const [liveRecipes, liveExercises] = await Promise.all([
    getLivePublicRecipes(),
    getLiveApprovedExercises(),
  ]);
  const liveRecipe = liveRecipes.find((item) => item.slug === slug);
  if (liveRecipe) return liveRecipe;

  const liveExercise = liveExercises.find((item) => item.slug === slug);
  if (liveExercise) return liveExercise;

  const expansion = [...libraryExpansion2026, ...libraryExpansion2026B, ...libraryExpansion2026C].find((item) => item.slug === slug);
  if (expansion) return expansion;

  const fallback = getLibraryItem(slug);
  if (!fallback || fallback.type === "exercise") return undefined;
  return fallback;
}
