import { createAdminClient } from "@/lib/supabase/admin";

function objectPreferences(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? { ...(value as Record<string, unknown>) }
    : {};
}

export async function getCurrentProgramSlug(userId: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("preferences")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  const prefs = objectPreferences(data?.preferences);
  const value = prefs.current_program_slug;
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function setCurrentProgramSlug(userId: string, programSlug: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("preferences")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;

  const preferences = objectPreferences(data?.preferences);
  preferences.current_program_slug = programSlug;
  preferences.current_program_selected_at = new Date().toISOString();

  const { error: updateError } = await admin
    .from("profiles")
    .upsert(
      {
        id: userId,
        preferences,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
  if (updateError) throw updateError;
}
