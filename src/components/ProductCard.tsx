"use client";

import Link from "next/link";
import { ShoppingCart, Bell, Star, FlaskConical } from "lucide-react";
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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <Tilt3D className="relative h-full" intensity={10}>
          <div
            className="relative rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
            style={{ background: "#1C1C1E", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3 z-10">
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
                  style={{
                    background: product.badge === "NEW" ? "rgba(16, 185, 129, 0.15)" : "rgba(201, 146, 42, 0.12)",
                    color: product.badge === "NEW" ? "#10B981" : "#F0B429",
                    border: `1px solid ${product.badge === "NEW" ? "rgba(16, 185, 129, 0.3)" : "rgba(201, 146, 42, 0.3)"}`,
                  }}
                >
                  {product.badge}
                </motion.span>
              </div>
            )}

            {/* Out of stock */}
            {!product.inStock && (
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-red-500/10 text-red-400 border border-red-500/20">
                  OUT OF STOCK
                </span>
              </div>
            )}

            {/* Product image area */}
            <Link href={`/product/${product.slug}`} className="block">
              <div
                className="relative h-52 flex items-center justify-center overflow-hidden"
                style={{
                  background: "#141414",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Subtle ambient glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 50% 50% at 50% 60%, rgba(255,255,255,0.03) 0%, transparent 100%)",
                  }}
                />

                {/* 3D floating vial */}
                <motion.div
                  style={{ transformStyle: "preserve-3d", translateZ: 30, filter: "drop-shadow(0 20px 40px rgba(201, 146, 42, 0.3))" }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  className="relative z-10"
                >
                  <ProductVialDetailed index={index} />
                </motion.div>

                {/* Reflection */}
                <motion.div
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full opacity-25"
                  style={{ background: "radial-gradient(ellipse, rgba(201, 146, 42, 0.7), transparent)" }}
                  animate={{ opacity: [0.15, 0.3, 0.15], scaleX: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                />

                {/* Out-of-stock dim */}
                {!product.inStock && (
                  <div className="absolute inset-0" style={{ background: "rgba(5, 5, 5, 0.55)" }} />
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
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.55)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {g}
                  </span>
                ))}
              </div>

              <Link href={`/product/${product.slug}`} className="block mb-1">
                <h3
                  className="text-white font-bold text-lg leading-tight"
                  style={{ fontFamily: "var(--font-heading, sans-serif)" }}
                >
                  {product.name}
                </h3>
              </Link>

              <p className="text-gray-500 text-xs mb-1">
                {product.concentration} · {product.size}
              </p>

              <div className="flex items-center gap-1 mb-2">
                <FlaskConical className="w-3 h-3" style={{ color: "rgba(201, 146, 42, 0.5)" }} />
                <span className="text-[11px] text-gray-500">{product.purity} purity</span>
              </div>

              <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Price & CTA */}
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white font-bold text-2xl">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-600 text-sm line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-gray-600 text-[10px] ml-1">(4.9)</span>
                  </div>
                </div>

                {product.inStock ? (
                  <motion.button
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.92 }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{
                      background: added
                        ? "linear-gradient(135deg, #10B981, #059669)"
                        : "linear-gradient(135deg, #C9922A, #D4A03A)",
                      boxShadow: added
                        ? "0 0 20px rgba(16, 185, 129, 0.25)"
                        : "0 0 20px rgba(201, 146, 42, 0.25)",
                      transition: "background 0.3s, box-shadow 0.3s",
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {added ? "Added!" : "Add"}
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() => setShowNotify(true)}
                    whileTap={{ scale: 0.92 }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all"
                    style={{
                      borderColor: "rgba(201, 146, 42, 0.3)",
                      color: "#C9922A",
                      background: "rgba(201, 146, 42, 0.05)",
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

// Unique vial color per index — gold-based palette with variety
const VIAL_ACCENTS = ["#C9922A", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444", "#06B6D4"];

function ProductVialDetailed({ index }: { index: number }) {
  const accent = VIAL_ACCENTS[index % VIAL_ACCENTS.length];
  const id = `vd${index}`;

  return (
    <svg width="76" height="106" viewBox="0 0 76 106" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cap */}
      <rect x="23" y="0" width="30" height="13" rx="5" fill={`url(#${id}cap)`} />
      <rect x="28" y="11" width="20" height="5" rx="2.5" fill="#AAAAAA" opacity="0.6" />
      {/* Body */}
      <rect x="14" y="15" width="48" height="82" rx="12" fill={`url(#${id}body)`} />
      {/* Inner shine */}
      <rect x="17" y="17" width="8" height="78" rx="4" fill="white" opacity="0.04" />
      {/* Label */}
      <rect x="20" y="30" width="36" height="50" rx="5" fill={`url(#${id}label)`} />
      {/* Label accent line */}
      <rect x="20" y="30" width="36" height="2.5" rx="1" fill={accent} opacity="0.6" />
      {/* A logo */}
      <text x="38" y="50" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" opacity="0.9" fontFamily="sans-serif">A</text>
      <text x="38" y="59" textAnchor="middle" fill={accent} fontSize="4.5" fontWeight="bold" letterSpacing="1.5" fontFamily="sans-serif">AUROGEN</text>
      <text x="38" y="67" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">5MG</text>
      <text x="38" y="74" textAnchor="middle" fill="white" fontSize="3.8" fontFamily="sans-serif" opacity="0.5">RESEARCH ONLY</text>
      {/* Liquid */}
      <rect x="16" y="82" width="44" height="13" rx="6" fill={accent} opacity="0.15" />
      {/* Liquid shimmer */}
      <rect x="20" y="84" width="12" height="9" rx="3" fill="white" opacity="0.04" />
      <defs>
        <linearGradient id={`${id}cap`} x1="23" y1="0" x2="53" y2="13" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8C8C8" />
          <stop offset="100%" stopColor="#888888" />
        </linearGradient>
        <linearGradient id={`${id}body`} x1="14" y1="15" x2="62" y2="97" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E1E1E" />
          <stop offset="45%" stopColor="#121212" />
          <stop offset="100%" stopColor="#070707" />
        </linearGradient>
        <linearGradient id={`${id}label`} x1="20" y1="30" x2="56" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
      </defs>
    </svg>
  );
}
