# Orange V1 — Phase 0 implementation audit

**Date:** 2026-09-24  
**Track:** D / Phase 0 → Foundations + Landing  
**Status:** IN PROGRESS — approved direction, implementation review only  
**Issue:** #9 · **PR:** #10 (keep Draft; no merge)  
**Inspected head:** `1ea49dedf2ca128947e6d65cb70d85fc0b647d1a`  
**Fetched main:** `49ddca677b957919c526de657e3ab0779a4e451e`

## Decision

**No architectural blocker to Phase 1 + Phase 2.** Continue on `feat/orange-visual-system-v1`. The landing can describe the product direction while explicitly labelling features that are not operational. Do not implement agent runtime, domain schema, payment fulfillment or entitlement changes to satisfy a mockup.

Startup reading completed: AGENTS; docs index/status/governance/workflow; roadmap; all five ADRs; design JSON/handoff; creative register; persona README, blueprint, routing and JSON. Main contains the Sara/persona merge. This branch differs from main only in the seven orange kickoff documentation files. Remote branch inspection found historical bootstrap/documentation branches and the requested orange branch, with no second orange implementation branch.

## Actual route and component map

| Surface | Exact files | Current behavior |
|---|---|---|
| Root / metadata | `app/layout.tsx`, `app/globals.css` | Arial; global green tokens plus hardcoded green styles; PWA registration |
| `/` | `app/page.tsx`, `app/home.module.css` | Static server-rendered marketing page; green header/hero, simulated chat, programs, Master and footer |
| Public product pages | `app/trainer/page.tsx`, `app/programas/page.tsx`, `app/master/page.tsx`, `app/community/page.tsx`, `app/library/page.tsx`, `app/events/page.tsx` | Mainly informational scaffolds using `components/PublicHeader.tsx`, `components/public-sections.module.css` |
| Public WKT | `app/programas/wkt-militar/page.tsx`, `app/programas/wkt-militar/oferta/page.tsx`, `app/oferta/page.tsx`, `app/oferta/OfferCta.tsx`, `app/oferta/oferta.module.css` | WKT marketing / offer routes; existing links feed checkout |
| Login | `app/login/page.tsx`, `app/login/LoginForm.tsx` | Supabase email OTP/Magic Link; client-side success/error/loading UI |
| Auth handlers | `app/auth/confirm/route.ts`, `app/auth/signout/route.ts` | Verification/callback and session termination |
| Protected root | `app/app/layout.tsx`, `app/app/page.tsx`, `app/app/command.module.css` | Server verified session gate; Command Center with Coach X, progress, training, programs, Master and library |
| Protected sections | `app/app/trainer/page.tsx`, `app/app/hoje/page.tsx`, `app/app/performance/page.tsx`, `app/app/profile/page.tsx`, `app/app/programas/page.tsx`, `app/app/programas/wkt-militar/page.tsx`, `app/app/community/page.tsx`, `app/app/master/page.tsx`, `app/app/library/page.tsx` | Authenticated scaffolds / WKT catalogue; shared `components/member-section.module.css` |
| WKT player | `app/app/workout/[slug]/page.tsx`, `lib/workouts.ts` | Slug lookup + Drive preview iframe; 21 verified IDs; finish button currently has no persistence handler |
| Checkout | `app/checkout/page.tsx`, `app/checkout/CheckoutForm.tsx` | PIX form, loading/error state, pending code and copy action |
| Payment APIs | `app/api/payments/pix/route.ts`, `app/api/webhooks/xpayments/route.ts`, `lib/payments/xpayments.ts` | Server-side charge/order/webhook; default mock mode; no pending entitlement |
| Configuration API | `app/api/health/config/route.ts` | Configuration health surface; not part of visual work |
| Brand/PWA | `components/MyTrainXLogo.tsx`, `app/manifest.ts`, `public/icon.svg`, `components/PwaRegister.tsx`, `public/sw.js` | CSS polygon X, green SVG icon/theme; `/app` start URL; network-first worker |

No existing Button/Card/Input/Badge component library or icon library exists. Keep CSS Modules and React/Next rather than installing a new UI stack. Package manager is npm; no committed lockfile. Preserve pinned dependency versions and scripts.

## Sensitive boundaries to preserve

- `lib/session.ts` derives identity from `supabase.auth.getClaims()`. User metadata is used only for display name. `app/app/layout.tsx` redirects anonymous sessions to `/login`.
- `lib/supabase/client.ts` is the browser publishable-key client. `lib/supabase/server.ts` uses server cookies; `lib/supabase/proxy.ts` + `proxy.ts` refresh sessions. `lib/supabase/admin.ts` uses the server-only secret. No DB/RLS state is inferred from repository code.
- Payment API, XPayments provider, reference/amount/currency/transaction validation and webhook logic stay byte-for-byte unchanged.
- `lib/workouts.ts` and the protected player stay byte-for-byte unchanged. No new video host, IDs or alternate auth path.
- Atendimento.Center retains conversations/runtime/routing. No model SDK, secrets, chat endpoint or direct agent database access is introduced.
- **Existing production readiness gaps:** member layout currently checks authentication, not product entitlements; progress/finish persistence and agent integration are not implemented; the webhook signature is an existing documented TODO. These do not block a Draft visual iteration, but this work must not claim production readiness or silently repair architecture.

## Mockup differences and implementation decisions

| Reference assumption | Repository evidence | Landing treatment |
|---|---|---|
| X online / personalized conversation | `/app/trainer` is explicitly UI preview; no SSE integration | Label Coach X and conversation preview as in development; no online dot or working-chat promise |
| Streak, readiness, body metrics and improvements | Command Center values are hardcoded; no real progress feed | Empty/illustrative preview with no member-specific numbers, chart trend or performance claim |
| Programs immediately available | Only WKT has verified workouts; other programs are concepts | WKT catalogue count may use `workouts.length`; HIIT Pro, Core 30 and Calisthenics marked future |
| 12-week offer / scheduled workout | Existing copy conflicts with checkout's 21-workout offer and future 12-week plan | Describe verified 21 guided workouts; do not claim an implemented schedule or today's personalized assignment |
| Community counts, ratings and testimonials | No authoritative evidence | Omit counts/testimonials/ratings entirely; community and Master marked in preparation |
| Real Sara photograph | No approved standalone production portrait in Git | Designed text/initial placeholder; do not crop a mockup portrait or invent a woman/biography |
| Proprietary orange logo and X | Existing logo is a CSS approximation | Import supplied orange raster artwork; preserve geometry; optimize raster sizes, defer vector production |
| Cinematic standalone photography | Only mockup compositions and existing WKT Drive thumbnails available | Use clean, bounded athlete-only excerpt of approved landing art if legible; no baked-in mockup UI/metrics. Record source/crop/resolution; full-resolution standalone exports remain a gap |

The four supplied approved-direction files were retrieved and visually inspected: `Maquete_Site.png` (779×2019), `Maquete_Team.png` (1672×941), wordmark (1240×292) and X concept (1254×1254). They are art direction, not approved production. Sara has no usable standalone portrait in this checkout. Persona blueprint still has legacy Ana/green references in later sections; current orange JSON and Sara identity rules take precedence, with documentation cleanup to record this explicitly.

## Exact implementation file plan

**Phase 1 — foundations:**

- Edit `app/globals.css`: canonical palette/typography/spacing/radii/shadows/motion and neutral page background; preserve legacy WKT layout selectors and provide compatibility aliases for existing token consumers.
- Add `components/ui/primitives.tsx`, `components/ui/primitives.module.css`: Button, ButtonLink, Input, Card, Badge, Container and SectionHeading, with focus/hover/disabled/loading states.
- Edit `components/MyTrainXLogo.tsx`: actual supplied wordmark / compact X using Next Image.
- Edit `app/layout.tsx`: local Inter/Barlow Condensed/Space Mono and metadata/icon wiring.
- Edit `app/manifest.ts`: orange icon references and charcoal theme; preserve `/app` start URL and standalone behavior.
- Add `public/brand/mytrainx-logo-orange.png`, `public/brand/x-icon-32.png`, `public/brand/x-icon-180.png`, `public/brand/x-icon-192.png`, `public/brand/x-icon-512.png`; remove obsolete `public/icon.svg` after replacing all references.
- Add `public/fonts/inter-latin-wght-normal.woff2`, `public/fonts/barlow-condensed-latin-700-normal.woff2`, `public/fonts/barlow-condensed-latin-800-normal.woff2`, `public/fonts/space-mono-latin-400-normal.woff2` plus `public/fonts/OFL-Inter.txt`, `public/fonts/OFL-Barlow-Condensed.txt`, `public/fonts/OFL-Space-Mono.txt`.
- Add `.gitignore` entry for generated TypeScript incremental state; keep auto-generated Next type/config changes out of feature commits unless required.

**Phase 2 — landing:**

- Replace `app/page.tsx` and `app/home.module.css` with the twelve-section hierarchy in Issue #9, using the new foundations.
- Add `components/LandingHeader.tsx` and `components/landing-header.module.css` for accessible compact desktop/mobile navigation; preserve existing public routes and login destinations.
- Add `components/landing/ProductPreview.tsx`, `components/landing/product-preview.module.css` for clearly labelled static Coach X/Command Center previews without false live state.
- Add `public/images/landing-athlete.webp` only as a clean extraction of approved reference pixels (no new identity or generated art); use existing WKT thumbnails only for WKT catalogue content if reliable.
- Design the reception WhatsApp link only within Sara's intentional contact section; do not initiate messages.

**Documentation / evidence:**

- Maintain this audit and `docs/status/CHANGELOG-2026-09-24-ORANGE-V1.md`.
- Update `docs/status/CURRENT.md`, `docs/design/README.md`, `docs/creative/ASSET-REGISTER.md`, and relevant stale notes in `docs/creative/personas/PERSONA-BLUEPRINT-v0.1.md`.
- Add `docs/analysis/2026-09-24-ORANGE-V1-VALIDATION.md` and screenshots under `docs/analysis/orange-v1/` for review.

No `app/app/*` implementation changes in this first delivery. Their exact future Phase 3 surfaces are listed above. Global typography/shared logo/button changes can affect them, so regression checks remain required.

## Staged commits and validation

1. Commit this audit + changelog before UI edits.
2. Commit reusable foundations + asset/font provenance and changelog.
3. Commit landing + honest preview states and changelog.
4. Commit responsive/regression evidence + current status and final changelog SHA references.

Baseline dependency install succeeded using pinned package.json with no new manifest/lockfile. Baseline `npm run typecheck` and production build completed; `.next/BUILD_ID` was produced. Next auto-generated `next-env.d.ts` and reformatted tsconfig; these are generated churn, not intentional product changes.

Validation plan: production build/typecheck; desktop/tablet/mobile screenshots, no overflow, keyboard/mobile navigation, real link targets and image loading; anonymous member gate and login validation; mock-only PIX submission because shared styles affect checkout; exact WKT ID/player source comparison and available playback checks. No live billing, no email sent without an authorized test recipient, no fake authenticated session.

This workspace has no Supabase/XPayments environment variables or authenticated member session. Real email delivery, authenticated playback and paid access cannot be claimed as validated from a public preview alone. Record executed checks and remaining live checks separately, keeping PR #10 Draft and unmerged.
