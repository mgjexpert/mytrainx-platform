"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./member-shell.module.css";

const items = [
  { href: "/app", icon: "⌂", label: "Home", exact: true },
  { href: "/app/hoje", icon: "◷", label: "Hoje" },
  { href: "/app/trainer", icon: "✦", label: "Coach X" },
  { href: "/app/programas", icon: "▣", label: "Programas" },
  { href: "/app/performance", icon: "▥", label: "Progress" },
  { href: "/app/library", icon: "▤", label: "Conteúdos" },
  { href: "/app/community", icon: "◎", label: "Comunidade" },
  { href: "/app/master", icon: "♛", label: "Master" },
  { href: "/app/profile", icon: "♙", label: "Perfil" },
];

export function MemberNav() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav} aria-label="MyTrainX member navigation">
      {items.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={active ? styles.active : undefined}>
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
