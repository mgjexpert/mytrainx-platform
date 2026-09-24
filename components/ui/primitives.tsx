import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import styles from "./primitives.module.css";

type Tone = "primary" | "secondary" | "quiet" | "master";
type ButtonStyle = { variant?: Tone; className?: string };

function buttonClass(variant: Tone, className = "") {
  return `${styles.button} ${styles[variant]} ${className}`;
}

export function Button({ variant = "primary", loading = false, disabled, className, children, type = "button", ...props }: ComponentProps<"button"> & ButtonStyle & { loading?: boolean }) {
  return (
    <button {...props} type={type} className={buttonClass(variant, className)} disabled={disabled || loading} aria-busy={loading || undefined}>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}

export function ButtonLink({ variant = "primary", className, children, ...props }: ComponentProps<typeof Link> & ButtonStyle) {
  return <Link {...props} className={buttonClass(variant, className)}>{children}</Link>;
}

export function Card({ className = "", ...props }: ComponentProps<"article">) {
  return <article {...props} className={`${styles.card} ${className}`} />;
}

export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return <input {...props} className={`${styles.input} ${className}`} />;
}

export function Badge({ tone = "neutral", className = "", ...props }: ComponentProps<"span"> & { tone?: "neutral" | "brand" | "success" | "warning" | "error" | "master" }) {
  return <span {...props} className={`${styles.badge} ${styles[`badge_${tone}`]} ${className}`} />;
}

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div {...props} className={`${styles.container} ${className}`} />;
}

export function SectionHeading({ eyebrow, children, id, className = "" }: { eyebrow: string; children: ReactNode; id?: string; className?: string }) {
  return <div className={`${styles.heading} ${className}`}><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{children}</h2></div>;
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className={styles.arrow}>{diagonal ? "↗" : "→"}</span>;
}
