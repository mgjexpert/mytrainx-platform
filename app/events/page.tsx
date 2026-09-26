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
          <span className={styles.kicker}>MYTRAINX EVENTS · ROADMAP</span>
          <h1>TRAIN<br/><em>TOGETHER.</em></h1>
          <p>
            Lives, masterclasses e experiências presenciais fazem parte do desenho do ecossistema.
            Neste momento não mostramos datas ou vagas fictícias: o calendário público só receberá
            eventos realmente confirmados.
          </p>
          <Link className={styles.cta} href="/community">EXPLORAR COMMUNITY →</Link>
        </div>
      </section>
      <section className={styles.grid}>
        <article className={styles.card}><span>01 · LIVE WORKOUT</span><h2>Sessões online</h2><p>Treinos ao vivo poderão complementar programas e desafios quando o calendário for lançado.</p></article>
        <article className={styles.card}><span>02 · MASTERCLASS</span><h2>Aprender com contexto</h2><p>Sessões temáticas de treino, recuperação e hábitos com especialistas apropriados.</p></article>
        <article className={styles.card}><span>03 · Q&A</span><h2>Perguntas reais</h2><p>Espaços para esclarecer dúvidas sem transformar orientação geral em consulta clínica.</p></article>
        <article className={styles.card}><span>04 · COMMUNITY</span><h2>Desafios coletivos</h2><p>Ativações ligadas à comunidade e ao Progress quando houver produto e moderação definidos.</p></article>
        <article className={styles.card}><span>05 · IN PERSON</span><h2>Experiências presenciais</h2><p>Encontros locais apenas quando local, equipa e operação estiverem confirmados.</p></article>
        <article className={styles.card}><span>06 · CALENDAR</span><h2>Sem eventos fictícios.</h2><p>Esta área muda de roadmap para calendário real assim que houver a primeira data confirmada.</p></article>
      </section>
    </main>
  );
}
