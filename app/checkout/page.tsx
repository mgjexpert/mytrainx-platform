import Link from "next/link";
import { CheckoutForm } from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="checkoutPage">
      <header className="checkoutHeader">
        <Link className="brand brandStack" href="/"><span>OPERAÇÃO</span><b>WKT</b></Link>
        <Link className="loginLink" href="/login">Já sou aluno</Link>
      </header>
      <div className="checkoutStepper" aria-label="Etapas da compra">
        <span className="active"><b>1</b> Pagamento</span><i/><span><b>2</b> Acesso</span><i/><span><b>3</b> Comece hoje</span>
      </div>
      <div className="checkoutWrap">
        <section className="checkoutOffer">
          <span className="eyebrow">ESCOLHA SEU ACESSO</span>
          <h1>Escolha sua missão.</h1>
          <div className="planGrid">
            <article className="planCard activePlan">
              <span className="planBadge">WKT MILITAR</span><small>ACESSO 21</small><h2>21 treinos guiados</h2>
              <div className="planPrice">R$ <b>67</b><sup>,00</sup></div>
              <ul><li>✓ 21 treinos completos em vídeo</li><li>✓ Área autenticada MyTrainX</li><li>✓ Acesso pelo navegador/PWA</li><li>✓ Catálogo organizado por missões</li></ul>
              <span className="planSelected">SELECIONADO</span>
            </article>
          </div>
          <div className="secureNote">PIX preparado via XPayments • a confirmação live depende da configuração do ambiente</div>
        </section>
        <section className="checkoutPayment">
          <div className="paymentTitle"><span>FORMA DE PAGAMENTO</span><b>PIX</b></div>
          <CheckoutForm />
        </section>
      </div>
    </main>
  );
}
