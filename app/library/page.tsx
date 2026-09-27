import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { getUnifiedLibraryItems } from "@/lib/library-live";
import type { LibraryItem } from "@/lib/library-launch";
import { libraryMedia } from "@/lib/media-catalog";
import styles from "./library.module.css";

const typeLabel = { article: "LEARN", exercise: "EXERCISE", recipe: "KITCHEN" } as const;
const typeIcon = { article: "▤", exercise: "↗", recipe: "◌" } as const;

function visualFor(item: LibraryItem, index: number) {
  return libraryMedia(item.type, index, 1000);
}

export default async function LibraryPage() {
  const items = await getUnifiedLibraryItems();
  const articles = items.filter((item) => item.type === "article");
  const exercises = items.filter((item) => item.type === "exercise");
  const recipes = items.filter((item) => item.type === "recipe");
  const featured = [
    ...items.filter((item) => item.featured),
    ...items.filter((item) => !item.featured),
  ].slice(0, 4);

  const training = articles.filter((item) => !item.tags.includes("nutrição") && !item.tags.includes("progresso")).slice(0, 9);
  const progress = articles.filter((item) => item.tags.includes("progresso")).slice(0, 6);
  const nutrition = articles.filter((item) => item.tags.includes("nutrição")).slice(0, 6);

  return (
    <main className={styles.page}>
      <PublicHeader />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>MYTRAINX LIBRARY · KNOWLEDGE SYSTEM</span>
          <h1>APRENDE.<br/>APLICA.<br/><em>EVOLUI.</em></h1>
          <p>
            Uma biblioteca viva para treino, exercícios, Progress e alimentação prática.
            Conteúdo original, proveniência rastreável e publicação por gates — pronto para
            ser reutilizado pelo Coach X quando autorizado.
          </p>
          <div className={styles.heroActions}>
            <a href="#explorar" className={styles.primary}>EXPLORAR LIBRARY →</a>
            <Link href="/trainer" className={styles.secondary}>FALAR COM COACH X</Link>
          </div>
        </div>

        <div className={styles.heroBoard}>
          <div className={styles.boardTop}><span>LIVE CATALOG</span><b>{items.length}</b></div>
          <div className={styles.boardGrid}>
            <Link href="#exercise"><span>EXERCISE</span><b>{exercises.length}</b><small>movimentos publicados</small></Link>
            <Link href="#kitchen"><span>KITCHEN</span><b>{recipes.length}</b><small>receitas estruturadas</small></Link>
            <Link href="#learn"><span>LEARN</span><b>{articles.length}</b><small>guias editoriais</small></Link>
            <Link href="/app/library"><span>KNOWLEDGE</span><b>2026</b><small>base editorial viva</small></Link>
          </div>
          <div className={styles.boardFooter}>
            <span>RIGHTS</span><b>PROVENANCE</b><span>REVIEW</span><b>COACH X</b>
          </div>
        </div>
      </section>

      <section className={styles.categoryBar} aria-label="Categorias Library">
        <a href="#learn"><span>01</span><b>Treino & hábitos</b></a>
        <a href="#progress"><span>02</span><b>Progress</b></a>
        <a href="#exercise"><span>03</span><b>Exercise</b></a>
        <a href="#nutrition"><span>04</span><b>Nutrição</b></a>
        <a href="#kitchen"><span>05</span><b>Kitchen</b></a>
      </section>

      <section className={styles.featured} id="explorar">
        <div className={styles.sectionHeading}>
          <div><span>START HERE</span><h2>O essencial, primeiro.</h2></div>
          <p>Quatro pontos de entrada para entender como a Library transforma informação em decisões mais simples.</p>
        </div>
        <div className={styles.featuredGrid}>
          {featured.map((item, index) => (
            <Link href={`/library/${item.slug}`} className={styles.featureCard} key={item.slug} style={{ backgroundImage: `url("${visualFor(item,index)}")` }}>
              <div className={styles.featureShade}/>
              <div className={styles.featureGlow}/>
              <div className={styles.featureTop}><span>0{index + 1}</span><small>{typeLabel[item.type]}</small></div>
              <div className={styles.featureIcon}>{typeIcon[item.type]}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className={styles.cardMeta}><span>{item.readTime}</span><b>ABRIR →</b></div>
            </Link>
          ))}
        </div>
      </section>

      <LibrarySection id="learn" eyebrow="TRAINING KNOWLEDGE" title="Treino & hábitos" intro="Princípios que ajudam a executar melhor, progredir sem ruído e manter o treino repetível." items={training} />
      <LibrarySection id="progress" eyebrow="PROGRESS WITHOUT NOISE" title="Entenda a tua evolução" intro="Peso, medidas, sono, recuperação e tracking explicados com contexto." items={progress} />
      <LibrarySection id="exercise" eyebrow="EXERCISE ENCYCLOPEDIA" title="Movimentos essenciais" intro="Execução, cues, erros comuns e segurança para os movimentos já aprovados." items={exercises} />
      <LibrarySection id="nutrition" eyebrow="NUTRITION" title="Nutrição sem ruído" intro="Educação alimentar prática sem detox, atalhos ou claims desnecessários." items={nutrition} />
      <LibrarySection id="kitchen" eyebrow="MYTRAINX KITCHEN" title="Cozinhe. Monte. Repita." intro="Receitas simples, estruturadas e prontas para a futura camada nutricional canónica." items={recipes} />

      <section className={styles.system}>
        <div>
          <span>LIBRARY V2</span>
          <h2>UM SISTEMA DE CONHECIMENTO.<br/><em>NÃO UMA PASTA DE PDFs.</em></h2>
          <p>
            Cada conteúdo pode ligar-se a exercícios, programas, Progress e Coach X.
            Direitos, revisão e proveniência continuam visíveis para impedir que referência privada
            seja confundida com conteúdo aprovado.
          </p>
        </div>
        <div className={styles.systemFlow}>
          {["SOURCE","REVIEW","CANONICAL","PUBLISH","COACH X"].map((step,index)=><div key={step}><span>0{index+1}</span><b>{step}</b></div>)}
        </div>
        <Link href="/app/library">ABRIR LIBRARY DO MEMBRO →</Link>
      </section>
    </main>
  );
}

function LibrarySection({ id, eyebrow, title, intro, items }: { id: string; eyebrow: string; title: string; intro: string; items: LibraryItem[] }) {
  if (!items.length) return null;
  return (
    <section className={styles.section} id={id}>
      <div className={styles.sectionHeading}>
        <div><span>{eyebrow}</span><h2>{title}</h2></div>
        <p>{intro}</p>
      </div>
      <div className={styles.cardGrid}>
        {items.map((item,index) => (
          <Link href={`/library/${item.slug}`} className={styles.card} key={item.slug} style={{ backgroundImage: `url("${visualFor(item,index)}")` }}>
            <div className={styles.cardShade}/>
            <div className={styles.cardTop}><span>{typeLabel[item.type]}</span><small>{item.access}</small></div>
            <div className={styles.cardIcon}>{typeIcon[item.type]}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className={styles.tags}>{item.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className={styles.cardMeta}><span>{item.readTime}</span><b>LER →</b></div>
          </Link>
        ))}
      </div>
    </section>
  );
}
