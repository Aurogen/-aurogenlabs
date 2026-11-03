"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const STEPS = [
  {
    title_en: "Choose your compounds",
    title_es: "Elige tus compuestos",
    desc_en: "Filter by compound class or search by name. Every product page lists specs, storage conditions and the current lot's COA.",
    desc_es: "Filtra por clase de compuesto o busca por nombre. Cada producto muestra especificaciones, condiciones de almacenamiento y el COA del lote actual.",
  },
  {
    title_en: "Check out",
    title_es: "Paga",
    desc_en: "Pay by card over an encrypted connection. You get an order confirmation by email right away.",
    desc_es: "Paga con tarjeta mediante una conexión cifrada. Recibes la confirmación del pedido por correo al instante.",
  },
  {
    title_en: "Receive and verify",
    title_es: "Recibe y verifica",
    desc_en: "US orders leave within 2 business days with tracking. Match the lot number on the vial to the COA in the box.",
    desc_es: "Los pedidos en EE.UU. salen en 2 días hábiles con seguimiento. Compara el número de lote del vial con el COA de la caja.",
  },
];

export default function HowItWorks() {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section style={{ background: "#F5F4F0", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20 md:py-24">
        <div className="flex flex-col md:flex-row items-center md:items-end md:justify-between gap-4 mb-12 text-center md:text-left">
          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(32px, 4vw, 52px)",
              color: "#111111",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {t("Ordering is simple", "Pedir es sencillo")}
          </h2>
          <Link
            href="/shipping"
            className="text-[15px] underline underline-offset-4 decoration-black/25 transition-colors hover:decoration-black"
            style={{ color: "#111111" }}
          >
            {t("Shipping details", "Detalles de envío")}
          </Link>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title_en}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="pt-6 text-center md:text-left"
              style={{ borderTop: "1px solid rgba(0,0,0,0.14)" }}
            >
              <span className="block text-[14px] mb-4 tabular-nums" style={{ color: "#9A9AA0" }}>
                {t("Step", "Paso")} {i + 1}
              </span>
              <h3 className="font-semibold text-[20px] mb-2" style={{ color: "#111111" }}>
                {lang === "es" ? step.title_es : step.title_en}
              </h3>
              <p className="text-[15px] leading-relaxed" style={{ color: "#55555A" }}>
                {lang === "es" ? step.desc_es : step.desc_en}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
