import Link from "next/link";
import { getUnifiedLibraryItems } from "@/lib/library-live";
import styles from "@/components/member-section.module.css";

export default async function Page(){
  const items = await getUnifiedLibraryItems();
  const exercises = items.filter((item) => item.type === "exercise").length;
  const recipes = items.filter((item) => item.type === "recipe").length;

  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/app">← COMMAND CENTER</Link>
      <section className={styles.head}>
        <span>LIBRARY / LIVE BETA</span>
        <h1>Sua base de conhecimento</h1>
        <p>
          A Biblioteca V2 já usa o catálogo canónico live para a MyTrainX Kitchen.
          Exercícios entram na mesma camada após revisão; ebooks, programas adquiridos,
          progresso e downloads convergem para a mesma identidade de conteúdo.
        </p>
      </section>
      <section className={styles.grid}>
        <article className={styles.card}>
          <span>LIVE CATALOG</span>
          <b>Biblioteca MyTrainX</b>
          <small>{items.length} conteúdos visíveis nesta versão.</small>
          <Link href="/library">ABRIR BIBLIOTECA →</Link>
        </article>
        <article className={styles.card}>
          <span>EXERCISES</span>
          <b>Exercise Encyclopedia</b>
          <small>{exercises} movimentos publicados; 30 objetos canónicos já estão em revisão no backend.</small>
          <Link href="/library">VER EXERCÍCIOS →</Link>
        </article>
        <article className={styles.card}>
          <span>KITCHEN / LIVE</span>
          <b>MyTrainX Kitchen</b>
          <small>{recipes} receitas originais lidas diretamente do catálogo estruturado.</small>
          <Link href="/library">ABRIR KITCHEN →</Link>
        </article>
      </section>
    </main>
  );
}
