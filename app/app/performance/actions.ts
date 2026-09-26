"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";

function numberField(formData: FormData, name: string) {
  const raw = String(formData.get(name) || "").trim().replace(",", ".");
  if (!raw) return null;
  const value = Number(raw);
  if (!Number.isFinite(value)) throw new Error(`Valor inválido: ${name}`);
  return value;
}

function textField(formData: FormData, name: string) {
  const value = String(formData.get(name) || "").trim();
  return value || null;
}

function measurementQuality(method: string) {
  if (method === "smart_scale_bia") return "consumer_estimate";
  if (["bia_professional", "skinfold", "3d_scan"].includes(method)) return "professional_estimate";
  if (["dexa", "bodpod"].includes(method)) return "reference_method";
  return "unverified";
}

function measuredAt(formData: FormData) {
  const date = String(formData.get("measured_on") || "").trim();
  return date ? new Date(`${date}T12:00:00Z`).toISOString() : new Date().toISOString();
}

async function authenticated() {
  const session = await getSession();
  if (!session?.userId) throw new Error("Sessão inválida.");
  return { session, supabase: await createClient() };
}

export async function addBodyMetric(formData: FormData) {
  const { session, supabase } = await authenticated();

  const method = String(formData.get("measurement_method") || "manual_scale");
  const allowedMethods = [
    "manual_scale",
    "smart_scale_bia",
    "bia_professional",
    "dexa",
    "bodpod",
    "skinfold",
    "3d_scan",
    "other",
  ];
  if (!allowedMethods.includes(method)) throw new Error("Método de medição inválido.");

  const values = {
    weight_kg: numberField(formData, "weight_kg"),
    body_fat_pct: numberField(formData, "body_fat_pct"),
    lean_mass_kg: numberField(formData, "lean_mass_kg"),
    muscle_mass_kg: numberField(formData, "muscle_mass_kg"),
    fat_mass_kg: numberField(formData, "fat_mass_kg"),
    hydration_pct: numberField(formData, "hydration_pct"),
  };

  if (!Object.values(values).some((value) => value !== null)) {
    throw new Error("Informe pelo menos uma métrica.");
  }

  const { error } = await supabase.from("body_metric_entries").insert({
    user_id: session.userId,
    measured_at: measuredAt(formData),
    measurement_method: method,
    measurement_quality: measurementQuality(method),
    device_name: textField(formData, "device_name"),
    ...values,
    notes: textField(formData, "notes"),
    raw_metrics: {},
  });

  if (error) throw new Error(error.message);
  revalidatePath("/app/performance");
  revalidatePath("/app");
}

export async function addCircumference(formData: FormData) {
  const { session, supabase } = await authenticated();

  const values = {
    waist_cm: numberField(formData, "waist_cm"),
    hip_cm: numberField(formData, "hip_cm"),
    chest_cm: numberField(formData, "chest_cm"),
    arm_left_cm: numberField(formData, "arm_left_cm"),
    arm_right_cm: numberField(formData, "arm_right_cm"),
    thigh_left_cm: numberField(formData, "thigh_left_cm"),
    thigh_right_cm: numberField(formData, "thigh_right_cm"),
  };

  if (!Object.values(values).some((value) => value !== null)) {
    throw new Error("Informe pelo menos uma medida corporal.");
  }

  const { error } = await supabase.from("body_circumference_entries").insert({
    user_id: session.userId,
    measured_at: measuredAt(formData),
    measurement_method: "tape",
    measurement_protocol: "mytrainx_standardized_self_measurement_v1",
    ...values,
    notes: textField(formData, "notes"),
    metadata: {},
  });

  if (error) throw new Error(error.message);
  revalidatePath("/app/performance");
}

export async function addProgressGoal(formData: FormData) {
  const { session, supabase } = await authenticated();

  const goalType = String(formData.get("goal_type") || "custom");
  const allowed = [
    "consistency",
    "weight",
    "waist",
    "body_fat_estimate",
    "muscle_mass_estimate",
    "strength",
    "mobility",
    "endurance",
    "custom",
  ];
  if (!allowed.includes(goalType)) throw new Error("Tipo de meta inválido.");

  const title = String(formData.get("title") || "").trim();
  if (!title) throw new Error("Dê um nome à meta.");

  const { error } = await supabase.from("progress_goals").insert({
    user_id: session.userId,
    goal_type: goalType,
    title,
    target_direction: textField(formData, "target_direction"),
    start_value: numberField(formData, "start_value"),
    target_value: numberField(formData, "target_value"),
    unit: textField(formData, "unit"),
    target_date: textField(formData, "target_date"),
    notes: textField(formData, "notes"),
    metadata: {},
  });

  if (error) throw new Error(error.message);
  revalidatePath("/app/performance");
}

export async function saveProgressPreferences(formData: FormData) {
  const { session, supabase } = await authenticated();

  const weighIn = String(formData.get("weigh_in_frequency") || "optional");
  const photoFrequency = String(formData.get("progress_photo_frequency") || "monthly");
  const trendWindow = Number(formData.get("trend_window_days") || 7);
  const weekday = Number(formData.get("weekly_checkin_weekday") || 1);

  const { error } = await supabase.from("progress_preferences").upsert(
    {
      user_id: session.userId,
      height_cm: numberField(formData, "height_cm"),
      unit_system: "metric",
      weigh_in_frequency: ["optional", "daily", "weekly"].includes(weighIn)
        ? weighIn
        : "optional",
      trend_window_days: Math.max(3, Math.min(30, trendWindow)),
      weekly_checkin_weekday: Math.max(1, Math.min(7, weekday)),
      progress_photo_frequency: ["never", "weekly", "biweekly", "monthly"].includes(
        photoFrequency
      )
        ? photoFrequency
        : "monthly",
      photo_ai_analysis_opt_in: false,
      preferences: {},
    },
    { onConflict: "user_id" }
  );

  if (error) throw new Error(error.message);
  revalidatePath("/app/performance");
}
