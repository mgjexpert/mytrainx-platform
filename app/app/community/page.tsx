import Link from "next/link";
import { staticMedia } from "@/lib/media-catalog";
import styles from "@/components/member-section.module.css";

export default function Page(){
  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/app">← COMMAND CENTER</Link>
      <section className={styles.communityHero} style={{backgroundImage:`url("${staticMedia.community}")`}}>
        <div className={styles.communityShade}/>
        <div className={styles.communityCopy}>
          <span>MYTRAINX COMMUNITY</span>
          <h1>TRAIN · EVOLVE ·<br/><em>BELONG.</em></h1>
          <p>
            A Community é a camada humana do ecossistema. Desafios, eventos e grupos entram aqui
            à medida que forem realmente operacionais — sem números ou calendários fictícios.
          </p>
          <div className={styles.communityActions}>
            <a href="https://wa.me/5562994091930" target="_blank" rel="noreferrer">FALAR COM A SARA →</a>
            <Link href="/events">VER EVENTS</Link>
          </div>
        </div>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}><span>RECEPTION</span><b>Sara · Concierge</b><small>Boas-vindas, orientação humana e ponte para comunidade e suporte.</small><a href="https://wa.me/5562994091930" target="_blank" rel="noreferrer">WHATSAPP →</a></article>
        <article className={styles.card}><span>COMMUNITY</span><b>Grupos & canais</b><small>Acesso será apresentado por entitlement/convite quando cada grupo estiver realmente ativo.</small></article>
        <article className={styles.card}><span>CHALLENGES</span><b>Desafios</b><small>Roadmap ligado a consistência e Progress, sem gamificação fictícia.</small></article>
        <article className={styles.card}><span>EVENTS</span><b>Lives & encontros</b><small>Calendário público apenas com datas confirmadas.</small><Link href="/events">ABRIR EVENTS →</Link></article>
        <article className={styles.card}><span>PRIVACY</span><b>Coach X é separado</b><small>Conversas privadas com o Coach X não são misturadas com espaços sociais.</small><Link href="/app/trainer">COACH X →</Link></article>
        <article className={styles.card}><span>MASTER</span><b>Premium Community</b><small>A camada Master poderá receber ativações exclusivas quando o produto estiver pronto.</small><Link href="/app/master">VER MASTER →</Link></article>
      </section>
    </main>
  );
}
