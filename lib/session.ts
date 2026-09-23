import { createClient } from "@/lib/supabase/server";

export type Session = {
  email: string;
  name?: string;
  userId?: string;
};

export async function getSession(): Promise<Session | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims?.sub) return null;

  const email = typeof claims.email === "string" ? claims.email : "";
  const name =
    typeof claims.user_metadata === "object" &&
    claims.user_metadata &&
    "full_name" in claims.user_metadata
      ? String((claims.user_metadata as { full_name?: unknown }).full_name || "")
      : email.split("@")[0];

  return {
    userId: String(claims.sub),
    email,
    name,
  };
}

export async function destroySession() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
