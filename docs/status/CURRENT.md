# Current Project State

**Project version:** 0.3.0-orange-v1-kickoff  
**State date:** 2026-09-26  
**Overall status:** IN PROGRESS

## Product

MyTrainX is the parent fitness platform. The visible primary AI persona is **X — Your Personal AI Trainer**. WKT Militar is the first commercial training program.

## Repository

Primary:
`mgjexpert/mytrainx-platform`

Reference/legacy:
`mgjexpert/wkt-militar`

Current validated bootstrap commit before this documentation branch:
`be723ee3ddf9376b2cf08e5e686181d73621ded0`

CI on that main commit: successful.

## Current architecture decisions

- Next.js/PWA remains the MyTrainX product frontend.
- Supabase is the current selected MyTrainX database/auth/RLS platform.
- Vercel remains selected for the current Next.js deployment path.
- XPayments remains the PIX provider.
- Full WKT videos remain on Google Drive during MVP; dedicated video streaming remains a future migration.
- Atendimento.Center will evolve into the central Agent & Conversation platform.
- MyTrainX will NOT create a duplicate Agent Runtime.
- MyTrainX will expose an authenticated Internal Domain API to agent tools.
- WebChat UI belongs to MyTrainX; Chatwoot is not the Trainer X frontend.
- SSE is the initial streaming protocol for Trainer X WebChat.
- X is one main visible persona with skills; Support and Community can become separate agents.
- WhatsApp Evolution/Baileys can be used for pilots; commercial 1:1 should migrate toward official Meta infrastructure.
- WhatsApp Communities are not a critical product dependency.

## Active parallel tracks

### Track A — Product & Data
Next objective:
Supabase production foundation + domain schema/RLS.

### Track B — Agent Platform
Next objective:
Atendimento.Center Agent Core contract and runtime foundation.

### Track C — Integration
Next objective:
MyTrainX Internal API contract + first Trainer X vertical slice.

### Track E — Content & Knowledge
**IN PROGRESS**

Implementation branch:
`feat/content-knowledge-foundation-v1`

Live Supabase foundation now includes:
- canonical source registry and rights/review governance;
- content collections and taxonomy;
- per-user library state;
- **30 canonical PT-BR exercises**, all still in review/pending and therefore not publicly exposed;
- **12 structured MyTrainX Kitchen recipes** with owned/verified rights and nutrient values intentionally blocked pending FoodData Central mapping/review;
- food/nutrient entities and normalized recipe ingredients;
- **5 ready knowledge documents / 127 knowledge chunks** across the owned knowledge core;
- owned foundation ebooks: Treino de Força sem Complicação, Nutrição sem Ruído, Progress sem Ruído and Recovery sem Ruído;
- **MyTrainX Start — 4 Weeks** as an inactive program with 12 workouts, 12 scheduled days and gated Coach X knowledge;
- initial inventory of the two supplied Google Drive roots;
- full index of the public-domain wrkout exercise source (873 source exercises) plus a curated 114-item localization/review queue;
- quarantine/reference-only states so third-party or clinical material is not silently published.

Data manifests and ingestion tooling are developed separately in `mgjexpert/mytrainx-data` on `feat/library-registry-v1`.

Library V2 is now the canonical product direction:
- product architecture: `docs/product/MYTRAINX-LIBRARY-SYSTEM-V2.md`;
- data operating model: `mytrainx-data/docs/LIBRARY-OPERATING-MODEL-V2.md`;
- master acquisition plan: `mytrainx-data/manifests/library/library-master-plan.v1.json`;
- taxonomy: `mytrainx-data/taxonomy/library-taxonomy.v2.json`.

The library target now explicitly includes public/member surfaces, Exercise Encyclopedia, MyTrainX Kitchen, learning paths, individually sold digital products, Master collections, program resources and entitlement-aware Coach X retrieval.

Library delivery now has two implementation layers:
- PR #19 / `feat/library-fast-launch-v1`: static editorial bridge;
- PR #22 / `feat/library-live-catalog-v1`: stacked live-catalog evolution where MyTrainX Kitchen reads published public recipes directly from Supabase while unreviewed exercises remain hidden.

MyTrainX Progress is also active as a parallel product/data track on PR #20 / `feat/progress-system-v1`, covering user-configurable body tracking, weekly check-ins, goals and private progress photos.

### Track D — Creative / Product UI
**APPROVED DIRECTION / IMPLEMENTATION START**

Current primary visual direction:
- BLACK PERFORMANCE SYSTEM + MYTRAINX ORANGE
- previous neon-green system is structural reference only
- Coach X remains the central product
- Sara is the verified real human Concierge & Community layer
- specialist coaches remain AI personas

Implementation branch:
`feat/orange-visual-system-v1`

GPT Work must begin with the repository audit defined in:
`docs/handoff/MYTRAINX_GPT_WORK_VISUAL_DIRECTION_V1.md`

Reusable foundations and the public landing are now implemented on the orange branch. Command Center/shared public/member chrome has also been converted to the orange system. PR #10 remains Draft pending final preview review and connected-environment regression checks.

## Architecture realignment — V2

Canonical realignment document:
`docs/architecture/MYTRAINX-REALIGNMENT-V2.md`

The project is now explicitly centered on:
- conversational AI with layered memory;
- structured programs such as WKT;
- Library & Knowledge (ebooks, recipes, manuals, videos and other didactic materials);
- entitlement-aware AI retrieval;
- Supabase as domain source of truth;
- Atendimento.Center as reusable Agent Runtime / conversation / operational-memory platform.

Do not continue building placeholder UX ahead of domain/tool foundations.

## Immediate P0 architecture milestone

1. validate MyTrainX Supabase project access — project `oitfnnsfgaxcxqvizorw` is now connected and empty;
2. implement A1 schema/RLS on `oitfnnsfgaxcxqvizorw`;
3. migrate WKT catalogue into domain data;
4. define content registry and source inventory;
5. implement A2 Internal Agent API contracts;
6. implement Atendimento.Center B1 Agent Core;
7. deliver C1 Coach X vertical slice;
8. recursively inventory priority Drive content and PLR packages;
9. validate package-level rights before any commercial reuse;
10. seed canonical exercise and nutrition datasets from compatible open sources — **IN PROGRESS: 873 exercise sources indexed, 30 canonical exercises in review, FoodData Central mapping still pending**;
11. prepare the first owned MyTrainX production set — **IN PROGRESS: Start executable foundation, 12 Kitchen recipes, four owned knowledge ebooks ready for review-gated RAG**;
12. close expert review gates for exercises, nutrition and scientific content before retrieval/publication;
13. migrate Library surfaces progressively from static launch content to the canonical live registry.

## Immediate visual milestone

On `feat/orange-visual-system-v1`, GPT Work must:

1. audit the current route/component tree;
2. document exact landing/app files and current constraints;
3. implement orange design tokens and reusable shared components;
4. evolve the real landing without breaking validated behavior;
5. validate desktop/mobile;
6. run typecheck/build and regression checks;
7. keep a dated implementation changelog.

## Immediate integration milestone

A logged-in user opens:

`/app/trainer`

and asks:

> Qual meu treino hoje?

X must:
1. receive the authenticated user context;
2. stream via Atendimento.Center;
3. invoke `get_today_workout`;
4. call MyTrainX Internal API;
5. receive real authorized MyTrainX data;
6. answer in streaming UI;
7. persist the agent conversation.

This is the first full-system integration milestone.
