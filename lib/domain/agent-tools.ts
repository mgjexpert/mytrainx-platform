import { createAdminClient } from "@/lib/supabase/admin";

export async function getAgentProfile(userId: string) {
  const admin = createAdminClient();

  const [{ data: profile, error: profileError }, { data: preferences, error: preferencesError }] =
    await Promise.all([
      admin
        .from("profiles")
        .select(
          "id, display_name, timezone, locale, training_goal, experience_level, equipment, preferences"
        )
        .eq("id", userId)
        .maybeSingle(),
      admin
        .from("user_preferences")
        .select("key, value, source, verified_at")
        .eq("user_id", userId),
    ]);

  if (profileError) throw profileError;
  if (preferencesError) throw preferencesError;

  return {
    profile,
    structured_preferences: preferences ?? [],
  };
}

export async function getAgentEntitlements(userId: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("entitlements")
    .select("id, product_slug, status, starts_at, expires_at")
    .eq("user_id", userId)
    .eq("status", "active");

  if (error) throw error;

  const now = Date.now();
  return (data ?? []).filter(
    (item) => !item.expires_at || new Date(item.expires_at).getTime() > now
  );
}

export async function getAgentCurrentProgram(userId: string) {
  const admin = createAdminClient();

  const { data: enrollment, error: enrollmentError } = await admin
    .from("program_enrollments")
    .select("id, program_id, status, started_at, completed_at")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (enrollmentError) throw enrollmentError;
  if (!enrollment) return null;

  const { data: program, error: programError } = await admin
    .from("programs")
    .select("id, slug, name, description, metadata")
    .eq("id", enrollment.program_id)
    .eq("active", true)
    .maybeSingle();

  if (programError) throw programError;
  if (!program) return null;

  return { enrollment, program };
}

export async function getAgentTodayWorkout(userId: string) {
  const current = await getAgentCurrentProgram(userId);
  if (!current) {
    return {
      mode: "no_active_program" as const,
      program: null,
      workout: null,
    };
  }

  const admin = createAdminClient();

  const [{ data: workouts, error: workoutsError }, { data: progress, error: progressError }] =
    await Promise.all([
      admin
        .from("workouts")
        .select("id, number, slug, code, title, focus, duration_seconds, metadata")
        .eq("program_id", current.program.id)
        .eq("active", true)
        .order("number", { ascending: true }),
      admin
        .from("workout_progress")
        .select("workout_id, completed_at")
        .eq("user_id", userId)
        .not("completed_at", "is", null),
    ]);

  if (workoutsError) throw workoutsError;
  if (progressError) throw progressError;

  const completed = new Set((progress ?? []).map((row) => row.workout_id));
  const nextWorkout = (workouts ?? []).find((workout) => !completed.has(workout.id));

  if (!nextWorkout) {
    return {
      mode: "program_complete" as const,
      program: current.program,
      workout: null,
    };
  }

  return {
    mode: "next_available" as const,
    program: current.program,
    workout: nextWorkout,
  };
}

export async function getAgentProgressSummary(userId: string) {
  const current = await getAgentCurrentProgram(userId);
  if (!current) {
    return {
      program: null,
      total_workouts: 0,
      started_workouts: 0,
      completed_workouts: 0,
      completion_percentage: 0,
    };
  }

  const admin = createAdminClient();

  const [{ data: workouts, error: workoutsError }, { data: progress, error: progressError }] =
    await Promise.all([
      admin
        .from("workouts")
        .select("id")
        .eq("program_id", current.program.id)
        .eq("active", true),
      admin
        .from("workout_progress")
        .select("workout_id, completed_at, percentage, watch_seconds")
        .eq("user_id", userId),
    ]);

  if (workoutsError) throw workoutsError;
  if (progressError) throw progressError;

  const workoutIds = new Set((workouts ?? []).map((workout) => workout.id));
  const relevant = (progress ?? []).filter((row) => workoutIds.has(row.workout_id));
  const started = new Set(relevant.map((row) => row.workout_id));
  const completed = new Set(
    relevant.filter((row) => Boolean(row.completed_at)).map((row) => row.workout_id)
  );

  const total = workoutIds.size;
  return {
    program: current.program,
    total_workouts: total,
    started_workouts: started.size,
    completed_workouts: completed.size,
    completion_percentage: total
      ? Math.round((completed.size / total) * 100)
      : 0,
  };
}
