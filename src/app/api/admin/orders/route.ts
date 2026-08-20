import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";
import { sendShippingConfirmation } from "@/lib/email";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data ?? [] });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { id, status, tracking_number, tracking_url } = body;
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const supabase = getServiceClient();

  const updates: Record<string, unknown> = {};
  if (status) updates.status = status;
  if (tracking_number !== undefined) updates.tracking_number = tracking_number;
  if (tracking_url !== undefined) updates.tracking_url = tracking_url;
  if (status === "shipped") updates.shipped_at = new Date().toISOString();

  const { error } = await supabase.from("orders").update(updates).eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send shipping email when tracking is saved
  if (status === "shipped" && tracking_number) {
    const { data: order } = await supabase
      .from("orders")
      .select("email, name")
      .eq("id", id)
      .single();
    if (order?.email) {
      await sendShippingConfirmation(order.email, {
        id,
        name: order.name,
        tracking_number,
        tracking_url: tracking_url || undefined,
      }).catch(() => {});
    }
  }

  return NextResponse.json({ success: true });
}
