import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import styles from "./master.module.css";

const features = [
  ["01","COACH X PRO","Contexto ampliado e futuras capacidades premium quando o runtime estiver operacional."],
  ["02","PREMIUM LIBRARY","Ebooks, guias, coleções e knowledge drops dentro do mesmo sistema editorial."],
  ["03","MASTER COMMUNITY","Ativações exclusivas sem misturar espaços sociais com conversas privadas."],
  ["04","LIVE & EVENTS","Masterclasses, sessões e experiências publicadas apenas quando confirmadas."],
  ["05","CHALLENGES","Desafios ligados a consistência e Progress real."],
  ["06","PROGRAM DROPS","Novas jornadas usando Exercise Engine, Progress, Library e Coach X."],
];

export default function MasterPage(){
  return (
    <main className={styles.page}>
      <PublicHeader/>
      <section className={styles.hero}>
        <div className={styles.crown}>♛</div>
        <div className={styles.heroCopy}>
          <span>MYTRAINX MASTER · PREMIUM LAYER</span>
          <h1>GO<br/><em>FURTHER.</em></h1>
          <p>
            Master é a camada premium recorrente do ecossistema. A arquitetura já está definida,
            mas benefícios só passam de roadmap para produto quando estiverem realmente operacionais.
          </p>
          <div className={styles.actions}><Link href="/login">ENTRAR NO MYTRAINX →</Link><Link href="/library">EXPLORAR LIBRARY</Link></div>
        </div>
        <div className={styles.masterMark}>MASTER<span>2026</span></div>
      </section>

      <section className={styles.grid}>
        {features.map(([n,title,text])=>(
          <article key={title}>
            <span>{n}</span><b>{title}</b><p>{text}</p><small>ROADMAP · VERIFIED BEFORE RELEASE</small>
          </article>
        ))}
      </section>

      <section className={styles.rule}>
        <span>PRODUCT RULE</span>
        <h2>PREMIUM NÃO SIGNIFICA PROMETER O QUE AINDA NÃO EXISTE.</h2>
        <p>Master cresce sobre componentes reais: Programs, Progress, Library, Community e Coach X. Cada camada entra quando produto, direitos, segurança e operação estiverem prontos.</p>
      </section>
    </main>
  );
}
