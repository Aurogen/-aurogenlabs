import { notFound } from "next/navigation";
import { fetchProductBySlug, fetchProducts } from "@/lib/products-db";
import ProductDetail from "@/components/ProductDetail";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} ${product.concentration} — Aurogen Labs`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    fetchProductBySlug(slug),
    fetchProducts(),
  ]);

  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.id !== product.id && p.goals.some((g) => product.goals.includes(g)))
    .slice(0, 4);

  return <ProductDetail product={product} related={related} />;
}
