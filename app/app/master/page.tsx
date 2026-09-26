import Link from "next/link";
import styles from "@/components/member-section.module.css";

export default function Page(){
  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/app">← COMMAND CENTER</Link>
      <section className={styles.head}>
        <span>MYTRAINX MASTER · ROADMAP</span>
        <h1>Vai mais longe.</h1>
        <p>
          Master é a futura camada premium recorrente. Esta página mostra o roadmap real,
          sem bloquear WKT, MyTrainX Start, Progress ou Library que a tua conta já pode usar.
        </p>
      </section>
      <section className={styles.grid}>
        <article className={styles.card}><span>EM PREPARAÇÃO</span><b>Coach X Pro</b><small>Contexto ampliado e capacidades premium quando o runtime estiver integrado.</small><Link href="/app/trainer">USAR COACH X ATUAL →</Link></article>
        <article className={styles.card}><span>FOUNDATION READY</span><b>Premium Library</b><small>Arquitetura de entitlement e collections já existe; catálogo premium será publicado por gates.</small><Link href="/app/library">ABRIR LIBRARY →</Link></article>
        <article className={styles.card}><span>ROADMAP</span><b>Master Community</b><small>Grupos, desafios e ativações exclusivas.</small><Link href="/app/community">VER COMMUNITY →</Link></article>
        <article className={styles.card}><span>ROADMAP</span><b>Live Events</b><small>Lives, masterclasses e experiências presenciais confirmadas no futuro.</small><Link href="/events">VER EVENTS →</Link></article>
        <article className={styles.card}><span>ROADMAP</span><b>Challenges</b><small>Desafios ligados a consistência e Progress real.</small></article>
        <article className={styles.card}><span>ROADMAP</span><b>Program Drops</b><small>Core, Calisthenics, Home e HIIT entram após produção e revisão.</small><Link href="/app/programas">VER PROGRAMAS →</Link></article>
      </section>
    </main>
  );
}
