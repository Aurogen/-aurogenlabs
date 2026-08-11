"use client";

import { useLanguage } from "@/context/LanguageContext";

const ITEMS_EN = [
  "Third-Party Tested",
  "99%+ Purity",
  "Ships 2–5 Business Days",
  "Batch Verified",
  "US Manufactured",
  "Research Grade Only",
  "Specialist Support",
  "COA Included",
];

const ITEMS_ES = [
  "Testado por Terceros",
  "Pureza 99%+",
  "Envío en 2–5 Días",
  "Lote Verificado",
  "Fabricado en EE.UU.",
  "Solo Investigación",
  "Soporte Especializado",
  "COA Incluido",
];

export default function MarqueeTicker() {
  const { lang } = useLanguage();
  const items = lang === "es" ? ITEMS_ES : ITEMS_EN;
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="w-full overflow-hidden py-2.5"
      style={{ background: "#1D1D1F" }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-[10.5px] font-medium tracking-[0.24em] uppercase shrink-0"
            style={{ color: "rgba(255,255,255,0.5)", paddingRight: "3.5rem" }}
          >
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: "#6B7A8D", opacity: 0.9 }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
