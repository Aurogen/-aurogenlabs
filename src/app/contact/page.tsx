"use client";

import { useState } from "react";
import { Mail, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1200);
  }

  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#000000" }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(27,107,222,0.12)" }}>
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
            CONTACT US
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
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
              <div key={label} className="p-5 rounded-2xl border border-blue-900/20" style={{ background: "#111111" }}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(27,107,222,0.1)" }}>
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">{label}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{value}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-5 rounded-2xl border border-yellow-600/20 text-xs text-yellow-400/70 leading-relaxed" style={{ background: "rgba(161,130,0,0.04)" }}>
              For research use inquiries only. We do not provide medical advice or therapeutic guidance.
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <div className="p-7 rounded-2xl border border-blue-900/20" style={{ background: "#111111" }}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(16,185,129,0.1)" }}>
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                      MESSAGE SENT
                    </h3>
                    <p className="text-gray-400 text-sm">
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
                        <label className="block text-gray-400 text-xs mb-1.5">NAME</label>
                        <input
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors"
                          style={{ background: "#050D1A" }}
                          placeholder="Dr. Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-xs mb-1.5">EMAIL</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors"
                          style={{ background: "#050D1A" }}
                          placeholder="you@research.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-xs mb-1.5">SUBJECT</label>
                      <select
                        value={form.subject}
                        onChange={(e) => set("subject", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors"
                        style={{ background: "#050D1A" }}
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
                      <label className="block text-gray-400 text-xs mb-1.5">MESSAGE</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                        style={{ background: "#050D1A" }}
                        placeholder="Describe your question or inquiry..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-4 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-opacity"
                      style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}
                    >
                      {sending ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          SENDING...
                        </>
                      ) : (
                        "SEND MESSAGE"
                      )}
                    </motion.button>
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
