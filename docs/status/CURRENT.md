# Current Project State

**Project version:** 0.5.0-visual-v3.1-product  
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
- **100 canonical PT-BR exercises**, all published/approved for general educational use; clinical/rehabilitation validation is not claimed;
- **60 structured MyTrainX Kitchen recipes** with owned/verified rights; numeric nutrients remain blocked pending FoodData Central mapping/review; 55 canonical food items are in review; the newest 20-recipe batch adds 100 normalized ingredient rows (79 mapped, 21 intentionally unresolved/composite);
- food/nutrient entities and normalized recipe ingredients;
- **45 ready knowledge documents / 323 knowledge chunks** across the owned knowledge core; 6 Progress documents are intentionally retrieval-blocked pending scientific review;
- owned foundation ebooks: Treino de Força sem Complicação, Nutrição sem Ruído, Progress sem Ruído and Recovery sem Ruído;
- **MyTrainX Start — 4 Weeks** active for registered members with 12 executable workouts, self-enrollment, workout completion and Progress integration;
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

Library delivery is now consolidated on production `main`:
- public Library now exposes **50 educational articles + 100 approved exercise guides + 60 live Kitchen recipes = 210 public content items**;
- exercise exposure is driven by `status=published` + `review_status=approved`;
- all current canonical exercises have passed the general-education publication gate;
- recipe nutrient values remain intentionally absent until FoodData Central mapping/review.

MyTrainX Progress is merged and active on production `main`, covering user-configurable body tracking, weekly check-ins, goals and private progress photos.

### Track D — Creative / Product UI
**VISUAL V3 IN PRODUCTION**

Current primary visual direction:
- BLACK PERFORMANCE SYSTEM + MYTRAINX ORANGE
- validated Drive maquettes are the visual reference baseline;
- previous neon-green system is structural reference only;
- Coach X remains the central product;
- Sara is the verified real human Concierge & Community layer;
- specialist coaches remain AI personas.

Production baseline:
- merge commit `f54c5ee6f9d1be9ceda796e298af45bf3585654a`;
- PR #27 — Visual V3 / maquette fidelity;
- Vercel production deployment `dpl_3oHaMipNaqa2henpbjXGJRxmJhSs`;
- aliases `mytrainx.fit` and `www.mytrainx.fit`;
- deployment READY with no alias error and no runtime errors detected post-release.

Visual V3 includes:
- dense cinematic public landing aligned to the validated home maquette;
- real Library / Exercise / Kitchen / WKT metrics instead of fabricated social proof;
- persistent member sidebar + topbar across all `/app/*` routes;
- responsive mobile member navigation;
- Command Center rebuilt around Coach X, real Progress data, WKT, programs, Library and Master;
- validated team and community media used as production surfaces;
- public Trainer, Programs and Community upgraded to the same design language;
- member Trainer, Programs and Library upgraded from the old MVP card layout;
- truthful product-status language preserved for content still in validation.

Canonical audit:
`docs/design/VISUAL-V3-MAQUETTE-AUDIT-2026-09-26.md`.

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
10. seed canonical exercise and nutrition datasets from compatible open sources — **IN PROGRESS: 873 exercise sources indexed, 100 canonical exercises published; 55 canonical food items in review; FoodData Central nutrient mapping/review still pending**;
11. prepare the first owned MyTrainX production set — **IN PROGRESS: MyTrainX Start active with 12 executable sessions, 60 Kitchen recipes, 40 public educational articles, four owned knowledge ebooks still gated for final review**;
12. close expert review gates for exercises, nutrition and scientific content before retrieval/publication;
13. migrate Library surfaces progressively from static launch content to the canonical live registry.

## Immediate visual milestone

Visual V3 is now the production baseline.

Next visual-quality work:
1. create/approve bespoke production media for Coach X, Programs, Progress, Nutrition and specialist personas so WKT footage is no longer reused as a generic media pool;
2. add content-specific imagery to Library cards and detail pages;
3. produce dedicated covers for MyTrainX Start, Core 21, Calisthenics, Home 30 and HIIT Pathway;
4. perform route-by-route responsive screenshot QA at desktop, tablet and mobile sizes;
5. continue tightening spacing, type scale and crop positions against the validated references;
6. retain real-data-only presentation — never copy fake ratings, member counts or transformation percentages from mockups.

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


## Domain foundation update — 2026-09-25

Supabase project `oitfnnsfgaxcxqvizorw` now contains the V1 MyTrainX domain schema with RLS and the validated WKT seed.

Current foundation branch:
`feat/domain-foundation-v1`

Implemented in this branch:
- domain schema + advisor fixes
- WKT product/program/21-workout seed
- generated TypeScript types
- identity/purchase linking on auth callback
- entitlement gating for WKT member routes
- product price authority moved to Supabase
- initial signed Internal Agent API
- Atendimento.Center GPT implementation handoff

Security advisor currently reports 0 findings.


## Visual V3.1 / Product consolidation — 2026-09-26

Direct-to-main product consolidation now includes:

- premium public Library index and content-detail system;
- related content and article table-of-contents;
- Progress V3.1 hierarchy plus contextual Library education;
- WKT mission catalog and player rebuilt with persisted `workout_progress`;
- WKT catalog displays real completed missions and next pending mission;
- branded magic-link login;
- branded PIX/assisted checkout;
- WKT offer price sourced from active Supabase product instead of hardcoded copy;
- MyTrainX Start active for registered members with enrollment/session/completion flows;
- Master and Events truthful roadmap surfaces;
- legacy public WKT page replaced by Visual V3.1;
- unrelated programs no longer reuse WKT footage as fake cover art.

## Coach X internal domain tools

Signed HMAC integration now exposes:

1. `profile`
2. `entitlements`
3. `current-program`
4. `today-workout`
5. `progress-summary`
6. `library-search`
7. `exercise`
8. `recipe`

Knowledge search enforces approved editorial review, verified rights, AI retrieval permission, ready knowledge documents and public/published content. It now also blocks any non-approved scientific/safety/nutrition/exercise review and respects `retrieval_blocked=true`.

The MyTrainX-side conversational bridge is now implemented: authenticated `/api/coach-x`, configurable Atendimento.Center gateway client, conversation creation/message forwarding and SSE pass-through. Production conversation runtime still requires the Atendimento.Center endpoint/token ENV to be configured.

## Nutrition normalization

Current Kitchen nutrition foundation:

- 60 public recipes;
- 55 canonical `food_items` in review;
- the latest 20-recipe expansion adds 100 `recipe_ingredients` rows;
- 79 of those rows map to a canonical food;
- 21 of those rows remain intentionally unresolved/composite;
- 0 public nutrient rows until FoodData Central IDs and values pass review.

Canonical workflow:
`docs/content/FOODDATA-CENTRAL-INGESTION-2026.md`.


## Main-first execution update — 2026-09-26/27

The product owner explicitly requested that ongoing implementation advance directly on `main`.

Current `main` work now includes:

- Visual V3.1 Library cards/details with media-rich editorial treatment;
- Visual V3.1 Progress, WKT/player, Login and Checkout polish;
- canonical media registry in `lib/media-catalog.ts` so production surfaces no longer depend on scattered workout-index choices;
- public/member Program catalogues driven by active Supabase program records;
- Coach X member cockpit using real MyTrainX domain tools for current program, next workout and progress;
- enriched agent progress summary with user-authorized Progress dimensions and explicit safety flags;
- GREEN Library expansion C (+12 articles), bringing public educational articles to 40;
- those 12 guides are canonical Supabase content with verified rights, approved editorial review and Knowledge chunks;
- HIIT Pathway modernized from repeated intervals to a four-week relative-intensity/density progression, while remaining AMBER and inactive pending the safety gate.

### Current canonical production-domain counts

- 50 public articles;
- 100 published/approved exercises;
- 60 public Kitchen recipes;
- 210 public Library items across those three primary content types;
- 55 ready Knowledge documents;
- 363 Knowledge chunks (6 retrieval-blocked pending scientific review);
- 5 active programs: WKT Militar, MyTrainX Start, Core 21, Home 30, Calisthenics Foundations;
- HIIT Pathway remains inactive / AMBER after its 2026 safety redesign.

### Build / deployment state

GitHub Actions build for `main` is green after fixing an invalid metadata re-export in the WKT offer route and hardening generic-program JSON metadata typing.

Vercel Git deployments are currently blocked by the account build quota with status:

`Deployment rate limited — retry in 24 hours.`

Therefore:

- `main` is the canonical newest implementation;
- GitHub CI is the current technical gate;
- the public domain remains on the last Vercel deployment that reached `READY` until Vercel accepts another production build;
- do not describe post-rate-limit commits as live in production until a newer deployment reaches `READY`.

### Media status

The approved Drive folders for Coach X, Specialists and APP_UI currently contain no production assets. Micaela has organizational subfolders but no files in the inspected Profile/Portrait folders.

Until dedicated assets exist:

- use the canonical media registry;
- reuse WKT imagery selectively rather than globally;
- preserve validated Team, Community and Sara assets already tracked in the repository;
- replace each canonical media role when dedicated production media becomes available.


## Expansion update — 100 Exercises / 60 Kitchen / Coach X bridge

Direct-to-main expansion completed:

- Exercise Encyclopedia: **100** published/approved canonical movements;
- Kitchen: **60** public original recipes;
- educational guides: **50** public articles;
- Library primary catalog: **210** public items;
- canonical foods: **55** in FoodData Central review workflow;
- Knowledge: **55 ready documents / 363 chunks**;
- six Progress knowledge documents are ready but blocked from agent retrieval until scientific approval;
- specialist review gates are now enforced inside `searchAgentKnowledge`;
- HIIT Pathway remains correctly inactive/AMBER with a finalized specialist safety-review pack;
- Coach X now has a real client-side chat composer and authenticated MyTrainX gateway proxy prepared for Atendimento.Center conversation + SSE streaming;
- gateway activation requires `ATENDIMENTO_CENTER_AGENT_URL` and `ATENDIMENTO_CENTER_AGENT_TOKEN` in production;
- USDA FoodData Central remains the canonical numeric nutrition source; no macro/calorie values are published without reviewed FDC IDs and calculations.

Security note:
Supabase advisor currently reports leaked-password protection disabled. This should be enabled in Supabase Auth settings when available; it is not a content/database schema blocker.
