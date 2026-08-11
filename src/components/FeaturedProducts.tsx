"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { FEATURED_PRODUCTS } from "@/data/products";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const BG_VIDEOS = [
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_164633_8fe5fae4-2747-4529-94ab-d2f81453f2c5.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_163541_332a7688-cf41-400e-ab3c-56c2f6433499.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_164706_bd49faa1-adfa-490c-8b49-7007e9ea0303.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_164633_35c4e890-6344-450c-be9e-ff0388c2037b.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_171853_95c2e5f5-ae6a-401b-898c-b981400d3471.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_171853_423790f5-d7a3-4471-b9a9-ef22fd1307a2.mp4",
];

const ACCENT_COLORS = [
  "#6B7A8D",
  "#10B981",
  "#A78BFA",
  "#60A5FA",
  "#22D3EE",
  "#4ADE80",
];

function VideoCycler() {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Start all videos playing so they're buffered before needed
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) { v.muted = true; v.play().catch(() => {}); }
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => {
        const nextIdx = (prev + 1) % BG_VIDEOS.length;
        const nextVid = videoRefs.current[nextIdx];
        if (nextVid) {
          nextVid.currentTime = 0;
          nextVid.play().catch(() => {});
        }
        return nextIdx;
      });
    }, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {BG_VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el; }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 0,
            opacity: i === active ? 1 : 0,
            transition: "opacity 1.4s ease-in-out",
            pointerEvents: "none",
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </>
  );
}

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 260 : -260, behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 480 }}>
      {/* Video background cycler */}
      <VideoCycler />

      {/* Overlay — dark gradient for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(10,12,16,0.82) 0%, rgba(18,22,28,0.72) 50%, rgba(10,12,16,0.82) 100%)",
          zIndex: 1,
        }}
      />

      {/* Fallback solid bg (shows when no video loaded) */}
      <div
        className="absolute inset-0"
        style={{ background: "#0D1117", zIndex: -1 }}
      />

      {/* Content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Header */}
        <div className="px-6 md:px-16 pt-10 pb-6 flex items-end justify-between max-w-[1440px] mx-auto">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.28em] uppercase mb-3"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body, sans-serif)" }}
            >
              Top sellers
            </p>
            <h2
              className="font-bold leading-[1.0]"
              style={{
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
              }}
            >
              Explore the lineup.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body, sans-serif)" }}
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => scroll("left")}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-10 px-6 md:px-16"
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
              width: 200,
              height: 360,
              scrollSnapAlign: "start",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p
              className="font-bold text-center text-lg px-6 leading-snug"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#FFFFFF" }}
            >
              100+ Compounds
            </p>
            <p className="text-xs text-center px-8" style={{ color: "rgba(255,255,255,0.45)" }}>
              Research-grade. Third-party tested.
            </p>
            <Link
              href="/shop"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ background: "rgba(255,255,255,0.15)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              Full catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
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
      whileHover={{ y: -6 }}
      viewport={{ once: true }}
      transition={{
        opacity: { duration: 0.45, delay: index * 0.06 },
        y: { type: "spring", stiffness: 320, damping: 26 },
      }}
      className="group relative shrink-0 rounded-2xl overflow-hidden flex flex-col"
      style={{
        width: 210,
        height: 360,
        scrollSnapAlign: "start",
        background: "rgba(14,16,22,0.88)",
        border: "1px solid rgba(255,255,255,0.09)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 right-3 z-10">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
            style={{
              background: "rgba(10,132,255,0.12)",
              color: "#0A84FF",
              border: "1px solid rgba(10,132,255,0.28)",
              fontFamily: "var(--font-body, sans-serif)",
            }}
          >
            {product.badge}
          </span>
        </div>
      )}

      {!product.inStock && (
        <div className="absolute top-3 left-3 z-10">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
            style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.12)", fontFamily: "var(--font-body, sans-serif)" }}
          >
            OUT OF STOCK
          </span>
        </div>
      )}

      {/* Vial display */}
      <Link
        href={`/product/${product.slug}`}
        className="relative flex-1 flex items-center justify-center overflow-hidden"
        style={{ background: product.image ? `radial-gradient(ellipse at 50% 85%, ${accent}35 0%, rgba(10,12,16,0.97) 72%)` : "rgba(10,12,16,0.97)" }}
      >
        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
            mixBlendMode: "overlay",
          }}
        />
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center center",
              padding: "14px 18px",
            }}
          />
        ) : (
          <div className="transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2">
            <LineupVial accent={accent} index={index} />
          </div>
        )}
        {/* View overlay */}
        <div
          className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 55%)" }}
        >
          <span className="flex items-center gap-1 text-white text-[10px] font-semibold tracking-[0.2em] uppercase">
            View <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="px-4 pb-4 pt-3">
        <h3
          className="font-semibold mb-1"
          style={{
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "clamp(16px, 2vw, 20px)",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            color: "#FFFFFF",
          }}
        >
          {product.name}
        </h3>

        <p
          className="text-xs mb-3 leading-relaxed line-clamp-2"
          style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body, sans-serif)" }}
        >
          {product.description}
        </p>

        <p
          className="font-bold mb-3"
          style={{
            fontSize: "1.25rem",
            color: "#10B981",
            fontFamily: "var(--font-body, sans-serif)",
            letterSpacing: "-0.02em",
          }}
        >
          ${product.price}
        </p>

        <div className="flex items-center gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="flex-1 text-center py-2 rounded-full text-xs font-semibold transition-opacity hover:opacity-85"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.18)",
              fontFamily: "var(--font-body, sans-serif)",
            }}
          >
            Learn more
          </Link>
          {product.inStock ? (
            <button
              onClick={() => addItem(product)}
              className="p-2 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <ShoppingCart className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.7)" }} />
            </button>
          ) : (
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
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
    <svg width="80" height="112" viewBox="0 0 76 106" fill="none" xmlns="http://www.w3.org/2000/svg">
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
