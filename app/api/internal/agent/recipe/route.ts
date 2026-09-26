import { NextResponse, type NextRequest } from "next/server";
import { requireAgentIntegration } from "@/lib/agent/integration-auth";
import { getAgentRecipe } from "@/lib/domain/agent-tools";

export async function GET(request: NextRequest) {
  const auth = requireAgentIntegration(request, "recipe:read");
  if (!auth.ok) return auth.response;
  const slug = request.nextUrl.searchParams.get("slug")?.trim() ?? "";
  if (!slug) return NextResponse.json({ error: "SLUG_REQUIRED" }, { status: 400 });
  try {
    const data = await getAgentRecipe(slug);
    return NextResponse.json({ data, meta: { request_id: auth.context.requestId, user_id: auth.context.userId } });
  } catch (error) {
    console.error("agent_tool_recipe_failed",{requestId:auth.context.requestId,userId:auth.context.userId,error});
    return NextResponse.json({error:"AGENT_TOOL_FAILED",request_id:auth.context.requestId},{status:500});
  }
}