# MyTrainX — Main-First V4 Production Record

**Date:** 2026-10-18  
**Execution mode:** direct to `main`  
**Product URL:** https://mytrainx.fit  
**Repository:** `mgjexpert/mytrainx-platform`

## Objective

Continue all necessary MyTrainX work directly on `main`, prioritize production health, then expand quality/content and reduce real blockers without fabricating external credentials, specialist approvals or nutrition data.

## 1. Production health restored

A Vercel production build failure was traced to:

`lib/domain/program-preferences.ts`

Cause:
- a generic `Record<string, unknown>` was passed to a Supabase JSON column.

Fix:
- use the generated Supabase `Json` type / JSON-object shape.

Result:
- typecheck/build recovered;
- production deployment returned READY;
- production aliases resumed;
- runtime error scan returned clean.

## 2. Library V4 quality

Library no longer uses WKT workout photography as generic imagery for unrelated editorial/exercise content.

Current category art direction:
- exercise/training;
- Progress;
- recovery;
- nutrition;
- Kitchen;
- general editorial.

WKT media remains reserved for actual WKT/training surfaces.

Detail rendering also avoids a redundant duplicate unified-catalog fetch.

## 3. Public content scale

Current canonical production content:

| Type | Public |
| --- | ---: |
| Educational articles | 60 |
| Exercise Encyclopedia | 100 |
| MyTrainX Kitchen | 60 |
| **Primary Library total** | **220** |

Knowledge:
- 65 ready documents;
- 403 chunks.

## 4. October GREEN expansion

Added 10 original MyTrainX guides:

1. Caminhar também conta
2. Como organizar 2, 3 ou 4 dias de treino
3. A sessão mínima para dias corridos
4. Perdi uma semana de treino. E agora?
5. Supersets: quando ajudam
6. Quebrar tempo sentado com movimento
7. Wearables: dados sem obsessão
8. A ordem dos exercícios importa?
9. Quando mudar de programa?
10. Um bom treino não precisa parecer extremo

Governance:
- owned rights;
- editorial review approved;
- public;
- retrievable;
- canonical Supabase objects;
- Knowledge chunks created;
- non-clinical general-adult scope.

Evidence anchors:
- ACSM 2026 resistance-training position stand;
- WHO physical activity;
- WHO 2026 wearable measurement report.

## 5. Kitchen normalization

Current structured ingredient state:

- 303 ingredient rows;
- 253 canonical food mappings;
- 50 unresolved/composite/ambiguous.

Only unambiguous mappings were added.

Numeric nutrition remains unavailable because:
- `FDC_API_KEY` is not configured;
- canonical FoodData Central IDs/values still require review.

No calories or macros were invented.

## 6. Specialist-review readiness

Created:
- `docs/review/PROGRESS-SCIENTIFIC-REVIEW-PACK-2026-10-18.md`
- `docs/review/FOUNDATION-EBOOK-QUALIFIED-REVIEW-PACK-2026-10-18.md`

Updated:
- `docs/content/HIIT-PATHWAY-SAFETY-REVIEW-2026.md`

Pending gates remain pending.

The packs prepare:
- exact claims;
- evidence;
- limitations;
- reviewer questions;
- approval checklists.

They do not represent specialist sign-off.

## 7. Coach X readiness

Implemented MyTrainX side:
- authenticated API;
- profile;
- entitlements;
- current program;
- today workout;
- Progress summary;
- rights/review-gated Library search;
- exercise lookup;
- recipe lookup;
- conversation forwarding;
- SSE support.

External blocker:
- base URL exists;
- Atendimento.Center token is missing.

Operational checklist:
`docs/integration/ATENDIMENTO-CENTER-GO-LIVE-CHECKLIST-2026-10-18.md`

## 8. XPayments hardening

Existing payment flow:
- Supabase product price;
- server-side PIX creation;
- order/reference reconciliation;
- exact amount validation;
- transaction consistency;
- idempotency;
- entitlement + enrollment.

Vercel hardening:
- `XPAYMENTS_API_KEY` → sensitive;
- `XPAYMENTS_WEBHOOK_SECRET` → sensitive.

Remaining blocker:
- official XPayments.digital webhook signature scheme not confirmed.

Checklist:
`docs/security/XPAYMENTS-WEBHOOK-SIGNATURE-BLOCKER-2026-10-18.md`

No signature scheme from a different similarly named provider was copied.

## 9. Supabase security

Current security advisor:
- one Auth warning: leaked-password protection disabled.

This requires Auth configuration, not a database migration.

No database-schema migration was justified solely to clear this warning.

## 10. Media audit

Rechecked Drive production folders.

No new approved binaries in:
- COACH_X;
- SPECIALISTS;
- APP_UI;
- HOME.

PROGRAMS:
- WKT only.

MICAELA:
- organizational subfolders exist;
- no newly approved production binary identified in the inspected top-level state.

Therefore:
- no generated substitute for real people;
- no unrelated WKT media reuse;
- branded/category art remains the correct temporary solution.

## 11. Backlog cleanup

Closed as complete/superseded:
- #2 A1 Supabase Domain Foundation
- #3 A2 MyTrainX Internal Agent API
- #9 Orange Visual System V1
- #15 Visual V2 mockup implementation

Remain open:
- #18 Library V2
- #4 Atendimento.Center dependency
- #5 Coach X vertical slice
- #21 Micaela/human-team assets

## 12. External actions that now unlock the next state

1. Atendimento.Center production token.
2. USDA FoodData Central API key.
3. Qualified review/sign-off of pending exercise/nutrition/safety/scientific packs.
4. Official XPayments.digital signature documentation.
5. Supabase Auth leaked-password protection enabled.
6. Approved Coach X/Specialist/Micaela/program-specific media.

Everything that does **not** depend on those external inputs should continue directly on `main`.
