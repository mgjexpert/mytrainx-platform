import type { Metadata } from "next";
import Link from "next/link";
import { driveThumbnailUrl, workouts } from "@/lib/workouts";
import { OfferCta } from "./OfferCta";
import styles from "./oferta.module.css";

export const metadata: Metadata = {
  title: "WKT Militar | 21 treinos guiados por R$ 67",
  description: "Um programa follow-along com 21 treinos guiados. Abra a missão, dê play e treine junto. Acesso digital pelo MyTrainX.",
  openGraph: {
    title: "WKT Militar — 21 treinos guiados",
    description: "Menos tempo escolhendo exercícios. Mais tempo treinando. Conheça a Operação WKT dentro do MyTrainX.",
    type: "website",
  },
};

const heroImage = driveThumbnailUrl(workouts[0].driveFileId, 1600);
const demoImage = driveThumbnailUrl(workouts[6].driveFileId, 1400);

const faq = [
  ["O que exatamente eu compro?", "Acesso digital ao programa WKT Militar atual, com 21 sessões de treino guiadas em vídeo dentro da área do aluno MyTrainX."],
  ["Preciso de academia?", "Não necessariamente. As sessões usam exercícios variados; a possibilidade de executar cada exercício depende do seu espaço, condição física e equipamentos disponíveis. Adapte quando necessário."],
  ["É para iniciantes?", "O programa é follow-along, mas não substitui avaliação individual. Comece no seu ritmo, adapte intensidade e procure orientação profissional se tiver dúvidas sobre a sua condição para treinar."],
  ["É um curso para assistir?", "Não. A proposta é prática: abrir uma missão, dar play e acompanhar a sessão."],
  ["Quantos treinos existem?", "O catálogo atual tem 21 sessões guiadas identificadas por Alpha, Bravo, Charlie, Delta e Echo."],
  ["Como recebo o acesso?", "O fluxo de acesso usa a conta MyTrainX vinculada ao e-mail informado. A liberação após pagamento depende da confirmação do checkout."],
  ["Posso usar no celular?", "Sim. O MyTrainX é responsivo e pode ser usado no navegador do celular, tablet ou computador."],
  ["Como funciona o pagamento?", "O checkout está preparado para PIX via XPayments. Quando o modo live estiver habilitado no ambiente de produção, o PIX é criado no checkout e confirmado pelo backend."],
];

const objections = [
  ["“Não sei o que treinar.”", "O WKT reduz a decisão: você escolhe a missão e segue o vídeo."],
  ["“Começo e paro.”", "A proposta é transformar treino em sequência: uma missão de cada vez."],
  ["“Perco tempo montando ficha.”", "Aqui o treino já está estruturado em 21 sessões guiadas."],
  ["“Treinar sozinho me desanima.”", "O formato follow-along cria a sensação de estar acompanhando a sessão junto."],
];

export default function OfertaPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/"><span>MYTRAINX</span><b>WKT MILITAR</b></Link>
        <div className={styles.headerLinks}><Link href="/programas/wkt-militar">Ver programa</Link><Link href="/login">Já sou aluno</Link></div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>21 TREINOS GUIADOS · FOLLOW-ALONG · ACESSO DIGITAL</span>
          <h1>Menos tempo pensando.<br/><em>Mais tempo treinando.</em></h1>
          <p className={styles.lead}>O WKT Militar é um programa direto ao ponto: você abre a missão, dá play e acompanha o treino. Sem biblioteca infinita. Sem precisar montar a sessão do zero.</p>

          <div className={styles.valueLine}>
            <span>21 sessões guiadas</span><span>Área do aluno MyTrainX</span><span>Celular, tablet ou computador</span>
          </div>

          <OfferCta className={styles.primaryCta}>QUERO COMEÇAR POR R$ 67 <span>→</span></OfferCta>
          <small className={styles.micro}>Compra única do acesso atual · PIX no checkout · resultados variam conforme execução, rotina e condições individuais</small>
        </div>

        <div className={styles.heroVisual} style={{backgroundImage:`url("${heroImage}")`}}>
          <div className={styles.heroShade}/>
          <div className={styles.heroTag}><span>MISSÃO 01</span><b>ALPHA</b></div>
          <div className={styles.heroQuote}>ABRA A MISSÃO.<br/><strong>DÊ PLAY. FAÇA JUNTO.</strong></div>
        </div>
      </section>

      <section className={styles.trustBar}>
        <div><b>21</b><span>treinos no catálogo atual</span></div>
        <div><b>5</b><span>famílias de missão</span></div>
        <div><b>1</b><span>sequência simples de executar</span></div>
      </section>

      <section className={styles.problem}>
        <span className={styles.sectionKicker}>SE O PROBLEMA É COMEÇAR, REDUZA A FRICÇÃO</span>
        <h2>Você não precisa de mais uma pasta de vídeos.<br/>Precisa de um <em>próximo passo claro.</em></h2>
        <p>O WKT foi desenhado para encurtar a distância entre “hoje eu treino” e o treino realmente começar. A proposta é simples: missão, vídeo, execução.</p>
        <div className={styles.objections}>
          {objections.map(([q,a])=><article key={q}><b>{q}</b><p>{a}</p></article>)}
        </div>
      </section>

      <section className={styles.demo}>
        <div className={styles.demoMedia} style={{backgroundImage:`url("${demoImage}")`}}>
          <div className={styles.demoShade}/>
          <div className={styles.playerChrome}><span>MISSÃO 07 · ALPHA</span><button type="button" aria-label="Representação visual do player">▶</button><small>TREINO GUIADO · FOLLOW-ALONG</small></div>
        </div>
        <div className={styles.demoCopy}>
          <span className={styles.sectionKicker}>O PRODUTO É A EXPERIÊNCIA DE TREINO</span>
          <h2>O vídeo conduz. Você acompanha.</h2>
          <p>As sessões foram organizadas para o aluno entrar e executar, não para ficar estudando uma biblioteca antes de começar.</p>
          <ul>
            <li><span>✓</span> 21 treinos completos em vídeo</li>
            <li><span>✓</span> Missões Alpha, Bravo, Charlie, Delta e Echo</li>
            <li><span>✓</span> Player dentro da área autenticada MyTrainX</li>
            <li><span>✓</span> Navegação simples entre catálogo e treino</li>
          </ul>
          <OfferCta className={styles.secondaryCta}>QUERO ACESSAR AS 21 MISSÕES →</OfferCta>
        </div>
      </section>

      <section className={styles.how}>
        <div className={styles.sectionHead}><span className={styles.sectionKicker}>COMO FUNCIONA</span><h2>Do anúncio ao primeiro treino.</h2></div>
        <div className={styles.steps}>
          <article><span>01</span><b>Escolha começar</b><p>Você entra no checkout e informa os dados necessários para gerar o PIX.</p></article>
          <article><span>02</span><b>Confirme o acesso</b><p>O backend associa a compra ao e-mail usado no fluxo do MyTrainX.</p></article>
          <article><span>03</span><b>Entre na área do aluno</b><p>Use a sua conta MyTrainX para abrir o catálogo WKT.</p></article>
          <article><span>04</span><b>Dê play</b><p>Abra uma missão e acompanhe o treino no player.</p></article>
        </div>
      </section>

      <section className={styles.missions}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionKicker}>O QUE VOCÊ RECEBE</span>
          <h2>21 missões. Um programa.</h2>
        </div>
        <div className={styles.missionTypes}>
          <article><small>ALPHA</small><b>Base</b><p>Peito, costas, pernas e combinações variadas.</p></article>
          <article><small>BRAVO</small><b>Ritmo</b><p>Sessões com diferentes grupos musculares e intensidade.</p></article>
          <article><small>CHARLIE</small><b>Controle</b><p>Treinos de costas, pernas, abdômen e combinações.</p></article>
          <article><small>DELTA</small><b>Força</b><p>Missões focadas em peito, bíceps, costas e ombros.</p></article>
          <article><small>ECHO</small><b>Variedade</b><p>Ombros, peito, pernas, braços e panturrilhas.</p></article>
        </div>
      </section>

      <section className={styles.fit}>
        <div><span className={styles.sectionKicker}>PARA QUEM É</span><h2>Para quem quer treinar com menos decisão e mais execução.</h2></div>
        <div className={styles.fitGrid}>
          <p><span>✓</span> Prefere acompanhar uma sessão pronta em vez de montar a ficha na hora.</p>
          <p><span>✓</span> Quer um catálogo fechado e objetivo, com 21 treinos guiados.</p>
          <p><span>✓</span> Gosta de formato de missão, sequência e treino follow-along.</p>
          <p><span>✓</span> Procura acesso digital simples, inclusive pelo celular.</p>
        </div>
      </section>

      <section className={styles.notFor}>
        <div><span className={styles.sectionKicker}>NÃO É PARA TODO MUNDO</span><h2>O WKT não substitui avaliação ou prescrição individual.</h2></div>
        <p>Se você precisa de acompanhamento clínico, reabilitação, adaptação por lesão ou prescrição totalmente individualizada, procure um profissional qualificado antes de iniciar. Interrompa o exercício diante de dor, tontura ou mal-estar.</p>
      </section>

      <section className={styles.offer}>
        <div className={styles.offerTop}>
          <span className={styles.sectionKicker}>ACESSO WKT MILITAR</span>
          <h2>Comece pelas 21 missões.</h2>
          <p>Uma compra do acesso atual ao programa WKT Militar dentro do ecossistema MyTrainX.</p>
        </div>
        <div className={styles.offerCard}>
          <div className={styles.offerName}><small>MYTRAINX · WKT MILITAR</small><b>ACESSO 21</b></div>
          <div className={styles.offerPrice}><small>POR</small><span>R$</span><b>67</b><sup>,00</sup></div>
          <ul>
            <li>✓ 21 treinos completos em vídeo</li><li>✓ Área autenticada do aluno</li><li>✓ Acesso via navegador/PWA</li><li>✓ Catálogo organizado por missões</li>
          </ul>
          <OfferCta className={styles.checkoutCta}>GERAR MEU PIX →</OfferCta>
          <small className={styles.paymentNote}>PIX via checkout MyTrainX · liberação depende da confirmação do pagamento</small>
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.sectionHead}><span className={styles.sectionKicker}>DÚVIDAS FREQUENTES</span><h2>Antes de começar.</h2></div>
        <div className={styles.faqList}>{faq.map(([q,a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
      </section>

      <section className={styles.finalCta}>
        <span>WKT MILITAR · MYTRAINX</span>
        <h2>Se a missão está clara,<br/><em>começar fica mais simples.</em></h2>
        <OfferCta className={styles.primaryCta}>QUERO COMEÇAR POR R$ 67 →</OfferCta>
        <Link href="/login">Já tem acesso? Entrar na área do aluno</Link>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.brand} href="/"><span>MYTRAINX</span><b>WKT MILITAR</b></Link>
        <small>Treine dentro dos seus limites. Este programa não substitui avaliação médica ou orientação profissional individual.</small>
        <div><Link href="/login">Login</Link><Link href="/">MyTrainX</Link></div>
      </footer>

      <div className={styles.mobileBar}>
        <div><small>WKT · 21 TREINOS</small><b>R$ 67</b></div>
        <OfferCta className={styles.mobileCta}>COMEÇAR →</OfferCta>
      </div>
    </main>
  );
}
