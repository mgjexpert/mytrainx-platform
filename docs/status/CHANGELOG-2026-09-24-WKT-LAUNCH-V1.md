# WKT Militar Launch V1 — Changelog

**Date:** 2026-09-24  
**Branch:** `feat/wkt-launch-v1`  
**PR:** #12  
**Status:** IN REVIEW

## Objective

Prepare the WKT Militar acquisition and member-delivery path for launch review on top of MyTrainX Orange V1.

## Implemented

### Cold-lead sales page
- Rebuilt `/oferta` and shared route `/programas/wkt-militar/oferta`.
- Structured the page for cold traffic:
  1. clear promise;
  2. friction/problem framing;
  3. product mechanism;
  4. follow-along demo;
  5. how it works;
  6. 21-mission structure;
  7. who it is for;
  8. who it is not for / safety;
  9. R$67 offer;
  10. FAQ;
  11. final CTA.
- Removed unsupported social-proof claims, transformation claims, countdowns and artificial scarcity.
- Preserved only verified product facts: 21 Drive-backed sessions and the R$67 current offer.
- Added responsive/mobile sticky CTA.

### Tracking + checkout
- Preserves `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `gclid`, `ttclid` and `src`.
- Passes source metadata into the existing PIX API payload.
- Simplified checkout to the single current WKT 21 offer.
- Improved PIX copy state and error handling.
- Avoided Next.js `useSearchParams` prerender bailout by collecting query data in a client effect.

### WKT member experience
- Uses the existing 21 verified workout records and Drive IDs.
- Improved mission catalogue presentation.
- Added previous/next mission navigation in the workout player.
- Replaced fake completion persistence with explicit navigation.
- Clearly states that completion/progress persistence is not yet connected.

## Build evidence

The earlier working branch head `99501fca51157f1d320ab98ab277ecabb4f5d8d1` reached **READY** on Vercel after the checkout prerender fix.

The clean launch branch is being validated independently by Vercel.

## Production dependencies still required

WKT is not fully production-commercial until the environment confirms:

- MyTrainX Supabase project/tables available;
- `orders` and `entitlements` backend state present;
- XPayments live credentials configured;
- webhook endpoint registered with XPayments;
- webhook signature scheme implemented when provider documentation is available;
- authenticated user can access WKT after payment confirmation.

The connected Supabase account available to this session currently lists other projects and does not expose a MyTrainX project, so these database assertions cannot be independently verified from here.

## Do not merge until

- PR #12 preview reaches READY;
- PV is visually reviewed;
- checkout is reviewed in preview;
- authenticated WKT player is checked in the real configured environment;
- Product Owner approves the current launch presentation.
