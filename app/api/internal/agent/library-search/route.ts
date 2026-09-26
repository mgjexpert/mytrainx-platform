import { NextResponse, type NextRequest } from "next/server";
import { requireAgentIntegration } from "@/lib/agent/integration-auth";
import { searchAgentKnowledge } from "@/lib/domain/agent-tools";

export async function GET(request: NextRequest) {
  const auth = requireAgentIntegration(request, "knowledge:read");
  if (!auth.ok) return auth.response;
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (query.length < 2) return NextResponse.json({ error: "QUERY_TOO_SHORT" }, { status: 400 });
  try {
    const data = await searchAgentKnowledge(query, Number(request.nextUrl.searchParams.get("limit") || 6));
    return NextResponse.json({ data, meta: { request_id: auth.context.requestId, user_id: auth.context.userId, query } });
  } catch (error) {
    console.error("agent_tool_library_search_failed",{requestId:auth.context.requestId,userId:auth.context.userId,error});
    return NextResponse.json({error:"AGENT_TOOL_FAILED",request_id:auth.context.requestId},{status:500});
  }
}