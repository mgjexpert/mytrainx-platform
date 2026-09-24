import { Badge, Card } from "@/components/ui/primitives";
import styles from "./product-preview.module.css";

export function CoachPreview() {
  return (
    <Card className={styles.coachCard}>
      <div className={styles.previewTop}>
        <div><span className={styles.xMark}>X</span><strong>Coach X</strong></div>
        <Badge tone="brand">PRÉVIA · EM DESENVOLVIMENTO</Badge>
      </div>
      <div className={styles.thread}>
        <p className={styles.user}>Tenho apenas 30 minutos hoje.</p>
        <div className={styles.reply}>
          <span>Treino recomendado</span>
          <strong>28 min · Upper Body</strong>
          <small>6 exercícios · intensidade ajustada</small>
          <div className={styles.fakeActions}><b>Começar treino</b><span>Ajustar</span><span>Ver porquê</span></div>
        </div>
      </div>
    </Card>
  );
}

export function CommandCenterPreview() {
  return (
    <div className={styles.command}>
      <div className={styles.commandHead}>
        <div><small>MYTRAINX</small><strong>O TEU DIA.</strong></div>
        <Badge tone="neutral">DEMONSTRAÇÃO DE INTERFACE</Badge>
      </div>
      <div className={styles.commandGrid}>
        <Card className={styles.training}><small>TREINO</small><strong>O próximo passo, sempre claro.</strong><p>O treino do dia será apresentado aqui quando os dados do membro estiverem ligados.</p></Card>
        <Card><small>PROGRESSO</small><strong>Dados com contexto.</strong><p>Métricas reais entram apenas quando a camada de progresso estiver operacional.</p></Card>
        <Card><small>PROGRAMA ATIVO</small><strong>WKT Militar</strong><p>21 treinos guiados verificados no catálogo atual.</p></Card>
        <Card><small>COACH X</small><strong>Recomendação contextual.</strong><p>Integração completa com Atendimento.Center é uma próxima etapa.</p></Card>
      </div>
    </div>
  );
}
