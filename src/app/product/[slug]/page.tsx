"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import Link from "next/link";
import {
  ShoppingCart, Bell, Star, FlaskConical, ChevronRight,
  Thermometer, Scale, Package, FileText, CheckCircle
} from "lucide-react";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import NotifyModal from "@/components/NotifyModal";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const resolvedProduct = product!;

  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "storage">("desc");

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(resolvedProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const related = PRODUCTS.filter(
    (p) => p.id !== resolvedProduct.id && p.goals.some((g) => resolvedProduct.goals.includes(g))
  ).slice(0, 4);

  return (
    <div className="min-h-screen" style={{ background: "#020810" }}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-gray-300 transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-300">{resolvedProduct.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Product image */}
          <div>
            <div
              className="rounded-2xl border border-blue-900/20 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #050D1A, #0F2040)", minHeight: "400px" }}
            >
              <ProductDetailVial />
            </div>

            {/* Badges below image */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { label: "Third-Party Tested", icon: CheckCircle },
                { label: resolvedProduct.purity + " Purity", icon: FlaskConical },
                { label: "Made in USA", icon: Package },
              ].map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-blue-900/20 text-center"
                  style={{ background: "rgba(15, 32, 64, 0.4)" }}
                >
                  <Icon className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400 text-[11px] leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product info */}
          <div>
            {/* Goal tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {resolvedProduct.goals.map((g) => (
                <Link
                  key={g}
                  href={`/shop?goal=${encodeURIComponent(g)}`}
                  className="px-3 py-1 rounded text-xs font-medium tracking-wide transition-colors hover:text-white"
                  style={{
                    background: "rgba(27, 107, 222, 0.08)",
                    color: "#8EB4D4",
                    border: "1px solid rgba(27, 107, 222, 0.2)",
                  }}
                >
                  {g}
                </Link>
              ))}
            </div>

            {/* Name */}
            <h1
              className="text-white text-4xl lg:text-5xl font-bold mb-1"
              style={{ fontFamily: "var(--font-heading, sans-serif)" }}
            >
              {resolvedProduct.name}
            </h1>
            <p className="text-gray-400 text-base mb-4">{resolvedProduct.compound}</p>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-400 text-sm">4.9 (128 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-white font-bold text-4xl">${resolvedProduct.price}</span>
              {resolvedProduct.originalPrice && (
                <span className="text-gray-600 text-xl line-through">${resolvedProduct.originalPrice}</span>
              )}
              {resolvedProduct.originalPrice && (
                <span className="px-2 py-0.5 rounded text-xs font-bold text-green-400 bg-green-400/10">
                  SAVE ${(resolvedProduct.originalPrice - resolvedProduct.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Specs quick row */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Package, label: "Size", value: `${resolvedProduct.concentration} · ${resolvedProduct.size}` },
                { icon: FlaskConical, label: "Purity", value: resolvedProduct.purity },
                { icon: Thermometer, label: "Storage", value: resolvedProduct.storage },
                { icon: Scale, label: "Mol. Weight", value: resolvedProduct.molecularWeight || "N/A" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="p-3 rounded-xl border border-blue-900/20"
                  style={{ background: "rgba(15, 32, 64, 0.4)" }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className="w-3 h-3 text-blue-400" />
                    <span className="text-gray-500 text-[10px] tracking-wide">{label.toUpperCase()}</span>
                  </div>
                  <p className="text-white text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>

            {/* Research only banner */}
            <div
              className="mb-6 p-3 rounded-xl border border-yellow-600/15"
              style={{ background: "rgba(161, 130, 0, 0.04)" }}
            >
              <p className="text-yellow-500/70 text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>For Research Use Only · Not for Human Consumption · Not a drug or supplement</span>
              </p>
            </div>

            {/* Qty + Add to cart */}
            {resolvedProduct.inStock ? (
              <div className="flex gap-3 mb-4">
                <div
                  className="flex items-center rounded-xl border border-blue-900/30"
                  style={{ background: "#0A1628" }}
                >
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-3 text-gray-400 hover:text-white transition-colors"
                  >
                    −
                  </button>
                  <span className="px-3 text-white font-medium min-w-8 text-center">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-3 text-gray-400 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: added
                      ? "linear-gradient(135deg, #10B981, #059669)"
                      : "linear-gradient(135deg, #1B6BDE, #2B7FEF)",
                  }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {added ? "¡Agregado!" : "ADD TO CART"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowNotify(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-blue-300 border border-blue-600/30 hover:border-blue-400 hover:text-white transition-all mb-4"
              >
                <Bell className="w-5 h-5" />
                NOTIFY ME WHEN IN STOCK
              </button>
            )}

            {/* COA button */}
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-gray-400 border border-blue-900/20 hover:border-blue-600/30 hover:text-white transition-all">
              <FileText className="w-4 h-4" />
              View Certificate of Analysis (COA)
            </button>
          </div>
        </div>

        {/* Description tabs */}
        <div className="mb-20">
          <div className="flex gap-1 mb-6 border-b border-blue-900/20">
            {(["desc", "specs", "storage"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px"
                style={{
                  borderColor: activeTab === tab ? "#1B6BDE" : "transparent",
                  color: activeTab === tab ? "#4DA3FF" : "#94A3B8",
                }}
              >
                {tab === "desc" ? "Description" : tab === "specs" ? "Specifications" : "Storage & Handling"}
              </button>
            ))}
          </div>

          <div
            className="p-6 rounded-2xl border border-blue-900/20"
            style={{ background: "#0A1628" }}
          >
            {activeTab === "desc" && (
              <div>
                <p className="text-gray-300 leading-relaxed mb-4">{resolvedProduct.longDescription}</p>
                <div
                  className="mt-4 p-4 rounded-xl border border-blue-900/20"
                  style={{ background: "rgba(15, 32, 64, 0.4)" }}
                >
                  <p className="text-blue-300 text-sm font-semibold mb-1">Research Disclaimer</p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    All research peptides sold by Aurogen Labs are intended for laboratory and scientific research purposes only.
                    These compounds are not intended for human consumption, are not food, drugs, or dietary supplements, and
                    have not been evaluated by the FDA. Use only by qualified researchers in controlled laboratory environments.
                  </p>
                </div>
              </div>
            )}
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["Compound", resolvedProduct.compound],
                  ["Concentration", resolvedProduct.concentration],
                  ["Purity", resolvedProduct.purity],
                  ["Molecular Weight", resolvedProduct.molecularWeight || "N/A"],
                  ["Form", "Lyophilized Powder"],
                  ["Solvent", "Sterile bacteriostatic water"],
                  ["Appearance", "White to off-white powder"],
                  ["CAS Number", "Proprietary"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2.5 border-b border-blue-900/20">
                    <span className="text-gray-400 text-sm">{k}</span>
                    <span className="text-white text-sm font-medium">{v}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "storage" && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-semibold mb-1">Storage Conditions</p>
                    <p className="text-gray-400 text-sm">{resolvedProduct.storage}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white font-semibold mb-1">Packaging</p>
                    <p className="text-gray-400 text-sm">
                      Supplied as lyophilized powder in a borosilicate glass vial with aluminum seal.
                      UV-protective label, tamper-evident packaging.
                    </p>
                  </div>
                </div>
                <div
                  className="p-4 rounded-xl border border-blue-900/20"
                  style={{ background: "rgba(15, 32, 64, 0.4)" }}
                >
                  <p className="text-gray-300 text-sm">
                    <strong className="text-white">Stability:</strong> Lyophilized peptide is stable for 24 months when
                    stored at recommended conditions. Once reconstituted, use within 30 days if refrigerated (2-8°C).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2
              className="text-white text-3xl font-bold mb-6"
              style={{ fontFamily: "var(--font-heading, sans-serif)" }}
            >
              RELATED PRODUCTS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {showNotify && (
        <NotifyModal
          productName={`${resolvedProduct.name} ${resolvedProduct.concentration}`}
          onClose={() => setShowNotify(false)}
        />
      )}
    </div>
  );
}

function ProductDetailVial() {
  return (
    <svg width="160" height="220" viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_20px_60px_rgba(27,107,222,0.5)]">
      <rect x="48" y="0" width="64" height="26" rx="8" fill="url(#dcap)" />
      <rect x="58" y="22" width="44" height="10" rx="4" fill="#8EB4D4" opacity="0.7" />
      <rect x="36" y="30" width="88" height="170" rx="20" fill="url(#dbody)" />
      <rect x="40" y="32" width="14" height="166" rx="7" fill="white" opacity="0.03" />
      <rect x="44" y="55" width="72" height="90" rx="8" fill="url(#dlabel)" />
      <text x="80" y="84" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" opacity="0.95" fontFamily="sans-serif">A</text>
      <text x="80" y="102" textAnchor="middle" fill="#4DA3FF" fontSize="9" fontWeight="bold" letterSpacing="3" fontFamily="sans-serif">AUROGEN</text>
      <text x="80" y="115" textAnchor="middle" fill="#8EB4D4" fontSize="7.5" letterSpacing="2" fontFamily="sans-serif">LABS</text>
      <text x="80" y="132" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">5MG</text>
      <text x="80" y="146" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif" opacity="0.55">PEPTIDE SOLUTION</text>
      <text x="80" y="156" textAnchor="middle" fill="white" fontSize="6.5" fontFamily="sans-serif" opacity="0.45">FOR RESEARCH ONLY</text>
      <text x="80" y="166" textAnchor="middle" fill="white" fontSize="6" fontFamily="sans-serif" opacity="0.35">NOT FOR HUMAN USE</text>
      <rect x="38" y="178" width="84" height="20" rx="10" fill="#1B6BDE" opacity="0.18" />
      <defs>
        <linearGradient id="dcap" x1="48" y1="0" x2="112" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6BB4FF" />
          <stop offset="100%" stopColor="#4DA3FF" />
        </linearGradient>
        <linearGradient id="dbody" x1="36" y1="30" x2="124" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A3666" />
          <stop offset="40%" stopColor="#0D2244" />
          <stop offset="100%" stopColor="#050D1A" />
        </linearGradient>
        <linearGradient id="dlabel" x1="44" y1="55" x2="116" y2="145" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F2040" />
          <stop offset="100%" stopColor="#0A1628" />
        </linearGradient>
      </defs>
    </svg>
  );
}
