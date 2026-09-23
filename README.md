# MyTrainX Platform

AI-first fitness ecosystem for **mytrainx.fit**.

## Product hierarchy

- **MyTrainX AI / X** — Personal AI Trainer and primary product
- **Programs** — structured paid training content
- **WKT Militar** — first paid program
- **MyTrainX Master** — recurring premium membership
- **Community** — member community and future WhatsApp integration
- **Library** — manuals, guides, ebooks and premium resources
- **Events** — live and in-person experiences

## Repositories

- Main platform: `mgjexpert/mytrainx-platform`
- Legacy/reference product: `mgjexpert/wkt-militar`

The WKT repository remains operational during migration. Do not break or retire it until MyTrainX has passed production cutover checks.

## Stack

- Next.js App Router + TypeScript
- Vercel
- Supabase Postgres + Auth + RLS
- XPayments PIX S2S
- Google Drive Preview for WKT full workout playback during MVP
- OpenAI server-side for MyTrainX AI
- PWA

## Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Read **AGENTS.md** and **docs/product/platform-spec.json** before making architectural changes.
