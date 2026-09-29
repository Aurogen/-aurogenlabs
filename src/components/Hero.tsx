"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const FACTS = {
  en: [
    { value: "≥98%", label: "purity by HPLC" },
    { value: "COA", label: "with every batch" },
    { value: "48h", label: "dispatch on US orders" },
  ],
  es: [
    { value: "≥98%", label: "pureza por HPLC" },
    { value: "COA", label: "en cada lote" },
    { value: "48h", label: "despacho en pedidos de EE.UU." },
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
    <section style={{ background: "#F5F4F0" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
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
            {t("Research peptides,", "Péptidos de investigación,")}
            <br />
            {t("verified batch by batch.", "verificados lote a lote.")}
          </motion.h2>
        </div>

        <div className="lg:col-span-5">
          <motion.p {...fade(0.08)} className="text-[16px] leading-relaxed mb-7" style={{ color: "#4A4A4F" }}>
            {t(
              "Lyophilized peptides and reagents for in-vitro laboratory work. Each lot is tested by an independent lab before it ships, and the certificate travels with your order.",
              "Péptidos liofilizados y reactivos para trabajo de laboratorio in vitro. Cada lote se analiza en un laboratorio independiente antes del envío, y el certificado viaja con tu pedido.",
            )}
          </motion.p>
          <motion.div {...fade(0.14)} className="flex items-center gap-5 flex-wrap">
            <Link
              href="/shop"
              className="inline-flex items-center h-12 px-7 rounded-full text-[15px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "#111111" }}
            >
              {t("Browse the catalog", "Ver el catálogo")}
            </Link>
            <Link
              href="/research"
              className="text-[15px] underline underline-offset-4 decoration-black/25 transition-colors hover:decoration-black"
              style={{ color: "#111111" }}
            >
              {t("See sample COAs", "Ver COAs de ejemplo")}
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <dl
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{ borderTop: "1px solid rgba(0,0,0,0.12)" }}
        >
          {FACTS[lang].map((f, i) => (
            <div
              key={f.value}
              className={`py-6 sm:py-7 flex items-baseline gap-3 ${i > 0 ? "sm:pl-8 sm:border-l border-t sm:border-t-0" : ""}`}
              style={{ borderColor: "rgba(0,0,0,0.12)" }}
            >
              <dt
                className="font-bold"
                style={{ fontFamily: "var(--font-heading, sans-serif)", fontSize: 30, color: "#111111", letterSpacing: "-0.02em" }}
              >
                {f.value}
              </dt>
              <dd className="text-[14px]" style={{ color: "#55555A" }}>{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
