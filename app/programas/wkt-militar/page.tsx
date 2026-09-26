import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import styles from "./wkt-public.module.css";

const hero=driveThumbnailUrl(workouts[0].driveFileId,1800);

export default function WktProgramPage(){
  return <main className={styles.page}>
    <PublicHeader/>
    <section className={styles.hero}>
      <div className={styles.copy}><span>WKT MILITAR · 21 FOLLOW-ALONG SESSIONS</span><h1>ABRE A MISSÃO.<br/>DÁ PLAY.<br/><em>FAZ JUNTO.</em></h1><p>Um programa de treino guiado dentro do MyTrainX para reduzir a fricção entre decidir treinar e realmente começar. Cada missão tem vídeo próprio e o teu progresso fica associado à conta quando tens acesso.</p><div className={styles.actions}><Link className={styles.primary} href="/programas/wkt-militar/oferta">VER ACESSO →</Link><Link className={styles.secondary} href="/login">JÁ SOU MEMBRO</Link></div><div className={styles.facts}><div><b>{workouts.length}</b><small>sessões guiadas</small></div><div><b>5</b><small>famílias de missão</small></div><div><b>REAL</b><small>tracking na conta</small></div></div></div>
      <div className={styles.visual} style={{backgroundImage:`url("${hero}")`}}><div className={styles.shade}/><div className={styles.mission}><span>MISSÃO 01</span><b>ALPHA</b></div><div className={styles.quote}>DISCIPLINA HOJE.<em>RESULTADOS SEMPRE.</em></div></div>
    </section>
    <section className={styles.strip}><article><span>▶</span><div><b>Treino em vídeo</b><small>Acompanha a sessão do início ao fim.</small></div></article><article><span>▣</span><div><b>Área MyTrainX</b><small>Catálogo e player na mesma conta.</small></div></article><article><span>✓</span><div><b>Conclusão real</b><small>Missões concluídas gravadas no Progress.</small></div></article><article><span>✦</span><div><b>Contexto Coach X</b><small>O estado pode alimentar a próxima sessão.</small></div></article></section>
    <section className={styles.method}><div><span>O MÉTODO</span><h2>MENOS DECISÃO.<br/><em>MAIS EXECUÇÃO.</em></h2><p>O WKT não é uma pasta infinita de vídeos. É uma sequência fechada de sessões. O utilizador entra, escolhe ou continua a missão pendente e executa.</p></div><div className={styles.flow}>{[["01","ENTRA","Acede com a conta e entitlement WKT."],["02","ABRE","Escolhe ou continua a próxima missão."],["03","TREINA","Segue o vídeo dentro do player."],["04","GRAVA","Conclui e atualiza o teu estado real."]].map(([n,t,d])=><div key={n}><span>{n}</span><b>{t}</b><small>{d}</small></div>)}</div></section>
    <section className={styles.catalog}><div className={styles.sectionHead}><div><span>MISSION CATALOG</span><h2>21 sessões reais.</h2></div><p>Estas são as mesmas sessões usadas na área autenticada — sem cards fictícios ou resultados inventados.</p></div><div className={styles.grid}>{workouts.slice(0,10).map(w=><article className={styles.card} style={{backgroundImage:`url("${driveThumbnailUrl(w.driveFileId,800)}")`}} key={w.id}><div className={styles.cardShade}/><span>MISSÃO {String(w.id).padStart(2,"0")}</span><b>{w.code}</b><small>{w.focus}</small><em>WKT MILITAR</em></article>)}</div></section>
    <section className={styles.families}>{[["ALPHA","Base","Entrada e variação de grupos musculares."],["BRAVO","Ritmo","Combinações e continuidade."],["CHARLIE","Controle","Execução e consistência."],["DELTA","Força","Sessões com foco de força."],["ECHO","Variedade","Mais combinações no catálogo."]].map(([a,b,p])=><article key={a}><span>{a}</span><b>{b}</b><p>{p}</p></article>)}</section>
    <section className={styles.cta}><div><span>WKT MILITAR · MYTRAINX</span><h2>PRONTO PARA A PRIMEIRA MISSÃO?</h2><p>Consulta a oferta atual e o checkout MyTrainX. O preço e a disponibilidade comercial são controlados pelo produto ativo.</p></div><Link href="/programas/wkt-militar/oferta">VER OFERTA ATUAL →</Link></section>
  </main>;
}
