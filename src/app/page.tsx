import type { Metadata } from "next";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import CredentialsStrip from "@/components/CredentialsStrip";
import ShopByGoal from "@/components/ShopByGoal";
import TrustSection from "@/components/TrustSection";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Aurogen Labs | Premium Peptides for Research",
  description: "Shop 100+ research-grade peptides with 99%+ purity. Third-party tested, US manufactured, ships 2–5 days. For laboratory research use only.",
  openGraph: {
    title: "Aurogen Labs | Premium Peptides for Research",
    description: "Shop 100+ research-grade peptides with 99%+ purity. Third-party tested, US manufactured.",
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Impact: video hero + immediate product showcase */}
      <FeaturedProducts />

      {/* 2. Brand statement: headline + stats + trust strip */}
      <Hero />

      {/* 3. Credentials scrolling marquee */}
      <CredentialsStrip />

      {/* 4. Shop by goal: guide visitor to the right product */}
      <ShopByGoal />

      {/* 5. Why us: quality proofs, handle "is this legit?" */}
      <TrustSection />

      {/* 6. How it works: reduce friction, 3 simple steps */}
      <HowItWorks />

      {/* 7. FAQ: handle remaining objections before checkout */}
      <FAQ />
    </>
  );
}
