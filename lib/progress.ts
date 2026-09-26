import { createClient } from "@/lib/supabase/server";

function numberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function average(values: number[]) {
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function inRange(date: Date, start: Date, end: Date) {
  const time = date.getTime();
  return time >= start.getTime() && time < end.getTime();
}

export type ProgressDashboard = {
  latestWeight: number | null;
  weightTrend7d: number | null;
  weightTrendPrevious7d: number | null;
  weightTrendDelta: number | null;
  weightSeries: { value: number; measuredAt: string }[];
  latestWaist: number | null;
  waistDelta: number | null;
  latestBodyFat: number | null;
  bodyFatDeltaSameMethod: number | null;
  latestMuscleMass: number | null;
  muscleMassDeltaSameMethod: number | null;
  latestCompositionMethod: string | null;
  latestCompositionDevice: string | null;
  workouts28d: number;
  latestCheckin: {
    weekStart: string;
    energy: number | null;
    sleep: number | null;
    soreness: number | null;
    stress: number | null;
    motivation: number | null;
    planned: number | null;
    completed: number | null;
  } | null;
  activeGoals: number;
  photoSets: number;
  latestPhotoDate: string | null;
  dashboardMetrics: string[];
};

export async function getProgressDashboard(userId: string): Promise<ProgressDashboard> {
  const supabase = await createClient();

  const now = new Date();
  const start7 = new Date(now);
  start7.setDate(start7.getDate() - 7);
  const start14 = new Date(now);
  start14.setDate(start14.getDate() - 14);
  const start28 = new Date(now);
  start28.setDate(start28.getDate() - 28);

  const [
    bodyResult,
    circumferenceResult,
    checkinResult,
    goalsResult,
    photosResult,
    workoutsResult,
    preferencesResult,
  ] = await Promise.all([
    supabase
      .from("body_metric_entries")
      .select("measured_at,weight_kg,body_fat_pct,muscle_mass_kg,measurement_method,device_name")
      .eq("user_id", userId)
      .order("measured_at", { ascending: false })
      .limit(60),
    supabase
      .from("body_circumference_entries")
      .select("measured_at,waist_cm")
      .eq("user_id", userId)
      .not("waist_cm", "is", null)
      .order("measured_at", { ascending: false })
      .limit(12),
    supabase
      .from("weekly_checkins")
      .select(
        "week_start,energy_score,sleep_quality_score,soreness_score,stress_score,motivation_score,training_sessions_planned,training_sessions_completed"
      )
      .eq("user_id", userId)
      .order("week_start", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("progress_goals")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", "active"),
    supabase
      .from("progress_photo_sets")
      .select("captured_on")
      .eq("user_id", userId)
      .order("captured_on", { ascending: false })
      .limit(60),
    supabase
      .from("workout_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .not("completed_at", "is", null)
      .gte("completed_at", start28.toISOString()),
    supabase
      .from("progress_preferences")
      .select("preferences")
      .eq("user_id", userId)
      .maybeSingle(),
  ]);

  const bodyRows = bodyResult.data ?? [];
  const weightRows = bodyRows
    .map((row) => ({
      value: numberOrNull(row.weight_kg),
      measuredAt: String(row.measured_at),
    }))
    .filter((row): row is { value: number; measuredAt: string } => row.value !== null);

  const currentWeightValues = weightRows
    .filter((row) => inRange(new Date(row.measuredAt), start7, now))
    .map((row) => row.value);
  const previousWeightValues = weightRows
    .filter((row) => inRange(new Date(row.measuredAt), start14, start7))
    .map((row) => row.value);

  const currentAverage = average(currentWeightValues);
  const previousAverage = average(previousWeightValues);

  const latestComposition = bodyRows.find(
    (row) => row.body_fat_pct !== null || row.muscle_mass_kg !== null
  );
  const previousComparableComposition = latestComposition
    ? bodyRows.find((row) => {
        if (row === latestComposition) return false;
        const sameMethod = row.measurement_method === latestComposition.measurement_method;
        const sameDevice =
          latestComposition.device_name
            ? row.device_name === latestComposition.device_name
            : true;
        return sameMethod && sameDevice && (row.body_fat_pct !== null || row.muscle_mass_kg !== null);
      })
    : undefined;

  const latestBodyFat = numberOrNull(latestComposition?.body_fat_pct);
  const previousBodyFat = numberOrNull(previousComparableComposition?.body_fat_pct);
  const latestMuscleMass = numberOrNull(latestComposition?.muscle_mass_kg);
  const previousMuscleMass = numberOrNull(previousComparableComposition?.muscle_mass_kg);

  const waistRows = circumferenceResult.data ?? [];
  const latestWaist = numberOrNull(waistRows[0]?.waist_cm);
  const previousWaist = numberOrNull(waistRows[1]?.waist_cm);

  const latestCheckinRow = checkinResult.data;
  const photoRows = photosResult.data ?? [];
  const preferenceObject =
    preferencesResult.data?.preferences && typeof preferencesResult.data.preferences === "object"
      ? (preferencesResult.data.preferences as Record<string, unknown>)
      : {};
  const configuredDashboardMetrics = Array.isArray(preferenceObject.dashboard_metrics)
    ? preferenceObject.dashboard_metrics.filter((value): value is string => typeof value === "string")
    : [];
  const dashboardMetrics = configuredDashboardMetrics.length
    ? configuredDashboardMetrics
    : ["weight", "waist", "composition", "training", "photos", "checkin"];

  return {
    latestWeight: weightRows[0]?.value ?? null,
    weightTrend7d: currentAverage,
    weightTrendPrevious7d: previousAverage,
    weightTrendDelta:
      currentAverage !== null && previousAverage !== null
        ? currentAverage - previousAverage
        : null,
    weightSeries: weightRows.slice(0, 14).reverse(),
    latestWaist,
    waistDelta:
      latestWaist !== null && previousWaist !== null ? latestWaist - previousWaist : null,
    latestBodyFat,
    bodyFatDeltaSameMethod:
      latestBodyFat !== null && previousBodyFat !== null
        ? latestBodyFat - previousBodyFat
        : null,
    latestMuscleMass,
    muscleMassDeltaSameMethod:
      latestMuscleMass !== null && previousMuscleMass !== null
        ? latestMuscleMass - previousMuscleMass
        : null,
    latestCompositionMethod: latestComposition?.measurement_method ?? null,
    latestCompositionDevice: latestComposition?.device_name ?? null,
    workouts28d: workoutsResult.count ?? 0,
    latestCheckin: latestCheckinRow
      ? {
          weekStart: String(latestCheckinRow.week_start),
          energy: numberOrNull(latestCheckinRow.energy_score),
          sleep: numberOrNull(latestCheckinRow.sleep_quality_score),
          soreness: numberOrNull(latestCheckinRow.soreness_score),
          stress: numberOrNull(latestCheckinRow.stress_score),
          motivation: numberOrNull(latestCheckinRow.motivation_score),
          planned: numberOrNull(latestCheckinRow.training_sessions_planned),
          completed: numberOrNull(latestCheckinRow.training_sessions_completed),
        }
      : null,
    activeGoals: goalsResult.count ?? 0,
    photoSets: photoRows.length,
    latestPhotoDate: photoRows[0]?.captured_on ? String(photoRows[0].captured_on) : null,
    dashboardMetrics,
  };
}

export async function getProgressPhotoGallery(userId: string) {
  const supabase = await createClient();

  const { data: photos } = await supabase
    .from("progress_photos")
    .select("id,photo_set_id,angle,object_path,captured_at,progress_photo_sets(captured_on,label)")
    .eq("user_id", userId)
    .order("captured_at", { ascending: false })
    .limit(36);

  const rows = photos ?? [];
  if (!rows.length) return [];

  const { data: signed } = await supabase.storage
    .from("progress-photos")
    .createSignedUrls(
      rows.map((row) => row.object_path),
      15 * 60
    );

  const signedByPath = new Map(
    (signed ?? []).map((entry) => [entry.path, entry.signedUrl] as const)
  );

  return rows.map((row) => ({
    ...row,
    signedUrl: signedByPath.get(row.object_path) ?? null,
  }));
}
