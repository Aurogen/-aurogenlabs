import type { Metadata } from "next";
import { getProductBySlug } from "@/data/products";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: `${product.name} (${product.concentration}) — ${product.purity} purity research peptide. Third-party tested, US manufactured. For laboratory research use only.`,
    openGraph: {
      title: `${product.name} | Aurogen Labs`,
      description: `${product.name} ${product.concentration} · ${product.purity} purity · $${product.price}`,
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
