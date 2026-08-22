"use client";

import Link from "next/link";
import { ShoppingCart, Bell, Star, FlaskConical, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import NotifyModal from "./NotifyModal";
import Tilt3D from "./Tilt3D";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const [showNotify, setShowNotify] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -7 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          opacity: { duration: 0.5, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] },
          y: { type: "spring", stiffness: 320, damping: 26 },
        }}
      >
        <Tilt3D className="relative h-full" intensity={8}>
          <div
            className="group relative rounded-2xl overflow-hidden flex flex-col h-full transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.13)]"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3 z-10">
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
                  style={{
                    background: "rgba(10,132,255,0.10)",
                    color: "#0A84FF",
                    border: "1px solid rgba(10,132,255,0.25)",
                  }}
                >
                  {product.badge}
                </span>
              </div>
            )}

            {/* Out of stock */}
            {!product.inStock && (
              <div className="absolute top-3 right-3 z-10">
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
                  style={{ background: "rgba(220,38,38,0.08)", color: "#DC2626", border: "1px solid rgba(220,38,38,0.18)" }}
                >
                  Out of Stock
                </span>
              </div>
            )}

            {/* Product image area */}
            <Link href={`/product/${product.slug}`} className="block">
              <div
                className="relative h-52 flex items-center justify-center overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, #1c1e24 0%, #111316 100%)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
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
                <div className="relative z-10 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "130px", height: "130px", objectFit: "contain", objectPosition: "center" }}
                    />
                  ) : (
                    <ProductVialDetailed index={index} />
                  )}
                </div>
                {/* View overlay */}
                <div
                  className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 55%)" }}
                >
                  <span className="flex items-center gap-1 text-white text-[10px] font-semibold tracking-[0.2em] uppercase">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                {/* Out-of-stock dim */}
                {!product.inStock && (
                  <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />
                )}
              </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4">
              {/* Goals */}
              <div className="flex flex-wrap gap-1 mb-3">
                {product.goals.slice(0, 2).map((g) => (
                  <span
                    key={g}
                    className="px-2 py-0.5 rounded text-[10px] font-medium tracking-wide"
                    style={{
                      background: "rgba(0,0,0,0.04)",
                      color: "#6E6E73",
                      border: "1px solid rgba(0,0,0,0.07)",
                    }}
                  >
                    {g}
                  </span>
                ))}
              </div>

              <Link href={`/product/${product.slug}`} className="block mb-1">
                <h3
                  className="font-bold text-lg leading-tight"
                  style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                >
                  {product.name}
                </h3>
              </Link>

              <p className="text-xs mb-1" style={{ color: "#9E9EA8" }}>
                {product.concentration} · {product.size}
              </p>

              <div className="flex items-center gap-1 mb-2">
                <FlaskConical className="w-3 h-3" style={{ color: "rgba(10,132,255,0.6)" }} />
                <span className="text-[11px]" style={{ color: "#6E6E73" }}>{product.purity} purity</span>
              </div>

              <p className="text-xs leading-relaxed flex-1 mb-4 line-clamp-2" style={{ color: "#6E6E73" }}>
                {product.description}
              </p>

              {/* Price & CTA */}
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-2xl" style={{ color: "#1B7A45" }}>${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm line-through" style={{ color: "#9E9EA8" }}>${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" style={{ color: "#6B7A8D" }} />
                    ))}
                    <span className="text-[10px] ml-1" style={{ color: "#9E9EA8" }}>(4.9)</span>
                  </div>
                </div>

                {product.inStock ? (
                  <motion.button
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.92 }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
                    style={{
                      background: added ? "#1B7A45" : "#1D1D1F",
                      transition: "background 0.3s",
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {added ? "Added!" : "Add"}
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() => setShowNotify(true)}
                    whileTap={{ scale: 0.92 }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold border transition-all"
                    style={{
                      borderColor: "rgba(0,0,0,0.12)",
                      color: "#6E6E73",
                      background: "#F6F6F8",
                    }}
                  >
                    <Bell className="w-4 h-4" />
                    Notify
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </Tilt3D>
      </motion.div>

      {showNotify && (
        <NotifyModal
          productName={`${product.name} ${product.concentration}`}
          onClose={() => setShowNotify(false)}
        />
      )}
    </>
  );
}

const VIAL_ACCENTS = ["#6B7A8D", "#1B7A45", "#4D6080", "#6B7A8D", "#1B7A45", "#4D6080"];

function ProductVialDetailed({ index }: { index: number }) {
  const accent = VIAL_ACCENTS[index % VIAL_ACCENTS.length];
  const id = `vd${index}`;

  return (
    <svg width="76" height="106" viewBox="0 0 76 106" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
    >
      {/* Cap */}
      <rect x="23" y="0" width="30" height="13" rx="5" fill={`url(#${id}cap)`} />
      <rect x="28" y="11" width="20" height="5" rx="2.5" fill="#0A84FF" opacity="0.7" />
      {/* Body */}
      <rect x="14" y="15" width="48" height="82" rx="12" fill={`url(#${id}body)`} />
      {/* Inner shine */}
      <rect x="17" y="17" width="8" height="78" rx="4" fill="white" opacity="0.04" />
      {/* Label */}
      <rect x="20" y="30" width="36" height="50" rx="5" fill={`url(#${id}label)`} />
      {/* Label accent line */}
      <rect x="20" y="30" width="36" height="2.5" rx="1" fill={accent} opacity="0.7" />
      {/* A logo */}
      <text x="38" y="50" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" opacity="0.9" fontFamily="sans-serif">A</text>
      <text x="38" y="59" textAnchor="middle" fill={accent} fontSize="4.5" fontWeight="bold" letterSpacing="1.5" fontFamily="sans-serif">AUROGEN</text>
      <text x="38" y="67" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">5MG</text>
      <text x="38" y="74" textAnchor="middle" fill="white" fontSize="3.8" fontFamily="sans-serif" opacity="0.5">RESEARCH ONLY</text>
      {/* Liquid */}
      <rect x="16" y="82" width="44" height="13" rx="6" fill={accent} opacity="0.12" />
      <defs>
        <linearGradient id={`${id}cap`} x1="23" y1="0" x2="53" y2="13" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8D0DA" />
          <stop offset="100%" stopColor="#6B7A8D" />
        </linearGradient>
        <linearGradient id={`${id}body`} x1="14" y1="15" x2="62" y2="97" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2A2C" />
          <stop offset="45%" stopColor="#1D1D1F" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <linearGradient id={`${id}label`} x1="20" y1="30" x2="56" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2A2C" />
          <stop offset="100%" stopColor="#1A1A1C" />
        </linearGradient>
      </defs>
    </svg>
  );
}
