import Link from "next/link";
import { getSession } from "@/lib/session";
import { getProgressDashboard } from "@/lib/progress";
import { getUnifiedLibraryItems } from "@/lib/library-live";
import { workouts } from "@/lib/workouts";
import { mediaFor } from "@/lib/media-catalog";
import { getAgentTodayWorkout } from "@/lib/domain/agent-tools";
import styles from "./command.module.css";

function number(value: number | null, suffix = "") {
  return value === null ? "—" : `${value.toFixed(1)}${suffix}`;
}

export default async function CommandCenter() {
  const session = await getSession();
  const [progress, library, todayContext] = await Promise.all([
    session?.userId ? getProgressDashboard(session.userId) : Promise.resolve(null),
    getUnifiedLibraryItems(),
    session?.userId
      ? getAgentTodayWorkout(session.userId)
      : Promise.resolve({ mode: "no_active_program" as const, program: null, workout: null }),
  ]);

  const show = (metric: string) => progress?.dashboardMetrics.includes(metric) ?? false;
  const checkin = progress?.latestCheckin;
  const completion =
    checkin?.planned && checkin.planned > 0 && checkin.completed !== null
      ? `${checkin.completed}/${checkin.planned}`
      : "—";

  const counts = {
    articles: library.filter((item) => item.type === "article").length,
    exercises: library.filter((item) => item.type === "exercise").length,
    recipes: library.filter((item) => item.type === "recipe").length,
  };

  const activeProgram = todayContext.program;
  const nextWorkout = todayContext.mode === "next_available" ? todayContext.workout : null;
  const isWktToday = activeProgram?.slug === "wkt-militar";
  const todayImage = isWktToday ? mediaFor("programWkt", 1400) : null;
  const todayHref =
    !activeProgram
      ? "/app/programas"
      : todayContext.mode === "program_complete"
        ? "/app/performance"
        : activeProgram.slug === "wkt-militar"
          ? `/app/workout/${nextWorkout?.slug}`
          : activeProgram.slug === "mytrainx-start-4-weeks"
            ? `/app/programas/mytrainx-start/session/${nextWorkout?.slug}`
            : `/app/programas/${activeProgram.slug}/session/${nextWorkout?.slug}`;
  const todayTitle =
    todayContext.mode === "program_complete"
      ? "PROGRAMA CONCLUÍDO"
      : nextWorkout?.title || nextWorkout?.code || "ESCOLHE O TEU CAMINHO";
  const todaySubtitle = activeProgram?.name ?? "Nenhum programa ativo";
  const todayFocus =
    todayContext.mode === "program_complete"
      ? "O próximo passo é rever o Progress e escolher a próxima jornada."
      : nextWorkout?.focus ?? "Escolhe um programa ativo para criar um próximo treino real.";
  const programCards = [
    ["WKT", "MILITAR", "ENTITLEMENT", "21 sessões guiadas", "/app/programas/wkt-militar", mediaFor("programWkt", 900)],
    ["MYTRAINX", "START", "REGISTERED", "12 sessões · 4 semanas", "/app/programas/mytrainx-start", null],
    ["CORE", "21", "REGISTERED", "21 sessões · 7 semanas", "/app/programas/core-21", null],
    ["HOME", "30", "REGISTERED", "12 sessões · 30 dias", "/app/programas/home-30", null],
    ["CALISTHENICS", "", "REGISTERED", "12 sessões · 4 semanas", "/app/programas/calisthenics-foundations", null],
  ] as const;

  const metrics = [
    {
      icon: "🔥",
      value: String(progress?.workouts28d ?? 0),
      label: "Treinos / 28 dias",
      note: "sessões concluídas",
    },
    show("weight")
      ? {
          icon: "↕",
          value: number(progress?.latestWeight ?? null, " kg"),
          label: "Peso",
          note: progress?.weightTrendDelta == null ? "tendência insuficiente" : "comparação por média",
        }
      : {
          icon: "◎",
          value: String(progress?.activeGoals ?? 0),
          label: "Metas ativas",
          note: "definidas por ti",
        },
    show("checkin")
      ? {
          icon: "◌",
          value: completion,
          label: "Check-in semanal",
          note: checkin ? "planeado / concluído" : "ainda sem check-in",
        }
      : {
          icon: "◎",
          value: String(progress?.activeGoals ?? 0),
          label: "Metas ativas",
          note: "direções atuais",
        },
    show("photos")
      ? {
          icon: "▥",
          value: String(progress?.photoSets ?? 0),
          label: "Fotos",
          note: "sets privados",
        }
      : show("waist")
        ? {
            icon: "↔",
            value: number(progress?.latestWaist ?? null, " cm"),
            label: "Cintura",
            note: "medição padronizada",
          }
        : {
            icon: "✦",
            value: String(library.length),
            label: "Library",
            note: "conteúdos públicos",
          },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.dashboard}>
        <div className={styles.titleRow}>
          <div>
            <span>COMMAND CENTER</span>
            <h1>O teu sistema de evolução.</h1>
          </div>
          <div className={styles.titleMeta}>
            <b>{library.length}</b><small>conteúdos públicos</small>
            <b>{workouts.length}</b><small>sessões WKT verificadas</small>
          </div>
        </div>

        <div className={styles.topGrid}>
          <article className={`${styles.coachHero} ${styles.coachAbstract}`}>
            <div className={styles.coachShade}/><div className={styles.coachOrb} aria-hidden="true">X</div><div className={styles.coachGrid} aria-hidden="true"/>
            <div className={styles.coachContent}>
              <span>COACH X · PERSONAL AI TRAINER</span>
              <h2>COACH <em>X</em></h2>
              <strong>Treino inteligente. Evolução real.</strong>
              <p>
                Programas, Progress e conhecimento autorizado reunidos numa experiência
                construída para orientar o próximo passo sem parecer um chatbot genérico.
              </p>
              <div className={styles.coachActions}>
                <Link href="/app/trainer">FALAR COM O COACH X →</Link>
                <Link href="/app/hoje" className={styles.secondary}>VER O TEU DIA</Link>
              </div>
              <div className={styles.coachSignals}>
                <span>✦ Contexto do membro</span>
                <span>◎ Knowledge Base</span>
                <span>↗ Progress</span>
              </div>
            </div>
            <div className={styles.coachScript}>MAIS DISCIPLINA.<br/>MAIS EVOLUÇÃO.<br/><em>O TEU X.</em></div>
          </article>

          <article className={styles.progress}>
            <div className={styles.panelTitle}>
              <div><b>O TEU PROGRESSO</b><small>Últimos dados autorizados</small></div>
              <Link href="/app/performance">VER PROGRESS →</Link>
            </div>
            <div className={styles.metrics}>
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <span>{metric.icon}</span>
                  <b>{metric.value}</b>
                  <small>{metric.label}</small>
                  <em>{metric.note}</em>
                </div>
              ))}
            </div>
            <div className={styles.trendPanel}>
              <div>
                <small>A TUA EVOLUÇÃO CONTINUA</small>
                <b>Dado → contexto → próxima ação.</b>
              </div>
              <div className={styles.spark} aria-hidden="true">
                <i/><i/><i/><i/><i/><i/><i/><i/>
              </div>
            </div>
          </article>
        </div>

        <div className={styles.midGrid}>
          <article className={styles.today}>
            <div className={styles.panelTitle}>
              <div><b>O TEU PRÓXIMO TREINO</b><small>{todaySubtitle}</small></div>
              <span>{todayContext.mode === "program_complete" ? "CONCLUÍDO" : nextWorkout ? `SESSÃO ${String(nextWorkout.number).padStart(2,"0")}` : "SEM PROGRAMA"}</span>
            </div>
            <div
              className={`${styles.todayCard} ${!todayImage ? styles.todayAbstract : ""}`}
              style={todayImage ? {backgroundImage:`url("${todayImage}")`} : undefined}
            >
              <div className={styles.todayShade}/>
              <div className={styles.todayContent}>
                <span>{activeProgram ? activeProgram.name.toUpperCase() : "MYTRAINX PROGRAM ENGINE"}</span>
                <h3>{todayTitle}</h3>
                <p>{todayFocus}</p>
                <div className={styles.todayMeta}>
                  <small>◷ Contexto real da conta</small>
                  <small>▣ Progress integrado</small>
                </div>
                <Link href={todayHref}>{todayContext.mode === "program_complete" ? "VER PROGRESS →" : nextWorkout ? "ABRIR SESSÃO →" : "ESCOLHER PROGRAMA →"}</Link>
              </div>
              <ul className={styles.exercisePreview}>
                <li>Programa ativo</li>
                <li>Próxima sessão</li>
                <li>Progress</li>
                <li>Coach X context</li>
              </ul>
            </div>
          </article>

          <article className={styles.programs}>
            <div className={styles.panelTitle}>
              <div><b>PROGRAMAS DISPONÍVEIS</b><small>Ativos e validados no catálogo atual</small></div>
              <Link href="/app/programas">VER TODOS →</Link>
            </div>
            <div className={styles.programCards}>
              {programCards.map(([a,b,status,description,href,image]) => (
                <Link
                  key={a+b}
                  href={href}
                  className={`${styles.programCard} ${!image ? styles.programAbstract : ""}`}
                  style={image ? {backgroundImage:`url("${image}")`} : undefined}
                >
                  <div className={styles.programShade}/>
                  <i>{status}</i>
                  <strong>{a}<br/><em>{b}</em></strong>
                  <small>{description}</small>
                  <span>→</span>
                </Link>
              ))}
            </div>
          </article>
        </div>

        <div className={styles.lowerGrid}>
          <article className={styles.results}>
            <div className={styles.panelTitle}>
              <div><b>OS TEUS RESULTADOS</b><small>Acompanhe tendências, não ruído.</small></div>
              <Link href="/app/performance">VER MAIS →</Link>
            </div>
            <div className={styles.resultCards}>
              <div><span>MASSA MUSCULAR</span><b>{show("composition") ? number(progress?.latestMuscleMass ?? null," kg") : "Opcional"}</b><small>mesmo método para comparar</small></div>
              <div><span>PESO</span><b>{show("weight") ? number(progress?.latestWeight ?? null," kg") : "Opcional"}</b><small>tendência por média</small></div>
              <div><span>TREINOS</span><b>{progress?.workouts28d ?? 0}</b><small>últimos 28 dias</small></div>
              <div><span>CHECK-INS VISUAIS</span><b>{show("photos") ? progress?.photoSets ?? 0 : "Opcional"}</b><small>privados</small></div>
            </div>
          </article>

          <article className={styles.library}>
            <div className={styles.panelTitle}>
              <div><b>BIBLIOTECA & RECURSOS</b><small>Conhecimento que vira ação.</small></div>
              <Link href="/app/library">VER LIBRARY →</Link>
            </div>
            <div className={styles.libraryGrid}>
              <Link href="/library"><span>EXERCISE</span><b>{counts.exercises}</b><strong>Enciclopédia</strong><small>movimentos publicados</small></Link>
              <Link href="/library"><span>KITCHEN</span><b>{counts.recipes}</b><strong>Receitas</strong><small>conteúdo estruturado</small></Link>
              <Link href="/library"><span>LEARN</span><b>{counts.articles}</b><strong>Guias 2026</strong><small>educação prática</small></Link>
              <Link href="/app/library"><span>EBOOKS</span><b>4</b><strong>Knowledge Core</strong><small>em revisão final</small></Link>
            </div>
          </article>
        </div>

        <article className={styles.master}>
          <div className={styles.masterBrand}>♛ <b>MyTrainX <em>MASTER</em></b></div>
          <p>Conteúdos exclusivos, comunidade privada, eventos, desafios, guias e programas premium.</p>
          <div className={styles.masterFeatures}>
            {["Conteúdos","Comunidade","Eventos","Desafios","Guias","Programas"].map((item)=><span key={item}>◇ {item}</span>)}
          </div>
          <Link href="/app/master">EXPLORAR MYTRAINX MASTER →</Link>
        </article>
      </section>
    </main>
  );
}
