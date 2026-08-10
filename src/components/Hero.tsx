"use client";

import Link from "next/link";
import { ArrowRight, Shield, FlaskConical, Award, Truck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const BADGES = [
  { icon: Shield, label: "Third-Party Tested" },
  { icon: FlaskConical, label: "99%+ Purity" },
  { icon: Award, label: "Batch Verified" },
  { icon: Truck, label: "Ships 2–5 Business Days" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const vialsY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{ background: "#000000", minHeight: "100vh" }}
    >
      {/* Text — centered */}
      <motion.div
        style={{ y: textY }}
        className="flex flex-col items-center text-center px-4 pt-28 pb-8 mx-auto w-full max-w-4xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-6"
          style={{ color: "#C9922A" }}
        >
          Research-Grade Peptides
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="font-bold leading-[1.0] mb-5 tracking-tight"
          style={{
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "clamp(48px, 8vw, 100px)",
            color: "#FFFFFF",
          }}
        >
          Engineering<br />
          the Future of<br />
          <span style={{ color: "#C9922A" }}>Peptide Research.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="text-lg mb-10 max-w-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.48)" }}
        >
          Highest-purity compounds for advanced scientific investigation.
          Third-party tested. cGMP certified.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26 }}
          className="flex items-center gap-4 flex-wrap justify-center"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/shop"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-black text-sm"
              style={{ background: "#C9922A" }}
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/protocols"
              className="px-8 py-3.5 rounded-full font-semibold text-white text-sm"
              style={{ border: "1px solid rgba(255,255,255,0.22)" }}
            >
              Explore Protocols
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Vials — centered product display like Apple's iPhone lineup */}
      <motion.div
        style={{ y: vialsY }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.38 }}
        className="flex justify-center pb-14 px-4"
      >
        <HeroVials3D />
      </motion.div>

      {/* Trust strip */}
      <div className="py-5 px-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-7 lg:gap-12">
          {BADGES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-4 h-4 shrink-0" style={{ color: "#C9922A" }} />
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroVials3D() {
  const vials = [
    { x: 0, y: 0, z: 0, scale: 1, opacity: 1, color: "#C9922A", delay: 0, duration: 3.5 },
    { x: -120, y: 25, z: -60, scale: 0.8, opacity: 0.72, color: "#10B981", delay: 0.5, duration: 4 },
    { x: 120, y: 18, z: -60, scale: 0.8, opacity: 0.72, color: "#8B5CF6", delay: 1, duration: 4.5 },
    { x: -60, y: -75, z: -110, scale: 0.62, opacity: 0.46, color: "#F0B429", delay: 0.8, duration: 5 },
    { x: 60, y: -75, z: -110, scale: 0.62, opacity: 0.46, color: "#B45309", delay: 1.5, duration: 3.8 },
  ];

  return (
    <div
      className="relative"
      style={{ width: 380, height: 460, perspective: 1200, perspectiveOrigin: "50% 50%" }}
    >
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
          animate={{ opacity: v.opacity, y: [v.y - 9, v.y + 9, v.y - 9] }}
          transition={{
            opacity: { duration: 0.8, delay: i * 0.15 },
            y: { duration: v.duration, repeat: Infinity, ease: "easeInOut", delay: v.delay },
          }}
        >
          <HeroVialSVG color={v.color} index={i} />
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 60 * v.scale,
              height: 10 * v.scale,
              background: `radial-gradient(ellipse, ${v.color}60, transparent)`,
              filter: "blur(6px)",
            }}
            animate={{ opacity: [0.25, 0.55, 0.25], scaleX: [0.8, 1.2, 0.8] }}
            transition={{ duration: v.duration, repeat: Infinity, ease: "easeInOut", delay: v.delay }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function HeroVialSVG({ color, index }: { color: string; index: number }) {
  const id = `hv${index}`;
  return (
    <svg width="90" height="126" viewBox="0 0 90 126" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 20px 40px ${color}50)` }}
    >
      <rect x="25" y="0" width="40" height="16" rx="6" fill={`url(#${id}cap)`} />
      <rect x="32" y="13" width="26" height="6" rx="3" fill="#AAAAAA" opacity="0.6" />
      <rect x="16" y="18" width="58" height="98" rx="14" fill={`url(#${id}body)`} />
      <rect x="20" y="20" width="9" height="94" rx="4.5" fill="white" opacity="0.04" />
      <rect x="22" y="34" width="46" height="60" rx="6" fill={`url(#${id}label)`} />
      <rect x="22" y="34" width="46" height="3" rx="1.5" fill={color} opacity="0.6" />
      <text x="45" y="56" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" opacity="0.95" fontFamily="sans-serif">A</text>
      <text x="45" y="67" textAnchor="middle" fill={color} fontSize="5.5" fontWeight="bold" letterSpacing="1.5" fontFamily="sans-serif">AUROGEN</text>
      <text x="45" y="75" textAnchor="middle" fill="#AAAAAA" fontSize="4.5" letterSpacing="1" fontFamily="sans-serif">LABS</text>
      <text x="45" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">5MG</text>
      <text x="45" y="93" textAnchor="middle" fill="white" fontSize="4" fontFamily="sans-serif" opacity="0.5">RESEARCH ONLY</text>
      <rect x="18" y="98" width="54" height="16" rx="7" fill={color} opacity="0.18" />
      <rect x="24" y="100" width="14" height="12" rx="3" fill="white" opacity="0.04" />
      <defs>
        <linearGradient id={`${id}cap`} x1="25" y1="0" x2="65" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8C8C8" />
          <stop offset="100%" stopColor="#909090" />
        </linearGradient>
        <linearGradient id={`${id}body`} x1="16" y1="18" x2="74" y2="116" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E1E1E" />
          <stop offset="45%" stopColor="#121212" />
          <stop offset="100%" stopColor="#070707" />
        </linearGradient>
        <linearGradient id={`${id}label`} x1="22" y1="34" x2="68" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
      </defs>
    </svg>
  );
}
