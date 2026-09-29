"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";
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
  const [visible, setVisible] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Stop decoding video while the section is scrolled out of view; it frees the main thread for the rest of the page.
  useEffect(() => {
    const host = videoRefs.current[0]?.parentElement;
    if (!host) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setActive((prev) => (prev + 1) % BG_VIDEOS.length), 10000);
    return () => clearInterval(id);
  }, [visible]);

  // Only the visible clip plays; the next one buffers ahead so the crossfade is seamless.
  useEffect(() => {
    const next = (active + 1) % BG_VIDEOS.length;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && visible) {
        v.play().catch(() => {});
      } else {
        v.pause();
        if (i === next) v.preload = "auto";
      }
    });
  }, [active, visible]);

  return (
    <>
      {BG_VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el; if (el) el.muted = true; }}
          src={src}
          muted
          loop
          playsInline
          autoPlay={i === 0}
          preload={i === 0 ? "auto" : "none"}
          disablePictureInPicture
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
  const [activeIndex, setActiveIndex] = useState(0);
  const total = FEATURED_PRODUCTS.length;

  function onCarouselScroll() {
    const el = scrollRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    setActiveIndex(Math.min(total - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  }

  const activeRef = useRef(0);
  const pausedUntil = useRef(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  function scrollToCard(i: number) {
    const el = scrollRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: "smooth" });
  }

  function pauseAutoplay() {
    pausedUntil.current = Date.now() + 8000;
  }

  function goTo(i: number) {
    pauseAutoplay();
    scrollToCard(i);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mobile only: advance one product every few seconds while the carousel is on screen.
  useEffect(() => {
    if (!inView) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      scrollToCard((activeRef.current + 1) % total);
    }, 4500);
    return () => clearInterval(id);
  }, [inView, total]);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 500 : -500, behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden bg-[#F5F4F0]">
      {/* Content */}
      <div className="relative">
        {/* Mobile intro — light, centered, one clear action */}
        <div className="md:hidden px-5 pt-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 h-8 px-4 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", color: "#111111" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#0A84FF" }} />
            {t("Third-party tested · every lot", "Análisis externo · cada lote")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 font-bold"
            style={{
              fontFamily: "var(--font-heading, sans-serif)",
              fontSize: "clamp(24px, 6.9vw, 32px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#111111",
            }}
          >
            {t("Research peptides.", "Péptidos de investigación.")}
            <br />
            <span style={{ color: "#0A84FF" }}>{t("Verified batch by batch.", "Verificados lote a lote.")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-[16px] leading-relaxed mx-auto max-w-[340px]"
            style={{ color: "#5A5A60" }}
          >
            {t(
              "HPLC purity and mass-spec identity on every lot, with the certificate in the box. Ships within 48 hours.",
              "Pureza por HPLC e identidad por espectrometría de masas en cada lote, con el certificado en la caja. Envío en 48 horas.",
            )}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-7"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 h-[52px] px-8 rounded-full text-[16px] font-semibold text-white active:scale-[0.98] transition-transform"
              style={{ background: "#0A84FF", boxShadow: "0 10px 24px -10px rgba(10,132,255,0.6)" }}
            >
              {t("Browse catalog", "Ver catálogo")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <p className="mt-5 inline-flex items-center gap-1.5 text-[12px]" style={{ color: "#6B6B70" }}>
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#0A84FF" }} />
            {t("For laboratory research use only", "Solo para investigación de laboratorio")}
          </p>
        </div>

        {/* Top sellers — the lab video plays behind the products */}
        <div className="relative mt-10 md:mt-0 md:min-h-[480px]" style={{ background: "#0D1117" }}>
          <div className="absolute inset-0 overflow-hidden">
            <VideoCycler />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(8,10,14,0.55) 0%, rgba(8,10,14,0.35) 45%, rgba(8,10,14,0.75) 100%)",
                zIndex: 1,
              }}
            />
          </div>

        {/* Header */}
        <div className="relative z-[1] px-5 sm:px-8 md:px-12 lg:px-16 pt-10 sm:pt-14 pb-5 sm:pb-8 flex flex-col md:flex-row items-center md:items-end md:justify-between gap-2 md:gap-0 text-center md:text-left max-w-7xl mx-auto">
          <div>
            <p className="hidden md:block text-sm mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              {t("Top sellers", "Más vendidos")}
            </p>
            <h2 className="md:hidden font-bold text-[26px]" style={{ color: "#FFFFFF", fontFamily: "var(--font-heading, sans-serif)" }}>
              {t("Top sellers", "Más vendidos")}
            </h2>
            <h2
              className="hidden md:block font-bold leading-none"
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
              className="text-sm underline underline-offset-4 decoration-white/50 transition-colors text-white"
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
          onScroll={onCarouselScroll}
          onPointerDown={pauseAutoplay}
          onTouchStart={pauseAutoplay}
          className="relative z-[1] flex gap-5 md:gap-4 overflow-x-auto pb-5 md:pb-14 px-5 sm:px-8 md:px-12 scroll-px-5 sm:scroll-px-8 md:scroll-px-12 lg:px-[max(4rem,calc((100vw-80rem)/2+4rem))] lg:scroll-px-[max(4rem,calc((100vw-80rem)/2+4rem))]"
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

        {/* One-at-a-time controls — mobile only */}
        <div className="relative z-[1] md:hidden flex items-center justify-center gap-5 pt-2 pb-10">
          <button
            onClick={() => goTo(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            aria-label={t("Previous product", "Producto anterior")}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity disabled:opacity-35"
            style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.35)", color: "#FFFFFF" }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label={t("Top sellers", "Más vendidos")}>
            {FEATURED_PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`${i + 1} / ${total}: ${p.name}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: i === activeIndex ? 24 : 8, background: i === activeIndex ? "#FFFFFF" : "rgba(255,255,255,0.4)" }}
              />
            ))}
          </div>
          <button
            onClick={() => goTo(Math.min(total - 1, activeIndex + 1))}
            disabled={activeIndex === total - 1}
            aria-label={t("Next product", "Siguiente producto")}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity disabled:opacity-35"
            style={{ background: "#FFFFFF", color: "#111111" }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
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
      className="group shrink-0 flex flex-col rounded-2xl md:rounded-xl overflow-hidden w-[calc(100vw-2.5rem)] sm:w-[340px] md:w-[240px]"
      style={{ scrollSnapAlign: "start", background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden aspect-[5/4] md:aspect-square"
        style={{ background: "#F2F1ED" }}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 767px) 340px, 240px"
            loading={index < 2 ? "eager" : "lazy"}
            fetchPriority={index < 2 ? "high" : "auto"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
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

      <div className="flex flex-col flex-1 p-4 text-center md:text-left">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="font-semibold text-[15px] leading-snug" style={{ color: "#111111", fontFamily: "var(--font-body, sans-serif)" }}>
            {product.name}
            <span className="font-normal" style={{ color: "#6B6B6B" }}> · {product.concentration}</span>
          </h3>
          <p className="text-[13px] mt-1" style={{ color: "#6B6B6B" }}>
            {product.goals[0] ?? product.compound}
          </p>
        </Link>

        <div className="mt-auto pt-3 md:pt-4 flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-0">
          <span className="font-semibold text-[17px]" style={{ color: "#111111" }}>
            ${product.price}
          </span>
          {product.inStock ? (
            <button
              onClick={handleAdd}
              className="w-full md:w-auto h-11 md:h-9 px-4 rounded-full text-[14px] md:text-[13px] font-medium transition-colors"
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
