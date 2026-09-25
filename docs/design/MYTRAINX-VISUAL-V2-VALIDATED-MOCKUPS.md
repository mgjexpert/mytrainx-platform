# MyTrainX Visual V2 — Validated Mockups Source of Truth

**Date:** 2026-09-25  
**Status:** APPROVED VISUAL REFERENCE / IMPLEMENTATION BRIEF  
**Branch:** `feat/visual-v2-maquettes`  
**Base:** `feat/domain-foundation-v1`

## Objective

Bring the real MyTrainX product substantially closer to the validated mockups while preserving the real product architecture, domain data, auth, entitlements and Atendimento.Center integration.

The previous Orange V1 established tokens and structure. **Visual V2 is the fidelity pass.**

## Validated reference set

The Product Owner supplied and reconfirmed these references on 2026-09-25:

| Reference | Original size | Canonical use |
|---|---:|---|
| `Maquete_Site(1).png` | 779 × 2019 | Long-form public home structure and section rhythm |
| `Maquete_Site_PaginadeChegada(1).png` | 1536 × 1024 | Public home above-the-fold / desktop product storytelling |
| `Maquete_Dasboard(1).png` | 1672 × 941 | Authenticated desktop Command Center |
| `Banner_Equipe(1).png` | 2033 × 774 | Team / persona visual system |
| `Cover_GrupoFacebook(1).png` | 1736 × 906 | Community campaign art direction |
| `Pack_Pub_Sara001(1).png` | 1122 × 1402 | Sara promotional/social creative |
| `Sara_Banner_Bem-Vindos.png` | 1774 × 887 | Onboarding / welcome / support hero |
| `Sara_Receçao001(1).png` | 1122 × 1402 | Sara reception/content portrait |
| `Sara_SaladeEspera(1).png` | 1122 × 1402 | Sara support/waiting-room portrait |
| `Sara_Recebeumaluno.png` | 1122 × 1402 | Sara reception/handoff portrait |
| `Sara_PerfilRedondo(1).png` | 1254 × 1254 | Sara avatar/profile master |
| `Logo_Favicon(1).png` | 1254 × 1254 | X app/fav icon master direction |

## Source precedence by surface

### Public home `/`

Use both landing references with different responsibilities:

1. **Above the fold:** `Maquete_Site_PaginadeChegada(1).png`
2. **Long page / sections:** `Maquete_Site(1).png`

Do not treat either image as a bitmap to reproduce literally. Build the page using real HTML/CSS/components and production assets.

### Member Command Center `/app`

Primary reference:

`Maquete_Dasboard(1).png`

Use its information density, spatial hierarchy, image-led modules and compact premium dashboard treatment.

### Sara

Use the validated Sara set for:
- onboarding;
- support/contact;
- Concierge & Community section;
- profile/avatar;
- WhatsApp/handoff surfaces;
- Team page.

Sara is **not** the primary Coach X product hero.

### Team

`Banner_Equipe(1).png` defines the team visual language:
- Sara central human layer;
- X primary AI trainer;
- Axel/Luna/Pulse/Vita specialist identities;
- black/orange cinematic environment;
- high-density but legible composition.

### Community

`Cover_GrupoFacebook(1).png` is campaign/community art direction, not literal proof of a physical MyTrainX facility or current member count.

## Critical data-integrity corrections

Several validated mockups contain illustrative demo content.

Never publish the following as factual without a real source:

- 50K+ users;
- 4.8/5 rating;
- +1M workouts;
- +120K active members;
- 87% consistency;
- +8% muscle;
- +12% progression;
- Level 12;
- exact body-composition changes;
- 12-week schedules unless backed by `program_days`;
- “available 24/7” if operational/runtime SLA is not defined;
- fake testimonials or fake before/after results;
- physical MyTrainX club/reception location claims.

Replace with one of:
- real user/domain data;
- explicit demo/preview label;
- neutral benefit copy;
- skeleton/empty state.

## Physical-environment rule

The Sara/gym/reception images are **brand/editorial environments**.

Until a real MyTrainX physical facility exists and is verified, UI/copy must not imply:
- a real MyTrainX gym;
- a real reception building;
- a real supplement store;
- a real physical location.

They are visual world-building for the brand and concierge identity.

## Visual language to reproduce

### Composition

- dense premium composition, not sparse SaaS;
- strong photographic anchors;
- large condensed headlines;
- image + UI overlay combinations;
- compact metrics/cards;
- thin dark borders;
- restrained orange glow;
- black/graphite background with real depth;
- content sections visually connected rather than isolated white-space islands.

### Typography

- Barlow Condensed / approved display family for headlines;
- Inter for UI/body;
- Space Mono sparingly for micro labels.

### Orange

Use orange for:
- proprietary X;
- CTA;
- active nav;
- selected state;
- chart/progression accents;
- line/detail highlights.

Do not turn entire surfaces orange.

### Image treatment

- cinematic warm-orange practical lights;
- controlled blacks;
- believable skin/anatomy;
- directional light;
- no generic stock treatment;
- crop for text-safe negative space;
- subtle overlays to preserve readability.

## Page implementation priorities

### P0 — public home

Target:
- hero visually comparable to validated wide landing;
- floating/overlaid product UI;
- goal/category strip;
- Coach X feature;
- real/preview progress section;
- program cards;
- Sara human layer;
- community;
- Master;
- final CTA.

### P0 — authenticated Command Center

Target:
- left desktop navigation;
- search/top bar;
- Coach X dominant module;
- Today/Next workout;
- real programs;
- progress from real data or honest empty state;
- Library;
- Master;
- community/event entry points.

### P0 — Coach X

`/app/trainer` must visually feel native to the Command Center:
- chat panel;
- contextual action cards;
- program/workout context;
- tool/run states;
- memory-aware continuity;
- not a generic chat window.

### P1 — WKT

- public program page;
- cold-lead PV;
- authenticated catalogue;
- player;
- checkout.

WKT keeps a stronger military/performance tone but remains visually inside MyTrainX.

### P1 — Sara / Support

- welcome/onboarding;
- support/contact;
- Team;
- concierge module.

## Responsive strategy

The mockups are mostly desktop/marketing reference.

Mobile is not a scaled screenshot.

For mobile:
- preserve photography and brand intensity;
- reduce simultaneous modules;
- prioritize one action per viewport;
- sticky bottom nav inside member app;
- sticky purchase CTA only on WKT PV;
- use vertical image crops from approved masters;
- maintain X/CTA visibility without covering faces.

## Asset package required in repository

Target structure:

```
public/media/v2/
  brand/
    logo/
    x/
  home/
    hero/
    sections/
  sara/
    portrait/
    support/
    onboarding/
  coach-x/
    hero/
    cards/
  specialists/
    axel/
    luna/
    pulse/
    vita/
  community/
  programs/
    wkt/
  app/
    previews/
```

Production code must use semantic asset names, not names such as `image1-final-final.png`.

## Implementation acceptance criteria

Visual V2 is not complete until:

- home visually matches the validated cinematic density and hierarchy;
- Command Center visually matches the validated dashboard language;
- Sara uses approved imagery, not a generic placeholder;
- Coach X has a distinct visual identity and UI;
- WKT looks like a premium program inside MyTrainX;
- no unverified demo metrics are published as real;
- mobile is purposefully designed;
- no domain/auth/payment/agent architecture is bypassed for aesthetics;
- Lighthouse/accessibility regressions are reviewed;
- Vercel preview is reviewed before merge.

## Branching

This branch is stacked on `feat/domain-foundation-v1` so Visual V2 can proceed without waiting for the Atendimento.Center work.

After PR #14 is merged, retarget the Visual V2 PR to `main`.


## Google Drive creative source

The validated creative/reference folder is indexed in:

`docs/design/VISUAL-V2-DRIVE-ASSET-MAP.md`

This Drive source is sufficient for design analysis and implementation planning. Production UI should use stable repository/CDN paths before merge.
