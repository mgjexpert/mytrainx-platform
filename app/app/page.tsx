import Link from "next/link";
import { getSession } from "@/lib/session";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import { MyTrainXLogo } from "@/components/MyTrainXLogo";
import styles from "./command.module.css";

export default async function CommandCenter() {
  const session = await getSession();
  const current = workouts[0];
  const image = driveThumbnailUrl(current.driveFileId, 1400);

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
          <p>AI Pro, community, content and exclusive experiences.</p>
          <Link href="/app/master">UPGRADE →</Link>
        </div>
      </aside>

      <section className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.search}>⌕ <span>Search workouts, content, programs...</span></div>
          <div className={styles.user}>
            <span className={styles.bell}>◦</span>
            <span className={styles.avatar}>X</span>
            <div><b>{session?.name || "Member"}</b><small>Level 1</small></div>
          </div>
        </header>

        <div className={styles.title}>
          <div><h1>MyTrainX Command Center</h1><span>PLAN · TRAIN · EVOLVE · WITHOUT LIMITS</span></div>
        </div>

        <div className={styles.topGrid}>
          <article className={styles.aiHero} style={{backgroundImage:`url("${image}")`}}>
            <div className={styles.aiShade}/>
            <div className={styles.aiContent}>
              <span className={styles.online}>● AI TRAINER X &nbsp; ONLINE</span>
              <h2>Your Personal<br/><em>AI Trainer</em></h2>
              <p>Training context, instant guidance and your MyTrainX ecosystem in one conversation.</p>
              <div><Link href="/app/trainer">TALK TO X →</Link><Link href="/app/trainer" className={styles.ask}>ASK A QUESTION</Link></div>
            </div>
          </article>

          <article className={styles.progress}>
            <div className={styles.panelTitle}><b>YOUR PROGRESS</b><small>Last 30 days</small></div>
            <div className={styles.metrics}>
              <div><span>🔥</span><b>0</b><small>Day Streak</small></div>
              <div><span>▣</span><b>0</b><small>Workouts</small></div>
              <div><span className={styles.ring}>0%</span><small>Readiness</small></div>
              <div><span>▥</span><b>1</b><small>Level</small></div>
            </div>
            <div className={styles.progressQuote}>BETTER HABITS.<br/><b>BIGGER VERSIONS OF YOU.</b></div>
          </article>
        </div>

        <div className={styles.midGrid}>
          <article className={styles.today}>
            <div className={styles.panelTitle}><div><b>TODAY'S TRAINING</b><small>Your mission for today.</small></div><span>WEEK 1 · DAY 1</span></div>
            <div className={styles.todayCard} style={{backgroundImage:`url("${image}")`}}>
              <div className={styles.todayShade}/>
              <div className={styles.todayContent}>
                <small>WKT MILITAR</small>
                <h3>Mission 01 — {current.code}</h3>
                <p>{current.focus}</p>
                <div className={styles.tags}><span>◷ Guided session</span><span>◉ Adaptable</span></div>
                <Link href={`/app/workout/${current.slug}`}>START WORKOUT →</Link>
              </div>
            </div>
          </article>

          <article className={styles.programs}>
            <div className={styles.panelTitle}><div><b>MY PROGRAMS</b><small>Choose your path.</small></div><Link href="/app/programas">VIEW ALL →</Link></div>
            <div className={styles.programCards}>
              <Link href="/app/programas/wkt-militar" className={styles.programActive} style={{backgroundImage:`url("${image}")`}}><i>ACTIVE</i><b>WKT<br/><em>MILITAR</em></b><small>12 weeks · 21 sessions</small></Link>
              <div><i>COMING SOON</i><b>HIIT<br/>PRO</b><small>Maximum intensity</small></div>
              <div><i>LOCKED</i><b>CORE<br/><em>30</em></b><small>Stronger core</small></div>
              <div><i>LOCKED</i><b>CALISTHENICS</b><small>Bodyweight mastery</small></div>
            </div>
          </article>
        </div>

        <div className={styles.bottomGrid}>
          <article className={styles.master}>
            <div className={styles.panelTitle}><div><b>♛ MYTRAINX MASTER</b><small>Exclusive tools, content and community.</small></div><Link href="/app/master">BECOME A MASTER →</Link></div>
            <div className={styles.masterFeatures}>
              {["AI Trainer Pro","Community","Live Events","E-books","Challenges","Bonuses"].map((item)=><div key={item}><span>◆</span><b>{item}</b></div>)}
            </div>
          </article>
          <article className={styles.library}>
            <div className={styles.panelTitle}><div><b>LIBRARY & RESOURCES</b><small>Knowledge fuels progress.</small></div><Link href="/app/library">VIEW LIBRARY →</Link></div>
            <div className={styles.libraryGrid}>
              {["Nutrition Guide","Training Manual","Recovery Guide","Mindset Playbook"].map((item)=><div key={item}><span>▤</span><b>{item}</b></div>)}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
