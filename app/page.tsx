import Link from "next/link";
import { MyTrainXLogo } from "@/components/MyTrainXLogo";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import styles from "./home.module.css";

const trainingImage = driveThumbnailUrl(workouts[0].driveFileId, 1600);

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logoLink}><MyTrainXLogo /></Link>
        <nav>
          <Link href="/trainer">AI Trainer</Link>
          <Link href="/programas">Programas</Link>
          <Link href="/master">Master</Link>
          <Link href="/community">Community</Link>
        </nav>
        <div className={styles.headerActions}>
          <Link href="/login" className={styles.login}>Entrar</Link>
          <Link href="/login" className={styles.ctaSmall}>Começar →</Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>AI-POWERED TRAINING SYSTEM</span>
          <h1>YOUR PERSONAL<br/><em>AI TRAINER.</em></h1>
          <p>Treino, orientação e progresso dentro de um único ecossistema. O MyTrainX conhece os seus programas e acompanha a sua evolução.</p>
          <div className={styles.heroActions}>
            <Link href="/login" className={styles.primary}>TALK TO X <b>→</b></Link>
            <Link href="/programas" className={styles.secondary}>EXPLORAR PROGRAMAS</Link>
          </div>
          <div className={styles.heroSignals}>
            <span><i/> AI TRAINER ONLINE</span>
            <span>PROGRAMAS ESTRUTURADOS</span>
            <span>PERFORMANCE</span>
          </div>
        </div>
        <div className={styles.heroVisual} style={{backgroundImage:`url("${trainingImage}")`}}>
          <div className={styles.heroShade}/>
          <div className={styles.aiBadge}><span>●</span> X ONLINE</div>
          <div className={styles.heroOverlay}>
            <small>MYTRAINX INTELLIGENCE</small>
            <strong>PLAN.<br/>TRAIN.<br/><em>EVOLVE.</em></strong>
          </div>
        </div>
      </section>

      <section className={styles.systemStrip}>
        <article><span>01</span><b>AI TRAINER</b><small>Contexto pessoal e orientação diária</small></article>
        <article><span>02</span><b>PROGRAMS</b><small>Treinos estruturados e objetivos claros</small></article>
        <article><span>03</span><b>PERFORMANCE</b><small>Progresso, consistência e evolução</small></article>
        <article><span>04</span><b>MASTER</b><small>Comunidade, conteúdos e experiências</small></article>
      </section>

      <section className={styles.aiSection}>
        <div className={styles.sectionCopy}>
          <span className={styles.kicker}>MEET X</span>
          <h2>UM PERSONAL QUE<br/><em>CONHECE O SEU TREINO.</em></h2>
          <p>O X foi desenhado para entender o programa que você possui, o treino do dia, o seu histórico e suas preferências — sem substituir profissionais de saúde.</p>
          <ul>
            <li>Explica a missão de hoje</li>
            <li>Organiza sua rotina</li>
            <li>Resume seu progresso</li>
            <li>Encontra conteúdo dentro do MyTrainX</li>
          </ul>
          <Link href="/trainer" className={styles.textCta}>CONHECER O AI TRAINER →</Link>
        </div>
        <div className={styles.chatMock}>
          <div className={styles.chatTop}><b>X</b><span><i/> ONLINE</span></div>
          <div className={styles.bubbleX}>Hoje é sua Missão Alpha. Quer começar o treino completo ou tem pouco tempo?</div>
          <div className={styles.bubbleUser}>Tenho 30 minutos. O que faço?</div>
          <div className={styles.bubbleX}>Posso te orientar dentro do seu programa e ajustar a sessão ao tempo disponível.</div>
          <div className={styles.chatInput}>ASK X ANYTHING <span>→</span></div>
        </div>
      </section>

      <section className={styles.programSection}>
        <div className={styles.sectionHeader}>
          <div><span className={styles.kicker}>MY PROGRAMS</span><h2>ESCOLHA SEU CAMINHO.</h2></div>
          <Link href="/programas">VER TODOS →</Link>
        </div>
        <div className={styles.programGrid}>
          <Link href="/programas/wkt-militar" className={styles.programActive} style={{backgroundImage:`url("${trainingImage}")`}}>
            <div className={styles.programShade}/>
            <span>ATIVO</span>
            <div><small>12 SEMANAS • 21 TREINOS</small><b>WKT<br/><em>MILITAR</em></b><p>Disciplina. Foco. Execução.</p></div>
          </Link>
          <article><span>EM BREVE</span><b>HIIT<br/>PRO</b><p>Intensidade máxima.</p></article>
          <article><span>EM BREVE</span><b>CORE<br/><em>30</em></b><p>Força e estabilidade.</p></article>
          <article><span>EM BREVE</span><b>CALISTHENICS</b><p>Domine o próprio corpo.</p></article>
        </div>
      </section>

      <section className={styles.master}>
        <div><span className={styles.gold}>MYTRAINX MASTER</span><h2>GO FURTHER.</h2><p>AI Trainer Pro, comunidade, eventos, e-books, desafios, bônus e novos drops.</p></div>
        <Link href="/master" className={styles.masterCta}>CONHECER MASTER →</Link>
      </section>

      <footer className={styles.footer}>
        <MyTrainXLogo />
        <span>MORE THAN WORKOUTS. A STRONGER YOU.</span>
        <div><Link href="/login">LOGIN</Link><Link href="/programas">PROGRAMAS</Link></div>
      </footer>
    </main>
  );
}
