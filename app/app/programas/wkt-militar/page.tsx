import Link from "next/link";
import { redirect } from "next/navigation";
import { workouts } from "@/lib/workouts";
import { getActiveEntitlement } from "@/lib/domain/access";
import styles from "@/components/member-section.module.css";

export default async function WktJourney() {
  const entitlement = await getActiveEntitlement("wkt-militar");
  if (!entitlement) redirect("/programas/wkt-militar/oferta?reason=access");

  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/app/programas">← MY PROGRAMS</Link>
      <section className={styles.head}>
        <span>ACTIVE PROGRAM</span>
        <h1>WKT Militar</h1>
        <p>21 sessões guiadas preservadas do produto original. O acesso é validado pelo entitlement ativo da conta.</p>
      </section>
      <section className={styles.grid}>
        {workouts.map((w) => (
          <article className={styles.card} key={w.id}>
            <span>MISSION {String(w.id).padStart(2, "0")}</span>
            <b>{w.code}</b>
            <small>{w.focus}</small>
            <Link href={`/app/workout/${w.slug}`}>START →</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
