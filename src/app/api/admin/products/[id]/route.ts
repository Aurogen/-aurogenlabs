import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  const allowed = [
    "name", "slug", "compound", "concentration", "size",
    "price", "original_price", "goals", "description", "long_description",
    "in_stock", "stock_count", "featured", "purity", "sequence",
    "molecular_weight", "storage", "badge", "image", "coa_url", "visible", "sort_order",
  ];

  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }
  if ("price" in update) update.price = Number(update.price);
  if ("original_price" in update) update.original_price = update.original_price ? Number(update.original_price) : null;
  if ("stock_count" in update) update.stock_count = Number(update.stock_count);
  if ("sort_order" in update) update.sort_order = Number(update.sort_order);

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("products")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ product: data });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const supabase = getServiceClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
