"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, FlaskConical, Truck, Award } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const STATS = {
  en: [
    { value: "99.8%", label: "Guaranteed Purity", sub: "HPLC-Verified" },
    { value: "100+", label: "Compounds", sub: "In Stock" },
    { value: "48h", label: "Avg. Ship Time", sub: "US Orders" },
    { value: "100%", label: "COA Included", sub: "Every Batch" },
  ],
  es: [
    { value: "99.8%", label: "Pureza Garantizada", sub: "Verificado HPLC" },
    { value: "100+", label: "Compuestos", sub: "En Stock" },
    { value: "48h", label: "Tiempo de Envío", sub: "Pedidos US" },
    { value: "100%", label: "COA Incluido", sub: "Cada Lote" },
  ],
};

const TRUST_ITEMS = {
  en: [
    { Icon: ShieldCheck, text: "99%+ Purity Guaranteed" },
    { Icon: FlaskConical, text: "Batch-Level COA" },
    { Icon: Award, text: "Third-Party Tested" },
    { Icon: Truck, text: "Ships 2–5 Days" },
  ],
  es: [
    { Icon: ShieldCheck, text: "Pureza 99%+ Garantizada" },
    { Icon: FlaskConical, text: "COA por Lote" },
    { Icon: Award, text: "Testado por Terceros" },
    { Icon: Truck, text: "Envío 2–5 Días" },
  ],
};

export default function Hero() {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const stats = STATS[lang];
  const trust = TRUST_ITEMS[lang];

  return (
    <section style={{ background: "#F5F4F0", borderTop: "1px solid rgba(0,0,0,0.07)" }}>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-14 pb-0 md:pt-20 md:pb-0">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-10 lg:gap-16">

          {/* Left: eyebrow + headline + sub + CTAs */}
          <div className="flex-1 min-w-0 flex flex-col justify-center py-0 lg:py-14">

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3 mb-7"
            >
              <span style={{ display: "block", width: 28, height: 1, background: "#B8975A", flexShrink: 0 }} />
              <span className="text-[10px] font-semibold tracking-[0.35em] uppercase" style={{ color: "#B8975A" }}>
                {t("Research-Grade Peptides", "Péptidos de Investigación")}
              </span>
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-bold mb-6"
              style={{
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(42px, 6vw, 82px)",
                color: "#111111",
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
              }}
            >
              {lang === "es" ? (
                <>
                  El estándar de oro<br />
                  en péptidos de<br />
                  <span style={{ color: "#B8975A" }}>investigación.</span>
                </>
              ) : (
                <>
                  The gold standard<br />
                  in research<br />
                  <span style={{ color: "#B8975A" }}>peptides.</span>
                </>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-sm sm:text-[15px] leading-relaxed max-w-md mb-8"
              style={{ color: "#6B6B6B" }}
            >
              {lang === "es"
                ? "Exclusivamente para investigadores y científicos. Testado por terceros, pureza 99%+, con COA por lote."
                : "Exclusively for researchers and scientists. Third-party tested, 99%+ purity, with batch-specific COA."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <Link
                href="/shop"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-85 active:opacity-70"
                style={{ background: "#111111", minHeight: 44 }}
              >
                {t("Browse Catalog", "Ver Catálogo")}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/research"
                className="flex items-center px-6 py-3 rounded-full font-semibold text-sm transition-colors hover:bg-black/5 active:bg-black/10"
                style={{ border: "1px solid rgba(0,0,0,0.14)", color: "#1D1D1F", minHeight: 44 }}
              >
                {t("View COAs", "Ver COAs")}
              </Link>
            </motion.div>
          </div>

          {/* Right: stats grid */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="lg:w-[340px] xl:w-[380px] shrink-0 grid grid-cols-2 self-stretch gap-px"
            style={{
              background: "rgba(0,0,0,0.08)",
              alignSelf: "stretch",
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.22 + i * 0.06 }}
                className="flex flex-col justify-center px-6 py-8 sm:py-10"
                style={{ background: "#F5F4F0" }}
              >
                <p
                  className="font-bold leading-none mb-1.5"
                  style={{
                    fontFamily: "var(--font-heading, sans-serif)",
                    fontSize: "clamp(32px, 3.5vw, 46px)",
                    color: "#111111",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-[10px] font-semibold tracking-[0.14em] uppercase mb-1" style={{ color: "#1D1D1F" }}>
                  {stat.label}
                </p>
                <p
                  className="text-[9px] font-medium tracking-[0.1em] uppercase"
                  style={{ fontFamily: "var(--font-jetbrains, monospace)", color: "#B8975A" }}
                >
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── Trust strip ── */}
      <div
        className="mt-10 md:mt-14"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)", background: "#EFEDE8" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-3.5 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-6 sm:gap-10 min-w-max">
            {trust.map(({ Icon, text }, i) => (
              <div key={i} className="flex items-center gap-2.5 shrink-0">
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: "#B8975A" }} />
                <span className="text-[11px] font-medium whitespace-nowrap" style={{ color: "#4A4A4A" }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
