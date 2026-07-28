"use client";

import Link from "next/link";
import { ShoppingCart, Bell, Star, FlaskConical } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import NotifyModal from "./NotifyModal";

export default function ProductCard({ product }: { product: Product }) {
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
      <div className="group relative rounded-2xl overflow-hidden border border-blue-900/20 hover:border-blue-600/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(27,107,222,0.15)] flex flex-col"
        style={{ background: "#0A1628" }}
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
              style={{
                background: product.badge === "NEW" ? "rgba(16, 185, 129, 0.15)" : "rgba(27, 107, 222, 0.15)",
                color: product.badge === "NEW" ? "#10B981" : "#4DA3FF",
                border: `1px solid ${product.badge === "NEW" ? "rgba(16, 185, 129, 0.3)" : "rgba(77, 163, 255, 0.3)"}`,
              }}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Out of stock overlay */}
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
            className="relative h-48 flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #050D1A 0%, #0F2040 50%, #050D1A 100%)",
              borderBottom: "1px solid rgba(27, 107, 222, 0.1)",
            }}
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "radial-gradient(ellipse at center, rgba(27, 107, 222, 0.08) 0%, transparent 70%)" }}
            />

            {/* Animated DNA lines */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
              <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent" />
            </div>

            {/* Vial illustration */}
            <ProductVial />

            {/* Overlay on out-of-stock */}
            {!product.inStock && (
              <div className="absolute inset-0" style={{ background: "rgba(5, 13, 26, 0.5)" }} />
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
                style={{ background: "rgba(27, 107, 222, 0.08)", color: "#8EB4D4", border: "1px solid rgba(27, 107, 222, 0.15)" }}
              >
                {g}
              </span>
            ))}
          </div>

          <Link href={`/product/${product.slug}`} className="block mb-1">
            <h3 className="text-white font-bold text-lg leading-tight group-hover:text-blue-300 transition-colors" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
              {product.name}
            </h3>
          </Link>

          <p className="text-gray-500 text-xs mb-1">{product.concentration} · {product.size}</p>

          <div className="flex items-center gap-1 mb-2">
            <FlaskConical className="w-3 h-3 text-blue-400/60" />
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
              {/* Stars */}
              <div className="flex items-center gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-gray-600 text-[10px] ml-1">(4.9)</span>
              </div>
            </div>

            {product.inStock ? (
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: added
                    ? "linear-gradient(135deg, #10B981, #059669)"
                    : "linear-gradient(135deg, #1B6BDE, #2B7FEF)",
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? "Added!" : "Add"}
              </button>
            ) : (
              <button
                onClick={() => setShowNotify(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:scale-105 active:scale-95"
                style={{
                  borderColor: "rgba(77, 163, 255, 0.3)",
                  color: "#4DA3FF",
                  background: "rgba(27, 107, 222, 0.05)",
                }}
              >
                <Bell className="w-4 h-4" />
                Notify
              </button>
            )}
          </div>
        </div>
      </div>

      {showNotify && (
        <NotifyModal
          productName={`${product.name} ${product.concentration}`}
          onClose={() => setShowNotify(false)}
        />
      )}
    </>
  );
}

function ProductVial() {
  return (
    <svg width="72" height="96" viewBox="0 0 72 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_4px_20px_rgba(27,107,222,0.4)]">
      {/* Cap top */}
      <rect x="22" y="0" width="28" height="12" rx="5" fill="#4DA3FF" opacity="0.9" />
      <rect x="26" y="10" width="20" height="5" rx="2" fill="#8EB4D4" opacity="0.7" />
      {/* Vial body */}
      <rect x="16" y="14" width="40" height="72" rx="10" fill="url(#vGrad)" />
      {/* Label */}
      <rect x="20" y="30" width="32" height="38" rx="4" fill="url(#labelGrad)" opacity="0.9" />
      {/* Label text lines (simplified) */}
      <rect x="24" y="36" width="24" height="2" rx="1" fill="white" opacity="0.6" />
      <rect x="26" y="41" width="20" height="1.5" rx="0.75" fill="#4DA3FF" opacity="0.8" />
      <rect x="24" y="46" width="24" height="1.5" rx="0.75" fill="white" opacity="0.3" />
      <rect x="24" y="50" width="18" height="1.5" rx="0.75" fill="white" opacity="0.3" />
      <rect x="24" y="54" width="20" height="1.5" rx="0.75" fill="white" opacity="0.2" />
      {/* Liquid */}
      <rect x="18" y="74" width="36" height="10" rx="5" fill="#1B6BDE" opacity="0.25" />
      {/* Shine */}
      <rect x="20" y="15" width="6" height="70" rx="3" fill="white" opacity="0.05" />
      <defs>
        <linearGradient id="vGrad" x1="16" y1="14" x2="56" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#152A55" />
          <stop offset="60%" stopColor="#0A1E42" />
          <stop offset="100%" stopColor="#050D1A" />
        </linearGradient>
        <linearGradient id="labelGrad" x1="20" y1="30" x2="52" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F2040" />
          <stop offset="100%" stopColor="#0A1628" />
        </linearGradient>
      </defs>
    </svg>
  );
}
