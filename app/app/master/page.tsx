import Link from "next/link";
import styles from "./master.module.css";

const roadmap=[
  ["COACH X PRO","Contexto ampliado e capacidades premium quando o runtime estiver integrado.","/app/trainer","USAR COACH X ATUAL →"],
  ["PREMIUM LIBRARY","Collections e entitlements já têm foundation; catálogo premium entra por gates.","/app/library","ABRIR LIBRARY →"],
  ["MASTER COMMUNITY","Grupos, desafios e ativações exclusivas.","/app/community","VER COMMUNITY →"],
  ["LIVE EVENTS","Lives, masterclasses e experiências quando houver calendário real.","/events","VER EVENTS →"],
  ["CHALLENGES","Desafios ligados a consistência e Progress real.","/app/performance","VER PROGRESS →"],
  ["PROGRAM DROPS","Core, Calisthenics, Home e futuros programas premium.","/app/programas","VER PROGRAMAS →"],
];

export default function Page(){
  return (
    <main className={styles.page}>
      <div className={styles.top}><Link href="/app">← COMMAND CENTER</Link><span>♛ MASTER · ROADMAP</span></div>
      <section className={styles.hero}>
        <div><span>MYTRAINX MASTER</span><h1>VAI MAIS<br/><em>LONGE.</em></h1><p>A futura camada premium cresce em cima do que já funciona. Nada aqui bloqueia WKT, Programas GREEN, Progress ou Library atuais.</p></div>
        <strong>♛</strong>
      </section>
      <section className={styles.grid}>
        {roadmap.map(([title,copy,href,cta],index)=>(
          <Link href={href} key={title} className={styles.card}>
            <span>0{index+1}</span><b>{title}</b><p>{copy}</p><small>{cta}</small>
          </Link>
        ))}
      </section>
      <section className={styles.notice}><span>MASTER STATUS</span><b>ROADMAP, NÃO PAYWALL FICTÍCIO.</b><p>Quando uma capacidade premium estiver pronta, entitlement, preço e acesso passam a ser apresentados como dados reais.</p></section>
    </main>
  );
}
