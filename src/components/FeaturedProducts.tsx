import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="py-20 px-4" style={{ background: "#000000" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.3em] uppercase mb-3" style={{ color: "#C9922A" }}>Top sellers</p>
            <h2
              className="text-white text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "var(--font-heading, sans-serif)" }}
            >
              FEATURED PRODUCTS
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 transition-colors text-sm font-medium group hover:text-white"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {FEATURED_PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA bar */}
        <div className="mt-16 text-center">
          <p className="text-white font-bold text-3xl mb-3" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
            100+ Peptide Compounds
          </p>
          <p className="text-gray-500 mb-7 text-sm max-w-md mx-auto">Explore our complete catalog of research-grade compounds, all third-party tested.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #C9922A, #D4A03A)" }}
          >
            VIEW FULL CATALOG
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
