import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/PublicHeader";
import { libraryLaunchItems } from "@/lib/library-launch";
import { getUnifiedLibraryItem, getUnifiedLibraryItems } from "@/lib/library-live";
import styles from "./page.module.css";

export function generateStaticParams() {
  return libraryLaunchItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getUnifiedLibraryItem(slug);
  if (!item) return {};
  return { title: `${item.title} | MyTrainX Library`, description: item.description };
}

export default async function LibraryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [item, items] = await Promise.all([getUnifiedLibraryItem(slug), getUnifiedLibraryItems()]);
  if (!item) notFound();

  const related = items
    .filter((candidate) => candidate.slug !== item.slug)
    .map((candidate) => ({ candidate, score: (candidate.type === item.type ? 3 : 0) + candidate.tags.filter((tag) => item.tags.includes(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((a,b) => b.score - a.score)
    .slice(0,3)
    .map(({candidate}) => candidate);

  return (
    <main className={styles.page}>
      <PublicHeader />
      <article className={styles.article}>
        <div className={styles.backRow}><Link href="/library">← LIBRARY</Link><span>{item.access} · {item.type.toUpperCase()}</span></div>

        <header className={styles.hero}>
          <div className={styles.heroMark}>{item.type === "exercise" ? "↗" : item.type === "recipe" ? "◌" : "▤"}</div>
          <div>
            <span className={styles.kicker}>{item.eyebrow}</span>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <div className={styles.meta}><span>{item.readTime}</span><span>Atualizado {item.updated}</span><span>MyTrainX Editorial 2026</span></div>
            <div className={styles.tags}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        </header>

        {item.type === "article" && item.body && <div className={styles.articleGrid}>
          <aside className={styles.contents}><span>NESTE GUIA</span>{item.body.map((section,index)=><a href={`#s-${index}`} key={section.heading}>0{index+1} · {section.heading}</a>)}</aside>
          <div className={styles.prose}>{item.body.map((section,index) => <section id={`s-${index}`} key={section.heading}><span className={styles.sectionNo}>0{index+1}</span><h2>{section.heading}</h2>{section.paragraphs?.map((p) => <p key={p}>{p}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}</div>
        </div>}

        {item.type === "exercise" && item.exercise && <div className={styles.exerciseLayout}>
          <aside className={styles.factPanel}><Fact label="Padrão" value={item.exercise.movementPattern} /><Fact label="Nível" value={item.exercise.difficulty} /><Fact label="Equipamento" value={item.exercise.equipment.join(", ")} /><Fact label="Principais" value={item.exercise.primaryMuscles.join(", ")} /><Fact label="Secundários" value={item.exercise.secondaryMuscles.join(", ")} /></aside>
          <div className={styles.prose}><ListSection title="Preparação" items={item.exercise.setup} /><ListSection title="Execução" items={item.exercise.execution} ordered /><ListSection title="Coach X cues" items={item.exercise.cues} /><ListSection title="Erros comuns" items={item.exercise.mistakes} /><ListSection title="Regressões" items={item.exercise.regressions} /><ListSection title="Progressões" items={item.exercise.progressions} /><ListSection title="Segurança" items={item.exercise.safety} /></div>
        </div>}

        {item.type === "recipe" && item.recipe && <div className={styles.recipeLayout}>
          <aside className={styles.factPanel}><Fact label="Porções" value={item.recipe.servings} /><Fact label="Preparação" value={item.recipe.prepTime} /><Fact label="Cozimento" value={item.recipe.cookTime} /><Fact label="Perfil" value={item.recipe.profile.join(" · ")} /></aside>
          <div className={styles.prose}><section><h2>Ingredientes</h2><ul className={styles.ingredients}>{item.recipe.ingredients.map((ingredient) => <li key={ingredient.item}><span>{ingredient.item}</span><b>{ingredient.amount}</b></li>)}</ul></section><ListSection title="Modo de preparo" items={item.recipe.steps} ordered /><ListSection title="Substituições" items={item.recipe.substitutions} /><ListSection title="Conservação" items={item.recipe.storage} /></div>
        </div>}

        <section className={styles.coach}><div><span>COACH X</span><h2>INFORMAÇÃO → CONTEXTO → PRÓXIMA AÇÃO.</h2><p>Use este conteúdo como base e leve a dúvida para o Coach X. O objetivo é explicar e contextualizar, não substituir avaliação profissional quando ela for necessária.</p></div><Link href="/trainer">ABRIR COACH X →</Link></section>

        {related.length > 0 && <section className={styles.related}><div className={styles.relatedHead}><span>CONTINUA NA LIBRARY</span><h2>Relacionado com este conteúdo.</h2></div><div className={styles.relatedGrid}>{related.map((candidate)=><Link key={candidate.slug} href={`/library/${candidate.slug}`}><span>{candidate.type.toUpperCase()}</span><b>{candidate.title}</b><small>{candidate.readTime}</small><em>ABRIR →</em></Link>)}</div></section>}

        {item.sources && <section className={styles.sources}><h2>Fontes e referências-base</h2><p>Referências usadas como base editorial. O texto acima é produção original MyTrainX.</p>{item.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</section>}

        <section className={styles.disclaimer}><strong>Nota de segurança</strong><p>Conteúdo educacional geral. Não substitui avaliação, diagnóstico ou orientação individual de profissional habilitado quando houver condição clínica, lesão, dor persistente ou necessidade específica.</p></section>
      </article>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) { return <div className={styles.fact}><span>{label}</span><b>{value}</b></div>; }
function ListSection({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) { return <section><h2>{title}</h2>{ordered ? <ol>{items.map((item) => <li key={item}>{item}</li>)}</ol> : <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>}</section>; }
