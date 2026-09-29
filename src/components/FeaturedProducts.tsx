"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { FEATURED_PRODUCTS } from "@/data/products";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

const BG_VIDEOS = [
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_164633_8fe5fae4-2747-4529-94ab-d2f81453f2c5.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_163541_332a7688-cf41-400e-ab3c-56c2f6433499.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_164706_bd49faa1-adfa-490c-8b49-7007e9ea0303.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_164633_35c4e890-6344-450c-be9e-ff0388c2037b.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_181937_4b40fd95-b588-404a-8148-2b55717d36ff.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260811_181937_4071d56a-fbd2-40e4-9b62-5dab69a84576.mp4",
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
          ref={(el) => { videoRefs.current[i] = el; if (el) el.muted = true; }}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload={i === 0 ? "auto" : "none"}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 0,
            opacity: i === active ? 1 : 0,
            transition: "opacity 1.4s ease-in-out",
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

export default function FeaturedProducts() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 500 : -500, behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 480 }}>
      {/* Video background cycler */}
      <VideoCycler />

      {/* Overlay — dark gradient for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(8,10,14,0.55) 0%, rgba(8,10,14,0.35) 45%, rgba(8,10,14,0.7) 100%)",
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
        <div className="px-5 sm:px-8 md:px-12 lg:px-16 pt-14 pb-8 flex items-end justify-between max-w-7xl mx-auto">
          <div>
            <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              {t("Top sellers", "Más vendidos")}
            </p>
            <h2
              className="font-bold leading-none"
              style={{
                fontFamily: "var(--font-heading, sans-serif)",
                fontSize: "clamp(34px, 4.5vw, 56px)",
                letterSpacing: "-0.015em",
                color: "#FFFFFF",
              }}
            >
              {t("The lineup", "El catálogo")}
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/shop"
              className="hidden sm:inline text-sm underline underline-offset-4 decoration-white/40 transition-colors hover:decoration-white"
              style={{ color: "#FFFFFF" }}
            >
              {t("Shop all", "Ver todo")}
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Previous"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/15"
                style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#FFFFFF" }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Next"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/15"
                style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#FFFFFF" }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-14 px-5 sm:px-8 md:px-12 scroll-px-5 sm:scroll-px-8 md:scroll-px-12 lg:px-[max(4rem,calc((100vw-80rem)/2+4rem))] lg:scroll-px-[max(4rem,calc((100vw-80rem)/2+4rem))]"
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
  const { t } = useLanguage();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index, 4) * 0.05 }}
      className="group shrink-0 flex flex-col rounded-xl overflow-hidden"
      style={{ width: 240, scrollSnapAlign: "start", background: "#FFFFFF" }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden"
        style={{ height: 240, background: "#F2F1ED" }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <LineupVial accent={accent} index={index} />
          </div>
        )}
        {product.badge && (
          <span
            className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-semibold tracking-wide"
            style={{ background: "#111111", color: "#FFFFFF" }}
          >
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-4">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="font-semibold text-[15px] leading-snug" style={{ color: "#111111", fontFamily: "var(--font-body, sans-serif)" }}>
            {product.name}
            <span className="font-normal" style={{ color: "#6B6B6B" }}> · {product.concentration}</span>
          </h3>
          <p className="text-[13px] mt-1" style={{ color: "#6B6B6B" }}>
            {product.goals[0] ?? product.compound}
          </p>
        </Link>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="font-semibold text-[17px]" style={{ color: "#111111" }}>
            ${product.price}
          </span>
          {product.inStock ? (
            <button
              onClick={handleAdd}
              className="h-9 px-4 rounded-full text-[13px] font-medium transition-colors"
              style={{ background: added ? "#0A84FF" : "#111111", color: "#FFFFFF" }}
            >
              {added ? t("Added", "Añadido") : t("Add to cart", "Añadir")}
            </button>
          ) : (
            <span className="text-[13px]" style={{ color: "#9A9AA0" }}>
              {t("Sold out", "Agotado")}
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
