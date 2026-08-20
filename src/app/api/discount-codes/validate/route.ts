import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  const { code, order_total } = await req.json();
  if (!code) {
    return NextResponse.json({ valid: false, error: "No code provided" });
  }

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("discount_codes")
    .select("*")
    .eq("code", code.toUpperCase().trim())
    .eq("active", true)
    .single();

  if (error || !data) {
    return NextResponse.json({ valid: false, error: "Invalid or expired code" });
  }

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ valid: false, error: "This code has expired" });
  }

  if (data.max_uses != null && data.used_count >= data.max_uses) {
    return NextResponse.json({ valid: false, error: "This code has reached its usage limit" });
  }

  if (data.min_order && order_total < data.min_order) {
    return NextResponse.json({
      valid: false,
      error: `Minimum order of $${data.min_order.toFixed(2)} required`,
    });
  }

  const discount_amount =
    data.type === "percentage"
      ? (order_total * data.value) / 100
      : Math.min(data.value, order_total);

  return NextResponse.json({
    valid: true,
    type: data.type,
    value: data.value,
    discount_amount: Math.round(discount_amount * 100) / 100,
    code_id: data.id,
  });
}
