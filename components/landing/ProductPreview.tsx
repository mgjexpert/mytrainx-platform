import { Badge, Card } from "@/components/ui/primitives";
import styles from "./product-preview.module.css";

export function CoachPreview() {
  return (
    <Card className={styles.coachCard}>
      <div className={styles.previewTop}>
        <div><span className={styles.xMark}>X</span><strong>Coach X</strong></div>
        <Badge tone="brand">AI TRAINER</Badge>
      </div>
      <div className={styles.thread}>
        <p className={styles.user}>Tenho apenas 30 minutos hoje.</p>
        <div className={styles.reply}>
          <span>CONTEXTO ATUAL</span>
          <strong>Treino compacto · 28 min</strong>
          <small>Prioridade: manter o programa e reduzir volume, não reinventar a sessão.</small>
          <div className={styles.fakeActions}><b>Ver plano</b><span>Ajustar</span><span>Porquê?</span></div>
        </div>
      </div>
      <div className={styles.contextStrip}>
        <span>PROGRAMAS</span><span>PROGRESS</span><span>LIBRARY</span><span>MEMÓRIA</span>
      </div>
    </Card>
  );
}
