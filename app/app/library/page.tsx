import Link from "next/link";
import { getUnifiedLibraryItems } from "@/lib/library-live";
import styles from "@/components/member-section.module.css";

export default async function Page(){
  const items = await getUnifiedLibraryItems();
  const exercises = items.filter((item) => item.type === "exercise").length;
  const recipes = items.filter((item) => item.type === "recipe").length;
  const articles = items.filter((item) => item.type === "article").length;

  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/app">← COMMAND CENTER</Link>
      <section className={styles.head}>
        <span>LIBRARY · LIVE KNOWLEDGE SYSTEM</span>
        <h1>Conhecimento que vira ação.</h1>
        <p>
          A Library já combina artigos 2026, Exercise Encyclopedia e MyTrainX Kitchen no catálogo live.
          Os ebooks e programas avançam pela mesma cadeia de direitos, revisão e proveniência.
        </p>
      </section>
      <section className={styles.grid}>
        <article className={styles.card}><span>LIVE CATALOG</span><b>{items.length} conteúdos públicos</b><small>Catálogo real disponível nesta versão.</small><Link href="/library">ABRIR LIBRARY →</Link></article>
        <article className={styles.card}><span>EXERCISE</span><b>{exercises} movimentos</b><small>30 movimentos canónicos publicados e aprovados para educação geral.</small><Link href="/library">VER ENCICLOPÉDIA →</Link></article>
        <article className={styles.card}><span>KITCHEN</span><b>{recipes} receitas</b><small>Receitas originais estruturadas; nutrição numérica aguarda FDC.</small><Link href="/library">ABRIR KITCHEN →</Link></article>
        <article className={styles.card}><span>LEARN</span><b>{articles} guias</b><small>Treino, Progress, recovery, hábitos e alimentação prática.</small><Link href="/library">VER GUIAS →</Link></article>
        <article className={styles.card}><span>EBOOKS</span><b>4 knowledge cores</b><small>Treino, Nutrição, Progress e Recovery em revisão final.</small></article>
        <article className={styles.card}><span>COACH X</span><b>Knowledge-ready</b><small>Conteúdo aprovado será reutilizado pelo retrieval autorizado.</small></article>
      </section>
    </main>
  );
}
