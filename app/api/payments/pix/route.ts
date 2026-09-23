import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

import { createAdminClient } from "@/lib/supabase/admin";
import { createPixCharge } from "@/lib/payments/xpayments";

const requestSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  document: z.string().min(11),
  source: z.record(z.string(), z.string()).optional(),
});

function priceCents() {
  const value = Number.parseInt(process.env.WKT_PRICE_CENTS || "6700", 10);
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error("Invalid WKT_PRICE_CENTS.");
  }
  return value;
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados de pagamento inválidos." }, { status: 400 });
  }

  const document = parsed.data.document.replace(/\D/g, "");
  if (![11, 14].includes(document.length)) {
    return NextResponse.json({ error: "CPF/CNPJ inválido." }, { status: 400 });
  }

  const reference =
    `MTX-WKT-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const amountCents = priceCents();
  const mode = process.env.XPAYMENTS_MODE || "mock";

  let admin: ReturnType<typeof createAdminClient> | null = null;

  if (process.env.SUPABASE_SECRET_KEY) {
    admin = createAdminClient();
  } else if (mode === "live") {
    return NextResponse.json(
      { error: "Checkout indisponível: backend de pedidos não configurado." },
      { status: 503 }
    );
  }

  try {
    if (admin) {
      const { error } = await admin.from("orders").insert({
        external_id: reference,
        user_email: parsed.data.email.toLowerCase(),
        provider: "xpayments",
        product_slug: "wkt-militar",
        amount_cents: amountCents,
        currency: "BRL",
        status: "creating",
        source: parsed.data.source || {},
      });
      if (error) throw error;
    }

    const charge = await createPixCharge({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      document,
      amountCents,
      reference,
    });

    if (admin) {
      await admin
        .from("orders")
        .update({
          provider_payment_id: charge.transactionId,
          status: charge.status,
        })
        .eq("external_id", reference);
    }

    return NextResponse.json({
      paymentId: charge.transactionId,
      reference: charge.reference,
      status: charge.status,
      copyPaste: charge.copyPaste,
      qrCodeImage: charge.qrCodeImage,
    });
  } catch (error) {
    console.error("pix_create_error", error);

    if (admin) {
      await admin
        .from("orders")
        .update({ status: "create_failed" })
        .eq("external_id", reference)
        .catch(() => undefined);
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "PIX_CREATE_FAILED" },
      { status: 400 }
    );
  }
}
