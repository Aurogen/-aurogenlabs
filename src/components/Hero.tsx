"use client";

import Link from "next/link";
import { ArrowRight, Shield, FlaskConical, Award, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

const BADGES = [
  { icon: Shield, label: "Third-Party Tested" },
  { icon: FlaskConical, label: "99%+ Purity" },
  { icon: Award, label: "Batch Verified" },
  { icon: Truck, label: "Ships 2–5 Business Days" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-center overflow-hidden"
      style={{ background: "#1D1D1F", minHeight: "92vh" }}
    >
      {/* Text — centered */}
      <div className="flex flex-col items-center text-center px-4 py-28 mx-auto w-full max-w-4xl">
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
          className="font-bold leading-[1.0] mb-6 tracking-tight"
          style={{
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "clamp(52px, 8vw, 104px)",
            color: "#F5F5F7",
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
          className="text-lg mb-12 max-w-lg leading-relaxed"
          style={{ color: "rgba(245,245,247,0.60)" }}
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
          <Link
            href="/shop"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-black text-sm transition-opacity hover:opacity-90"
            style={{ background: "#C9922A" }}
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/protocols"
            className="px-8 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/10"
            style={{ border: "1px solid rgba(245,245,247,0.25)", color: "rgba(245,245,247,0.85)" }}
          >
            Explore Protocols
          </Link>
        </motion.div>
      </div>

      {/* Trust strip */}
      <div className="py-5 px-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-7 lg:gap-12">
          {BADGES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-4 h-4 shrink-0" style={{ color: "#C9922A" }} />
              <span className="text-sm" style={{ color: "rgba(245,245,247,0.50)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

