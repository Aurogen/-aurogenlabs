import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = getServiceClient();

  const [orders, newsletter, affiliates, waitlist] = await Promise.all([
    supabase.from("orders").select("total, status"),
    supabase.from("newsletter").select("email", { count: "exact", head: true }),
    supabase.from("affiliate_applications").select("email", { count: "exact", head: true }),
    supabase.from("waitlist").select("email", { count: "exact", head: true }),
  ]);

  const orderRows = orders.data ?? [];
  const totalRevenue = orderRows.reduce((s, o) => s + (o.total ?? 0), 0);
  const processingOrders = orderRows.filter((o) => o.status === "processing").length;

  return NextResponse.json({
    totalOrders: orderRows.length,
    totalRevenue,
    processingOrders,
    newsletterCount: newsletter.count ?? 0,
    affiliateCount: affiliates.count ?? 0,
    waitlistCount: waitlist.count ?? 0,
  });
}
