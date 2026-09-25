# GPT Work Handoff — Library V2 Product Surface

## Read first

1. `AGENTS.md`
2. `docs/status/CURRENT.md`
3. `docs/product/MYTRAINX-LIBRARY-SYSTEM-V2.md`
4. `docs/design/MYTRAINX-LIBRARY-UX-V2.md`
5. existing orange visual-system documents
6. current content/knowledge migrations

## Do not implement against raw Drive

All UI must consume canonical MyTrainX domain interfaces.
Do not create UI that lists Google Drive folders/files directly.

## Phase L0 — Audit

Before code:
- identify existing library-related routes;
- identify existing content/domain query helpers;
- identify entitlement resolver;
- identify card/shelf primitives already available in orange system;
- document collisions with PR #10 / active visual branch.

## Phase L1 — Reusable Library UI

Build:
- LibraryShell
- LibrarySearch
- ContentCard
- ProgramCard
- ExerciseCard
- RecipeCard
- Shelf
- AccessBadge
- ProgressBar integration
- LockedOverlay
- Empty/Loading/Error states

Use real types/contracts where available; no permanent mock architecture.

## Phase L2 — Public Library

Target:
- `/biblioteca`

Implement:
- hero/search;
- curated shelves;
- exercise/recipe entry points;
- preview/locked states;
- SEO-safe canonical routes.

## Phase L3 — Member Library

Target:
- `/app/biblioteca`

Implement:
- continue;
- saved;
- owned;
- Master;
- program resources;
- recently viewed.

Require authenticated user state.

## Phase L4 — Vertical surfaces

Prepare:
- `/exercicios`
- `/exercicios/[slug]`
- `/receitas`
- `/receitas/[slug]`
- structured reader route for articles/ebooks.

## Phase L5 — Coach X bridge

Add UI affordances only after Internal API/tool contracts exist:
- ask about exercise;
- ask about content;
- adapt recipe;
- get program materials.

Do not give the client direct access to knowledge tables or unrestricted model prompts.

## Phase L6 — Validation

Validate:
- public vs logged-in;
- Master vs non-Master;
- owned vs locked;
- mobile gym use;
- long-form reading;
- video captions/transcripts;
- no reference-only content exposed;
- no quarantined content exposed.

## Branching

Library implementation should occur on its own implementation branch derived from the correct integrated base once orange-system changes are stable enough to avoid UI duplication.

Do not merge automatically.
