import { z } from "zod";

export const pixInputSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  document: z.string().min(11).max(14),
  amountCents: z.number().int().positive(),
  reference: z.string().min(6),
});

export type PixInput = z.infer<typeof pixInputSchema>;

export type PixCharge = {
  transactionId: string;
  reference: string;
  status: string;
  copyPaste: string;
  qrCodeImage?: string;
};

const DEFAULT_ENDPOINT =
  "https://api.xpayments.digital/api/v1/payments/charge";

export async function createPixCharge(input: PixInput): Promise<PixCharge> {
  const parsed = pixInputSchema.parse(input);

  if ((process.env.XPAYMENTS_MODE || "mock") !== "live") {
    return {
      transactionId: `mock_${parsed.reference}`,
      reference: parsed.reference,
      status: "pending",
      copyPaste:
        "00020101021226890014BR.GOV.BCB.PIX2567PIX-MOCK-MYTRAINX-NAO-PAGAR520400005303986540567.005802BR5909MYTRAINX6007GOIANIA62070503***6304ABCD",
    };
  }

  const apiKey = process.env.XPAYMENTS_API_KEY;
  if (!apiKey) throw new Error("XPAYMENTS_API_KEY is not configured.");

  const response = await fetch(
    process.env.XPAYMENTS_CHARGE_URL || DEFAULT_ENDPOINT,
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
        reference: parsed.reference,
        customer: {
          name: parsed.name,
          document: parsed.document.replace(/\D/g, ""),
        },
        metadata: {
          order_id: parsed.reference,
          product: "wkt-militar",
          description: "MyTrainX - WKT Militar",
        },
      }),
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data?.success === false) {
    throw new Error(
      String(
        data?.error?.code ||
          data?.error?.message ||
          data?.message ||
          `XPAYMENTS_HTTP_${response.status}`
      )
    );
  }

  const transactionId = data?.transactionId;
  const action = data?.action || {};
  const copyPaste = action.copyPaste || action.pixString;

  if (!transactionId || !copyPaste) {
    throw new Error("XPayments returned an incomplete PIX response.");
  }

  return {
    transactionId: String(transactionId),
    reference: String(data?.reference || parsed.reference),
    status: String(data?.status || "pending"),
    copyPaste: String(copyPaste),
    qrCodeImage: action.qrCodeBase64 || action.qrCode || action.qrCodeUrl,
  };
}
