import Link from "next/link";
import { LandingHeader } from "@/components/LandingHeader";
import { MyTrainXLogo } from "@/components/MyTrainXLogo";
import { CoachPreview, CommandCenterPreview } from "@/components/landing/ProductPreview";
import { HumanTeamSection } from "@/components/landing/HumanTeamSection";
import { Badge, ButtonLink, Card, Container, SectionHeading } from "@/components/ui/primitives";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import styles from "./home.module.css";

const trainingImage = driveThumbnailUrl(workouts[0].driveFileId, 1600);
const programImage = driveThumbnailUrl(workouts[10].driveFileId, 1600);
const goalImages = [
  driveThumbnailUrl(workouts[12].driveFileId, 900),
  driveThumbnailUrl(workouts[15].driveFileId, 900),
  driveThumbnailUrl(workouts[17].driveFileId, 900),
  driveThumbnailUrl(workouts[7].driveFileId, 900),
  null,
  driveThumbnailUrl(workouts[20].driveFileId, 900),
];

const pillars = [
  ["AI TRAINER", "Orientação contextual."],
  ["PROGRAMAS", "Planos estruturados."],
  ["PERFORMANCE", "Progresso mensurável."],
  ["COMMUNITY", "Evoluir acompanhado."],
];

const goals = [
  ["PERDA DE PESO", "Treino + hábitos sustentáveis.", "#progresso"],
  ["GANHO DE MASSA", "Força e progressão.", "#programas"],
  ["CONDICIONAMENTO", "Mais capacidade para o teu dia.", "#programas"],
  ["SAÚDE & BEM-ESTAR", "Movimento consistente.", "#progresso"],
  ["NUTRIÇÃO", "Kitchen e educação prática.", "/library"],
  ["COMUNIDADE", "Evoluir acompanhado.", "#comunidade"],
];

export default function Home() {
  return (
    <main className={styles.page}>
      <LandingHeader />

      <section className={styles.hero}>
        <Container className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={styles.heroSignal}>⚡ TREINO · IA · EVOLUÇÃO · COMUNIDADE</span>
            <h1>O TEU TREINO.<br/>A TUA EVOLUÇÃO.<br/><em>O TEU X.</em></h1>
            <p>
              Programas estruturados, acompanhamento inteligente, progresso com contexto
              e uma comunidade construída para te ajudar a continuar.
            </p>
            <div className={styles.actions}>
              <ButtonLink href="/login">Começar agora <span aria-hidden="true">→</span></ButtonLink>
              <ButtonLink href="#coach-x" variant="secondary">Ver como funciona</ButtonLink>
            </div>
            <div className={styles.heroMeta}>
              <span><b>21</b> sessões WKT verificadas</span>
              <span><b>12</b> receitas live</span>
              <span><b>Progress</b> privado e configurável</span>
            </div>
          </div>

          <div className={styles.heroVisual} style={{ backgroundImage: `url("${trainingImage}")` }}>
            <div className={styles.heroShade} />
            <div className={styles.heroDiscipline}>MAIS DISCIPLINA.<br/>MAIS EVOLUÇÃO.<br/><em>O TEU X.</em></div>
            <HeroDevices />
          </div>
        </Container>
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
              <div className={styles.goalShade} />
              <span>0{index + 1}</span>
              <div>
                <strong>{title}</strong>
                <small>{description}</small>
              </div>
              <b>→</b>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.pillars} aria-label="Ecossistema MyTrainX">
        <Container className={styles.pillarGrid}>
          {pillars.map(([title, description], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <div><strong>{title}</strong><small>{description}</small></div>
            </article>
          ))}
        </Container>
      </section>

      <section id="coach-x" className={styles.section}>
        <Container className={styles.twoCol}>
          <div className={styles.copy}>
            <SectionHeading eyebrow="COACH X">A IA QUE CONHECE O TEU <em>CONTEXTO.</em></SectionHeading>
            <p>
              Coach X é a inteligência central do MyTrainX. A experiência combina conversa,
              programas, treino, Progress e conhecimento autorizado — sem parecer um chatbot genérico.
            </p>
            <div className={styles.featureList}>
              <span>Treino e programa em contexto</span>
              <span>Ajuste ao tempo disponível</span>
              <span>Progresso explicado, não só exibido</span>
              <span>Knowledge Base com gates de revisão</span>
            </div>
            <ButtonLink href="/trainer" variant="secondary">Conhecer o Coach X →</ButtonLink>
          </div>
          <CoachPreview />
        </Container>
      </section>

      <section className={styles.sectionAlt}>
        <Container>
          <div className={styles.sectionIntro}>
            <SectionHeading eyebrow="COMMAND CENTER">O TEU DIA NO <em>MYTRAINX.</em></SectionHeading>
            <p>
              Treino, programa, Progress, Library e Coach X convergem numa experiência única.
              Quando existe dado real do membro, ele aparece; quando não existe, mostramos um estado vazio honesto.
            </p>
          </div>
          <CommandCenterPreview />
        </Container>
      </section>

      <section id="programas" className={styles.section}>
        <Container>
          <div className={styles.sectionTop}>
            <SectionHeading eyebrow="PROGRAMAS">PROGRAMAS PARA <em>EVOLUIR.</em></SectionHeading>
            <ButtonLink href="/programas" variant="quiet">Ver todos →</ButtonLink>
          </div>
          <div className={styles.programGrid}>
            <Link href="/programas/wkt-militar" className={styles.programPrimary} style={{ backgroundImage: `url("${programImage}")` }}>
              <div className={styles.programShade} />
              <Badge tone="brand">DISPONÍVEL</Badge>
              <div className={styles.programCopy}>
                <small>{workouts.length} TREINOS GUIADOS</small>
                <strong>WKT <em>MILITAR</em></strong>
                <p>Força, resistência e consistência dentro do ecossistema MyTrainX.</p>
              </div>
            </Link>
            {[
              ["MYTRAINX START", "12 sessões · revisão final em curso.", "EM VALIDAÇÃO"],
              ["HIIT PRO", "Performance e intensidade.", "EM PREPARAÇÃO"],
              ["CALISTHENICS", "Movimento e domínio corporal.", "EM PREPARAÇÃO"],
            ].map(([name, description, status]) => (
              <Card key={name} className={styles.programFuture}>
                <Badge tone="neutral">{status}</Badge>
                <strong>{name}</strong>
                <p>{description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="progresso" className={styles.progressSection}>
        <Container className={styles.progressGrid}>
          <div className={styles.copy}>
            <SectionHeading eyebrow="PROGRESS">A TUA EVOLUÇÃO. <em>COM CONTEXTO.</em></SectionHeading>
            <p>
              Peso opcional, medidas, composição estimada, metas, check-in e fotos privadas.
              O princípio é <strong>dado → interpretação → ação</strong>, sem transformar uma medição isolada em diagnóstico.
            </p>
            <ButtonLink href="/login" variant="secondary">Abrir o teu Progress →</ButtonLink>
          </div>
          <div className={styles.progressVisual} aria-label="Fluxo de progresso MyTrainX">
            <div><small>01 · DADO</small><strong>Regista</strong><span>O que escolheste acompanhar</span></div>
            <i>→</i>
            <div><small>02 · TENDÊNCIA</small><strong>Compara</strong><span>Método e contexto consistentes</span></div>
            <i>→</i>
            <div><small>03 · AÇÃO</small><strong>Ajusta</strong><span>O menor próximo passo útil</span></div>
          </div>
        </Container>
      </section>

      <HumanTeamSection />

      <section id="comunidade" className={styles.sectionAlt}>
        <Container className={styles.communityGrid}>
          <div className={styles.copy}>
            <SectionHeading eyebrow="COMMUNITY">MAIS QUE TREINOS. <em>UMA COMUNIDADE.</em></SectionHeading>
            <p>
              Grupos, desafios, eventos e interação entre membros fazem parte da visão MyTrainX.
              A experiência cresce sem usar números de membros ou resultados não verificados.
            </p>
            <ButtonLink href="/community" variant="secondary">Explorar a comunidade →</ButtonLink>
          </div>
          <div className={styles.communityCards}>
            <Card><span>01</span><strong>DESAFIOS</strong><p>Objetivos partilhados e acompanhamento.</p></Card>
            <Card><span>02</span><strong>EVENTOS</strong><p>Experiências e ativações MyTrainX.</p></Card>
            <Card><span>03</span><strong>PERTENÇA</strong><p>Evoluir com outras pessoas.</p></Card>
          </div>
        </Container>
      </section>

      <section id="master" className={styles.masterSection}>
        <Container className={styles.masterInner}>
          <div>
            <span className={styles.masterEyebrow}>MYTRAINX MASTER</span>
            <h2>PARA QUEM QUER IR MAIS LONGE.</h2>
            <p>
              O espaço premium do ecossistema para conteúdos, programas avançados, eventos,
              desafios e benefícios. Só entra em oferta final aquilo que estiver efetivamente validado.
            </p>
          </div>
          <div className={styles.masterActions}>
            <Badge tone="master">EM PREPARAÇÃO</Badge>
            <ButtonLink href="/master" variant="master">Conhecer Master →</ButtonLink>
          </div>
        </Container>
      </section>

      <section className={styles.finalCta}>
        <Container className={styles.finalInner}>
          <span className={styles.eyebrow}>FIND YOUR X.</span>
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
          <nav aria-label="Rodapé">
            <Link href="/programas">Programas</Link>
            <Link href="/trainer">Coach X</Link>
            <Link href="/library">Library</Link>
            <Link href="/community">Comunidade</Link>
            <Link href="/master">Master</Link>
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
        <div className={styles.phoneBar}><b>MyTrain<span>X</span></b><small>PREVIEW</small></div>
        <div className={styles.phoneWelcome}><small>OLÁ, MEMBER</small><strong>O que fazemos hoje?</strong></div>
        <div className={styles.phonePlan}>
          <span>PROGRAMA</span>
          <b>WKT Militar</b>
          <small>Próxima sessão disponível no teu plano.</small>
        </div>
        <Link href="/login">VER TREINO DE HOJE →</Link>
        <div className={styles.phoneMiniGrid}>
          <div><b>Progress</b><small>Tendências reais</small></div>
          <div><b>Library</b><small>Conteúdo 2026</small></div>
        </div>
      </div>

      <div className={styles.phoneSecondary}>
        <div className={styles.phoneMedia}>
          <span>PREVIEW</span>
          <strong>TREINO<br/>DE HOJE</strong>
        </div>
        <div className={styles.phoneChecklist}>
          <span>✓ Aquecimento</span>
          <span>○ Treino principal</span>
          <span>○ Finalização</span>
        </div>
        <Link href="/login">INICIAR →</Link>
      </div>
    </div>
  );
}
