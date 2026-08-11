"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { PRODUCTS, GOALS, type Goal } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/";
const GOAL_VIDEOS: Record<string, string> = {
  "Fat Loss":      `${CDN}hf_20260811_191602_2803ed25-2227-4949-8979-bfbe607cf988.mp4`,
  "Muscle Growth": `${CDN}hf_20260811_191602_25f02499-bf2f-40de-81f7-824b1e027c70.mp4`,
  "Recovery":      `${CDN}hf_20260811_191602_cb619e9d-e6f0-40f1-a48b-14378d5f880e.mp4`,
  "Anti-Aging":    `${CDN}hf_20260811_191602_9c2308f2-74de-4609-a0b0-9fa7d74fba61.mp4`,
  "Skin & Hair":   `${CDN}hf_20260811_191602_8d5495b9-cbac-46b9-b7e9-9184a5aa24c6.mp4`,
  "Brain Health":  `${CDN}hf_20260811_191602_fa778594-764f-427d-911b-0736b65e5678.mp4`,
  "Performance":   `${CDN}hf_20260811_191602_d9ec39d1-94b2-41bb-a8f1-6cb3bdbf7043.mp4`,
};

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
    <div className="min-h-screen" style={{ background: "#F6F6F8" }}>
      {/* Page header */}
      {selectedGoal && GOAL_VIDEOS[selectedGoal] ? (
        <div className="relative py-20 px-4 text-center overflow-hidden" style={{ minHeight: "220px", borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
          <video
            key={selectedGoal}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.42)" }}
            src={GOAL_VIDEOS[selectedGoal]}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)" }} />
          <div className="relative z-10">
            <p className="text-xs font-semibold tracking-[0.28em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
              Research compounds
            </p>
            <h1
              className="font-bold"
              style={{ fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(36px, 6vw, 72px)", letterSpacing: "-0.01em", color: "#FFFFFF" }}
            >
              {selectedGoal}
            </h1>
            <button
              onClick={() => setSelectedGoal(null)}
              className="mt-3 text-sm flex items-center gap-1 mx-auto transition-opacity hover:opacity-70"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              <X className="w-3 h-3" /> Clear filter
            </button>
          </div>
        </div>
      ) : (
        <div
          className="py-14 px-4 text-center"
          style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          <p className="text-xs font-semibold tracking-[0.28em] uppercase mb-3" style={{ color: "#9E9EA8" }}>
            Research compounds
          </p>
          <h1
            className="font-bold"
            style={{ fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(36px, 6vw, 72px)", letterSpacing: "-0.01em", color: "#1D1D1F" }}
          >
            All Peptides
          </h1>
        </div>
      )}

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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-colors"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all"
              style={{
                background: showFilters ? "rgba(10,132,255,0.08)" : "#FFFFFF",
                borderColor: showFilters ? "#0A84FF" : "rgba(0,0,0,0.12)",
                color: showFilters ? "#0A84FF" : "#6E6E73",
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
                className="appearance-none pl-4 pr-8 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F" }}
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>

            <p className="text-sm" style={{ color: "#6E6E73" }}>{filtered.length} products</p>
          </div>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div
            className="mb-6 p-5 rounded-2xl"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
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
                        background: selectedGoal === g.label ? "rgba(10,132,255,0.10)" : "rgba(0,0,0,0.04)",
                        border: `1px solid ${selectedGoal === g.label ? "#0A84FF" : "rgba(0,0,0,0.10)"}`,
                        color: selectedGoal === g.label ? "#0A84FF" : "#6E6E73",
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

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: "#F6F6F8" }} />}>
      <ShopContent />
    </Suspense>
  );
}
