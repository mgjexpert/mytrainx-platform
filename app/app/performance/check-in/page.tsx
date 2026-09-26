import Link from "next/link";
import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { saveWeeklyCheckin } from "../actions";
import styles from "../performance.module.css";

const scoreOptions = [1,2,3,4,5];

export default async function WeeklyCheckinPage() {
  const session = await getSession();
  if (!session?.userId) return null;
  const supabase = await createClient();
  const { data: latest } = await supabase.from("weekly_checkins")
    .select("*").eq("user_id", session.userId).order("week_start", { ascending: false }).limit(1).maybeSingle();

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.top}>
          <Link className={styles.back} href="/app/performance">← PROGRESS</Link>
          <span className={styles.eyebrow}>WEEKLY CHECK-IN</span>
        </div>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>60 SECOND REVIEW</span>
          <h1>Como foi a sua semana?</h1>
          <p>
            Não procuramos uma semana perfeita. O check-in dá contexto ao Coach X para
            interpretar consistência, recuperação e evolução sem depender apenas da balança.
          </p>
        </section>

        <article className={styles.formCard}>
          <form action={saveWeeklyCheckin}>
            <Score label="Energia" name="energy_score" defaultValue={latest?.energy_score} />
            <Score label="Qualidade do sono" name="sleep_quality_score" defaultValue={latest?.sleep_quality_score} />
            <Score label="Soreness / dores musculares" name="soreness_score" defaultValue={latest?.soreness_score} />
            <Score label="Stress" name="stress_score" defaultValue={latest?.stress_score} />
            <Score label="Motivação" name="motivation_score" defaultValue={latest?.motivation_score} />
            <Score label="Consistência alimentar" name="nutrition_consistency_score" defaultValue={latest?.nutrition_consistency_score} />
            <Field label="Sono médio (horas)" name="avg_sleep_hours" step="0.1" defaultValue={latest?.avg_sleep_hours} />
            <Field label="Treinos planejados" name="training_sessions_planned" step="1" defaultValue={latest?.training_sessions_planned} />
            <Field label="Treinos concluídos" name="training_sessions_completed" step="1" defaultValue={latest?.training_sessions_completed} />
            <div className={`${styles.field} ${styles.full}`}>
              <label htmlFor="notes">Notas da semana</label>
              <textarea id="notes" name="notes" defaultValue={latest?.notes ?? ""} placeholder="O que ajudou? O que atrapalhou? Algo precisa mudar?" />
            </div>
            <button type="submit">SALVAR CHECK-IN DA SEMANA</button>
          </form>
        </article>

        <section className={styles.notice}>
          <strong>COMO O COACH X DEVE USAR ISTO</strong>
          <p>
            O check-in serve para contextualizar decisões. Stress alto, sono baixo ou soreness elevada
            não geram automaticamente um diagnóstico ou mudança extrema; são sinais para conversar e ajustar com prudência.
          </p>
        </section>
      </div>
    </main>
  );
}

function Score({ label, name, defaultValue }: { label: string; name: string; defaultValue?: number | null }) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} defaultValue={defaultValue ?? ""}>
        <option value="">—</option>
        {scoreOptions.map((score) => <option value={score} key={score}>{score} / 5</option>)}
      </select>
    </div>
  );
}

function Field({ label, name, step, defaultValue }: { label: string; name: string; step: string; defaultValue?: number | string | null }) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type="number" min="0" step={step} defaultValue={defaultValue ?? ""} />
    </div>
  );
}
