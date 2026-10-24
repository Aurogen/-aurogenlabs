"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const STEPS = [
  {
    title_en: "Sourcing",
    title_es: "Materias primas",
    desc_en: "Ingredients come from vetted suppliers and are checked for identity on arrival. Each production run gets its own lot number.",
    desc_es: "Los ingredientes vienen de proveedores verificados y se revisan al llegar. Cada producción recibe su propio número de lote.",
  },
  {
    title_en: "Manufacturing",
    title_es: "Fabricación",
    desc_en: "Formulas are blended, filled and sealed in a GMP-certified facility, with full-dose ingredients and no proprietary blends.",
    desc_es: "Las fórmulas se mezclan, envasan y sellan en una planta con certificación GMP, con dosis completas y sin mezclas propietarias.",
  },
  {
    title_en: "Independent testing",
    title_es: "Análisis independiente",
    desc_en: "A sample from every batch goes to an outside lab to confirm label accuracy and screen for heavy metals and contaminants.",
    desc_es: "Una muestra de cada lote va a un laboratorio externo para confirmar la etiqueta y descartar metales pesados y contaminantes.",
  },
  {
    title_en: "Released to you",
    title_es: "Listo para ti",
    desc_en: "Only batches that pass are released. The lot number is printed on every tub, so results can always be traced.",
    desc_es: "Solo se liberan los lotes que aprueban. El número de lote va impreso en cada bote para poder rastrear los resultados.",
  },
];

export default function TrustSection() {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section style={{ background: "#FFFFFF", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20 md:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5 text-center lg:text-left">
          <div className="lg:sticky lg:top-28">
            <h2
              className="font-bold mb-5"
              style={{
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(32px, 4vw, 52px)",
                color: "#111111",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              {t("From ingredient to shaker", "Del ingrediente a tu shaker")}
            </h2>
            <p className="text-[16px] leading-relaxed mb-6 max-w-md mx-auto lg:mx-0" style={{ color: "#4A4A4F" }}>
              {t(
                "Anyone can print a big number on a label. We would rather prove it. This is the path every Aurogen tub takes before it reaches you.",
                "Cualquiera puede imprimir un número grande en una etiqueta. Nosotros preferimos demostrarlo. Este es el recorrido de cada bote Aurogen antes de llegar a ti.",
              )}
            </p>
            <Link
              href="/shop"
              className="text-[15px] underline underline-offset-4 decoration-black/25 transition-colors hover:decoration-black"
              style={{ color: "#111111" }}
            >
              {t("Shop the lineup", "Ver los productos")}
            </Link>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title_en}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="grid grid-cols-1 lg:grid-cols-[48px_1fr] gap-2 lg:gap-4 py-7 text-center lg:text-left"
              style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}
            >
              <span className="text-[14px] tabular-nums pt-1" style={{ color: "#9A9AA0" }}>
                0{i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-[19px] mb-2" style={{ color: "#111111" }}>
                  {lang === "es" ? s.title_es : s.title_en}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "#55555A" }}>
                  {lang === "es" ? s.desc_es : s.desc_en}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
