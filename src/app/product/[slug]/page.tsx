"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Bell, Star, FlaskConical, ChevronRight,
  Thermometer, Scale, Package, FileText, CheckCircle,
  Calculator, ChevronDown, ChevronUp, Syringe, Droplets,
  BookOpen, User, ThumbsUp,
} from "lucide-react";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import NotifyModal from "@/components/NotifyModal";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

type Tab = "desc" | "specs" | "calculator" | "protocols" | "faq" | "reviews";

const MOCK_REVIEWS = [
  { name: "Dr. R. Martinez", lab: "BioResearch Institute", rating: 5, date: "Jan 12, 2025", text: "Exceptional purity. COA matched independent lab analysis within 0.1%. Reconstitution was smooth and consistent across all three vials from the same batch.", helpful: 34 },
  { name: "Prof. S. Chen", lab: "Stanford Peptide Lab", rating: 5, date: "Dec 28, 2024", text: "Reliable quality control and fast shipping. The lyophilized powder dissolved cleanly with bacteriostatic water. Will reorder for next research cycle.", helpful: 28 },
  { name: "J. Thompson", lab: "Independent Researcher", rating: 4, date: "Jan 5, 2025", text: "Good product, purity as advertised. Packaging was excellent — vacuum sealed and UV-protected. Slight delay in shipping but customer support was responsive.", helpful: 19 },
  { name: "Dr. A. Patel", lab: "MetaboLab EU", rating: 5, date: "Jan 18, 2025", text: "Third consecutive order. Consistent quality every time. Research applications have been performing exactly as expected. Highly recommend for serious researchers.", helpful: 41 },
];

const FAQ_ITEMS = [
  { q: "What solvent should I use for reconstitution?", a: "Use sterile bacteriostatic water (BAC water) for reconstitution. Add the solvent slowly along the vial wall to minimize foaming. Do not use regular sterile water as it does not preserve the peptide as long." },
  { q: "How should I store the reconstituted peptide?", a: "Once reconstituted, store at 2–8°C (refrigerator) and use within 28–30 days. For longer storage of the lyophilized (dry) form, keep at -20°C away from light." },
  { q: "What does 'research use only' mean?", a: "Our peptides are sold exclusively for in-vitro laboratory and scientific research purposes. They are not intended for human consumption, are not drugs or supplements, and have not been evaluated by the FDA." },
  { q: "How do I calculate my research dose?", a: "Use the Dosing Calculator tab above. Enter the peptide amount (mg), the BAC water volume you added, and your target dose in mcg — the calculator will output the exact number of units to draw in an insulin syringe." },
  { q: "Do you provide a Certificate of Analysis (COA)?", a: "Yes. Every batch has a third-party COA verifiable via batch number. Access it from the Research Center or contact our team with your order number." },
];

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
  const [activeTab, setActiveTab] = useState<Tab>("desc");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const peptideMg = parseFloat(resolvedProduct.concentration) || 5;
  const [waterMl, setWaterMl] = useState(2);
  const [doseMcg, setDoseMcg] = useState(250);

  const concentration = waterMl > 0 ? peptideMg / waterMl : 0;
  const unitsToInject = concentration > 0 ? Math.round(((doseMcg / 1000) / concentration) * 100) : 0;

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(resolvedProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const related = PRODUCTS.filter(
    (p) => p.id !== resolvedProduct.id && p.goals.some((g) => resolvedProduct.goals.includes(g))
  ).slice(0, 4);

  const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "desc", label: "Description", icon: FileText },
    { id: "specs", label: "Specifications", icon: Scale },
    { id: "calculator", label: "Dosing Calc", icon: Calculator },
    { id: "protocols", label: "Protocols", icon: BookOpen },
    { id: "faq", label: "FAQ", icon: ChevronDown },
    { id: "reviews", label: "Reviews", icon: Star },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F6F6F8", color: "#1D1D1F" }}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: "#9E9EA8" }}>
          <Link href="/" className="transition-opacity hover:opacity-70" style={{ color: "#6E6E73" }}>Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="transition-opacity hover:opacity-70" style={{ color: "#6E6E73" }}>Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span style={{ color: "#1D1D1F" }}>{resolvedProduct.name}</span>
        </nav>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* ── Left: Vial + badges ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{ background: "#F5F2EC", minHeight: 400, border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <ProductDetailVial />
              {!resolvedProduct.inStock && (
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
                { label: resolvedProduct.purity + " Purity", icon: FlaskConical },
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

          {/* ── Right: Info + CTA + Calculator ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Goal tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {resolvedProduct.goals.map((g) => (
                <Link
                  key={g}
                  href={`/shop?goal=${encodeURIComponent(g)}`}
                  className="px-3 py-1 rounded text-xs font-medium tracking-wide transition-opacity hover:opacity-80"
                  style={{ background: "rgba(201,146,42,0.06)", color: "#A07520", border: "1px solid rgba(201,146,42,0.15)" }}
                >
                  {g}
                </Link>
              ))}
            </div>

            <h1
              className="text-4xl lg:text-5xl font-bold mb-1"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
            >
              {resolvedProduct.name}
            </h1>
            <p className="text-base mb-4" style={{ color: "#6E6E73" }}>{resolvedProduct.compound}</p>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#6B7A8D" }} />)}
              </div>
              <span className="text-sm" style={{ color: "#6E6E73" }}>4.9 · {MOCK_REVIEWS.length} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span
                className="font-bold text-4xl"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1B7A45" }}
              >
                ${resolvedProduct.price}
              </span>
              {resolvedProduct.originalPrice && (
                <>
                  <span className="text-xl line-through" style={{ color: "#9E9EA8" }}>
                    ${resolvedProduct.originalPrice}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-bold"
                    style={{ background: "rgba(27,122,69,0.08)", color: "#1B7A45", border: "1px solid rgba(27,122,69,0.18)" }}
                  >
                    Save ${(resolvedProduct.originalPrice - resolvedProduct.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon: Package, label: "Size", value: `${resolvedProduct.concentration} · ${resolvedProduct.size}` },
                { icon: FlaskConical, label: "Purity", value: resolvedProduct.purity },
                { icon: Thermometer, label: "Storage", value: resolvedProduct.storage },
                { icon: Scale, label: "Mol. Weight", value: resolvedProduct.molecularWeight || "N/A" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="p-3 rounded-xl"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
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
              style={{ background: "rgba(201,146,42,0.04)", border: "1px solid rgba(201,146,42,0.15)" }}
            >
              <p className="text-xs flex items-center gap-2" style={{ color: "#A07520" }}>
                <span>⚠️</span>
                <span>For Research Use Only · Not for Human Consumption · Not a drug or supplement</span>
              </p>
            </div>

            {/* Qty + Add */}
            {resolvedProduct.inStock ? (
              <div className="flex gap-3 mb-3">
                <div
                  className="flex items-center rounded-xl"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)" }}
                >
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-3 transition-opacity hover:opacity-70"
                    style={{ color: "#6E6E73" }}
                  >
                    −
                  </button>
                  <span className="px-3 font-medium min-w-8 text-center" style={{ color: "#1D1D1F" }}>{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-3 transition-opacity hover:opacity-70"
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

            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium mb-6 transition-opacity hover:opacity-70"
              style={{ border: "1px solid rgba(0,0,0,0.10)", color: "#6E6E73", background: "#FFFFFF" }}
            >
              <FileText className="w-4 h-4" />
              View Certificate of Analysis (COA)
            </button>

            {/* ── Inline Dosing Calculator ── */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{ background: "rgba(201,146,42,0.05)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
              >
                <Calculator className="w-4 h-4" style={{ color: "#6B7A8D" }} />
                <h3
                  className="font-bold text-sm"
                  style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                >
                  Dosing Calculator
                </h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] mb-1.5 tracking-wide font-medium" style={{ color: "#9E9EA8" }}>
                      PEPTIDE (MG)
                    </label>
                    <div
                      className="px-3 py-2.5 rounded-lg text-sm font-bold text-center"
                      style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.08)", color: "#6B7A8D" }}
                    >
                      {peptideMg}mg
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] mb-1.5 tracking-wide font-medium" style={{ color: "#9E9EA8" }}>
                      BAC WATER (ML)
                    </label>
                    <input
                      type="number"
                      min={0.5}
                      max={10}
                      step={0.5}
                      value={waterMl}
                      onChange={(e) => setWaterMl(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2.5 rounded-lg text-sm text-center focus:outline-none"
                      style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.10)", color: "#1D1D1F" }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] mb-1.5 tracking-wide font-medium" style={{ color: "#9E9EA8" }}>
                      DOSE (MCG)
                    </label>
                    <input
                      type="number"
                      min={50}
                      max={2000}
                      step={50}
                      value={doseMcg}
                      onChange={(e) => setDoseMcg(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2.5 rounded-lg text-sm text-center focus:outline-none"
                      style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.10)", color: "#1D1D1F" }}
                    />
                  </div>
                </div>

                {/* Result */}
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "rgba(201,146,42,0.05)", border: "1px solid rgba(201,146,42,0.15)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-wide mb-0.5" style={{ color: "#9E9EA8" }}>
                        Concentration
                      </p>
                      <p className="font-bold text-xl" style={{ color: "#1D1D1F" }}>
                        {concentration.toFixed(2)} mg/mL
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wide mb-0.5" style={{ color: "#9E9EA8" }}>
                        Per {doseMcg}mcg dose
                      </p>
                      <p className="font-bold text-xl" style={{ color: "#6B7A8D" }}>
                        {unitsToInject} units
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold text-white mt-1 transition-opacity hover:opacity-85"
                    style={{ background: "#1D1D1F" }}
                  >
                    <Syringe className="w-4 h-4" />
                    Inject {unitsToInject} Units
                  </motion.button>
                </div>

                <p className="text-[10px] leading-relaxed" style={{ color: "#9E9EA8" }}>
                  Based on standard 1mL (100-unit) insulin syringe. For research reference only — not medical dosing advice.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Tabs section ── */}
        <div className="mb-20">
          {/* Tab bar */}
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
                {id === "reviews" && (
                  <span
                    className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                    style={{ background: "rgba(201,146,42,0.10)", color: "#6B7A8D" }}
                  >
                    {MOCK_REVIEWS.length}
                  </span>
                )}
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
              {/* Description */}
              {activeTab === "desc" && (
                <div>
                  <p className="leading-relaxed mb-4" style={{ color: "#1D1D1F" }}>{resolvedProduct.longDescription}</p>
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
                    style={{ background: "rgba(201,146,42,0.04)", border: "1px solid rgba(201,146,42,0.15)" }}
                  >
                    <p className="text-sm font-semibold mb-1" style={{ color: "#A07520" }}>Research Disclaimer</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#A07520" }}>
                      All research peptides sold by Aurogen Labs are intended for laboratory and scientific research purposes only.
                      These compounds are not intended for human consumption and have not been evaluated by the FDA.
                    </p>
                  </div>
                </div>
              )}

              {/* Specifications */}
              {activeTab === "specs" && (
                <div className="grid sm:grid-cols-2 gap-x-8">
                  {[
                    ["Compound", resolvedProduct.compound],
                    ["Concentration", resolvedProduct.concentration],
                    ["Purity", resolvedProduct.purity],
                    ["Molecular Weight", resolvedProduct.molecularWeight || "N/A"],
                    ["Form", "Lyophilized Powder"],
                    ["Solvent", "Bacteriostatic Water (BAC)"],
                    ["Appearance", "White to off-white powder"],
                    ["Storage", resolvedProduct.storage],
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

              {/* Dosing Calculator (full) */}
              {activeTab === "calculator" && (
                <div className="max-w-2xl mx-auto">
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: "#6E6E73" }}>
                    Use this calculator to determine the exact volume to draw in your insulin syringe after reconstituting this peptide with bacteriostatic water.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { label: "Peptide Amount (mg)", value: `${peptideMg}`, fixed: true, sub: "Pre-filled from product" },
                      { label: "BAC Water Volume (mL)", inputKey: "water", sub: "Added to vial" },
                      { label: "Research Dose (mcg)", inputKey: "dose", sub: "Per injection" },
                    ].map((f, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl"
                        style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.08)" }}
                      >
                        <label className="block text-[10px] mb-2 uppercase tracking-wide font-medium" style={{ color: "#9E9EA8" }}>
                          {f.label}
                        </label>
                        {f.fixed ? (
                          <p className="font-bold text-2xl" style={{ color: "#6B7A8D" }}>{f.value}</p>
                        ) : f.inputKey === "water" ? (
                          <input
                            type="number"
                            min={0.5}
                            max={10}
                            step={0.5}
                            value={waterMl}
                            onChange={(e) => setWaterMl(parseFloat(e.target.value) || 0)}
                            className="w-full bg-transparent font-bold text-2xl focus:outline-none"
                            style={{ color: "#1D1D1F", borderBottom: "1px solid rgba(201,146,42,0.4)" }}
                          />
                        ) : (
                          <input
                            type="number"
                            min={50}
                            max={2000}
                            step={50}
                            value={doseMcg}
                            onChange={(e) => setDoseMcg(parseFloat(e.target.value) || 0)}
                            className="w-full bg-transparent font-bold text-2xl focus:outline-none"
                            style={{ color: "#1D1D1F", borderBottom: "1px solid rgba(201,146,42,0.4)" }}
                          />
                        )}
                        <p className="text-[10px] mt-1" style={{ color: "#9E9EA8" }}>{f.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Result card */}
                  <div
                    className="p-6 rounded-2xl"
                    style={{ background: "rgba(201,146,42,0.04)", border: "1px solid rgba(201,146,42,0.18)" }}
                  >
                    <div className="grid grid-cols-3 gap-4 mb-5">
                      {[
                        { label: "Concentration", value: `${concentration.toFixed(2)} mg/mL` },
                        { label: "Dose in mL", value: `${((doseMcg / 1000) / (concentration || 1)).toFixed(3)} mL` },
                        { label: "Syringe Units", value: `${unitsToInject} units`, accent: true },
                      ].map(({ label, value, accent }) => (
                        <div key={label} className="text-center">
                          <p className="text-xs mb-1" style={{ color: "#9E9EA8" }}>{label}</p>
                          <p
                            className="font-bold text-xl"
                            style={{ color: accent ? "#6B7A8D" : "#1D1D1F" }}
                          >
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div
                      className="flex items-center gap-3 p-4 rounded-xl"
                      style={{ background: "rgba(201,146,42,0.08)" }}
                    >
                      <Syringe className="w-6 h-6 shrink-0" style={{ color: "#6B7A8D" }} />
                      <div>
                        <p className="font-bold" style={{ color: "#1D1D1F" }}>
                          Draw {unitsToInject} units on your insulin syringe
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "#A07520" }}>
                          = {doseMcg}mcg per injection at {concentration.toFixed(2)} mg/mL concentration
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-4 p-4 rounded-xl flex items-start gap-3"
                    style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <Droplets className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#6B7A8D" }} />
                    <div className="text-xs leading-relaxed" style={{ color: "#6E6E73" }}>
                      <strong style={{ color: "#1D1D1F" }}>Reconstitution tip:</strong> Add BAC water slowly along the vial wall. Gently swirl — do not shake. Allow 1–2 minutes for the lyophilized powder to fully dissolve before drawing.
                    </div>
                  </div>
                </div>
              )}

              {/* Protocols */}
              {activeTab === "protocols" && (
                <div className="space-y-4">
                  <p className="text-sm mb-5" style={{ color: "#6E6E73" }}>
                    Research protocols commonly used with <strong style={{ color: "#1D1D1F" }}>{resolvedProduct.name}</strong>.
                  </p>
                  {[
                    {
                      title: `${resolvedProduct.name} Reconstitution Protocol`,
                      duration: "Day 1",
                      desc: "Step-by-step guide for reconstituting this compound, including recommended BAC water volumes, vial handling, and initial concentration verification.",
                      tags: ["Reconstitution", "Lab Setup"],
                    },
                    {
                      title: `${resolvedProduct.goals[0]} Research Protocol`,
                      duration: "8–12 weeks",
                      desc: `Standard research protocol for ${resolvedProduct.goals[0].toLowerCase()} studies. Includes study design considerations, measurement parameters, and data collection guidelines.`,
                      tags: [resolvedProduct.goals[0], "Research Design"],
                    },
                    {
                      title: "Peptide Combination Stack",
                      duration: "12 weeks",
                      desc: "Multi-compound protocol investigating synergistic effects. Compatible with the research goals of this compound.",
                      tags: ["Advanced", "Multi-compound"],
                    },
                  ].map((p) => (
                    <div
                      key={p.title}
                      className="p-5 rounded-xl transition-all duration-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
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
                            style={{ background: "rgba(201,146,42,0.06)", color: "#A07520", border: "1px solid rgba(201,146,42,0.15)" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-2">
                    <Link
                      href="/protocols"
                      className="text-sm font-medium transition-opacity hover:opacity-70"
                      style={{ color: "#6B7A8D" }}
                    >
                      View full Protocol Library →
                    </Link>
                  </div>
                </div>
              )}

              {/* FAQ */}
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
                        style={{ background: openFaq === i ? "rgba(201,146,42,0.04)" : "transparent" }}
                      >
                        <span className="text-sm font-medium pr-4" style={{ color: "#1D1D1F" }}>{item.q}</span>
                        {openFaq === i
                          ? <ChevronUp className="w-4 h-4 shrink-0" style={{ color: "#6B7A8D" }} />
                          : <ChevronDown className="w-4 h-4 shrink-0" style={{ color: "#9E9EA8" }} />
                        }
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="px-5 pb-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                              <p className="text-sm leading-relaxed pt-3" style={{ color: "#6E6E73" }}>{item.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}

              {/* Reviews */}
              {activeTab === "reviews" && (
                <div>
                  {/* Summary */}
                  <div
                    className="flex items-center gap-6 p-5 rounded-xl mb-6"
                    style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <div className="text-center shrink-0">
                      <p
                        className="font-bold text-5xl"
                        style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                      >
                        4.9
                      </p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#6B7A8D" }} />
                        ))}
                      </div>
                      <p className="text-xs mt-1" style={{ color: "#9E9EA8" }}>{MOCK_REVIEWS.length} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3].map((stars) => {
                        const count = MOCK_REVIEWS.filter((r) => r.rating === stars).length;
                        return (
                          <div key={stars} className="flex items-center gap-2">
                            <span className="text-xs w-3" style={{ color: "#6E6E73" }}>{stars}</span>
                            <Star className="w-3 h-3 fill-current" style={{ color: "#6B7A8D" }} />
                            <div
                              className="flex-1 h-1.5 rounded-full overflow-hidden"
                              style={{ background: "rgba(201,146,42,0.12)" }}
                            >
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${(count / MOCK_REVIEWS.length) * 100}%`, background: "#6B7A8D" }}
                              />
                            </div>
                            <span className="text-xs w-3" style={{ color: "#9E9EA8" }}>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review list */}
                  <div className="space-y-4">
                    {MOCK_REVIEWS.map((r, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl"
                        style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.08)" }}
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                              style={{ background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.15)" }}
                            >
                              <User className="w-4 h-4" style={{ color: "#6B7A8D" }} />
                            </div>
                            <div>
                              <p className="font-semibold text-sm" style={{ color: "#1D1D1F" }}>{r.name}</p>
                              <p className="text-xs" style={{ color: "#9E9EA8" }}>{r.lab}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="flex">
                              {[...Array(5)].map((_, j) => (
                                <Star
                                  key={j}
                                  className="w-3 h-3"
                                  style={{ color: j < r.rating ? "#6B7A8D" : "rgba(0,0,0,0.12)" }}
                                  fill={j < r.rating ? "#6B7A8D" : "none"}
                                />
                              ))}
                            </div>
                            <p className="text-[10px] mt-0.5" style={{ color: "#9E9EA8" }}>{r.date}</p>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "#6E6E73" }}>{r.text}</p>
                        <button
                          className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
                          style={{ color: "#9E9EA8" }}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          Helpful ({r.helpful})
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
            >
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
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
    <svg
      width="160"
      height="220"
      viewBox="0 0 160 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
    >
      {/* Cap */}
      <rect x="48" y="0" width="64" height="26" rx="8" fill="url(#dcap)" />
      {/* Cap ring */}
      <rect x="58" y="22" width="44" height="10" rx="4" fill="#A07520" opacity="0.8" />
      {/* Body */}
      <rect x="36" y="30" width="88" height="170" rx="20" fill="url(#dbody)" />
      {/* Shine streak */}
      <rect x="40" y="32" width="14" height="166" rx="7" fill="white" opacity="0.04" />
      {/* Label area */}
      <rect x="44" y="55" width="72" height="90" rx="8" fill="url(#dlabel)" />
      {/* Gold top bar on label */}
      <rect x="44" y="55" width="72" height="3.5" rx="1.5" fill="#6B7A8D" opacity="0.7" />
      {/* Text */}
      <text x="80" y="84" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" opacity="0.95" fontFamily="sans-serif">A</text>
      <text x="80" y="102" textAnchor="middle" fill="#6B7A8D" fontSize="9" fontWeight="bold" letterSpacing="3" fontFamily="sans-serif">AUROGEN</text>
      <text x="80" y="115" textAnchor="middle" fill="#6B7A8D" fontSize="7.5" letterSpacing="2" fontFamily="sans-serif">LABS</text>
      <text x="80" y="132" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">5MG</text>
      <text x="80" y="146" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif" opacity="0.55">PEPTIDE SOLUTION</text>
      <text x="80" y="156" textAnchor="middle" fill="white" fontSize="6.5" fontFamily="sans-serif" opacity="0.4">FOR RESEARCH ONLY</text>
      {/* Bottom ring */}
      <rect x="38" y="178" width="84" height="20" rx="10" fill="#6B7A8D" opacity="0.12" />
      <defs>
        <linearGradient id="dcap" x1="48" y1="0" x2="112" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8D0DA" />
          <stop offset="100%" stopColor="#6B7A8D" />
        </linearGradient>
        <linearGradient id="dbody" x1="36" y1="30" x2="124" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2A2C" />
          <stop offset="40%" stopColor="#1D1D1F" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <linearGradient id="dlabel" x1="44" y1="55" x2="116" y2="145" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2A2C" />
          <stop offset="100%" stopColor="#1A1A1C" />
        </linearGradient>
      </defs>
    </svg>
  );
}
