import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";

type Params = { params: Promise<{ id: string }> };

// Which statuses each action may move an order from. Paid commissions are final.
const TRANSITIONS: Record<string, { to: string; from: string[] }> = {
  approve: { to: "approved", from: ["pending"] },
  void: { to: "void", from: ["pending", "approved"] },
  reset: { to: "pending", from: ["approved", "void"] },
};

/** Approve, void or reset commissions. Omit orderIds to apply to every eligible order of the affiliate. */
export async function POST(req: NextRequest, { params }: Params) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const { action, orderIds } = (await req.json()) as { action?: string; orderIds?: string[] };

  const rule = action ? TRANSITIONS[action] : undefined;
  if (!rule) return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  const supabase = getServiceClient();
  const { data: aff } = await supabase.from("affiliate_codes").select("code").eq("id", id).maybeSingle();
  if (!aff) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let query = supabase
    .from("orders")
    .update({ commission_status: rule.to })
    .eq("affiliate_code", aff.code)
    .in("commission_status", rule.from);
  if (Array.isArray(orderIds) && orderIds.length > 0) query = query.in("id", orderIds.slice(0, 500));

  const { data, error } = await query.select("id");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, updated: data?.length ?? 0 });
}
