"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./login.module.css";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError(""); setMessage("");
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/confirm?next=/app`;
    const { error: authError } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
    if (authError) { setError(authError.message); setLoading(false); return; }
    setMessage("Enviámos um acesso seguro para o teu e-mail.");
    setLoading(false);
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <label>E-mail<input name="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@email.com" autoComplete="email"/></label>
      {error && <div className={styles.error} role="alert">{error}</div>}
      {message && <div className={styles.success}>{message}</div>}
      <button className={styles.button} disabled={loading}>{loading ? "ENVIANDO..." : "RECEBER ACESSO POR E-MAIL →"}</button>
    </form>
  );
}
