import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Peptides",
  description: "Browse 100+ research-grade peptides. Filter by goal: fat loss, muscle growth, recovery, anti-aging, brain health, and more. 99%+ purity, US made.",
  openGraph: {
    title: "Shop Research Peptides | Aurogen Labs",
    description: "Browse 100+ research-grade peptides with 99%+ purity. Filter by goal and compound. US manufactured.",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
