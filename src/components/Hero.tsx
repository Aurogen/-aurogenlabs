"use client";

import Link from "next/link";
import { ArrowRight, Shield, FlaskConical, Award, Truck } from "lucide-react";
import { motion } from "framer-motion";

const BADGES = [
  { icon: Shield, label: "Third-Party Tested" },
  { icon: FlaskConical, label: "99%+ Purity" },
  { icon: Award, label: "Batch Verified" },
  { icon: Truck, label: "Ships 2–5 Business Days" },
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden flex flex-col"
      style={{ background: "#F6F6F8", minHeight: "92vh" }}
    >
      {/* Two-column layout */}
      <div className="flex-1 flex items-center w-full max-w-7xl mx-auto px-6 md:px-16 py-20">
        {/* Left: single static vial */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <HeroVialStatic />
          </motion.div>
        </div>

        {/* Right: headline — right-aligned */}
        <div className="flex-1 flex flex-col items-center text-center lg:items-end lg:text-right">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            style={{ color: "#A07520" }}
          >
            Research-Grade Peptides
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="font-bold leading-[1.0] mb-6 tracking-tight"
            style={{
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(54px, 7vw, 110px)",
              color: "#1D1D1F",
            }}
          >
            Engineering<br />
            the Future of<br />
            <span style={{ fontStyle: "italic" }}>Peptide Research.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="text-lg mb-12 max-w-md leading-relaxed"
            style={{ color: "#6E6E73" }}
          >
            Highest-purity compounds for advanced scientific investigation.
            Third-party tested. cGMP certified.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="flex items-center gap-4 flex-wrap justify-center lg:justify-end"
          >
            <Link
              href="/shop"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white text-sm transition-opacity hover:opacity-85"
              style={{ background: "#1D1D1F" }}
            >
              Browse Catalog <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/research"
              className="px-8 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-black/5"
              style={{ border: "1px solid rgba(0,0,0,0.2)", color: "#1D1D1F" }}
            >
              Research Center
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="py-5 px-4" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-7 lg:gap-12">
          {BADGES.map(({ icon: Icon, label }) => (
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

function HeroVialStatic() {
  return (
    <svg
      width="200"
      height="520"
      viewBox="0 0 70 182"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.22))" }}
    >
      {/* ── CRIMPED CAP (gold aluminium) ── */}
      {/* Main cap cylinder */}
      <rect x="18" y="7" width="34" height="20" rx="4" fill="url(#hvcap)" />
      {/* Flip-off disc (slightly raised center) */}
      <rect x="22" y="0" width="26" height="15" rx="6" fill="url(#hvcapTop)" />
      {/* Cap knurl lines */}
      <rect x="19" y="16" width="32" height="1.2" rx="0.5" fill="rgba(255,255,255,0.18)" />
      <rect x="19" y="20" width="32" height="1" rx="0.5" fill="rgba(0,0,0,0.22)" />
      {/* Cap highlight left edge */}
      <rect x="19" y="7" width="3" height="19" rx="1" fill="rgba(255,255,255,0.14)" />

      {/* ── RUBBER STOPPER ── */}
      <rect x="23" y="18" width="24" height="12" rx="3" fill="#8A8A8A" opacity="0.9" />
      <rect x="25" y="19" width="7" height="10" rx="2" fill="white" opacity="0.06" />

      {/* ── NECK ── */}
      <rect x="23" y="27" width="24" height="8" fill="url(#hvglass)" />

      {/* ── SHOULDER (trapezoid fill, left + right) ── */}
      <path d="M23 33 L12 40 L12 38 L23 31 Z" fill="url(#hvglass)" />
      <path d="M47 33 L58 40 L58 38 L47 31 Z" fill="url(#hvglass)" />

      {/* ── GLASS BODY ── */}
      <rect x="10" y="38" width="50" height="136" rx="13" fill="url(#hvglass)" />

      {/* Inner left shine (refraction) */}
      <rect x="12" y="40" width="9" height="132" rx="4.5" fill="white" opacity="0.055" />
      {/* Right edge rim light */}
      <rect x="57" y="42" width="2" height="128" rx="1" fill="white" opacity="0.045" />

      {/* ── LABEL ── */}
      <rect x="13" y="56" width="44" height="86" rx="5" fill="url(#hvlabel)" />
      {/* Gold top rule */}
      <rect x="13" y="56" width="44" height="2" rx="1" fill="#C9922A" opacity="0.9" />
      {/* Gold bottom rule */}
      <rect x="13" y="140" width="44" height="2" rx="1" fill="#C9922A" opacity="0.30" />

      {/* "A" monogram */}
      <text x="35" y="82" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" opacity="0.95" fontFamily="Georgia, serif">A</text>
      {/* Brand */}
      <text x="35" y="95" textAnchor="middle" fill="#C9922A" fontSize="5.5" fontWeight="bold" letterSpacing="2.2" fontFamily="sans-serif">AUROGEN</text>
      <text x="35" y="104" textAnchor="middle" fill="#AAAAAA" fontSize="4" letterSpacing="1.5" fontFamily="sans-serif">LABS</text>
      {/* Thin separator rule */}
      <rect x="27" y="108" width="16" height="0.6" rx="0.3" fill="rgba(201,146,42,0.45)" />
      {/* Concentration */}
      <text x="35" y="121" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">5MG</text>
      {/* Lot designation */}
      <text x="35" y="132" textAnchor="middle" fill="white" fontSize="3.8" fontFamily="sans-serif" opacity="0.38" letterSpacing="0.3">FOR RESEARCH ONLY</text>

      {/* ── LYOPHILISED POWDER (white, bottom) ── */}
      <rect x="12" y="150" width="46" height="20" rx="9" fill="white" opacity="0.07" />
      <ellipse cx="35" cy="150" rx="22" ry="3.5" fill="white" opacity="0.09" />

      {/* ── BOTTOM SHADOW (ground reflection) ── */}
      <ellipse cx="35" cy="178" rx="24" ry="3.5" fill="rgba(0,0,0,0.14)" />

      <defs>
        <linearGradient id="hvcap" x1="18" y1="7" x2="52" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A84B" />
          <stop offset="55%" stopColor="#C9922A" />
          <stop offset="100%" stopColor="#A57218" />
        </linearGradient>
        <linearGradient id="hvcapTop" x1="22" y1="0" x2="48" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EAC46A" />
          <stop offset="100%" stopColor="#C9922A" />
        </linearGradient>
        <linearGradient id="hvglass" x1="10" y1="38" x2="60" y2="174" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2E2E30" />
          <stop offset="45%" stopColor="#1C1C1E" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
        <linearGradient id="hvlabel" x1="13" y1="56" x2="57" y2="142" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#272728" />
          <stop offset="100%" stopColor="#161617" />
        </linearGradient>
      </defs>
    </svg>
  );
}
