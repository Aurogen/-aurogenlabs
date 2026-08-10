"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { PRODUCTS, GOALS, type Goal } from "@/data/products";
import ProductCard from "@/components/ProductCard";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialGoal = searchParams.get("goal") as Goal | null;
  const initialQ = searchParams.get("q") ?? "";
  const urlSort = searchParams.get("sort");
  const initialSort = (["price-asc", "price-desc", "name", "popular"].includes(urlSort ?? "")
    ? urlSort
    : "popular") as "price-asc" | "price-desc" | "name" | "popular";

  const [search, setSearch] = useState(initialQ);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(initialGoal);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name" | "popular">(initialSort);
  const [showFilters, setShowFilters] = useState(!!initialGoal);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];
    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.compound.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedGoal) {
      result = result.filter((p) => p.goals.includes(selectedGoal));
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
  }, [search, selectedGoal, sortBy, inStockOnly]);

  return (
    <div className="min-h-screen" style={{ background: "#000000" }}>
      {/* Page header */}
      <div
        className="relative py-14 px-4 text-center overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #111111, #000000)",
          borderBottom: "1px solid rgba(27, 107, 222, 0.15)",
        }}
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(27,107,222,1) 1px, transparent 1px), linear-gradient(90deg, rgba(27,107,222,1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <p className="text-blue-400 text-xs font-medium tracking-[0.3em] uppercase mb-3 relative">Research compounds</p>
        <h1
          className="text-white text-4xl lg:text-6xl font-bold relative"
          style={{ fontFamily: "var(--font-heading, sans-serif)" }}
        >
          {selectedGoal ? selectedGoal.toUpperCase() : "ALL PEPTIDES"}
        </h1>
        {selectedGoal && (
          <button onClick={() => setSelectedGoal(null)} className="mt-3 text-gray-400 hover:text-white text-sm flex items-center gap-1 mx-auto transition-colors">
            <X className="w-3 h-3" /> Clear filter
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & filters bar */}
        <div className="flex flex-wrap gap-3 mb-8 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 min-w-60 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search peptides, compounds..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors"
              style={{ background: "#111111" }}
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all"
              style={{
                background: showFilters ? "rgba(27, 107, 222, 0.15)" : "#111111",
                borderColor: showFilters ? "#1B6BDE" : "rgba(27, 107, 222, 0.2)",
                color: showFilters ? "#4DA3FF" : "#94A3B8",
              }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="appearance-none pl-4 pr-8 py-2.5 rounded-xl text-sm text-gray-300 border border-blue-900/30 focus:outline-none cursor-pointer"
                style={{ background: "#111111" }}
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>

            <p className="text-gray-500 text-sm">{filtered.length} products</p>
          </div>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div
            className="mb-6 p-5 rounded-2xl border border-blue-900/20"
            style={{ background: "#111111" }}
          >
            <div className="flex flex-wrap gap-4 items-center">
              {/* Goals */}
              <div>
                <p className="text-gray-400 text-xs mb-2 tracking-wide">GOAL</p>
                <div className="flex flex-wrap gap-2">
                  {GOALS.map((g) => (
                    <button
                      key={g.label}
                      onClick={() => setSelectedGoal(selectedGoal === g.label ? null : g.label)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: selectedGoal === g.label ? "rgba(27, 107, 222, 0.2)" : "rgba(15, 32, 64, 0.5)",
                        border: `1px solid ${selectedGoal === g.label ? "#1B6BDE" : "rgba(27, 107, 222, 0.15)"}`,
                        color: selectedGoal === g.label ? "#4DA3FF" : "#94A3B8",
                      }}
                    >
                      {g.icon} {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* In stock */}
              <div>
                <p className="text-gray-400 text-xs mb-2 tracking-wide">AVAILABILITY</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    className="relative w-10 h-5 rounded-full transition-colors"
                    style={{ background: inStockOnly ? "#1B6BDE" : "#152A55" }}
                    onClick={() => setInStockOnly(!inStockOnly)}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${inStockOnly ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-sm text-gray-400">In Stock Only</span>
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

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: "#000000" }} />}>
      <ShopContent />
    </Suspense>
  );
}
