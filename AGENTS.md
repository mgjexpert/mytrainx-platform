# AGENTS.md — MyTrainX

This file is mandatory reading for any AI coding agent or developer working in this repository.

## Mandatory startup sequence

Before changing code:

1. Read `docs/README.md`.
2. Read `docs/status/CURRENT.md`.
3. Read `docs/governance/OWNERSHIP.md`.
4. Read `docs/roadmap/MASTER-ROADMAP.md`.
5. Identify the stage you are implementing.
6. Read relevant ADRs.
7. Fetch current `main` and verify there is no overlapping active work.

Do not infer current architecture from an old chat alone.

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

## Agent-platform boundary

MyTrainX does **not** own the shared Agent Runtime.

Target architecture:

```
MyTrainX UI / Backend
  -> Atendimento.Center Agent Gateway
  -> Agent Runtime / Trainer X
  -> approved tool
  -> MyTrainX Internal API
  -> Supabase
```

MyTrainX owns fitness/domain rules and data. Atendimento.Center owns agent orchestration, conversations, operational memory, channels and handoff.

Never give the LLM unrestricted direct database access.

## Branch and merge policy

- Never implement substantial features directly on `main`.
- Use branch names documented in `docs/governance/WORKFLOW.md`.
- Run typecheck + build before PR.
- Preview must be checked before merge.
- Do not merge if login, checkout or WKT playback regresses.
- A merge is not automatically a VALIDATED stage.

## Security

- Never commit secrets.
- Browser may use only Supabase publishable key.
- Supabase secret key is server-only.
- XPayments API key is server-only.
- AI/model provider keys are server-only.
- Enable RLS on every exposed Supabase user-data table.
- Do not use user-editable metadata for authorization.
- Authorization must be based on verified identity + explicit scopes/RLS/entitlements.
- Agent tools must derive authoritative user identity from authenticated server context.

## Authentication

Use Supabase Auth + `@supabase/ssr`.

- Refresh session via Next.js 16 `proxy.ts`.
- Use verified identity for protected rendering.
- Preferred member flow: email Magic Link / OTP.
- `/app` must ultimately require authentication and valid product access where applicable.

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

Connector/MCP access may not be available to every agent. If unavailable, do not invent database state. Prepare versioned migration SQL and require execution/validation against the real project.

## Visual direction

Use approved assets from the creative track.

Current primary direction:

> **BLACK PERFORMANCE SYSTEM + MYTRAINX ORANGE**

Core visual language:

- black / charcoal / graphite foundations
- controlled proprietary MyTrainX orange as the primary brand accent
- premium realistic athletic photography
- dense command-center modules
- restrained warm orange glows
- sharp 4–8px product radii
- strong condensed display type
- MyTrainX global brand is technological / performance-focused / human
- semantic green is reserved for genuine success states
- MyTrainX Master may use restrained premium gold
- military language is limited to the WKT program

The previous neon-green identity is **SUPERSEDED — STRUCTURE REFERENCE**. Preserve its information hierarchy where useful, not its primary brand color.

Read `docs/design/MYTRAINX_VISUAL_SYSTEM_V1_ORANGE.json` and `docs/handoff/MYTRAINX_GPT_WORK_VISUAL_DIRECTION_V1.md` before visual implementation.

Do not produce a generic SaaS dashboard or a local-gym website.

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

## Current first integration target

The first validated Agent milestone is:

1. authenticated member opens `/app/trainer`;
2. asks “Qual meu treino hoje?”;
3. Atendimento.Center streams a Trainer X run;
4. X invokes `get_today_workout`;
5. MyTrainX authorizes and reads real data;
6. X responds through SSE;
7. conversation/run is persisted and traceable.
