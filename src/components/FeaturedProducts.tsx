"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { FEATURED_PRODUCTS } from "@/data/products";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const CARD_STYLES = [
  { bg: "linear-gradient(160deg, #2C1800 0%, #100900 100%)", accent: "#C9922A", glow: "rgba(201,146,42,0.18)" },
  { bg: "linear-gradient(160deg, #001E18 0%, #000A08 100%)", accent: "#10B981", glow: "rgba(16,185,129,0.18)" },
  { bg: "linear-gradient(160deg, #1C0D32 0%, #09050E 100%)", accent: "#A78BFA", glow: "rgba(167,139,250,0.18)" },
  { bg: "linear-gradient(160deg, #0A1530 0%, #04080E 100%)", accent: "#60A5FA", glow: "rgba(96,165,250,0.18)" },
  { bg: "linear-gradient(160deg, #001A28 0%, #00080F 100%)", accent: "#22D3EE", glow: "rgba(34,211,238,0.18)" },
  { bg: "linear-gradient(160deg, #0A2012 0%, #040D07 100%)", accent: "#4ADE80", glow: "rgba(74,222,128,0.18)" },
];

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  }

  return (
    <section className="py-24 overflow-hidden" style={{ background: "#696969" }}>
      {/* Header */}
      <div className="px-6 md:px-16 mb-12 flex items-end justify-between max-w-[1440px] mx-auto">
        <div>
          <p
            className="text-xs font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: "#C9922A", fontFamily: "var(--font-body, sans-serif)" }}
          >
            Top sellers
          </p>
          <h2
            className="text-white font-bold leading-[1.0]"
            style={{
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.01em",
            }}
          >
            Explore the lineup.
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body, sans-serif)" }}
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 px-6 md:px-16"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {FEATURED_PRODUCTS.map((product, i) => (
          <LineupCard
            key={product.id}
            product={product}
            style={CARD_STYLES[i % CARD_STYLES.length]}
            index={i}
          />
        ))}

        {/* View all card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: FEATURED_PRODUCTS.length * 0.07 }}
          className="shrink-0 rounded-3xl flex flex-col items-center justify-center gap-4"
          style={{
            width: 220,
            height: 440,
            scrollSnapAlign: "start",
            background: "#555555",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            className="text-white font-bold text-center text-lg px-6 leading-snug"
            style={{ fontFamily: "var(--font-heading, sans-serif)" }}
          >
            100+ Compounds
          </p>
          <p className="text-xs text-center px-8" style={{ color: "rgba(255,255,255,0.35)" }}>
            Research-grade. Third-party tested.
          </p>
          <Link
            href="/shop"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-black"
            style={{ background: "#C9922A" }}
          >
            Full catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function LineupCard({
  product,
  style,
  index,
}: {
  product: Product;
  style: (typeof CARD_STYLES)[0];
  index: number;
}) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="relative shrink-0 rounded-3xl overflow-hidden flex flex-col"
      style={{
        width: 260,
        height: 440,
        background: style.bg,
        scrollSnapAlign: "start",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
            style={{
              background: `${style.accent}18`,
              color: style.accent,
              border: `1px solid ${style.accent}35`,
              fontFamily: "var(--font-body, sans-serif)",
            }}
          >
            {product.badge}
          </span>
        </div>
      )}

      {!product.inStock && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-white/5 text-white/40 border border-white/10"
            style={{ fontFamily: "var(--font-body, sans-serif)" }}>
            OUT OF STOCK
          </span>
        </div>
      )}

      {/* Vial display */}
      <Link href={`/product/${product.slug}`} className="flex-1 flex items-center justify-center relative pt-8 pb-4">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 45% at 50% 55%, ${style.glow}, transparent)`,
          }}
        />
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
          className="relative z-10"
          style={{ filter: `drop-shadow(0 24px 48px ${style.accent}50)` }}
        >
          <LineupVial accent={style.accent} index={index} />
        </motion.div>

        {/* Reflection */}
        <motion.div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full"
          style={{ width: 56, height: 8, background: `radial-gradient(ellipse, ${style.accent}50, transparent)`, filter: "blur(5px)" }}
          animate={{ opacity: [0.2, 0.45, 0.2], scaleX: [0.8, 1.15, 0.8] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
        />
      </Link>

      {/* Info */}
      <div className="px-5 pb-5 pt-1">
        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-[10px] ml-1" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>(4.9)</span>
        </div>

        <h3
          className="text-white font-bold mb-1"
          style={{
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "clamp(18px, 2vw, 22px)",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          {product.name}
        </h3>

        <p
          className="text-xs mb-3 leading-relaxed line-clamp-2"
          style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-body, sans-serif)" }}
        >
          {product.description}
        </p>

        <p
          className="font-bold mb-4"
          style={{
            fontSize: "1.5rem",
            color: "white",
            fontFamily: "var(--font-body, sans-serif)",
            letterSpacing: "-0.02em",
          }}
        >
          ${product.price}
        </p>

        <div className="flex items-center gap-3">
          <Link
            href={`/product/${product.slug}`}
            className="flex-1 text-center py-2.5 rounded-full text-sm font-semibold text-black transition-opacity hover:opacity-90"
            style={{
              background: style.accent,
              fontFamily: "var(--font-body, sans-serif)",
            }}
          >
            Learn more
          </Link>
          {product.inStock ? (
            <button
              onClick={() => addItem(product)}
              className="p-2.5 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <ShoppingCart className="w-4 h-4" style={{ color: "rgba(255,255,255,0.7)" }} />
            </button>
          ) : (
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>
              Sold out
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function LineupVial({ accent, index }: { accent: string; index: number }) {
  const id = `lv${index}`;
  return (
    <svg width="88" height="124" viewBox="0 0 76 106" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="23" y="0" width="30" height="13" rx="5" fill={`url(#${id}cap)`} />
      <rect x="28" y="11" width="20" height="5" rx="2.5" fill="#AAAAAA" opacity="0.6" />
      <rect x="14" y="15" width="48" height="82" rx="12" fill={`url(#${id}body)`} />
      <rect x="17" y="17" width="8" height="78" rx="4" fill="white" opacity="0.04" />
      <rect x="20" y="30" width="36" height="50" rx="5" fill={`url(#${id}label)`} />
      <rect x="20" y="30" width="36" height="2.5" rx="1" fill={accent} opacity="0.6" />
      <text x="38" y="50" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" opacity="0.92" fontFamily="sans-serif">A</text>
      <text x="38" y="59" textAnchor="middle" fill={accent} fontSize="4.5" fontWeight="bold" letterSpacing="1.5" fontFamily="sans-serif">AUROGEN</text>
      <text x="38" y="67" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">5MG</text>
      <text x="38" y="74" textAnchor="middle" fill="white" fontSize="3.8" fontFamily="sans-serif" opacity="0.45">RESEARCH ONLY</text>
      <rect x="16" y="82" width="44" height="13" rx="6" fill={accent} opacity="0.14" />
      <rect x="20" y="84" width="12" height="9" rx="3" fill="white" opacity="0.04" />
      <defs>
        <linearGradient id={`${id}cap`} x1="23" y1="0" x2="53" y2="13" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D0D0D0" />
          <stop offset="100%" stopColor="#888888" />
        </linearGradient>
        <linearGradient id={`${id}body`} x1="14" y1="15" x2="62" y2="97" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="45%" stopColor="#181818" />
          <stop offset="100%" stopColor="#0D0D0D" />
        </linearGradient>
        <linearGradient id={`${id}label`} x1="20" y1="30" x2="56" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#222222" />
          <stop offset="100%" stopColor="#161616" />
        </linearGradient>
      </defs>
    </svg>
  );
}
