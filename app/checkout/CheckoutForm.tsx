"use client";

import { useEffect, useState } from "react";

type Pix = { paymentId: string; status: string; copyPaste: string; qrCodeImage?: string };

const TRACKING_KEYS = ["src","utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid","gclid","ttclid"];

export function CheckoutForm() {
  const [pix, setPix] = useState<Pix | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const [source, setSource] = useState<Record<string,string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const entries: Record<string,string> = {};
    for (const key of TRACKING_KEYS) {
      const value = params.get(key);
      if (value) entries[key] = value;
    }
    setSource(entries);
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setCopied(false);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/payments/pix", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        document: form.get("document"),
        source,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(data.error || "Não foi possível gerar o PIX agora.");
      setLoading(false);
      return;
    }
    setPix(data);
    setLoading(false);
  }

  async function copy() {
    if (!pix?.copyPaste) return;
    await navigator.clipboard.writeText(pix.copyPaste);
    setCopied(true);
  }

  return (
    <section className="payCard">
      {!pix ? (
        <form className="form" onSubmit={submit}>
          <h2>Pagamento via PIX</h2>
          <p className="payIntro">Use o mesmo e-mail que pretende usar na sua conta MyTrainX.</p>
          <label>Nome completo<input name="name" required autoComplete="name" placeholder="Seu nome"/></label>
          <label>E-mail<input name="email" type="email" required autoComplete="email" placeholder="voce@email.com"/></label>
          <label>CPF/CNPJ<input name="document" inputMode="numeric" required autoComplete="off" placeholder="Somente números"/></label>
          {error && <div className="error" role="alert">{error}</div>}
          <button className="button full" disabled={loading}>{loading ? "Gerando PIX..." : "Gerar PIX · R$ 67"}</button>
          <small>O PIX é criado pelo backend MyTrainX. O ambiente pode operar em modo de teste até as credenciais live da XPayments serem ativadas.</small>
        </form>
      ) : (
        <div className="pixBox">
          <span className="pill">PIX GERADO</span>
          <h2>Escaneie ou copie o código</h2>
          <p className="payIntro">Após a confirmação do pagamento no ambiente live, o backend associa o acesso ao e-mail informado.</p>
          {pix.qrCodeImage && <img src={pix.qrCodeImage} alt="QR Code PIX"/>}
          <textarea aria-label="PIX copia e cola" readOnly value={pix.copyPaste}/>
          <button className="button full" onClick={copy}>{copied ? "PIX copiado ✓" : "Copiar PIX"}</button>
          <small>ID: {pix.paymentId} · status: {pix.status}</small>
        </div>
      )}
    </section>
  );
}
