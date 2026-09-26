import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { getUnifiedLibraryItems } from "@/lib/library-live";
import type { LibraryItem } from "@/lib/library-launch";
import styles from "./library.module.css";

const typeLabel = {
  article: "LEARN",
  exercise: "EXERCISE",
  recipe: "KITCHEN",
};

export default async function LibraryPage() {
  const items = await getUnifiedLibraryItems();
  const featured = items.filter((item) => item.featured);
  const articles = items.filter((item) => item.type === "article");
  const exercises = items.filter((item) => item.type === "exercise");
  const recipes = items.filter((item) => item.type === "recipe");

  return (
    <main className={styles.page}>
      <PublicHeader />
      <section className={styles.hero}>
        <div>
          <span className={styles.kicker}>MYTRAINX LIBRARY / LIVE BETA</span>
          <h1>CONHECIMENTO QUE <em>VIRA AÇÃO.</em></h1>
          <p>
            Treino, exercícios e alimentação prática numa biblioteca construída para
            aprender, aplicar e evoluir com o Coach X. A Kitchen já lê o catálogo canónico
            live; exercícios entram na mesma camada depois do gate de revisão.
          </p>
          <div className={styles.heroActions}>
            <a href="#explorar" className={styles.primary}>EXPLORAR AGORA</a>
            <Link href="/trainer" className={styles.secondary}>FALAR COM COACH X</Link>
          </div>
        </div>
        <div className={styles.stats}>
          <div><strong>{items.length}</strong><span>conteúdos visíveis</span></div>
          <div><strong>{exercises.length}</strong><span>exercícios editoriais publicados</span></div>
          <div><strong>{recipes.length}</strong><span>receitas live</span></div>
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
        items={articles.filter((item) => !item.tags.includes("nutrição") && !item.tags.includes("progresso"))}
      />
      <LibrarySection
        eyebrow="PROGRESS WITHOUT NOISE"
        title="Entenda sua evolução"
        items={articles.filter((item) => item.tags.includes("progresso"))}
      />
      <LibrarySection eyebrow="EXERCISE ENCYCLOPEDIA" title="Movimentos essenciais" items={exercises} />
      <LibrarySection
        eyebrow="NUTRITION"
        title="Nutrição sem ruído"
        items={articles.filter((item) => item.tags.includes("nutrição"))}
      />
      <LibrarySection eyebrow="MYTRAINX KITCHEN / LIVE" title="Cozinhe. Monte. Repita." items={recipes} />

      <section className={styles.next}>
        <span>LIBRARY V2</span>
        <h2>Uma biblioteca viva, não uma coleção de ficheiros.</h2>
        <p>
          O catálogo canónico cresce no Supabase com direitos, revisão e proveniência.
          A próxima etapa liga exercícios aprovados, ebooks, programas e retrieval do Coach X
          à mesma identidade de conteúdo.
        </p>
        <Link href="/master">CONHECER MYTRAINX MASTER →</Link>
      </section>
    </main>
  );
}

function LibrarySection({ eyebrow, title, items }: { eyebrow: string; title: string; items: LibraryItem[] }) {
  if (!items.length) return null;
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
