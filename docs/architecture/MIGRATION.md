# Migration plan

## Phase 1 — Bootstrap
- Initialize MyTrainX independently.
- Supabase becomes the primary Auth/Postgres platform.
- Keep WKT production untouched.

## Phase 2 — Brand shell
- Global MyTrainX design system.
- Homepage, Trainer and Programs architecture.
- Add approved logos and visual references.

## Phase 3 — WKT as a program
Port:
- 21 workout catalog entries
- Drive preview playback
- WKT program schedule
- WKT sales/checkout logic

Target routes:
- `/programas/wkt-militar`
- `/programas/wkt-militar/oferta`
- `/app/programas/wkt-militar`
- `/app/workout/[slug]`

## Phase 4 — Command Center
Implement the approved MyTrainX dashboard:
- AI Trainer hero
- Today's Training
- Progress
- Programs
- Master
- Library

## Phase 5 — Production auth and entitlements
Replace demo access-code auth with Supabase Auth.
Paid access is resolved server-side using entitlement records.

## Phase 6 — MyTrainX AI
Add contextual tools for user profile, owned products, current program, training history, library and events.

## Phase 7 — Master / Community / Events
Introduce recurring membership and premium ecosystem.

## Phase 8 — Cutover
Only after end-to-end validation:
- attach `mytrainx.fit`
- configure Production env
- configure XPayments production webhook
- migrate/seed required WKT records
- keep legacy WKT domain as redirect/campaign asset as needed
