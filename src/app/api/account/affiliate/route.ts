import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getServiceClient } from "@/lib/supabase-server";
import { siteUrl } from "@/lib/affiliates";

async function loadOwnAffiliate() {
  const { userId } = await auth();
  if (!userId) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };

  const user = await currentUser();
  const emails = (user?.emailAddresses ?? [])
    .filter((e) => e.verification?.status === "verified")
    .map((e) => e.emailAddress.toLowerCase());

  const supabase = getServiceClient();
  const { data: byUser } = await supabase.from("affiliate_codes").select("*").eq("user_id", userId).maybeSingle();
  let aff = byUser;
  if (!aff && emails.length > 0) {
    const { data: byEmail } = await supabase.from("affiliate_codes").select("*").in("email", emails).limit(1).maybeSingle();
    aff = byEmail;
    // Remember the account so attribution and self-referral checks use the user id from now on.
    if (aff && !aff.user_id) {
      await supabase.from("affiliate_codes").update({ user_id: userId }).eq("id", aff.id);
    }
  }
  return { supabase, aff };
}

export async function GET() {
  const loaded = await loadOwnAffiliate();
  if ("error" in loaded) return loaded.error;
  const { supabase, aff } = loaded;
  if (!aff) return NextResponse.json({ affiliate: null });

  const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const [ordersRes, clicksAll, clicks30, payoutsRes] = await Promise.all([
    supabase
      .from("orders")
      .select("id, created_at, total, commission_amount, commission_status, attribution_source, status")
      .eq("affiliate_code", aff.code)
      .order("created_at", { ascending: false }),
    supabase.from("affiliate_clicks").select("id", { count: "exact", head: true }).eq("code", aff.code),
    supabase.from("affiliate_clicks").select("id", { count: "exact", head: true }).eq("code", aff.code).gte("created_at", since30),
    supabase
      .from("affiliate_payouts")
      .select("id, amount, order_count, method, reference, created_at")
      .eq("affiliate_code", aff.code)
      .order("created_at", { ascending: false }),
  ]);

  if (ordersRes.error) return NextResponse.json({ error: ordersRes.error.message }, { status: 500 });
  const orders = ordersRes.data ?? [];

  const sum = (status: string) =>
    orders
      .filter((o) => (o.commission_status ?? "pending") === status)
      .reduce((s, o) => s + Number(o.commission_amount ?? 0), 0);
  const counted = orders.filter((o) => o.commission_status !== "void");
  const clicks = clicksAll.count ?? 0;

  return NextResponse.json({
    affiliate: {
      name: aff.name,
      code: aff.code,
      coupon_code: aff.coupon_code ?? null,
      commission_rate: Number(aff.commission_rate),
      customer_discount_pct: Number(aff.customer_discount_pct ?? 0),
      active: aff.active !== false,
      payout_method: aff.payout_method ?? "",
      payout_details: aff.payout_details ?? "",
      link: `${siteUrl()}/r/${aff.code}`,
      site: siteUrl(),
    },
    stats: {
      clicks,
      clicks30: clicks30.count ?? 0,
      orders: counted.length,
      conversionRate: clicks > 0 ? Math.round((counted.length / clicks) * 1000) / 10 : 0,
      sales: counted.reduce((s, o) => s + Number(o.total ?? 0), 0),
      pending: sum("pending"),
      approved: sum("approved"),
      paid: sum("paid"),
    },
    orders: orders.map((o) => ({
      id: o.id,
      date: o.created_at,
      total: Number(o.total ?? 0),
      commission: Number(o.commission_amount ?? 0),
      commissionStatus: o.commission_status ?? "pending",
      source: o.attribution_source ?? "link",
    })),
    payouts: payoutsRes.data ?? [],
  });
}

export async function PATCH(req: NextRequest) {
  const loaded = await loadOwnAffiliate();
  if ("error" in loaded) return loaded.error;
  const { supabase, aff } = loaded;
  if (!aff) return NextResponse.json({ error: "Not an affiliate" }, { status: 404 });

  const { payout_method, payout_details } = (await req.json()) as { payout_method?: string; payout_details?: string };
  const { error } = await supabase
    .from("affiliate_codes")
    .update({
      payout_method: (payout_method ?? "").slice(0, 40) || null,
      payout_details: (payout_details ?? "").slice(0, 300) || null,
    })
    .eq("id", aff.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
