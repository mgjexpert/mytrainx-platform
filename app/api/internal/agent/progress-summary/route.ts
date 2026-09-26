import { NextResponse, type NextRequest } from "next/server";
import { requireAgentIntegration } from "@/lib/agent/integration-auth";
import { getAgentProgressSummary } from "@/lib/domain/agent-tools";

export async function GET(request: NextRequest) {
  const auth = requireAgentIntegration(request, "progress:read");
  if (!auth.ok) return auth.response;

  try {
    const data = await getAgentProgressSummary(auth.context.userId);
    return NextResponse.json({
      data,
      meta: {
        request_id: auth.context.requestId,
        user_id: auth.context.userId,
      },
    });
  } catch (error) {
    console.error("agent_tool_progress_summary_failed", {
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
