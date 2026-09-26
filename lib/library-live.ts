import { createClient } from "@/lib/supabase/server";
import {
  getLibraryItem,
  libraryLaunchItems,
  type LibraryItem,
  type RecipeDetails,
} from "@/lib/library-launch";

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
  const liveRecipes = await getLivePublicRecipes();
  const liveSlugs = new Set(liveRecipes.map((item) => item.slug));
  const staticWithoutLiveRecipes = libraryLaunchItems.filter(
    (item) => item.type !== "recipe" || !liveSlugs.has(item.slug)
  );
  return [...staticWithoutLiveRecipes, ...liveRecipes];
}

export async function getUnifiedLibraryItem(slug: string): Promise<LibraryItem | undefined> {
  const liveRecipes = await getLivePublicRecipes();
  return liveRecipes.find((item) => item.slug === slug) || getLibraryItem(slug);
}
