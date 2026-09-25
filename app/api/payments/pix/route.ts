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

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados de pagamento inválidos." },
      { status: 400 }
    );
  }

  const document = parsed.data.document.replace(/\D/g, "");
  if (![11, 14].includes(document.length)) {
    return NextResponse.json({ error: "CPF/CNPJ inválido." }, { status: 400 });
  }

  const reference =
    `MTX-WKT-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  if (!process.env.SUPABASE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Checkout indisponível: backend de pedidos não configurado." },
      { status: 503 }
    );
  }

  const admin = createAdminClient();

  try {
    const { data: product, error: productError } = await admin
      .from("products")
      .select("id, slug, name, price_cents, currency, active")
      .eq("slug", "wkt-militar")
      .eq("active", true)
      .maybeSingle();

    if (productError) throw productError;
    if (!product?.price_cents) {
      return NextResponse.json(
        { error: "Produto indisponível para compra." },
        { status: 503 }
      );
    }

    const amountCents = product.price_cents;

    const { error: orderError } = await admin.from("orders").insert({
      external_id: reference,
      user_email: parsed.data.email.toLowerCase(),
      provider: "xpayments",
      product_slug: product.slug,
      product_id: product.id,
      amount_cents: amountCents,
      currency: product.currency,
      status: "creating",
      source: parsed.data.source || {},
    });
    if (orderError) throw orderError;

    const charge = await createPixCharge({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      document,
      amountCents,
      reference,
    });

    {
      const { error } = await admin
        .from("orders")
        .update({
          provider_payment_id: charge.transactionId,
          status: charge.status,
        })
        .eq("external_id", reference);

      if (error) throw error;
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

    try {
        await admin
          .from("orders")
          .update({ status: "create_failed" })
          .eq("external_id", reference);
    } catch (updateError) {
      console.error("pix_create_status_update_failed", updateError);
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "PIX_CREATE_FAILED" },
      { status: 400 }
    );
  }
}
