import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/session";

export async function getActiveEntitlement(productSlug: string) {
  const session = await getSession();
  if (!session) return null;

  const supabase = await createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("entitlements")
    .select("id, product_slug, status, starts_at, expires_at")
    .eq("product_slug", productSlug)
    .eq("status", "active")
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("entitlement_lookup_failed", {
      productSlug,
      userId: session.userId,
      error,
    });
    return null;
  }

  return data;
}

export async function hasActiveEntitlement(productSlug: string) {
  return Boolean(await getActiveEntitlement(productSlug));
}
