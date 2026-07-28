import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="py-20 px-4" style={{ background: "#020810" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-blue-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">Top sellers</p>
            <h2
              className="text-white text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "var(--font-heading, sans-serif)" }}
            >
              FEATURED PRODUCTS
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-blue-400 hover:text-white transition-colors text-sm font-medium group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA bar */}
        <div
          className="mt-12 rounded-2xl p-8 border border-blue-600/20 text-center"
          style={{ background: "linear-gradient(135deg, rgba(27, 107, 222, 0.08), rgba(10, 22, 40, 0.8))" }}
        >
          <p className="text-white font-bold text-xl mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
            MÁS DE 100 PÉPTIDOS DISPONIBLES
          </p>
          <p className="text-gray-400 mb-5 text-sm">Explora nuestro catálogo completo de compuestos para investigación</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}
          >
            VER CATÁLOGO COMPLETO
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
