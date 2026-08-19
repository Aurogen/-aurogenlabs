"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { X, Bell, Mail, Phone, CheckCircle2 } from "lucide-react";

interface Props {
  productName: string;
  onClose: () => void;
}

export default function NotifyModal({ productName, onClose }: Props) {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress ?? "";

  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, product_name: productName }),
      });
    } catch (err) {
      console.error("Waitlist error:", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#161616", border: "1px solid rgba(10,132,255,0.2)" }}
      >
        <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #6B7A8D, transparent)" }} />

        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(10,132,255,0.1)", border: "1px solid rgba(10,132,255,0.2)" }}
                >
                  <Bell className="w-6 h-6" style={{ color: "#6B7A8D" }} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                    NOTIFY ME
                  </h3>
                  <p className="text-gray-400 text-sm">When back in stock</p>
                </div>
              </div>

              <div
                className="mb-5 p-3 rounded-xl"
                style={{ background: "rgba(10,132,255,0.05)", border: "1px solid rgba(10,132,255,0.15)" }}
              >
                <p className="text-sm text-center font-medium" style={{ color: "#6B7A8D" }}>{productName}</p>
                <p className="text-gray-500 text-xs text-center mt-0.5">Out of stock · Restock estimated soon</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">EMAIL *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => !userEmail && setEmail(e.target.value)}
                      readOnly={!!userEmail}
                      placeholder="you@email.com"
                      required
                      className="w-full pl-10 pr-20 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                      style={{
                        background: "#222222",
                        border: "1px solid rgba(10,132,255,0.25)",
                        cursor: userEmail ? "default" : "text",
                      }}
                    />
                    {userEmail && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] tracking-wide font-medium" style={{ color: "#6B7A8D" }}>
                        AUTO-FILLED
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">
                    PHONE <span className="text-gray-600">(optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                      style={{ background: "#222222", border: "1px solid rgba(10,132,255,0.15)" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #6B7A8D, #0A84FF)" }}
                >
                  {loading ? "Registering..." : "Notify me when available"}
                </button>
              </form>

              <p className="text-gray-600 text-xs text-center mt-4">
                No spam. We&apos;ll only reach out when this item is restocked.
              </p>
            </>
          ) : (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: "#6B7A8D" }} />
              <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                You&apos;re on the list!
              </h3>
              <p className="text-gray-400 text-sm mb-1">
                We&apos;ll email you as soon as{" "}
                <span className="font-medium" style={{ color: "#6B7A8D" }}>{productName}</span>{" "}
                is back in stock.
              </p>
              <p className="text-gray-500 text-xs mb-6">Check your inbox to confirm your notification.</p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white border transition-colors hover:border-white/20"
                style={{ borderColor: "rgba(10,132,255,0.3)" }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
