import Link from "next/link";
import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { enrollMyTrainXStart } from "./actions";
import styles from "@/components/start-program.module.css";

type WorkoutRow={id:string;number:number;slug:string;title:string|null;focus:string|null;metadata:Record<string,unknown>};

export default async function MyTrainXStartPage(){
  const session=await getSession(); if(!session?.userId)return null;
  const supabase=await createClient();
  const {data:program}=await supabase.from("programs").select("id,name,description,metadata").eq("slug","mytrainx-start-4-weeks").eq("active",true).maybeSingle();
  if(!program)return <main className={styles.page}><div className={styles.shell}>Programa indisponível.</div></main>;
  const [{data:workouts},{data:enrollment}]=await Promise.all([
    supabase.from("workouts").select("id,number,slug,title,focus,metadata").eq("program_id",program.id).eq("active",true).order("number"),
    supabase.from("program_enrollments").select("id,status,started_at,completed_at").eq("user_id",session.userId).eq("program_id",program.id).maybeSingle()
  ]);
  const rows=(workouts??[]) as WorkoutRow[];
  const ids=rows.map(w=>w.id);
  const {data:progress}=ids.length?await supabase.from("workout_progress").select("workout_id,completed_at").eq("user_id",session.userId).in("workout_id",ids):{data:[]};
  const completed=new Set((progress??[]).filter(p=>p.completed_at).map(p=>p.workout_id));
  const done=completed.size; const pct=rows.length?Math.round(done/rows.length*100):0;
  return <main className={styles.page}><div className={styles.shell}>
    <div className={styles.top}><Link className={styles.back} href="/app/programas">← PROGRAMAS</Link><span className={styles.access}>● REGISTERED PROGRAM</span></div>
    <section className={styles.hero}><div className={styles.heroCopy}><span>MYTRAINX START · 4 WEEKS</span><h1>COMEÇA SIMPLES.<br/><em>EVOLUI COM CONTEXTO.</em></h1><p>12 sessões full-body para adultos saudáveis que estão a começar ou regressar ao treino estruturado. Técnica, consistência e a menor progressão útil vêm antes de complexidade.</p><div className={styles.signals}><span>4 semanas</span><span>3 sessões/semana</span><span>2–4 RIR</span><span>versão mínima disponível</span></div>{!enrollment||enrollment.status==="cancelled"?<form action={enrollMyTrainXStart}><button className={styles.action}>COMEÇAR PROGRAMA →</button></form>:null}</div>
    <aside className={styles.progress}><span>PROGRESSO DO PROGRAMA</span><strong>{pct}%</strong><small>{done} de {rows.length} sessões concluídas</small><div className={styles.bar}><i style={{width:`${pct}%`}}/></div><div className={styles.progressGrid}><div><b>{enrollment?.status??"não iniciado"}</b><span>estado</span></div><div><b>{rows.length}</b><span>sessões</span></div></div></aside></section>
    <div className={styles.sectionHead}><div><span>4-WEEK PATH</span><h2>As 12 sessões.</h2></div><p>O programa repete padrões para que a progressão venha de execução, consistência e pequenos ajustes — não de trocar tudo semanalmente.</p></div>
    <section className={styles.grid}>{rows.map(w=>{const meta=w.metadata||{};const week=String((meta as any).week??"—");const isDone=completed.has(w.id);return <Link href={enrollment?`/app/programas/mytrainx-start/session/${w.slug}`:"#"} className={`${styles.session} ${isDone?styles.done:""}`} key={w.id}><div className={styles.sessionTop}><span>WEEK {week} · SESSION {String(w.number).padStart(2,"0")}</span>{isDone?<b>✓ DONE</b>:null}</div><h3>{w.title??w.slug}</h3><p>{w.focus??"Full-body structured session"}</p><small>{String((meta as any).progression_rule??"structured progression").replaceAll("_"," ")}</small><em>{enrollment?"ABRIR SESSÃO →":"COMEÇA O PROGRAMA PARA ABRIR"}</em></Link>})}</section>
  </div></main>;
}
