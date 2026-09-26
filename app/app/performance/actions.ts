"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";

function optionalNumber(formData: FormData, key: string) {
  const raw = String(formData.get(key) ?? "").trim().replace(",", ".");
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function optionalText(formData: FormData, key: string, max = 500) {
  const value = String(formData.get(key) ?? "").trim();
  return value ? value.slice(0, max) : null;
}

function currentWeekStart() {
  const now = new Date();
  const day = now.getUTCDay() || 7;
  now.setUTCDate(now.getUTCDate() - day + 1);
  return now.toISOString().slice(0, 10);
}

function qualityForMethod(method: string) {
  if (method === "smart_scale_bia") return "consumer_estimate";
  if (["bia_professional", "dexa", "bodpod", "skinfold", "3d_scan"].includes(method)) {
    return "professional_estimate";
  }
  return "unverified";
}

export async function logBodyMetric(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Authentication required.");

  const measurementMethod = String(formData.get("measurement_method") ?? "manual_scale");
  const allowedMethods = new Set([
    "manual_scale",
    "smart_scale_bia",
    "bia_professional",
    "dexa",
    "bodpod",
    "skinfold",
    "3d_scan",
    "other",
  ]);
  if (!allowedMethods.has(measurementMethod)) throw new Error("Invalid measurement method.");

  const payload = {
    user_id: session.userId,
    measurement_method: measurementMethod,
    measurement_quality: qualityForMethod(measurementMethod),
    device_name: optionalText(formData, "device_name", 120),
    weight_kg: optionalNumber(formData, "weight_kg"),
    body_fat_pct: optionalNumber(formData, "body_fat_pct"),
    lean_mass_kg: optionalNumber(formData, "lean_mass_kg"),
    muscle_mass_kg: optionalNumber(formData, "muscle_mass_kg"),
    fat_mass_kg: optionalNumber(formData, "fat_mass_kg"),
    hydration_pct: optionalNumber(formData, "hydration_pct"),
    notes: optionalText(formData, "notes", 1000),
  };

  if (
    payload.weight_kg === null &&
    payload.body_fat_pct === null &&
    payload.lean_mass_kg === null &&
    payload.muscle_mass_kg === null &&
    payload.fat_mass_kg === null &&
    payload.hydration_pct === null
  ) {
    throw new Error("Add at least one body metric.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("body_metric_entries").insert(payload);
  if (error) throw error;

  revalidatePath("/app/performance");
  revalidatePath("/app/performance/body");
}

export async function logCircumference(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Authentication required.");

  const payload = {
    user_id: session.userId,
    measurement_method: "tape",
    waist_cm: optionalNumber(formData, "waist_cm"),
    hip_cm: optionalNumber(formData, "hip_cm"),
    chest_cm: optionalNumber(formData, "chest_cm"),
    neck_cm: optionalNumber(formData, "neck_cm"),
    arm_left_cm: optionalNumber(formData, "arm_left_cm"),
    arm_right_cm: optionalNumber(formData, "arm_right_cm"),
    thigh_left_cm: optionalNumber(formData, "thigh_left_cm"),
    thigh_right_cm: optionalNumber(formData, "thigh_right_cm"),
    calf_left_cm: optionalNumber(formData, "calf_left_cm"),
    calf_right_cm: optionalNumber(formData, "calf_right_cm"),
    notes: optionalText(formData, "notes", 1000),
  };

  const hasMeasurement = Object.entries(payload).some(
    ([key, value]) => key.endsWith("_cm") && value !== null
  );
  if (!hasMeasurement) throw new Error("Add at least one measurement.");

  const supabase = await createClient();
  const { error } = await supabase.from("body_circumference_entries").insert(payload);
  if (error) throw error;

  revalidatePath("/app/performance");
  revalidatePath("/app/performance/body");
}

export async function saveWeeklyCheckin(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Authentication required.");

  const supabase = await createClient();
  const payload = {
    user_id: session.userId,
    week_start: currentWeekStart(),
    energy_score: optionalNumber(formData, "energy_score"),
    sleep_quality_score: optionalNumber(formData, "sleep_quality_score"),
    soreness_score: optionalNumber(formData, "soreness_score"),
    stress_score: optionalNumber(formData, "stress_score"),
    motivation_score: optionalNumber(formData, "motivation_score"),
    nutrition_consistency_score: optionalNumber(formData, "nutrition_consistency_score"),
    avg_sleep_hours: optionalNumber(formData, "avg_sleep_hours"),
    training_sessions_planned: optionalNumber(formData, "training_sessions_planned"),
    training_sessions_completed: optionalNumber(formData, "training_sessions_completed"),
    notes: optionalText(formData, "notes", 1500),
  };

  const { error } = await supabase
    .from("weekly_checkins")
    .upsert(payload, { onConflict: "user_id,week_start" });

  if (error) throw error;

  revalidatePath("/app/performance");
  revalidatePath("/app/performance/check-in");
}

export async function saveProgressPreferences(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Authentication required.");

  const photoFrequency = String(formData.get("progress_photo_frequency") ?? "monthly");
  const weighInFrequency = String(formData.get("weigh_in_frequency") ?? "optional");

  const supabase = await createClient();
  const { error } = await supabase.from("progress_preferences").upsert(
    {
      user_id: session.userId,
      height_cm: optionalNumber(formData, "height_cm"),
      weigh_in_frequency: weighInFrequency,
      progress_photo_frequency: photoFrequency,
      photo_ai_analysis_opt_in: formData.get("photo_ai_analysis_opt_in") === "on",
    },
    { onConflict: "user_id" }
  );

  if (error) throw error;

  revalidatePath("/app/performance/body");
  revalidatePath("/app/performance/photos");
}


export async function saveProgressGoal(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Authentication required.");

  const goalType = String(formData.get("goal_type") ?? "custom");
  const allowedGoalTypes = new Set([
    "consistency",
    "weight",
    "waist",
    "body_fat_estimate",
    "muscle_mass_estimate",
    "strength",
    "mobility",
    "endurance",
    "custom",
  ]);
  if (!allowedGoalTypes.has(goalType)) throw new Error("Invalid goal type.");

  const direction = String(formData.get("target_direction") ?? "custom");
  const allowedDirections = new Set(["increase", "decrease", "maintain", "at_least", "at_most", "custom"]);
  if (!allowedDirections.has(direction)) throw new Error("Invalid goal direction.");

  const title = optionalText(formData, "title", 160);
  if (!title) throw new Error("Goal title is required.");

  const targetDate = optionalText(formData, "target_date", 10);
  const supabase = await createClient();
  const { error } = await supabase.from("progress_goals").insert({
    user_id: session.userId,
    goal_type: goalType,
    title,
    target_direction: direction,
    start_value: optionalNumber(formData, "start_value"),
    target_value: optionalNumber(formData, "target_value"),
    unit: optionalText(formData, "unit", 30),
    target_date: targetDate,
    notes: optionalText(formData, "notes", 1000),
  });

  if (error) throw error;

  revalidatePath("/app/performance");
  revalidatePath("/app/performance/goals");
}
