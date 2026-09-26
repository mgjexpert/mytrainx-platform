import Link from "next/link";
import { drivePreviewUrl, getWorkout, workouts } from "@/lib/workouts";
import { notFound, redirect } from "next/navigation";
import { getActiveEntitlement } from "@/lib/domain/access";
import styles from "@/components/wkt-member.module.css";

export default async function WorkoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const entitlement = await getActiveEntitlement("wkt-militar");
  if (!entitlement) redirect("/programas/wkt-militar/oferta?reason=access");

  const { slug } = await params;
  const workout = getWorkout(slug);
  if (!workout) notFound();
  const index = workouts.findIndex((item) => item.slug === slug);
  const previous = index > 0 ? workouts[index - 1] : null;
  const next = index >= 0 && index < workouts.length - 1 ? workouts[index + 1] : null;

  return (
    <main className={styles.player}>
      <div className={styles.playerShell}>
        <div className={styles.playerTop}>
          <Link className={styles.back} href="/app/programas/wkt-militar">← WKT MILITAR</Link>
          <div className={styles.missionTitle}><span>MISSÃO {String(workout.id).padStart(2,"0")} / {String(workouts.length).padStart(2,"0")}</span><b>{workout.code}</b></div>
        </div>
        <div className={styles.playerGrid}>
          <section className={styles.videoPanel}>
            <div className={styles.videoFrame}><iframe src={drivePreviewUrl(workout.driveFileId)} allow="autoplay; fullscreen" allowFullScreen title={`Treino ${workout.id} ${workout.code}`}/></div>
            <div className={styles.underVideo}><div><span>FOLLOW-ALONG SESSION</span><b>Faça junto. Adapte o ritmo quando necessário.</b><small>O vídeo é reproduzido diretamente da fonte WKT no Google Drive.</small></div></div>
          </section>
          <aside className={styles.info}>
            <span>WKT · MISSÃO {String(workout.id).padStart(2,"0")}</span>
            <h1>{workout.code}</h1>
            <p>{workout.focus}</p>
            <div className={styles.meta}><div><span>FORMATO</span><b>Sessão guiada</b></div><div><span>ACESSO</span><b>Entitlement ativo</b></div></div>
            <div className={styles.steps}>
              <div className={styles.step}><span>01</span><div><b>Preparação</b><small>Organize espaço, água e equipamento.</small></div></div>
              <div className={styles.step}><span>02</span><div><b>Treino guiado</b><small>Acompanhe a sessão e preserve técnica.</small></div></div>
              <div className={styles.step}><span>03</span><div><b>Finalização</b><small>Recupere e registe contexto útil quando necessário.</small></div></div>
            </div>
            <div className={styles.note}>O botão de conclusão legado foi removido desta versão porque ainda não existia persistência de conclusão ligada ao Progress. A interface não deve fingir que gravou um estado.</div>
            <nav className={styles.nav}>
              {previous ? <Link href={`/app/workout/${previous.slug}`}>← MISSÃO {String(previous.id).padStart(2,"0")}</Link> : <Link href="/app/programas/wkt-militar">CATÁLOGO</Link>}
              {next ? <Link href={`/app/workout/${next.slug}`}>MISSÃO {String(next.id).padStart(2,"0")} →</Link> : <Link href="/app/performance/check-in">CHECK-IN →</Link>}
            </nav>
          </aside>
        </div>
      </div>
    </main>
  );
}
