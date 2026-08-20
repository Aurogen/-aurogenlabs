import { NextResponse } from "next/server";
import { fetchProducts } from "@/lib/products-db";

export async function GET() {
  const products = await fetchProducts();
  return NextResponse.json({ products });
}
