import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { getLibraryItemsByType, libraryLaunchItems } from "@/lib/library-launch";
import styles from "./library.module.css";

const typeLabel = {
  article: "LEARN",
  exercise: "EXERCISE",
  recipe: "KITCHEN",
};

export default function LibraryPage() {
  const featured = libraryLaunchItems.filter((item) => item.featured);
  const articles = getLibraryItemsByType("article");
  const exercises = getLibraryItemsByType("exercise");
  const recipes = getLibraryItemsByType("recipe");

  return (
    <main className={styles.page}>
      <PublicHeader />

      <section className={styles.hero}>
        <div>
          <span className={styles.kicker}>MYTRAINX LIBRARY / PUBLIC BETA</span>
          <h1>CONHECIMENTO QUE <em>VIRA AÇÃO.</em></h1>
          <p>
            Treino, exercícios e alimentação prática numa biblioteca construída para
            aprender, aplicar e evoluir com o Coach X. Conteúdo original MyTrainX,
            atualizado para 2026 e expandido continuamente.
          </p>
          <div className={styles.heroActions}>
            <a href="#explorar" className={styles.primary}>EXPLORAR AGORA</a>
            <Link href="/trainer" className={styles.secondary}>FALAR COM COACH X</Link>
          </div>
        </div>
        <div className={styles.stats}>
          <div><strong>{libraryLaunchItems.length}</strong><span>conteúdos no launch</span></div>
          <div><strong>{exercises.length}</strong><span>exercícios já publicados</span></div>
          <div><strong>{recipes.length}</strong><span>receitas iniciais</span></div>
          <div><strong>2026</strong><span>base editorial atual</span></div>
        </div>
      </section>

      <section className={styles.featured} id="explorar">
        <div className={styles.sectionHeading}>
          <span>START HERE</span>
          <h2>Comece pelo essencial</h2>
        </div>
        <div className={styles.featuredGrid}>
          {featured.map((item, index) => (
            <Link href={`/library/${item.slug}`} className={styles.featureCard} key={item.slug}>
              <div className={styles.featureTop}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{typeLabel[item.type]}</small>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className={styles.cardMeta}><span>{item.readTime}</span><b>ABRIR →</b></div>
            </Link>
          ))}
        </div>
      </section>

      <LibrarySection
        eyebrow="TRAINING KNOWLEDGE"
        title="Fundamentos do treino"
        items={articles.filter((item) => !item.tags.includes("nutrição"))}
      />

      <LibrarySection
        eyebrow="EXERCISE ENCYCLOPEDIA"
        title="Movimentos essenciais"
        items={exercises}
      />

      <LibrarySection
        eyebrow="NUTRITION"
        title="Nutrição sem ruído"
        items={articles.filter((item) => item.tags.includes("nutrição"))}
      />

      <LibrarySection
        eyebrow="MYTRAINX KITCHEN"
        title="Cozinhe. Monte. Repita."
        items={recipes}
      />

      <section className={styles.next}>
        <span>LIBRARY V2</span>
        <h2>Isto é o início, não o catálogo final.</h2>
        <p>
          A próxima expansão inclui centenas de exercícios normalizados, MyTrainX Start,
          Core 21, Home 30, HIIT, Calistenia, ebooks, receitas estruturadas e materiais WKT.
        </p>
        <Link href="/master">CONHECER MYTRAINX MASTER →</Link>
      </section>
    </main>
  );
}

function LibrarySection({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: typeof libraryLaunchItems;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <div className={styles.cardGrid}>
        {items.map((item) => (
          <Link href={`/library/${item.slug}`} className={styles.card} key={item.slug}>
            <div className={styles.cardTop}>
              <span>{typeLabel[item.type]}</span>
              <small>{item.access}</small>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className={styles.tags}>
              {item.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className={styles.cardMeta}><span>{item.readTime}</span><b>LER →</b></div>
          </Link>
        ))}
      </div>
    </section>
  );
}
