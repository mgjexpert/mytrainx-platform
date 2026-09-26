import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import {
  getProgressDashboard,
  measurementLabel,
  trendDelta,
  type BodyMetricEntry,
} from "@/lib/progress";
import {
  addBodyMetric,
  addCircumference,
  addProgressGoal,
  saveProgressPreferences,
} from "./actions";
import { ProgressPhotoUploader } from "@/components/progress/ProgressPhotoUploader";
import styles from "./performance.module.css";

function fmt(value: number | null | undefined, suffix = "") {
  return typeof value === "number" ? `${value.toFixed(1)}${suffix}` : "—";
}

function trendText(delta: number | null, suffix: string) {
  if (delta === null || Math.abs(delta) < 0.01) return "sem tendência suficiente";
  const sign = delta > 0 ? "+" : "";
  return `${sign}${delta.toFixed(1)}${suffix} vs. janela anterior`;
}

function qualityLabel(value: string | undefined) {
  const labels: Record<string, string> = {
    unverified: "medição informada",
    consumer_estimate: "estimativa de dispositivo",
    professional_estimate: "estimativa profissional",
    reference_method: "método de referência",
  };
  return value ? labels[value] || value : "sem medição";
}

function WeightSparkline({ entries }: { entries: BodyMetricEntry[] }) {
  const points = entries
    .filter((entry) => typeof entry.weight_kg === "number")
    .slice(0, 24)
    .reverse();

  if (points.length < 2) {
    return <div className={styles.emptyChart}>Adicione pelo menos 2 pesagens para ver a tendência.</div>;
  }

  const values = points.map((entry) => entry.weight_kg as number);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(max - min, 1);
  const coords = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 90 - ((value - min) / span) * 70;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className={styles.chartWrap}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Tendência de peso">
        <polyline points={coords} fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className={styles.chartScale}><span>{max.toFixed(1)} kg</span><span>{min.toFixed(1)} kg</span></div>
    </div>
  );
}

export default async function PerformancePage() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const { metrics, circumferences, goals, preferences, photoSets } =
    await getProgressDashboard(session.userId);

  const latest = metrics[0];
  const latestCirc = circumferences[0];
  const window = preferences?.trend_window_days || 7;
  const weightTrend = trendDelta(metrics, "weight_kg", window);
  const fatTrend = trendDelta(metrics, "body_fat_pct", window);
  const muscleTrend = trendDelta(metrics, "muscle_mass_kg", window);

  return (
    <main className={styles.page}>
      <div className={styles.topline}>
        <Link href="/app">← COMMAND CENTER</Link>
        <span>EVOLUTION CENTER · PRIVATE</span>
      </div>

      <section className={styles.hero}>
        <div>
          <span>PERFORMANCE / BODY & HABITS</span>
          <h1>EVOLUA COM <em>CONTEXTO.</em></h1>
          <p>
            Peso, medidas, composição estimada, metas e fotos no mesmo histórico. O foco é
            tendência e consistência — não transformar um número isolado em diagnóstico.
          </p>
        </div>
        <div className={styles.heroBadge}>
          <small>ÚLTIMA MEDIÇÃO</small>
          <strong>{latest ? new Date(latest.measured_at).toLocaleDateString("pt-BR") : "—"}</strong>
          <span>{qualityLabel(latest?.measurement_quality)}</span>
        </div>
      </section>

      <section className={styles.metricsGrid}>
        <MetricCard label="PESO" value={fmt(latest?.weight_kg, " kg")} trend={trendText(weightTrend, " kg")} />
        <MetricCard label="GORDURA EST." value={fmt(latest?.body_fat_pct, "%")} trend={trendText(fatTrend, " pp")} />
        <MetricCard label="MASSA MUSCULAR EST." value={fmt(latest?.muscle_mass_kg, " kg")} trend={trendText(muscleTrend, " kg")} />
        <MetricCard label="CINTURA" value={fmt(latestCirc?.waist_cm, " cm")} trend="medida padronizada por fita" />
      </section>

      <section className={styles.dashboardGrid}>
        <article className={styles.panel}>
          <div className={styles.panelHeading}>
            <div><span>WEIGHT TREND</span><h2>Tendência, não ruído</h2></div>
            <small>janela: {window} medições</small>
          </div>
          <WeightSparkline entries={metrics} />
          <p className={styles.panelNote}>
            Variações diárias de peso acontecem. Use condições semelhantes e observe o padrão ao longo do tempo.
          </p>
        </article>

        <article className={styles.panel}>
          <div className={styles.panelHeading}>
            <div><span>BODY COMPOSITION</span><h2>Leia a origem da estimativa</h2></div>
          </div>
          <div className={styles.methodList}>
            <div><b>{latest ? measurementLabel(latest.measurement_method) : "Sem dados"}</b><span>Método mais recente</span></div>
            <div><b>{fmt(latest?.lean_mass_kg, " kg")}</b><span>Massa magra estimada</span></div>
            <div><b>{fmt(latest?.hydration_pct, "%")}</b><span>Hidratação estimada</span></div>
          </div>
          <p className={styles.panelNote}>
            BIA e balanças inteligentes são úteis sobretudo para acompanhar tendências em condições semelhantes.
            “Massa magra” e “massa muscular” não são sinónimos e diferentes métodos não devem ser comparados como se fossem equivalentes.
          </p>
        </article>
      </section>

      <section className={styles.checkinSection}>
        <div className={styles.sectionTitle}><span>CHECK-IN</span><h2>Registre dados em menos de um minuto</h2></div>
        <div className={styles.formsGrid}>
          <form className={styles.formCard} action={addBodyMetric}>
            <div className={styles.formHeader}><div><span>01</span><h3>Peso & composição</h3></div><small>valores opcionais</small></div>
            <label><span>Data</span><input type="date" name="measured_on" /></label>
            <label><span>Método</span>
              <select name="measurement_method" defaultValue="manual_scale">
                <option value="manual_scale">Balança comum</option>
                <option value="smart_scale_bia">Balança inteligente / BIA</option>
                <option value="bia_professional">BIA profissional</option>
                <option value="dexa">DXA</option>
                <option value="skinfold">Dobras cutâneas</option>
                <option value="3d_scan">Scan 3D</option>
                <option value="other">Outro</option>
              </select>
            </label>
            <div className={styles.formGrid}>
              <label><span>Peso (kg)</span><input name="weight_kg" inputMode="decimal" placeholder="78,4" /></label>
              <label><span>Gordura (%)</span><input name="body_fat_pct" inputMode="decimal" placeholder="estimada" /></label>
              <label><span>Massa muscular (kg)</span><input name="muscle_mass_kg" inputMode="decimal" placeholder="estimada" /></label>
              <label><span>Massa magra (kg)</span><input name="lean_mass_kg" inputMode="decimal" placeholder="opcional" /></label>
            </div>
            <label><span>Dispositivo</span><input name="device_name" placeholder="Ex.: Mi Body Scale, InBody..." /></label>
            <label><span>Nota</span><input name="notes" placeholder="Jejum, pós-treino, viagem..." /></label>
            <button type="submit">GUARDAR MÉTRICA →</button>
          </form>

          <form className={styles.formCard} action={addCircumference}>
            <div className={styles.formHeader}><div><span>02</span><h3>Medidas corporais</h3></div><small>fita métrica</small></div>
            <label><span>Data</span><input type="date" name="measured_on" /></label>
            <div className={styles.formGrid}>
              <label><span>Cintura (cm)</span><input name="waist_cm" inputMode="decimal" /></label>
              <label><span>Quadril (cm)</span><input name="hip_cm" inputMode="decimal" /></label>
              <label><span>Peito (cm)</span><input name="chest_cm" inputMode="decimal" /></label>
              <label><span>Braço E (cm)</span><input name="arm_left_cm" inputMode="decimal" /></label>
              <label><span>Braço D (cm)</span><input name="arm_right_cm" inputMode="decimal" /></label>
              <label><span>Coxa E (cm)</span><input name="thigh_left_cm" inputMode="decimal" /></label>
              <label><span>Coxa D (cm)</span><input name="thigh_right_cm" inputMode="decimal" /></label>
            </div>
            <label><span>Nota</span><input name="notes" placeholder="Mesma fita, mesmo ponto, antes do treino..." /></label>
            <button type="submit">GUARDAR MEDIDAS →</button>
          </form>
        </div>
      </section>

      <section className={styles.photoSection}>
        <div className={styles.sectionTitle}><span>VISUAL PROGRESS</span><h2>Fotos semanais ou mensais, privadas</h2></div>
        <ProgressPhotoUploader />

        {photoSets.length > 0 && (
          <div className={styles.photoHistory}>
            {photoSets.map((set) => (
              <article className={styles.photoSet} key={set.id}>
                <div className={styles.photoSetHead}>
                  <div><b>{set.label || "Check-in"}</b><span>{new Date(set.captured_on + "T12:00:00Z").toLocaleDateString("pt-BR")}</span></div>
                  <small>{set.photos.length} foto(s)</small>
                </div>
                <div className={styles.photoGrid}>
                  {set.photos.map((photo) => photo.signed_url ? (
                    <figure key={photo.id}>
                      <img src={photo.signed_url} alt={`Foto de progresso — ${photo.angle}`} />
                      <figcaption>{photo.angle.replace("_", " ")}</figcaption>
                    </figure>
                  ) : null)}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className={styles.lowerGrid}>
        <form className={styles.formCard} action={addProgressGoal}>
          <div className={styles.formHeader}><div><span>GOALS</span><h3>Defina uma direção</h3></div></div>
          <label><span>Meta</span><input name="title" placeholder="Ex.: manter 3 treinos/semana" required /></label>
          <div className={styles.formGrid}>
            <label><span>Tipo</span>
              <select name="goal_type" defaultValue="consistency">
                <option value="consistency">Consistência</option>
                <option value="weight">Peso</option>
                <option value="waist">Cintura</option>
                <option value="body_fat_estimate">Gordura estimada</option>
                <option value="muscle_mass_estimate">Massa muscular estimada</option>
                <option value="strength">Força</option>
                <option value="endurance">Condicionamento</option>
                <option value="custom">Personalizada</option>
              </select>
            </label>
            <label><span>Direção</span>
              <select name="target_direction" defaultValue="custom">
                <option value="increase">Aumentar</option>
                <option value="decrease">Reduzir</option>
                <option value="maintain">Manter</option>
                <option value="at_least">Pelo menos</option>
                <option value="at_most">No máximo</option>
                <option value="custom">Personalizada</option>
              </select>
            </label>
            <label><span>Valor inicial</span><input name="start_value" inputMode="decimal" /></label>
            <label><span>Objetivo</span><input name="target_value" inputMode="decimal" /></label>
            <label><span>Unidade</span><input name="unit" placeholder="kg, cm, treinos/sem..." /></label>
            <label><span>Data-alvo</span><input type="date" name="target_date" /></label>
          </div>
          <button type="submit">CRIAR META →</button>
        </form>

        <form className={styles.formCard} action={saveProgressPreferences}>
          <div className={styles.formHeader}><div><span>SETTINGS</span><h3>Configure seu acompanhamento</h3></div></div>
          <label><span>Altura (cm)</span><input name="height_cm" inputMode="decimal" defaultValue={preferences?.height_cm || ""} /></label>
          <label><span>Pesagem</span>
            <select name="weigh_in_frequency" defaultValue={preferences?.weigh_in_frequency || "optional"}>
              <option value="optional">Quando quiser</option>
              <option value="daily">Diária</option>
              <option value="weekly">Semanal</option>
            </select>
          </label>
          <label><span>Janela de tendência</span>
            <select name="trend_window_days" defaultValue={preferences?.trend_window_days || 7}>
              <option value="7">7 medições</option>
              <option value="14">14 medições</option>
              <option value="21">21 medições</option>
              <option value="30">30 medições</option>
            </select>
          </label>
          <label><span>Fotos de progresso</span>
            <select name="progress_photo_frequency" defaultValue={preferences?.progress_photo_frequency || "monthly"}>
              <option value="never">Não lembrar</option>
              <option value="weekly">Semanal</option>
              <option value="biweekly">A cada 2 semanas</option>
              <option value="monthly">Mensal</option>
            </select>
          </label>
          <label><span>Dia do check-in semanal</span>
            <select name="weekly_checkin_weekday" defaultValue={preferences?.weekly_checkin_weekday || 1}>
              <option value="1">Segunda</option><option value="2">Terça</option><option value="3">Quarta</option>
              <option value="4">Quinta</option><option value="5">Sexta</option><option value="6">Sábado</option><option value="7">Domingo</option>
            </select>
          </label>
          <button type="submit">GUARDAR CONFIGURAÇÃO →</button>
        </form>
      </section>

      {goals.length > 0 && (
        <section className={styles.goals}>
          <div className={styles.sectionTitle}><span>ACTIVE GOALS</span><h2>Direções atuais</h2></div>
          <div className={styles.goalGrid}>
            {goals.map((goal) => (
              <article key={goal.id}>
                <span>{goal.goal_type.replaceAll("_", " ")}</span>
                <b>{goal.title}</b>
                <small>
                  {goal.start_value ?? "—"} {goal.unit || ""} → {goal.target_value ?? "—"} {goal.unit || ""}
                </small>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className={styles.protocol}>
        <span>MYTRAINX MEASUREMENT PROTOCOL</span>
        <h2>Compare condições semelhantes.</h2>
        <div>
          <p><b>Peso:</b> quando possível, use a mesma balança e condições semelhantes.</p>
          <p><b>BIA:</b> hidratação, alimentação e atividade recente podem alterar estimativas; acompanhe tendência.</p>
          <p><b>Fita:</b> repita os mesmos pontos anatómicos e tensão da fita.</p>
          <p><b>Fotos:</b> mesma distância, luz, enquadramento e postura tornam a comparação mais útil.</p>
        </div>
      </section>
    </main>
  );
}

function MetricCard({ label, value, trend }: { label: string; value: string; trend: string }) {
  return <article className={styles.metricCard}><span>{label}</span><strong>{value}</strong><small>{trend}</small></article>;
}
