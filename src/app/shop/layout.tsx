import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Peptides",
  description: "Browse research-grade peptides and reagents by compound class. 99%+ purity, batch COA included. For laboratory research use only.",
  openGraph: {
    title: "Shop Research Peptides | Aurogen Labs",
    description: "Browse 100+ research-grade peptides with 99%+ purity. Filter by compound class. US manufactured.",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
