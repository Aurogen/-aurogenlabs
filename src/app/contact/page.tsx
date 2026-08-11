"use client";

import { useState } from "react";
import { Mail, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INPUT_STYLE = {
  background: "#FFFFFF",
  border: "1px solid rgba(0,0,0,0.12)",
  color: "#1D1D1F",
};
const INPUT_CLASS = "w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors";
const LABEL_CLASS = "block text-xs font-semibold tracking-[0.08em] uppercase mb-1.5";
const LABEL_STYLE = { color: "#9E9EA8" };

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  }

  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#F6F6F8" }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.18)" }}
            >
              <Mail className="w-5 h-5" style={{ color: "#6B7A8D" }} />
            </div>
          </div>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Contact Us
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "#6E6E73" }}>
            Have a question about our compounds, an order, or a research inquiry? We&apos;re here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Info cards */}
          <div className="space-y-4">
            {[
              { icon: MessageSquare, label: "General Inquiries", value: "Use the form to reach our team" },
              { icon: Clock, label: "Response Time", value: "Within 1–2 business days" },
              { icon: Mail, label: "Order Support", value: "Reference your order number" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="p-5 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.15)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "#6B7A8D" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5" style={{ color: "#1D1D1F" }}>{label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#6E6E73" }}>{value}</p>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="p-4 rounded-xl text-xs leading-relaxed"
              style={{ background: "rgba(201,146,42,0.04)", border: "1px solid rgba(201,146,42,0.15)", color: "#A07520" }}
            >
              For research use inquiries only. We do not provide medical advice or therapeutic guidance.
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <div
              className="p-7 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                      style={{ background: "rgba(27,122,69,0.08)", border: "1.5px solid rgba(27,122,69,0.25)" }}
                    >
                      <CheckCircle className="w-8 h-8" style={{ color: "#1B7A45" }} />
                    </div>
                    <h3
                      className="font-bold text-xl mb-2"
                      style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                    >
                      Message Sent
                    </h3>
                    <p className="text-sm" style={{ color: "#6E6E73" }}>
                      We&apos;ll get back to you within 1–2 business days.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={LABEL_CLASS} style={LABEL_STYLE}>Name</label>
                        <input value={form.name} onChange={(e) => set("name", e.target.value)} required className={INPUT_CLASS} style={INPUT_STYLE} placeholder="Dr. Smith" />
                      </div>
                      <div>
                        <label className={LABEL_CLASS} style={LABEL_STYLE}>Email</label>
                        <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className={INPUT_CLASS} style={INPUT_STYLE} placeholder="you@research.com" />
                      </div>
                    </div>

                    <div>
                      <label className={LABEL_CLASS} style={LABEL_STYLE}>Subject</label>
                      <select
                        value={form.subject}
                        onChange={(e) => set("subject", e.target.value)}
                        className={INPUT_CLASS}
                        style={INPUT_STYLE}
                      >
                        <option value="">Select a topic</option>
                        <option>Order Inquiry</option>
                        <option>Product Information</option>
                        <option>Research Question</option>
                        <option>Quality / COA</option>
                        <option>Affiliate Program</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className={LABEL_CLASS} style={LABEL_STYLE}>Message</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        required
                        rows={5}
                        className={INPUT_CLASS + " resize-none"}
                        style={INPUT_STYLE}
                        placeholder="Describe your question or inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-4 rounded-full font-semibold text-white text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-85"
                      style={{ background: sending ? "rgba(0,0,0,0.2)" : "#1D1D1F" }}
                    >
                      {sending ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
