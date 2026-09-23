# Database Model & RLS

This is the target schema design for the dedicated MyTrainX Supabase project.

**Do not apply DDL blindly.** When Supabase MCP access to project `ltfecmiipwkvvrnzpbsg` is available, inspect the real database first, then apply the schema incrementally and run security/performance advisors.

## Core tables

### profiles

One row per authenticated user.

- id uuid PK -> auth.users.id
- display_name text
- avatar_url text
- timezone text
- training_goal text
- experience_level text
- equipment jsonb
- preferences jsonb
- created_at timestamptz
- updated_at timestamptz

RLS:
- authenticated user can SELECT own row
- authenticated user can UPDATE own row
- INSERT only own id

### products

Commercial catalog.

- id uuid PK
- slug text unique
- name text
- type text: program | ebook | subscription | event | addon
- price_cents integer
- currency text
- active boolean
- metadata jsonb

Client access:
- SELECT active products
- no client writes

### orders

Financial records.

- id uuid PK
- external_id text unique
- user_email text
- user_id uuid nullable
- provider text
- provider_payment_id text unique nullable
- product_slug text
- amount_cents integer
- currency text
- status text
- source jsonb
- created_at timestamptz
- paid_at timestamptz nullable

RLS:
- authenticated user may SELECT orders matching verified account email/user id
- no client INSERT/UPDATE/DELETE
- writes only through server privileged client

### entitlements

Access rights.

- id uuid PK
- user_email text
- user_id uuid nullable
- product_slug text
- status text: active | revoked | expired
- starts_at timestamptz
- expires_at timestamptz nullable
- created_at timestamptz

Unique:
- lower(user_email) + product_slug during initial email-based migration
- later normalize primarily to user_id

RLS:
- authenticated member can SELECT own entitlement
- no client writes

### subscriptions

Recurring Master membership.

- id uuid PK
- user_id uuid
- user_email text
- plan_slug text
- provider text
- provider_subscription_id text
- status text
- current_period_start timestamptz
- current_period_end timestamptz
- cancel_at_period_end boolean

RLS:
- member SELECT own
- server-only writes

## Training tables

### programs

- id uuid PK
- slug unique
- name
- description
- cover_url
- active
- metadata jsonb

### workouts

- id uuid PK
- program_id FK
- number integer
- slug unique
- code text
- title text
- focus text
- provider text
- provider_asset_id text
- duration_seconds integer nullable
- active boolean

### program_days

- id uuid PK
- program_id FK
- week integer
- weekday integer
- workout_id FK
- order_index integer

### workout_progress

- id uuid PK
- user_id uuid
- workout_id uuid
- started_at timestamptz
- completed_at timestamptz nullable
- watch_seconds integer
- percentage numeric
- metadata jsonb

RLS:
- user owns progress row through user_id = auth.uid()

## AI tables

### ai_conversations

- id uuid PK
- user_id uuid
- channel text: web | whatsapp
- title text nullable
- created_at
- updated_at

### ai_messages

- id uuid PK
- conversation_id uuid
- user_id uuid
- role text
- content text
- metadata jsonb
- created_at

RLS:
- user_id must equal auth.uid()
- no cross-user reads

Do not store sensitive medical diagnoses by default.

## Library & community

### library_items

- id uuid PK
- slug unique
- title
- type
- description
- cover_url
- asset_url
- price_cents nullable
- master_included boolean
- active boolean
- metadata jsonb

### events

- id uuid PK
- slug unique
- title
- description
- type
- start_at
- end_at
- location_or_url
- capacity
- master_only
- price_cents nullable
- status

## Public Data API grants

Supabase RLS and Postgres grants are separate.

When schema is applied, explicitly review/grant only the operations needed by `anon` and `authenticated`. Never grant broad write access to financial/entitlement tables.

## Security checks after DDL

Run Supabase advisors for:

- security
- performance

Fix:
- missing RLS
- overly broad policies
- insecure functions/views
- missing indexes on ownership/filter columns
