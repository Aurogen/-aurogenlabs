import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";
import { generateUniqueCode, generateUniqueCoupon, siteUrl } from "@/lib/affiliates";
import { sendAffiliateApproved } from "@/lib/email";

function clampPct(v: unknown, fallback: number) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(100, Math.max(0, Math.round(n * 100) / 100));
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = getServiceClient();
  const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [{ data: apps, error }, { data: codes }, { data: orders }] = await Promise.all([
    supabase.from("affiliate_applications").select("*").order("created_at", { ascending: false }),
    supabase.from("affiliate_codes").select("*").order("created_at", { ascending: false }),
    supabase
      .from("orders")
      .select("affiliate_code, total, commission_amount, commission_status")
      .not("affiliate_code", "is", null),
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const affiliateRows = codes ?? [];
  const clickCounts = await Promise.all(
    affiliateRows.map(async (a) => {
      const [all, recent] = await Promise.all([
        supabase.from("affiliate_clicks").select("id", { count: "exact", head: true }).eq("code", a.code),
        supabase.from("affiliate_clicks").select("id", { count: "exact", head: true }).eq("code", a.code).gte("created_at", since30),
      ]);
      return { clicks: all.count ?? 0, clicks30: recent.count ?? 0 };
    })
  );

  const affiliates = affiliateRows.map((a, i) => {
    const own = (orders ?? []).filter((o) => o.affiliate_code === a.code);
    const counted = own.filter((o) => o.commission_status !== "void");
    const sum = (status: string) =>
      own
        .filter((o) => (o.commission_status ?? "pending") === status)
        .reduce((s, o) => s + Number(o.commission_amount ?? 0), 0);
    const { clicks, clicks30 } = clickCounts[i];
    return {
      id: a.id,
      name: a.name,
      email: a.email,
      code: a.code,
      coupon_code: a.coupon_code ?? null,
      commission_rate: Number(a.commission_rate),
      customer_discount_pct: Number(a.customer_discount_pct ?? 0),
      active: a.active !== false,
      payout_method: a.payout_method ?? null,
      payout_details: a.payout_details ?? null,
      notes: a.notes ?? null,
      created_at: a.created_at,
      link: `${siteUrl()}/r/${a.code}`,
      stats: {
        clicks,
        clicks30,
        orders: counted.length,
        conversionRate: clicks > 0 ? Math.round((counted.length / clicks) * 1000) / 10 : 0,
        sales: counted.reduce((s, o) => s + Number(o.total ?? 0), 0),
        pending: sum("pending"),
        approved: sum("approved"),
        paid: sum("paid"),
      },
    };
  });

  // Map email → code so approved applications show their referral code
  const codeByEmail = Object.fromEntries(affiliateRows.map((c) => [c.email, c.code]));
  const applications = (apps ?? []).map((a) => ({ ...a, code: codeByEmail[a.email] ?? null }));

  return NextResponse.json({ applications, affiliates });
}

/** Create an affiliate / influencer directly, without an application. */
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json()) as {
    name?: string;
    email?: string;
    code?: string;
    coupon_code?: string;
    commission_rate?: number;
    customer_discount_pct?: number;
    notes?: string;
    send_email?: boolean;
  };

  const name = (body.name ?? "").trim().slice(0, 80);
  const email = (body.email ?? "").trim().toLowerCase().slice(0, 200);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }

  const supabase = getServiceClient();
  const { data: existing } = await supabase.from("affiliate_codes").select("id").eq("email", email).maybeSingle();
  if (existing) {
    return NextResponse.json({ error: "An affiliate with this email already exists" }, { status: 409 });
  }

  const commission_rate = clampPct(body.commission_rate, 20);
  const customer_discount_pct = clampPct(body.customer_discount_pct, 10);

  let code: string;
  let coupon_code: string;
  try {
    code = await generateUniqueCode(name, body.code);
    coupon_code = await generateUniqueCoupon(name, customer_discount_pct, body.coupon_code);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 409 });
  }

  const { data, error } = await supabase
    .from("affiliate_codes")
    .insert({
      name,
      email,
      code,
      coupon_code,
      commission_rate,
      customer_discount_pct,
      notes: (body.notes ?? "").slice(0, 500) || null,
      active: true,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (body.send_email !== false) {
    try {
      await sendAffiliateApproved(email, name, { code, coupon: coupon_code, commissionRate: commission_rate, discountPct: customer_discount_pct });
    } catch {
      // Email failure doesn't roll back the affiliate
    }
  }

  return NextResponse.json({ ok: true, id: data.id, code, coupon_code });
}
