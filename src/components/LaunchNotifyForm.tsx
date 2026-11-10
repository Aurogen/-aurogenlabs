"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/** "Tell me when it launches": signs the visitor up to the newsletter, which announces new lines. */
export default function LaunchNotifyForm({ label, label_es }: { label: string; label_es?: string }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setState("error");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="flex items-center justify-center sm:justify-start gap-2 text-sm font-medium" style={{ color: "#1B7A45" }}>
        <CheckCircle2 className="w-4 h-4" />{" "}
        {t("You're on the list. We'll email you at launch.", "Ya estás en la lista. Te escribiremos cuando salga.")}
      </p>
    );
  }

  return (
    <div className="w-full sm:max-w-md">
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 w-full">
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
        placeholder={t("you@email.com", "tu@email.com")}
        aria-label={t(`Email for ${label} launch`, `Correo para el lanzamiento de ${label_es ?? label}`)}
        className="flex-1 h-11 px-4 rounded-full text-sm outline-none"
        style={{ background: "#FFFFFF", border: `1px solid ${state === "error" ? "#C0392B" : "rgba(0,0,0,0.15)"}`, color: "#111111" }}
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="h-11 px-6 rounded-full text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: "#111111", color: "#FFFFFF" }}
      >
        {state === "sending" ? t("Saving…", "Guardando…") : t("Notify me", "Avísame")}
      </button>
    </form>
    {state === "error" && (
      <p className="mt-2 text-xs text-center sm:text-left" style={{ color: "#C0392B" }} role="alert">
        {t("Check your email address and try again.", "Revisa tu correo e inténtalo de nuevo.")}
      </p>
    )}
    </div>
  );
}
