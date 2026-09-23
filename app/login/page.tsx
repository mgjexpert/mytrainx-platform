import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="centerPage">
      <div className="authCard">
        <a className="brand brandStack" href="/">
          <span>MY</span><b>TRAINX</b>
        </a>
        <span className="eyebrow">ÁREA DO MEMBRO</span>
        <h1>Entre no MyTrainX</h1>
        <p>Receba um link seguro no e-mail usado na sua conta ou compra.</p>
        <LoginForm />
      </div>
    </main>
  );
}
