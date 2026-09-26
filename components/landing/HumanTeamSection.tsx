import Image from "next/image";
import Link from "next/link";
import { ButtonLink, Container, SectionHeading } from "@/components/ui/primitives";
import styles from "./human-team.module.css";

export function HumanTeamSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.wide}>
        <div className={styles.heading}>
          <SectionHeading eyebrow="THE TEAM">
            A EQUIPA QUE <em>IMPULSIONA A TUA EVOLUÇÃO.</em>
          </SectionHeading>
          <p>
            Tecnologia, pessoas e propósito no mesmo ecossistema: Sara na receção humana,
            Micaela no digital e suporte, Coach X no treino e especialistas por domínio.
          </p>
        </div>

        <div className={styles.banner}>
          <Image
            src="/media/v2/references/team-banner.png"
            alt="Equipa e especialistas MyTrainX"
            fill
            sizes="(max-width: 760px) 100vw, 1440px"
            className={styles.bannerImage}
          />
          <div className={styles.bannerShade}/>
          <div className={styles.bannerCopy}>
            <span>TECH + HUMAN</span>
            <strong>PESSOAS QUANDO IMPORTA.<br/><em>IA QUANDO ACELERA.</em></strong>
            <div>
              <ButtonLink href="/trainer">Conhecer Coach X →</ButtonLink>
              <a href="https://wa.me/5562994091930" target="_blank" rel="noreferrer">Falar com a Sara →</a>
            </div>
          </div>
        </div>

        <div className={styles.roles}>
          <article><span>01</span><b>SARA</b><small>Receção · Concierge · Community</small></article>
          <article><span>02</span><b>MICAELA</b><small>Digital · Store · Communication · Support</small></article>
          <article><span>03</span><b>COACH X</b><small>Personal AI Trainer · Contexto · Knowledge</small></article>
          <article><span>04</span><b>SPECIALISTS</b><small>Strength · Endurance · Transformation · Recovery</small></article>
        </div>

        <p className={styles.rule}>
          Sara acolhe. Micaela liga o digital e o suporte. <strong>Coach X conduz o treino.</strong>
          Os especialistas aprofundam cada domínio quando a experiência o exige.
        </p>
      </Container>
    </section>
  );
}
