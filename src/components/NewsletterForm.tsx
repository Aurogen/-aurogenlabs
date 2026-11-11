"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const { t } = useLanguage();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setFailed(false);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setSubmitted(true);
      else setFailed(true);
    } catch (err) {
      console.error("Newsletter subscribe error:", err);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-green-600/30" style={{ background: "rgba(16,185,129,0.08)" }}>
        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
        <p className="text-green-300 text-sm font-medium">
          {t("You're subscribed! Welcome to the Aurogen community.", "¡Ya estás suscrito! Bienvenido a la comunidad Aurogen.")}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-auto">
    <form onSubmit={handleSubmit} className="flex gap-3 w-full md:w-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("you@email.com", "tu@email.com")}
        required
        className="flex-1 md:w-72 px-4 py-3 rounded-full text-sm text-white placeholder-gray-500 border border-white/15 focus:border-white/40 focus:outline-none"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: "#FFFFFF", color: "#111111" }}
      >
        {loading ? "..." : t("Subscribe", "Suscribirme")}
      </button>
    </form>
    {failed && (
      <p className="mt-2 text-xs" style={{ color: "#F87171" }} role="alert">
        {t("We couldn't subscribe you. Please try again.", "No pudimos suscribirte. Inténtalo de nuevo.")}
      </p>
    )}
    </div>
  );
}
