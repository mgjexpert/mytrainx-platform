# Release — Main-first V3.3

**Date:** 2026-10-04  
**Branch:** `main`  
**Mode:** continuous production delivery

## Delivered

### Progress
- accessible SVG weight trend line;
- trend area and point-level values;
- 7-day context panel;
- existing cautious composition language preserved.

### Library
- interactive public search;
- title/description/tag matching;
- type filters for Learn, Exercise and Kitchen;
- existing editorial sections remain canonical.

### WKT
- 21-mission player rail;
- completed/current state;
- program position;
- next-session panel;
- final-session check-in prompt.

### Access hardening
`getActiveEntitlement()` now applies both:
- authenticated-session user ID;
- explicit `user_id` query filter.

RLS remains active as a second authorization layer.

A TypeScript narrowing issue on the first access commit produced a Vercel build failure and was corrected immediately in `9edb411a0e6905633d9c8bac18eb169836430203`.

### Media integrity
Until dedicated production assets are supplied:
- Coach X uses branded abstract X art;
- login uses branded MyTrainX/X art;
- Progress uses product/data visualization;
- WKT workout photography stays in training/program contexts;
- no unrelated feature is presented using fake WKT photography.

## Canonical scale

- 50 public articles;
- 100 approved exercise guides;
- 60 public Kitchen recipes;
- 210 public primary Library items;
- 55 ready Knowledge documents;
- 363 Knowledge chunks;
- 5 active programs;
- HIIT remains inactive / AMBER.

## External blockers

1. Atendimento.Center token is absent in Vercel.
2. FDC_API_KEY is absent; 0/60 recipes have public numeric nutrition.
3. HIIT/foundation specialist review remains a human qualification gate.
4. Approved Drive folders for Coach X, Specialists and APP_UI are empty; non-WKT program bespoke media is not yet supplied.

These are not converted to GREEN by code alone.
