"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const STATS = {
  en: [
    { value: "99.8%", label: "Guaranteed Purity" },
    { value: "100+", label: "Compounds in Stock" },
    { value: "48h", label: "Average Ship Time" },
  ],
  es: [
    { value: "99.8%", label: "Pureza Garantizada" },
    { value: "100+", label: "Compuestos en Stock" },
    { value: "48h", label: "Tiempo de Envío" },
  ],
};

export default function Hero() {
  const { lang, t } = useLanguage();
  const stats = STATS[lang];
  const reduceMotion = useReducedMotion();

  return (
    <section style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-28 flex flex-col md:flex-row md:items-end gap-14 md:gap-24">

        {/* Left: headline + sub + CTAs */}
        <div className="flex-1 min-w-0">
          <motion.p
            initial={{ opacity: 0, transform: reduceMotion ? "none" : "translateY(8px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.38em] uppercase mb-6"
            style={{ color: "#B8975A" }}
          >
            <span style={{ display: "block", width: 28, height: 1, background: "#B8975A", flexShrink: 0 }} />
            {t("Research-Grade Peptides", "Péptidos de Investigación")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, transform: reduceMotion ? "none" : "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-bold mb-6"
            style={{
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(48px, 6.5vw, 96px)",
              color: "#F2EDE4",
              letterSpacing: "-0.03em",
              lineHeight: 0.96,
            }}
          >
            {lang === "es" ? (
              <>Aurogen es una<br />plataforma de péptidos<br />de investigación.</>
            ) : (
              <>Aurogen is a<br />research peptide<br />platform.</>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, transform: reduceMotion ? "none" : "translateY(12px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-sm leading-relaxed max-w-md mb-8"
            style={{ color: "#5A5A5E" }}
          >
            {lang === "es"
              ? "Vende exclusivamente a investigadores y científicos. Testado por terceros, pureza 99%+."
              : "Sells exclusively to researchers and scientists. Third-party tested, 99%+ purity."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, transform: reduceMotion ? "none" : "translateY(10px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <Link
              href="/shop"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-85"
              style={{ background: "#B8975A", color: "#080808" }}
            >
              {t("Browse Catalog", "Ver Catálogo")}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/research"
              className="px-6 py-2.5 rounded-full font-semibold text-sm transition-colors hover:border-white/20"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#9E9EA8" }}
            >
              {t("Research Center", "Centro de Investigación")}
            </Link>
          </motion.div>
        </div>

        {/* Right: stats column */}
        <motion.div
          initial={{ opacity: 0, transform: reduceMotion ? "none" : "translateY(16px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="shrink-0 flex flex-row md:flex-col gap-8 md:gap-10"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col">
              {i > 0 && (
                <div
                  className="hidden md:block mb-10"
                  style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)" }}
                />
              )}
              <p
                className="font-bold leading-none mb-1.5"
                style={{
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "clamp(38px, 4.5vw, 60px)",
                  color: "#F2EDE4",
                  letterSpacing: "-0.025em",
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-[10px] font-semibold tracking-[0.14em] uppercase"
                style={{ color: "#4A4A4E" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
