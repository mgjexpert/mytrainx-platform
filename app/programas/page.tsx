import Link from "next/link";

export default function ProgramsPage() {
  return (
    <main className="simplePage">
      <header className="landingHeader"><div className="shell"><Link className="brand" href="/">MYTRAIN<b>X</b></Link><nav><Link href="/trainer">AI Trainer</Link><Link className="button" href="/app">Entrar</Link></nav></div></header>
      <section className="simpleHero shell">
        <span className="heroLabel">MYTRAINX PROGRAMS</span>
        <h1>Escolha seu caminho.</h1>
        <div className="cards">
          <Link className="programCard active" href="/programas/wkt-militar"><small>ATIVO</small><b>WKT Militar</b><small>21 treinos • 12 semanas</small></Link>
          <div className="programCard"><small>EM BREVE</small><b>HIIT Pro</b></div>
          <div className="programCard"><small>EM BREVE</small><b>Core 30</b></div>
        </div>
      </section>
    </main>
  );
}
