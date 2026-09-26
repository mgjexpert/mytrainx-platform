import Link from "next/link";
import { redirect } from "next/navigation";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import { getActiveEntitlement } from "@/lib/domain/access";
import styles from "@/components/wkt-member.module.css";

export default async function WktJourney() {
  const entitlement = await getActiveEntitlement("wkt-militar");
  if (!entitlement) redirect("/programas/wkt-militar/oferta?reason=access");
  const hero = driveThumbnailUrl(workouts[0].driveFileId,1600);

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
            <div className={styles.heroStats}><div><b>{workouts.length}</b><small>sessões</small></div><div><b>12</b><small>semanas de jornada</small></div><div><b>VIDEO</b><small>follow-along</small></div></div>
            <Link className={styles.heroAction} href={`/app/workout/${workouts[0].slug}`}>INICIAR MISSÃO 01 →</Link>
          </div>
        </section>
        <div className={styles.sectionHead}><div><span>MISSION CATALOG</span><h2>As 21 missões.</h2></div><p>Cada card usa a media real da sessão. O tracking de conclusão será ligado ao motor de Progress numa etapa própria; não simulamos conclusão local.</p></div>
        <section className={styles.grid}>
          {workouts.map((w) => (
            <Link href={`/app/workout/${w.slug}`} className={styles.mission} style={{backgroundImage:`url("${driveThumbnailUrl(w.driveFileId,900)}")`}} key={w.id}>
              <div className={styles.missionShade}/><span>MISSÃO {String(w.id).padStart(2,"0")}</span><b>{w.code}</b><small>{w.focus}</small><em>ABRIR SESSÃO →</em>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
