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

const LINEUP = [
  { name: "Semaglutide", mg: "10MG", accent: "#C9922A", short: "SEMAGLU" },
  { name: "BPC-157", mg: "5MG", accent: "#1B7A45", short: "BPC-157" },
  { name: "Retatrutide", mg: "10MG", accent: "#C9922A", short: "RETRAT" },
  { name: "TB-500", mg: "5MG", accent: "#D97706", short: "TB-500" },
  { name: "IGF-1 LR3", mg: "1MG", accent: "#1B7A45", short: "IGF-1" },
];

const STAGGER_Y = [22, 10, 0, 10, 22];

export default function Hero() {
  const { lang, t } = useLanguage();
  const badges = BADGES[lang];

  return (
    <section style={{ background: "#FFFFFF" }}>
      {/* ── Product lineup area ── */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{
          height: "58vh",
          minHeight: "420px",
          background: "linear-gradient(180deg, #E4E0D8 0%, #ECEAE4 60%, #F2F0EB 100%)",
        }}
      >
        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(0,0,0,0.06), transparent)",
          }}
        />

        {/* Vial lineup */}
        <div className="relative z-10 flex items-end justify-center gap-5 md:gap-9 px-6 pb-10 w-full max-w-3xl">
          {LINEUP.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: STAGGER_Y[i] }}
              transition={{ duration: 0.75, delay: 0.08 + i * 0.09, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`shrink-0 flex flex-col items-center ${i === 0 || i === 4 ? "hidden sm:flex" : "flex"}`}
            >
              <LineupVial name={v.name} mg={v.mg} accent={v.accent} short={v.short} idx={i} />
              {/* Ground shadow */}
              <div
                className="mt-2 rounded-full"
                style={{
                  width: "52px",
                  height: "9px",
                  background: "rgba(0,0,0,0.13)",
                  filter: "blur(4px)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Content below ── */}
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

/* ── Individual vial for the lineup ── */
function LineupVial({ name, mg, accent, short, idx }: {
  name: string; mg: string; accent: string; short: string; idx: number;
}) {
  const id = `lv${idx}`;
  const nameLen = short.length;
  const nameFontSize = nameLen > 6 ? 3.8 : 4.6;

  return (
    <svg
      width="76"
      height="198"
      viewBox="0 0 70 182"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.22))" }}
    >
      {/* Cap */}
      <rect x="18" y="7" width="34" height="20" rx="4" fill={`url(#${id}cap)`} />
      <rect x="22" y="0" width="26" height="15" rx="6" fill={`url(#${id}capTop)`} />
      <rect x="19" y="16" width="32" height="1.2" rx="0.5" fill="rgba(255,255,255,0.18)" />
      <rect x="19" y="20" width="32" height="1" rx="0.5" fill="rgba(0,0,0,0.20)" />
      <rect x="19" y="7" width="3" height="19" rx="1" fill="rgba(255,255,255,0.13)" />

      {/* Stopper */}
      <rect x="23" y="18" width="24" height="12" rx="3" fill="#8A8A8A" opacity="0.9" />
      <rect x="25" y="19" width="7" height="10" rx="2" fill="white" opacity="0.06" />

      {/* Neck */}
      <rect x="23" y="27" width="24" height="8" fill={`url(#${id}glass)`} />

      {/* Shoulders */}
      <path d="M23 33 L12 40 L12 38 L23 31 Z" fill={`url(#${id}glass)`} />
      <path d="M47 33 L58 40 L58 38 L47 31 Z" fill={`url(#${id}glass)`} />

      {/* Glass body */}
      <rect x="10" y="38" width="50" height="136" rx="13" fill={`url(#${id}glass)`} />
      <rect x="12" y="40" width="9" height="132" rx="4.5" fill="white" opacity="0.05" />
      <rect x="57" y="42" width="2" height="128" rx="1" fill="white" opacity="0.04" />

      {/* Label */}
      <rect x="13" y="56" width="44" height="86" rx="5" fill={`url(#${id}label)`} />
      <rect x="13" y="56" width="44" height="2" rx="1" fill={accent} opacity="0.85" />
      <rect x="13" y="140" width="44" height="2" rx="1" fill={accent} opacity="0.25" />

      {/* A monogram */}
      <text x="35" y="81" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold" opacity="0.92" fontFamily="Georgia, serif">A</text>
      {/* Brand */}
      <text x="35" y="93" textAnchor="middle" fill={accent} fontSize="4.8" fontWeight="bold" letterSpacing="2" fontFamily="sans-serif">AUROGEN</text>
      <text x="35" y="101" textAnchor="middle" fill="#AAAAAA" fontSize="3.8" letterSpacing="1.5" fontFamily="sans-serif">LABS</text>
      {/* Separator */}
      <rect x="27" y="105" width="16" height="0.5" rx="0.25" fill={accent} opacity="0.4" />
      {/* Product name */}
      <text x="35" y="115" textAnchor="middle" fill="white" fontSize={nameFontSize} fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">{short}</text>
      {/* Concentration */}
      <text x="35" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">{mg}</text>
      {/* Research only */}
      <text x="35" y="134" textAnchor="middle" fill="white" fontSize="3.5" fontFamily="sans-serif" opacity="0.35" letterSpacing="0.3">RESEARCH ONLY</text>

      {/* Powder */}
      <rect x="12" y="150" width="46" height="20" rx="9" fill="white" opacity="0.06" />
      <ellipse cx="35" cy="150" rx="22" ry="3.5" fill="white" opacity="0.08" />

      {/* Ground reflection */}
      <ellipse cx="35" cy="178" rx="24" ry="3.5" fill="rgba(0,0,0,0.12)" />

      <defs>
        <linearGradient id={`${id}cap`} x1="18" y1="7" x2="52" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A84B" />
          <stop offset="55%" stopColor="#C9922A" />
          <stop offset="100%" stopColor="#A57218" />
        </linearGradient>
        <linearGradient id={`${id}capTop`} x1="22" y1="0" x2="48" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EAC46A" />
          <stop offset="100%" stopColor="#C9922A" />
        </linearGradient>
        <linearGradient id={`${id}glass`} x1="10" y1="38" x2="60" y2="174" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2E2E30" />
          <stop offset="45%" stopColor="#1C1C1E" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
        <linearGradient id={`${id}label`} x1="13" y1="56" x2="57" y2="142" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#282829" />
          <stop offset="100%" stopColor="#161617" />
        </linearGradient>
      </defs>
    </svg>
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
