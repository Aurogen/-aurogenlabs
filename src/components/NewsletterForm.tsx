"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-green-600/30" style={{ background: "rgba(16,185,129,0.08)" }}>
        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
        <p className="text-green-300 text-sm font-medium">You&apos;re subscribed! Welcome to the Aurogen community.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full md:w-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        required
        className="flex-1 md:w-72 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border border-blue-900/30 focus:border-blue-500 focus:outline-none"
        style={{ background: "#0A1628" }}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-xl font-bold text-white text-sm whitespace-nowrap transition-all hover:scale-105 disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}
      >
        {loading ? "..." : "SUBSCRIBE"}
      </button>
    </form>
  );
}
