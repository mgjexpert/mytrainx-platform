"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";

function clean(value: FormDataEntryValue | null, max = 120) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function saveProfile(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) throw new Error("AUTH_REQUIRED");

  const supabase = await createClient();
  const equipment = formData.getAll("equipment").filter((value): value is string => typeof value === "string");

  const payload = {
    id: session.userId,
    display_name: clean(formData.get("display_name"), 80) || null,
    timezone: clean(formData.get("timezone"), 80) || "America/Sao_Paulo",
    locale: clean(formData.get("locale"), 16) || "pt-BR",
    training_goal: clean(formData.get("training_goal"), 80) || null,
    experience_level: clean(formData.get("experience_level"), 40) || null,
    equipment,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" });
  if (error) throw new Error("PROFILE_SAVE_FAILED");

  revalidatePath("/app/profile");
  revalidatePath("/app");
}
