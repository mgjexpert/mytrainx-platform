#!/usr/bin/env node
import { createClient } from "@supabase/supabase-js";

const FDC_API_KEY = process.env.FDC_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!FDC_API_KEY) throw new Error("FDC_API_KEY is required. Do not commit API keys.");
if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("SUPABASE URL and SUPABASE_SECRET_KEY (or legacy SUPABASE_SERVICE_ROLE_KEY) are required.");

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
const args = new Set(process.argv.slice(2));
const persistCandidates = args.has("--persist-candidates");
const importApproved = args.has("--import-approved");
const requestedSlug = process.argv.find((arg) => arg.startsWith("--food="))?.split("=")[1] ?? null;

const SEARCH_TERMS = {
  "abacate": "avocado raw",
  "abobora": "squash raw",
  "abobrinha": "zucchini raw",
  "arroz-cozido": "rice white cooked",
  "arroz-seco": "rice white dry",
  "atum-conserva-drenado": "tuna canned in water drained",
  "aveia": "oats rolled dry",
  "azeite": "olive oil",
  "banana": "banana raw",
  "batata-doce": "sweet potato raw",
  "batata": "potato raw",
  "brocolis": "broccoli raw",
  "cacau-po": "cocoa powder unsweetened",
  "canela": "cinnamon ground",
  "carne-bovina-moida": "ground beef raw",
  "carne-bovina-tiras": "beef raw lean",
  "castanhas": "tree nuts mixed",
  "cebola": "onion raw",
  "cenoura": "carrots raw",
  "chia": "chia seeds dry",
  "cottage": "cottage cheese",
  "couve": "kale raw",
  "cuscuz-milho-preparado": "corn couscous cooked",
  "ervilhas": "peas green cooked",
  "fruta-fresca-generica": "fruit raw",
  "espinafre": "spinach raw",
  "feijao-cozido": "beans cooked",
  "vagem": "green beans cooked",
  "file-peixe": "fish fillet raw",
  "frango-cozido-grelhado": "chicken breast cooked grilled",
  "frango-cru-sem-osso": "chicken breast raw boneless",
  "frango-cubos": "chicken breast raw",
  "frango-sem-pele": "chicken breast thigh skinless raw",
  "grao-de-bico-cozido": "chickpeas cooked",
  "iogurte-natural": "yogurt plain",
  "leite": "milk",
  "lentilha-cozida": "lentils cooked",
  "lentilha-seca": "lentils dry",
  "maca": "apple raw",
  "massa-seca": "pasta dry",
  "milho-cozido": "corn sweet cooked",
  "molho-soja": "soy sauce",
  "ovo": "egg whole raw",
  "pao": "bread",
  "pimentao": "peppers sweet raw",
  "pimentao-verde-vermelho": "peppers sweet raw",
  "pepino": "cucumber raw",
  "quinoa-cozida": "quinoa cooked",
  "ricota": "ricotta cheese",
  "salmao": "salmon raw",
  "sementes": "seeds mixed",
  "tofu-firme": "tofu firm",
  "tomate": "tomatoes raw",
  "tomate-passata": "tomato puree canned",
  "tortilha-wrap": "tortilla wheat"
};

const ALLOWED_DATA_TYPES = ["Foundation", "SR Legacy"];
const NUTRIENTS = {
  "208": { code: "energy_kcal", name: "Energy", unit: "kcal" },
  "203": { code: "protein_g", name: "Protein", unit: "g" },
  "204": { code: "fat_g", name: "Total lipid (fat)", unit: "g" },
  "205": { code: "carbohydrate_g", name: "Carbohydrate, by difference", unit: "g" },
  "291": { code: "fiber_g", name: "Fiber, total dietary", unit: "g" },
  "269": { code: "sugars_g", name: "Sugars, total", unit: "g" },
  "307": { code: "sodium_mg", name: "Sodium, Na", unit: "mg" }
};

async function fdc(path, options = {}) {
  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(`https://api.nal.usda.gov/fdc/v1${path}${separator}api_key=${encodeURIComponent(FDC_API_KEY)}`, options);
  if (!response.ok) throw new Error(`FDC ${response.status}: ${await response.text()}`);
  return response.json();
}

async function searchFood(food) {
  const query = SEARCH_TERMS[food.slug] || food.name;
  const result = await fdc("/foods/search", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query,
      dataType: ALLOWED_DATA_TYPES,
      pageSize: 5,
      sortBy: "score",
      sortOrder: "desc"
    })
  });
  return (result.foods || []).map((candidate) => ({
    fdc_id: candidate.fdcId,
    description: candidate.description,
    data_type: candidate.dataType,
    score: candidate.score ?? null,
    publication_date: candidate.publicationDate ?? null
  }));
}

async function persist(food, candidates) {
  const metadata = {
    ...(food.metadata || {}),
    fdc_mapping_status: "candidates_ready",
    fdc_candidate_query: SEARCH_TERMS[food.slug] || food.name,
    fdc_candidates: candidates,
    fdc_candidate_generated_at: new Date().toISOString(),
    numeric_nutrition_allowed: false
  };
  const { error } = await supabase.from("food_items").update({ metadata, updated_at: new Date().toISOString() }).eq("id", food.id);
  if (error) throw error;
}

async function importApprovedFood(food) {
  const approvedId = food.metadata?.fdc_approved_id;
  if (!approvedId) return { slug: food.slug, skipped: "no_fdc_approved_id" };

  const details = await fdc(`/food/${approvedId}`);
  if (!ALLOWED_DATA_TYPES.includes(details.dataType)) {
    throw new Error(`${food.slug}: approved FDC item has unsupported dataType ${details.dataType}`);
  }

  const rows = [];
  for (const entry of details.foodNutrients || []) {
    const nutrient = entry.nutrient || {};
    const wanted = NUTRIENTS[String(nutrient.number || "")];
    if (!wanted || entry.amount == null) continue;
    rows.push({
      food_id: food.id,
      nutrient_code: wanted.code,
      nutrient_name: wanted.name,
      amount_per_100g: entry.amount,
      unit: nutrient.unitName || wanted.unit,
      source_version: details.publicationDate || "FoodData Central",
      metadata: {
        fdc_id: String(approvedId),
        fdc_data_type: details.dataType,
        fdc_description: details.description,
        source: "USDA FoodData Central",
        license: "CC0-1.0"
      }
    });
  }

  if (!rows.length) throw new Error(`${food.slug}: no selected nutrients returned for approved FDC id ${approvedId}`);

  const { error: nutrientError } = await supabase.from("food_nutrients").upsert(rows, { onConflict: "food_id,nutrient_code" });
  if (nutrientError) throw nutrientError;

  const metadata = {
    ...(food.metadata || {}),
    fdc_mapping_status: "mapped_review",
    fdc_imported_at: new Date().toISOString(),
    fdc_data_type: details.dataType,
    fdc_description: details.description,
    numeric_nutrition_allowed: false,
    nutrition_review_status: "pending"
  };
  const { error: foodError } = await supabase.from("food_items").update({
    source_provider: "usda_fdc",
    source_external_id: String(approvedId),
    status: "review",
    metadata,
    updated_at: new Date().toISOString()
  }).eq("id", food.id);
  if (foodError) throw foodError;

  return { slug: food.slug, fdc_id: approvedId, nutrients: rows.length, status: "mapped_review" };
}

const { data: foods, error } = await supabase
  .from("food_items")
  .select("id,slug,name,status,metadata")
  .order("slug");
if (error) throw error;

const selected = requestedSlug ? (foods || []).filter((food) => food.slug === requestedSlug) : (foods || []);
if (!selected.length) throw new Error(requestedSlug ? `Food not found: ${requestedSlug}` : "No food_items found.");

if (importApproved) {
  for (const food of selected) console.log(JSON.stringify(await importApprovedFood(food)));
} else {
  for (const food of selected) {
    const candidates = await searchFood(food);
    console.log(JSON.stringify({ slug: food.slug, name: food.name, candidates }, null, 2));
    if (persistCandidates) await persist(food, candidates);
  }
}
