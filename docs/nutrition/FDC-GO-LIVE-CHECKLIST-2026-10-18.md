# FoodData Central — Numeric Nutrition Go-Live Checklist

**Date:** 2026-10-18  
**Current Kitchen:** 60 public recipes  
**Structured recipe ingredients:** 303  
**Mapped to canonical foods:** 253  
**Unresolved/composite:** 50  
**Numeric nutrition:** intentionally unpublished

## Current blocker

`FDC_API_KEY` is not configured in the MyTrainX Vercel project.

No calories/macros should be guessed while this remains true.

## Canonical source

USDA FoodData Central:
https://fdc.nal.usda.gov/

## What is already ready

- canonical `food_items`;
- structured `recipe_ingredients`;
- mapping metadata;
- recipe/publication governance;
- numeric-nutrition gate;
- unresolved/composite states;
- provenance model.

## Mapping rule

Only map an ingredient directly when the food identity is sufficiently specific.

Examples that may map:
- banana;
- egg;
- cooked rice;
- olive oil;
- tomato.

Examples that must remain unresolved or be decomposed:
- “folhas”;
- “vegetais variados”;
- “leite ou bebida vegetal”;
- “pão ou wrap”;
- “alho, azeite e ervas”;
- generic fish where species/preparation materially changes the selected FDC food.

## Go-live sequence

1. Obtain a valid USDA FoodData Central API key.
2. Store `FDC_API_KEY` as a **sensitive** Vercel variable.
3. For each canonical food:
   - search FDC;
   - choose the correct data type/item;
   - record FDC ID;
   - record mapping rationale/version;
   - retain source provenance.
4. Convert recipe quantities to calculable mass/volume where possible.
5. Keep “to taste” ingredients out of numeric totals unless an explicit quantity exists.
6. Calculate nutrient totals from reviewed ingredient mappings.
7. Divide by the canonical serving count.
8. Record:
   - calculation version;
   - FDC data IDs;
   - calculation timestamp;
   - unresolved contribution warning where applicable.
9. Run nutrition review.
10. Publish numeric values only after review approval.

## Required nutrient baseline

At minimum, when valid:
- energy;
- protein;
- carbohydrate;
- total fat;
- fibre;
- sodium.

Additional nutrients may be shown only where calculation completeness is acceptable.

## Quality rules

- no fabricated macro values;
- no “high protein” claim based only on recipe name;
- no therapeutic claims;
- no extrapolation from a different food/preparation without recording that decision;
- unresolved ingredients remain visible in calculation metadata;
- brand-specific foods require brand-specific data when the difference matters.

## Acceptance criteria

- [ ] FDC API key configured;
- [ ] FDC IDs reviewed;
- [ ] units normalized;
- [ ] unresolved contributions documented;
- [ ] calculation tests pass;
- [ ] nutrition review approved;
- [ ] numeric values trace back to FDC records.
