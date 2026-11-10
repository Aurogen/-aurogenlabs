"use client";

import { useState } from "react";
import { Mail, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const INPUT_STYLE = {
  background: "#FFFFFF",
  border: "1px solid rgba(0,0,0,0.12)",
  color: "#1D1D1F",
};
const INPUT_CLASS = "w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors";
const LABEL_CLASS = "block text-xs font-semibold tracking-[0.08em] uppercase mb-1.5";
const LABEL_STYLE = { color: "#9E9EA8" };

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      alert(t("Error sending message. Please try again.", "Error al enviar el mensaje. Inténtalo de nuevo."));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#F6F6F8" }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.18)" }}
            >
              <Mail className="w-5 h-5" style={{ color: "#6B7A8D" }} />
            </div>
          </div>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            {t("Contact Us", "Contáctanos")}
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "#6E6E73" }}>
            {t(
              "Have a question about our compounds, an order, or a research inquiry? We're here to help.",
              "¿Tienes una pregunta sobre nuestros compuestos, un pedido o una consulta de investigación? Estamos para ayudarte.",
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Info cards */}
          <div className="space-y-4">
            {[
              { icon: MessageSquare, label: t("General Inquiries", "Consultas generales"), value: t("Use the form to reach our team", "Usa el formulario para contactar a nuestro equipo") },
              { icon: Clock, label: t("Response Time", "Tiempo de respuesta"), value: t("Within 1–2 business days", "En 1–2 días hábiles") },
              { icon: Mail, label: t("Order Support", "Soporte de pedidos"), value: t("Reference your order number", "Indica tu número de pedido") },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="p-5 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.15)" }}
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
              style={{ background: "rgba(10,132,255,0.04)", border: "1px solid rgba(10,132,255,0.15)", color: "#0A84FF" }}
            >
              {t(
                "For research use inquiries only. We do not provide medical advice or therapeutic guidance.",
                "Solo para consultas sobre uso en investigación. No brindamos consejo médico ni orientación terapéutica.",
              )}
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
                      {t("Message Sent", "Mensaje enviado")}
                    </h3>
                    <p className="text-sm" style={{ color: "#6E6E73" }}>
                      {t("We'll get back to you within 1–2 business days.", "Te responderemos en 1–2 días hábiles.")}
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
                        <label className={LABEL_CLASS} style={LABEL_STYLE}>{t("Name", "Nombre")}</label>
                        <input value={form.name} onChange={(e) => set("name", e.target.value)} required className={INPUT_CLASS} style={INPUT_STYLE} placeholder={t("Dr. Smith", "Dra. Pérez")} />
                      </div>
                      <div>
                        <label className={LABEL_CLASS} style={LABEL_STYLE}>{t("Email", "Correo electrónico")}</label>
                        <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className={INPUT_CLASS} style={INPUT_STYLE} placeholder={t("you@research.com", "tu@research.com")} />
                      </div>
                    </div>

                    <div>
                      <label className={LABEL_CLASS} style={LABEL_STYLE}>{t("Subject", "Asunto")}</label>
                      <select
                        value={form.subject}
                        onChange={(e) => set("subject", e.target.value)}
                        className={INPUT_CLASS}
                        style={INPUT_STYLE}
                      >
                        <option value="">{t("Select a topic", "Elige un tema")}</option>
                        <option value="Order Inquiry">{t("Order Inquiry", "Consulta sobre un pedido")}</option>
                        <option value="Product Information">{t("Product Information", "Información de producto")}</option>
                        <option value="Research Question">{t("Research Question", "Pregunta de investigación")}</option>
                        <option value="Quality / COA">{t("Quality / COA", "Calidad / COA")}</option>
                        <option value="Affiliate Program">{t("Affiliate Program", "Programa de afiliados")}</option>
                        <option value="Other">{t("Other", "Otro")}</option>
                      </select>
                    </div>

                    <div>
                      <label className={LABEL_CLASS} style={LABEL_STYLE}>{t("Message", "Mensaje")}</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        required
                        rows={5}
                        className={INPUT_CLASS + " resize-none"}
                        style={INPUT_STYLE}
                        placeholder={t("Describe your question or inquiry...", "Describe tu pregunta o consulta...")}
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
                          {t("Sending…", "Enviando…")}
                        </>
                      ) : (
                        t("Send Message", "Enviar mensaje")
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
