import Link from "next/link";
import { MyTrainXLogo } from "@/components/MyTrainXLogo";
import { ButtonLink } from "@/components/ui/primitives";
import styles from "./landing-header.module.css";

const links = [
  { href: "/", label: "Início", active: true },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#programas", label: "Programas" },
  { href: "/library", label: "Library" },
  { href: "#comunidade", label: "Comunidade" },
];

export function LandingHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" aria-label="MyTrainX — início" className={styles.logo}><MyTrainXLogo /></Link>
        <nav className={styles.nav} aria-label="Navegação principal">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={item.active ? styles.active : undefined}>{item.label}</Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <span className={styles.locale}>◎ PT⌄</span>
          <ButtonLink href="/login" variant="secondary" className={styles.login}>Entrar</ButtonLink>
          <ButtonLink href="/login" className={styles.start}>Começar agora →</ButtonLink>
        </div>
      </div>
    </header>
  );
}
