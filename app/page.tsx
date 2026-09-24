import Link from "next/link";
import { LandingHeader } from "@/components/LandingHeader";
import { MyTrainXLogo } from "@/components/MyTrainXLogo";
import { CoachPreview, CommandCenterPreview } from "@/components/landing/ProductPreview";
import { Badge, ButtonLink, Card, Container, SectionHeading } from "@/components/ui/primitives";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import styles from "./home.module.css";

const trainingImage = driveThumbnailUrl(workouts[0].driveFileId, 1600);

const pillars = [
  ["AI TRAINER", "Orientação contextual."],
  ["PROGRAMAS", "Planos estruturados."],
  ["PERFORMANCE", "Progresso mensurável."],
  ["COMMUNITY", "Evoluir acompanhado."],
];

export default function Home() {
  return (
    <main className={styles.page}>
      <LandingHeader />

      <section className={styles.hero}>
        <Container className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>MYTRAINX · PERSONAL FITNESS OS</span>
            <h1>FIND YOUR <em>X.</em></h1>
            <h2>Treino inteligente. Evolução real.</h2>
            <p>O teu Personal AI Trainer foi pensado para conhecer os teus programas, acompanhar o teu progresso e ajudar-te a saber o que fazer a seguir.</p>
            <div className={styles.actions}>
              <ButtonLink href="/login">Começar agora <span aria-hidden="true">→</span></ButtonLink>
              <ButtonLink href="#coach-x" variant="secondary">Ver como funciona</ButtonLink>
            </div>
            <div className={styles.heroMeta}>
              <Badge tone="brand">COACH X · EM DESENVOLVIMENTO</Badge>
              <span>Programas estruturados</span>
              <span>Experiência orientada por dados</span>
            </div>
          </div>

          <div className={styles.heroVisual} style={{ backgroundImage: `url("${trainingImage}")` }}>
            <div className={styles.heroShade} />
            <div className={styles.heroStatement}>
              <small>PLAN. TRAIN. EVOLVE.</small>
              <strong>O teu próximo nível começa <em>aqui.</em></strong>
            </div>
            <div className={styles.heroFloating}>
              <span className={styles.heroX}>X</span>
              <div><small>COACH X</small><strong>Contexto. Treino. Evolução.</strong></div>
            </div>
          </div>
        </Container>
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
            <SectionHeading eyebrow="COACH X">O TEU PERSONAL <em>AI TRAINER.</em></SectionHeading>
            <p>Coach X é a inteligência central do MyTrainX. A experiência final combinará conversa, contexto de treino, ações e dados autorizados do membro — sem parecer um chatbot genérico.</p>
            <div className={styles.featureList}>
              <span>Treino e programa em contexto</span>
              <span>Orientação adaptada ao tempo disponível</span>
              <span>Progresso explicado, não apenas exibido</span>
              <span>Especialistas quando fizer sentido</span>
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
            <p>A interface liga treino, programa, progresso e Coach X numa experiência única. Os dados abaixo são deliberadamente não-numéricos até existirem fontes reais ligadas.</p>
          </div>
          <CommandCenterPreview />
        </Container>
      </section>

      <section id="programas" className={styles.section}>
        <Container>
          <div className={styles.sectionTop}>
            <SectionHeading eyebrow="PROGRAMAS">PROGRAMAS PARA <em>CADA OBJETIVO.</em></SectionHeading>
            <ButtonLink href="/programas" variant="quiet">Ver todos →</ButtonLink>
          </div>
          <div className={styles.programGrid}>
            <Link href="/programas/wkt-militar" className={styles.programPrimary} style={{ backgroundImage: `url("${trainingImage}")` }}>
              <div className={styles.programShade} />
              <Badge tone="brand">DISPONÍVEL</Badge>
              <div className={styles.programCopy}>
                <small>{workouts.length} TREINOS GUIADOS</small>
                <strong>WKT <em>MILITAR</em></strong>
                <p>O primeiro programa estruturado dentro do MyTrainX.</p>
              </div>
            </Link>
            {[
              ["HIIT PRO", "Performance e intensidade.", "EM PREPARAÇÃO"],
              ["CORE 30", "Força de core e controlo.", "EM PREPARAÇÃO"],
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
            <SectionHeading eyebrow="PROGRESSO">A TUA EVOLUÇÃO. <em>VISÍVEL.</em></SectionHeading>
            <p>O princípio do produto é simples: <strong>dado → interpretação → ação</strong>. Quando a camada de progresso estiver ligada a dados reais, Coach X poderá transformar métricas em próximos passos claros.</p>
            <Badge tone="neutral">SEM MÉTRICAS FICTÍCIAS</Badge>
          </div>
          <div className={styles.progressVisual} aria-label="Exemplo conceptual do fluxo de progresso">
            <div><small>01 · DADO</small><strong>Treino concluído</strong><span>Registo real do membro</span></div>
            <i>→</i>
            <div><small>02 · INTERPRETAÇÃO</small><strong>O que mudou?</strong><span>Contexto e tendência</span></div>
            <i>→</i>
            <div><small>03 · AÇÃO</small><strong>O próximo passo</strong><span>Recomendação útil</span></div>
          </div>
        </Container>
      </section>

      <section className={styles.saraSection}>
        <Container className={styles.saraGrid}>
          <div className={styles.saraPlaceholder} aria-label="Área reservada para fotografia aprovada da Sara">
            <span>S</span>
            <small>FOTOGRAFIA APROVADA DA SARA<br/>ASSET PENDENTE NO REPOSITÓRIO</small>
          </div>
          <div className={styles.copy}>
            <SectionHeading eyebrow="PESSOAS QUANDO IMPORTA">TECNOLOGIA QUANDO PRECISAS. <em>PESSOAS QUANDO IMPORTA.</em></SectionHeading>
            <p><strong>Sara · Concierge & Community</strong></p>
            <p>Sara é uma pessoa real e representa a camada humana do MyTrainX: receção, onboarding, planos, apoio na plataforma, comunidade e encaminhamento para o Coach X.</p>
            <blockquote>“Precisas de ajuda? Estou por aqui.”</blockquote>
            <a className={styles.whatsapp} href="https://wa.me/5562994091930" target="_blank" rel="noreferrer">Falar com a Sara no WhatsApp →</a>
          </div>
        </Container>
      </section>

      <section id="comunidade" className={styles.sectionAlt}>
        <Container className={styles.communityGrid}>
          <div className={styles.copy}>
            <SectionHeading eyebrow="COMMUNITY">MAIS QUE TREINOS. <em>UMA COMUNIDADE.</em></SectionHeading>
            <p>Grupos, desafios, eventos e interação entre membros fazem parte da visão MyTrainX. Esta área permanece em preparação e não apresenta contagens ou resultados sem fonte real.</p>
            <ButtonLink href="/community" variant="secondary">Explorar a visão de comunidade →</ButtonLink>
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
            <p>O espaço premium do ecossistema para futuros conteúdos, programas avançados, eventos e benefícios. A oferta final será publicada apenas quando os benefícios estiverem validados.</p>
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
          <h2>PRONTO PARA ENCONTRAR O TEU <em>X?</em></h2>
          <p>Treino inteligente. Acompanhamento real. Uma plataforma construída para evoluir contigo.</p>
          <div className={styles.actions}>
            <ButtonLink href="/login">Começar agora →</ButtonLink>
            <ButtonLink href="/programas" variant="secondary">Ver programas</ButtonLink>
          </div>
        </Container>
      </section>

      <footer className={styles.footer}>
        <Container className={styles.footerInner}>
          <div><MyTrainXLogo /><small>FIND YOUR X.</small></div>
          <nav aria-label="Rodapé">
            <Link href="/programas">Programas</Link>
            <Link href="/trainer">Coach X</Link>
            <Link href="/community">Comunidade</Link>
            <Link href="/master">Master</Link>
          </nav>
          <span>TRAIN · EVOLVE · BELONG</span>
        </Container>
      </footer>
    </main>
  );
}
