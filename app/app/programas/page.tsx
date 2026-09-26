import Link from "next/link";
import styles from "@/components/member-section.module.css";

export default function Page(){
  return <main className={styles.page}>
    <Link className={styles.back} href="/app">← COMMAND CENTER</Link>
    <section className={styles.head}><span>MY PROGRAMS</span><h1>Escolhe o teu caminho.</h1><p>Programas ativos usam o mesmo Exercise Engine, Progress e contexto para o Coach X. HIIT continua visível como AMBER, mas não pode ser iniciado.</p></section>
    <section className={styles.grid}>
      <article className={styles.card}><span>DISPONÍVEL · ENTITLEMENT</span><b>WKT Militar</b><small>21 sessões follow-along com vídeo e tracking real.</small><Link href="/app/programas/wkt-militar">ABRIR PROGRAMA →</Link></article>
      <article className={styles.card}><span>DISPONÍVEL · REGISTERED</span><b>MyTrainX Start</b><small>12 sessões · 4 semanas · onboarding para treino estruturado.</small><Link href="/app/programas/mytrainx-start">ABRIR PROGRAMA →</Link></article>
      <article className={styles.card}><span>DISPONÍVEL · REGISTERED</span><b>Core 21</b><small>21 sessões · 7 semanas · core, estabilidade e carries.</small><Link href="/app/programas/core-21">COMEÇAR →</Link></article>
      <article className={styles.card}><span>DISPONÍVEL · REGISTERED</span><b>Home 30</b><small>12 sessões · 30 dias · treino full-body com equipamento mínimo.</small><Link href="/app/programas/home-30">COMEÇAR →</Link></article>
      <article className={styles.card}><span>DISPONÍVEL · REGISTERED</span><b>Calisthenics Foundations</b><small>12 sessões · 4 semanas · força relativa e controle corporal.</small><Link href="/app/programas/calisthenics-foundations">COMEÇAR →</Link></article>
      <article className={styles.card}><span>AMBER · SAFETY REVIEW</span><b>HIIT Pathway</b><small>12 sessões já estruturadas; intensidade e work-rest ainda não estão liberados.</small></article>
    </section>
  </main>;
}