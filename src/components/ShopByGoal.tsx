"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Goal } from "@/data/products";
import { GOALS } from "@/data/products";

/* ─── Per-goal visual config ─── */
const GOAL_CONFIG: Record<
  Goal,
  {
    accent: string;
    glow: string;
    gradient: string;
    bgGradient: string;
    illustration: React.ReactNode;
  }
> = {
  "Fat Loss": {
    accent: "#FF6B35",
    glow: "rgba(255,107,53,0.3)",
    gradient: "linear-gradient(160deg, #3D1A0A 0%, #1A0800 100%)",
    bgGradient: "linear-gradient(180deg, rgba(255,107,53,0.15) 0%, rgba(180,40,0,0.4) 100%)",
    illustration: <FatLossIllustration />,
  },
  "Muscle Growth": {
    accent: "#1B6BDE",
    glow: "rgba(27,107,222,0.3)",
    gradient: "linear-gradient(160deg, #0A1A3D 0%, #050D1A 100%)",
    bgGradient: "linear-gradient(180deg, rgba(27,107,222,0.15) 0%, rgba(10,30,100,0.4) 100%)",
    illustration: <MuscleIllustration />,
  },
  "Recovery": {
    accent: "#10B981",
    glow: "rgba(16,185,129,0.3)",
    gradient: "linear-gradient(160deg, #0A2218 0%, #050D0A 100%)",
    bgGradient: "linear-gradient(180deg, rgba(16,185,129,0.15) 0%, rgba(5,80,40,0.4) 100%)",
    illustration: <RecoveryIllustration />,
  },
  "Anti-Aging": {
    accent: "#8B5CF6",
    glow: "rgba(139,92,246,0.3)",
    gradient: "linear-gradient(160deg, #1A0A3D 0%, #0D0520 100%)",
    bgGradient: "linear-gradient(180deg, rgba(139,92,246,0.15) 0%, rgba(70,20,140,0.4) 100%)",
    illustration: <AntiAgingIllustration />,
  },
  "Skin & Hair": {
    accent: "#EC4899",
    glow: "rgba(236,72,153,0.3)",
    gradient: "linear-gradient(160deg, #3D0A20 0%, #1A0510 100%)",
    bgGradient: "linear-gradient(180deg, rgba(236,72,153,0.15) 0%, rgba(140,20,70,0.4) 100%)",
    illustration: <SkinHairIllustration />,
  },
  "Brain Health": {
    accent: "#06B6D4",
    glow: "rgba(6,182,212,0.3)",
    gradient: "linear-gradient(160deg, #0A2A3D 0%, #051018 100%)",
    bgGradient: "linear-gradient(180deg, rgba(6,182,212,0.15) 0%, rgba(5,80,120,0.4) 100%)",
    illustration: <BrainIllustration />,
  },
  "Performance": {
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    gradient: "linear-gradient(160deg, #2A1A00 0%, #120A00 100%)",
    bgGradient: "linear-gradient(180deg, rgba(245,158,11,0.15) 0%, rgba(120,60,0,0.4) 100%)",
    illustration: <PerformanceIllustration />,
  },
};

export default function ShopByGoal() {
  return (
    <section className="py-20 px-4" style={{ background: "#F5F5F7", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium tracking-[0.3em] uppercase mb-3"
            style={{ color: "#6E6E73" }}
          >
            Browse by objective
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            SHOP BY GOAL
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="max-w-xl mx-auto"
            style={{ color: "#6E6E73" }}
          >
            Find the right peptide compounds for your specific research objectives
          </motion.p>
        </div>

        {/* Cards grid — 2 col mobile, 3 tablet, 4 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {GOALS.map((goal, i) => {
            const cfg = GOAL_CONFIG[goal.label];
            return (
              <GoalCard
                key={goal.label}
                goal={goal}
                cfg={cfg}
                index={i}
                wide={i === 0}
              />
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-medium group transition-opacity hover:opacity-75"
            style={{ color: "#C9922A" }}
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function GoalCard({
  goal,
  cfg,
  index,
  wide,
}: {
  goal: (typeof GOALS)[0];
  cfg: (typeof GOAL_CONFIG)[Goal];
  index: number;
  wide?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={wide ? "sm:col-span-1 lg:col-span-1" : ""}
    >
      <Link href={`/shop?goal=${encodeURIComponent(goal.label)}`} className="group block">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
          className="relative rounded-2xl overflow-hidden cursor-pointer"
          style={{
            background: cfg.gradient,
            minHeight: 220,
            border: `1px solid ${cfg.accent}25`,
          }}
        >
          {/* Glow on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ boxShadow: `inset 0 0 40px ${cfg.glow}` }}
          />

          {/* Background illustration */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
              className="w-full h-full flex items-center justify-center"
            >
              {cfg.illustration}
            </motion.div>
          </div>

          {/* Gradient overlay bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none"
            style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)" }}
          />

          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, transparent, ${cfg.accent}, transparent)`, opacity: 0.7 }}
          />

          {/* Content */}
          <div className="relative z-10 p-5 flex flex-col justify-between h-full" style={{ minHeight: 220 }}>
            {/* Badge top-right */}
            <div className="flex justify-end">
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider"
                style={{
                  background: `${cfg.accent}18`,
                  color: cfg.accent,
                  border: `1px solid ${cfg.accent}35`,
                }}
              >
                {goal.count} Products
              </span>
            </div>

            {/* Bottom info */}
            <div className="mt-auto">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-2xl leading-none">{goal.icon}</span>
                <h3
                  className="text-white font-bold text-lg leading-tight group-hover:text-opacity-90 transition-all"
                  style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#FFFFFF" }}
                >
                  {goal.label.toUpperCase()}
                </h3>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">
                {goal.description}
              </p>

              {/* Arrow CTA */}
              <div
                className="inline-flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0"
                style={{ color: cfg.accent }}
              >
                Explore compounds
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ─── SVG illustrations per category ─── */

function FatLossIllustration() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      {/* Running figure silhouette */}
      <circle cx="100" cy="38" r="16" fill="#FF6B35" />
      <path d="M100 54 L88 110 L68 145 M100 54 L112 110 L132 145" stroke="#FF6B35" strokeWidth="8" strokeLinecap="round" />
      <path d="M88 82 L68 95 M112 82 L132 95" stroke="#FF6B35" strokeWidth="8" strokeLinecap="round" />
      {/* Speed lines */}
      <line x1="30" y1="100" x2="58" y2="100" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="22" y1="115" x2="55" y2="115" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <line x1="28" y1="85" x2="52" y2="85" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      {/* Flame */}
      <path d="M155 140 C155 120 145 110 150 95 C155 110 165 110 162 130 C170 118 168 105 165 98 C175 115 178 128 170 140 C166 148 158 152 155 140Z" fill="#FF6B35" opacity="0.7" />
    </svg>
  );
}

function MuscleIllustration() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      {/* Barbell */}
      <rect x="20" y="95" width="160" height="10" rx="5" fill="#1B6BDE" opacity="0.8" />
      <rect x="15" y="75" width="20" height="50" rx="6" fill="#4DA3FF" />
      <rect x="10" y="80" width="12" height="40" rx="4" fill="#1B6BDE" />
      <rect x="165" y="75" width="20" height="50" rx="6" fill="#4DA3FF" />
      <rect x="178" y="80" width="12" height="40" rx="4" fill="#1B6BDE" />
      {/* Flexing arms */}
      <circle cx="100" cy="40" r="14" fill="#4DA3FF" />
      <path d="M100 54 L100 100" stroke="#4DA3FF" strokeWidth="10" strokeLinecap="round" />
      <path d="M100 75 L55 90" stroke="#4DA3FF" strokeWidth="10" strokeLinecap="round" />
      <path d="M100 75 L145 90" stroke="#4DA3FF" strokeWidth="10" strokeLinecap="round" />
      <path d="M100 100 L80 140 M100 100 L120 140" stroke="#4DA3FF" strokeWidth="8" strokeLinecap="round" />
      {/* Muscle bulge */}
      <ellipse cx="70" cy="90" rx="14" ry="10" fill="#1B6BDE" opacity="0.6" />
      <ellipse cx="130" cy="90" rx="14" ry="10" fill="#1B6BDE" opacity="0.6" />
    </svg>
  );
}

function RecoveryIllustration() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      {/* Stretching figure */}
      <circle cx="100" cy="35" r="15" fill="#10B981" />
      {/* Body arms wide */}
      <path d="M100 50 L100 115" stroke="#10B981" strokeWidth="9" strokeLinecap="round" />
      <path d="M100 68 L30 55 M100 68 L170 55" stroke="#10B981" strokeWidth="8" strokeLinecap="round" />
      <path d="M100 115 L80 155 M100 115 L120 155" stroke="#10B981" strokeWidth="8" strokeLinecap="round" />
      {/* Healing rings */}
      <circle cx="100" cy="100" r="55" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.3" />
      <circle cx="100" cy="100" r="70" stroke="#10B981" strokeWidth="1" strokeDasharray="4 6" opacity="0.15" />
      {/* Plus symbol */}
      <rect x="155" y="38" width="20" height="6" rx="3" fill="#10B981" opacity="0.7" />
      <rect x="162" y="31" width="6" height="20" rx="3" fill="#10B981" opacity="0.7" />
    </svg>
  );
}

function AntiAgingIllustration() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      {/* DNA double helix */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const y = 30 + i * 22;
        const phase = (i / 7) * Math.PI * 2;
        const x1 = 85 + Math.sin(phase) * 30;
        const x2 = 85 - Math.sin(phase) * 30;
        return (
          <g key={i}>
            <circle cx={x1} cy={y} r="5" fill="#8B5CF6" opacity={0.8 - i * 0.05} />
            <circle cx={x2} cy={y} r="5" fill="#A78BFA" opacity={0.8 - i * 0.05} />
            {i < 6 && (
              <line
                x1={x1} y1={y}
                x2={85 + Math.sin((i + 1) / 7 * Math.PI * 2) * 30} y2={y + 22}
                stroke="#8B5CF6" strokeWidth="2" opacity="0.4"
              />
            )}
            {i < 6 && (
              <line
                x1={x2} y1={y}
                x2={85 - Math.sin((i + 1) / 7 * Math.PI * 2) * 30} y2={y + 22}
                stroke="#A78BFA" strokeWidth="2" opacity="0.4"
              />
            )}
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="#C4B5FD" strokeWidth="1.5" opacity="0.5" />
          </g>
        );
      })}
      {/* Infinity symbol */}
      <path d="M130 110 C130 100 140 90 155 100 C170 110 170 120 155 130 C140 140 130 130 115 120 C100 110 90 100 75 110 C60 120 60 130 75 130 C90 130 100 120 115 130" stroke="#8B5CF6" strokeWidth="3" fill="none" opacity="0.5" />
    </svg>
  );
}

function SkinHairIllustration() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      {/* Face silhouette */}
      <ellipse cx="100" cy="80" rx="40" ry="50" fill="#EC4899" opacity="0.15" />
      <ellipse cx="100" cy="75" rx="32" ry="38" fill="#EC4899" opacity="0.2" />
      {/* Hair flowing */}
      <path d="M68 55 C55 30 60 15 75 20 C70 35 78 45 68 55Z" fill="#EC4899" opacity="0.6" />
      <path d="M132 55 C145 30 140 15 125 20 C130 35 122 45 132 55Z" fill="#EC4899" opacity="0.6" />
      <path d="M68 55 C60 70 58 90 62 110 C70 100 72 80 68 55Z" fill="#EC4899" opacity="0.4" />
      <path d="M132 55 C140 70 142 90 138 110 C130 100 128 80 132 55Z" fill="#EC4899" opacity="0.4" />
      {/* Glow rings */}
      <circle cx="100" cy="80" r="58" stroke="#EC4899" strokeWidth="1" opacity="0.2" strokeDasharray="3 5" />
      <circle cx="100" cy="80" r="72" stroke="#EC4899" strokeWidth="1" opacity="0.1" strokeDasharray="2 6" />
      {/* Sparkles */}
      {[[150, 40], [35, 70], [160, 130], [30, 140]].map(([x, y], i) => (
        <g key={i}>
          <line x1={x as number} y1={(y as number) - 8} x2={x as number} y2={(y as number) + 8} stroke="#EC4899" strokeWidth="2" opacity="0.6" />
          <line x1={(x as number) - 8} y1={y as number} x2={(x as number) + 8} y2={y as number} stroke="#EC4899" strokeWidth="2" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

function BrainIllustration() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      {/* Brain outline */}
      <path d="M100 40 C125 38 148 50 155 70 C165 85 162 105 152 118 C158 130 155 148 140 155 C130 162 115 158 108 150 C105 158 95 162 85 158 C70 152 60 138 65 125 C52 115 45 98 52 82 C58 65 75 50 100 40Z" stroke="#06B6D4" strokeWidth="2" fill="none" opacity="0.7" />
      {/* Brain wrinkles */}
      <path d="M80 65 C90 58 110 60 118 70" stroke="#06B6D4" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M65 90 C72 80 85 78 95 85 C105 92 118 88 130 80" stroke="#06B6D4" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M70 110 C80 102 95 104 102 115 C110 126 125 122 140 115" stroke="#06B6D4" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M78 135 C88 128 102 130 108 140" stroke="#06B6D4" strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* Neural dots */}
      {[[100, 65], [80, 88], [120, 88], [70, 112], [130, 108], [100, 120], [90, 140], [112, 138]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#06B6D4" opacity={0.6 + (i % 3) * 0.1} />
      ))}
      {/* Synapses */}
      <line x1="100" y1="65" x2="80" y2="88" stroke="#06B6D4" strokeWidth="1" opacity="0.3" />
      <line x1="80" y1="88" x2="70" y2="112" stroke="#06B6D4" strokeWidth="1" opacity="0.3" />
      <line x1="120" y1="88" x2="130" y2="108" stroke="#06B6D4" strokeWidth="1" opacity="0.3" />
      <line x1="100" y1="120" x2="90" y2="140" stroke="#06B6D4" strokeWidth="1" opacity="0.3" />
      {/* Electric arc */}
      <path d="M148 55 L140 68 L152 75 L144 88" stroke="#06B6D4" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
    </svg>
  );
}

function PerformanceIllustration() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      {/* Sprinting figure */}
      <circle cx="110" cy="35" r="14" fill="#F59E0B" />
      {/* Body leaning forward */}
      <path d="M110 49 L95 90" stroke="#F59E0B" strokeWidth="9" strokeLinecap="round" />
      {/* Arms pumping */}
      <path d="M106 65 L75 55 M106 65 L130 78" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" />
      {/* Legs stride */}
      <path d="M95 90 L70 130 M95 90 L118 128" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
      {/* Lightning bolt */}
      <path d="M150 20 L135 60 L148 60 L130 100 L148 100 L125 145" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      {/* Speed lines */}
      <line x1="20" y1="90" x2="60" y2="90" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <line x1="15" y1="108" x2="58" y2="108" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <line x1="25" y1="72" x2="55" y2="72" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      {/* Ground shadow */}
      <ellipse cx="90" cy="170" rx="45" ry="6" fill="#F59E0B" opacity="0.12" />
    </svg>
  );
}
