import Link from "next/link";
import { MyTrainXLogo } from "@/components/MyTrainXLogo";
import { LoginForm } from "./LoginForm";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <section className={`${styles.visual} ${styles.visualAbstract}`}><div className={styles.visualShade}/><div className={styles.brandOrb}>X</div><div className={styles.brandGrid}/>
        <div className={styles.visualTop}><Link href="/"><MyTrainXLogo /></Link><span>MEMBER ACCESS · 2026</span></div>
        <div className={styles.visualCopy}>
          <span>WELCOME BACK</span>
          <h1>ENTRA.<br/>TREINA.<br/><em>EVOLUI.</em></h1>
          <p>Um único acesso para Programas, Progress, Library, Coach X e tudo o que a tua conta MyTrainX realmente possui.</p>
          <div className={styles.signals}><span>Programas</span><span>Progress privado</span><span>Library</span><span>Coach X</span></div>
        </div>
        <div className={styles.visualFoot}>FIND YOUR X · MYTRAINX.FIT</div>
      </section>
      <section className={styles.auth}>
        <div className={styles.card}>
          <Link href="/" className={styles.back}>← VOLTAR AO MYTRAINX</Link>
          <span className={styles.eyebrow}>ÁREA DO MEMBRO</span>
          <h2>Acesso seguro.</h2>
          <p>Recebe um link de acesso no e-mail associado à tua conta ou compra. Não precisas memorizar uma senha.</p>
          <div className={styles.trust}><div><span>AUTH</span><small>Magic link via Supabase</small></div><div><span>ENTITLEMENTS</span><small>A conta vê apenas o que possui</small></div></div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
