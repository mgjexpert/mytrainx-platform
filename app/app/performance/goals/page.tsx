import Link from "next/link";
import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { saveProgressGoal } from "../actions";
import styles from "../performance.module.css";

const goalLabels: Record<string,string> = {
  consistency: "Consistência",
  weight: "Peso",
  waist: "Cintura",
  body_fat_estimate: "Gordura estimada",
  muscle_mass_estimate: "Massa muscular estimada",
  strength: "Força",
  mobility: "Mobilidade",
  endurance: "Endurance",
  custom: "Personalizada",
};

export default async function ProgressGoalsPage() {
  const session = await getSession();
  if (!session?.userId) return null;
  const supabase = await createClient();
  const { data: goals } = await supabase
    .from("progress_goals")
    .select("id,goal_type,title,target_direction,start_value,target_value,unit,start_date,target_date,status,notes")
    .eq("user_id", session.userId)
    .order("created_at", { ascending: false });

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.top}>
          <Link className={styles.back} href="/app/performance">← PROGRESS</Link>
          <span className={styles.eyebrow}>GOALS</span>
        </div>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>YOUR TARGET, YOUR METRICS</span>
          <h1>Defina o que progresso significa para você.</h1>
          <p>
            O MyTrainX não presume que todo objetivo seja perder peso. Você pode priorizar
            consistência, força, mobilidade, endurance, medidas ou uma meta personalizada.
          </p>
        </section>

        <article className={styles.formCard}>
          <span className={styles.label}>NEW GOAL</span>
          <h2>Criar meta</h2>
          <form action={saveProgressGoal}>
            <div className={styles.field}>
              <label htmlFor="goal_type">Tipo</label>
              <select id="goal_type" name="goal_type" defaultValue="consistency">
                {Object.entries(goalLabels).map(([value,label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="target_direction">Direção</label>
              <select id="target_direction" name="target_direction" defaultValue="custom">
                <option value="custom">Personalizada</option>
                <option value="increase">Aumentar</option>
                <option value="decrease">Reduzir</option>
                <option value="maintain">Manter</option>
                <option value="at_least">Pelo menos</option>
                <option value="at_most">No máximo</option>
              </select>
            </div>
            <div className={`${styles.field} ${styles.full}`}>
              <label htmlFor="title">Meta em linguagem simples</label>
              <input id="title" name="title" required placeholder="Ex.: Completar 3 treinos por semana por 8 semanas" />
            </div>
            <Field label="Valor inicial" name="start_value" />
            <Field label="Valor alvo" name="target_value" />
            <Field label="Unidade" name="unit" type="text" />
            <div className={styles.field}>
              <label htmlFor="target_date">Data-alvo opcional</label>
              <input id="target_date" name="target_date" type="date" />
            </div>
            <div className={`${styles.field} ${styles.full}`}>
              <label htmlFor="notes">Notas</label>
              <textarea id="notes" name="notes" placeholder="Por que esta meta importa? Como você pretende medir?" />
            </div>
            <button type="submit">CRIAR META</button>
          </form>
        </article>

        <section className={styles.sectionTitle}><span>ACTIVE & HISTORY</span><h2>Suas metas</h2></section>
        {goals?.length ? (
          <div className={styles.navGrid}>
            {goals.map((goal) => (
              <article className={styles.navCard} key={goal.id}>
                <span>{goalLabels[goal.goal_type] ?? goal.goal_type} / {goal.status}</span>
                <b>{goal.title}</b>
                <small>
                  {goal.target_value !== null ? `Alvo: ${goal.target_value} ${goal.unit ?? ""}` : "Meta qualitativa"}
                  {goal.target_date ? ` • até ${goal.target_date}` : ""}
                </small>
                <em>{goal.start_date}</em>
              </article>
            ))}
          </div>
        ) : <div className={styles.empty}>Nenhuma meta definida. Comece pelo que realmente quer melhorar.</div>}

        <section className={styles.notice}>
          <strong>OBJETIVOS NÃO SÃO DIAGNÓSTICOS</strong>
          <p>
            Metas de composição corporal são tratadas como preferências de acompanhamento.
            O Coach X não deve definir objetivos clínicos ou extremos sem o contexto e a orientação profissional necessários.
          </p>
        </section>
      </div>
    </main>
  );
}

function Field({ label, name, type = "number" }: { label: string; name: string; type?: string }) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} step={type === "number" ? "0.1" : undefined} />
    </div>
  );
}
