import Link from "next/link";

export default function TrainerPage() {
  return (
    <main className="simplePage">
      <header className="landingHeader"><div className="shell"><Link className="brand" href="/">MYTRAIN<b>X</b></Link><nav><Link href="/programas">Programas</Link><Link className="button" href="/app">Abrir app</Link></nav></div></header>
      <section className="simpleHero shell">
        <span className="heroLabel">MYTRAINX AI • X</span>
        <h1>Um Personal IA com contexto do seu treino.</h1>
        <p>O X será conectado ao seu perfil, programas adquiridos, treino do dia, histórico de execução, biblioteca e eventos. A primeira versão será implementada dentro da PWA antes da integração com WhatsApp.</p>
        <div className="heroActions"><Link className="button" href="/app">Ver Command Center →</Link></div>
      </section>
    </main>
  );
}
