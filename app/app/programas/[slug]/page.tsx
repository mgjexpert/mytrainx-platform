import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { enrollRegisteredProgram } from "../actions";
import styles from "@/components/start-program.module.css";

type WorkoutRow={id:string;number:number;slug:string;title:string|null;focus:string|null;metadata:Record<string,unknown>};

export default async function RegisteredProgramPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  if(["wkt-militar","mytrainx-start"].includes(slug)) notFound();
  const session=await getSession(); if(!session?.userId)return null;
  const supabase=await createClient();
  const {data:program}=await supabase.from("programs").select("id,slug,name,description,metadata").eq("slug",slug).eq("active",true).maybeSingle();
  if(!program) notFound();
  const programMeta =
    program.metadata && typeof program.metadata === "object" && !Array.isArray(program.metadata)
      ? (program.metadata as Record<string, unknown>)
      : {};
  if(programMeta.member_access!=="registered") notFound();

  const [{data:workouts},{data:enrollment}]=await Promise.all([
    supabase.from("workouts").select("id,number,slug,title,focus,metadata").eq("program_id",program.id).eq("active",true).order("number"),
    supabase.from("program_enrollments").select("id,status,started_at,completed_at").eq("user_id",session.userId).eq("program_id",program.id).maybeSingle()
  ]);
  const rows=(workouts??[]) as WorkoutRow[];
  const ids=rows.map(w=>w.id);
  const {data:progress}=ids.length?await supabase.from("workout_progress").select("workout_id,completed_at").eq("user_id",session.userId).in("workout_id",ids):{data:[]};
  const completed=new Set((progress??[]).filter(p=>p.completed_at).map(p=>p.workout_id));
  const done=completed.size; const pct=rows.length?Math.round(done/rows.length*100):0;
  const weeks=Number(programMeta.duration_weeks??Math.ceil(rows.length/3));
  const firstPending=rows.find(w=>!completed.has(w.id))??rows[0];

  return <main className={styles.page}><div className={styles.shell}>
    <div className={styles.top}><Link className={styles.back} href="/app/programas">← PROGRAMAS</Link><span className={styles.access}>● REGISTERED PROGRAM</span></div>
    <section className={styles.hero}><div className={styles.heroCopy}><span>MYTRAINX · {String(program.name).toUpperCase()}</span><h1>{program.name}<br/><em>{weeks} SEMANAS.</em></h1><p>{program.description}</p><div className={styles.signals}><span>{weeks} semanas</span><span>{rows.length} sessões</span><span>3 sessões/semana</span><span>Progress integrado</span></div>{!enrollment||enrollment.status==="cancelled"?<form action={enrollRegisteredProgram.bind(null,slug)}><button className={styles.action}>COMEÇAR PROGRAMA →</button></form>:firstPending?<Link className={styles.action} href={`/app/programas/${slug}/session/${firstPending.slug}`}>CONTINUAR PROGRAMA →</Link>:null}</div>
    <aside className={styles.progress}><span>PROGRESSO DO PROGRAMA</span><strong>{pct}%</strong><small>{done} de {rows.length} sessões concluídas</small><div className={styles.bar}><i style={{width:`${pct}%`}}/></div><div className={styles.progressGrid}><div><b>{enrollment?.status??"não iniciado"}</b><span>estado</span></div><div><b>{rows.length}</b><span>sessões</span></div></div></aside></section>
    <div className={styles.sectionHead}><div><span>PROGRAM PATH</span><h2>As sessões.</h2></div><p>A progressão usa exercícios canónicos publicados. A conclusão alimenta o teu Progress e o contexto disponível para o Coach X.</p></div>
    <section className={styles.grid}>{rows.map(w=>{const week=String((w.metadata as any)?.week??"—");const isDone=completed.has(w.id);return <Link href={enrollment?`/app/programas/${slug}/session/${w.slug}`:"#"} className={`${styles.session} ${isDone?styles.done:""}`} key={w.id}><div className={styles.sessionTop}><span>WEEK {week} · SESSION {String(w.number).padStart(2,"0")}</span>{isDone?<b>✓ DONE</b>:null}</div><h3>{w.title??w.slug}</h3><p>{w.focus??"Structured MyTrainX session"}</p><small>{String((w.metadata as any)?.progression_rule??"structured progression").replaceAll("_"," ")}</small><em>{enrollment?"ABRIR SESSÃO →":"COMEÇA O PROGRAMA PARA ABRIR"}</em></Link>})}</section>
  </div></main>;
}
