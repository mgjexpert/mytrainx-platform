# MYTRAINX — GPT WORK IMPLEMENTATION HANDOFF V1

**STATUS:** APPROVED DIRECTION / IMPLEMENTATION START  
**DATE:** 2026-09-24  
**REPOSITORY:** `mgjexpert/mytrainx-platform`  
**WORK BRANCH:** `feat/orange-visual-system-v1`

## Mandatory startup

Before editing code, read in this order:

1. `AGENTS.md`
2. `docs/README.md`
3. `docs/status/CURRENT.md`
4. `docs/governance/OWNERSHIP.md`
5. `docs/governance/WORKFLOW.md`
6. `docs/roadmap/MASTER-ROADMAP.md`
7. `docs/design/README.md`
8. `docs/design/MYTRAINX_VISUAL_SYSTEM_V1_ORANGE.json`
9. `docs/creative/README.md`
10. `docs/creative/ASSET-REGISTER.md`
11. `docs/creative/personas/README.md`
12. `docs/creative/personas/PERSONA-BLUEPRINT-v0.1.md`
13. `docs/creative/personas/CHANNEL-ROUTING-v0.1.md`

Do not infer current architecture from old chats or mockups alone.

## Mission

Evolve the existing MyTrainX product into the approved **BLACK PERFORMANCE SYSTEM + MYTRAINX ORANGE** identity while preserving validated architecture and functionality.

MyTrainX is not a physical gym site. It is:

> **A personal operating system for physical evolution.**

Central product:

> **Coach X — Your Personal AI Trainer**

Human relationship layer:

> **Sara — Concierge & Community**

Internal product rule:

> **X cuida do treino. Sara cuida da relação.**

## Non-negotiable boundaries

Do not:
- rewrite auth architecture;
- rewrite XPayments payment logic;
- change Atendimento.Center ownership boundary;
- break WKT playback or verified Drive IDs;
- present future programs/features as already operational;
- hardcode mockup metrics as real business data;
- turn the parent brand into a military brand;
- turn MyTrainX into a local gym website;
- copy the mockup pixel-for-pixel when it conflicts with real product structure.

## Visual direction

Previous neon-green branding is **SUPERSEDED — STRUCTURE REFERENCE**.

Use:
- Black Core `#050607`
- Obsidian `#090B0E`
- Surface 01 `#0E1216`
- Surface 02 `#14191F`
- Surface Elevated `#1B2128`
- Border `#29313A`
- Primary Orange `#FF4B0A`
- Action Orange `#FF641A`
- Highlight `#FF8A35`
- Deep Orange `#B92B00`
- Master Gold `#E6D36B`
- Semantic success green only for actual success states.

Orange should normally occupy about 8–12% of a composition.

Typography:
- Display: Barlow Condensed / Semi Condensed
- UI: Inter
- Micro/telemetry: Space Mono, sparingly

Product radii: 4–8px.  
Marketing radii: 8–14px where useful.  
Avoid generic 24px SaaS cards everywhere.

## Brand assets

The MyTrainX wordmark uses near-white **MyTrain** + the proprietary angular orange **X**.

The X is not a generic typeface character. It is the brand symbol and must remain geometrically consistent across:
- wordmark;
- favicon;
- PWA/app icon;
- Coach X marker;
- loader;
- active state;
- watermark.

Production SVG/vectorization may be required; do not redraw the X casually.

## Sara

Sara is a **real person** and verified human MyTrainX layer.

Use only approved Sara identity references. Preserve facial geometry, long dark hair, realistic proportions and visible tattoos. Do not turn Sara into a generic generated model.

Sara owns:
- reception;
- onboarding;
- plan/subscription guidance;
- platform help;
- community;
- customer relationship;
- communication;
- human handoff.

Reception WhatsApp:
`+55 (62) 99409-1930`

Atendimento.Center may host a `sara_concierge` AI-assisted instance, but automated vs direct human attendance must remain distinguishable in operational logs and truthful when the user asks.

Sara is not Coach X and should not be the main landing hero.

## Implementation sequence

### Phase 0 — Audit / no destructive changes

- fetch current branch/main;
- inspect current route tree and components;
- identify existing design tokens;
- identify actual landing and app surfaces;
- list anything currently implemented that contradicts mockup assumptions;
- document audit under `docs/analysis/`.

### Phase 1 — Foundations

Implement reusable brand/UI foundations first:
- CSS variables/tokens;
- typography roles;
- color roles;
- border/radius/shadows;
- button states;
- cards;
- inputs;
- status badges;
- icon treatment;
- X asset usage.

Do not build page-specific hacks.

### Phase 2 — Landing

Evolve the real landing in this hierarchy:

1. Header
2. Hero — `FIND YOUR X.`
3. Ecosystem strip
4. Coach X
5. Command Center/product preview
6. Programs
7. Progress
8. Sara human layer
9. Community
10. MyTrainX Master
11. Final CTA
12. Footer

The hero must communicate **digital fitness product + Coach X**, not physical gym.

### Phase 3 — Application visual conversion

Preserve the strong Command Center structure.

Desktop priority:
1. Coach X
2. Progress
3. Today's Training
4. My Programs
5. Master
6. Library
7. Community / Events

Mobile:
1. Coach X
2. Today's Training
3. Progress
4. Programs
5. Community
6. Master
7. Library

Convert green brand accents to orange. Keep semantic success green and Master gold.

### Phase 4 — Coach X surface

The chat experience must combine:
- conversation;
- action cards;
- actual program/workout context;
- quick actions;
- tool states;
- loading/error states.

It must not look like a generic embedded ChatGPT clone.

Do not fake live MyTrainX data.

### Phase 5 — Sara / Team / Community surfaces

Implement Sara as the human layer in the appropriate areas:
- dedicated landing section;
- contact/support;
- community;
- onboarding;
- Team page if/when the real route exists.

Specialist visual cards may be used as product/brand content without implying that unimplemented runtime agents are already live.

### Phase 6 — responsive + validation

Required:
- desktop;
- tablet;
- mobile;
- keyboard/focus states;
- loading/empty/error states;
- typecheck;
- build;
- login regression check;
- WKT playback check;
- checkout/payment path check if touched.

## Source precedence

When sources conflict:

1. Repository architecture/governance
2. `MYTRAINX_VISUAL_SYSTEM_V1_ORANGE.json`
3. This handoff
4. Approved orange site/team mockups
5. Approved Sara references
6. Existing implementation
7. Old green mockups for structure only

## Work logging

During implementation maintain:

`docs/status/CHANGELOG-2026-09-24-ORANGE-V1.md`

For each meaningful change record:
- commit;
- files;
- surface;
- what changed;
- validation evidence;
- remaining limitations.

Do not mark APPROVED PRODUCTION merely because code was merged. Production approval requires preview review and regression validation.

## First deliverable from GPT Work

Before large UI rewriting, commit an audit + implementation plan on this branch showing:

- current route/component map;
- reusable token plan;
- exact landing files to change;
- exact app files to change;
- asset gaps;
- risks;
- staged commits.

Then proceed with Phase 1 and Phase 2 unless a real architecture conflict is found.
