# Validation Protocol

**Version:** 1.0  
**Reviewed:** 2026-09-24

Every development stage has explicit acceptance criteria.

## Evidence classes

### CODE
- CI result
- build/typecheck
- tests
- reviewed diff

### UI
- desktop screenshot
- mobile screenshot
- browser smoke test
- console/runtime error check

### DATA
- migration list
- schema inspection
- RLS/policy inspection
- Supabase security/performance advisors

### INTEGRATION
- request/response examples
- auth verification
- idempotency evidence
- failure-mode test

### BUSINESS
- product owner approval
- price/offer validation
- customer flow confirmation

## Validation record

Each validated stage should append an entry to `docs/status/CHANGELOG.md` containing:

- date
- version
- stage
- commit/PR
- validator
- evidence
- known limitations

A merge is not the same thing as validation.
