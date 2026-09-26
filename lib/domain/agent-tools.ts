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


export async function searchAgentKnowledge(query: string, limit = 6) {
  const term = query
    .trim()
    .replace(/[%,().]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (term.length < 2) return [];

  const admin = createAdminClient();

  const { data: approvedReviews, error: reviewError } = await admin
    .from("content_reviews")
    .select("content_id")
    .eq("status", "approved")
    .eq("review_type", "editorial");
  if (reviewError) throw reviewError;

  const approvedIds = [...new Set((approvedReviews ?? []).map((row) => row.content_id))];
  if (!approvedIds.length) return [];

  const { data: rights, error: rightsError } = await admin
    .from("content_rights")
    .select("content_id")
    .in("content_id", approvedIds)
    .eq("verification_status", "verified")
    .eq("ai_retrieval_allowed", true);
  if (rightsError) throw rightsError;

  const rightsIds = [...new Set((rights ?? []).map((row) => row.content_id))];
  if (!rightsIds.length) return [];

  const { data: documents, error: documentsError } = await admin
    .from("knowledge_documents")
    .select("id,content_id")
    .in("content_id", rightsIds)
    .eq("status", "ready");
  if (documentsError) throw documentsError;

  const documentIds = (documents ?? []).map((row) => row.id);
  if (!documentIds.length) return [];
  const contentByDocument = new Map((documents ?? []).map((row) => [row.id, row.content_id]));

  const capped = Math.min(Math.max(limit, 1), 12);
  const baseSelect = "document_id,ordinal,heading,body,locator";
  const [{ data: headingMatches, error: headingError }, { data: bodyMatches, error: bodyError }] =
    await Promise.all([
      admin
        .from("knowledge_chunks")
        .select(baseSelect)
        .in("document_id", documentIds)
        .ilike("heading", `%${term}%`)
        .limit(capped),
      admin
        .from("knowledge_chunks")
        .select(baseSelect)
        .in("document_id", documentIds)
        .ilike("body", `%${term}%`)
        .limit(capped),
    ]);
  if (headingError) throw headingError;
  if (bodyError) throw bodyError;

  const seen = new Set<string>();
  const chunks = [...(headingMatches ?? []), ...(bodyMatches ?? [])]
    .filter((chunk) => {
      const key = `${chunk.document_id}:${chunk.ordinal}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, capped);

  const contentIds = [...new Set(chunks.map((row) => contentByDocument.get(row.document_id)).filter(Boolean))] as string[];
  const { data: items, error: itemsError } = contentIds.length
    ? await admin.from("content_items").select("id,slug,title,content_type,summary,access_policy,status").in("id", contentIds).eq("status", "published").eq("access_policy", "public")
    : { data: [], error: null };
  if (itemsError) throw itemsError;

  const itemMap = new Map((items ?? []).map((item) => [item.id, item]));

  return chunks.flatMap((chunk) => {
    const contentId = contentByDocument.get(chunk.document_id);
    const item = contentId ? itemMap.get(contentId) : null;
    if (!item) return [];
    return [{
      content: item,
      heading: chunk.heading,
      excerpt: chunk.body,
      locator: chunk.locator,
      ordinal: chunk.ordinal,
    }];
  });
}

export async function getAgentExercise(slug: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("exercises")
    .select("slug,name,canonical_name,difficulty,equipment,primary_muscles,secondary_muscles,movement_patterns,body_regions,instructions,coaching_cues,common_mistakes,safety_notes,status,review_status")
    .eq("slug", slug)
    .eq("status", "published")
    .eq("review_status", "approved")
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getAgentRecipe(slug: string) {
  const admin = createAdminClient();
  const { data: item, error: itemError } = await admin
    .from("content_items")
    .select("id,slug,title,summary,status,access_policy")
    .eq("slug", slug)
    .eq("content_type", "recipe")
    .eq("status", "published")
    .eq("access_policy", "public")
    .maybeSingle();
  if (itemError) throw itemError;
  if (!item) return null;

  const [{ data: recipe, error: recipeError }, { data: rights, error: rightsError }] = await Promise.all([
    admin.from("recipes").select("meal_type,servings,ingredients,steps,allergens,nutrition,metadata").eq("content_id", item.id).maybeSingle(),
    admin.from("content_rights").select("verification_status,ai_retrieval_allowed").eq("content_id", item.id).maybeSingle(),
  ]);
  if (recipeError) throw recipeError;
  if (rightsError) throw rightsError;
  if (!rights || rights.verification_status !== "verified" || !rights.ai_retrieval_allowed) return null;
  return { content: item, recipe };
}
