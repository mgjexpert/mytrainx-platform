import Link from "next/link";
import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { logBodyMetric, logCircumference, saveProgressPreferences } from "../actions";
import styles from "../performance.module.css";

export default async function BodyProgressPage() {
  const session = await getSession();
  if (!session?.userId) return null;
  const supabase = await createClient();

  const [{ data: body }, { data: circumferences }, { data: prefs }] = await Promise.all([
    supabase.from("body_metric_entries")
      .select("id,measured_at,weight_kg,body_fat_pct,muscle_mass_kg,measurement_method,device_name")
      .eq("user_id", session.userId).order("measured_at", { ascending: false }).limit(12),
    supabase.from("body_circumference_entries")
      .select("id,measured_at,waist_cm,hip_cm,chest_cm")
      .eq("user_id", session.userId).order("measured_at", { ascending: false }).limit(8),
    supabase.from("progress_preferences").select("*").eq("user_id", session.userId).maybeSingle(),
  ]);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.top}>
          <Link className={styles.back} href="/app/performance">← PROGRESS</Link>
          <span className={styles.eyebrow}>BODY TRACKING</span>
        </div>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>MEASURE CONSISTENTLY</span>
          <h1>Peso e composição com contexto.</h1>
          <p>
            Registre apenas os dados que são úteis para você. Para composição corporal,
            mantenha o método e o dispositivo consistentes sempre que possível.
          </p>
        </section>

        <section className={styles.formGrid}>
          <article className={styles.formCard}>
            <span className={styles.label}>BODY METRIC</span>
            <h2>Nova medição</h2>
            <p>Campos de composição são opcionais e tratados como estimativas.</p>
            <form action={logBodyMetric}>
              <Field label="Peso (kg)" name="weight_kg" type="number" step="0.1" />
              <div className={styles.field}>
                <label htmlFor="measurement_method">Método</label>
                <select id="measurement_method" name="measurement_method" defaultValue="manual_scale">
                  <option value="manual_scale">Balança comum</option>
                  <option value="smart_scale_bia">Balança BIA / smart scale</option>
                  <option value="bia_professional">BIA profissional</option>
                  <option value="dexa">DXA</option>
                  <option value="bodpod">BOD POD</option>
                  <option value="skinfold">Dobras cutâneas</option>
                  <option value="3d_scan">3D scan</option>
                  <option value="other">Outro</option>
                </select>
              </div>
              <Field label="Gordura corporal (%)" name="body_fat_pct" type="number" step="0.1" />
              <Field label="Massa muscular (kg)" name="muscle_mass_kg" type="number" step="0.1" />
              <Field label="Massa magra (kg)" name="lean_mass_kg" type="number" step="0.1" />
              <Field label="Massa gorda (kg)" name="fat_mass_kg" type="number" step="0.1" />
              <Field label="Hidratação (%)" name="hydration_pct" type="number" step="0.1" />
              <Field label="Dispositivo" name="device_name" />
              <div className={`${styles.field} ${styles.full}`}>
                <label htmlFor="body_notes">Notas</label>
                <textarea id="body_notes" name="notes" placeholder="Ex.: mesmo horário, mesma balança..." />
              </div>
              <button type="submit">SALVAR MEDIÇÃO</button>
            </form>
          </article>

          <article className={styles.formCard}>
            <span className={styles.label}>CIRCUMFERENCES</span>
            <h2>Medidas corporais</h2>
            <p>Use a mesma posição anatômica e técnica de fita a cada comparação.</p>
            <form action={logCircumference}>
              <Field label="Cintura (cm)" name="waist_cm" type="number" step="0.1" />
              <Field label="Quadril (cm)" name="hip_cm" type="number" step="0.1" />
              <Field label="Peito (cm)" name="chest_cm" type="number" step="0.1" />
              <Field label="Pescoço (cm)" name="neck_cm" type="number" step="0.1" />
              <Field label="Braço esquerdo" name="arm_left_cm" type="number" step="0.1" />
              <Field label="Braço direito" name="arm_right_cm" type="number" step="0.1" />
              <Field label="Coxa esquerda" name="thigh_left_cm" type="number" step="0.1" />
              <Field label="Coxa direita" name="thigh_right_cm" type="number" step="0.1" />
              <Field label="Panturrilha esquerda" name="calf_left_cm" type="number" step="0.1" />
              <Field label="Panturrilha direita" name="calf_right_cm" type="number" step="0.1" />
              <div className={`${styles.field} ${styles.full}`}>
                <label htmlFor="measure_notes">Notas</label>
                <textarea id="measure_notes" name="notes" />
              </div>
              <button type="submit">SALVAR MEDIDAS</button>
            </form>
          </article>
        </section>

        <section className={styles.sectionTitle}><span>CONFIGURAÇÃO</span><h2>Como você quer acompanhar</h2></section>
        <article className={styles.formCard}>
          <form action={saveProgressPreferences}>
            <Field label="Altura (cm)" name="height_cm" type="number" step="0.1" defaultValue={prefs?.height_cm ?? ""} />
            <div className={styles.field}>
              <label htmlFor="weigh_in_frequency">Frequência de peso</label>
              <select id="weigh_in_frequency" name="weigh_in_frequency" defaultValue={prefs?.weigh_in_frequency ?? "optional"}>
                <option value="optional">Opcional</option>
                <option value="weekly">Semanal</option>
                <option value="daily">Diária</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="progress_photo_frequency">Fotos</label>
              <select id="progress_photo_frequency" name="progress_photo_frequency" defaultValue={prefs?.progress_photo_frequency ?? "monthly"}>
                <option value="never">Não lembrar</option>
                <option value="weekly">Semanal</option>
                <option value="biweekly">Quinzenal</option>
                <option value="monthly">Mensal</option>
              </select>
            </div>
            <div className={styles.checkbox}>
              <input id="photo_ai_analysis_opt_in" name="photo_ai_analysis_opt_in" type="checkbox" defaultChecked={prefs?.photo_ai_analysis_opt_in ?? false} />
              <label htmlFor="photo_ai_analysis_opt_in">
                Permitir análise visual pelo Coach X quando esta função for ativada. Desligado por padrão; não habilita diagnóstico nem estimativa precisa de gordura/massa muscular.
              </label>
            </div>
            <button type="submit">SALVAR PREFERÊNCIAS</button>
          </form>
        </article>

        <section className={styles.sectionTitle}><span>HISTORY</span><h2>Medições recentes</h2></section>
        {body?.length ? (
          <div className={styles.panel}>
            <table className={styles.historyTable}>
              <thead><tr><th>Data</th><th>Peso</th><th>Gordura</th><th>Músculo</th><th>Método</th></tr></thead>
              <tbody>
                {body.map((row) => (
                  <tr key={row.id}>
                    <td>{String(row.measured_at).slice(0,10)}</td>
                    <td>{row.weight_kg ?? "—"}</td>
                    <td>{row.body_fat_pct ? `${row.body_fat_pct}%` : "—"}</td>
                    <td>{row.muscle_mass_kg ? `${row.muscle_mass_kg} kg` : "—"}</td>
                    <td>{row.device_name || row.measurement_method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <div className={styles.empty}>Nenhuma medição corporal registrada ainda.</div>}

        {circumferences?.length ? (
          <>
            <section className={styles.sectionTitle}><span>TAPE</span><h2>Medidas recentes</h2></section>
            <div className={styles.panel}>
              <table className={styles.historyTable}>
                <thead><tr><th>Data</th><th>Cintura</th><th>Quadril</th><th>Peito</th></tr></thead>
                <tbody>
                  {circumferences.map((row) => (
                    <tr key={row.id}>
                      <td>{String(row.measured_at).slice(0,10)}</td>
                      <td>{row.waist_cm ?? "—"}</td><td>{row.hip_cm ?? "—"}</td><td>{row.chest_cm ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        <section className={styles.notice}>
          <strong>IMPORTANTE</strong>
          <p>
            BIA, smart scales e outros métodos estimam composição corporal e podem variar com
            hidratação, horário, dispositivo e algoritmo. Use-os como tendência, não como diagnóstico.
          </p>
        </section>
      </div>
    </main>
  );
}

function Field({
  label, name, type = "text", step, defaultValue,
}: {
  label: string; name: string; type?: string; step?: string; defaultValue?: string | number;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} step={step} defaultValue={defaultValue} />
    </div>
  );
}
