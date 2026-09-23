# ChatGPT Work / Coding Agent Handoff

You are implementing **MyTrainX** in:

`https://github.com/mgjexpert/mytrainx-platform.git`

Reference-only legacy project:

`https://github.com/mgjexpert/wkt-militar.git`

## Mandatory first steps

1. Read `AGENTS.md`.
2. Read all files under `docs/architecture/`.
3. Read `docs/product/mytrainx-platform-spec.json`.
4. Review `docs/design/README.md` and the supplied approved visual mockups.
5. Inspect the current feature branch and current `main` before modifying files.
6. Never guess secrets or database state.

## Current architectural decision

MyTrainX uses a dedicated Supabase project for:

- Postgres
- Auth
- RLS
- future Storage/Realtime where useful

Project ref:

`ltfecmiipwkvvrnzpbsg`

Use publishable keys in browser clients and secret key only in server-only code.

## First implementation objective

Deliver a stable MyTrainX shell while preserving WKT functionality.

Required:

- MyTrainX brand identity
- public homepage focused on AI Trainer
- MyTrainX Command Center at `/app`
- WKT visible as the first Program
- Supabase Magic Link/OTP authentication
- WKT workout playback preserved
- XPayments server-side PIX preserved
- mobile-first responsive behavior

Do not implement the full AI Trainer backend before the shell/auth/data contracts are stable.

## Design target

The Command Center must look like an immersive premium fitness console:

- dark charcoal/black
- neon green
- cinematic athlete imagery
- compact data panels
- strong condensed typography
- no generic SaaS appearance

Top-priority panels:

1. AI Trainer X
2. Your Progress
3. Today's Training
4. My Programs
5. MyTrainX Master
6. Library & Resources

## Quality gate

Before PR:

- `npm install`
- `npm run typecheck`
- `npm run build`
- desktop check
- mobile check
- checkout smoke test
- login smoke test
- WKT player smoke test
- ensure Preview uses mock payments

Open a PR with:
- screenshots
- implementation summary
- environment changes
- migration notes
- verification results
