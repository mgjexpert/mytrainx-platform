"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/confirm?next=/app`;

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setMessage("Enviámos um acesso seguro para o seu e-mail.");
    setLoading(false);
  }

  return (
    <form onSubmit={submit} className="form">
      <label>
        E-mail
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="voce@email.com"
          autoComplete="email"
        />
      </label>

      {error && <div className="error">{error}</div>}
      {message && <div className="authSuccess">{message}</div>}

      <button className="button full" disabled={loading}>
        {loading ? "Enviando..." : "Receber acesso por e-mail →"}
      </button>
    </form>
  );
}
