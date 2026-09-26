import { createClient } from "@/lib/supabase/server";

export async function getActiveProduct(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, slug, name, product_type, price_cents, currency, metadata")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) {
    console.error("product_lookup_failed", { slug, error });
    return null;
  }

  return data;
}

export function formatPrice(cents: number, currency = "BRL") {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
