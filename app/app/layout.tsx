import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { MyTrainXLogo } from "@/components/MyTrainXLogo";
import { MemberNav } from "@/components/MemberNav";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import styles from "@/components/member-shell.module.css";

export default async function MembersLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  const motif = driveThumbnailUrl(workouts[18].driveFileId, 700);

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/app" className={styles.logo} aria-label="MyTrainX Command Center">
          <MyTrainXLogo />
        </Link>
        <MemberNav />
        <div className={styles.upgrade}>
          <span>MYTRAINX MASTER</span>
          <strong>VAI MAIS <em>LONGE.</em></strong>
          <p>Conteúdos, programas, desafios, eventos e comunidade premium.</p>
          <Link href="/app/master">EXPLORAR MASTER →</Link>
        </div>
        <div className={styles.motif} style={{ backgroundImage: `url("${motif}")` }}>
          <span>DISCIPLINA HOJE.<em>RESULTADOS SEMPRE.</em></span>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <div className={styles.search}><b>⌕</b><span>Pesquisar treinos, exercícios, programas e conteúdos...</span></div>
          <div className={styles.mantra}><small>DISCIPLINA HOJE.</small><strong>RESULTADOS SEMPRE.</strong></div>
          <div className={styles.user}>
            <span className={styles.bell}>♧</span>
            <span className={styles.avatar}>X</span>
            <div className={styles.userText}><b>{session.name || "Member"}</b><small>MyTrainX Member</small></div>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
