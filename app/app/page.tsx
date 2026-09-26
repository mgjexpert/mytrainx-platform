import Link from "next/link";
import { getSession } from "@/lib/session";
import { getProgressDashboard } from "@/lib/progress";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import { MyTrainXLogo } from "@/components/MyTrainXLogo";
import styles from "./command.module.css";

function number(value: number | null, suffix = "") {
  return value === null ? "—" : `${value.toFixed(1)}${suffix}`;
}

export default async function CommandCenter() {
  const session = await getSession();
  const progress = session?.userId ? await getProgressDashboard(session.userId) : null;
  const current = workouts[0];
  const image = driveThumbnailUrl(current.driveFileId, 1400);
  const show = (metric: string) => progress?.dashboardMetrics.includes(metric) ?? false;

  const checkin = progress?.latestCheckin;
  const completion =
    checkin?.planned && checkin.planned > 0 && checkin.completed !== null
      ? `${checkin.completed}/${checkin.planned}`
      : "—";

  const metrics = [
    {
      icon: "▣",
      value: String(progress?.workouts28d ?? 0),
      label: "Treinos / 28 dias",
      note: "sessões concluídas",
    },
    show("weight")
      ? {
          icon: "↕",
          value: number(progress?.latestWeight ?? null, " kg"),
          label: "Peso",
          note: progress?.weightTrendDelta === null || progress?.weightTrendDelta === undefined
            ? "tendência ainda insuficiente"
            : "comparação por média",
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
          label: "Check-ins visuais",
          note: "privados",
        }
      : show("waist")
        ? {
            icon: "↔",
            value: number(progress?.latestWaist ?? null, " cm"),
            label: "Cintura",
            note: "medição padronizada",
          }
        : {
            icon: "◎",
            value: String(progress?.activeGoals ?? 0),
            label: "Metas ativas",
            note: "direções atuais",
          },
  ];

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/app" className={styles.sidebarLogo}><MyTrainXLogo /></Link>
        <nav>
          <Link className={styles.active} href="/app">⌂ <span>Home</span></Link>
          <Link href="/app/trainer">▣ <span>Trainer</span></Link>
          <Link href="/app/programas">◫ <span>Programs</span></Link>
          <Link href="/app/performance">▥ <span>Performance</span></Link>
          <Link href="/app/library">▤ <span>Library</span></Link>
          <Link href="/app/community">◎ <span>Community</span></Link>
          <Link href="/app/master">♛ <span>Master</span></Link>
          <Link href="/app/profile">♙ <span>Profile</span></Link>
        </nav>
        <div className={styles.upgrade}>
          <small>GO FURTHER WITH</small>
          <b>MYTRAINX <em>MASTER</em></b>
          <p>Conteúdo, comunidade e experiências premium em preparação.</p>
          <Link href="/app/master">EXPLORAR →</Link>
        </div>
      </aside>

      <section className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.search}>⌕ <span>Pesquisar treinos, conteúdos e programas...</span></div>
          <div className={styles.user}>
            <span className={styles.bell}>◦</span>
            <span className={styles.avatar}>X</span>
            <div><b>{session?.name || "Member"}</b><small>MyTrainX Member</small></div>
          </div>
        </header>

        <div className={styles.title}>
          <div><h1>MyTrainX Command Center</h1><span>PLAN · TRAIN · EVOLVE · WITHOUT LIMITS</span></div>
        </div>

        <div className={styles.topGrid}>
          <article className={styles.aiHero} style={{backgroundImage:`url("${image}")`}}>
            <div className={styles.aiShade}/>
            <div className={styles.aiContent}>
              <span className={styles.online}>COACH X · PERSONAL AI TRAINER</span>
              <h2>Contexto para o teu<br/><em>próximo passo.</em></h2>
              <p>Treino, Progress, programas e conhecimento autorizado reunidos numa única experiência.</p>
              <div><Link href="/app/trainer">FALAR COM X →</Link><Link href="/app/trainer" className={styles.ask}>FAZER UMA PERGUNTA</Link></div>
            </div>
          </article>

          <article className={styles.progress}>
            <div className={styles.panelTitle}>
              <div><b>O TEU PROGRESS</b><small>Dados reais · configuráveis</small></div>
              <Link href="/app/performance">ABRIR →</Link>
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
            <div className={styles.progressQuote}>DADOS → CONTEXTO → <b>PRÓXIMA AÇÃO.</b></div>
          </article>
        </div>

        <div className={styles.midGrid}>
          <article className={styles.today}>
            <div className={styles.panelTitle}>
              <div><b>SESSÃO EM DESTAQUE</b><small>WKT Militar · catálogo verificado.</small></div>
              <span>21 SESSÕES</span>
            </div>
            <div className={styles.todayCard} style={{backgroundImage:`url("${image}")`}}>
              <div className={styles.todayShade}/>
              <div className={styles.todayContent}>
                <small>WKT MILITAR · PREVIEW</small>
                <h3>Mission 01 — {current.code}</h3>
                <p>{current.focus}</p>
                <div className={styles.tags}><span>◷ Sessão guiada</span><span>◉ Acesso por entitlement</span></div>
                <Link href="/app/programas/wkt-militar">VER PROGRAMA →</Link>
              </div>
            </div>
          </article>

          <article className={styles.programs}>
            <div className={styles.panelTitle}><div><b>PROGRAMAS</b><small>Escolhe o teu caminho.</small></div><Link href="/app/programas">VER TODOS →</Link></div>
            <div className={styles.programCards}>
              <Link href="/app/programas/wkt-militar" className={styles.programActive} style={{backgroundImage:`url("${image}")`}}>
                <i>DISPONÍVEL</i><b>WKT<br/><em>MILITAR</em></b><small>21 sessões guiadas</small>
              </Link>
              <div><i>EM VALIDAÇÃO</i><b>MYTRAINX<br/><em>START</em></b><small>12 sessões · 4 semanas</small></div>
              <div><i>EM PREPARAÇÃO</i><b>CORE<br/><em>21</em></b><small>Core & estabilidade</small></div>
              <div><i>EM PREPARAÇÃO</i><b>CALISTHENICS</b><small>Domínio corporal</small></div>
            </div>
          </article>
        </div>

        <div className={styles.bottomGrid}>
          <article className={styles.master}>
            <div className={styles.panelTitle}><div><b>♛ MYTRAINX MASTER</b><small>O nível premium do ecossistema.</small></div><Link href="/app/master">EXPLORAR →</Link></div>
            <div className={styles.masterFeatures}>
              {["Coach X","Community","Eventos","E-books","Desafios","Programas"].map((item)=><div key={item}><span>◆</span><b>{item}</b></div>)}
            </div>
          </article>
          <article className={styles.library}>
            <div className={styles.panelTitle}><div><b>LIBRARY & KNOWLEDGE</b><small>Conhecimento que vira ação.</small></div><Link href="/app/library">ABRIR →</Link></div>
            <div className={styles.libraryGrid}>
              {[
                ["Treino de Força","REVISÃO"],
                ["Nutrição sem Ruído","REVISÃO"],
                ["Progress sem Ruído","REVISÃO"],
                ["Recovery sem Ruído","REVISÃO"],
              ].map(([item,status])=><div key={item}><span>▤</span><b>{item}<small>{status}</small></b></div>)}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
