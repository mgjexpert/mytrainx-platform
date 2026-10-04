import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import styles from "./programs.module.css";

type ProgramRow = {
  slug: string;
  name: string;
  description: string | null;
  metadata: unknown;
};

function meta(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function hrefFor(slug:string){
  if(slug==="wkt-militar") return "/app/programas/wkt-militar";
  if(slug==="mytrainx-start-4-weeks") return "/app/programas/mytrainx-start";
  return `/app/programas/${slug}`;
}

export default async function Page(){
  const supabase = await createClient();
  const { data } = await supabase
    .from("programs")
    .select("slug,name,description,metadata")
    .eq("active", true)
    .order("name");

  const programs = (data ?? []) as ProgramRow[];

  return (
    <main className={styles.page}>
      <div className={styles.top}><Link href="/app">← COMMAND CENTER</Link><span>{programs.length} PROGRAMAS ATIVOS</span></div>
      <section className={styles.hero}>
        <span>MYTRAINX PROGRAM ENGINE</span>
        <h1>ESCOLHE UM CAMINHO.<br/><em>E CONTINUA.</em></h1>
        <p>
          Cada programa combina sessões estruturadas, Exercise Encyclopedia, Progress e contexto
          para o Coach X. WKT usa entitlement; programas MyTrainX GREEN estão disponíveis à conta registada.
        </p>
      </section>

      <section className={styles.grid}>
        {programs.map((program,index) => {
          const m = meta(program.metadata);
          const isWkt = program.slug === "wkt-militar";
          const sessions = typeof m.sessions === "number"
            ? m.sessions
            : typeof m.sessions_planned === "number"
              ? m.sessions_planned
              : isWkt ? 21 : null;
          const weeks = typeof m.duration_weeks === "number" ? m.duration_weeks : null;
          const status = isWkt ? "ENTITLEMENT" : "REGISTERED";
          return (
            <Link href={hrefFor(program.slug)} className={`${styles.program} ${styles[`tone${index%4}`]}`} key={program.slug}>
              <div className={styles.pattern} aria-hidden="true"/>
              <div className={styles.programTop}><span>0{index+1}</span><b>{status}</b></div>
              <div className={styles.programMark}>{program.name.split(" ").map((word)=>word[0]).join("").slice(0,3).toUpperCase()}</div>
              <div className={styles.programBody}>
                <small>MYTRAINX PROGRAM</small>
                <h2>{program.name}</h2>
                <p>{program.description}</p>
                <div className={styles.meta}>
                  {sessions ? <span><b>{sessions}</b> sessões</span> : null}
                  {weeks ? <span><b>{weeks}</b> semanas</span> : null}
                  <span><b>Progress</b> integrado</span>
                </div>
                <strong>{isWkt ? "ABRIR PROGRAMA →" : "COMEÇAR / CONTINUAR →"}</strong>
              </div>
            </Link>
          );
        })}

        <article className={styles.amber}>
          <div><span>AMBER · SAFETY REVIEW</span><b>HIIT</b></div>
          <h2>HIIT Pathway</h2>
          <p>
            12 sessões já estruturadas com intensidade relativa e progressão conservadora.
            Continua invisível como programa ativo até fechar o specialist safety gate.
          </p>
          <div className={styles.amberMeta}><span>12 sessões</span><span>4 semanas</span><span>RPE ≤ 7/10</span></div>
          <small>NÃO PUBLICAMOS INTENSIDADE COMO “GREEN” SEM FECHAR O GATE.</small>
        </article>
      </section>
    </main>
  );
}
