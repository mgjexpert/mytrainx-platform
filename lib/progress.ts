import { createClient } from "@/lib/supabase/server";

export type BodyMetricEntry = {
  id: string;
  measured_at: string;
  measurement_method: string;
  measurement_quality: string;
  device_name: string | null;
  weight_kg: number | null;
  body_fat_pct: number | null;
  lean_mass_kg: number | null;
  muscle_mass_kg: number | null;
  fat_mass_kg: number | null;
  hydration_pct: number | null;
  notes: string | null;
};

export type CircumferenceEntry = {
  id: string;
  measured_at: string;
  waist_cm: number | null;
  hip_cm: number | null;
  chest_cm: number | null;
  arm_left_cm: number | null;
  arm_right_cm: number | null;
  thigh_left_cm: number | null;
  thigh_right_cm: number | null;
};

export type ProgressGoal = {
  id: string;
  goal_type: string;
  title: string;
  target_direction: string | null;
  start_value: number | null;
  target_value: number | null;
  unit: string | null;
  start_date: string;
  target_date: string | null;
  status: string;
};

export type ProgressPreferences = {
  height_cm: number | null;
  unit_system: string;
  weigh_in_frequency: string;
  trend_window_days: number;
  weekly_checkin_weekday: number;
  progress_photo_frequency: string;
  photo_ai_analysis_opt_in: boolean;
};

export type ProgressPhoto = {
  id: string;
  photo_set_id: string;
  angle: string;
  object_path: string;
  width_px: number | null;
  height_px: number | null;
  captured_at: string;
  signed_url?: string;
};

export type ProgressPhotoSet = {
  id: string;
  captured_on: string;
  label: string | null;
  notes: string | null;
  ai_analysis_allowed: boolean;
  photos: ProgressPhoto[];
};

function throwIfError(label: string, error: { message?: string } | null) {
  if (error) throw new Error(`${label}: ${error.message || "unknown error"}`);
}

export async function getProgressDashboard(userId: string) {
  const supabase = await createClient();

  const [metricsResult, circumferenceResult, goalsResult, preferencesResult, photoSetsResult] =
    await Promise.all([
      supabase
        .from("body_metric_entries")
        .select(
          "id,measured_at,measurement_method,measurement_quality,device_name,weight_kg,body_fat_pct,lean_mass_kg,muscle_mass_kg,fat_mass_kg,hydration_pct,notes"
        )
        .eq("user_id", userId)
        .order("measured_at", { ascending: false })
        .limit(60),
      supabase
        .from("body_circumference_entries")
        .select(
          "id,measured_at,waist_cm,hip_cm,chest_cm,arm_left_cm,arm_right_cm,thigh_left_cm,thigh_right_cm"
        )
        .eq("user_id", userId)
        .order("measured_at", { ascending: false })
        .limit(30),
      supabase
        .from("progress_goals")
        .select(
          "id,goal_type,title,target_direction,start_value,target_value,unit,start_date,target_date,status"
        )
        .eq("user_id", userId)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(8),
      supabase
        .from("progress_preferences")
        .select(
          "height_cm,unit_system,weigh_in_frequency,trend_window_days,weekly_checkin_weekday,progress_photo_frequency,photo_ai_analysis_opt_in"
        )
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("progress_photo_sets")
        .select("id,captured_on,label,notes,ai_analysis_allowed")
        .eq("user_id", userId)
        .order("captured_on", { ascending: false })
        .limit(8),
    ]);

  throwIfError("body metrics", metricsResult.error);
  throwIfError("circumferences", circumferenceResult.error);
  throwIfError("goals", goalsResult.error);
  throwIfError("preferences", preferencesResult.error);
  throwIfError("photo sets", photoSetsResult.error);

  const metrics = (metricsResult.data || []) as BodyMetricEntry[];
  const circumferences = (circumferenceResult.data || []) as CircumferenceEntry[];
  const goals = (goalsResult.data || []) as ProgressGoal[];
  const preferences = (preferencesResult.data || null) as ProgressPreferences | null;
  const rawSets = (photoSetsResult.data || []) as Omit<ProgressPhotoSet, "photos">[];

  const setIds = rawSets.map((set) => set.id);
  let photos: ProgressPhoto[] = [];

  if (setIds.length) {
    const photosResult = await supabase
      .from("progress_photos")
      .select("id,photo_set_id,angle,object_path,width_px,height_px,captured_at")
      .eq("user_id", userId)
      .in("photo_set_id", setIds)
      .order("captured_at", { ascending: true });

    throwIfError("progress photos", photosResult.error);
    photos = (photosResult.data || []) as ProgressPhoto[];

    const paths = photos.map((photo) => photo.object_path);
    if (paths.length) {
      const signed = await supabase.storage
        .from("progress-photos")
        .createSignedUrls(paths, 60 * 10);

      if (!signed.error && signed.data) {
        const urlByPath = new Map(
          signed.data.map((item) => [item.path, item.signedUrl] as const)
        );
        photos = photos.map((photo) => ({
          ...photo,
          signed_url: urlByPath.get(photo.object_path),
        }));
      }
    }
  }

  const photoSets: ProgressPhotoSet[] = rawSets.map((set) => ({
    ...set,
    photos: photos.filter((photo) => photo.photo_set_id === set.id),
  }));

  return { metrics, circumferences, goals, preferences, photoSets };
}

export function average(values: Array<number | null | undefined>) {
  const valid = values.filter((value): value is number => typeof value === "number");
  if (!valid.length) return null;
  return valid.reduce((sum, value) => sum + value, 0) / valid.length;
}

export function trendDelta(
  entries: BodyMetricEntry[],
  field: keyof Pick<BodyMetricEntry, "weight_kg" | "body_fat_pct" | "muscle_mass_kg">,
  window = 7
) {
  const values = entries
    .map((entry) => entry[field])
    .filter((value): value is number => typeof value === "number");

  if (values.length < 2) return null;

  const current = average(values.slice(0, Math.min(window, values.length)));
  const previous = average(values.slice(window, window * 2));

  if (current === null) return null;
  if (previous === null) return values.length > 1 ? current - values[values.length - 1] : null;
  return current - previous;
}

export function measurementLabel(method: string) {
  const labels: Record<string, string> = {
    manual_scale: "Balança",
    smart_scale_bia: "Balança inteligente / BIA",
    bia_professional: "BIA profissional",
    dexa: "DXA",
    bodpod: "Bod Pod",
    skinfold: "Dobras cutâneas",
    "3d_scan": "Scan 3D",
    other: "Outro método",
  };
  return labels[method] || method;
}
