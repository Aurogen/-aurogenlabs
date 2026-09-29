"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
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
  const [showFilters, setShowFilters] = useState(!!initialCategory);
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

  return (
    <div className="min-h-screen" style={{ background: "#F6F6F8" }}>
      {/* Page header */}
      <div className="relative py-20 px-4 text-center overflow-hidden" style={{ minHeight: "220px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
        <video ref={(el) => { if (el) el.muted = true; }} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.42)" }} src={ALL_PEPTIDES_VIDEO} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)" }} />
        <div className="relative z-10">
          <p className="text-xs font-semibold tracking-[0.28em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>Research compounds</p>
          <h1 className="font-bold" style={{ fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(36px, 6vw, 72px)", letterSpacing: "-0.01em", color: "#FFFFFF" }}>
            {selectedCategory ?? "All Peptides"}
          </h1>
          {selectedCategory && (
            <button onClick={() => setSelectedCategory(null)} className="mt-3 text-sm flex items-center gap-1 mx-auto transition-opacity hover:opacity-70" style={{ color: "rgba(255,255,255,0.65)" }}>
              <X className="w-3 h-3" /> Clear filter
            </button>
          )}
          <p className="mt-4 text-[11px] tracking-wide" style={{ color: "rgba(255,255,255,0.55)" }}>
            For laboratory research use only · Not for human consumption
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Search & filters bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
          {/* Search — full width on mobile */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search peptides, compounds..."
              className="w-full pl-10 pr-4 rounded-xl text-sm focus:outline-none transition-colors"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F", height: 44 }}
            />
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 rounded-xl text-sm font-medium border transition-all shrink-0"
              style={{
                background: showFilters ? "rgba(10,132,255,0.08)" : "#FFFFFF",
                borderColor: showFilters ? "#0A84FF" : "rgba(0,0,0,0.12)",
                color: showFilters ? "#0A84FF" : "#6E6E73",
                height: 44,
              }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <div className="relative flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="appearance-none w-full sm:w-auto pl-4 pr-8 rounded-xl text-sm focus:outline-none cursor-pointer"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F", height: 44 }}
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>

            <p className="text-sm shrink-0 hidden sm:block" style={{ color: "#6E6E73" }}>{filtered.length} products</p>
          </div>
        </div>
        <p className="text-sm sm:hidden mb-4" style={{ color: "#6E6E73" }}>{filtered.length} products</p>

        {/* Expanded filters */}
        {showFilters && (
          <div className="mb-6 p-5 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <p className="text-gray-400 text-xs mb-2 tracking-wide">CATEGORY</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((g) => (
                    <button
                      key={g.label}
                      onClick={() => setSelectedCategory(selectedCategory === g.label ? null : g.label)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: selectedCategory === g.label ? "rgba(10,132,255,0.10)" : "rgba(0,0,0,0.04)",
                        border: `1px solid ${selectedCategory === g.label ? "#0A84FF" : "rgba(0,0,0,0.10)"}`,
                        color: selectedCategory === g.label ? "#0A84FF" : "#6E6E73",
                      }}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-2 tracking-wide">AVAILABILITY</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    className="relative w-10 h-5 rounded-full transition-colors"
                    style={{ background: inStockOnly ? "#0A84FF" : "rgba(0,0,0,0.12)" }}
                    onClick={() => setInStockOnly(!inStockOnly)}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${inStockOnly ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-sm" style={{ color: "#6E6E73" }}>In Stock Only</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No products found</p>
            <p className="text-gray-600 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
