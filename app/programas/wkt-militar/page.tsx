import Link from "next/link";
import { workouts } from "@/lib/programs/wkt/workouts";

export default function WktProgramPage() {
  return (
    <main className="simplePage">
      <header className="landingHeader"><div className="shell"><Link className="brand" href="/">MYTRAIN<b>X</b></Link><nav><Link href="/programas">Programas</Link><Link className="button" href="/app">Entrar</Link></nav></div></header>
      <section className="simpleHero shell">
        <span className="heroLabel">MYTRAINX PROGRAM • WKT MILITAR</span>
        <h1>21 missões. Treine junto.</h1>
        <p>O WKT Militar é o primeiro programa do ecossistema MyTrainX. Os treinos completos continuam preparados para playback direto do Google Drive durante o MVP.</p>
        <div className="heroActions"><Link className="button" href="/app">Abrir programa →</Link></div>
        <p>{workouts.length} treinos cadastrados para migração.</p>
      </section>
    </main>
  );
}
