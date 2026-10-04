"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { setCurrentProgramSlug } from "@/lib/domain/program-preferences";

const PROGRAM_SLUG = "mytrainx-start-4-weeks";

export async function enrollMyTrainXStart() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");
  const admin = createAdminClient();
  const { data: program, error: programError } = await admin.from("programs").select("id").eq("slug",PROGRAM_SLUG).eq("active",true).maybeSingle();
  if (programError) throw programError;
  if (!program) redirect("/app/programas");

  const { error } = await admin.from("program_enrollments").upsert({
    user_id: session.userId,
    program_id: program.id,
    status: "active",
    completed_at: null,
    metadata: { source: "member_self_enroll", enrollment_version: 1 },
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,program_id" });
  if (error) throw error;
  await setCurrentProgramSlug(session.userId, PROGRAM_SLUG);
  redirect("/app/programas/mytrainx-start");
}

export async function completeStartWorkout(workoutSlug: string, nextSlug: string | null) {
  const session = await getSession();
  if (!session?.userId) redirect("/login");
  const admin = createAdminClient();

  const { data: program } = await admin.from("programs").select("id").eq("slug",PROGRAM_SLUG).eq("active",true).maybeSingle();
  if (!program) redirect("/app/programas");
  const { data: enrollment } = await admin.from("program_enrollments").select("id,status").eq("user_id",session.userId).eq("program_id",program.id).eq("status","active").maybeSingle();
  if (!enrollment) redirect("/app/programas/mytrainx-start");

  const { data: workout, error: workoutError } = await admin.from("workouts").select("id").eq("program_id",program.id).eq("slug",workoutSlug).eq("active",true).maybeSingle();
  if (workoutError) throw workoutError;
  if (!workout) redirect("/app/programas/mytrainx-start");

  const { data: existing, error: existingError } = await admin.from("workout_progress").select("id").eq("user_id",session.userId).eq("workout_id",workout.id).maybeSingle();
  if (existingError) throw existingError;
  const payload={completed_at:new Date().toISOString(),percentage:100,metadata:{source:"mytrainx_start",completion_version:1},updated_at:new Date().toISOString()};
  if(existing?.id){const {error}=await admin.from("workout_progress").update(payload).eq("id",existing.id);if(error)throw error;}
  else{const {error}=await admin.from("workout_progress").insert({user_id:session.userId,workout_id:workout.id,...payload});if(error)throw error;}

  if (!nextSlug) {
    await admin.from("program_enrollments").update({status:"completed",completed_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq("id",enrollment.id);
  }
  redirect(nextSlug ? `/app/programas/mytrainx-start/session/${nextSlug}` : "/app/performance/check-in");
}
