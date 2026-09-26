import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import styles from "@/components/public-sections.module.css";

export default function Page(){
  return (
    <main className={styles.page}>
      <PublicHeader/>
      <section className={styles.hero}>
        <div className={styles.heroMedia} style={{backgroundImage:'url("/media/v2/references/community-cover.png")'}}/>
        <div className={styles.heroContent}>
          <span className={styles.kicker}>MYTRAINX COMMUNITY</span>
          <h1>TRAIN · EVOLVE ·<br/><em>BELONG.</em></h1>
          <p>
            Comunidade é a camada humana do ecossistema: desafios, grupos, eventos, partilha e apoio.
            Cresce com participação real — sem métricas sociais inventadas.
          </p>
          <Link className={styles.cta} href="/login">ENTRAR NO ECOSSISTEMA →</Link>
        </div>
      </section>
      <section className={styles.grid}>
        <article className={styles.card}><span>01 · DESAFIOS</span><h2>Objetivos partilhados.</h2><p>Missões periódicas e experiências de consistência ligadas ao produto.</p></article>
        <article className={styles.card}><span>02 · GRUPOS</span><h2>Pertencer ajuda.</h2><p>Espaços por tema, programa e interesse sem misturar a conversa privada do Coach X.</p></article>
        <article className={styles.card}><span>03 · EVENTOS</span><h2>Digital e presencial.</h2><p>Lives, ativações e eventos entram quando existirem de facto no calendário MyTrainX.</p></article>
      </section>
    </main>
  );
}
