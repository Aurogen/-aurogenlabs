import { Suspense } from "react";
import { fetchProducts } from "@/lib/products-db";
import ShopContent from "./ShopContent";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop",
  description: "Research-grade peptides and compounds. Third-party tested, COA verified.",
};

export default async function ShopPage() {
  const products = await fetchProducts();
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: "#F5F4F0" }} />}>
      <ShopContent initialProducts={products} />
    </Suspense>
  );
}
