import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/PublicHeader";
import { libraryLaunchItems } from "@/lib/library-launch";
import { getUnifiedLibraryItem } from "@/lib/library-live";
import styles from "./page.module.css";

export function generateStaticParams() {
  return libraryLaunchItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getUnifiedLibraryItem(slug);
  if (!item) return {};
  return {
    title: `${item.title} | MyTrainX Library`,
    description: item.description,
  };
}

export default async function LibraryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getUnifiedLibraryItem(slug);
  if (!item) notFound();

  return (
    <main className={styles.page}>
      <PublicHeader />
      <article className={styles.article}>
        <div className={styles.backRow}>
          <Link href="/library">← BIBLIOTECA</Link>
          <span>{item.access}</span>
        </div>

        <header className={styles.hero}>
          <span className={styles.kicker}>{item.eyebrow}</span>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <div className={styles.meta}>
            <span>{item.readTime}</span>
            <span>Atualizado {item.updated}</span>
            <span>MyTrainX Editorial 2026</span>
          </div>
          <div className={styles.tags}>
            {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </header>

        {item.type === "article" && item.body && (
          <div className={styles.prose}>
            {item.body.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {section.bullets && (
                  <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                )}
              </section>
            ))}
          </div>
        )}

        {item.type === "exercise" && item.exercise && (
          <div className={styles.exerciseLayout}>
            <aside className={styles.factPanel}>
              <Fact label="Padrão" value={item.exercise.movementPattern} />
              <Fact label="Nível" value={item.exercise.difficulty} />
              <Fact label="Equipamento" value={item.exercise.equipment.join(", ")} />
              <Fact label="Principais" value={item.exercise.primaryMuscles.join(", ")} />
              <Fact label="Secundários" value={item.exercise.secondaryMuscles.join(", ")} />
            </aside>
            <div className={styles.prose}>
              <ListSection title="Preparação" items={item.exercise.setup} />
              <ListSection title="Execução" items={item.exercise.execution} ordered />
              <ListSection title="Coach X cues" items={item.exercise.cues} />
              <ListSection title="Erros comuns" items={item.exercise.mistakes} />
              <ListSection title="Regressões" items={item.exercise.regressions} />
              <ListSection title="Progressões" items={item.exercise.progressions} />
              <ListSection title="Segurança" items={item.exercise.safety} />
            </div>
          </div>
        )}

        {item.type === "recipe" && item.recipe && (
          <div className={styles.recipeLayout}>
            <aside className={styles.factPanel}>
              <Fact label="Porções" value={item.recipe.servings} />
              <Fact label="Preparação" value={item.recipe.prepTime} />
              <Fact label="Cozimento" value={item.recipe.cookTime} />
              <Fact label="Perfil" value={item.recipe.profile.join(" · ")} />
            </aside>
            <div className={styles.prose}>
              <section>
                <h2>Ingredientes</h2>
                <ul className={styles.ingredients}>
                  {item.recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.item}><span>{ingredient.item}</span><b>{ingredient.amount}</b></li>
                  ))}
                </ul>
              </section>
              <ListSection title="Modo de preparo" items={item.recipe.steps} ordered />
              <ListSection title="Substituições" items={item.recipe.substitutions} />
              <ListSection title="Conservação" items={item.recipe.storage} />
            </div>
          </div>
        )}

        <section className={styles.coach}>
          <span>COACH X</span>
          <h2>Transforme informação em próxima ação.</h2>
          <p>Use este conteúdo como ponto de partida e leve suas dúvidas para o Trainer X.</p>
          <Link href="/trainer">ABRIR COACH X →</Link>
        </section>

        {item.sources && (
          <section className={styles.sources}>
            <h2>Fontes e referências-base</h2>
            <p>Referências usadas como base editorial. O texto acima é produção original MyTrainX.</p>
            {item.sources.map((source) => (
              <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                {source.label} ↗
              </a>
            ))}
          </section>
        )}

        <section className={styles.disclaimer}>
          <strong>Nota de segurança</strong>
          <p>
            Conteúdo educacional geral. Não substitui avaliação, diagnóstico ou orientação
            individual de profissional habilitado quando houver condição clínica, lesão,
            dor persistente ou necessidade específica.
          </p>
        </section>
      </article>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className={styles.fact}><span>{label}</span><b>{value}</b></div>;
}

function ListSection({
  title,
  items,
  ordered = false,
}: {
  title: string;
  items: string[];
  ordered?: boolean;
}) {
  return (
    <section>
      <h2>{title}</h2>
      {ordered ? (
        <ol>{items.map((item) => <li key={item}>{item}</li>)}</ol>
      ) : (
        <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
      )}
    </section>
  );
}
