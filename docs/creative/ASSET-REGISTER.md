# Creative Asset Register

**Version:** 1.2
**Updated:** 2026-09-24

| Asset | Status | Version | Date | Intended use | Notes |
|---|---|---:|---|---|---|
| MyTrainX Orange Visual System JSON | APPROVED DIRECTION | v1.0 | 2026-09-24 | global | Canonical machine-readable visual direction |
| GPT Work Visual Direction / Implementation Handoff | APPROVED DIRECTION | v1.0 | 2026-09-24 | implementation | Primary visual implementation brief |
| Orange landing mockup (`Maquete_Site.png`) | APPROVED DIRECTION | v1.0 | 2026-09-24 | public landing | Composition/art direction; do not copy unsupported demo claims |
| Team mockup (`Maquete_Team.png`) | APPROVED DIRECTION | v1.0 | 2026-09-24 | Team / human layer | Sara + X + specialists |
| Orange MyTrainX wordmark (`mytrainx-logo-orange-transparent.png`) | APPROVED DIRECTION | v1.0 | 2026-09-24 | header/brand/social | Final vector/SVG production still required |
| Orange X favicon concept (`Logo_Favicon.png`) | APPROVED DIRECTION | v1.0 | 2026-09-24 | favicon/PWA/app | Optimize for small-size legibility before APPROVED PRODUCTION |
| Sara approved identity/reference set | APPROVED DIRECTION | v1.0 | 2026-09-24 | Team/support/community | Sara is a real person; preserve identity, proportions and tattoos |
| Previous neon-green Command Center | SUPERSEDED — STRUCTURE REFERENCE | v0.x | 2026-09-24 | /app structure | Keep hierarchy/density only; do not retain green as primary brand |
| Previous green brand board | SUPERSEDED — STRUCTURE REFERENCE | v0.x | 2026-09-24 | history | Retained for design evolution history |

## Source of truth

### Draft implementation assets — Phase 1

These exports preserve the supplied **APPROVED DIRECTION** raster geometry. Their implementation is **IN REVIEW**; none is automatically APPROVED PRODUCTION.

| Repository path | Source / operation | Review limitation |
|---|---|---|
| `public/brand/mytrainx-logo-orange.png` | Exact copy of supplied `mytrainx-logo-orange-transparent.png`, 1240×292 | Raster wordmark; final vector and small-size wordmark approval pending |
| `public/brand/x-icon-32.png` | Supplied `Logo_Favicon.png`, proportional raster resample to 32×32 | Small-size preview approval pending |
| `public/brand/x-icon-180.png` | Same source, 180×180 | Apple touch icon |
| `public/brand/x-icon-192.png` | Same source, 192×192 | PWA / symbolic Coach X marker; no maskable claim |
| `public/brand/x-icon-512.png` | Same source, 512×512 | PWA; final flat vector export remains a gap |
| `public/fonts/inter-latin-wght-normal.woff2` | Fontsource variable Inter 5.3.0, unmodified Latin wght file | OFL in `public/fonts/OFL-Inter.txt` |
| `public/fonts/barlow-condensed-latin-700-normal.woff2`, `public/fonts/barlow-condensed-latin-800-normal.woff2` | Fontsource Barlow Condensed 5.3.0, unmodified | OFL in `public/fonts/OFL-Barlow-Condensed.txt` |
| `public/fonts/space-mono-latin-400-normal.woff2` | Fontsource Space Mono 5.3.0, unmodified | OFL in `public/fonts/OFL-Space-Mono.txt` |

Font packages are used only to obtain licensed font files; no runtime dependency or package-version change is required. Approved references remain separate from production surfaces. In particular, `Maquete_Team.png` is not used as a live profile or as a standalone photograph of Sara.

Read:
- `../design/MYTRAINX_VISUAL_SYSTEM_V1_ORANGE.json`
- `../handoff/MYTRAINX_GPT_WORK_VISUAL_DIRECTION_V1.md`

## Asset policy

A mockup marked APPROVED DIRECTION is not automatically APPROVED PRODUCTION.

Before production:
1. create/optimize the real asset;
2. preserve proprietary X geometry;
3. validate responsive/crop behavior;
4. validate accessibility/contrast where relevant;
5. ensure no unsupported business claim is embedded;
6. record final path/version here;
7. mark APPROVED PRODUCTION only after preview validation.

## Naming convention

`YYYY-MM-DD_<surface>_<concept>_vNN.ext`

## Status options

- CONCEPT
- REVIEW
- APPROVED DIRECTION
- APPROVED PRODUCTION
- SUPERSEDED
- SUPERSEDED — STRUCTURE REFERENCE
