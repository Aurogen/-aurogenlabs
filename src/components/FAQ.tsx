"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const FAQS = [
  {
    q_en: "What is creatine monohydrate and who is it for?",
    q_es: "¿Qué es la creatina monohidratada y para quién es?",
    a_en: "Creatine is a compound your body already makes and stores in muscle, where it helps regenerate energy during short, intense efforts like lifting or sprinting. Supplementing with 5 g a day is one of the most studied ways to support strength and power. It suits most healthy adults who train regularly.",
    a_es: "La creatina es un compuesto que tu cuerpo ya produce y almacena en el músculo, donde ayuda a regenerar energía en esfuerzos cortos e intensos como levantar pesas o hacer sprints. Tomar 5 g al día es una de las formas más estudiadas de apoyar la fuerza y la potencia. Es adecuada para la mayoría de adultos sanos que entrenan con regularidad.",
  },
  {
    q_en: "Whey isolate vs. whey concentrate: what's the difference?",
    q_es: "Proteína isolada vs. concentrada: ¿cuál es la diferencia?",
    a_en: "Isolate is filtered further than concentrate, so it has more protein per scoop (about 90%) and less lactose, fat and sugar. It's a good choice if you want a lean protein source or are sensitive to lactose.",
    a_es: "La isolada pasa por un filtrado adicional, por eso tiene más proteína por scoop (alrededor del 90%) y menos lactosa, grasa y azúcar. Es buena opción si buscas una proteína magra o eres sensible a la lactosa.",
  },
  {
    q_en: "Are your products tested?",
    q_es: "¿Sus productos están analizados?",
    a_en: "Yes. A sample of every batch is tested by an independent laboratory to confirm the label is accurate and to screen for heavy metals and contaminants. The lot number is printed on every container.",
    a_es: "Sí. Una muestra de cada lote se analiza en un laboratorio independiente para confirmar que la etiqueta es correcta y descartar metales pesados y contaminantes. El número de lote va impreso en cada envase.",
  },
  {
    q_en: "Can I take creatine and protein together?",
    q_es: "¿Puedo tomar creatina y proteína juntas?",
    a_en: "Yes. Many people add their daily 5 g of creatine to their post-workout protein shake. Creatine is unflavored, so it won't change the taste.",
    a_es: "Sí. Muchas personas añaden sus 5 g diarios de creatina al batido de proteína después de entrenar. La creatina no tiene sabor, así que no cambia el gusto.",
  },
  {
    q_en: "How fast will my order ship?",
    q_es: "¿Qué tan rápido se envía mi pedido?",
    a_en: "Orders are processed within 1–2 business days and delivered in 2–5 business days within the US. You'll receive a tracking number by email as soon as your order ships.",
    a_es: "Los pedidos se procesan en 1–2 días hábiles y se entregan en 2–5 días hábiles dentro de EE.UU. Recibirás un número de seguimiento por correo en cuanto salga tu pedido.",
  },
  {
    q_en: "Do I need to consult a doctor before taking supplements?",
    q_es: "¿Debo consultar a un médico antes de tomar suplementos?",
    a_en: "If you are pregnant, nursing, taking medication or have a medical condition, check with your healthcare provider before using any supplement. These statements have not been evaluated by the FDA; our products are not intended to diagnose, treat, cure or prevent any disease.",
    a_es: "Si estás embarazada, en lactancia, tomas medicación o tienes una condición médica, consulta a tu profesional de salud antes de usar cualquier suplemento. Estas declaraciones no han sido evaluadas por la FDA; nuestros productos no pretenden diagnosticar, tratar, curar ni prevenir ninguna enfermedad.",
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
        className="w-full flex items-start justify-between gap-4 py-5 text-center sm:text-left"
        aria-expanded={open}
      >
        <span className="w-6 shrink-0 sm:hidden" aria-hidden="true" />
        <span
          className="font-semibold text-[15px] sm:text-base leading-snug flex-1"
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
            <p className="pb-5 px-2 sm:px-0 text-sm leading-relaxed text-center sm:text-left" style={{ color: "#6B6B6B" }}>
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
        <div className="mb-10 text-center sm:text-left">
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
          className="mt-10 p-6 rounded-2xl flex flex-col sm:flex-row items-center sm:justify-between gap-4 text-center sm:text-left"
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
