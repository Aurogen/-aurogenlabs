import type { Metadata } from "next";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Aurogen Labs | Premium Peptides for Research",
  description: "Shop 100+ research-grade peptides with 99%+ purity. Third-party tested, US manufactured, ships 2–5 days. For laboratory research use only.",
  openGraph: {
    title: "Aurogen Labs | Premium Peptides for Research",
    description: "Shop 100+ research-grade peptides with 99%+ purity. Third-party tested, US manufactured.",
  },
};
import FeaturedProducts from "@/components/FeaturedProducts";
import TrustSection from "@/components/TrustSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <TrustSection />
    </>
  );
}
