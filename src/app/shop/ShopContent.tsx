"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { CATEGORIES, type Category, type Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { groupByName, defaultVariant } from "@/lib/variants";
import { useLanguage } from "@/context/LanguageContext";
import { categoryLabel } from "@/data/products-es";


interface Props {
  initialProducts: Product[];
}

// The filters start from the URL. Keying on the query string re-applies them when the URL changes
// while this page is already open (e.g. choosing a class from the header's Shop menu on /shop).
export default function ShopContent(props: Props) {
  const searchParams = useSearchParams();
  return <ShopInner key={searchParams.toString()} {...props} />;
}

function ShopInner({ initialProducts }: Props) {
  const { lang, t } = useLanguage();
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

  // One card per compound: every dose stays selectable on the card, in the order the filters gave.
  const families = useMemo(() => {
    const groups = groupByName(initialProducts);
    const seen = new Set<string>();
    const out: { key: string; product: Product; variants: Product[] }[] = [];
    for (const p of filtered) {
      const key = p.name.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      const variants = groups.get(key) ?? [p];
      out.push({ key, product: variants.length > 1 ? defaultVariant(variants) : p, variants });
    }
    return out;
  }, [filtered, initialProducts]);

  const chip = (active: boolean) => ({
    background: active ? "#111111" : "#FFFFFF",
    color: active ? "#FFFFFF" : "#111111",
    border: `1px solid ${active ? "#111111" : "rgba(0,0,0,0.12)"}`,
  });

  return (
    <div className="min-h-screen" style={{ background: "#F5F4F0" }}>
      {/* Page header — same editorial style as the home page sections */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-6 sm:pb-8 text-center sm:text-left">
        <p className="text-[13px] mb-2" style={{ color: "#6B6B6B" }}>{t("Shop", "Tienda")}</p>
        <h1 style={{ fontFamily: "var(--font-heading, serif)", fontSize: "clamp(36px, 5.5vw, 60px)", color: "#111111", lineHeight: 1.05 }}>
          {selectedCategory ? categoryLabel(selectedCategory, lang) : t("All Peptides", "Todos los péptidos")}
        </h1>
        <p className="mt-3 text-[13px] sm:text-[14px]" style={{ color: "#55555A" }}>
          {t("For laboratory research use only · Not for human consumption", "Solo para investigación de laboratorio · No apto para consumo humano")}
        </p>
      </div>

      {/* Category chips — sticky under the header on scroll */}
      <div
        className="sticky top-16 lg:top-20 z-30"
        style={{ background: "#F5F4F0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div
          className="max-w-7xl mx-auto flex gap-2 overflow-x-auto px-4 py-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button onClick={() => setSelectedCategory(null)} className="shrink-0 h-9 px-4 rounded-full text-[13px] font-medium" style={chip(!selectedCategory)}>
            {t("All", "Todos")}
          </button>
          {CATEGORIES.filter((c) => initialProducts.some((p) => p.goals.includes(c.label))).map((c) => (
            <button
              key={c.label}
              onClick={() => setSelectedCategory(selectedCategory === c.label ? null : c.label)}
              className="shrink-0 h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap"
              style={chip(selectedCategory === c.label)}
            >
              {lang === "es" ? c.label_es : c.label}
            </button>
          ))}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className="shrink-0 h-9 px-4 rounded-full text-[13px] font-medium whitespace-nowrap"
            style={chip(inStockOnly)}
            aria-pressed={inStockOnly}
          >
            {t("In stock", "En stock")}
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
              placeholder={t("Search compounds", "Buscar compuestos")}
              enterKeyHint="search"
              className="w-full pl-10 pr-3 rounded-xl text-base sm:text-sm focus:outline-none"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F", height: 44 }}
            />
          </div>
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              aria-label={t("Sort products", "Ordenar productos")}
              className="appearance-none pl-3 pr-8 rounded-xl text-base sm:text-sm focus:outline-none cursor-pointer"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.12)", color: "#1D1D1F", height: 44 }}
            >
              <option value="popular">{t("Popular", "Populares")}</option>
              <option value="price-asc">{t("Price ↑", "Precio ↑")}</option>
              <option value="price-desc">{t("Price ↓", "Precio ↓")}</option>
              <option value="name">A–Z</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <p className="text-[13px] mb-4 text-center sm:text-left" style={{ color: "#6E6E73" }}>{families.length} {t("products", "productos")}</p>

        {/* Products grid */}
        {families.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {families.map((f, i) => (
              <ProductCard key={f.key} product={f.product} variants={f.variants} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg mb-2" style={{ color: "#111111" }}>{t("No products found", "No se encontraron productos")}</p>
            <button
              onClick={() => { setSearch(""); setSelectedCategory(null); setInStockOnly(false); }}
              className="text-sm underline underline-offset-4"
              style={{ color: "#6E6E73" }}
            >
              {t("Clear search and filters", "Borrar búsqueda y filtros")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
