# Supabase Architecture

## Project

Project ref:

`ltfecmiipwkvvrnzpbsg`

Public URL:

`https://ltfecmiipwkvvrnzpbsg.supabase.co`

Use the new publishable/secret key model.

## Environment

Client-safe:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

Server-only:

```
SUPABASE_SECRET_KEY
```

## Next.js SSR

Use `@supabase/ssr`:

- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/proxy.ts`
- root `proxy.ts`

Do not authorize using a raw cookie session object alone.

## Auth

Preferred user experience:

1. user enters email
2. Supabase sends Magic Link / OTP
3. callback verifies token/code
4. session is stored in cookies
5. server checks entitlement before premium content

Configure Supabase Auth Site URL and Redirect URLs for:

- `https://mytrainx.fit`
- Vercel Preview domains as needed
- local development

For PKCE Magic Link, configure the email template to send the token hash to:

`/auth/confirm?token_hash={{ .TokenHash }}&type=email`

## RLS

Enable RLS on every exposed public table.

User-owned tables must use ownership predicates, not merely `TO authenticated`.

Examples of user-scoped records:

- profiles
- orders (read only)
- entitlements (read only)
- workout_progress
- AI conversations/messages

Public catalog tables may expose active rows only:

- programs
- workouts
- program_days
- selected library items
- public events

## Data API

New Supabase projects may require explicit grants before tables are exposed through the Data API. RLS and GRANTs are separate controls.

## Server privileged operations

Use `SUPABASE_SECRET_KEY` only in server-only code for:

- payment order creation/update
- webhook fulfillment
- entitlement activation
- admin workflows

Never import the admin client into a Client Component.
