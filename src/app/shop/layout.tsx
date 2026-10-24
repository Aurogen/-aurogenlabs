import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop Aurogen protein, creatine, pre-workout, electrolytes, collagen and magnesium. Clean labels, third-party tested.",
  openGraph: {
    title: "Shop | Aurogen",
    description: "Performance nutrition with full-dose, clean-label formulas.",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
