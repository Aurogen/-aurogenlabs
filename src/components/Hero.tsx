"use client";

import Link from "next/link";
import { ArrowRight, Shield, FlaskConical, Award, Truck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const BADGES = {
  en: [
    { icon: Shield, label: "Third-Party Tested" },
    { icon: FlaskConical, label: "99%+ Purity" },
    { icon: Award, label: "Batch Verified" },
    { icon: Truck, label: "Ships 2–5 Business Days" },
  ],
  es: [
    { icon: Shield, label: "Testado por Terceros" },
    { icon: FlaskConical, label: "Pureza 99%+" },
    { icon: Award, label: "Lote Verificado" },
    { icon: Truck, label: "Envío en 2–5 Días Hábiles" },
  ],
};

export default function Hero() {
  const { lang, t } = useLanguage();
  const badges = BADGES[lang];
  const reduceMotion = useReducedMotion();

  return (
    <section style={{ background: "#FEFDF9", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
      {/* ── Brand statement — 2-col on desktop ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col md:flex-row md:items-center gap-10 md:gap-20">

        {/* Left: headline + sub */}
        <div className="flex-1 min-w-0">
          <motion.p
            initial={{ opacity: 0, transform: reduceMotion ? "translateY(0px)" : "translateY(8px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.38em] uppercase mb-5"
            style={{ color: "#9E9EA8" }}
          >
            <span style={{ display: "block", width: 28, height: 1, background: "#B8975A", flexShrink: 0 }} />
            {t("Research-Grade Peptides", "Péptidos de Investigación")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, transform: reduceMotion ? "translateY(0px)" : "translateY(18px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-bold leading-[1.06] mb-4"
            style={{
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(38px, 5.5vw, 72px)",
              color: "#111111",
              letterSpacing: "-0.025em",
              lineHeight: 1.02,
            }}
          >
            {lang === "es" ? (
              <>Aurogen es una plataforma<br />de péptidos de investigación.</>
            ) : (
              <>Aurogen is a research<br />peptide platform.</>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, transform: reduceMotion ? "translateY(0px)" : "translateY(12px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-sm leading-relaxed max-w-md mt-5"
            style={{ color: "#6B6B6B" }}
          >
            {lang === "es"
              ? "Vende exclusivamente a investigadores y científicos. Testado por terceros, pureza 99%+ — un especialista responde en un día hábil."
              : "Sells exclusively to researchers and scientists. Third-party tested, 99%+ purity — a specialist replies within one business day."}
          </motion.p>
        </div>

        {/* Right: trust badges + CTAs */}
        <motion.div
          initial={{ opacity: 0, transform: reduceMotion ? "translateY(0px)" : "translateY(12px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="shrink-0 flex flex-col gap-6"
        >
          {/* Trust grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {badges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 shrink-0" style={{ color: "#6B7A8D" }} />
                <span className="text-xs font-medium" style={{ color: "#6E6E73" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/shop"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white text-sm transition-opacity hover:opacity-85"
              style={{ background: "#1D1D1F" }}
            >
              {t("Browse Catalog", "Ver Catálogo")}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/research"
              className="px-6 py-2.5 rounded-full font-semibold text-sm transition-colors hover:bg-black/5"
              style={{ border: "1px solid rgba(0,0,0,0.18)", color: "#1D1D1F" }}
            >
              {t("Research Center", "Centro de Investigación")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

