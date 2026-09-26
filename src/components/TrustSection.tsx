"use client";

import { useLanguage } from "@/context/LanguageContext";

const STATS = [
  { value: "100+", label_en: "Peptides available", label_es: "Péptidos disponibles" },
  { value: "99%+", label_en: "Guaranteed purity", label_es: "Pureza garantizada" },
  { value: "2–5", label_en: "Day US delivery", label_es: "Días de envío US" },
  { value: "24/7", label_en: "Technical support", label_es: "Soporte técnico" },
];

const PILLARS = [
  {
    code: "CoA",
    title_en: "Certificate of Analysis",
    title_es: "Certificado de Análisis",
    desc_en: "Third-party CoA included with every shipment — batch number, purity, identity verified.",
    desc_es: "CoA de terceros incluido con cada envío — número de lote, pureza e identidad verificados.",
  },
  {
    code: "HPLC",
    title_en: "HPLC-Verified Purity",
    title_es: "Pureza Verificada HPLC",
    desc_en: "High-performance liquid chromatography confirms 99%+ purity. Batches below threshold are rejected.",
    desc_es: "Cromatografía líquida de alta eficiencia confirma pureza 99%+. Lotes por debajo del umbral son rechazados.",
  },
  {
    code: "cGMP",
    title_en: "Research Grade Only",
    title_es: "Solo Grado Investigación",
    desc_en: "Formulated exclusively for scientific research and controlled laboratory studies.",
    desc_es: "Formulado exclusivamente para investigación científica y estudios de laboratorio controlados.",
  },
];

function TrustSectionInner({ lang }: { lang: "en" | "es" }) {
  return (
    <section style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Top label */}
        <div className="flex items-center gap-3 mb-14">
          <span style={{ display: "block", width: 24, height: 1, background: "#B8975A" }} />
          <p className="text-[10px] font-semibold tracking-[0.38em] uppercase" style={{ color: "#B8975A" }}>
            {lang === "es" ? "Por qué nos eligen" : "Why researchers choose us"}
          </p>
        </div>

        {/* Big stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 mb-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col justify-center py-10 px-8"
              style={{ borderRight: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p
                className="font-bold leading-none mb-2"
                style={{
                  fontFamily: "var(--font-heading, sans-serif)",
                  fontSize: "clamp(40px, 5vw, 64px)",
                  color: "#F2EDE4",
                  letterSpacing: "-0.025em",
                }}
              >
                {stat.value}
              </p>
              <p className="text-[10px] font-semibold tracking-[0.14em] uppercase" style={{ color: "#3A3A3E" }}>
                {lang === "es" ? stat.label_es : stat.label_en}
              </p>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {PILLARS.map((p) => (
            <div
              key={p.code}
              className="flex flex-col p-8"
              style={{ background: "#080808" }}
            >
              <p
                className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
                style={{ fontFamily: "var(--font-jetbrains, monospace)", color: "#B8975A" }}
              >
                {p.code}
              </p>
              <h3
                className="font-bold text-xl mb-3 leading-tight"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#F2EDE4" }}
              >
                {lang === "es" ? p.title_es : p.title_en}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4A4A4E" }}>
                {lang === "es" ? p.desc_es : p.desc_en}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default function TrustSection() {
  const { lang } = useLanguage();
  return <TrustSectionInner lang={lang} />;
}
