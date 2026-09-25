import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckoutForm } from "./CheckoutForm";
import { formatPrice, getActiveProduct } from "@/lib/domain/products";

export default async function CheckoutPage() {
  const product = await getActiveProduct("wkt-militar");
  if (!product?.price_cents) notFound();

  const priceLabel = formatPrice(product.price_cents, product.currency);
  const live =
    process.env.XPAYMENTS_MODE === "live" &&
    Boolean(process.env.XPAYMENTS_API_KEY);

  return (
    <main className="checkoutPage">
      <header className="checkoutHeader">
        <Link className="brand brandStack" href="/">
          <span>MYTRAINX</span><b>WKT MILITAR</b>
        </Link>
        <Link className="loginLink" href="/login">Já sou aluno</Link>
      </header>

      <div className="checkoutStepper" aria-label="Etapas da compra">
        <span className="active"><b>1</b> Pagamento</span>
        <i/>
        <span><b>2</b> Acesso</span>
        <i/>
        <span><b>3</b> Primeiro treino</span>
      </div>

      <div className="checkoutWrap">
        <section className="checkoutOffer">
          <span className="eyebrow">WKT MILITAR</span>
          <h1>21 treinos guiados.</h1>
          <div className="planGrid">
            <article className="planCard activePlan">
              <span className="planBadge">ACESSO ATUAL</span>
              <small>WKT MILITAR</small>
              <h2>21 sessões follow-along</h2>
              <div className="planPrice">{priceLabel}</div>
              <ul>
                <li>✓ 21 treinos em vídeo</li>
                <li>✓ Área autenticada MyTrainX</li>
                <li>✓ Catálogo organizado por missões</li>
                <li>✓ Acesso pelo navegador/PWA</li>
              </ul>
              <span className="planSelected">SELECIONADO</span>
            </article>
          </div>
          <div className="secureNote">
            {live
              ? "PIX criado pelo backend MyTrainX via XPayments"
              : "PIX automático ainda em ativação — atendimento assistido disponível"}
          </div>
        </section>

        <section className="checkoutPayment">
          <div className="paymentTitle"><span>FORMA DE PAGAMENTO</span><b>PIX</b></div>
          <CheckoutForm priceLabel={priceLabel} live={live} />
        </section>
      </div>
    </main>
  );
}
