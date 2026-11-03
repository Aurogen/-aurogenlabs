import type { Metadata } from "next";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import { fetchProducts } from "@/lib/products-db";

export const metadata: Metadata = {
  title: "Aurogen Labs | Premium Peptides for Research",
  description: "Research-grade peptides and reagents, ≥98% purity by HPLC, with a third-party COA for every lot. Ships in 2–5 days. For laboratory research use only.",
  openGraph: {
    title: "Aurogen Labs | Premium Peptides for Research",
    description: "Research-grade peptides, ≥98% purity by HPLC, third-party COA for every lot.",
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
