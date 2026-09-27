"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "@/app/app/trainer/trainer.module.css";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  pending?: boolean;
};

function parseJsonMessage(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const object = value as Record<string, unknown>;

  for (const key of ["text", "message", "content", "delta", "answer"]) {
    const candidate = object[key];
    if (typeof candidate === "string") return candidate;
  }

  if (object.data && typeof object.data === "object") {
    return parseJsonMessage(object.data);
  }

  return "";
}

export function CoachXComposer({ configured }: { configured: boolean }) {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = configured && !sending && message.trim().length > 0;

  const conversationLabel = useMemo(
    () => (conversationId ? `CONVERSATION · ${conversationId.slice(0, 8).toUpperCase()}` : "NEW CONVERSATION"),
    [conversationId]
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = message.trim();
    if (!configured || !text || sending) return;

    const userId = crypto.randomUUID();
    const assistantId = crypto.randomUUID();

    setMessages((current) => [
      ...current,
      { id: userId, role: "user", text },
      { id: assistantId, role: "assistant", text: "", pending: true },
    ]);
    setMessage("");
    setError(null);
    setSending(true);

    try {
      const response = await fetch("/api/coach-x", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_id: conversationId ?? undefined,
          message: text,
        }),
      });

      const responseConversation =
        response.headers.get("x-mytrainx-conversation-id") || conversationId;
      if (responseConversation) setConversationId(responseConversation);

      if (!response.ok) {
        const payload = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(payload?.error || `HTTP_${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("text/event-stream") && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let assembled = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const frames = buffer.split("\n\n");
          buffer = frames.pop() || "";

          for (const frame of frames) {
            const dataLines = frame
              .split("\n")
              .filter((line) => line.startsWith("data:"))
              .map((line) => line.slice(5).trim());

            for (const data of dataLines) {
              if (!data || data === "[DONE]") continue;

              let chunk = data;
              try {
                const parsed = JSON.parse(data);
                chunk = parseJsonMessage(parsed) || "";
                if (
                  parsed &&
                  typeof parsed === "object" &&
                  "conversation_id" in parsed &&
                  typeof (parsed as Record<string, unknown>).conversation_id === "string"
                ) {
                  setConversationId((parsed as Record<string, string>).conversation_id);
                }
              } catch {
                // Plain-text SSE payload.
              }

              if (!chunk) continue;
              assembled += chunk;
              setMessages((current) =>
                current.map((item) =>
                  item.id === assistantId
                    ? { ...item, text: assembled, pending: true }
                    : item
                )
              );
            }
          }
        }

        setMessages((current) =>
          current.map((item) =>
            item.id === assistantId
              ? {
                  ...item,
                  text: item.text || assembled || "Resposta concluída sem conteúdo textual.",
                  pending: false,
                }
              : item
          )
        );
      } else {
        const payload = await response.json().catch(() => null);
        const answer =
          parseJsonMessage(payload) ||
          (payload && typeof payload === "object" && "data" in payload
            ? parseJsonMessage((payload as Record<string, unknown>).data)
            : "") ||
          "Resposta recebida sem conteúdo textual reconhecível.";

        if (
          payload &&
          typeof payload === "object" &&
          "conversation_id" in payload &&
          typeof (payload as Record<string, unknown>).conversation_id === "string"
        ) {
          setConversationId((payload as Record<string, string>).conversation_id);
        }

        setMessages((current) =>
          current.map((item) =>
            item.id === assistantId ? { ...item, text: answer, pending: false } : item
          )
        );
      }
    } catch (caught) {
      const reason =
        caught instanceof Error ? caught.message : "COACH_X_REQUEST_FAILED";
      setError(reason);
      setMessages((current) =>
        current.map((item) =>
          item.id === assistantId
            ? {
                ...item,
                text: "Não foi possível concluir esta resposta pelo gateway.",
                pending: false,
              }
            : item
        )
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={styles.liveChat}>
      <div className={styles.liveStatus}>
        <span>{configured ? "● GATEWAY READY" : "○ GATEWAY NOT CONFIGURED"}</span>
        <small>{conversationLabel}</small>
      </div>

      {messages.length > 0 && (
        <div className={styles.liveThread} aria-live="polite">
          {messages.map((item) => (
            <div
              key={item.id}
              className={item.role === "user" ? styles.liveUser : styles.liveAssistant}
            >
              <span>{item.role === "user" ? "YOU" : "COACH X"}</span>
              <p>{item.text || (item.pending ? "…" : "")}</p>
              {item.pending && <small>STREAMING…</small>}
            </div>
          ))}
        </div>
      )}

      <form className={styles.liveComposer} onSubmit={submit}>
        <label htmlFor="coach-x-message">ASK COACH X</label>
        <div>
          <textarea
            id="coach-x-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={
              configured
                ? "Ex.: Qual é o meu treino hoje?"
                : "Configure o Atendimento.Center para ativar a conversa."
            }
            disabled={!configured || sending}
            rows={2}
          />
          <button type="submit" disabled={!canSend}>
            {sending ? "A RESPONDER…" : "ENVIAR →"}
          </button>
        </div>
        {!configured && (
          <small>
            O domínio MyTrainX está pronto; faltam as ENV do gateway do Atendimento.Center.
          </small>
        )}
        {error && <small className={styles.liveError}>Gateway: {error}</small>}
      </form>
    </div>
  );
}
