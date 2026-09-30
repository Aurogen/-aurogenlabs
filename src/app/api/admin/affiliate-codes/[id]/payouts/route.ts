import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";

type Params = { params: Promise<{ id: string }> };

/** Record a payout for every approved, unpaid commission of the affiliate. */
export async function POST(req: NextRequest, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const { method, reference } = (await req.json()) as { method?: string; reference?: string };

  const supabase = getServiceClient();
  const { data: aff } = await supabase.from("affiliate_codes").select("code, payout_method").eq("id", id).maybeSingle();
  if (!aff) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data: approved, error: listErr } = await supabase
    .from("orders")
    .select("id, commission_amount")
    .eq("affiliate_code", aff.code)
    .eq("commission_status", "approved");
  if (listErr) return NextResponse.json({ error: listErr.message }, { status: 500 });
  if (!approved || approved.length === 0) {
    return NextResponse.json({ error: "No approved commissions to pay" }, { status: 400 });
  }

  const amount = Math.round(approved.reduce((s, o) => s + Number(o.commission_amount ?? 0), 0) * 100) / 100;

  const { data: payout, error: payErr } = await supabase
    .from("affiliate_payouts")
    .insert({
      affiliate_code: aff.code,
      amount,
      order_count: approved.length,
      method: (method ?? aff.payout_method ?? "").slice(0, 40) || null,
      reference: (reference ?? "").slice(0, 200) || null,
    })
    .select("id")
    .single();
  if (payErr) return NextResponse.json({ error: payErr.message }, { status: 500 });

  const { error: updErr } = await supabase
    .from("orders")
    .update({ commission_status: "paid", commission_payout_id: payout.id })
    .in("id", approved.map((o) => o.id))
    .eq("commission_status", "approved");
  if (updErr) {
    // Keep data consistent: a payout row without paid orders would double count.
    await supabase.from("affiliate_payouts").delete().eq("id", payout.id);
    return NextResponse.json({ error: updErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, amount, order_count: approved.length });
}
