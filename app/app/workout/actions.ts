"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getActiveEntitlement } from "@/lib/domain/access";
import { createClient } from "@/lib/supabase/server";

export async function markWorkoutComplete(slug: string, nextSlug: string | null) {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const entitlement = await getActiveEntitlement("wkt-militar");
  if (!entitlement) redirect("/programas/wkt-militar/oferta?reason=access");

  const supabase = await createClient();
  const { data: workout, error: workoutError } = await supabase
    .from("workouts")
    .select("id")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (workoutError) throw workoutError;
  if (!workout) redirect("/app/programas/wkt-militar");

  const { data: existing, error: existingError } = await supabase
    .from("workout_progress")
    .select("id")
    .eq("user_id", session.userId)
    .eq("workout_id", workout.id)
    .maybeSingle();

  if (existingError) throw existingError;

  const payload = {
    completed_at: new Date().toISOString(),
    percentage: 100,
    metadata: { source: "wkt_player", completion_version: 1 },
    updated_at: new Date().toISOString(),
  };

  if (existing?.id) {
    const { error } = await supabase.from("workout_progress").update(payload).eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("workout_progress").insert({
      user_id: session.userId,
      workout_id: workout.id,
      ...payload,
    });
    if (error) throw error;
  }

  redirect(nextSlug ? `/app/workout/${nextSlug}` : "/app/performance/check-in");
}
