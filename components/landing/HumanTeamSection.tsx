import styles from "./human-team.module.css";
import { Container, SectionHeading } from "@/components/ui/primitives";

export function HumanTeamSection() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <SectionHeading eyebrow="HUMAN TEAM">
            TECNOLOGIA QUANDO PRECISAS. <em>PESSOAS QUANDO IMPORTA.</em>
          </SectionHeading>
          <p>
            O MyTrainX combina inteligência digital com uma equipa humana real
            para receção, comunidade, comunicação, loja e suporte.
          </p>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <div
              className={styles.primaryVisual}
              role="img"
              aria-label="Concierge & Community da MyTrainX"
            />
            <div className={styles.body}>
              <span>CONCIERGE & COMMUNITY</span>
              <h3>Sara</h3>
              <p>
                Receção, boas-vindas, onboarding, comunidade e relação humana
                com a MyTrainX.
              </p>
              <a
                className={styles.contact}
                href="https://wa.me/5562994091930"
                target="_blank"
                rel="noreferrer"
              >
                Falar com a Sara →
              </a>
            </div>
          </article>

          <article className={styles.secondaryCard}>
            <div className={styles.identityPlaceholder} aria-hidden="true">
              <span>M</span>
              <small>DIGITAL · STORE · SUPPORT</small>
            </div>
            <div className={styles.body}>
              <span>DIGITAL · STORE · COMMUNICATION & SUPPORT</span>
              <h3>Micaela</h3>
              <p>
                Área digital, loja, campanhas, comunicação e apoio nos
                percursos de produto e acesso.
              </p>
              <div className={styles.tags}>
                <b>Digital</b>
                <b>Store</b>
                <b>Communication</b>
                <b>Support</b>
              </div>
            </div>
          </article>
        </div>

        <p className={styles.rule}>
          Sara acolhe. Micaela liga o digital, a loja e a comunicação.{" "}
          <strong>Coach X cuida do treino.</strong>
        </p>
      </Container>
    </section>
  );
}
