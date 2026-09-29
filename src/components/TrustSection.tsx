"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, FlaskConical, Truck, Award, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    Icon: ShieldCheck,
    code: "CoA",
    title_en: "Batch-Level COA",
    title_es: "COA por Lote",
    desc_en: "Every shipment includes a third-party Certificate of Analysis. Batch number, purity, and identity fully verified.",
    desc_es: "Cada envío incluye un COA de terceros. Número de lote, pureza e identidad totalmente verificados.",
  },
  {
    Icon: FlaskConical,
    code: "HPLC",
    title_en: "HPLC-Verified Purity",
    title_es: "Pureza Verificada HPLC",
    desc_en: "High-performance liquid chromatography confirms 99%+ purity on every compound. Any batch below threshold is rejected.",
    desc_es: "La cromatografía líquida confirma pureza 99%+ en cada compuesto. Cualquier lote por debajo del umbral es rechazado.",
  },
  {
    Icon: Truck,
    code: "SHIP",
    title_en: "Ships in 48 Hours",
    title_es: "Envío en 48 Horas",
    desc_en: "US orders ship within 2 business days. Temperature-controlled packaging ensures compound integrity in transit.",
    desc_es: "Los pedidos en EEUU se envían en 2 días hábiles. Embalaje con control de temperatura garantiza la integridad del compuesto.",
  },
  {
    Icon: Award,
    code: "cGMP",
    title_en: "Research Grade Only",
    title_es: "Solo Grado Investigación",
    desc_en: "Formulated exclusively for scientific research and controlled laboratory studies. Not for human use.",
    desc_es: "Formulado exclusivamente para investigación científica y estudios de laboratorio controlados. No para uso humano.",
  },
];

const STATS = [
  { value: "99.8%", label_en: "Avg. Purity", label_es: "Pureza Promedio" },
  { value: "100+", label_en: "Compounds", label_es: "Compuestos" },
  { value: "48h", label_en: "Ship Time", label_es: "Tiempo de Envío" },
  { value: "3rd", label_en: "Party Tested", label_es: "Testado Externo" },
];

export default function TrustSection() {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* ── Dark features section ── */}
      <section style={{ background: "#0D1117", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24">

          {/* Top row: eyebrow + heading */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <motion.p
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-3 mb-5"
              >
                <span style={{ display: "block", width: 24, height: 1, background: "#B8975A" }} />
                <span className="text-[10px] font-semibold tracking-[0.35em] uppercase" style={{ color: "#B8975A" }}>
                  {t("Why researchers choose us", "Por qué nos eligen")}
                </span>
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="font-bold"
                style={{
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "clamp(32px, 4.5vw, 56px)",
                  color: "#FFFFFF",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.05,
                }}
              >
                {t("Built for serious\nresearchers.", "Construido para\ninvestigadores serios.")}
              </motion.h2>
            </div>

            {/* Stat row — right-aligned on desktop */}
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex gap-6 sm:gap-10 shrink-0"
            >
              {STATS.map((s) => (
                <div key={s.value} className="flex flex-col">
                  <span
                    className="font-bold leading-none"
                    style={{
                      fontFamily: "var(--font-heading, sans-serif)",
                      fontSize: "clamp(24px, 3vw, 36px)",
                      color: "#FFFFFF",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-[10px] font-medium tracking-[0.12em] uppercase mt-1"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {lang === "es" ? s.label_es : s.label_en}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Features grid — 2 cols on tablet+, 1 col on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.code}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col p-7 sm:p-8 gap-4"
                style={{ background: "#0D1117" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(184,151,90,0.1)", border: "1px solid rgba(184,151,90,0.2)" }}
                  >
                    <f.Icon className="w-4.5 h-4.5" style={{ color: "#B8975A" }} />
                  </div>
                  <div>
                    <p
                      className="text-[9px] font-bold tracking-[0.2em] uppercase mb-1"
                      style={{ fontFamily: "var(--font-jetbrains, monospace)", color: "#B8975A" }}
                    >
                      {f.code}
                    </p>
                    <h3
                      className="font-bold text-base sm:text-lg leading-tight"
                      style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#FFFFFF" }}
                    >
                      {lang === "es" ? f.title_es : f.title_en}
                    </h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {lang === "es" ? f.desc_es : f.desc_en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section style={{ background: "#F5F4F0", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <motion.h2
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-bold mb-3"
                style={{
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  color: "#111111",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {t("Ready to start your research?", "¿Listo para comenzar tu investigación?")}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.07 }}
                className="text-sm leading-relaxed"
                style={{ color: "#6B6B6B" }}
              >
                {t(
                  "Browse 100+ research-grade compounds. Every order includes a batch-specific COA.",
                  "Explora más de 100 compuestos de grado investigación. Cada pedido incluye un COA por lote.",
                )}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0"
            >
              <Link
                href="/shop"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-85 active:opacity-70 w-full sm:w-auto justify-center"
                style={{ background: "#111111", minHeight: 48 }}
              >
                {t("Shop the Catalog", "Ver el Catálogo")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/research"
                className="flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-black/5 w-full sm:w-auto"
                style={{ border: "1px solid rgba(0,0,0,0.14)", color: "#1D1D1F", minHeight: 48 }}
              >
                {t("Research Center", "Centro de Investigación")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
