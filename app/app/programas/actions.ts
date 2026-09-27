"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";

async function getRegisteredProgram(slug: string) {
  const admin = createAdminClient();
  const { data: program, error } = await admin
    .from("programs")
    .select("id,slug,active,metadata")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  if (!program) return null;

  const metadata =
    program.metadata && typeof program.metadata === "object" && !Array.isArray(program.metadata)
      ? (program.metadata as Record<string, unknown>)
      : null;

  if (metadata?.member_access !== "registered") return null;
  return { admin, program };
}

export async function enrollRegisteredProgram(programSlug: string) {
  const session = await getSession();
  if (!session?.userId) redirect("/login");
  const result = await getRegisteredProgram(programSlug);
  if (!result) redirect("/app/programas");
  const { admin, program } = result;

  const { error } = await admin.from("program_enrollments").upsert({
    user_id: session.userId,
    program_id: program.id,
    status: "active",
    completed_at: null,
    metadata: { source: "member_self_enroll", enrollment_version: 1 },
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,program_id" });
  if (error) throw error;
  redirect(`/app/programas/${programSlug}`);
}

export async function completeRegisteredWorkout(programSlug: string, workoutSlug: string, nextSlug: string | null) {
  const session = await getSession();
  if (!session?.userId) redirect("/login");
  const result = await getRegisteredProgram(programSlug);
  if (!result) redirect("/app/programas");
  const { admin, program } = result;

  const { data: enrollment, error: enrollmentError } = await admin
    .from("program_enrollments")
    .select("id,status")
    .eq("user_id",session.userId)
    .eq("program_id",program.id)
    .in("status",["active","completed"])
    .maybeSingle();
  if (enrollmentError) throw enrollmentError;
  if (!enrollment) redirect(`/app/programas/${programSlug}`);

  const { data: workout, error: workoutError } = await admin
    .from("workouts")
    .select("id")
    .eq("program_id",program.id)
    .eq("slug",workoutSlug)
    .eq("active",true)
    .maybeSingle();
  if (workoutError) throw workoutError;
  if (!workout) redirect(`/app/programas/${programSlug}`);

  const { data: existing, error: existingError } = await admin
    .from("workout_progress")
    .select("id")
    .eq("user_id",session.userId)
    .eq("workout_id",workout.id)
    .maybeSingle();
  if (existingError) throw existingError;

  const payload = {
    completed_at:new Date().toISOString(),
    percentage:100,
    metadata:{source:"registered_program_engine",program_slug:programSlug,completion_version:1},
    updated_at:new Date().toISOString()
  };
  if(existing?.id){
    const {error}=await admin.from("workout_progress").update(payload).eq("id",existing.id);
    if(error)throw error;
  } else {
    const {error}=await admin.from("workout_progress").insert({user_id:session.userId,workout_id:workout.id,...payload});
    if(error)throw error;
  }

  if(!nextSlug){
    const {error}=await admin.from("program_enrollments").update({
      status:"completed",completed_at:new Date().toISOString(),updated_at:new Date().toISOString()
    }).eq("id",enrollment.id);
    if(error)throw error;
  }

  redirect(nextSlug ? `/app/programas/${programSlug}/session/${nextSlug}` : "/app/performance/check-in");
}
