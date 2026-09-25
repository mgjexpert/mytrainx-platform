import Link from "next/link";
import { libraryLaunchItems } from "@/lib/library-launch";
import styles from "@/components/member-section.module.css";

export default function Page(){
  const exercises = libraryLaunchItems.filter((item) => item.type === "exercise").length;
  const recipes = libraryLaunchItems.filter((item) => item.type === "recipe").length;

  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/app">← COMMAND CENTER</Link>
      <section className={styles.head}>
        <span>LIBRARY</span>
        <h1>Sua base de conhecimento</h1>
        <p>
          A Biblioteca V2 já começou. Acesse o núcleo público agora; conteúdos Master,
          programas adquiridos, progresso e downloads serão conectados ao mesmo catálogo.
        </p>
      </section>
      <section className={styles.grid}>
        <article className={styles.card}>
          <span>PUBLIC BETA</span>
          <b>Biblioteca MyTrainX</b>
          <small>{libraryLaunchItems.length} conteúdos editoriais disponíveis no launch.</small>
          <Link href="/library">ABRIR BIBLIOTECA →</Link>
        </article>
        <article className={styles.card}>
          <span>EXERCISES</span>
          <b>Exercise Encyclopedia</b>
          <small>{exercises} movimentos essenciais publicados. Expansão para centenas em preparação.</small>
          <Link href="/library">VER EXERCÍCIOS →</Link>
        </article>
        <article className={styles.card}>
          <span>KITCHEN</span>
          <b>MyTrainX Kitchen</b>
          <small>{recipes} receitas originais no primeiro lote, com catálogo estruturado em expansão.</small>
          <Link href="/library">ABRIR KITCHEN →</Link>
        </article>
      </section>
    </main>
  );
}
