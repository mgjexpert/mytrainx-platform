import Link from "next/link";
import { notFound } from "next/navigation";
import { MyTrainXLogo } from "@/components/MyTrainXLogo";
import { CheckoutForm } from "./CheckoutForm";
import { formatPrice, getActiveProduct } from "@/lib/domain/products";
import { mediaFor } from "@/lib/media-catalog";
import styles from "./checkout.module.css";

export default async function CheckoutPage() {
  const product = await getActiveProduct("wkt-militar");
  if (!product?.price_cents) notFound();
  const priceLabel = formatPrice(product.price_cents, product.currency);
  const live = process.env.XPAYMENTS_MODE === "live" && Boolean(process.env.XPAYMENTS_API_KEY);

  return (
    <main className={styles.page}>
      <header className={styles.header}><Link href="/"><MyTrainXLogo /></Link><Link href="/login">JÁ SOU MEMBRO →</Link></header>
      <div className={styles.stepper} aria-label="Etapas da compra"><span className={styles.active}><b>1</b>Pagamento</span><i/><span><b>2</b>Acesso</span><i/><span><b>3</b>Primeiro treino</span></div>
      <div className={styles.wrap}>
        <section className={styles.offer} style={{ backgroundImage: `linear-gradient(90deg,#090d10f4 0,#090d10e8 48%,#090d10bd), url("${mediaFor("programWkt",1400)}")` }}>
          <span>WKT MILITAR · ACCESS</span>
          <h1>21 missões.<br/>Um próximo passo.</h1>
          <article className={styles.plan}>
            <div className={styles.planTop}><span>● PRODUTO ATIVO</span><small>Compra única do acesso atual</small></div>
            <h2>WKT Militar · 21 sessões follow-along</h2>
            <div className={styles.price}>{priceLabel}</div>
            <ul><li>21 treinos completos em vídeo</li><li>Área autenticada MyTrainX</li><li>Catálogo organizado por missões</li><li>Acesso via navegador/PWA</li></ul>
            <span className={styles.selected}>SELECIONADO · ENTITLEMENT APÓS CONFIRMAÇÃO</span>
          </article>
          <div className={styles.secure}>{live ? "PIX criado pelo backend MyTrainX via XPayments. O acesso depende da confirmação do pagamento." : "PIX automático ainda em ativação. Nenhuma cobrança de teste é apresentada; o atendimento assistido permanece disponível."}</div>
        </section>
        <section className={styles.payment}>
          <div className={styles.paymentTitle}><span>FORMA DE PAGAMENTO</span><b>PIX</b></div>
          <CheckoutForm priceLabel={priceLabel} live={live} />
        </section>
      </div>
    </main>
  );
}
