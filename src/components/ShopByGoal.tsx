"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const GOALS = [
  {
    label: "Fat Loss",
    label_es: "Pérdida de Grasa",
    slug: "Fat Loss",
    count: 12,
    accent: "#FF6B35",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_194505_1e1d6d4c-8804-46ef-b061-fca2947e9a0b.png",
    featured: true,
  },
  {
    label: "Muscle Growth",
    label_es: "Desarrollo Muscular",
    slug: "Muscle Growth",
    count: 4,
    accent: "#1B6BDE",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_194505_36854d40-7f0b-4b82-ade8-4fd18f2342ed.png",
  },
  {
    label: "Recovery",
    label_es: "Recuperación",
    slug: "Recovery",
    count: 3,
    accent: "#10B981",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_194505_b6194183-29da-43fb-b8ac-03065878d9a5.png",
  },
  {
    label: "Anti-Aging",
    label_es: "Anti-Envejecimiento",
    slug: "Anti-Aging",
    count: 8,
    accent: "#8B5CF6",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_194505_5a15de9c-5f9c-447c-be69-37455c8772f9.png",
  },
  {
    label: "Skin & Hair",
    label_es: "Piel y Cabello",
    slug: "Skin & Hair",
    count: 2,
    accent: "#EC4899",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_194505_0335bcea-8e9a-4b61-8cc5-075d629bd361.png",
  },
  {
    label: "Brain Health",
    label_es: "Salud Cerebral",
    slug: "Brain Health",
    count: 1,
    accent: "#06B6D4",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_194507_da0fa4be-8375-4459-b7ed-15fb15b44f6a.png",
  },
  {
    label: "Performance",
    label_es: "Rendimiento",
    slug: "Performance",
    count: 9,
    accent: "#0A84FF",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_194505_db12880f-f997-4289-b13e-98e6c5f64ce2.png",
  },
];

function GoalCard({
  goal,
  index,
  tall,
}: {
  goal: (typeof GOALS)[0];
  index: number;
  tall?: boolean;
}) {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const label = lang === "es" ? goal.label_es : goal.label;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <Link
        href={`/shop?goal=${encodeURIComponent(goal.slug)}`}
        className="group relative block overflow-hidden rounded-2xl"
        style={{ minHeight: tall ? 380 : 260 }}
      >
        {/* Photo */}
        <img
          src={goal.image}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Permanent dark gradient bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
          }}
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.18)" }}
        />

        {/* Accent top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 opacity-90"
          style={{ background: goal.accent }}
        />

        {/* Product count — top right */}
        <div className="absolute top-4 right-4">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide text-white"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            {goal.count} {lang === "es" ? "productos" : "products"}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
          <div>
            <p
              className="text-[9px] font-bold tracking-[0.22em] uppercase mb-1.5 opacity-80"
              style={{ color: goal.accent, fontFamily: "var(--font-jetbrains, monospace)" }}
            >
              {lang === "es" ? "Investigación" : "Research"}
            </p>
            <h3
              className="font-bold text-white leading-tight"
              style={{
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: tall ? "clamp(22px, 2.5vw, 30px)" : "clamp(18px, 2vw, 22px)",
                letterSpacing: "-0.02em",
              }}
            >
              {label}
            </h3>
          </div>

          {/* Arrow — visible on hover */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            style={{ background: goal.accent }}
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ShopByGoal() {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const [featured, ...rest] = GOALS;
  const row1 = rest.slice(0, 3);   // Muscle, Recovery, Anti-Aging
  const row2 = rest.slice(3);      // Skin & Hair, Brain Health, Performance

  return (
    <section style={{ background: "#F5F4F0", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-16 md:py-20">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3 mb-4"
            >
              <span style={{ display: "block", width: 24, height: 1, background: "#0A84FF" }} />
              <span className="text-[10px] font-semibold tracking-[0.35em] uppercase" style={{ color: "#0A84FF" }}>
                {t("Browse by objective", "Explorar por objetivo")}
              </span>
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-bold"
              style={{
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(30px, 4vw, 52px)",
                color: "#111111",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              {t("Shop by goal.", "Compra por objetivo.")}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "#6B6B6B" }}
            >
              {t("View all products", "Ver todos los productos")}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Featured + 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3">
          {/* Featured card — spans 5/12 on desktop */}
          <div className="lg:col-span-5">
            <GoalCard goal={featured} index={0} tall />
          </div>

          {/* 3 stacked on right — 7/12 */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {row1.map((goal, i) => (
              <GoalCard key={goal.slug} goal={goal} index={i + 1} />
            ))}
          </div>
        </div>

        {/* Bottom row — 3 equal columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {row2.map((goal, i) => (
            <GoalCard key={goal.slug} goal={goal} index={i + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
