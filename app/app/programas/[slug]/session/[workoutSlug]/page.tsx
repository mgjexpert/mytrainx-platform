import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { completeRegisteredWorkout } from "../../../actions";
import styles from "@/components/start-program.module.css";

type ExerciseSpec={exercise_slug:string;sets:number;reps:string;optional?:boolean;fallback_slug?:string;progression_slug?:string};

export default async function RegisteredSessionPage({params}:{params:Promise<{slug:string;workoutSlug:string}>}){
  const {slug,workoutSlug}=await params;
  const session=await getSession(); if(!session?.userId)redirect("/login");
  const supabase=await createClient();
  const {data:program}=await supabase.from("programs").select("id,name,metadata").eq("slug",slug).eq("active",true).maybeSingle();
  if(!program)notFound();
  const programMeta =
    program.metadata && typeof program.metadata === "object" && !Array.isArray(program.metadata)
      ? (program.metadata as Record<string, unknown>)
      : {};
  if(programMeta.member_access!=="registered")notFound();
  const {data:enrollment}=await supabase.from("program_enrollments").select("id,status").eq("user_id",session.userId).eq("program_id",program.id).in("status",["active","completed"]).maybeSingle();
  if(!enrollment)redirect(`/app/programas/${slug}`);

  const {data:workout}=await supabase.from("workouts").select("id,number,slug,title,focus,metadata").eq("program_id",program.id).eq("slug",workoutSlug).eq("active",true).maybeSingle();
  if(!workout)notFound();
  const {data:all}=await supabase.from("workouts").select("number,slug").eq("program_id",program.id).eq("active",true).order("number");
  const idx=(all??[]).findIndex(w=>w.slug===workoutSlug); const next=idx>=0&&idx<(all??[]).length-1?(all??[])[idx+1]:null;

  const specs=((workout.metadata as any)?.exercise_sequence??[]) as ExerciseSpec[];
  const slugs=[...new Set(specs.flatMap(s=>[s.exercise_slug,s.fallback_slug,s.progression_slug].filter(Boolean) as string[]))];
  const {data:exerciseRows}=slugs.length?await supabase.from("exercises").select("slug,name,difficulty,equipment").in("slug",slugs).eq("status","published").eq("review_status","approved"):{data:[]};
  const names=new Map((exerciseRows??[]).map(e=>[e.slug,e]));
  const {data:state}=await supabase.from("workout_progress").select("completed_at").eq("user_id",session.userId).eq("workout_id",workout.id).maybeSingle();

  return <main className={styles.sessionPage}><div className={styles.sessionShell}>
    <div className={styles.top}><Link className={styles.back} href={`/app/programas/${slug}`}>← {String(program.name).toUpperCase()}</Link><span className={styles.access}>WEEK {(workout.metadata as any)?.week??"—"} · SESSION {workout.number}</span></div>
    <section className={styles.sessionHero}><span>STRUCTURED SESSION · {(workout.metadata as any)?.default_rir??"CONDITIONING"}</span><h1>{workout.title??workout.slug}</h1><p>{workout.focus??"Sessão estruturada MyTrainX."} Mantém a técnica como critério e usa regressões publicadas quando necessário.</p></section>
    <div className={styles.sectionHead}><div><span>SESSION PLAN</span><h2>Exercícios.</h2></div><p>Todos os movimentos apontam para a Enciclopédia canónica publicada.</p></div>
    <section className={styles.exerciseList}>{specs.map((spec,index)=>{const ex=names.get(spec.exercise_slug);return <article className={styles.exercise} key={spec.exercise_slug+index}><span>{String(index+1).padStart(2,"0")}</span><div><b>{ex?.name??spec.exercise_slug}</b><small>{spec.sets} séries · {spec.reps}{spec.optional?" · opcional":""}</small>{spec.fallback_slug?<small>Fallback: {names.get(spec.fallback_slug)?.name??spec.fallback_slug}</small>:null}{spec.progression_slug?<small>Progressão: {names.get(spec.progression_slug)?.name??spec.progression_slug}</small>:null}</div><Link href={`/library/${spec.exercise_slug}`}>VER GUIA →</Link></article>})}</section>
    <form action={completeRegisteredWorkout.bind(null,slug,workoutSlug,next?.slug??null)} className={styles.complete}><p>{state?.completed_at?"Esta sessão já está concluída. Podes gravar novamente se a repetiste.":"Quando terminares, grava a sessão para atualizar Progress e o estado do programa."}</p><button className={state?.completed_at?styles.done:""}>{state?.completed_at?"CONCLUÍDA ✓ · GUARDAR NOVAMENTE":next?"CONCLUIR E CONTINUAR →":"CONCLUIR PROGRAMA →"}</button></form>
  </div></main>;
}
