import { z } from "zod";

export const pixInputSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  document: z.string().min(11).max(14),
  amountCents: z.number().int().positive(),
  externalId: z.string().min(6),
});

export type PixInput = z.infer<typeof pixInputSchema>;

export type PixCharge = {
  paymentId: string;
  reference: string;
  status: string;
  copyPaste: string;
  qrCodeImage?: string;
};

const OFFICIAL_PIX_CHARGE_URL =
  "https://api.xpayments.digital/api/v1/payments/charge";

export async function createPixCharge(input: PixInput): Promise<PixCharge> {
  const parsed = pixInputSchema.parse(input);

  if ((process.env.XPAYMENTS_MODE || "mock") !== "live") {
    return {
      paymentId: `mock_${parsed.externalId}`,
      reference: parsed.externalId,
      status: "pending",
      copyPaste: "PIX-MOCK-MYTRAINX-NAO-PAGAR",
    };
  }

  const apiKey = process.env.XPAYMENTS_API_KEY;
  if (!apiKey) throw new Error("XPAYMENTS_API_KEY is required in live mode.");

  const response = await fetch(
    process.env.XPAYMENTS_CHARGE_URL || OFFICIAL_PIX_CHARGE_URL,
    {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parsed.amountCents,
        currency: "BRL",
        payment_method_types: ["pix"],
        reference: parsed.externalId,
        customer: {
          name: parsed.name,
          document: parsed.document.replace(/\D/g, ""),
        },
        metadata: {
          order_id: parsed.externalId,
          description: "MyTrainX",
        },
      }),
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data?.success === false) {
    throw new Error(
      `XPayments PIX create failed: ${String(data?.error?.code || data?.message || response.status)}`
    );
  }

  const action = data?.action || {};
  const copyPaste = action.copyPaste || action.pixString || "";
  if (!data?.transactionId || !copyPaste) {
    throw new Error("XPayments returned an incomplete PIX action.");
  }

  return {
    paymentId: String(data.transactionId),
    reference: String(data.reference || parsed.externalId),
    status: String(data.status || "pending"),
    copyPaste: String(copyPaste),
    qrCodeImage: action.qrCodeBase64 || action.qrCode || action.qrCodeUrl || undefined,
  };
}
