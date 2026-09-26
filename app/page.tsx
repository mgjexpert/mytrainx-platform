import Link from "next/link";
import { LandingHeader } from "@/components/LandingHeader";
import { MyTrainXLogo } from "@/components/MyTrainXLogo";
import { CoachPreview } from "@/components/landing/ProductPreview";
import { HumanTeamSection } from "@/components/landing/HumanTeamSection";
import { Badge, ButtonLink, Container, SectionHeading } from "@/components/ui/primitives";
import { getUnifiedLibraryItems } from "@/lib/library-live";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import styles from "./home.module.css";

const pillars = [
  ["01", "TREINO", "Programas estruturados e sessões guiadas."],
  ["02", "IA", "Coach X com contexto, não respostas genéricas."],
  ["03", "EVOLUÇÃO", "Progress com tendência, medidas e check-ins."],
  ["04", "COMUNIDADE", "Pessoas, desafios e acompanhamento."],
];

const goals = [
  ["PERDA DE PESO", "Treino + hábitos sustentáveis.", "#progresso"],
  ["GANHO DE MASSA", "Força e progressão.", "#programas"],
  ["CONDICIONAMENTO", "Mais capacidade para o teu dia.", "#programas"],
  ["SAÚDE & BEM-ESTAR", "Movimento consistente.", "#progresso"],
  ["NUTRIÇÃO", "Kitchen e educação prática.", "/library"],
  ["COMUNIDADE", "Evoluir acompanhado.", "#comunidade"],
];

export default async function Home() {
  const library = await getUnifiedLibraryItems();
  const counts = {
    articles: library.filter((item) => item.type === "article").length,
    exercises: library.filter((item) => item.type === "exercise").length,
    recipes: library.filter((item) => item.type === "recipe").length,
  };

  const heroImage = driveThumbnailUrl(workouts[4].driveFileId, 1800);
  const progressImage = driveThumbnailUrl(workouts[15].driveFileId, 1200);
  const programImage = driveThumbnailUrl(workouts[10].driveFileId, 1200);
  const goalImages = [
    driveThumbnailUrl(workouts[12].driveFileId, 900),
    driveThumbnailUrl(workouts[15].driveFileId, 900),
    driveThumbnailUrl(workouts[17].driveFileId, 900),
    driveThumbnailUrl(workouts[7].driveFileId, 900),
    null,
    driveThumbnailUrl(workouts[20].driveFileId, 900),
  ];

  return (
    <main className={styles.page}>
      <LandingHeader />

      <section className={styles.hero}>
        <div className={styles.heroFrame}>
          <div className={styles.heroCopy}>
            <span className={styles.heroSignal}>⚡ TREINO · IA · EVOLUÇÃO · COMUNIDADE</span>
            <h1>O TEU TREINO.<br/>A TUA EVOLUÇÃO.<br/><em>O TEU X.</em></h1>
            <p>
              Programas estruturados, acompanhamento inteligente, progresso com contexto
              e uma comunidade desenhada para te ajudar a continuar.
            </p>
            <div className={styles.actions}>
              <ButtonLink href="/login">Começar agora <span aria-hidden="true">→</span></ButtonLink>
              <ButtonLink href="#funcionalidades" variant="secondary">Ver como funciona</ButtonLink>
            </div>
            <div className={styles.heroStats}>
              <div><b>{library.length}</b><span>conteúdos públicos</span></div>
              <div><b>{counts.exercises}</b><span>exercícios publicados</span></div>
              <div><b>{counts.recipes}</b><span>receitas live</span></div>
              <div><b>{workouts.length}</b><span>sessões WKT verificadas</span></div>
            </div>
          </div>

          <div className={styles.heroVisual} style={{ backgroundImage: `url("${heroImage}")` }}>
            <div className={styles.heroShade}/>
            <div className={styles.heroDiscipline}>MAIS DISCIPLINA.<br/>MAIS EVOLUÇÃO.<br/><em>O TEU X.</em></div>
            <HeroDevices />
          </div>
        </div>
      </section>

      <section className={styles.goalStrip} aria-label="Objetivos e áreas MyTrainX">
        <div className={styles.goalGrid}>
          {goals.map(([title, description, href], index) => (
            <Link
              key={title}
              href={href}
              className={styles.goalCard}
              style={{ backgroundImage: goalImages[index] ? `url("${goalImages[index]}")` : undefined }}
            >
              <div className={styles.goalShade}/>
              <span>0{index + 1}</span>
              <div><strong>{title}</strong><small>{description}</small></div>
              <b>→</b>
            </Link>
          ))}
        </div>
      </section>

      <section id="funcionalidades" className={styles.featureSection}>
        <div className={styles.featureFrame}>
          <article className={styles.coachFeature}>
            <div className={styles.featureCopy}>
              <span>IA QUE TE CONHECE</span>
              <h2>COACH <em>X</em></h2>
              <p>
                O teu Personal Trainer por IA. A experiência foi desenhada para combinar
                treino, Progress, programas e conhecimento autorizado numa única conversa.
              </p>
              <div className={styles.featureSignals}>
                <span>Treinos personalizados</span>
                <span>Ajustes pelo contexto</span>
                <span>Knowledge Base MyTrainX</span>
              </div>
              <ButtonLink href="/trainer" variant="secondary">Conhecer o Coach X →</ButtonLink>
            </div>
            <CoachPreview />
          </article>

          <article id="progresso" className={styles.progressFeature} style={{ backgroundImage: `url("${progressImage}")` }}>
            <div className={styles.progressShade}/>
            <div className={styles.progressCopy}>
              <span>ACOMPANHA A TUA</span>
              <h2>EVOLUÇÃO <em>REAL.</em></h2>
              <p>
                Peso opcional, cintura, composição estimada, check-ins, metas e fotos privadas.
                Sempre com método, tendência e contexto.
              </p>
              <div className={styles.progressMetrics}>
                <div><small>PESO</small><b>Opcional</b></div>
                <div><small>MASSA MUSCULAR</small><b>Estimativa</b></div>
                <div><small>FOTOS</small><b>Privadas</b></div>
                <div><small>CHECK-IN</small><b>Semanal</b></div>
              </div>
              <ButtonLink href="/login" variant="secondary">Ver Progress →</ButtonLink>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.pillars} aria-label="Ecossistema MyTrainX">
        <div className={styles.pillarGrid}>
          {pillars.map(([index,title,description]) => (
            <article key={title}>
              <span>{index}</span>
              <div><strong>{title}</strong><small>{description}</small></div>
            </article>
          ))}
        </div>
      </section>

      <section id="programas" className={styles.programSection}>
        <Container className={styles.wide}>
          <div className={styles.sectionTop}>
            <SectionHeading eyebrow="PROGRAMAS">CAMINHOS PARA <em>EVOLUIR.</em></SectionHeading>
            <ButtonLink href="/programas" variant="quiet">Ver todos →</ButtonLink>
          </div>
          <div className={styles.programGrid}>
            <Link href="/programas/wkt-militar" className={styles.programPrimary} style={{ backgroundImage: `url("${programImage}")` }}>
              <div className={styles.programShade}/>
              <Badge tone="brand">DISPONÍVEL</Badge>
              <div>
                <small>{workouts.length} TREINOS GUIADOS</small>
                <strong>WKT <em>MILITAR</em></strong>
                <p>Força, resistência e consistência dentro do ecossistema MyTrainX.</p>
              </div>
            </Link>
            {[
              ["MYTRAINX START", "12 sessões · 4 semanas", "DISPONÍVEL"],
              ["CORE 21", "Core & estabilidade", "EM PREPARAÇÃO"],
              ["CALISTHENICS", "Domínio corporal", "EM PREPARAÇÃO"],
            ].map(([name, description, status], index) => (
              <article key={name} className={styles.programFuture}>
                <span>0{index + 2}</span>
                <Badge tone="neutral">{status}</Badge>
                <strong>{name}</strong>
                <p>{description}</p>
                <small>PRÓXIMO CAPÍTULO →</small>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <HumanTeamSection />

      <section id="comunidade" className={styles.communitySection}>
        <div className={styles.communityVisual}>
          <div className={styles.communityShade}/>
          <div className={styles.communityCopy}>
            <span>MAIS DO QUE TREINOS.</span>
            <h2>UMA COMUNIDADE <em>REAL.</em></h2>
            <p>
              Desafios, grupos, eventos e apoio contínuo. Sem números inventados:
              a comunidade cresce com utilização e participação reais.
            </p>
            <div className={styles.communityFeatures}>
              <span>◇ Desafios</span><span>◇ Grupos temáticos</span><span>◇ Eventos</span><span>◇ Partilha</span>
            </div>
            <ButtonLink href="/community">Explorar comunidade →</ButtonLink>
          </div>
        </div>
      </section>

      <section id="master" className={styles.masterSection}>
        <Container className={styles.masterInner}>
          <div>
            <span>♛ MYTRAINX MASTER</span>
            <h2>PARA QUEM QUER IR MAIS LONGE.</h2>
            <p>Conteúdos, programas, desafios, eventos e benefícios premium — apenas quando estiverem realmente validados.</p>
          </div>
          <div className={styles.masterActions}>
            <Badge tone="master">EM PREPARAÇÃO</Badge>
            <ButtonLink href="/master" variant="master">Conhecer Master →</ButtonLink>
          </div>
        </Container>
      </section>

      <section className={styles.finalCta}>
        <Container className={styles.finalInner}>
          <span>FIND YOUR X.</span>
          <h2>O PRÓXIMO PASSO É <em>TEU.</em></h2>
          <p>Treino inteligente. Acompanhamento real. Conhecimento para entender a tua evolução.</p>
          <div className={styles.actions}>
            <ButtonLink href="/login">Começar agora →</ButtonLink>
            <ButtonLink href="/library" variant="secondary">Explorar Library</ButtonLink>
          </div>
        </Container>
      </section>

      <footer className={styles.footer}>
        <Container className={styles.footerInner}>
          <div><MyTrainXLogo /><small>FIND YOUR X.</small></div>
          <nav>
            <Link href="/programas">Programas</Link><Link href="/trainer">Coach X</Link>
            <Link href="/library">Library</Link><Link href="/community">Comunidade</Link><Link href="/master">Master</Link>
          </nav>
          <span>TRAIN · EVOLVE · BELONG</span>
        </Container>
      </footer>
    </main>
  );
}

function HeroDevices() {
  return (
    <div className={styles.deviceStage} aria-label="Prévia visual do produto MyTrainX">
      <div className={styles.phonePrimary}>
        <div className={styles.phoneBar}><b>MyTrain<span>X</span></b><small>LIVE</small></div>
        <div className={styles.phoneWelcome}><small>COMMAND CENTER</small><strong>O que fazemos hoje?</strong></div>
        <div className={styles.phonePlan}><span>PROGRAMA</span><b>WKT Militar</b><small>Próxima sessão disponível no teu plano.</small></div>
        <Link href="/login">VER TREINO DE HOJE →</Link>
        <div className={styles.phoneMiniGrid}><div><b>Progress</b><small>Dados privados</small></div><div><b>Library</b><small>Conteúdo 2026</small></div></div>
      </div>
      <div className={styles.phoneSecondary}>
        <div className={styles.phoneMedia}><span>TREINO DE HOJE</span><strong>FORÇA<br/>+ FOCO</strong></div>
        <div className={styles.phoneChecklist}><span>✓ Aquecimento</span><span>○ Treino principal</span><span>○ Finalização</span></div>
        <Link href="/login">INICIAR →</Link>
      </div>
    </div>
  );
}
