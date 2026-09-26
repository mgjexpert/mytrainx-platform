import Link from "next/link";
import { MyTrainXLogo } from "@/components/MyTrainXLogo";
import styles from "@/components/public-sections.module.css";

export function PublicHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" aria-label="MyTrainX — início"><MyTrainXLogo /></Link>
      <nav>
        <Link href="/trainer">Coach X</Link>
        <Link href="/programas">Programas</Link>
        <Link href="/library">Library</Link>
        <Link href="/community">Comunidade</Link>
        <Link href="/master">Master</Link>
        <Link href="/login">Entrar</Link>
      </nav>
    </header>
  );
}
