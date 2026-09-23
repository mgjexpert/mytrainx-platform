import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="landingHeader">
        <div className="shell">
          <Link className="brand" href="/">MYTRAIN<b>X</b></Link>
          <nav>
            <Link href="/trainer">AI Trainer</Link>
            <Link href="/programas">Programas</Link>
            <Link href="/app">Entrar</Link>
            <Link className="button" href="/trainer">Falar com X →</Link>
          </nav>
        </div>
      </header>

      <section className="hero shell">
        <div>
          <span className="heroLabel">AI-POWERED TRAINING ECOSYSTEM</span>
          <h1>Seu Personal<br/><em>Trainer IA.</em><br/>Todos os dias.</h1>
          <p>Treino, programas estruturados, progresso e conteúdos premium num único ecossistema. O MyTrainX AI entende o seu contexto e ajuda você a seguir em frente.</p>
          <div className="heroActions">
            <Link className="button" href="/trainer">Falar com X →</Link>
            <Link className="button ghost" href="/programas">Explorar programas</Link>
          </div>
        </div>
        <div className="aiCard">
          <div className="aiGlow"/>
          <span className="aiOnline">● X ONLINE</span>
          <h2>Your Personal<br/>AI Trainer</h2>
          <p>Contexto, orientação e acesso aos seus programas em um só lugar.</p>
          <div className="aiPrompt">“Tenho 30 minutos hoje. Qual é a minha melhor missão?”</div>
        </div>
      </section>
    </main>
  );
}
