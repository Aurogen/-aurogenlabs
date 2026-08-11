"use client";

import Link from "next/link";
import { ArrowRight, Shield, FlaskConical, Award, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const BADGES = {
  en: [
    { icon: Shield, label: "Third-Party Tested" },
    { icon: FlaskConical, label: "99%+ Purity" },
    { icon: Award, label: "Batch Verified" },
    { icon: Truck, label: "Ships 2–5 Business Days" },
  ],
  es: [
    { icon: Shield, label: "Testado por Terceros" },
    { icon: FlaskConical, label: "Pureza 99%+" },
    { icon: Award, label: "Lote Verificado" },
    { icon: Truck, label: "Envío en 2–5 Días Hábiles" },
  ],
};

export default function Hero() {
  const { lang, t } = useLanguage();
  const badges = BADGES[lang];

  return (
    <section style={{ background: "#FFFFFF" }}>
      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-14">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-5"
          style={{ color: "#9E9EA8" }}
        >
          {t("Research-Grade Peptides", "Péptidos de Investigación")}
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="font-bold leading-[1.05] mb-5"
          style={{
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "clamp(36px, 5.5vw, 76px)",
            color: "#1D1D1F",
            letterSpacing: "-0.02em",
          }}
        >
          {lang === "es" ? (
            <>
              Aurogen es una plataforma<br />
              de péptidos de investigación.
            </>
          ) : (
            <>
              Aurogen is a research<br />
              peptide platform.
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="text-base max-w-xl mb-10 leading-relaxed"
          style={{ color: "#6E6E73" }}
        >
          {lang === "es"
            ? "Aurogen vende exclusivamente a investigadores y científicos. Testado por terceros, pureza 99%+ — un especialista responde en un día hábil."
            : "Aurogen sells exclusively to researchers and scientists. Third-party tested, 99%+ purity — a specialist replies within one business day."}
        </motion.p>

        {/* Logo + dots + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-between flex-wrap gap-6"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <LogoMark />
              <div>
                <p
                  className="font-bold text-base tracking-widest leading-none"
                  style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                >
                  AUROGEN
                </p>
                <p className="text-[9px] tracking-[0.4em] mt-0.5 leading-none" style={{ color: "#C9922A" }}>
                  LABS
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: i === 0 ? "22px" : "7px",
                    height: "7px",
                    background: i === 0 ? "#1D1D1F" : "rgba(0,0,0,0.14)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/shop"
              className="flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white text-sm transition-opacity hover:opacity-85"
              style={{ background: "#1D1D1F" }}
            >
              {t("Browse Catalog", "Ver Catálogo")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/research"
              className="px-7 py-3 rounded-full font-semibold text-sm transition-colors hover:bg-black/5"
              style={{ border: "1px solid rgba(0,0,0,0.18)", color: "#1D1D1F" }}
            >
              {t("Research Center", "Centro de Investigación")}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Trust strip ── */}
      <div
        className="py-5 px-4"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)", background: "#FAFAFA" }}
      >
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-7 lg:gap-12">
          {badges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-4 h-4 shrink-0" style={{ color: "#C9922A" }} />
              <span className="text-sm" style={{ color: "#6E6E73" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="19" stroke="#C9922A" strokeWidth="1.5" opacity="0.55" />
      <path d="M20 8 L28 28 H24 L22 23 H18 L16 28 H12 L20 8Z" fill="#1D1D1F" opacity="0.85" />
      <path d="M19 20 H21 L20 17Z" fill="#C9922A" />
    </svg>
  );
}
