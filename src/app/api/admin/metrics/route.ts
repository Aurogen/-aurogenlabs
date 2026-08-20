import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = getServiceClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, total, status, items, created_at")
    .order("created_at", { ascending: true });

  const rows = orders ?? [];

  // Revenue by day (last 30 days)
  const now = new Date();
  const days: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    days[key] = 0;
  }
  for (const o of rows) {
    const key = o.created_at?.slice(0, 10);
    if (key && key in days) days[key] += Number(o.total ?? 0);
  }
  const revenueByDay = Object.entries(days).map(([date, revenue]) => ({ date, revenue }));

  // Top products by revenue
  const productRevenue: Record<string, { name: string; revenue: number; units: number }> = {};
  for (const o of rows) {
    const items: Array<{ name: string; price: number; quantity: number }> = o.items ?? [];
    for (const item of items) {
      const key = item.name;
      if (!productRevenue[key]) productRevenue[key] = { name: item.name, revenue: 0, units: 0 };
      productRevenue[key].revenue += (item.price ?? 0) * (item.quantity ?? 1);
      productRevenue[key].units += item.quantity ?? 1;
    }
  }
  const topProducts = Object.values(productRevenue)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 8);

  // Orders by status
  const statusCounts: Record<string, number> = { pending: 0, processing: 0, shipped: 0, delivered: 0 };
  for (const o of rows) {
    const s = o.status ?? "pending";
    if (s in statusCounts) statusCounts[s]++;
  }
  const ordersByStatus = Object.entries(statusCounts).map(([status, count]) => ({ status, count }));

  return NextResponse.json({ revenueByDay, topProducts, ordersByStatus });
}
