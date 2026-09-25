import Link from "next/link";
import { MyTrainXLogo } from "@/components/MyTrainXLogo";
import styles from "@/components/public-sections.module.css";

export function PublicHeader() {
  return (
    <header className={styles.header}>
      <Link href="/"><MyTrainXLogo /></Link>
      <nav>
        <Link href="/trainer">Trainer</Link>
        <Link href="/programas">Programs</Link>
        <Link href="/library">Library</Link>
        <Link href="/master">Master</Link>
        <Link href="/community">Community</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}
