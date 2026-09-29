"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const STEPS = [
  {
    title_en: "Synthesis",
    title_es: "Síntesis",
    desc_en: "Peptides are synthesized, purified and lyophilized. Each lot gets its own number from the start.",
    desc_es: "Los péptidos se sintetizan, se purifican y se liofilizan. Cada lote recibe su propio número desde el inicio.",
  },
  {
    title_en: "Independent testing",
    title_es: "Análisis independiente",
    desc_en: "A sample from every lot goes to an outside laboratory for HPLC purity and mass spectrometry identity testing.",
    desc_es: "Una muestra de cada lote va a un laboratorio externo para pureza por HPLC e identidad por espectrometría de masas.",
  },
  {
    title_en: "Release or reject",
    title_es: "Aprobar o rechazar",
    desc_en: "Lots below 98% purity are not sold. Approved lots are labeled, sealed and stored at the listed temperature.",
    desc_es: "Los lotes por debajo del 98% de pureza no se venden. Los aprobados se etiquetan, sellan y almacenan a la temperatura indicada.",
  },
  {
    title_en: "Certificate with your order",
    title_es: "Certificado con tu pedido",
    desc_en: "The Certificate of Analysis for your exact lot ships in the box and can be downloaded before you buy.",
    desc_es: "El Certificado de Análisis de tu lote exacto va en la caja y se puede descargar antes de comprar.",
  },
];

export default function TrustSection() {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section style={{ background: "#FFFFFF", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20 md:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
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
              {t("How every lot is checked", "Cómo se revisa cada lote")}
            </h2>
            <p className="text-[16px] leading-relaxed mb-6 max-w-md" style={{ color: "#4A4A4F" }}>
              {t(
                "Purity claims are easy to make. We would rather show the paperwork. This is the path each vial takes before it reaches your lab.",
                "Decir que algo es puro es fácil. Preferimos mostrar los documentos. Este es el recorrido de cada vial antes de llegar a tu laboratorio.",
              )}
            </p>
            <Link
              href="/quality"
              className="text-[15px] underline underline-offset-4 decoration-black/25 transition-colors hover:decoration-black"
              style={{ color: "#111111" }}
            >
              {t("Read our quality standards", "Ver nuestros estándares de calidad")}
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
              className="grid grid-cols-[48px_1fr] gap-4 py-7"
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
