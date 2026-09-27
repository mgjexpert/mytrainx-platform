# FoodData Central ingestion — MyTrainX Kitchen

**Status:** production foundation ready  
**Canonical source:** USDA FoodData Central  
**Current FDC release checked:** Foundation Foods 04/2026  
**License:** CC0 / public domain

## Why this is two-stage

A search result is not a nutrition fact.

The MyTrainX ingestion process deliberately separates:

1. **candidate discovery**
2. **human/editorial approval of the FDC ID**
3. **nutrient import**
4. **nutrition review**
5. **recipe calculation**
6. **public numeric nutrition**

No search result automatically enables public calories/macros.

## Current database state

The 60 Kitchen recipes are being normalized into:

- canonical `food_items`
- positional `recipe_ingredients`
- unresolved composite/ambiguous ingredients

Current canonical nutrition layer:

- 60 public Kitchen recipes;
- 55 canonical `food_items` in review;
- the newest 20-recipe batch contributes 100 positional ingredient rows;
- 79 of those new rows already map to a canonical food;
- 21 remain intentionally unresolved/composite.

Canonical foods begin in `review` with:

- `fdc_mapping_status = pending`
- `numeric_nutrition_allowed = false`

Composite ingredients such as “alho, azeite e ervas” remain unresolved until decomposed.

## API key

FoodData Central requires a data.gov API key.

Set:

```bash
export FDC_API_KEY="..."
export NEXT_PUBLIC_SUPABASE_URL="..."
export SUPABASE_SERVICE_ROLE_KEY="..."
```

Never commit the FDC key or Supabase service key.

## Candidate discovery

One food:

```bash
node scripts/nutrition/fdc-map.mjs --food=brocolis
```

Persist candidate lists for editorial review:

```bash
node scripts/nutrition/fdc-map.mjs --food=brocolis --persist-candidates
```

The script searches only Foundation Foods and SR Legacy.

## Approval gate

After reviewing the candidates, set one explicit:

```json
{
  "fdc_approved_id": 1234567
}
```

inside that food item's metadata.

This approval step must not be automated from search rank alone.

## Import approved nutrient data

```bash
node scripts/nutrition/fdc-map.mjs --food=brocolis --import-approved
```

The importer stores selected nutrients per 100 g and keeps:

- food status = `review`
- numeric_nutrition_allowed = false
- nutrition_review_status = `pending`

Importing values does **not** publish macros.

## Public recipe nutrition gate

A recipe can expose numeric nutrition only after:

1. every material ingredient is mapped or intentionally excluded;
2. quantities are normalized to grams/mL using reviewed conversion rules;
3. each food has an approved FDC ID;
4. imported nutrients pass nutrition review;
5. calculation is reproducible per recipe and per serving;
6. the recipe nutrition review is approved.

## Source preference

For generic ingredients prefer, in order:

1. Foundation Foods when a semantically appropriate item exists;
2. SR Legacy where Foundation does not cover the food;
3. FNDDS when a prepared-food representation is specifically needed;
4. Branded Foods only for an explicitly branded product.

Do not silently mix branded-food label data into a generic canonical ingredient.
