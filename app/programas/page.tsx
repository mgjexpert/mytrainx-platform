import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import styles from "@/components/public-sections.module.css";

const cover=driveThumbnailUrl(workouts[10].driveFileId,1600);

export default function ProgramsPage(){
  return (
    <main className={styles.page}>
      <PublicHeader/>
      <section className={styles.hero}>
        <div className={styles.heroMedia} style={{backgroundImage:`url("${cover}")`}}/>
        <div className={styles.heroContent}>
          <span className={styles.kicker}>STRUCTURED PROGRAMS</span>
          <h1>ESCOLHE O TEU<br/><em>CAMINHO.</em></h1>
          <p>
            Programas transformam conteúdo em jornada: sessões, progressão, recursos,
            check-ins e contexto para o Coach X. Só aparecem como ativos quando estão realmente prontos.
          </p>
        </div>
      </section>
      <section className={styles.grid}>
        <article className={styles.card}><span>DISPONÍVEL</span><h2>WKT Militar</h2><p>21 sessões guiadas e treino follow-along. Acesso dependente do entitlement.</p><Link href="/programas/wkt-militar">VER PROGRAMA →</Link></article>
        <article className={styles.card}><span>DISPONÍVEL · CONTA MYTRAINX</span><h2>MyTrainX Start</h2><p>12 sessões · 4 semanas · programa introdutório para adultos saudáveis que estão a começar ou regressar ao treino estruturado.</p><Link href="/login">ENTRAR E COMEÇAR →</Link></article>
        <article className={styles.card}><span>ROADMAP</span><h2>Core 21</h2><p>Core, estabilidade e progressão organizada a partir da Enciclopédia.</p></article>
        <article className={styles.card}><span>ROADMAP</span><h2>Calisthenics</h2><p>Fundamentos, força relativa e progressões de skills.</p></article>
        <article className={styles.card}><span>ROADMAP</span><h2>Home 30</h2><p>Treino em casa com versões por equipamento disponível.</p></article>
        <article className={styles.card}><span>ROADMAP</span><h2>HIIT Pathway</h2><p>Progressão de intensidade com versões beginner, intermediate e advanced.</p></article>
      </section>
    </main>
  );
}
