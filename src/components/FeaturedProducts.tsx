"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { FEATURED_PRODUCTS } from "@/data/products";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ACCENT_COLORS = [
  "#C9922A",
  "#10B981",
  "#A78BFA",
  "#60A5FA",
  "#22D3EE",
  "#4ADE80",
];

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  }

  return (
    <section className="pt-10 pb-24 overflow-hidden" style={{ background: "#F6F6F8" }}>
      {/* Header */}
      <div className="px-6 md:px-16 mb-12 flex items-end justify-between max-w-[1440px] mx-auto">
        <div>
          <p
            className="text-xs font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: "#6E6E73", fontFamily: "var(--font-body, sans-serif)" }}
          >
            Top sellers
          </p>
          <h2
            className="font-bold leading-[1.0]"
            style={{
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "-0.01em",
              color: "#1D1D1F",
            }}
          >
            Explore the lineup.
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-60"
            style={{ color: "#6E6E73", fontFamily: "var(--font-body, sans-serif)" }}
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-black/10"
              style={{ background: "rgba(0,0,0,0.06)", color: "#3D3D3F" }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-black/10"
              style={{ background: "rgba(0,0,0,0.06)", color: "#3D3D3F" }}
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
            accent={ACCENT_COLORS[i % ACCENT_COLORS.length]}
            index={i}
          />
        ))}

        {/* View all card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: FEATURED_PRODUCTS.length * 0.06 }}
          className="shrink-0 rounded-2xl flex flex-col items-center justify-center gap-4"
          style={{
            width: 220,
            height: 400,
            scrollSnapAlign: "start",
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.07)",
          }}
        >
          <p
            className="font-bold text-center text-lg px-6 leading-snug"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            100+ Compounds
          </p>
          <p className="text-xs text-center px-8" style={{ color: "#6E6E73" }}>
            Research-grade. Third-party tested.
          </p>
          <Link
            href="/shop"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{ background: "#1D1D1F" }}
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
  accent,
  index,
}: {
  product: Product;
  accent: string;
  index: number;
}) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="relative shrink-0 rounded-2xl overflow-hidden flex flex-col"
      style={{
        width: 240,
        height: 400,
        scrollSnapAlign: "start",
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
            style={{
              background: `${accent}14`,
              color: accent,
              border: `1px solid ${accent}30`,
              fontFamily: "var(--font-body, sans-serif)",
            }}
          >
            {product.badge}
          </span>
        </div>
      )}

      {!product.inStock && (
        <div className="absolute top-4 left-4 z-10">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
            style={{ background: "rgba(0,0,0,0.05)", color: "#9D9D9D", border: "1px solid rgba(0,0,0,0.1)", fontFamily: "var(--font-body, sans-serif)" }}
          >
            OUT OF STOCK
          </span>
        </div>
      )}

      {/* Vial display */}
      <Link
        href={`/product/${product.slug}`}
        className="flex-1 flex items-center justify-center"
        style={{ background: "#F5F2EC" }}
      >
        <LineupVial accent={accent} index={index} />
      </Link>

      {/* Info */}
      <div className="px-5 pb-5 pt-4">
        <h3
          className="font-bold mb-1"
          style={{
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "clamp(16px, 2vw, 19px)",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            color: "#1D1D1F",
          }}
        >
          {product.name}
        </h3>

        <p
          className="text-xs mb-3 leading-relaxed line-clamp-2"
          style={{ color: "#6E6E73", fontFamily: "var(--font-body, sans-serif)" }}
        >
          {product.description}
        </p>

        <p
          className="font-bold mb-4"
          style={{
            fontSize: "1.4rem",
            color: "#1B7A45",
            fontFamily: "var(--font-body, sans-serif)",
            letterSpacing: "-0.02em",
          }}
        >
          ${product.price}
        </p>

        <div className="flex items-center gap-3">
          <Link
            href={`/product/${product.slug}`}
            className="flex-1 text-center py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
            style={{
              background: "#1D1D1F",
              color: "#FFFFFF",
              fontFamily: "var(--font-body, sans-serif)",
            }}
          >
            Learn more
          </Link>
          {product.inStock ? (
            <button
              onClick={() => addItem(product)}
              className="p-2.5 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{ background: "rgba(0,0,0,0.06)" }}
            >
              <ShoppingCart className="w-4 h-4" style={{ color: "#3D3D3F" }} />
            </button>
          ) : (
            <span className="text-xs" style={{ color: "#9D9D9D", fontFamily: "var(--font-body)" }}>
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
