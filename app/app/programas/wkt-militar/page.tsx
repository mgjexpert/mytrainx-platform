import Link from "next/link";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import styles from "@/components/member-section.module.css";

export default function WktJourney(){
  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/app/programas">← MY PROGRAMS</Link>
      <section className={styles.head}>
        <span>ACTIVE PROGRAM · WKT MILITAR</span>
        <h1>21 missões. Um próximo passo claro.</h1>
        <p>Abra uma sessão e acompanhe o treino guiado. O catálogo abaixo usa os 21 vídeos verificados atualmente no produto.</p>
      </section>
      <section className={styles.grid}>
        {workouts.map((w,index)=>(
          <article className={styles.card} key={w.id} style={{backgroundImage:`linear-gradient(180deg,#090b0e99,#090b0ef2),url("${driveThumbnailUrl(w.driveFileId,900)}")`,backgroundSize:"cover",backgroundPosition:"center"}}>
            <span>MISSION {String(w.id).padStart(2,"0")} · {String(index+1).padStart(2,"0")}/{workouts.length}</span>
            <b>{w.code}</b>
            <small>{w.focus}</small>
            <Link href={`/app/workout/${w.slug}`}>OPEN MISSION →</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
