import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import styles from "@/components/public-sections.module.css";

export default function MasterPage(){
  return (
    <main className={styles.page}>
      <PublicHeader/>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.kicker}>MYTRAINX MASTER · PREMIUM LAYER</span>
          <h1>GO<br/><em>FURTHER.</em></h1>
          <p>
            Master é a camada premium do ecossistema MyTrainX. O produto ainda está em preparação:
            os benefícios abaixo representam a arquitetura aprovada, não uma promessa de features
            já ativas.
          </p>
          <Link className={styles.cta} href="/login">ENTRAR NO MYTRAINX →</Link>
        </div>
      </section>
      <section className={styles.grid}>
        <article className={styles.card}><span>01 · COACH X</span><h2>AI Trainer Pro</h2><p>Maior profundidade de contexto e futuras capacidades premium, liberadas apenas quando a integração estiver pronta.</p></article>
        <article className={styles.card}><span>02 · CONTENT</span><h2>Knowledge Drops</h2><p>Ebooks, guias, programas e coleções premium dentro da mesma Library e sistema de direitos.</p></article>
        <article className={styles.card}><span>03 · COMMUNITY</span><h2>Master Community</h2><p>Espaços e ativações exclusivas sem misturar conversas privadas do Coach X com canais sociais.</p></article>
        <article className={styles.card}><span>04 · EVENTS</span><h2>Live & In Person</h2><p>Lives, masterclasses e experiências entram no calendário apenas quando realmente confirmadas.</p></article>
        <article className={styles.card}><span>05 · CHALLENGES</span><h2>Desafios</h2><p>Desafios periódicos ligados a Progress e consistência, sem gamificação fictícia.</p></article>
        <article className={styles.card}><span>06 · PROGRAMS</span><h2>Programas premium</h2><p>Novas jornadas podem usar o mesmo Exercise Engine, Progress, Library e Coach X.</p></article>
      </section>
    </main>
  );
}
