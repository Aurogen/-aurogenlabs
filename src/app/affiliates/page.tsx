"use client";

import { useState } from "react";
import { TrendingUp, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

const INPUT_STYLE = {
  background: "#FFFFFF",
  border: "1px solid rgba(0,0,0,0.12)",
  color: "#1D1D1F",
};
const INPUT_CLASS =
  "w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors focus:border-black/30";
const LABEL_CLASS = "block text-xs font-semibold tracking-[0.08em] uppercase mb-1.5";
const LABEL_STYLE = { color: "#9E9EA8" };

const TIERS = [
  { name: "Researcher", commission: "10%", req: "1–5 sales / mo" },
  { name: "Associate",  commission: "15%", req: "6–20 sales / mo" },
  { name: "Elite",      commission: "20%", req: "20+ sales / mo" },
];

export default function AffiliatesPage() {
  const [form, setForm] = useState({ name: "", email: "", website: "", audience: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/affiliates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F6F6F8" }}>
        <div className="text-center max-w-md">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(27,122,69,0.08)", border: "1px solid rgba(27,122,69,0.15)" }}
          >
            <CheckCircle className="w-7 h-7" style={{ color: "#1B7A45" }} />
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: "#1D1D1F" }}>Application Received</h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#6E6E73" }}>
            Thank you for applying! Our team will review your application and get back to you within 2–3 business days.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white"
            style={{ background: "#1D1D1F" }}
          >
            Browse Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F6F6F8" }}>

      {/* Hero */}
      <div className="py-20 px-4 text-center" style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(27,122,69,0.08)", color: "#1B7A45" }}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Earn up to 20% commission
          </div>
          <h1
            className="text-5xl font-bold mb-4"
            style={{ color: "#1D1D1F", fontFamily: "var(--font-heading, sans-serif)" }}
          >
            Affiliate Program
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#6E6E73" }}>
            Partner with Aurogen Labs and earn commissions recommending premium research compounds to your audience.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">

        {/* Commission tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              className="p-6 rounded-2xl text-center"
              style={{
                background: "#FFFFFF",
                border: i === 2 ? "2px solid #1B7A45" : "1px solid rgba(0,0,0,0.08)",
              }}
            >
              {i === 2 && (
                <div className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-3" style={{ background: "rgba(27,122,69,0.10)", color: "#1B7A45" }}>
                  Top Tier
                </div>
              )}
              <p className="font-bold text-lg mb-1" style={{ color: "#1D1D1F" }}>{tier.name}</p>
              <p className="text-4xl font-bold mb-2" style={{ color: "#1B7A45" }}>{tier.commission}</p>
              <p className="text-xs" style={{ color: "#9E9EA8" }}>{tier.req}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Benefits */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-5" style={{ color: "#1D1D1F", fontFamily: "var(--font-heading, sans-serif)" }}>
              Why partner with us?
            </h2>
            <div className="space-y-4">
              {[
                ["Real-time tracking", "Monitor clicks, conversions, and commissions in your personal dashboard."],
                ["Unique referral link", "Your own branded link — share it anywhere, no manual codes needed."],
                ["Monthly payouts", "Commissions are calculated monthly and paid out reliably."],
                ["Dedicated support", "Our affiliate team is available to help you succeed."],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-3">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#1B7A45" }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#1D1D1F" }}>{title}</p>
                    <p className="text-xs leading-relaxed mt-0.5" style={{ color: "#6E6E73" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application form */}
          <div className="lg:col-span-3">
            <div
              className="p-8 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ color: "#1D1D1F", fontFamily: "var(--font-heading, sans-serif)" }}>
                Apply Now
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL_CLASS} style={LABEL_STYLE}>Full Name *</label>
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className={INPUT_CLASS} style={INPUT_STYLE}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} style={LABEL_STYLE}>Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={INPUT_CLASS} style={INPUT_STYLE}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={LABEL_CLASS} style={LABEL_STYLE}>Website / Social Profile</label>
                  <input
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                    className={INPUT_CLASS} style={INPUT_STYLE}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className={LABEL_CLASS} style={LABEL_STYLE}>Your Audience</label>
                  <input
                    value={form.audience}
                    onChange={(e) => set("audience", e.target.value)}
                    className={INPUT_CLASS} style={INPUT_STYLE}
                    placeholder="e.g. researchers, bodybuilders, physicians, 10k followers"
                  />
                </div>

                <div>
                  <label className={LABEL_CLASS} style={LABEL_STYLE}>Tell us about yourself</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className={`${INPUT_CLASS} resize-none`}
                    style={INPUT_STYLE}
                    rows={4}
                    placeholder="Why do you want to partner with Aurogen Labs? How do you plan to promote our products?"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs" style={{ color: "#C0392B" }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!form.name || !form.email || status === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-sm text-white transition-opacity disabled:opacity-40"
                  style={{ background: "#1D1D1F" }}
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  {status === "loading" ? "Submitting…" : "Submit Application"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
