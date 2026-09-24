import Link from "next/link";
import { drivePreviewUrl, getWorkout, workouts } from "@/lib/workouts";
import { notFound } from "next/navigation";

export default async function WorkoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workout = getWorkout(slug);
  if (!workout) notFound();

  const index = workouts.findIndex((item) => item.slug === workout.slug);
  const previous = index > 0 ? workouts[index - 1] : null;
  const next = index < workouts.length - 1 ? workouts[index + 1] : null;

  return (
    <main className="playerPage">
      <header className="playerNav">
        <Link className="brand brandStack" href="/app/programas/wkt-militar"><span>← WKT MILITAR</span><b>MISSÕES</b></Link>
        <div className="playerMissionTitle"><small>MISSÃO {String(workout.id).padStart(2, "0")} · {index + 1}/{workouts.length}</small><b>{workout.code.toUpperCase()}</b></div>
      </header>

      <div className="playerGrid">
        <section className="playerMain">
          <div className="videoFrame">
            <iframe src={drivePreviewUrl(workout.driveFileId)} allow="autoplay; fullscreen" allowFullScreen title={`Treino ${workout.id} ${workout.code}`}/>
          </div>
          <div className="playerFooterBar">
            <p><b>Faça junto.</b> Ajuste o ritmo aos seus limites.</p>
            <div className="playerNavActions">
              {previous ? <Link className="button ghost compactButton" href={`/app/workout/${previous.slug}`}>← Anterior</Link> : <span/>}
              {next ? <Link className="button compactButton" href={`/app/workout/${next.slug}`}>Próxima →</Link> : <Link className="button compactButton" href="/app/programas/wkt-militar">Ver catálogo ✓</Link>}
            </div>
          </div>
        </section>

        <aside className="workoutInfo">
          <span className="eyebrow">MISSÃO {String(workout.id).padStart(2, "0")}</span>
          <h1>{workout.code}</h1>
          <p>{workout.focus}</p>
          <div className="missionMeta verticalMeta"><span>◷ Sessão guiada</span><span>♙ Faça no seu ritmo</span><span>▣ Player MyTrainX</span></div>
          <hr/>
          <div className="workoutSteps">
            <div className="check done"><span>✓</span><b>Prepare-se</b><small>Espaço, água e equipamento necessário</small></div>
            <div className="check"><span>○</span><b>Acompanhe o vídeo</b><small>Pause ou adapte quando necessário</small></div>
            <div className="check"><span>○</span><b>Finalize com segurança</b><small>Interrompa diante de dor ou mal-estar</small></div>
          </div>
          {next ? <Link className="button full finishButton" href={`/app/workout/${next.slug}`}>Concluir esta sessão e avançar →</Link> : <Link className="button full finishButton" href="/app/programas/wkt-militar">Finalizar e voltar ao catálogo ✓</Link>}
          <small className="providerNote">A navegação avança para a próxima missão, mas a persistência de conclusão/progresso ainda não está ligada ao perfil. Vídeo reproduzido a partir do Google Drive.</small>
        </aside>
      </div>
    </main>
  );
}
