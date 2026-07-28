"use client";

import Link from "next/link";
import { ArrowRight, Shield, FlaskConical, Award, Truck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const BADGES = [
  { icon: Shield, label: "Third-Party Tested" },
  { icon: FlaskConical, label: "99%+ Purity" },
  { icon: Award, label: "Batch Verified" },
  { icon: Truck, label: "Ships 2-5 Days USA" },
];

const VIAL_COLORS = ["#1B6BDE", "#10B981", "#8B5CF6", "#4DA3FF"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const vialsY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020810 0%, #050D1A 40%, #0A1628 100%)" }}
    >
      {/* Parallax background grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.03, y: bgY }}
      >
        <div
          style={{
            backgroundImage: "linear-gradient(rgba(27,107,222,1) 1px, transparent 1px), linear-gradient(90deg, rgba(27,107,222,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            width: "100%",
            height: "120%",
          }}
        />
      </motion.div>

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(27, 107, 222, 0.15) 0%, transparent 70%)", filter: "blur(50px)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(77, 163, 255, 0.1) 0%, transparent 70%)", filter: "blur(50px)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            background: i % 3 === 0 ? "#4DA3FF" : i % 3 === 1 ? "#1B6BDE" : "#10B981",
            left: `${8 + (i * 7.5) % 85}%`,
            top: `${15 + (i * 13) % 70}%`,
            opacity: 0.3,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Vertical accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-16 w-px h-full opacity-10" style={{ background: "linear-gradient(180deg, transparent, #4DA3FF 30%, #1B6BDE 70%, transparent)" }} />
        <div className="absolute top-0 right-32 w-px h-full opacity-5" style={{ background: "linear-gradient(180deg, transparent, #4DA3FF, transparent)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text with staggered entrance */}
          <motion.div style={{ y: textY }}>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-blue-600/30"
              style={{ background: "rgba(27, 107, 222, 0.08)" }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-blue-400"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-blue-300 text-xs font-medium tracking-widest uppercase">
                Premium Quality Peptides
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6"
              style={{ fontFamily: "var(--font-heading, sans-serif)" }}
            >
              <span className="text-white">ENGINEERING</span>
              <br />
              <span className="text-white">THE FUTURE OF</span>
              <br />
              <motion.span
                style={{
                  background: "linear-gradient(90deg, #4DA3FF, #1B6BDE, #4DA3FF)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{ backgroundPosition: ["0% center", "200% center"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                PEPTIDE RESEARCH
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <p className="text-gray-400 text-lg mb-2 font-medium">Pure. Tested. Trusted.</p>
              <p className="text-gray-500 text-sm mb-8 max-w-lg leading-relaxed">
                Investigación de péptidos de la más alta pureza, producidos en instalaciones certificadas en EE.UU.
                Exclusivamente para uso en laboratorio e investigación científica.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/shop"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base"
                  style={{
                    background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)",
                    boxShadow: "0 0 30px rgba(27,107,222,0.35)",
                  }}
                >
                  SHOP NOW
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/protocols"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-blue-300 text-base border border-blue-600/40 hover:border-blue-400 hover:text-white transition-all"
                >
                  EXPLORE PROTOCOLS
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {BADGES.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05, borderColor: "rgba(77,163,255,0.4)" }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-blue-900/30 text-center cursor-default"
                  style={{ background: "rgba(15, 32, 64, 0.4)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                >
                  <Icon className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400 text-[11px] leading-tight">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D vials */}
          <motion.div
            style={{ y: vialsY }}
            className="flex justify-center lg:justify-end"
          >
            <HeroVials3D />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, #050D1A)" }} />
    </section>
  );
}

function HeroVials3D() {
  const vials = [
    { x: 0, y: 0, z: 0, scale: 1, opacity: 1, color: "#1B6BDE", delay: 0, duration: 3.5, size: 1 },
    { x: -110, y: 20, z: -60, scale: 0.78, opacity: 0.7, color: "#10B981", delay: 0.5, duration: 4, size: 0.78 },
    { x: 110, y: 15, z: -60, scale: 0.78, opacity: 0.7, color: "#8B5CF6", delay: 1, duration: 4.5, size: 0.78 },
    { x: -55, y: -70, z: -100, scale: 0.6, opacity: 0.45, color: "#4DA3FF", delay: 0.8, duration: 5, size: 0.6 },
    { x: 55, y: -70, z: -100, scale: 0.6, opacity: 0.45, color: "#F59E0B", delay: 1.5, duration: 3.8, size: 0.6 },
  ];

  return (
    <div
      className="relative"
      style={{
        width: 360,
        height: 440,
        perspective: 1200,
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* Central glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(27,107,222,0.2) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {vials.map((v, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            translateX: `calc(-50% + ${v.x}px)`,
            translateY: `calc(-50% + ${v.y}px)`,
            translateZ: v.z,
            scale: v.scale,
            opacity: v.opacity,
            transformStyle: "preserve-3d",
            zIndex: vials.length - i,
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: v.opacity, y: [v.y - 8, v.y + 8, v.y - 8] }}
          transition={{
            opacity: { duration: 0.8, delay: i * 0.15 },
            y: { duration: v.duration, repeat: Infinity, ease: "easeInOut", delay: v.delay },
          }}
        >
          <HeroVialSVG color={v.color} index={i} />

          {/* Per-vial glow shadow */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 60 * v.scale,
              height: 12 * v.scale,
              background: `radial-gradient(ellipse, ${v.color}80, transparent)`,
              filter: "blur(6px)",
            }}
            animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.8, 1.2, 0.8] }}
            transition={{ duration: v.duration, repeat: Infinity, ease: "easeInOut", delay: v.delay }}
          />
        </motion.div>
      ))}

      {/* Floating stat cards */}
      <motion.div
        className="absolute top-6 right-0 px-4 py-3 rounded-xl border border-blue-600/20 z-20"
        style={{ background: "rgba(10, 22, 40, 0.92)", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p className="text-blue-400 font-bold text-xl">99%+</p>
        <p className="text-gray-400 text-xs">Purity Guaranteed</p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-0 px-4 py-3 rounded-xl border border-blue-600/20 z-20"
        style={{ background: "rgba(10, 22, 40, 0.92)", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <p className="text-white font-bold text-xl">100+</p>
        <p className="text-gray-400 text-xs">Peptide Compounds</p>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-2 px-3 py-2 rounded-xl border border-green-600/20 z-20"
        style={{ background: "rgba(10, 22, 40, 0.92)", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="text-green-400 font-bold text-base">US Made</p>
        <p className="text-gray-400 text-xs">cGMP Certified</p>
      </motion.div>
    </div>
  );
}

function HeroVialSVG({ color, index }: { color: string; index: number }) {
  const id = `hv${index}`;
  return (
    <svg width="90" height="126" viewBox="0 0 90 126" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 20px 40px ${color}60)` }}
    >
      {/* Cap */}
      <rect x="25" y="0" width="40" height="16" rx="6" fill={`url(#${id}cap)`} />
      <rect x="32" y="13" width="26" height="6" rx="3" fill="#8EB4D4" opacity="0.7" />
      {/* Body */}
      <rect x="16" y="18" width="58" height="98" rx="14" fill={`url(#${id}body)`} />
      {/* Inner shine */}
      <rect x="20" y="20" width="9" height="94" rx="4.5" fill="white" opacity="0.04" />
      {/* Label */}
      <rect x="22" y="34" width="46" height="60" rx="6" fill={`url(#${id}label)`} />
      {/* Label accent line */}
      <rect x="22" y="34" width="46" height="3" rx="1.5" fill={color} opacity="0.6" />
      {/* Logo */}
      <text x="45" y="56" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" opacity="0.95" fontFamily="sans-serif">A</text>
      <text x="45" y="67" textAnchor="middle" fill={color} fontSize="5.5" fontWeight="bold" letterSpacing="1.5" fontFamily="sans-serif">AUROGEN</text>
      <text x="45" y="75" textAnchor="middle" fill="#8EB4D4" fontSize="4.5" letterSpacing="1" fontFamily="sans-serif">LABS</text>
      <text x="45" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">5MG</text>
      <text x="45" y="93" textAnchor="middle" fill="white" fontSize="4" fontFamily="sans-serif" opacity="0.5">RESEARCH ONLY</text>
      {/* Liquid */}
      <rect x="18" y="98" width="54" height="16" rx="7" fill={color} opacity="0.18" />
      <rect x="24" y="100" width="14" height="12" rx="3" fill="white" opacity="0.04" />
      <defs>
        <linearGradient id={`${id}cap`} x1="25" y1="0" x2="65" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7EC4FF" />
          <stop offset="100%" stopColor="#4DA3FF" />
        </linearGradient>
        <linearGradient id={`${id}body`} x1="16" y1="18" x2="74" y2="116" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A3666" />
          <stop offset="45%" stopColor="#0D2244" />
          <stop offset="100%" stopColor="#050D1A" />
        </linearGradient>
        <linearGradient id={`${id}label`} x1="22" y1="34" x2="68" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F2040" />
          <stop offset="100%" stopColor="#0A1628" />
        </linearGradient>
      </defs>
    </svg>
  );
}
