"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const FACTS = {
  en: [
    { value: "25g", label: "protein per scoop" },
    { value: "5g", label: "pure creatine per serving" },
    { value: "0", label: "proprietary blends" },
  ],
  es: [
    { value: "25g", label: "de proteína por scoop" },
    { value: "5g", label: "de creatina pura por porción" },
    { value: "0", label: "mezclas propietarias" },
  ],
};

export default function Hero() {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
  });

  return (
    <section className="hidden md:block" style={{ background: "#F5F4F0" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24 hidden md:grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div className="lg:col-span-7">
          <motion.h2
            {...fade(0)}
            className="font-bold"
            style={{
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(38px, 4.6vw, 64px)",
              color: "#111111",
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            {t("Clean formulas,", "Fórmulas limpias,")}
            <br />
            {t("real results.", "resultados reales.")}
          </motion.h2>
        </div>

        <div className="lg:col-span-5">
          <motion.p {...fade(0.08)} className="text-[16px] leading-relaxed mb-7" style={{ color: "#4A4A4F" }}>
            {t(
              "Aurogen builds sports nutrition around full, transparent doses. Every batch is tested by an independent lab for label accuracy, so what's on the tub is what's inside.",
              "Aurogen crea nutrición deportiva con dosis completas y transparentes. Cada lote se analiza en un laboratorio independiente para verificar la etiqueta: lo que dice el bote es lo que lleva dentro.",
            )}
          </motion.p>
          <motion.div {...fade(0.14)} className="flex items-center gap-5 flex-wrap">
            <Link
              href="/shop"
              className="inline-flex items-center h-12 px-7 rounded-full text-[15px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "#111111" }}
            >
              {t("Shop all products", "Ver todos los productos")}
            </Link>
            <Link
              href="/shop?category=Protein"
              className="text-[15px] underline underline-offset-4 decoration-black/25 transition-colors hover:decoration-black"
              style={{ color: "#111111" }}
            >
              {t("Start with protein", "Empieza por la proteína")}
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <dl
          className="grid grid-cols-3 md:border-t"
          style={{ borderColor: "rgba(0,0,0,0.12)" }}
        >
          {FACTS[lang].map((f, i) => (
            <div
              key={f.value}
              className={`py-6 sm:py-7 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 ${i > 0 ? "pl-4 sm:pl-8 border-l" : ""}`}
              style={{ borderColor: "rgba(0,0,0,0.12)" }}
            >
              <dt
                className="font-bold"
                style={{ fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(24px, 3vw, 30px)", color: "#111111", letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                {f.value}
              </dt>
              <dd className="text-[12px] sm:text-[14px] leading-snug" style={{ color: "#55555A" }}>{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
