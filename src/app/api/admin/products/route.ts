import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data ?? [] });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const supabase = getServiceClient();

  const { data, error } = await supabase
    .from("products")
    .insert({
      slug: body.slug,
      name: body.name,
      compound: body.compound ?? "",
      concentration: body.concentration ?? "",
      size: body.size ?? "1 Vial",
      price: Number(body.price),
      original_price: body.original_price ? Number(body.original_price) : null,
      goals: body.goals ?? [],
      description: body.description ?? "",
      long_description: body.long_description ?? "",
      in_stock: body.in_stock ?? true,
      stock_count: Number(body.stock_count ?? 0),
      featured: body.featured ?? false,
      purity: body.purity ?? "",
      sequence: body.sequence ?? null,
      molecular_weight: body.molecular_weight ?? null,
      storage: body.storage ?? "",
      badge: body.badge ?? null,
      image: body.image ?? null,
      coa_url: body.coa_url ?? null,
      visible: body.visible ?? true,
      sort_order: Number(body.sort_order ?? 0),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ product: data }, { status: 201 });
}
