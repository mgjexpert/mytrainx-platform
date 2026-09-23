# MyTrainX Agent Instructions

This file is authoritative for AI agents working in this repository.

## Mission

Build MyTrainX as an AI-first fitness platform. The AI Personal Trainer is the central product. WKT Militar is the first commercial training program inside the ecosystem.

## Source repositories

- Primary: `mgjexpert/mytrainx-platform`
- Reference/legacy: `mgjexpert/wkt-militar`

Do not modify the legacy WKT repository as part of MyTrainX feature work unless explicitly requested.

## Required reading

Before substantial changes:
1. Read `docs/product/platform-spec.json`.
2. Read `docs/architecture/MIGRATION.md`.
3. Read `docs/design/README.md`.
4. Inspect the relevant WKT source before porting functionality.

## Git

- Never develop substantial features directly on `main`.
- Use `feat/mytrainx-<feature>` or `fix/<feature>`.
- Keep `main` deployable.
- Run `npm run build` before PR.
- Do not merge broken checkout, auth, or workout playback.

## Supabase

- Use `@supabase/ssr` for Next.js SSR.
- Browser uses only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- Never expose `SUPABASE_SECRET_KEY` or legacy service-role credentials to client code.
- All tables in exposed schemas must have RLS enabled.
- Authorization policies must use row ownership/entitlements, not only `TO authenticated`.
- Never use user-editable metadata for authorization.
- Server auth guards must validate claims.
- Do not cache authenticated responses that can carry refreshed auth cookies.

## Payments

- XPayments calls are server-side only.
- `pending` is never paid.
- Persist local order/reference before creating the external PIX.
- Only final `succeeded` activates entitlement.
- Webhook handling must be idempotent.
- Never invent a webhook signature algorithm. Implement only the official XPayments scheme when documented.

## AI Trainer safety

The AI Trainer may support training organization, exercise education, motivation, program navigation and non-medical adaptations.

It must not diagnose medical conditions, prescribe medication, diagnose injuries, encourage extreme weight-loss protocols, or claim to replace licensed healthcare professionals.

## Visual system

Use the approved MyTrainX visual direction:
- black/charcoal
- neon green
- cinematic athletic imagery
- dense premium command-center interface
- minimal rounded SaaS styling
- AI Trainer visually dominant
- WKT military language stays inside the WKT program, not across the entire parent brand
