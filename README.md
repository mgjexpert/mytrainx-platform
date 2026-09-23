# MyTrainX Platform

**MyTrainX** is an AI-first fitness ecosystem. The AI Personal Trainer ("X") is the central product; structured programs such as **WKT Militar** are paid modules inside the same member account.

## Repositories

- **Primary platform:** `mgjexpert/mytrainx-platform`
- **Legacy/reference product:** `mgjexpert/wkt-militar`

The WKT repository must remain operational during migration. MyTrainX evolves from its proven video/PIX foundation without making the WKT repository the permanent parent architecture.

## Stack

- Next.js 16 App Router + TypeScript
- Vercel
- Supabase Postgres + Auth + RLS
- XPayments PIX S2S
- Google Drive Preview for full WKT workouts during MVP
- Public CDN / Vercel Blob later for marketing teaser clips
- AI Trainer backend to be added server-side

## Supabase

Environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ltfecmiipwkvvrnzpbsg.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
```

The publishable key is intended for browser use. **Never** expose `SUPABASE_SECRET_KEY`.

Authentication uses `@supabase/ssr`, cookies and Next.js `proxy.ts`.

## XPayments

Production PIX creation:

```
POST https://api.xpayments.digital/api/v1/payments/charge
x-api-key: <server secret>
```

Rules:

- amount is in minor units (`6700 = R$67,00`)
- pending is not paid
- persist the order before creating the charge
- only `payment_intent.succeeded + status=succeeded` activates entitlement
- webhook processing is idempotent
- signature verification must follow the official XPayments scheme when documented

## WKT

The 21 verified workouts and existing Google Drive Preview playback are preserved.

WKT becomes:

```
/programas/wkt-militar
/programas/wkt-militar/oferta
/app/programas/wkt-militar
/app/workout/[slug]
```

## Development

```bash
cp .env.example .env.local
npm install
npm run dev
npm run typecheck
npm run build
```

Preview deployments must use:

```
XPAYMENTS_MODE=mock
```

Do not use a live XPayments key in Preview if avoidable.

## Documentation

Start with:

1. `AGENTS.md`
2. `docs/product/mytrainx-platform-spec.json`
3. `docs/architecture/MIGRATION.md`
4. `docs/architecture/SUPABASE.md`
5. `docs/architecture/PAYMENTS.md`
6. `docs/design/README.md`
