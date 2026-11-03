"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import NotifyModal from "./NotifyModal";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const [showNotify, setShowNotify] = useState(false);
  const [added, setAdded] = useState(false);
  const reduceMotion = useReducedMotion();

  function handleAddToCart() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.04 }}
        className="group flex flex-col h-full rounded-xl overflow-hidden"
        style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)" }}
      >
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-square overflow-hidden"
          style={{ background: "#F2F1ED" }}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 300px"
              loading={index < 4 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ProductVialDetailed index={index} />
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
          {!product.inStock && (
            <span
              className="absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-semibold"
              style={{ background: "#FFFFFF", color: "#B42318", border: "1px solid rgba(180,35,24,0.2)" }}
            >
              Out of stock
            </span>
          )}
        </Link>

        <div className="flex flex-col flex-1 p-3 sm:p-4 text-center sm:text-left">
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-semibold text-[14px] sm:text-[15px] leading-snug" style={{ color: "#111111", fontFamily: "var(--font-body, sans-serif)" }}>
              {product.name}
              <span className="font-normal" style={{ color: "#6B6B6B" }}> · {product.concentration}</span>
            </h3>
            <p className="text-[12px] sm:text-[13px] mt-1 line-clamp-1" style={{ color: "#6B6B6B" }}>
              {product.goals[0] ?? product.compound}
            </p>
          </Link>

          <div className="mt-auto pt-3 sm:pt-4 flex flex-col sm:flex-row items-center sm:justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-[16px] sm:text-[17px]" style={{ color: "#111111" }}>${product.price}</span>
              {product.originalPrice && (
                <span className="text-[13px] line-through" style={{ color: "#9A9AA0" }}>${product.originalPrice}</span>
              )}
            </div>
            {product.inStock ? (
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto h-10 sm:h-9 px-4 rounded-full text-[13px] font-medium transition-colors"
                style={{ background: added ? "#0A84FF" : "#111111", color: "#FFFFFF" }}
              >
                {added ? "Added" : "Add to cart"}
              </button>
            ) : (
              <button
                onClick={() => setShowNotify(true)}
                className="w-full sm:w-auto h-10 sm:h-9 px-4 rounded-full text-[13px] font-medium"
                style={{ border: "1px solid rgba(0,0,0,0.15)", color: "#111111" }}
              >
                Notify me
              </button>
            )}
          </div>
        </div>
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

const VIAL_ACCENTS = ["#6B7A8D", "#0A84FF", "#4D6080", "#6B7A8D", "#0A84FF", "#4D6080"];

function ProductVialDetailed({ index }: { index: number }) {
  const accent = VIAL_ACCENTS[index % VIAL_ACCENTS.length];
  const id = `vd${index}`;

  return (
    <svg width="76" height="106" viewBox="0 0 76 106" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
    >
      {/* Cap */}
      <rect x="23" y="0" width="30" height="13" rx="5" fill={`url(#${id}cap)`} />
      <rect x="28" y="11" width="20" height="5" rx="2.5" fill={accent} opacity="0.6" />
      {/* Body */}
      <rect x="14" y="15" width="48" height="82" rx="12" fill={`url(#${id}body)`} />
      {/* Inner shine */}
      <rect x="17" y="17" width="8" height="78" rx="4" fill="white" opacity="0.03" />
      {/* Label */}
      <rect x="20" y="30" width="36" height="50" rx="5" fill={`url(#${id}label)`} />
      {/* Label accent line */}
      <rect x="20" y="30" width="36" height="2.5" rx="1" fill={accent} opacity="0.8" />
      {/* A logo */}
      <text x="38" y="50" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" opacity="0.9" fontFamily="sans-serif">A</text>
      <text x="38" y="59" textAnchor="middle" fill={accent} fontSize="4.5" fontWeight="bold" letterSpacing="1.5" fontFamily="sans-serif">AUROGEN</text>
      <text x="38" y="67" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">5MG</text>
      <text x="38" y="74" textAnchor="middle" fill="white" fontSize="3.8" fontFamily="sans-serif" opacity="0.4">RESEARCH ONLY</text>
      {/* Liquid */}
      <rect x="16" y="82" width="44" height="13" rx="6" fill={accent} opacity="0.1" />
      <defs>
        <linearGradient id={`${id}cap`} x1="23" y1="0" x2="53" y2="13" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8D0DA" />
          <stop offset="100%" stopColor="#6B7A8D" />
        </linearGradient>
        <linearGradient id={`${id}body`} x1="14" y1="15" x2="62" y2="97" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E1E20" />
          <stop offset="45%" stopColor="#141416" />
          <stop offset="100%" stopColor="#0A0A0C" />
        </linearGradient>
        <linearGradient id={`${id}label`} x1="20" y1="30" x2="56" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A1A1C" />
          <stop offset="100%" stopColor="#111113" />
        </linearGradient>
      </defs>
    </svg>
  );
}
