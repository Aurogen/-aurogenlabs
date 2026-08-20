import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("discount_codes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ codes: data ?? [] });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { code, type, value, min_order, max_uses, expires_at } = body;

  if (!code || !type || value == null) {
    return NextResponse.json({ error: "code, type, value required" }, { status: 400 });
  }
  if (!["percentage", "fixed"].includes(type)) {
    return NextResponse.json({ error: "type must be percentage or fixed" }, { status: 400 });
  }

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("discount_codes")
    .insert({
      code: code.toUpperCase().trim(),
      type,
      value,
      min_order: min_order ?? 0,
      max_uses: max_uses ?? null,
      expires_at: expires_at ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ code: data }, { status: 201 });
}
