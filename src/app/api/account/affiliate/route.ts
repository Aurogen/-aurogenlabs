import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getServiceClient } from "@/lib/supabase-server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  if (!email) {
    return NextResponse.json({ error: "No email on account" }, { status: 400 });
  }

  const supabase = getServiceClient();

  // Fetch affiliate code record by email
  const { data: aff, error: affErr } = await supabase
    .from("affiliate_codes")
    .select("*")
    .eq("email", email)
    .single();

  if (affErr || !aff) {
    return NextResponse.json({ affiliate: null });
  }

  // Aggregate referred orders
  const { data: orders, error: ordErr } = await supabase
    .from("orders")
    .select("id, total, commission_amount, created_at, status, name")
    .eq("affiliate_code", aff.code)
    .order("created_at", { ascending: false });

  if (ordErr) {
    return NextResponse.json({ error: ordErr.message }, { status: 500 });
  }

  const totalSales = (orders ?? []).reduce((s, o) => s + (o.total ?? 0), 0);
  const totalCommission = (orders ?? []).reduce((s, o) => s + (o.commission_amount ?? 0), 0);

  return NextResponse.json({
    affiliate: {
      code: aff.code,
      commission_rate: aff.commission_rate,
      created_at: aff.created_at,
    },
    stats: {
      totalOrders: (orders ?? []).length,
      totalSales,
      totalCommission,
    },
    orders: (orders ?? []).map((o) => ({
      id: o.id,
      date: o.created_at,
      name: o.name,
      total: o.total,
      commission: o.commission_amount,
      status: o.status,
    })),
  });
}
