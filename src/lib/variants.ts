import type { Product } from "@/data/products";

/**
 * Doses of the same compound are separate products (own slug, price, stock and COA).
 * These helpers group them so the store can show one product with a dose selector.
 */

/** Numeric size of a variant for ordering: "10mg" -> 10, "5mg + 5mg" -> 10, "3mL" -> 3. */
export function doseValue(p: Pick<Product, "concentration">): number {
  const nums = p.concentration.match(/\d+(\.\d+)?/g);
  return nums ? nums.reduce((s, n) => s + Number(n), 0) : 0;
}

/** Products that share a name, smallest dose first. Keyed by name. */
export function groupByName(products: Product[]): Map<string, Product[]> {
  const groups = new Map<string, Product[]>();
  for (const p of products) {
    const key = p.name.trim().toLowerCase();
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  for (const list of groups.values()) list.sort((a, b) => doseValue(a) - doseValue(b));
  return groups;
}

/** The other doses of `product` (including itself), smallest first. */
export function variantsOf(product: Product, all: Product[]): Product[] {
  return groupByName(all).get(product.name.trim().toLowerCase()) ?? [product];
}

/** Default dose to show on a card: the smallest one in stock, else the smallest. */
export function defaultVariant(list: Product[]): Product {
  return list.find((p) => p.inStock) ?? list[0];
}
