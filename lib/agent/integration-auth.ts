import { createHmac, timingSafeEqual } from "crypto";
import { z } from "zod";
import { NextResponse, type NextRequest } from "next/server";

const headerSchema = z.object({
  service: z.string().min(1),
  userId: z.string().uuid(),
  timestamp: z.coerce.number().int().positive(),
  scope: z.string().min(1),
  requestId: z.string().min(8).max(200),
  signature: z.string().regex(/^[a-f0-9]{64}$/i),
});

export type AgentIntegrationContext = {
  service: string;
  userId: string;
  scopes: Set<string>;
  requestId: string;
};

function unauthorized(message: string, status = 401) {
  return NextResponse.json({ error: message }, { status });
}

export function requireAgentIntegration(
  request: NextRequest,
  requiredScope: string
):
  | { ok: true; context: AgentIntegrationContext }
  | { ok: false; response: NextResponse } {
  const secret = process.env.MYTRAINX_AGENT_SHARED_SECRET;
  if (!secret) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "AGENT_INTEGRATION_NOT_CONFIGURED" },
        { status: 503 }
      ),
    };
  }

  const parsed = headerSchema.safeParse({
    service: request.headers.get("x-mtx-service"),
    userId: request.headers.get("x-mtx-user-id"),
    timestamp: request.headers.get("x-mtx-timestamp"),
    scope: request.headers.get("x-mtx-scope"),
    requestId: request.headers.get("x-mtx-request-id"),
    signature: request.headers.get("x-mtx-signature"),
  });

  if (!parsed.success) {
    return { ok: false, response: unauthorized("INVALID_INTEGRATION_HEADERS") };
  }

  const allowedService =
    process.env.MYTRAINX_AGENT_ALLOWED_SERVICE || "atendimento-center";

  if (parsed.data.service !== allowedService) {
    return { ok: false, response: unauthorized("SERVICE_NOT_ALLOWED", 403) };
  }

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parsed.data.timestamp) > 90) {
    return { ok: false, response: unauthorized("STALE_INTEGRATION_REQUEST") };
  }

  const scopes = new Set(
    parsed.data.scope
      .split(/[ ,]+/)
      .map((scope) => scope.trim())
      .filter(Boolean)
  );

  if (!scopes.has(requiredScope)) {
    return { ok: false, response: unauthorized("SCOPE_NOT_ALLOWED", 403) };
  }

  const pathname = new URL(request.url).pathname;
  const canonical = [
    request.method.toUpperCase(),
    pathname,
    parsed.data.service,
    parsed.data.userId,
    String(parsed.data.timestamp),
    [...scopes].sort().join(" "),
    parsed.data.requestId,
  ].join("\n");

  const expected = createHmac("sha256", secret)
    .update(canonical)
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(parsed.data.signature, "hex");

  if (
    expectedBuffer.length !== receivedBuffer.length ||
    !timingSafeEqual(expectedBuffer, receivedBuffer)
  ) {
    return { ok: false, response: unauthorized("INVALID_SIGNATURE") };
  }

  return {
    ok: true,
    context: {
      service: parsed.data.service,
      userId: parsed.data.userId,
      scopes,
      requestId: parsed.data.requestId,
    },
  };
}
