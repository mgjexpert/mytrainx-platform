# Versioning Policy

**Version:** 1.0  
**Reviewed:** 2026-09-24

We version product code, architecture decisions and creative references independently.

## Product releases

Semantic version pattern:

`MAJOR.MINOR.PATCH`

During pre-launch:

- `0.x.0` = meaningful platform milestone
- `0.x.y` = fixes/improvements

Suggested milestones:

- 0.1 — repository/bootstrap
- 0.2 — documented architecture + operating model
- 0.3 — Supabase domain foundation
- 0.4 — Agent integration contracts
- 0.5 — Trainer X vertical slice
- 0.6 — identity/memory
- 0.7 — knowledge/RAG
- 0.8 — WhatsApp
- 0.9 — production readiness
- 1.0 — first validated commercial MyTrainX release

## Document headers

Important docs must include:

```
Version:
Status:
Created:
Last reviewed:
Owner:
Related stage:
```

## Dated analysis

Audits are immutable historical references:

`docs/analysis/YYYY-MM-DD-<topic>.md`

If conclusions change, add a new dated analysis or ADR; do not rewrite history.

## Creative assets

Naming:

`YYYY-MM-DD_<surface>_<concept>_vNN.<ext>`

Example:

`2026-09-24_app-command-center_dark-v01.png`

Once an asset is approved, record it in `docs/creative/ASSET-REGISTER.md`.
