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
  const admin = createAdminClient();
  const current = await getAgentCurrentProgram(userId);

  const now = new Date();
  const start28 = new Date(now);
  start28.setDate(start28.getDate() - 28);

  const [
    workouts28Result,
    checkinResult,
    preferencesResult,
    latestBodyResult,
    latestWaistResult,
  ] = await Promise.all([
    admin
      .from("workout_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .not("completed_at", "is", null)
      .gte("completed_at", start28.toISOString()),
    admin
      .from("weekly_checkins")
      .select("week_start,energy_score,sleep_quality_score,soreness_score,stress_score,motivation_score,training_sessions_planned,training_sessions_completed")
      .eq("user_id", userId)
      .order("week_start", { ascending: false })
      .limit(1)
      .maybeSingle(),
    admin
      .from("progress_preferences")
      .select("preferences")
      .eq("user_id", userId)
      .maybeSingle(),
    admin
      .from("body_metric_entries")
      .select("measured_at,weight_kg,body_fat_pct,muscle_mass_kg,measurement_method,device_name")
      .eq("user_id", userId)
      .order("measured_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    admin
      .from("body_circumference_entries")
      .select("measured_at,waist_cm")
      .eq("user_id", userId)
      .not("waist_cm", "is", null)
      .order("measured_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const pref =
    preferencesResult.data?.preferences &&
    typeof preferencesResult.data.preferences === "object" &&
    !Array.isArray(preferencesResult.data.preferences)
      ? (preferencesResult.data.preferences as Record<string, unknown>)
      : {};
  const configured = Array.isArray(pref.dashboard_metrics)
    ? pref.dashboard_metrics.filter((value): value is string => typeof value === "string")
    : [];
  const visibleMetrics = configured.length
    ? configured
    : ["training", "checkin", "weight", "waist", "composition", "photos"];

  const checkin = checkinResult.data
    ? {
        week_start: String(checkinResult.data.week_start),
        energy: checkinResult.data.energy_score,
        sleep: checkinResult.data.sleep_quality_score,
        soreness: checkinResult.data.soreness_score,
        stress: checkinResult.data.stress_score,
        motivation: checkinResult.data.motivation_score,
        planned: checkinResult.data.training_sessions_planned,
        completed: checkinResult.data.training_sessions_completed,
      }
    : null;

  const body = latestBodyResult.data;
  const bodyContext = body
    ? {
        measured_at: body.measured_at,
        weight_kg: visibleMetrics.includes("weight") ? body.weight_kg : null,
        body_fat_pct: visibleMetrics.includes("composition") ? body.body_fat_pct : null,
        muscle_mass_kg: visibleMetrics.includes("composition") ? body.muscle_mass_kg : null,
        measurement_method: visibleMetrics.includes("composition") ? body.measurement_method : null,
        device_name: visibleMetrics.includes("composition") ? body.device_name : null,
      }
    : null;

  const base = {
    workouts_28d: workouts28Result.count ?? 0,
    latest_checkin: visibleMetrics.includes("checkin") ? checkin : null,
    latest_body: bodyContext,
    latest_waist:
      visibleMetrics.includes("waist") && latestWaistResult.data
        ? {
            measured_at: latestWaistResult.data.measured_at,
            waist_cm: latestWaistResult.data.waist_cm,
          }
        : null,
    visible_metrics: visibleMetrics,
    safety: {
      body_composition_is_estimate: true,
      photo_inference_allowed: false,
      diagnostic_use_allowed: false,
    },
  };

  if (!current) {
    return {
      ...base,
      program: null,
      total_workouts: 0,
      started_workouts: 0,
      completed_workouts: 0,
      completion_percentage: 0,
    };
  }

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
    ...base,
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

  const { data: blockingReviews, error: blockingReviewError } = await admin
    .from("content_reviews")
    .select("content_id,review_type,status")
    .in("content_id", approvedIds)
    .in("review_type", ["scientific", "safety", "nutrition", "exercise"])
    .neq("status", "approved");
  if (blockingReviewError) throw blockingReviewError;

  const blockedIds = new Set((blockingReviews ?? []).map((row) => row.content_id));
  const reviewClearedIds = approvedIds.filter((id) => !blockedIds.has(id));
  if (!reviewClearedIds.length) return [];

  const { data: rights, error: rightsError } = await admin
    .from("content_rights")
    .select("content_id")
    .in("content_id", reviewClearedIds)
    .eq("verification_status", "verified")
    .eq("ai_retrieval_allowed", true);
  if (rightsError) throw rightsError;

  const rightsIds = [...new Set((rights ?? []).map((row) => row.content_id))];
  if (!rightsIds.length) return [];

  const { data: documents, error: documentsError } = await admin
    .from("knowledge_documents")
    .select("id,content_id,metadata")
    .in("content_id", rightsIds)
    .eq("status", "ready");
  if (documentsError) throw documentsError;

  const retrievableDocuments = (documents ?? []).filter((row) => {
    const metadata =
      row.metadata && typeof row.metadata === "object" && !Array.isArray(row.metadata)
        ? (row.metadata as Record<string, unknown>)
        : {};
    return metadata.retrieval_blocked !== true;
  });

  const documentIds = retrievableDocuments.map((row) => row.id);
  if (!documentIds.length) return [];
  const contentByDocument = new Map(retrievableDocuments.map((row) => [row.id, row.content_id]));

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
