import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";

const BASE = "https://aurogenlabs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/shop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/quality`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/research`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/protocols`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/affiliates`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/shipping`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
