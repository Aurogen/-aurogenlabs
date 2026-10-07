"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Bell, FlaskConical, ChevronRight,
  Thermometer, Scale, Package, FileText, CheckCircle,
  ChevronDown, ChevronUp,
  BookOpen,
} from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import NotifyModal from "./NotifyModal";
import ProductCard from "./ProductCard";

type Tab = "desc" | "specs" | "protocols" | "faq"; // specs = Supplement Facts, protocols = How to use

const FAQ_ITEMS = [
  { q: "When should I take it?", a: "Follow the directions on the label. Most people take protein and creatine around their workout, pre-workout 20–30 minutes before training, and magnesium in the evening." },
  { q: "Can I combine it with other Aurogen products?", a: "Yes. The lineup is designed to stack: for example, creatine mixes easily into a protein shake, and electrolytes pair well with long training sessions." },
  { q: "Is every batch tested?", a: "Yes. A sample of every batch is tested by an independent lab for label accuracy and screened for heavy metals and contaminants. The lot number is printed on the container." },
  { q: "How should I store it?", a: "Keep the container tightly closed in a cool, dry place away from direct sunlight. Do not refrigerate powders, as moisture can cause clumping." },
  { q: "Is it safe for everyone?", a: "Our products are intended for healthy adults. If you are pregnant, nursing, taking medication or have a medical condition, consult your healthcare provider before use. Keep out of reach of children." },
];

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetail({ product, related }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("desc");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const buyRef = useRef<HTMLDivElement>(null);
  const [showStickyBuy, setShowStickyBuy] = useState(false);

  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setShowStickyBuy(el.getBoundingClientRect().bottom < 0);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Keep the Crisp chat bubble from covering the sticky buy button on mobile.
  useEffect(() => {
    const crisp = (window as unknown as { $crisp?: unknown[] }).$crisp;
    if (!crisp || !window.matchMedia("(max-width: 1023px)").matches) return;
    crisp.push(["do", showStickyBuy ? "chat:hide" : "chat:show"]);
  }, [showStickyBuy]);

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "desc", label: "Description", icon: FileText },
    { id: "specs", label: "Supplement Facts", icon: Scale },
    { id: "protocols", label: "How to Use", icon: BookOpen },
    { id: "faq", label: "FAQ", icon: ChevronDown },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F6F6F8", color: "#1D1D1F" }}>
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-28 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center lg:justify-start gap-2 text-sm mb-6 lg:mb-8" style={{ color: "#9E9EA8" }}>
          <Link href="/" className="transition-opacity hover:opacity-70" style={{ color: "#6E6E73" }}>Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="transition-opacity hover:opacity-70" style={{ color: "#6E6E73" }}>Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span style={{ color: "#1D1D1F" }}>{product.name}</span>
        </nav>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Left: Vial + badges */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl flex items-center justify-center relative overflow-hidden aspect-square"
              style={{ background: "#F2F1ED" }}
            >
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1023px) 100vw, 600px"
                  preload
                  className="object-cover"
                />
              ) : (
                <ProductDetailVial />
              )}
              {!product.inStock && (
                <div
                  className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: "rgba(220,38,38,0.08)", color: "#DC2626", border: "1px solid rgba(220,38,38,0.18)" }}
                >
                  Out of Stock
                </div>
              )}
            </motion.div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { label: "Third-Party Tested", icon: CheckCircle },
                { label: product.purity, icon: FlaskConical },
                { label: "Lot Traceable", icon: FileText },
              ].map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "#6B7A8D" }} />
                  <span className="text-[11px] leading-tight" style={{ color: "#6E6E73" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center lg:text-left"
          >
            {/* Category tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
              {product.goals.map((g) => (
                <Link
                  key={g}
                  href={`/shop?category=${encodeURIComponent(g)}`}
                  className="px-3 py-1 rounded text-xs font-medium tracking-wide transition-opacity hover:opacity-80"
                  style={{ background: "rgba(10,132,255,0.06)", color: "#0A84FF", border: "1px solid rgba(10,132,255,0.15)" }}
                >
                  {g}
                </Link>
              ))}
            </div>

            <h1
              className="text-4xl lg:text-5xl font-bold mb-1"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
            >
              {product.name}
            </h1>
            <p className="text-base mb-4" style={{ color: "#6E6E73" }}>{product.compound}</p>

            {/* Price */}
            <div className="flex items-baseline justify-center lg:justify-start gap-3 mb-5">
              <span
                className="font-bold text-4xl"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1B7A45" }}
              >
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl line-through" style={{ color: "#9E9EA8" }}>
                    ${product.originalPrice}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-bold"
                    style={{ background: "rgba(27,122,69,0.08)", color: "#1B7A45", border: "1px solid rgba(27,122,69,0.18)" }}
                  >
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon: Package, label: "Size", value: `${product.concentration} · ${product.size}` },
                { icon: FlaskConical, label: "Formula", value: product.purity },
                { icon: Thermometer, label: "Storage", value: product.storage },
                { icon: Scale, label: "Serving", value: product.facts?.[0]?.[1] ?? "See label" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="p-3 rounded-xl"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1">
                    <Icon className="w-3 h-3" style={{ color: "#6B7A8D" }} />
                    <span className="text-[10px] tracking-wide font-medium" style={{ color: "#9E9EA8" }}>
                      {label.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: "#1D1D1F" }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Qty + Add */}
            {product.inStock ? (
              <div ref={buyRef} className="flex gap-3 mb-3">
                <div
                  className="flex items-center rounded-xl"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)" }}
                >
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    aria-label="Decrease quantity"
                    className="w-11 h-12 transition-opacity hover:opacity-70"
                    style={{ color: "#6E6E73" }}
                  >
                    −
                  </button>
                  <span className="px-3 font-medium min-w-8 text-center" style={{ color: "#1D1D1F" }}>{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    aria-label="Increase quantity"
                    className="w-11 h-12 transition-opacity hover:opacity-70"
                    style={{ color: "#6E6E73" }}
                  >
                    +
                  </button>
                </div>
                <motion.button
                  onClick={handleAdd}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-white transition-all"
                  style={{
                    background: added ? "#1B7A45" : "#1D1D1F",
                    transition: "background 0.3s",
                  }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {added ? "Added!" : "Add to Cart"}
                </motion.button>
              </div>
            ) : (
              <button
                onClick={() => setShowNotify(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold mb-3 transition-opacity hover:opacity-80"
                style={{ border: "1px solid rgba(0,0,0,0.15)", color: "#1D1D1F", background: "#FFFFFF" }}
              >
                <Bell className="w-5 h-5" />
                Notify Me When In Stock
              </button>
            )}

            <p className="text-xs mb-6 text-center lg:text-left" style={{ color: "#9E9EA8" }}>
              Third-party tested · Lot number printed on every container
            </p>
          </motion.div>
        </div>

        {/* Tabs section */}
        <div className="mb-20">
          <div
            className="flex gap-1 mb-6 overflow-x-auto"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
          >
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px whitespace-nowrap shrink-0"
                style={{
                  borderColor: activeTab === id ? "#6B7A8D" : "transparent",
                  color: activeTab === id ? "#6B7A8D" : "#6E6E73",
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="p-6 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              {activeTab === "desc" && (
                <div>
                  <p className="leading-relaxed mb-4" style={{ color: "#1D1D1F" }}>{product.longDescription}</p>
                  <ul className="space-y-2 mb-5">
                    {(product.benefits ?? []).map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "#6E6E73" }}>
                        <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#1B7A45" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs leading-relaxed" style={{ color: "#9E9EA8" }}>
                    *These statements have not been evaluated by the Food and Drug Administration. This product is not
                    intended to diagnose, treat, cure or prevent any disease.
                  </p>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="max-w-md">
                  <p className="font-bold text-lg pb-2 mb-1" style={{ color: "#1D1D1F", borderBottom: "6px solid #1D1D1F" }}>
                    Supplement Facts
                  </p>
                  {(product.facts ?? []).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between py-2.5"
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}
                    >
                      <span className="text-sm" style={{ color: "#1D1D1F" }}>{k}</span>
                      <span className="text-sm font-semibold text-right" style={{ color: "#1D1D1F" }}>{v}</span>
                    </div>
                  ))}
                  <p className="text-xs mt-3" style={{ color: "#9E9EA8" }}>Storage: {product.storage}. Keep out of reach of children.</p>
                </div>
              )}

              {activeTab === "protocols" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl" style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.08)" }}>
                    <h4 className="font-bold mb-2" style={{ color: "#1D1D1F" }}>Directions</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>{product.directions}</p>
                  </div>
                  <div className="p-5 rounded-xl" style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.08)" }}>
                    <h4 className="font-bold mb-2" style={{ color: "#1D1D1F" }}>Warnings</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
                      For healthy adults only. Do not exceed the recommended serving. Consult a healthcare provider before use if
                      you are pregnant, nursing, taking medication or have a medical condition.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "faq" && (
                <div className="space-y-2">
                  {FAQ_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden"
                      style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
                        style={{ background: openFaq === i ? "rgba(10,132,255,0.04)" : "transparent" }}
                      >
                        <span className="text-sm font-medium pr-4" style={{ color: "#1D1D1F" }}>{item.q}</span>
                        {openFaq === i
                          ? <ChevronUp className="w-4 h-4 shrink-0" style={{ color: "#6B7A8D" }} />
                          : <ChevronDown className="w-4 h-4 shrink-0" style={{ color: "#9E9EA8" }} />
                        }
                      </button>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateRows: openFaq === i ? "1fr" : "0fr",
                          opacity: openFaq === i ? 1 : 0,
                          transition: "grid-template-rows 250ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease-out",
                        }}
                      >
                        <div style={{ overflow: "hidden", minHeight: 0 }}>
                          <div className="px-5 pb-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                            <p className="text-sm leading-relaxed pt-3" style={{ color: "#6E6E73" }}>{item.a}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2
              className="text-3xl font-bold mb-6 text-center lg:text-left"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
            >
              You may also need
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>

      {product.inStock && (
        <div
          className="lg:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out"
          style={{
            transform: showStickyBuy ? "translateY(0)" : "translateY(110%)",
            background: "#FFFFFF",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            paddingBottom: "max(12px, env(safe-area-inset-bottom))",
          }}
          aria-hidden={!showStickyBuy}
        >
          <div className="flex items-center gap-3 px-4 pt-3">
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold truncate" style={{ color: "#111111" }}>
                {product.name} <span className="font-normal" style={{ color: "#6B6B6B" }}>· {product.concentration}</span>
              </p>
              <p className="text-[15px] font-semibold" style={{ color: "#111111" }}>${product.price}</p>
            </div>
            <button
              onClick={handleAdd}
              tabIndex={showStickyBuy ? 0 : -1}
              className="h-12 px-6 rounded-full text-[15px] font-semibold text-white shrink-0 transition-colors"
              style={{ background: added ? "#1B7A45" : "#111111" }}
            >
              {added ? "Added" : "Add to cart"}
            </button>
          </div>
        </div>
      )}

      {showNotify && (
        <NotifyModal
          productName={`${product.name} ${product.concentration}`}
          onClose={() => setShowNotify(false)}
        />
      )}
    </div>
  );
}

function ProductDetailVial() {
  return (
    <svg width="160" height="220" viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
      <rect x="48" y="0" width="64" height="26" rx="8" fill="url(#dcap)" />
      <rect x="58" y="22" width="44" height="10" rx="4" fill="#0A84FF" opacity="0.8" />
      <rect x="36" y="30" width="88" height="170" rx="20" fill="url(#dbody)" />
      <rect x="40" y="32" width="14" height="166" rx="7" fill="white" opacity="0.04" />
      <rect x="44" y="55" width="72" height="90" rx="8" fill="url(#dlabel)" />
      <rect x="44" y="55" width="72" height="3.5" rx="1.5" fill="#6B7A8D" opacity="0.7" />
      <text x="80" y="84" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" opacity="0.95" fontFamily="sans-serif">A</text>
      <text x="80" y="102" textAnchor="middle" fill="#6B7A8D" fontSize="9" fontWeight="bold" letterSpacing="3" fontFamily="sans-serif">AUROGEN</text>
      <text x="80" y="115" textAnchor="middle" fill="#6B7A8D" fontSize="7.5" letterSpacing="2" fontFamily="sans-serif">LABS</text>
      <text x="80" y="132" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">A</text>
      <text x="80" y="146" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif" opacity="0.55">SUPPLEMENT</text>
      <text x="80" y="156" textAnchor="middle" fill="white" fontSize="6.5" fontFamily="sans-serif" opacity="0.4">AUROGEN</text>
      <rect x="38" y="178" width="84" height="20" rx="10" fill="#6B7A8D" opacity="0.12" />
      <defs>
        <linearGradient id="dcap" x1="48" y1="0" x2="112" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8D0DA" /><stop offset="100%" stopColor="#6B7A8D" />
        </linearGradient>
        <linearGradient id="dbody" x1="36" y1="30" x2="124" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2A2C" /><stop offset="40%" stopColor="#1D1D1F" /><stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <linearGradient id="dlabel" x1="44" y1="55" x2="116" y2="145" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2A2C" /><stop offset="100%" stopColor="#1A1A1C" />
        </linearGradient>
      </defs>
    </svg>
  );
}
