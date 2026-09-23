import Link from "next/link";

export default function CommandCenter() {
  return (
    <main className="appFrame">
      <aside className="sidebar">
        <Link className="brand" href="/">MYTRAIN<b>X</b></Link>
        <nav className="sidebarNav">
          <Link href="/app">⌂ Home</Link>
          <Link href="/app/trainer">◉ Trainer</Link>
          <Link href="/app/programas">⌁ Programs</Link>
          <Link href="/app/performance">▥ Performance</Link>
          <Link href="/app/library">▤ Library</Link>
          <Link href="/app/community">◎ Community</Link>
          <Link href="/app/master">♛ Master</Link>
        </nav>
      </aside>
      <section className="command">
        <div className="commandTop"><div><span className="heroLabel">PLAN • TRAIN • EVOLVE</span><h1>MyTrainX Command Center</h1></div><span>X • ONLINE</span></div>
        <div className="commandGrid">
          <article className="panel trainerPanel">
            <span className="heroLabel">AI TRAINER X • ONLINE</span>
            <h2>Your Personal<br/><span>AI Trainer</span></h2>
            <p>O núcleo do seu ecossistema de treino.</p>
            <div className="heroActions"><Link className="button" href="/app/trainer">Talk to X →</Link></div>
          </article>
          <article className="panel">
            <span className="heroLabel">YOUR PROGRESS</span>
            <div className="progressGrid">
              <div className="metric"><b>0</b><small>Day streak</small></div>
              <div className="metric"><b>0</b><small>Workouts</small></div>
              <div className="metric"><b>—</b><small>Readiness</small></div>
              <div className="metric"><b>1</b><small>Level</small></div>
            </div>
          </article>
        </div>
        <article className="panel trainingPanel"><span className="heroLabel">TODAY'S TRAINING</span><h2>WKT Militar • Mission 01 Alpha</h2><p>Peito, tríceps e perna</p><Link className="button" href="/programas/wkt-militar">Ver programa →</Link></article>
        <article className="panel programPanel"><span className="heroLabel">MY PROGRAMS</span><div className="cards"><div className="programCard active"><small>ACTIVE</small><b>WKT Militar</b></div><div className="programCard"><small>COMING SOON</small><b>HIIT Pro</b></div><div className="programCard"><small>COMING SOON</small><b>Core 30</b></div></div></article>
      </section>
    </main>
  );
}
