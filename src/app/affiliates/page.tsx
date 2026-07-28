"use client";

import { useState } from "react";
import { DollarSign, Users, Link2, BarChart3, CheckCircle2, ArrowRight, Copy, Check } from "lucide-react";

const TIERS = [
  {
    name: "Researcher",
    commission: "10%",
    sales: "$0 - $999/mo",
    color: "#4DA3FF",
    perks: ["Personal referral link", "Monthly payouts", "Email support", "Dashboard access"],
  },
  {
    name: "Associate",
    commission: "15%",
    sales: "$1,000 - $4,999/mo",
    color: "#1B6BDE",
    perks: ["Everything in Researcher", "Priority support", "Dedicated manager", "Custom coupon code"],
    popular: true,
  },
  {
    name: "Elite",
    commission: "20%",
    sales: "$5,000+/mo",
    color: "#6BB4FF",
    perks: ["Everything in Associate", "Bi-weekly payouts", "Co-branding opportunities", "VIP product access"],
  },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Aplica y regístrate", desc: "Completa el formulario de solicitud. Revisamos tu perfil en 24-48 hrs." },
  { step: "2", title: "Obtén tu link único", desc: "Recibes tu enlace de afiliado personalizado y código de descuento exclusivo." },
  { step: "3", title: "Comparte y gana", desc: "Promociona entre tu audiencia investigadora. Por cada venta referida, ganas comisión." },
  { step: "4", title: "Cobra tu comisión", desc: "Pagos vía PayPal, transferencia bancaria o crypto al alcanzar el umbral mínimo." },
];

export default function AffiliatesPage() {
  const [form, setForm] = useState({ name: "", email: "", website: "", audience: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  function copyDemo() {
    navigator.clipboard.writeText("https://aurogenlabs.com/ref/yourid");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen" style={{ background: "#020810" }}>
      {/* Hero */}
      <div
        className="relative py-20 px-4 text-center overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0A1628, #020810)",
          borderBottom: "1px solid rgba(27, 107, 222, 0.15)",
        }}
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(27,107,222,1) 1px, transparent 1px), linear-gradient(90deg, rgba(27,107,222,1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-blue-400 text-xs font-medium tracking-[0.3em] uppercase mb-4">Partner with us</p>
          <h1
            className="text-white text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading, sans-serif)" }}
          >
            PROGRAMA DE<br />
            <span style={{ background: "linear-gradient(90deg, #4DA3FF, #1B6BDE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              AFILIADOS
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Gana hasta <span className="text-blue-300 font-bold">20% de comisión</span> por cada venta que refieras.
            Únete a nuestra red de investigadores y referidores de confianza.
          </p>
          <a href="#apply" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}>
            Aplicar Ahora <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: DollarSign, value: "20%", label: "Comisión máxima" },
            { icon: Users, value: "500+", label: "Afiliados activos" },
            { icon: Link2, value: "Instant", label: "Link generado" },
            { icon: BarChart3, value: "30 días", label: "Ventana de cookies" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center p-6 rounded-2xl border border-blue-600/15" style={{ background: "#0A1628" }}>
              <Icon className="w-6 h-6 text-blue-400 mx-auto mb-3" />
              <p className="text-white font-bold text-2xl mb-1" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>{value}</p>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-white text-4xl font-bold" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>CÓMO FUNCIONA</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="p-6 rounded-2xl border border-blue-900/20 relative" style={{ background: "#0A1628" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 font-bold text-white text-lg" style={{ background: "rgba(27, 107, 222, 0.2)" }}>
                  {step.step}
                </div>
                <h3 className="text-white font-bold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Link demo */}
        <div className="p-6 rounded-2xl border border-blue-600/20" style={{ background: "rgba(27, 107, 222, 0.04)" }}>
          <p className="text-gray-400 text-sm mb-3">Tu link de afiliado se verá así:</p>
          <div className="flex items-center gap-3">
            <code className="flex-1 text-blue-300 text-sm px-4 py-3 rounded-xl border border-blue-900/30" style={{ background: "#050D1A" }}>
              https://aurogenlabs.com/ref/<span className="text-blue-400 font-bold">yourid</span>
            </code>
            <button onClick={copyDemo} className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-white border border-blue-600/30 hover:border-blue-400 transition-all">
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
        </div>

        {/* Tiers */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-white text-4xl font-bold" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>NIVELES DE COMISIÓN</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className="relative p-6 rounded-2xl border transition-all"
                style={{
                  background: tier.popular ? "rgba(27, 107, 222, 0.08)" : "#0A1628",
                  borderColor: tier.popular ? tier.color : "rgba(27, 107, 222, 0.15)",
                  boxShadow: tier.popular ? "0 0 30px rgba(27, 107, 222, 0.15)" : "none",
                }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-bold text-white" style={{ background: "#1B6BDE" }}>MOST POPULAR</span>
                  </div>
                )}
                <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: "var(--font-heading, sans-serif)", color: tier.color }}>{tier.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{tier.sales} in referred sales</p>
                <p className="font-bold mb-6" style={{ color: tier.color, fontSize: "3rem", fontFamily: "var(--font-heading, sans-serif)", lineHeight: 1 }}>
                  {tier.commission}
                  <span className="text-base font-normal text-gray-400 ml-1">commission</span>
                </p>
                <ul className="space-y-2.5">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: tier.color }} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Application form */}
        <div id="apply">
          <div className="text-center mb-10">
            <h2 className="text-white text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>SOLICITUD DE AFILIADO</h2>
            <p className="text-gray-500">Completa el formulario y nuestro equipo se pondrá en contacto en 24-48 horas</p>
          </div>

          {!submitted ? (
            <div className="max-w-2xl mx-auto p-8 rounded-2xl border border-blue-900/20" style={{ background: "#0A1628" }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">NOMBRE COMPLETO *</label>
                    <input required name="name" value={form.name} onChange={handleChange} type="text" placeholder="Dr. John Smith" className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border border-blue-900/30 focus:border-blue-500 focus:outline-none" style={{ background: "#050D1A" }} />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">EMAIL *</label>
                    <input required name="email" value={form.email} onChange={handleChange} type="email" placeholder="tu@email.com" className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border border-blue-900/30 focus:border-blue-500 focus:outline-none" style={{ background: "#050D1A" }} />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">SITIO WEB / REDES SOCIALES</label>
                  <input name="website" value={form.website} onChange={handleChange} type="url" placeholder="https://tuwebsite.com o @tuinstagram" className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border border-blue-900/30 focus:border-blue-500 focus:outline-none" style={{ background: "#050D1A" }} />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">TIPO DE AUDIENCIA *</label>
                  <select required name="audience" value={form.audience} onChange={handleChange} className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none appearance-none" style={{ background: "#050D1A" }}>
                    <option value="">Selecciona una opción...</option>
                    <option>Investigadores y científicos</option>
                    <option>Comunidad fitness / bodybuilding</option>
                    <option>Profesionales de salud</option>
                    <option>Blog / Influencer</option>
                    <option>Laboratorio o institución</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">¿CÓMO PLANEAS PROMOCIONAR AUROGEN LABS?</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Cuéntanos sobre tu audiencia y estrategia de promoción..." className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border border-blue-900/30 focus:border-blue-500 focus:outline-none resize-none" style={{ background: "#050D1A" }} />
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 rounded-xl font-bold text-white text-base transition-all hover:scale-[1.02] disabled:opacity-50" style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}>
                  {loading ? "Enviando solicitud..." : "ENVIAR SOLICITUD DE AFILIADO"}
                </button>
              </form>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center p-12 rounded-2xl border border-green-600/20" style={{ background: "#0A1628" }}>
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>¡Solicitud Recibida!</h3>
              <p className="text-gray-400">Tu aplicación fue enviada exitosamente. Revisaremos tu perfil y te contactaremos en las próximas 24-48 horas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
