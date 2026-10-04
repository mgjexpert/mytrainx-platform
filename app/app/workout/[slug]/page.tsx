import Link from "next/link";
import { drivePreviewUrl, getWorkout, workouts } from "@/lib/workouts";
import { notFound, redirect } from "next/navigation";
import { getActiveEntitlement } from "@/lib/domain/access";
import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { markWorkoutComplete } from "../actions";
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
  const session = await getSession();
  const supabase = await createClient();
  const { data: dbWorkout } = await supabase.from("workouts").select("id").eq("slug", slug).maybeSingle();
  const { data: progress } = dbWorkout && session?.userId
    ? await supabase.from("workout_progress").select("completed_at").eq("user_id", session.userId).eq("workout_id", dbWorkout.id).maybeSingle()
    : { data: null };

  return (
    <main className={styles.player}>
      <div className={styles.playerShell}>
        <div className={styles.playerTop}>
          <Link className={styles.back} href="/app/programas/wkt-militar">← WKT MILITAR</Link>
          <div className={styles.missionTitle}><span>MISSÃO {String(workout.id).padStart(2,"0")} / {String(workouts.length).padStart(2,"0")}</span><b>{workout.code}</b></div>
        </div>
        <div className={styles.sessionRail} aria-label="Posição no programa WKT">
          {workouts.map((item,railIndex) => (
            <Link
              key={item.slug}
              href={`/app/workout/${item.slug}`}
              className={railIndex < index ? styles.railDone : railIndex === index ? styles.railCurrent : undefined}
              aria-label={`Missão ${item.id}: ${item.code}`}
              title={`Missão ${item.id}: ${item.code}`}
            >
              <span>{String(item.id).padStart(2,"0")}</span>
            </Link>
          ))}
        </div>
        <div className={styles.playerGrid}>
          <section className={styles.videoPanel}>
            <div className={styles.videoFrame}><iframe src={drivePreviewUrl(workout.driveFileId)} allow="autoplay; fullscreen" allowFullScreen title={`Treino ${workout.id} ${workout.code}`}/></div>
            <div className={styles.underVideo}>
              <div><span>FOLLOW-ALONG SESSION</span><b>Faça junto. Adapte o ritmo quando necessário.</b><small>O vídeo é reproduzido diretamente da fonte WKT no Google Drive.</small></div>
              <div className={styles.videoProgress}><b>{Math.round(((index+1)/workouts.length)*100)}%</b><small>posição no programa</small></div>
            </div>
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
            <form action={markWorkoutComplete.bind(null, slug, next?.slug ?? null)} className={styles.completeForm}>
              <button type="submit" className={progress?.completed_at ? styles.completed : styles.complete}>
                {progress?.completed_at ? "MISSÃO CONCLUÍDA ✓ · GUARDAR NOVAMENTE" : next ? "CONCLUIR E IR PARA A PRÓXIMA →" : "CONCLUIR PROGRAMA →"}
              </button>
            </form>
            <div className={styles.note}>A conclusão é agora persistida no `workout_progress` da tua conta e alimenta Progress e as tools internas do Coach X.</div>
            {next ? <div className={styles.upNext}><span>A SEGUIR</span><b>MISSÃO {String(next.id).padStart(2,"0")} · {next.code}</b><small>{next.focus}</small></div> : <div className={styles.upNext}><span>FINAL DO PROGRAMA</span><b>FECHA O CICLO COM UM CHECK-IN.</b><small>Regista como o programa correu antes de escolher a próxima jornada.</small></div>}
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
