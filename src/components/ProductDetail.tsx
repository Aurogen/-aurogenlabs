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

type Tab = "desc" | "specs" | "protocols" | "faq";

const FAQ_ITEMS = [
  { q: "What solvent should I use for reconstitution?", a: "Use sterile bacteriostatic water (BAC water) for reconstitution. Add the solvent slowly along the vial wall to minimize foaming. Do not use regular sterile water as it does not preserve the peptide as long." },
  { q: "How should I store the reconstituted peptide?", a: "Once reconstituted, store at 2–8°C (refrigerator) and use within 28–30 days. For longer storage of the lyophilized (dry) form, keep at -20°C away from light." },
  { q: "What does 'research use only' mean?", a: "Our peptides are sold exclusively for in-vitro laboratory and scientific research purposes. They are not intended for human consumption, are not drugs or supplements, and have not been evaluated by the FDA." },
  { q: "How do I calculate the concentration after reconstitution?", a: "Divide the peptide mass by the solvent volume. For example, 10 mg reconstituted in 2 mL of solvent yields a 5 mg/mL solution. Follow the handling procedures defined in your laboratory's own protocol." },
  { q: "Do you provide a Certificate of Analysis (COA)?", a: "Yes. Every batch has a third-party COA verifiable via batch number. Access it from the Research Center or contact our team with your order number." },
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
    { id: "specs", label: "Specifications", icon: Scale },
    { id: "protocols", label: "Protocols", icon: BookOpen },
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
                { label: product.purity + " Purity", icon: FlaskConical },
                { label: "COA Verified", icon: FileText },
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
                { icon: FlaskConical, label: "Purity", value: product.purity },
                { icon: Thermometer, label: "Storage", value: product.storage },
                { icon: Scale, label: "Mol. Weight", value: product.molecularWeight || "N/A" },
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

            {/* Research banner */}
            <div
              className="mb-5 p-3 rounded-xl"
              style={{ background: "rgba(10,132,255,0.04)", border: "1px solid rgba(10,132,255,0.15)" }}
            >
              <p className="text-xs flex items-center gap-2" style={{ color: "#0A84FF" }}>
                <span>⚠️</span>
                <span>For Research Use Only · Not for Human Consumption · Not a drug or supplement</span>
              </p>
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

            {product.coaUrl ? (
              <a
                href={product.coaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium mb-6 transition-opacity hover:opacity-70"
                style={{ border: "1px solid rgba(0,0,0,0.10)", color: "#6E6E73", background: "#FFFFFF" }}
              >
                <FileText className="w-4 h-4" />
                View Certificate of Analysis (COA)
              </a>
            ) : (
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium mb-6 opacity-40 cursor-not-allowed"
                style={{ border: "1px solid rgba(0,0,0,0.10)", color: "#6E6E73", background: "#FFFFFF" }}
              >
                <FileText className="w-4 h-4" />
                COA Coming Soon
              </button>
            )}
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
                    {[
                      "Lyophilized for maximum stability",
                      "Verified via HPLC and mass spectrometry",
                      "Batch-specific COA available",
                      "Ships with cold pack for temperature-sensitive compounds",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "#6E6E73" }}>
                        <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#1B7A45" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="p-4 rounded-xl"
                    style={{ background: "rgba(10,132,255,0.04)", border: "1px solid rgba(10,132,255,0.15)" }}
                  >
                    <p className="text-sm font-semibold mb-1" style={{ color: "#0A84FF" }}>Research Disclaimer</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#0A84FF" }}>
                      All research peptides sold by Aurogen Labs are intended for laboratory and scientific research purposes only.
                      These compounds are not intended for human consumption and have not been evaluated by the FDA.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="grid sm:grid-cols-2 gap-x-8">
                  {[
                    ["Compound", product.compound],
                    ["Concentration", product.concentration],
                    ["Purity", product.purity],
                    ["Molecular Weight", product.molecularWeight || "N/A"],
                    ["Form", "Lyophilized Powder"],
                    ["Solvent", "Bacteriostatic Water (BAC)"],
                    ["Appearance", "White to off-white powder"],
                    ["Storage", product.storage],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between py-3 last:border-0"
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                    >
                      <span className="text-sm" style={{ color: "#6E6E73" }}>{k}</span>
                      <span className="text-sm font-medium text-right max-w-[55%]" style={{ color: "#1D1D1F" }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "protocols" && (
                <div className="space-y-4">
                  <p className="text-sm mb-5" style={{ color: "#6E6E73" }}>
                    Research protocols commonly used with <strong style={{ color: "#1D1D1F" }}>{product.name}</strong>.
                  </p>
                  {[
                    {
                      title: `${product.name} Reconstitution Protocol`,
                      duration: "Day 1",
                      desc: "Step-by-step guide for reconstituting this compound, including recommended BAC water volumes, vial handling, and initial concentration verification.",
                      tags: ["Reconstitution", "Lab Setup"],
                    },
                    {
                      title: "Storage & Stability Handling",
                      duration: "Ongoing",
                      desc: "Recommended storage temperatures for lyophilized and reconstituted material, light protection, and freeze-thaw guidance to preserve sample integrity.",
                      tags: ["Storage", "Stability"],
                    },
                    {
                      title: "Analytical Verification (HPLC / MS)",
                      duration: "Per batch",
                      desc: "How to read the batch Certificate of Analysis and reproduce identity and purity verification with HPLC and mass spectrometry in your own lab.",
                      tags: ["QC", "Analytical"],
                    },
                  ].map((p) => (
                    <div
                      key={p.title}
                      className="p-5 rounded-xl"
                      style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-bold" style={{ color: "#1D1D1F" }}>{p.title}</h4>
                        <span className="text-xs shrink-0" style={{ color: "#9E9EA8" }}>{p.duration}</span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: "#6E6E73" }}>{p.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2.5 py-1 rounded font-medium"
                            style={{ background: "rgba(10,132,255,0.06)", color: "#0A84FF", border: "1px solid rgba(10,132,255,0.15)" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-2">
                    <Link href="/protocols" className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: "#6B7A8D" }}>
                      View full Protocol Library →
                    </Link>
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
      <text x="80" y="132" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">5MG</text>
      <text x="80" y="146" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif" opacity="0.55">PEPTIDE SOLUTION</text>
      <text x="80" y="156" textAnchor="middle" fill="white" fontSize="6.5" fontFamily="sans-serif" opacity="0.4">FOR RESEARCH ONLY</text>
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
