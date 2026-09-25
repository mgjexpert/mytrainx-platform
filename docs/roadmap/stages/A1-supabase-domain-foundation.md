# Stage A1 — Supabase Domain Foundation

**Status:** IN REVIEW  
**Owner:** MyTrainX Implementation  
**Reviewer:** Architecture & Integration  
**Last reviewed:** 2026-09-24  
**Dependency:** access to run schema SQL manually or via authorized Supabase connection

## Scope

Create/validate:
- profiles
- products
- orders
- entitlements
- subscriptions
- programs
- workouts
- program_days
- workout_progress
- library_items
- events
- user identities as needed

## Requirements

- RLS on exposed user-data tables
- no broad client writes to finance/access tables
- Supabase Auth SSR
- WKT program + 21 verified workouts seed
- no secrets committed
- advisors after DDL
- generated TypeScript types

## Acceptance

- authenticated user can access only own private rows
- catalog access behaves as documented
- server privileged path can create/update order and entitlement
- WKT program data exists
- security/performance advisor review recorded


## Implementation update — 2026-09-25

Applied to Supabase project `oitfnnsfgaxcxqvizorw`:

- profiles
- products
- orders
- entitlements
- subscriptions
- programs
- workouts
- program_days
- program_enrollments
- workout_progress
- user_preferences
- content_items
- content_sources
- content_product_access
- recipes
- events

Also:
- WKT product/program + 21 verified workouts seeded
- RLS and least-privilege grants applied
- advisor security findings resolved
- generated TypeScript database types added
- authenticated identity sync links historical email purchases/entitlements to user IDs
- WKT member routes now require active entitlement

Remaining before VALIDATED:
- preview build/typecheck
- Supabase Auth Site URL / redirect template verification in dashboard
- end-to-end Magic Link test with a real test user
