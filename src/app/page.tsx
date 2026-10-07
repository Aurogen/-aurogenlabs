import type { Metadata } from "next";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import { fetchProducts } from "@/lib/products-db";

export const metadata: Metadata = {
  title: "Aurogen | Performance Nutrition",
  description: "Whey protein isolate, creatine monohydrate, pre-workout, electrolytes, collagen and magnesium. Full-dose, clean-label formulas, third-party tested.",
  openGraph: {
    title: "Aurogen | Performance Nutrition",
    description: "Full-dose, clean-label sports nutrition. Every batch third-party tested.",
  },
};

// Read from the same source as the shop so home and catalog never show different data.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await fetchProducts();
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <FeaturedProducts products={featured} />

      <Hero />

      <TrustSection />

      <HowItWorks />

      <FAQ />
    </>
  );
}
