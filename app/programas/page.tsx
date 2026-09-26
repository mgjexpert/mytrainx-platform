import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import styles from "@/components/public-sections.module.css";

const cover=driveThumbnailUrl(workouts[10].driveFileId,1600);

export default function ProgramsPage(){
  return <main className={styles.page}>
    <PublicHeader/>
    <section className={styles.hero}><div className={styles.heroMedia} style={{backgroundImage:`url("${cover}")`}}/><div className={styles.heroContent}><span className={styles.kicker}>STRUCTURED PROGRAMS</span><h1>ESCOLHE O TEU<br/><em>CAMINHO.</em></h1><p>Programas transformam conteúdo em jornada: sessões, progressão, recursos, check-ins e contexto para o Coach X. Os programas registered abaixo podem ser iniciados com uma conta MyTrainX.</p><Link className={styles.cta} href="/login">ENTRAR NO MYTRAINX →</Link></div></section>
    <section className={styles.grid}>
      <article className={styles.card}><span>DISPONÍVEL · PAGO</span><h2>WKT Militar</h2><p>21 sessões follow-along em vídeo. O acesso depende do entitlement WKT.</p><Link href="/programas/wkt-militar">VER PROGRAMA →</Link></article>
      <article className={styles.card}><span>DISPONÍVEL · REGISTERED</span><h2>MyTrainX Start</h2><p>12 sessões · 4 semanas para começar ou regressar ao treino estruturado.</p><Link href="/login">ENTRAR E COMEÇAR →</Link></article>
      <article className={styles.card}><span>DISPONÍVEL · REGISTERED</span><h2>Core 21</h2><p>21 sessões · 7 semanas de core, estabilidade, anti-rotação e carries.</p><Link href="/login">ENTRAR E COMEÇAR →</Link></article>
      <article className={styles.card}><span>DISPONÍVEL · REGISTERED</span><h2>Home 30</h2><p>12 sessões em 30 dias para treino em casa com equipamento mínimo.</p><Link href="/login">ENTRAR E COMEÇAR →</Link></article>
      <article className={styles.card}><span>DISPONÍVEL · REGISTERED</span><h2>Calisthenics Foundations</h2><p>4 semanas de força relativa, push/pull, pernas e controle corporal.</p><Link href="/login">ENTRAR E COMEÇAR →</Link></article>
      <article className={styles.card}><span>AMBER · SAFETY REVIEW</span><h2>HIIT Pathway</h2><p>12 sessões estruturadas, ainda inativas enquanto work-rest e intensidade passam pelo gate de segurança.</p></article>
    </section>
  </main>;
}