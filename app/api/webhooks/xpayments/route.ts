import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const schema = z.object({
  event: z.string(),
  transaction_id: z.string().min(1),
  reference: z.string().min(1),
  amount: z.coerce.number().positive(),
  currency: z.string(),
  status: z.string(),
  method: z.string(),
  timestamp: z.string().optional(),
});

export async function POST(request: Request) {
  // TODO: Add cryptographic signature verification as soon as XPayments
  // documents the exact header + HMAC/signature scheme. Do not invent it.
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  const payload = parsed.data;
  const admin = createAdminClient();

  const { data: order, error } = await admin
    .from("orders")
    .select("*")
    .eq("external_id", payload.reference)
    .maybeSingle();

  if (error) {
    console.error("xpayments_webhook_order_lookup_failed", error);
    return NextResponse.json({ received: false }, { status: 500 });
  }

  if (!order) {
    return NextResponse.json({ received: false }, { status: 404 });
  }

  if (payload.currency !== "BRL" || payload.method !== "pix") {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  if (
    order.provider_payment_id &&
    order.provider_payment_id !== payload.transaction_id
  ) {
    return NextResponse.json({ received: false }, { status: 409 });
  }

  const receivedCents = Math.round(payload.amount * 100);
  if (receivedCents !== order.amount_cents) {
    return NextResponse.json({ received: false }, { status: 409 });
  }

  const succeeded =
    payload.event === "payment_intent.succeeded" &&
    payload.status === "succeeded";

  if (!succeeded) {
    await admin
      .from("orders")
      .update({ status: payload.status })
      .eq("id", order.id);

    return NextResponse.json({
      received: true,
      processed: false,
      status: payload.status,
    });
  }

  if (order.status === "succeeded") {
    return NextResponse.json({
      received: true,
      processed: true,
      duplicate: true,
    });
  }

  const paidAt = new Date().toISOString();

  const { error: orderUpdateError } = await admin
    .from("orders")
    .update({
      status: "succeeded",
      provider_payment_id: payload.transaction_id,
      paid_at: paidAt,
    })
    .eq("id", order.id);

  if (orderUpdateError) {
    console.error("xpayments_webhook_order_update_failed", orderUpdateError);
    return NextResponse.json({ received: false }, { status: 500 });
  }

  let productId = order.product_id;

  if (!productId) {
    const { data: product, error: productError } = await admin
      .from("products")
      .select("id")
      .eq("slug", order.product_slug)
      .maybeSingle();

    if (productError) {
      console.error("xpayments_webhook_product_lookup_failed", productError);
      return NextResponse.json({ received: false }, { status: 500 });
    }

    productId = product?.id ?? null;
  }

  const { data: entitlement, error: entitlementError } = await admin
    .from("entitlements")
    .upsert(
      {
        user_email: order.user_email,
        user_id: order.user_id,
        product_slug: order.product_slug,
        product_id: productId,
        status: "active",
        starts_at: paidAt,
        expires_at: null,
      },
      { onConflict: "user_email,product_slug" }
    )
    .select("id, product_id")
    .single();

  if (entitlementError) {
    console.error("xpayments_webhook_entitlement_failed", entitlementError);
    return NextResponse.json({ received: false }, { status: 500 });
  }

  if (order.user_id && entitlement.product_id) {
    const { data: programs, error: programError } = await admin
      .from("programs")
      .select("id")
      .eq("product_id", entitlement.product_id)
      .eq("active", true);

    if (programError) {
      console.error("xpayments_webhook_program_lookup_failed", programError);
      return NextResponse.json({ received: false }, { status: 500 });
    }

    for (const program of programs ?? []) {
      const { error: enrollmentError } = await admin
        .from("program_enrollments")
        .upsert(
          {
            user_id: order.user_id,
            program_id: program.id,
            entitlement_id: entitlement.id,
            status: "active",
          },
          { onConflict: "user_id,program_id" }
        );

      if (enrollmentError) {
        console.error("xpayments_webhook_enrollment_failed", enrollmentError);
        return NextResponse.json({ received: false }, { status: 500 });
      }
    }
  }

  console.info("xpayments_payment_succeeded", {
    reference: payload.reference,
    transactionId: payload.transaction_id,
  });

  return NextResponse.json({ received: true, processed: true });
}
