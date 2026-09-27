# Release Note — Main Expansion 2026-09-26/27

**Execution mode:** direct-to-main  
**Scope:** content scale, nutrition foundation, Coach X bridge, review gates

## Production-domain expansion

### Library

- 50 public educational articles
- 100 published/approved Exercise Encyclopedia entries
- 60 public MyTrainX Kitchen recipes
- **210 primary public Library items**

### Exercise Encyclopedia

Expanded from 60 to 100 canonical movements.

The 40-item expansion is tagged:

`exercise_60_to_100_v1`

Publication scope remains:

- general fitness education;
- original MyTrainX PT-BR editorial layer;
- no rehabilitation prescription;
- no clinical validation claim;
- no specialist-signoff claim.

### Kitchen

Expanded from 40 to 60 original recipes.

The 20-item expansion is tagged:

`kitchen_40_to_60_v1`

Current newest-batch ingredient normalization:

- 100 ingredient rows;
- 79 canonical food mappings;
- 21 intentionally unresolved/composite rows.

Numeric nutrition remains unavailable until reviewed FoodData Central mapping/calculation.

### Canonical foods

- 55 `food_items` currently in review.
- FDC mapper updated for the new canonical foods.
- Source target remains USDA FoodData Central.
- No calories/macros are generated from search rank or guessed values.

## Knowledge

- 55 ready knowledge documents
- 363 knowledge chunks
- 6 Progress documents are ready but explicitly retrieval-blocked pending scientific review

The six blocked Progress documents cover:

- daily body-weight variability
- consistent weigh-in protocol
- BIA/smart-scale limitations
- consistent waist measurement
- standardized progress photography
- progress beyond body weight

## Coach X retrieval gate hardening

`searchAgentKnowledge` now excludes:

- non-approved scientific reviews;
- non-approved safety reviews;
- non-approved nutrition reviews;
- non-approved exercise reviews;
- any ready document with `metadata.retrieval_blocked=true`.

This prevents a ready/chunked document from becoming agent-retrievable merely because editorial review passed.

## Atendimento.Center bridge

MyTrainX now contains:

- `lib/agent/atendimento-gateway.ts`
- authenticated `/api/coach-x`
- conversation creation proxy
- message forwarding
- SSE pass-through
- real WebChat composer in `/app/trainer`
- real configured/not-configured gateway state

Required production ENV:

- `ATENDIMENTO_CENTER_AGENT_URL`
- `ATENDIMENTO_CENTER_AGENT_TOKEN`
- optional `ATENDIMENTO_CENTER_TRAINER_AGENT` (defaults to `trainer-x`)

Until those are present, the UI does not simulate an AI conversation.

## HIIT Pathway

HIIT Pathway remains:

- technically complete;
- 12 sessions / 4 weeks;
- relative RPE progression capped at 7/10;
- talk-test aware;
- warm-up/cooldown aware;
- explicit stop rules;
- inactive / AMBER.

The specialist review pack is:

`docs/content/HIIT-PATHWAY-SAFETY-REVIEW-2026.md`

No activation occurs before documented safety approval.

## Security follow-up

Supabase security advisor reports one current warning:

- leaked-password protection disabled.

This is an Auth configuration follow-up, not a schema/content blocker.

## Deployment gate

Release is considered live only after:

1. GitHub Actions build = success;
2. Vercel deployment for the latest main SHA = READY;
3. `mytrainx.fit` / `www.mytrainx.fit` aliases attach without error;
4. runtime error scan is clean.


## GREEN expansion D

A final 10-guide general-education batch was added to the live Library and canonical Knowledge system:

- machines vs. free weights;
- exercise substitutions;
- strength-training frequency;
- controlled range of motion;
- breathing/bracing;
- progression without adding load;
- rep ranges;
- active recovery/rest days;
- choosing home-training equipment;
- interrupted-workout recovery.

The batch is MyTrainX-owned, editorial-approved, non-clinical, rights-verified and eligible for retrieval under the strengthened review-gate logic.
