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
      style={{ background: "#EEEAE2", minHeight: "92vh" }}
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
            <span style={{ color: "#C9922A" }}>Peptide Research.</span>
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
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/protocols"
              className="px-8 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-black/5"
              style={{ border: "1px solid rgba(0,0,0,0.2)", color: "#1D1D1F" }}
            >
              Explore Protocols
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
      height="280"
      viewBox="0 0 90 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.18))" }}
    >
      <rect x="25" y="0" width="40" height="16" rx="6" fill="url(#hvcap)" />
      <rect x="32" y="13" width="26" height="6" rx="3" fill="#AAAAAA" opacity="0.6" />
      <rect x="16" y="18" width="58" height="98" rx="14" fill="url(#hvbody)" />
      <rect x="20" y="20" width="9" height="94" rx="4.5" fill="white" opacity="0.04" />
      <rect x="22" y="34" width="46" height="60" rx="6" fill="url(#hvlabel)" />
      <rect x="22" y="34" width="46" height="3" rx="1.5" fill="#C9922A" opacity="0.7" />
      <text x="45" y="56" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" opacity="0.95" fontFamily="sans-serif">A</text>
      <text x="45" y="67" textAnchor="middle" fill="#C9922A" fontSize="5.5" fontWeight="bold" letterSpacing="1.5" fontFamily="sans-serif">AUROGEN</text>
      <text x="45" y="75" textAnchor="middle" fill="#AAAAAA" fontSize="4.5" letterSpacing="1" fontFamily="sans-serif">LABS</text>
      <text x="45" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">5MG</text>
      <text x="45" y="93" textAnchor="middle" fill="white" fontSize="4" fontFamily="sans-serif" opacity="0.5">RESEARCH ONLY</text>
      <rect x="18" y="98" width="54" height="16" rx="7" fill="#C9922A" opacity="0.18" />
      <rect x="24" y="100" width="14" height="12" rx="3" fill="white" opacity="0.04" />
      <defs>
        <linearGradient id="hvcap" x1="25" y1="0" x2="65" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8C8C8" />
          <stop offset="100%" stopColor="#909090" />
        </linearGradient>
        <linearGradient id="hvbody" x1="16" y1="18" x2="74" y2="116" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#282828" />
          <stop offset="45%" stopColor="#181818" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
        <linearGradient id="hvlabel" x1="22" y1="34" x2="68" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E1E1E" />
          <stop offset="100%" stopColor="#131313" />
        </linearGradient>
      </defs>
    </svg>
  );
}
