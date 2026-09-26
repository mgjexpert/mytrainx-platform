import Link from "next/link";
import { getSession } from "@/lib/session";
import { getProgressDashboard } from "@/lib/progress";
import styles from "./performance.module.css";

function fmt(value: number | null, suffix = "") {
  if (value === null) return "—";
  return `${value.toFixed(1)}${suffix}`;
}

function deltaText(value: number | null, suffix = "") {
  if (value === null) return "Ainda sem comparação";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}${suffix} vs. período anterior`;
}

export default async function PerformancePage() {
  const session = await getSession();
  if (!session?.userId) return null;
  const progress = await getProgressDashboard(session.userId);

  const values = progress.weightSeries.map((point) => point.value);
  const min = values.length ? Math.min(...values) : 0;
  const max = values.length ? Math.max(...values) : 0;
  const range = Math.max(max - min, 0.5);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.top}>
          <Link className={styles.back} href="/app">← COMMAND CENTER</Link>
          <span className={styles.eyebrow}>MYTRAINX PROGRESS V1</span>
        </div>

        <section className={styles.hero}>
          <span className={styles.eyebrow}>PROGRESS, NOT NOISE</span>
          <h1>Acompanhe o que realmente está mudando.</h1>
          <p>
            Peso, medidas, composição corporal estimada, consistência, check-ins e fotos
            privadas num único histórico. O MyTrainX prioriza tendências e contexto,
            não conclusões precipitadas a partir de um único número.
          </p>
          <div className={styles.actions}>
            <Link className={styles.button} href="/app/performance/body">REGISTRAR MEDIÇÃO</Link>
            <Link className={styles.ghost} href="/app/performance/check-in">CHECK-IN SEMANAL</Link>
            <Link className={styles.ghost} href="/app/performance/photos">FOTOS DE EVOLUÇÃO</Link>
            <Link className={styles.ghost} href="/app/performance/goals">MINHAS METAS</Link>
          </div>
        </section>

        <section className={styles.summary}>
          <article className={styles.metric}>
            <span>PESO ATUAL</span>
            <strong>{fmt(progress.latestWeight, " kg")}</strong>
            <small>{deltaText(progress.weightTrendDelta, " kg")}</small>
          </article>
          <article className={styles.metric}>
            <span>CINTURA</span>
            <strong>{fmt(progress.latestWaist, " cm")}</strong>
            <small>{deltaText(progress.waistDelta, " cm")}</small>
          </article>
          <article className={styles.metric}>
            <span>TREINOS / 28 DIAS</span>
            <strong>{progress.workouts28d}</strong>
            <small>Sessões concluídas registradas</small>
          </article>
          <article className={styles.metric}>
            <span>FOTOS</span>
            <strong>{progress.photoSets}</strong>
            <small>{progress.latestPhotoDate ? `Última: ${progress.latestPhotoDate}` : "Nenhum set ainda"}</small>
          </article>
        </section>

        <section className={styles.grid2}>
          <article className={styles.panel}>
            <span className={styles.label}>WEIGHT TREND</span>
            <h2>Tendência recente</h2>
            <p>
              Leituras individuais oscilam. Quando houver dados suficientes, o painel
              compara médias de janelas equivalentes.
            </p>
            {progress.weightSeries.length ? (
              <div className={styles.bars} aria-label="Histórico visual de peso">
                {progress.weightSeries.map((point) => {
                  const normalized = 22 + ((point.value - min) / range) * 75;
                  return (
                    <div
                      key={point.measuredAt}
                      className={styles.bar}
                      style={{ height: `${normalized}%` }}
                      title={`${point.value.toFixed(1)} kg — ${point.measuredAt.slice(0, 10)}`}
                    />
                  );
                })}
              </div>
            ) : (
              <div className={styles.empty}>Registre a primeira medição para iniciar a tendência.</div>
            )}
          </article>

          <article className={styles.panel}>
            <span className={styles.label}>BODY COMPOSITION</span>
            <h2>Estimativas corporais</h2>
            <div className={styles.dataRows}>
              <div className={styles.dataRow}><span>Gordura corporal</span><b>{fmt(progress.latestBodyFat, "%")}</b></div>
              <div className={styles.dataRow}><span>Massa muscular</span><b>{fmt(progress.latestMuscleMass, " kg")}</b></div>
              <div className={styles.dataRow}><span>Método</span><b>{progress.latestCompositionMethod ?? "—"}</b></div>
            </div>
            <p>
              Estes valores são apresentados como estimativas e devem ser comparados,
              de preferência, usando o mesmo método e condições semelhantes.
            </p>
          </article>
        </section>

        <section className={styles.navGrid}>
          <Link href="/app/performance/body" className={styles.navCard}>
            <span>01 / BODY</span><b>Peso & medidas</b>
            <small>Peso, cintura, composição estimada e histórico.</small><em>ABRIR →</em>
          </Link>
          <Link href="/app/performance/check-in" className={styles.navCard}>
            <span>02 / WEEKLY</span><b>Check-in semanal</b>
            <small>Energia, sono, stress, soreness e consistência.</small><em>ABRIR →</em>
          </Link>
          <Link href="/app/performance/photos" className={styles.navCard}>
            <span>03 / PRIVATE</span><b>Fotos de evolução</b>
            <small>Timeline privada com front, side e back.</small><em>ABRIR →</em>
          </Link>
          <Link href="/app/performance/goals" className={styles.navCard}>
            <span>04 / GOALS</span><b>Minhas metas</b>
            <small>{progress.activeGoals} meta(s) ativa(s). Defina progresso nos seus termos.</small><em>ABRIR →</em>
          </Link>
        </section>

        {progress.latestCheckin && (
          <section className={styles.panel} style={{ marginTop: 10 }}>
            <span className={styles.label}>LAST CHECK-IN / {progress.latestCheckin.weekStart}</span>
            <h2>Como a semana foi registrada</h2>
            <div className={styles.dataRows}>
              <div className={styles.dataRow}><span>Energia</span><b>{progress.latestCheckin.energy ?? "—"} / 5</b></div>
              <div className={styles.dataRow}><span>Sono</span><b>{progress.latestCheckin.sleep ?? "—"} / 5</b></div>
              <div className={styles.dataRow}><span>Motivação</span><b>{progress.latestCheckin.motivation ?? "—"} / 5</b></div>
              <div className={styles.dataRow}><span>Treinos</span><b>{progress.latestCheckin.completed ?? "—"} / {progress.latestCheckin.planned ?? "—"}</b></div>
            </div>
          </section>
        )}

        <section className={styles.notice}>
          <strong>COACH X DATA RULE</strong>
          <p>
            O Coach X pode usar tendências autorizadas para contextualizar o treino,
            mas não deve inferir diagnóstico, percentual de gordura ou massa muscular
            precisa a partir de fotografias.
          </p>
        </section>
      </div>
    </main>
  );
}
