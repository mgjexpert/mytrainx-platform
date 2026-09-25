import type { User } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";

function displayNameFromUser(user: User) {
  const metadata = user.user_metadata;
  const candidate =
    typeof metadata?.full_name === "string"
      ? metadata.full_name
      : typeof metadata?.name === "string"
        ? metadata.name
        : undefined;

  return candidate?.trim() || user.email?.split("@")[0] || null;
}

export async function syncAuthenticatedUser(user: User) {
  const email = user.email?.trim().toLowerCase();
  if (!email) return;

  const admin = createAdminClient();

  const { error: profileError } = await admin.from("profiles").upsert(
    {
      id: user.id,
      display_name: displayNameFromUser(user),
    },
    { onConflict: "id" }
  );
  if (profileError) throw profileError;

  const linkResults = await Promise.all([
    admin
      .from("orders")
      .update({ user_id: user.id })
      .eq("user_email", email)
      .is("user_id", null),
    admin
      .from("entitlements")
      .update({ user_id: user.id })
      .eq("user_email", email)
      .is("user_id", null),
    admin
      .from("subscriptions")
      .update({ user_id: user.id })
      .eq("user_email", email)
      .is("user_id", null),
  ]);

  for (const result of linkResults) {
    if (result.error) throw result.error;
  }

  const { data: entitlements, error: entitlementError } = await admin
    .from("entitlements")
    .select("id, product_id, product_slug")
    .eq("user_id", user.id)
    .eq("status", "active");

  if (entitlementError) throw entitlementError;

  for (const entitlement of entitlements ?? []) {
    let productId = entitlement.product_id;

    if (!productId) {
      const { data: product, error: productError } = await admin
        .from("products")
        .select("id")
        .eq("slug", entitlement.product_slug)
        .maybeSingle();

      if (productError) throw productError;
      productId = product?.id ?? null;

      if (productId) {
        const { error: updateError } = await admin
          .from("entitlements")
          .update({ product_id: productId })
          .eq("id", entitlement.id);
        if (updateError) throw updateError;
      }
    }

    if (!productId) continue;

    const { data: programs, error: programError } = await admin
      .from("programs")
      .select("id")
      .eq("product_id", productId)
      .eq("active", true);

    if (programError) throw programError;

    for (const program of programs ?? []) {
      const { error: enrollmentError } = await admin
        .from("program_enrollments")
        .upsert(
          {
            user_id: user.id,
            program_id: program.id,
            entitlement_id: entitlement.id,
            status: "active",
          },
          { onConflict: "user_id,program_id" }
        );
      if (enrollmentError) throw enrollmentError;
    }
  }
}
