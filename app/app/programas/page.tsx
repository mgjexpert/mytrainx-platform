import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import styles from "@/components/member-section.module.css";

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

export default async function Page(){
  const supabase = await createClient();
  const { data } = await supabase
    .from("programs")
    .select("slug,name,description,metadata")
    .eq("active", true)
    .order("name");

  const programs = (data ?? []) as ProgramRow[];

  return <main className={styles.page}>
    <Link className={styles.back} href="/app">← COMMAND CENTER</Link>
    <section className={styles.head}>
      <span>MY PROGRAMS · {programs.length} ACTIVE</span>
      <h1>Escolhe o teu caminho.</h1>
      <p>O catálogo abaixo é lido diretamente do domínio ativo. WKT exige entitlement; programas MyTrainX registered podem ser iniciados pela conta.</p>
    </section>
    <section className={styles.grid}>
      {programs.map((program) => {
        const m = meta(program.metadata);
        const isWkt = program.slug === "wkt-militar";
        const isStart = program.slug === "mytrainx-start-4-weeks";
        const href = isWkt ? "/app/programas/wkt-militar" : isStart ? "/app/programas/mytrainx-start" : `/app/programas/${program.slug}`;
        const sessions = typeof m.sessions === "number" ? m.sessions : typeof m.sessions_planned === "number" ? m.sessions_planned : isWkt ? 21 : null;
        const weeks = typeof m.duration_weeks === "number" ? m.duration_weeks : null;
        return <article className={styles.card} key={program.slug}>
          <span>{isWkt ? "DISPONÍVEL · ENTITLEMENT" : "DISPONÍVEL · REGISTERED"}</span>
          <b>{program.name}</b>
          <small>{program.description}</small>
          {(sessions || weeks) ? <small>{sessions ? `${sessions} sessões` : ""}{sessions && weeks ? " · " : ""}{weeks ? `${weeks} semanas` : ""}</small> : null}
          <Link href={href}>{isWkt ? "ABRIR PROGRAMA →" : "COMEÇAR / CONTINUAR →"}</Link>
        </article>;
      })}
      <article className={styles.card}><span>AMBER · SAFETY REVIEW</span><b>HIIT Pathway</b><small>Não pode ser iniciado enquanto intensidade e work-rest não fecharem o gate de segurança.</small></article>
    </section>
  </main>;
}