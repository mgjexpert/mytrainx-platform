import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";
import { getUnifiedLibraryItems } from "@/lib/library-live";
import type { LibraryItem } from "@/lib/library-launch";
import { LibraryExplorer } from "@/components/library/LibraryExplorer";
import styles from "./library.module.css";

const typeLabel = { article: "LEARN", exercise: "EXERCISE", recipe: "KITCHEN" } as const;
const typeIcon = { article: "▤", exercise: "↗", recipe: "◌" } as const;

function visualStyle(item: LibraryItem, index: number) {
  const tags = item.tags.map((tag) => tag.toLowerCase());
  const variant = index % 4;

  if (item.type === "recipe") {
    return {
      backgroundImage:
        "radial-gradient(circle at 78% 18%,rgba(255,126,66,.28),transparent 26%),radial-gradient(circle at 22% 82%,rgba(93,154,112,.18),transparent 24%),linear-gradient(145deg,#211810,#090d0f)",
    };
  }

  if (item.type === "exercise") {
    const palettes = [
      "radial-gradient(circle at 76% 22%,rgba(255,76,10,.28),transparent 24%),linear-gradient(135deg,#171d22,#080b0d)",
      "linear-gradient(115deg,rgba(255,76,10,.18),transparent 34%),radial-gradient(circle at 72% 72%,rgba(93,119,135,.16),transparent 24%),linear-gradient(145deg,#141a1f,#080b0d)",
      "radial-gradient(circle at 25% 78%,rgba(255,76,10,.16),transparent 25%),linear-gradient(155deg,#182027,#080b0d)",
      "linear-gradient(135deg,#10161a,#18120f 68%,#080b0d)",
    ];
    return { backgroundImage: palettes[variant] };
  }

  if (tags.some((tag) => ["nutrição","alimentação","hidratação","cozinha"].includes(tag))) {
    return {
      backgroundImage:
        "radial-gradient(circle at 72% 18%,rgba(255,105,48,.20),transparent 28%),radial-gradient(circle at 18% 82%,rgba(112,148,84,.12),transparent 24%),linear-gradient(145deg,#181a11,#080c0e)",
    };
  }

  if (tags.some((tag) => ["progresso","progress","peso","bia","medidas"].includes(tag))) {
    return {
      backgroundImage:
        "linear-gradient(155deg,rgba(255,76,10,.10),transparent 42%),radial-gradient(circle at 78% 34%,rgba(75,121,150,.18),transparent 24%),linear-gradient(145deg,#101920,#080b0d)",
    };
  }

  if (tags.some((tag) => ["sono","recovery","recuperação","stress","hábitos"].includes(tag))) {
    return {
      backgroundImage:
        "radial-gradient(circle at 78% 18%,rgba(108,91,166,.18),transparent 28%),linear-gradient(145deg,#11151d,#080b0d)",
    };
  }

  const palettes = [
    "radial-gradient(circle at 76% 18%,rgba(255,76,10,.22),transparent 26%),linear-gradient(145deg,#171d21,#080b0d)",
    "linear-gradient(125deg,rgba(255,76,10,.12),transparent 36%),radial-gradient(circle at 78% 72%,rgba(98,130,145,.14),transparent 25%),linear-gradient(145deg,#12191e,#080b0d)",
    "radial-gradient(circle at 22% 78%,rgba(255,76,10,.14),transparent 24%),linear-gradient(145deg,#161a1d,#080b0d)",
    "linear-gradient(145deg,#141a1f,#18110d 78%,#080b0d)",
  ];
  return { backgroundImage: palettes[variant] };
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

      <LibraryExplorer items={items.map((item) => ({
        slug: item.slug,
        title: item.title,
        type: item.type,
        description: item.description,
        tags: item.tags,
        readTime: item.readTime,
      }))} />

      <section className={styles.featured} id="explorar">
        <div className={styles.sectionHeading}>
          <div><span>START HERE</span><h2>O essencial, primeiro.</h2></div>
          <p>Quatro pontos de entrada para entender como a Library transforma informação em decisões mais simples.</p>
        </div>
        <div className={styles.featuredGrid}>
          {featured.map((item, index) => (
            <Link href={`/library/${item.slug}`} className={styles.featureCard} key={item.slug} style={visualStyle(item,index)}>
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
          <Link href={`/library/${item.slug}`} className={styles.card} key={item.slug} style={visualStyle(item,index)}>
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
