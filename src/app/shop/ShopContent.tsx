"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { CATEGORIES, type Category, type Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/";
const ALL_PEPTIDES_VIDEO = `${CDN}hf_20260811_193152_9c04b585-b216-4708-a3b0-36372b2881f7.mp4`;

interface Props {
  initialProducts: Product[];
}

export default function ShopContent({ initialProducts }: Props) {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const initialCategory = CATEGORIES.some((c) => c.label === urlCategory) ? (urlCategory as Category) : null;
  const initialQ = searchParams.get("q") ?? "";
  const urlSort = searchParams.get("sort");
  const initialSort = (["price-asc", "price-desc", "name", "popular"].includes(urlSort ?? "")
    ? urlSort
    : "popular") as "price-asc" | "price-desc" | "name" | "popular";

  const [search, setSearch] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(initialCategory);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name" | "popular">(initialSort);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = [...initialProducts];
    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.compound.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory) {
      result = result.filter((p) => p.goals.includes(selectedCategory));
    }
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popular":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    return result;
  }, [search, selectedCategory, sortBy, inStockOnly, initialProducts]);

  const chip = (active: boolean) => ({
    background: active ? "#111111" : "#FFFFFF",
    color: active ? "#FFFFFF" : "#111111",
    border: `1px solid ${active ? "#111111" : "rgba(0,0,0,0.12)"}`,
  });

  return (
    <div className="min-h-screen" style={{ background: "#F5F4F0" }}>
      {/* Page header */}
      <div className="relative py-10 sm:py-16 px-4 text-center overflow-hidden" style={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
        <video ref={(el) => { if (el) el.muted = true; }} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.42)" }} src={ALL_PEPTIDES_VIDEO} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)" }} />
        <div className="relative z-10">
          <h1 className="font-bold" style={{ fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(32px, 6vw, 64px)", letterSpacing: "-0.01em", color: "#FFFFFF", lineHeight: 1.05 }}>
            {selectedCategory ?? "All Peptides"}
          </h1>
          <p className="mt-3 text-[12px] sm:text-[13px]" style={{ color: "rgba(255,255,255,0.7)" }}>
            For laboratory research use only · Not for human consumption
          </p>
        </div>
      </div>

      {/* Category chips — sticky under the header on scroll */}
      <div
        className="sticky top-16 z-30"
        style={{ background: "rgba(245,244,240,0.96)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div
          className="max-w-7xl mx-auto flex gap-2 overflow-x-auto px-4 py-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button onClick={() => setSelectedCategory(null)} className="shrink-0 h-9 px-4 rounded-full text-[13px] font-medium" style={chip(!selectedCategory)}>
            All
          </button>
          {CATEGORIES.filter((c) => initialProducts.some((p) => p.goals.includes(c.label))).map((c) => (
            <button
              key={c.label}
              onClick={() => setSelectedCategory(selectedCategory === c.label ? null : c.label)}
              className="shrink-0 h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap"
              style={chip(selectedCategory === c.label)}
            >
              {c.label}
            </button>
          ))}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className="shrink-0 h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap"
            style={chip(inStockOnly)}
            aria-pressed={inStockOnly}
          >
            In stock
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-10 sm:pt-6">
        {/* Search + sort */}
        <div className="flex gap-2 sm:gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search compounds"
              enterKeyHint="search"
              className="w-full pl-10 pr-3 rounded-xl text-base sm:text-sm focus:outline-none"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F", height: 44 }}
            />
          </div>
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              aria-label="Sort products"
              className="appearance-none pl-3 pr-8 rounded-xl text-base sm:text-sm focus:outline-none cursor-pointer"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F", height: 44 }}
            >
              <option value="popular">Popular</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="name">A–Z</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <p className="text-[13px] mb-4 text-center sm:text-left" style={{ color: "#6E6E73" }}>{filtered.length} products</p>

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg mb-2" style={{ color: "#111111" }}>No products found</p>
            <button
              onClick={() => { setSearch(""); setSelectedCategory(null); setInStockOnly(false); }}
              className="text-sm underline underline-offset-4"
              style={{ color: "#6E6E73" }}
            >
              Clear search and filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
