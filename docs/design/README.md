# MyTrainX Design References

**Current visual system:** 1.0-orange  
**Status:** APPROVED DIRECTION  
**Reviewed:** 2026-09-24

## Product identity

MyTrainX is a premium AI-first digital fitness ecosystem — a **personal operating system for physical evolution**.

The visual system must communicate a digital product, not a physical gym.

Central product:
- **Coach X / X — Your Personal AI Trainer**

Human relationship layer:
- **Sara — Concierge & Community**

Internal rule:
> **X cuida do treino. Sara cuida da relação.**

## Current approved direction

> **BLACK PERFORMANCE SYSTEM + MYTRAINX ORANGE**

The earlier black/neon-green direction is now:

> **SUPERSEDED — STRUCTURE REFERENCE**

Its Command Center density and hierarchy remain useful, but green is no longer the primary brand accent.

Canonical machine-readable source:
- `MYTRAINX_VISUAL_SYSTEM_V1_ORANGE.json`

Implementation handoff:
- `../handoff/MYTRAINX_GPT_WORK_VISUAL_DIRECTION_V1.md`

## Core palette

- Black Core: `#050607`
- Obsidian: `#090B0E`
- Surface 01: `#0E1216`
- Surface 02: `#14191F`
- Surface Elevated: `#1B2128`
- Border: `#29313A`
- Primary Orange: `#FF4B0A`
- Action Orange: `#FF641A`
- Energy Highlight: `#FF8A35`
- Deep Orange: `#B92B00`
- Text Primary: `#F7F8F8`
- Text Secondary: `#CBD0D4`
- Success: `#37D67A`
- Master Gold: `#E6D36B`

Orange is normally only about **8–12%** of a composition.

## Typography

- Display: **Barlow Condensed / Barlow Semi Condensed**
- UI: **Inter**
- Micro / telemetry: **Space Mono**, sparingly

## Brand assets

Approved direction requires:
- white / near-white MyTrain wordmark
- proprietary angular orange X
- standalone X as favicon/PWA/app icon
- no generic-font X substitution

## Current mockup references

The Product Owner has supplied and approved the following current references for implementation:

- `Maquete_Site.png` — landing / product storytelling direction
- `Maquete_Team.png` — Sara + X + specialist team direction
- `mytrainx-logo-orange-transparent.png` — wordmark direction
- `Logo_Favicon.png` — standalone X / favicon direction

These references are visual direction, not license to hardcode illustrative metrics or invent runtime state.

## Landing hierarchy

1. Header
2. Hero — FIND YOUR X.
3. Ecosystem strip
4. Coach X
5. Product / Command Center preview
6. Programs
7. Progress
8. Sara human layer
9. Community
10. MyTrainX Master
11. Final CTA
12. Footer

## Command Center hierarchy

Desktop:
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

## Data integrity

Never publish mockup/demo data as real business data.

Examples that require production evidence:
- member counts
- completed workout totals
- ratings
- testimonials
- performance claims
- physical MyTrainX locations

## WKT separation

WKT Militar may use military/mission language.

Do not spread military treatment to:
- Coach X
- Community
- Master
- other programs
- global MyTrainX navigation

## Phase 1 implementation — 2026-09-24

Status: **IN REVIEW**, within Draft PR #10. Canonical values are now implemented in `app/globals.css` as `--color-*`, `--font-*`, `--radius-*`, `--space-*`, `--shadow-*` and `--motion-*` tokens. Legacy `--green` names are temporary compatibility aliases to orange; hardcoded legacy member/WKT styling is a separate Phase 3 conversion.

| Reusable surface | Implementation |
|---|---|
| Button / navigation CTA | `components/ui/primitives.tsx` — `Button`, `ButtonLink`; primary, secondary, quiet and Master variants |
| Input / Card / Badge | Same module; disabled, invalid, loading and semantic state styles |
| Page width / section titles | `Container`, `SectionHeading` — shared responsive gutter and condensed display roles |
| Proprietary brand | `components/MyTrainXLogo.tsx` — supplied wordmark and compact X, no CSS/font redraw |
| Type | Local Inter variable, Barlow Condensed 700/800, Space Mono 400; `next/font/local`; no runtime font CDN |
| PWA | Raster 192/512 icons; 32 favicon; 180 Apple icon; charcoal theme and existing `/app` entry |

Primary orange buttons use black text for contrast. Focus rings use the brighter highlight with an offset; motion respects reduced-motion preferences. `Badge` success is reserved for verified success; development previews use neutral/brand badges. Links retain link semantics; loading/disabled behavior belongs to buttons.

Asset provenance and unresolved production artwork are listed in `../creative/ASSET-REGISTER.md`. The landing will use the symbolic Coach X mode and an explicit text placeholder for Sara until a standalone approved portrait is available.
