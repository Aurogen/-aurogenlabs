import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Peptides",
  description: "Browse research-grade peptides and reagents by compound class. ≥98% purity, batch COA included. For laboratory research use only.",
  openGraph: {
    title: "Shop Research Peptides | Aurogen Labs",
    description: "Research-grade peptides with ≥98% purity. Filter by compound class.",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
