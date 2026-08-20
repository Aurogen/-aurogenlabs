import { getServiceClient } from "./supabase-server";
import type { Product, Goal } from "@/data/products";

export interface DbProduct {
  id: number;
  slug: string;
  name: string;
  compound: string;
  concentration: string;
  size: string;
  price: number;
  original_price: number | null;
  goals: string[];
  description: string;
  long_description: string;
  in_stock: boolean;
  stock_count: number;
  featured: boolean;
  purity: string;
  sequence: string | null;
  molecular_weight: string | null;
  storage: string;
  badge: string | null;
  image: string | null;
  coa_url: string | null;
  visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function mapToProduct(row: DbProduct): Product {
  return {
    id: String(row.id),
    slug: row.slug,
    name: row.name,
    compound: row.compound,
    concentration: row.concentration,
    size: row.size,
    price: Number(row.price),
    originalPrice: row.original_price != null ? Number(row.original_price) : undefined,
    goals: (row.goals ?? []) as Goal[],
    description: row.description,
    longDescription: row.long_description,
    inStock: row.in_stock,
    featured: row.featured,
    purity: row.purity,
    sequence: row.sequence ?? undefined,
    molecularWeight: row.molecular_weight ?? undefined,
    storage: row.storage,
    badge: row.badge ?? undefined,
    image: row.image ?? undefined,
    coaUrl: row.coa_url ?? undefined,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("visible", true)
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data) return [];
  return (data as DbProduct[]).map(mapToProduct);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("visible", true)
    .single();

  if (error || !data) return null;
  return mapToProduct(data as DbProduct);
}
