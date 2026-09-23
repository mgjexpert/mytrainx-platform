import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      appUrlConfigured: Boolean(process.env.NEXT_PUBLIC_APP_URL),
      supabaseUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      supabasePublishableKeyConfigured: Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
      ),
      supabaseSecretKeyConfigured: Boolean(process.env.SUPABASE_SECRET_KEY),
      xpaymentsMode: process.env.XPAYMENTS_MODE || "mock",
      xpaymentsApiKeyConfigured: Boolean(process.env.XPAYMENTS_API_KEY),
      priceCents: Number.parseInt(process.env.WKT_PRICE_CENTS || "6700", 10),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
