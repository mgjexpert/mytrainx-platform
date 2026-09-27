import Link from "next/link";
import { getSession } from "@/lib/session";
import {
  getAgentCurrentProgram,
  getAgentTodayWorkout,
  getAgentProgressSummary,
} from "@/lib/domain/agent-tools";
import styles from "./trainer.module.css";

function label(value: unknown, fallback = "—") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

export default async function Trainer(){
  const session = await getSession();
  if (!session?.userId) return null;

  const [current, today, progress] = await Promise.all([
    getAgentCurrentProgram(session.userId),
    getAgentTodayWorkout(session.userId),
    getAgentProgressSummary(session.userId),
  ]);

  const programName = current?.program?.name ?? "Nenhum programa ativo";
  const workout = today.mode === "next_available" ? today.workout : null;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span>COACH X · PERSONAL AI TRAINER</span>
          <h1>CONTEXTO ANTES<br/>DA <em>RESPOSTA.</em></h1>
          <p>
            O Coach X já consegue consultar o teu programa, próxima sessão, Progress e conhecimento
            aprovado através das tools internas MyTrainX. A conversa persistente e o streaming continuam
            a pertencer ao Atendimento.Center — sem duplicar runtime dentro da plataforma.
          </p>
          <div className={styles.actions}>
            {workout ? <Link href={`/app/workout/${workout.slug}`}>ABRIR TREINO DE HOJE →</Link> : <Link href="/app/programas">ESCOLHER PROGRAMA →</Link>}
            <Link href="/app/performance" className={styles.secondary}>VER PROGRESS</Link>
          </div>
        </div>
        <div className={styles.xOrb}><span>X</span><small>CONTEXT ENGINE</small></div>
      </section>

      <section className={styles.contextGrid}>
        <article>
          <span>PROGRAMA ATUAL</span>
          <b>{programName}</b>
          <small>{current ? "Enrollment ativo e autorizado." : "Começa um programa para criar contexto de treino."}</small>
          <Link href="/app/programas">PROGRAMAS →</Link>
        </article>
        <article>
          <span>PRÓXIMA SESSÃO</span>
          <b>{workout ? label(workout.title, workout.code) : today.mode === "program_complete" ? "Programa concluído" : "Sem sessão ativa"}</b>
          <small>{workout?.focus ?? (today.mode === "program_complete" ? "Faz o check-in e escolhe o próximo caminho." : "O Coach X não inventa treino sem contexto.")}</small>
          {workout ? <Link href={`/app/workout/${workout.slug}`}>ABRIR SESSÃO →</Link> : <Link href="/app/programas">VER CAMINHOS →</Link>}
        </article>
        <article>
          <span>PROGRESSO DO PROGRAMA</span>
          <b>{progress.completion_percentage}%</b>
          <small>{progress.completed_workouts} de {progress.total_workouts} sessões concluídas.</small>
          <Link href="/app/performance">ABRIR PROGRESS →</Link>
        </article>
        <article>
          <span>KNOWLEDGE</span>
          <b>Library autorizada</b>
          <small>Pesquisa só conteúdo publicado, com direitos verificados e retrieval permitido.</small>
          <Link href="/app/library">ABRIR LIBRARY →</Link>
        </article>
      </section>

      <section className={styles.chatShell}>
        <div className={styles.chatTop}>
          <div><span className={styles.avatar}>X</span><div><b>Coach X</b><small>Atendimento.Center conversation layer</small></div></div>
          <span className={styles.state}>DOMAIN TOOLS · READY</span>
        </div>

        <div className={styles.messages}>
          <div className={styles.reply}>
            <span>CONTEXTO DISPONÍVEL AGORA</span>
            <strong>{workout ? `Próximo treino: ${label(workout.title, workout.code)}` : "Nenhum treino ativo para recomendar."}</strong>
            <p>
              {workout
                ? "A tool get_today_workout já devolve esta sessão usando a tua conta real. O próximo passo técnico é o Atendimento.Center consumir esta tool e devolver a resposta em streaming nesta mesma superfície."
                : "Sem programa ativo, o comportamento correto é orientar para um caminho disponível em vez de fabricar uma sessão."}
            </p>
          </div>

          <div className={styles.promptGrid}>
            <Link href={workout ? `/app/workout/${workout.slug}` : "/app/programas"}><span>01</span><b>Qual é o meu treino hoje?</b><small>Já resolvido por tool real.</small></Link>
            <Link href="/app/performance"><span>02</span><b>Como está o meu progresso?</b><small>Progress summary disponível.</small></Link>
            <Link href="/app/library"><span>03</span><b>Explica um exercício.</b><small>Exercise tool + Library.</small></Link>
            <Link href="/library"><span>04</span><b>Procura conteúdo para mim.</b><small>Knowledge search com gates.</small></Link>
          </div>
        </div>

        <div className={styles.composer}>
          <div><span>ASK COACH X</span><b>Streaming e memória entram pelo Atendimento.Center.</b></div>
          <button type="button" disabled>GATEWAY PENDENTE</button>
        </div>
      </section>

      <section className={styles.architecture}>
        <span>ARCHITECTURE RULE</span>
        <p>
          MyTrainX continua a ser a fonte de verdade de treino, Progress, conteúdo e entitlements.
          Atendimento.Center continua responsável por agentes, conversa, memória operacional e canais.
        </p>
      </section>
    </main>
  );
}
