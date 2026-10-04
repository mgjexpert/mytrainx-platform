import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import styles from "@/components/public-sections.module.css";

export default function TrainerPage(){
  return (
    <main className={styles.page}>
      <PublicHeader/>
      <section className={styles.hero}>
        <div className={`${styles.heroMedia} ${styles.coachAbstract}`}><div className={styles.coachOrb}>X</div><div className={styles.coachGrid}/></div>
        <div className={styles.heroContent}>
          <span className={styles.kicker}>MYTRAINX AI · COACH X</span>
          <h1>CONHECE O TEU<br/><em>PRÓXIMO PASSO.</em></h1>
          <p>
            Coach X é a camada de inteligência central do MyTrainX. A experiência liga conversa,
            Programas, Progress e conhecimento aprovado; a toolchain contextual continua a ser expandida
            sem fingir dados que o utilizador não forneceu.
          </p>
          <Link className={styles.cta} href="/login">ENTRAR NO MYTRAINX →</Link>
        </div>
      </section>
      <section className={styles.grid}>
        <article className={styles.card}><span>01 · CONTEXTO</span><h2>Não é um chatbot solto.</h2><p>O objetivo é responder com programa, treino, Progress e conteúdos que estejam autorizados para aquele membro.</p></article>
        <article className={styles.card}><span>02 · KNOWLEDGE</span><h2>Conhecimento com gates.</h2><p>A Library e a Knowledge Base distinguem conteúdo publicável, evidência, referência privada e revisão pendente.</p></article>
        <article className={styles.card}><span>03 · AÇÃO</span><h2>Menos ruído. Próximo passo.</h2><p>Adaptar tempo, explicar progressão e ajudar a manter consistência sem transformar IA em diagnóstico clínico.</p></article>
      </section>
    </main>
  );
}
