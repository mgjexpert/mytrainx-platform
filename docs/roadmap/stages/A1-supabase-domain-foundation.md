# Stage A1 — Supabase Domain Foundation

**Status:** PLANNED  
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
