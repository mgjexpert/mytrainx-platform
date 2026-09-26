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
- **30 canonical PT-BR exercises** — all 30 published/approved for general educational use; clinical/rehabilitation validation is not claimed;
- **25 structured MyTrainX Kitchen recipes** with owned/verified rights; 45 canonical food items and 137 normalized ingredient rows now exist, with numeric nutrients still blocked pending reviewed FoodData Central mapping;
- food/nutrient entities and normalized recipe ingredients;
- **27 ready knowledge documents / 237 knowledge chunks** across the owned knowledge core;
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
- public Library mixes 28 public educational articles, 30 approved exercise guides and 25 live Kitchen recipes (**83 public content items**);
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
10. seed canonical exercise and nutrition datasets from compatible open sources — **IN PROGRESS: 873 exercise sources indexed, 30 canonical exercises published; 45 canonical food items + 137 recipe ingredient rows normalized; FoodData Central nutrient mapping/review still pending**;
11. prepare the first owned MyTrainX production set — **IN PROGRESS: MyTrainX Start active with 12 executable sessions, 25 Kitchen recipes, 28 public educational articles, four owned knowledge ebooks still gated for final review**;
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

Knowledge search enforces approved editorial review, verified rights, AI retrieval permission, ready knowledge documents and public/published content.

The actual conversational runtime/streaming bridge to Atendimento.Center remains the next integration boundary; the domain tools themselves are now ready for that bridge.

## Nutrition normalization

Current Kitchen nutrition foundation:

- 25 public recipes;
- 45 canonical `food_items` in review;
- 137 `recipe_ingredients` rows;
- 101 ingredient rows mapped to a canonical food;
- 36 composite/ambiguous rows intentionally unresolved;
- 0 public nutrient rows until FoodData Central IDs and values pass review.

Canonical workflow:
`docs/content/FOODDATA-CENTRAL-INGESTION-2026.md`.
