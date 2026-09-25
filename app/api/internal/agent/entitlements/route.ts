import { NextResponse, type NextRequest } from "next/server";
import { requireAgentIntegration } from "@/lib/agent/integration-auth";
import { getAgentEntitlements } from "@/lib/domain/agent-tools";

export async function GET(request: NextRequest) {
  const auth = requireAgentIntegration(request, "entitlements:read");
  if (!auth.ok) return auth.response;

  try {
    const data = await getAgentEntitlements(auth.context.userId);
    return NextResponse.json({
      data,
      meta: {
        request_id: auth.context.requestId,
        user_id: auth.context.userId,
      },
    });
  } catch (error) {
    console.error("agent_tool_entitlements_failed", {
      requestId: auth.context.requestId,
      userId: auth.context.userId,
      error,
    });
    return NextResponse.json(
      { error: "AGENT_TOOL_FAILED", request_id: auth.context.requestId },
      { status: 500 }
    );
  }
}
