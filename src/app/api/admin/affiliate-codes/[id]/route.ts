import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";
import { normalizeCoupon } from "@/lib/affiliates";

type Params = { params: Promise<{ id: string }> };

/** Referred orders and payout history for one affiliate. */
export async function GET(_req: NextRequest, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const supabase = getServiceClient();

  const { data: aff } = await supabase.from("affiliate_codes").select("code").eq("id", id).maybeSingle();
  if (!aff) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [ordersRes, payoutsRes] = await Promise.all([
    supabase
      .from("orders")
      .select("id, created_at, name, email, total, status, payment_status, commission_amount, commission_status, attribution_source")
      .eq("affiliate_code", aff.code)
      .order("created_at", { ascending: false }),
    supabase
      .from("affiliate_payouts")
      .select("id, amount, order_count, method, reference, created_at")
      .eq("affiliate_code", aff.code)
      .order("created_at", { ascending: false }),
  ]);
  if (ordersRes.error) return NextResponse.json({ error: ordersRes.error.message }, { status: 500 });

  return NextResponse.json({ orders: ordersRes.data ?? [], payouts: payoutsRes.data ?? [] });
}

/** Edit an affiliate: activation, rates, coupon, notes. The link code is fixed so past attribution stays intact. */
export async function PATCH(req: NextRequest, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const body = (await req.json()) as {
    active?: boolean;
    commission_rate?: number;
    customer_discount_pct?: number;
    coupon_code?: string | null;
    notes?: string | null;
    name?: string;
  };

  const supabase = getServiceClient();
  const update: Record<string, unknown> = {};

  if (typeof body.active === "boolean") update.active = body.active;
  if (typeof body.name === "string" && body.name.trim()) update.name = body.name.trim().slice(0, 80);
  for (const key of ["commission_rate", "customer_discount_pct"] as const) {
    if (body[key] !== undefined) {
      const n = Number(body[key]);
      if (!Number.isFinite(n) || n < 0 || n > 100) {
        return NextResponse.json({ error: `${key} must be between 0 and 100` }, { status: 400 });
      }
      update[key] = Math.round(n * 100) / 100;
    }
  }
  if (body.notes !== undefined) update.notes = (body.notes ?? "").slice(0, 500) || null;

  if (body.coupon_code !== undefined) {
    const coupon = body.coupon_code ? normalizeCoupon(body.coupon_code) : "";
    if (coupon) {
      const [{ data: taken }, { data: promo }] = await Promise.all([
        supabase.from("affiliate_codes").select("id").ilike("coupon_code", coupon).neq("id", id).maybeSingle(),
        supabase.from("discount_codes").select("id").ilike("code", coupon).maybeSingle(),
      ]);
      if (taken || promo) return NextResponse.json({ error: `Coupon "${coupon}" is already in use` }, { status: 409 });
    }
    update.coupon_code = coupon || null;
  }

  if (Object.keys(update).length === 0) return NextResponse.json({ ok: true });

  const { error } = await supabase.from("affiliate_codes").update(update).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
