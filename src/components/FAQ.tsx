"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const FAQS = [
  {
    q_en: "Is it legal to purchase these compounds?",
    q_es: "¿Es legal comprar estos compuestos?",
    a_en: "Yes. All compounds sold by Aurogen Labs are strictly for in-vitro research and laboratory use only. They are not intended for human consumption, diagnostic use, or veterinary applications. Purchasing for legitimate research purposes is legal in the United States.",
    a_es: "Sí. Todos los compuestos vendidos por Aurogen Labs son estrictamente para uso en investigación in vitro y de laboratorio únicamente. No están destinados al consumo humano, uso diagnóstico o aplicaciones veterinarias. La compra con fines de investigación legítima es legal en los Estados Unidos.",
  },
  {
    q_en: "How do I verify the purity of what I receive?",
    q_es: "¿Cómo verifico la pureza de lo que recibo?",
    a_en: "Every shipment includes a batch-specific Certificate of Analysis (COA) from an independent third-party laboratory. The COA confirms identity, purity (≥98% by HPLC), and is traceable to the exact lot number of your product. You can also download COAs from our Research Center before purchasing.",
    a_es: "Cada envío incluye un Certificado de Análisis (COA) específico del lote de un laboratorio independiente de terceros. El COA confirma identidad, pureza (≥98% mediante HPLC) y es rastreable al número de lote exacto de tu producto. También puedes descargar los COAs desde nuestro Centro de Investigación antes de comprar.",
  },
  {
    q_en: "How fast will my order ship?",
    q_es: "¿Qué tan rápido se enviará mi pedido?",
    a_en: "All US orders are processed and shipped within 48 hours of payment confirmation (business days). Delivery is 2–5 business days via USPS Priority Mail or FedEx. You'll receive a tracking number by email as soon as your order leaves our facility.",
    a_es: "Todos los pedidos en EE.UU. se procesan y envían dentro de las 48 horas de la confirmación del pago (días hábiles). La entrega es de 2 a 5 días hábiles mediante USPS Priority Mail o FedEx. Recibirás un número de seguimiento por correo electrónico tan pronto como tu pedido salga de nuestras instalaciones.",
  },
  {
    q_en: "What if my order arrives damaged?",
    q_es: "¿Qué pasa si mi pedido llega dañado?",
    a_en: "Contact our support team within 7 days of delivery with a photo of the damage. We will send a replacement at no charge or issue a full refund — your choice. We take product integrity seriously at every step of the supply chain.",
    a_es: "Contacta a nuestro equipo de soporte dentro de los 7 días posteriores a la entrega con una foto del daño. Enviaremos un reemplazo sin cargo adicional o emitiremos un reembolso completo, a tu elección. Nos tomamos muy en serio la integridad del producto en cada paso de la cadena de suministro.",
  },
  {
    q_en: "Where are your compounds manufactured?",
    q_es: "¿Dónde se fabrican sus compuestos?",
    a_en: "All compounds are synthesized and quality-tested in domestic (US) cGMP-compliant facilities. We do not source from overseas suppliers. Every batch undergoes independent HPLC verification before it's cleared for sale.",
    a_es: "Todos los compuestos se sintetizan y someten a pruebas de calidad en instalaciones domésticas (EE.UU.) que cumplen con cGMP. No utilizamos proveedores extranjeros. Cada lote se somete a verificación HPLC independiente antes de ser aprobado para la venta.",
  },
  {
    q_en: "What payment methods do you accept?",
    q_es: "¿Qué métodos de pago aceptan?",
    a_en: "We accept all major credit and debit cards. All transactions are SSL-encrypted and processed through a secure payment gateway. We do not store card details on our servers.",
    a_es: "Aceptamos todas las tarjetas de crédito y débito principales. Todas las transacciones están cifradas con SSL y se procesan a través de una pasarela de pago segura. No almacenamos datos de tarjetas en nuestros servidores.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span
          className="font-semibold text-sm sm:text-base leading-snug flex-1"
          style={{ color: "#111111" }}
        >
          {q}
        </span>
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors"
          style={{
            background: open ? "#0A84FF" : "rgba(10,132,255,0.08)",
            border: "1px solid rgba(10,132,255,0.2)",
            color: open ? "#FFFFFF" : "#0A84FF",
          }}
        >
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-5 text-sm leading-relaxed" style={{ color: "#6B6B6B" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { lang, t } = useLanguage();

  return (
    <section style={{ background: "#FFFFFF", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-16 md:py-20">

        {/* Header */}
        <div className="mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-bold"
            style={{
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(32px, 4vw, 52px)",
              color: "#111111",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            {t("Common questions", "Preguntas frecuentes")}
          </motion.h2>
        </div>

        {/* Accordion */}
        <div>
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              index={i}
              q={lang === "es" ? faq.q_es : faq.q_en}
              a={lang === "es" ? faq.a_es : faq.a_en}
            />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ background: "#F5F4F0" }}
        >
          <div>
            <p className="font-semibold mb-1" style={{ color: "#111111" }}>
              {t("Still have questions?", "¿Todavía tienes preguntas?")}
            </p>
            <p className="text-sm" style={{ color: "#6B6B6B" }}>
              {t("Our team is available Mon–Fri, 9am–6pm ET.", "Nuestro equipo está disponible Lun–Vie, 9am–6pm ET.")}
            </p>
          </div>
          <Link
            href="mailto:support@aurogenlabs.com"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-85"
            style={{ background: "#111111", color: "#FFFFFF", minHeight: 44 }}
          >
            {t("Contact Support", "Contactar Soporte")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
