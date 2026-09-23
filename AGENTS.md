# AGENTS.md — MyTrainX

This file is mandatory reading for any AI coding agent or developer working in this repository.

## Mission

Build **MyTrainX** as a premium AI-first fitness platform.

The product hierarchy is:

1. **MyTrainX AI / "X"** — central Personal Trainer AI
2. Programs — WKT Militar is the first paid program
3. MyTrainX Master — recurring premium membership
4. Community
5. Library / manuals / ebooks
6. Events / live sessions / benefits

## Repository boundaries

- Work in `mgjexpert/mytrainx-platform`.
- Treat `mgjexpert/wkt-militar` as a stable reference and source of verified WKT assets/data.
- Do not make destructive changes to the production WKT repository as part of MyTrainX work.
- Preserve all verified Google Drive workout IDs.

## Branch and merge policy

- Never implement substantial features directly on `main`.
- Use `feat/mytrainx-<feature>`, `fix/<issue>`, or `chore/<task>`.
- Run typecheck + build before opening a PR.
- Preview must be checked before merge.
- Do not merge if login, checkout or WKT playback regresses.

## Security

- Never commit secrets.
- Browser may use only Supabase publishable key.
- Supabase secret key is server-only.
- XPayments API key is server-only.
- OpenAI/API provider keys are server-only.
- Enable RLS on every exposed Supabase table.
- Do not use user-editable metadata for authorization.
- Authorization must be based on verified auth identity + RLS/entitlements.

## Authentication

Use Supabase Auth + `@supabase/ssr`.

- Refresh session via Next.js 16 `proxy.ts`.
- Use `getClaims()` / verified identity for protected rendering.
- Preferred member flow: email Magic Link / OTP.
- /app must ultimately require both authentication and valid entitlement/access.

## Payments

Provider: XPayments PIX S2S.

- `6700` means R$67.00.
- `pending` never grants access.
- Only final succeeded state grants entitlement.
- Store unique reference and transaction ID.
- Validate reference, amount, currency, method and transaction ID.
- Webhook must be idempotent.
- Never invent a webhook signature scheme.

## Supabase

Dedicated MyTrainX project ref:

`ltfecmiipwkvvrnzpbsg`

Current connector/MCP access may not be available to every agent. If unavailable, do not invent database state. Work from schema docs and request/establish the correct project connection before applying DDL.

## Visual direction

Use the approved MyTrainX references.

Core visual language:

- black / charcoal
- neon green
- premium athletic photography
- dense command-center modules
- restrained glows
- sharp 4–8px radii
- strong condensed display type
- MyTrainX global brand is technological/performance-focused
- military language is limited to the WKT program

Do not produce a generic SaaS dashboard.

## AI Trainer safety

The AI Trainer can:

- explain workouts
- organize routines
- use owned-program context
- summarize progress
- adapt general non-medical training suggestions to time/equipment/preferences

It must not:

- diagnose injuries or medical conditions
- prescribe medication
- replace physicians/physiotherapists
- encourage dangerous/extreme protocols

## First implementation phases

1. Brand shell + Supabase foundation
2. Command Center
3. WKT as program
4. AI Trainer MVP
5. Master / Library / Community / Events
6. WhatsApp channel
