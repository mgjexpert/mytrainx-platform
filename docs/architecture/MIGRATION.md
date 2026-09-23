# Migration: WKT → MyTrainX

## Principle

MyTrainX is **not** a rename of WKT. It is the parent ecosystem.

The existing WKT production project remains available until MyTrainX reaches production parity.

## Reuse from WKT

Reuse:

- Next.js/Vercel deployment patterns
- PWA shell where useful
- the verified 21 workout catalog
- Google Drive Preview playback
- XPayments PIX S2S contract
- successful sales-page conversion patterns

Do not inherit permanently:

- WKT as global brand
- demo access-code authentication
- Neon/Drizzle-specific database coupling
- WKT-only navigation/information architecture

## Route evolution

Legacy concept:

```
/
 /oferta
 /checkout
 /app
 /app/workout/[slug]
```

MyTrainX target:

```
/
 /trainer
 /programas
 /programas/wkt-militar
 /programas/wkt-militar/oferta
 /master
 /community
 /library
 /events
 /checkout
 /login

 /app
 /app/trainer
 /app/hoje
 /app/programas
 /app/programas/wkt-militar
 /app/workout/[slug]
 /app/performance
 /app/library
 /app/community
 /app/master
 /app/profile
```

## Cutover

Do not point `mytrainx.fit` at production until:

- Supabase auth works
- entitlement gating works
- PIX flow works end-to-end
- WKT playback works
- Command Center passes desktop/mobile review
- Preview uses mock billing
