import Link from "next/link";
import { redirect } from "next/navigation";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import { getActiveEntitlement } from "@/lib/domain/access";
import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import styles from "@/components/wkt-member.module.css";

export default async function WktJourney() {
  const entitlement = await getActiveEntitlement("wkt-militar");
  if (!entitlement) redirect("/programas/wkt-militar/oferta?reason=access");
  const hero = driveThumbnailUrl(workouts[0].driveFileId,1600);
  const session = await getSession();
  const supabase = await createClient();
  const { data: program } = await supabase.from("programs").select("id").eq("slug","wkt-militar").eq("active",true).maybeSingle();
  const { data: dbWorkouts } = program
    ? await supabase.from("workouts").select("id,slug").eq("program_id",program.id).eq("active",true)
    : { data: [] };
  const workoutIds = (dbWorkouts ?? []).map((row) => row.id);
  const { data: progress } = session?.userId && workoutIds.length
    ? await supabase.from("workout_progress").select("workout_id,completed_at").eq("user_id",session.userId).in("workout_id",workoutIds)
    : { data: [] };
  const completedIds = new Set((progress ?? []).filter((row) => row.completed_at).map((row) => row.workout_id));
  const dbBySlug = new Map((dbWorkouts ?? []).map((row) => [row.slug,row.id]));
  const completedCount = completedIds.size;
  const percentage = workouts.length ? Math.round((completedCount / workouts.length) * 100) : 0;
  const firstPending = workouts.find((workout) => {
    const id = dbBySlug.get(workout.slug);
    return !id || !completedIds.has(id);
  }) ?? workouts[workouts.length - 1];

  return (
    <main className={styles.journey}>
      <div className={styles.shell}>
        <div className={styles.top}><Link className={styles.back} href="/app/programas">← PROGRAMAS</Link><span className={styles.status}>● ACESSO ATIVO</span></div>
        <section className={styles.hero} style={{backgroundImage:`url("${hero}")`}}>
          <div className={styles.shade}/>
          <div className={styles.heroCopy}>
            <span>WKT MILITAR · STRUCTURED PROGRAM</span>
            <h1>DISCIPLINA.<br/><em>MISSÃO POR MISSÃO.</em></h1>
            <p>21 sessões guiadas do produto original, preservadas dentro do ecossistema MyTrainX. Abre a missão, acompanha o vídeo e segue a sequência sem precisar decidir o treino do dia.</p>
            <div className={styles.heroStats}><div><b>{workouts.length}</b><small>sessões</small></div><div><b>{completedCount}</b><small>concluídas</small></div><div><b>{percentage}%</b><small>progresso</small></div></div>
            <Link className={styles.heroAction} href={`/app/workout/${firstPending.slug}`}>{completedCount ? "CONTINUAR PROGRAMA →" : "INICIAR MISSÃO 01 →"}</Link>
          </div>
        </section>
        <div className={styles.sectionHead}><div><span>MISSION CATALOG</span><h2>As 21 missões.</h2></div><p>A conclusão já é persistida na tua conta. O mesmo estado alimenta o Progress e a próxima sessão consultada pelas tools internas do Coach X.</p></div>
        <section className={styles.grid}>
          {workouts.map((w) => {
            const dbId = dbBySlug.get(w.slug);
            const done = Boolean(dbId && completedIds.has(dbId));
            return (
              <Link href={`/app/workout/${w.slug}`} className={`${styles.mission} ${done ? styles.missionDone : ""}`} style={{backgroundImage:`url("${driveThumbnailUrl(w.driveFileId,900)}")`}} key={w.id}>
                <div className={styles.missionShade}/><span>MISSÃO {String(w.id).padStart(2,"0")}</span>{done ? <i className={styles.doneBadge}>✓ CONCLUÍDA</i> : null}<b>{w.code}</b><small>{w.focus}</small><em>{done ? "REVER SESSÃO →" : "ABRIR SESSÃO →"}</em>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
