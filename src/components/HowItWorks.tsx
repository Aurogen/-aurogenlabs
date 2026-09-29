"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const STEPS = [
  {
    number: "01",
    title_en: "Browse & Select",
    title_es: "Explora y Elige",
    desc_en: "Filter 100+ verified compounds by research goal, peptide class, or compound name. Every product page includes full specs, purity data, and a downloadable COA.",
    desc_es: "Filtra más de 100 compuestos verificados por objetivo de investigación, clase o nombre. Cada página de producto incluye especificaciones completas, datos de pureza y COA descargable.",
    tag_en: "100+ Compounds",
    tag_es: "100+ Compuestos",
  },
  {
    number: "02",
    title_en: "Secure Checkout",
    title_es: "Pago Seguro",
    desc_en: "Complete your order in minutes. SSL-encrypted checkout, multiple payment options. You'll receive an order confirmation with batch tracking instantly.",
    desc_es: "Completa tu pedido en minutos. Pago con cifrado SSL y múltiples métodos de pago. Recibirás confirmación del pedido con seguimiento de lote al instante.",
    tag_en: "SSL Encrypted",
    tag_es: "Cifrado SSL",
  },
  {
    number: "03",
    title_en: "Ships in 48 Hours",
    title_es: "Envío en 48 Horas",
    desc_en: "US orders leave our facility within 2 business days. Temperature-controlled packaging ensures compound integrity. Tracking provided on every order.",
    desc_es: "Los pedidos en EE.UU. salen en 2 días hábiles. Embalaje con control de temperatura garantiza la integridad del compuesto. Seguimiento incluido en cada pedido.",
    tag_en: "2–5 Day Delivery",
    tag_es: "Entrega 2–5 Días",
  },
];

export default function HowItWorks() {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section style={{ background: "#F5F4F0", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-16 md:py-20">

        {/* Header */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3 mb-5"
          >
            <span style={{ display: "block", width: 24, height: 1, background: "#0A84FF" }} />
            <span className="text-[10px] font-semibold tracking-[0.35em] uppercase" style={{ color: "#0A84FF" }}>
              {t("Simple process", "Proceso simple")}
            </span>
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-bold"
            style={{
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(30px, 4vw, 52px)",
              color: "#111111",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            {t("Order in three steps.", "Pedido en tres pasos.")}
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-10 left-[calc(33.333%+24px)] right-[calc(33.333%+24px)]"
            style={{ height: 1, background: "rgba(10,132,255,0.15)", zIndex: 0 }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col"
            >
              {/* Number circle */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative z-10"
                  style={{ background: "#0A84FF", boxShadow: "0 0 0 4px rgba(10,132,255,0.12)" }}
                >
                  <span
                    className="font-bold text-xs text-white"
                    style={{ fontFamily: "var(--font-jetbrains, monospace)" }}
                  >
                    {step.number}
                  </span>
                </div>
                <span
                  className="text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(10,132,255,0.08)",
                    border: "1px solid rgba(10,132,255,0.18)",
                    color: "#0A84FF",
                    fontFamily: "var(--font-jetbrains, monospace)",
                  }}
                >
                  {lang === "es" ? step.tag_es : step.tag_en}
                </span>
              </div>

              {/* Content */}
              <div
                className="flex-1 p-6 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)" }}
              >
                <h3
                  className="font-bold text-xl mb-3 leading-tight"
                  style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#111111" }}
                >
                  {lang === "es" ? step.title_es : step.title_en}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B6B6B" }}>
                  {lang === "es" ? step.desc_es : step.desc_en}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 flex items-center gap-4"
        >
          <Link
            href="/shop"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-85"
            style={{ background: "#111111", minHeight: 44 }}
          >
            {t("Start Browsing", "Empezar a Explorar")}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/research"
            className="text-sm font-medium transition-opacity hover:opacity-60"
            style={{ color: "#6B6B6B" }}
          >
            {t("View all COAs →", "Ver todos los COAs →")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
