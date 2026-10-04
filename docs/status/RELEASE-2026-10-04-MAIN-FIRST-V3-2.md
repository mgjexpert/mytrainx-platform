# Release — Main-first V3.2

**Date:** 2026-10-04  
**Branch:** `main`  
**Mode:** continuous production delivery

## Objective

Continue every feasible MyTrainX product-quality stage directly on `main`, while preserving truthful safety, rights, access and integration gates.

## Delivered

### Product UI
- real editable Profile
- operational member Community
- premium active Programs catalog
- premium public/member Master
- category-correct Library art for Kitchen/Nutrition
- precise Coach X gateway state messaging

### Architecture
- Atendimento ENV alias compatibility
- no duplicate agent runtime introduced
- existing owner-only profile RLS reused
- no unnecessary database migration

### Repository hygiene
- obsolete WKT PR #12 closed
- `main` remains canonical

## Current hard blockers

- Atendimento.Center gateway token
- FoodData Central API key + nutrition review
- qualified specialist sign-off for HIIT/foundation ebooks/scientific Progress retrieval
- missing bespoke production media in Drive for Coach X/Specialists/App UI/Micaela

These are explicit external/review dependencies, not reasons to roll back public GREEN content.

## Release rule

GREEN content and product capability continue to ship.  
AMBER content continues to be rewritten/prepared.  
A gate requiring credentials, rights or specialist sign-off is not converted to GREEN by code alone.
