import Link from "next/link";
import styles from "@/components/member-section.module.css";

export default function Page(){
  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/app">← COMMAND CENTER</Link>
      <section className={styles.head}>
        <span>PROGRAMS</span>
        <h1>Escolhe o teu caminho.</h1>
        <p>
          Programas estruturados reutilizam exercícios, Progress, Library e Coach X.
          O estado apresentado abaixo é o estado real de produto — sem programas ficticiamente ativos.
        </p>
      </section>
      <section className={styles.grid}>
        <article className={styles.card}><span>DISPONÍVEL</span><b>WKT Militar</b><small>21 sessões guiadas · acesso dependente do entitlement.</small><Link href="/app/programas/wkt-militar">ABRIR PROGRAMA →</Link></article>
        <article className={styles.card}><span>DISPONÍVEL · REGISTERED</span><b>MyTrainX Start</b><small>12 sessões · 4 semanas · programa introdutório com enrollment e Progress reais.</small><Link href="/app/programas/mytrainx-start">ABRIR PROGRAMA →</Link></article>
        <article className={styles.card}><span>EM PREPARAÇÃO</span><b>Core 21</b><small>Core, estabilidade e progressão organizada.</small></article>
        <article className={styles.card}><span>EM PREPARAÇÃO</span><b>Calisthenics</b><small>Fundamentos, força relativa e progressões de skills.</small></article>
        <article className={styles.card}><span>ROADMAP</span><b>HIIT Pathway</b><small>Do beginner ao avançado com progressão de intensidade.</small></article>
        <article className={styles.card}><span>ROADMAP</span><b>Home 30</b><small>Treino em casa com versões por equipamento disponível.</small></article>
      </section>
    </main>
  );
}
