import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import styles from "@/components/public-sections.module.css";

export default function TrainerPage(){
  return <main className={styles.page}><PublicHeader/><section className={styles.hero}><span className={styles.kicker}>MYTRAINX AI · COACH X</span><h1>YOUR PERSONAL<br/><em>AI TRAINER.</em></h1><p>O X é a inteligência de treino central do MyTrainX. A integração completa com programas, progresso e contexto autorizado está em desenvolvimento.</p><Link className={styles.cta} href="/login">ENTRAR NO MYTRAINX →</Link></section><section className={styles.grid}><article className={styles.card}><span>01</span><h2>CONTEXTO REAL</h2><p>Consulta programas, progresso, missão do dia e conteúdos que você realmente possui.</p></article><article className={styles.card}><span>02</span><h2>ROTINA</h2><p>Ajuda a organizar a semana, entender o treino e manter consistência sem substituir profissionais de saúde.</p></article><article className={styles.card}><span>03</span><h2>MASTER</h2><p>Uso ampliado, conteúdos premium, comunidade e futuros recursos pelo WhatsApp.</p></article></section></main>
}
