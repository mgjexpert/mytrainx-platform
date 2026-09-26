import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { completeStartWorkout } from "../../actions";
import styles from "@/components/start-program.module.css";

type ExerciseSpec={exercise_slug:string;sets:number;reps:string;optional?:boolean;fallback_slug?:string;progression_slug?:string};

export default async function StartSessionPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const session=await getSession(); if(!session?.userId)redirect("/login");
  const supabase=await createClient();
  const {data:program}=await supabase.from("programs").select("id").eq("slug","mytrainx-start-4-weeks").eq("active",true).maybeSingle(); if(!program)notFound();
  const {data:enrollment}=await supabase.from("program_enrollments").select("id,status").eq("user_id",session.userId).eq("program_id",program.id).in("status",["active","completed"]).maybeSingle(); if(!enrollment)redirect("/app/programas/mytrainx-start");
  const {data:workout}=await supabase.from("workouts").select("id,number,slug,title,focus,metadata").eq("program_id",program.id).eq("slug",slug).eq("active",true).maybeSingle(); if(!workout)notFound();
  const {data:all}=await supabase.from("workouts").select("number,slug").eq("program_id",program.id).eq("active",true).order("number");
  const idx=(all??[]).findIndex(w=>w.slug===slug); const next=idx>=0&&idx<(all??[]).length-1?(all??[])[idx+1]:null;
  const specs=((workout.metadata as any)?.exercise_sequence??[]) as ExerciseSpec[]; const slugs=[...new Set(specs.flatMap(s=>[s.exercise_slug,s.fallback_slug,s.progression_slug].filter(Boolean) as string[]))];
  const {data:exerciseRows}=slugs.length?await supabase.from("exercises").select("slug,name,difficulty,equipment").in("slug",slugs).eq("status","published").eq("review_status","approved"):{data:[]};
  const names=new Map((exerciseRows??[]).map(e=>[e.slug,e]));
  const {data:state}=await supabase.from("workout_progress").select("completed_at").eq("user_id",session.userId).eq("workout_id",workout.id).maybeSingle();
  return <main className={styles.sessionPage}><div className={styles.sessionShell}><div className={styles.top}><Link className={styles.back} href="/app/programas/mytrainx-start">← MYTRAINX START</Link><span className={styles.access}>WEEK {(workout.metadata as any)?.week??"—"} · SESSION {workout.number}</span></div>
    <section className={styles.sessionHero}><span>FULL BODY · {(workout.metadata as any)?.default_rir??"2-4"} RIR</span><h1>{workout.title??workout.slug}</h1><p>{workout.focus??"Sessão estruturada MyTrainX Start."} Se o tempo estiver apertado, usa a versão mínima descrita no programa em vez de abandonar a sessão.</p></section>
    <div className={styles.sectionHead}><div><span>SESSION PLAN</span><h2>Exercícios.</h2></div><p>Todas as variações abaixo apontam para a Enciclopédia canónica aprovada.</p></div>
    <section className={styles.exerciseList}>{specs.map((spec,index)=>{const ex=names.get(spec.exercise_slug);return <article className={styles.exercise} key={spec.exercise_slug+index}><span>0{index+1}</span><div><b>{ex?.name??spec.exercise_slug}</b><small>{spec.sets} séries · {spec.reps}{spec.optional?" · opcional":""}</small>{spec.fallback_slug?<small>Fallback: {names.get(spec.fallback_slug)?.name??spec.fallback_slug}</small>:null}{spec.progression_slug?<small>Progressão: {names.get(spec.progression_slug)?.name??spec.progression_slug}</small>:null}</div><Link href={`/library/${spec.exercise_slug}`}>VER GUIA →</Link></article>})}</section>
    <form action={completeStartWorkout.bind(null,slug,next?.slug??null)} className={styles.complete}><p>{state?.completed_at?"Esta sessão já está marcada como concluída. Podes guardar novamente se repetiste a sessão.":"Quando terminares, grava a sessão. Isto alimenta o teu Progress e o contexto do Coach X."}</p><button className={state?.completed_at?styles.done:""}>{state?.completed_at?"CONCLUÍDA ✓ · GUARDAR NOVAMENTE":next?"CONCLUIR E CONTINUAR →":"CONCLUIR PROGRAMA →"}</button></form>
  </div></main>;
}
