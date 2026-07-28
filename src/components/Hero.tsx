"use client";

import Link from "next/link";
import { ArrowRight, Shield, FlaskConical, Award, Truck } from "lucide-react";

const BADGES = [
  { icon: Shield, label: "Third-Party Tested" },
  { icon: FlaskConical, label: "99%+ Purity" },
  { icon: Award, label: "Batch Verified" },
  { icon: Truck, label: "Ships 2-5 Days USA" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #020810 0%, #050D1A 40%, #0A1628 100%)",
      }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }}>
        <div
          style={{
            backgroundImage: "linear-gradient(rgba(27,107,222,1) 1px, transparent 1px), linear-gradient(90deg, rgba(27,107,222,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(27, 107, 222, 0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(77, 163, 255, 0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* DNA helix decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-16 w-px h-full opacity-10" style={{ background: "linear-gradient(180deg, transparent, #4DA3FF 30%, #1B6BDE 70%, transparent)" }} />
        <div className="absolute top-0 right-32 w-px h-full opacity-5" style={{ background: "linear-gradient(180deg, transparent, #4DA3FF, transparent)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="animate-fade-in">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-blue-600/30" style={{ background: "rgba(27, 107, 222, 0.08)" }}>
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 text-xs font-medium tracking-widest uppercase">
                Premium Quality Peptides
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6"
              style={{ fontFamily: "var(--font-heading, sans-serif)" }}
            >
              <span className="text-white">ENGINEERING</span>
              <br />
              <span className="text-white">THE FUTURE OF</span>
              <br />
              <span style={{ background: "linear-gradient(90deg, #4DA3FF, #1B6BDE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                PEPTIDE RESEARCH
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-lg mb-2 font-medium">Pure. Tested. Trusted.</p>
            <p className="text-gray-500 text-sm mb-8 max-w-lg leading-relaxed">
              Investigación de péptidos de la más alta pureza, producidos en instalaciones certificadas en EE.UU.
              Exclusivamente para uso en laboratorio e investigación científica.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/shop"
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(27,107,222,0.4)]"
                style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}
              >
                SHOP NOW
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/protocols"
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-blue-300 text-base border border-blue-600/40 hover:border-blue-400 hover:text-white transition-all hover:scale-105"
              >
                EXPLORE PROTOCOLS
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-blue-900/30 text-center"
                  style={{ background: "rgba(15, 32, 64, 0.4)" }}
                >
                  <Icon className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400 text-[11px] leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero visual */}
          <div className="flex justify-center lg:justify-end animate-fade-in relative">
            <HeroVials />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, #050D1A)" }} />
    </section>
  );
}

function HeroVials() {
  return (
    <div className="relative w-80 h-96">
      {/* Background glow */}
      <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(27,107,222,0.2) 0%, transparent 70%)", filter: "blur(30px)" }} />

      {/* Main vial - center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 drop-shadow-[0_20px_60px_rgba(27,107,222,0.5)]">
        <svg width="100" height="140" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="28" y="0" width="44" height="18" rx="7" fill="url(#capGrad)" />
          <rect x="36" y="15" width="28" height="7" rx="3" fill="#8EB4D4" opacity="0.8" />
          <rect x="20" y="20" width="60" height="108" rx="15" fill="url(#bodyGrad)" />
          {/* Shine */}
          <rect x="24" y="22" width="10" height="104" rx="5" fill="white" opacity="0.04" />
          {/* Label */}
          <rect x="26" y="40" width="48" height="56" rx="6" fill="url(#labGrad)" />
          {/* Logo A */}
          <text x="50" y="62" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" opacity="0.9" fontFamily="sans-serif">A</text>
          <text x="50" y="74" textAnchor="middle" fill="#4DA3FF" fontSize="6" fontWeight="bold" letterSpacing="2" fontFamily="sans-serif">AUROGEN</text>
          <text x="50" y="82" textAnchor="middle" fill="#8EB4D4" fontSize="5" letterSpacing="1" fontFamily="sans-serif">LABS</text>
          <text x="50" y="92" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">5MG</text>
          <text x="50" y="100" textAnchor="middle" fill="white" fontSize="4.5" fontFamily="sans-serif" opacity="0.6">RESEARCH ONLY</text>
          {/* Liquid */}
          <rect x="22" y="112" width="56" height="14" rx="7" fill="#1B6BDE" opacity="0.2" />
          <defs>
            <linearGradient id="capGrad" x1="28" y1="0" x2="72" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6BB4FF" />
              <stop offset="100%" stopColor="#4DA3FF" />
            </linearGradient>
            <linearGradient id="bodyGrad" x1="20" y1="20" x2="80" y2="128" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1A3666" />
              <stop offset="50%" stopColor="#0D2244" />
              <stop offset="100%" stopColor="#050D1A" />
            </linearGradient>
            <linearGradient id="labGrad" x1="26" y1="40" x2="74" y2="96" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0F2040" />
              <stop offset="100%" stopColor="#0A1628" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Side vials */}
      {[-90, 90].map((offset, i) => (
        <div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 opacity-60"
          style={{ left: `calc(50% + ${offset}px)`, transform: `translateY(-50%) scale(0.75)` }}
        >
          <svg width="80" height="116" viewBox="0 0 80 116" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="0" width="40" height="14" rx="5" fill="#4DA3FF" opacity="0.7" />
            <rect x="28" y="12" width="24" height="5" rx="2" fill="#8EB4D4" opacity="0.5" />
            <rect x="12" y="16" width="56" height="88" rx="12" fill="url(#sideGrad)" />
            <rect x="16" y="30" width="48" height="46" rx="5" fill="#0F2040" opacity="0.7" />
            <rect x="12" y="92" width="56" height="12" rx="6" fill="#1B6BDE" opacity="0.15" />
            <defs>
              <linearGradient id="sideGrad" x1="12" y1="16" x2="68" y2="104" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#152A55" />
                <stop offset="100%" stopColor="#050D1A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}

      {/* Stats floating cards */}
      <div
        className="absolute top-4 right-0 px-4 py-3 rounded-xl border border-blue-600/20"
        style={{ background: "rgba(10, 22, 40, 0.9)", backdropFilter: "blur(10px)" }}
      >
        <p className="text-blue-400 font-bold text-xl">99%+</p>
        <p className="text-gray-400 text-xs">Purity Guaranteed</p>
      </div>

      <div
        className="absolute bottom-8 left-0 px-4 py-3 rounded-xl border border-blue-600/20"
        style={{ background: "rgba(10, 22, 40, 0.9)", backdropFilter: "blur(10px)" }}
      >
        <p className="text-white font-bold text-xl">100+</p>
        <p className="text-gray-400 text-xs">Peptide Compounds</p>
      </div>
    </div>
  );
}
