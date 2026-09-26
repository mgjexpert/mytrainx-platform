import Link from "next/link";
import styles from "@/components/member-section.module.css";

export default function Trainer(){
  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/app">← COMMAND CENTER</Link>
      <section className={styles.head}>
        <span>COACH X · PERSONAL AI TRAINER</span>
        <h1>Contexto antes da resposta.</h1>
        <p>
          A interface do Coach X já faz parte do produto. A próxima camada continua a ligar
          ferramentas, memória operacional e conhecimento aprovado para que cada resposta use
          apenas contexto autorizado do membro e do ecossistema MyTrainX.
        </p>
      </section>
      <section className={styles.chat}>
        <div className={styles.chatTop}><b>X</b><span>CONVERSATION LAYER · ACTIVE</span></div>
        <div className={styles.bubble}>Olá. Posso ajudar a navegar no teu treino, Programas, Progress e Library.</div>
        <div className={styles.bubble+" "+styles.bubbleUser}>Tenho pouco tempo hoje. O que faço?</div>
        <div className={styles.bubble}>
          A lógica MyTrainX é preservar o objetivo e reduzir a versão, não abandonar o programa.
          Quando a toolchain completa estiver ligada, esta resposta usa automaticamente o teu
          treino, check-in e entitlement reais.
        </div>
        <div className={styles.input}>ASK COACH X · A integração contextual continua em evolução.</div>
      </section>
    </main>
  );
}
