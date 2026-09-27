import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import {
  createAtendimentoConversation,
  getAtendimentoGatewayStatus,
  sendAtendimentoMessage,
} from "@/lib/agent/atendimento-gateway";

export async function GET() {
  const session = await getSession();
  if (!session?.userId) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  return NextResponse.json({ data: getAtendimentoGatewayStatus() });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session?.userId) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const status = getAtendimentoGatewayStatus();
  if (!status.configured) {
    return NextResponse.json({ error: "ATENDIMENTO_CENTER_GATEWAY_NOT_CONFIGURED" }, { status: 503 });
  }

  const body = await request.json().catch(() => null) as
    | { conversation_id?: string; message?: string }
    | null;

  const message = body?.message?.trim();
  if (!message) return NextResponse.json({ error: "MESSAGE_REQUIRED" }, { status: 400 });

  try {
    let conversationId = body?.conversation_id?.trim();
    if (!conversationId) {
      const conversation = await createAtendimentoConversation(session.userId);
      conversationId = conversation.id;
    }

    const upstream = await sendAtendimentoMessage(session.userId, conversationId, message);
    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      console.error("coach_x_gateway_failed", { status: upstream.status, detail });
      return NextResponse.json({ error: "COACH_X_GATEWAY_FAILED" }, { status: 502 });
    }

    const contentType = upstream.headers.get("content-type") || "";
    if (contentType.includes("text/event-stream") && upstream.body) {
      return new Response(upstream.body, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
          "X-MyTrainX-Conversation-Id": conversationId,
        },
      });
    }

    const data = await upstream.json().catch(() => null);
    return NextResponse.json({ data, conversation_id: conversationId });
  } catch (error) {
    console.error("coach_x_gateway_error", error);
    return NextResponse.json({ error: "COACH_X_GATEWAY_FAILED" }, { status: 502 });
  }
}
