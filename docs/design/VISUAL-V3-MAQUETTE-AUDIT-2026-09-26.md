# Visual V3 — Maquette Fidelity Audit

**Date:** 2026-09-26  
**Status:** PRODUCTION BASELINE  
**Production commit:** `f54c5ee6f9d1be9ceda796e298af45bf3585654a`

## Reference set

Validated directly from the supplied Google Drive visual pack:

- `Maquete_Site_PaginadeChegada.png`
- `Maquete_Dasboard.png`
- `Banner_Equipe.png`
- `Cover_GrupoFacebook.png`

Drive root:
`10q8LTqJGez_CrNLAge5zXOikMO42Omgf`

The repository already contained production-tracked copies under `public/media/v2/references/`, so no separate binary migration was required.

## Core audit conclusion

The pre-V3 implementation had adopted the correct palette and typography but had not reproduced the **product architecture expressed by the maquettes**.

The main visual gap was structural:

- public pages were too long and section-based;
- information density was lower than the references;
- member navigation disappeared outside the Command Center;
- secondary pages looked like independent MVP pages;
- media was repeated too often;
- several status strings no longer matched the actual product;
- the product felt like a set of pages rather than one continuous system.

Visual V3 treats the maquette as a **composition and interaction reference**, not merely a color reference.

## Home comparison

### Maquette expectation

- compact navigation;
- cinematic split hero;
- foreground training media;
- overlapping product/device previews;
- strong orange accent without flooding the UI;
- factual metric strip;
- six visual goal categories;
- Coach X and Progress shown as product capabilities, not marketing paragraphs;
- program cards;
- full-width human/community media;
- minimal dead space.

### V3 implementation

- hero width expanded to ~1460px;
- large display typography retained;
- real counts rendered from the live Library;
- WKT session count sourced from the actual catalog;
- six-goal strip retained directly below hero;
- Coach X + Progress rendered as a dense two-panel mosaic;
- program section compacted;
- validated team banner integrated;
- validated community image integrated;
- Master reduced to a premium strip;
- footer/navigation simplified.

## Authenticated app comparison

### Maquette expectation

The dashboard reference clearly represents an application shell, not a standalone page:

- persistent sidebar;
- persistent topbar;
- search;
- account affordance;
- Coach X dominant module;
- Progress alongside it;
- workout/program modules;
- Library/resources;
- premium/Master layer.

### Pre-V3 problem

Only `/app` had the sidebar/topbar markup.

Navigating to:
- `/app/performance`
- `/app/library`
- `/app/programas`
- `/app/trainer`

removed the app chrome entirely.

### V3 implementation

Shared member layout now owns:

- persistent desktop sidebar;
- persistent topbar;
- active route state;
- mobile bottom navigation;
- Master upsell;
- consistent workspace background.

The Command Center itself now contains only dashboard content.

## Data integrity vs. mockup fidelity

The reference artwork contains illustrative social-proof style numbers.

These were **not copied** unless backed by product data.

V3 uses:

- live Library item count;
- live Exercise Encyclopedia count;
- live Kitchen count;
- verified WKT workout count;
- actual member Progress values when available.

Where data is optional or absent, the interface says so instead of inventing a number.

## Media audit

### Production-ready media already available

- MyTrainX brand/X icon;
- WKT workout thumbnails;
- validated team banner;
- validated community cover;
- Sara welcome media.

### Remaining media gap

The biggest remaining visual-quality gap is now **content-specific production media**, not CSS.

Needed:

- Coach X hero/portrait set;
- Progress/body-tracking lifestyle set;
- MyTrainX Kitchen photography;
- dedicated program covers;
- specialist persona portraits;
- exercise-specific demonstrations or approved imagery;
- community/event photography as real assets become available.

Until those assets exist, WKT imagery should be used selectively, not as a universal substitute.

## Route status after V3

### Aligned in this release

- `/`
- `/trainer`
- `/programas`
- `/community`
- `/app`
- `/app/trainer`
- `/app/programas`
- `/app/library`
- all `/app/*` routes now inherit the persistent shell.

### Functionally preserved within new shell

- `/app/performance`
- `/app/performance/body`
- `/app/performance/check-in`
- `/app/performance/photos`
- `/app/performance/goals`
- `/app/programas/wkt-militar`
- `/app/workout/[slug]`

### Next per-route pixel pass

- public Library index/detail;
- Progress forms/tables/mobile;
- WKT journey/player;
- checkout/offer pages;
- login/auth;
- Master;
- Events.

## Release verification

Preview:
- final Visual V3 preview: READY;
- no alias error.

Production:
- Vercel deployment: `dpl_3oHaMipNaqa2henpbjXGJRxmJhSs`;
- target: production;
- aliases: `mytrainx.fit`, `www.mytrainx.fit`;
- state: READY;
- alias error: none;
- runtime error scan after release: clean.

## No database migration required

Visual V3 changes presentation architecture, component structure and route chrome.

It does not change database schema, RLS or entitlement behavior.

A DB migration would therefore add risk without providing value for this release.

## Definition of the next quality level

Visual V3 materially closes the structural gap with the validated references.

It should **not** be considered final 1:1 fidelity yet.

The next quality threshold is reached when:

1. bespoke media replaces generic/reused WKT imagery;
2. Library content has art direction by category;
3. every major route receives desktop/tablet/mobile screenshot QA;
4. program covers and Coach X/specialist assets are production-grade;
5. checkout/auth/offer surfaces use the same design grammar;
6. spacing/crop/type details are tuned from real screenshots, not code inspection alone.
