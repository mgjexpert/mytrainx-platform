import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { createClient } from "@/lib/supabase/server";
import { programMedia } from "@/lib/media-catalog";
import styles from "@/components/public-sections.module.css";

type ProgramRow = {
  slug: string;
  name: string;
  description: string | null;
  metadata: unknown;
};

function metadata(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export default async function ProgramsPage(){
  const supabase = await createClient();
  const { data } = await supabase
    .from("programs")
    .select("slug,name,description,metadata")
    .eq("active", true)
    .order("name");

  const programs = (data ?? []) as ProgramRow[];
  const wkt = programs.find((program) => program.slug === "wkt-militar");
  const registered = programs.filter((program) => program.slug !== "wkt-militar");

  return <main className={styles.page}>
    <PublicHeader/>
    <section className={styles.hero}>
      <div className={styles.heroMedia} style={{backgroundImage:`url("${programMedia("wkt-militar",1600)}")`}}/>
      <div className={styles.heroContent}>
        <span className={styles.kicker}>STRUCTURED PROGRAMS · {programs.length} ACTIVE</span>
        <h1>ESCOLHE O TEU<br/><em>CAMINHO.</em></h1>
        <p>Programas transformam conteúdo em jornada: sessões, progressão, recursos, check-ins e contexto para o Coach X. O catálogo abaixo vem do domínio ativo MyTrainX.</p>
        <Link className={styles.cta} href="/login">ENTRAR NO MYTRAINX →</Link>
      </div>
    </section>
    <section className={styles.grid}>
      {wkt ? <article className={styles.card} style={{backgroundImage:`linear-gradient(#090d10b8,#090d10f2),url("${programMedia(wkt.slug,900)}")`,backgroundSize:"cover"}}>
        <span>DISPONÍVEL · ENTITLEMENT</span><h2>{wkt.name}</h2><p>{wkt.description}</p><Link href="/programas/wkt-militar">VER PROGRAMA →</Link>
      </article> : null}
      {registered.map((program) => {
        const meta = metadata(program.metadata);
        const weeks = typeof meta.duration_weeks === "number" ? `${meta.duration_weeks} semanas` : null;
        const sessions = typeof meta.sessions === "number" ? `${meta.sessions} sessões` : typeof meta.sessions_planned === "number" ? `${meta.sessions_planned} sessões` : null;
        return <article className={styles.card} key={program.slug} style={{backgroundImage:`linear-gradient(#090d10cb,#090d10f4),url("${programMedia(program.slug,900)}")`,backgroundSize:"cover"}}>
          <span>DISPONÍVEL · REGISTERED</span>
          <h2>{program.name}</h2>
          <p>{program.description}</p>
          <small>{[sessions,weeks].filter(Boolean).join(" · ")}</small>
          <Link href="/login">ENTRAR E COMEÇAR →</Link>
        </article>;
      })}
      <article className={styles.card}><span>AMBER · SAFETY REVIEW</span><h2>HIIT Pathway</h2><p>Estrutura preparada, mas intensidade e work-rest continuam bloqueados pelo gate de segurança.</p></article>
    </section>
  </main>;
}