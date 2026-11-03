import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getServiceClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Package, ChevronRight, Clock, Truck, CheckCircle2, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders — Aurogen Labs",
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  delivered: { label: "Delivered",  color: "#1B7A45", bg: "rgba(27,122,69,0.08)",    icon: CheckCircle2 },
  shipped:   { label: "Shipped",    color: "#0A84FF", bg: "rgba(10,132,255,0.08)",   icon: Truck },
  processing:{ label: "Processing", color: "#9A6400", bg: "rgba(234,179,8,0.08)",    icon: Clock },
  pending:   { label: "Pending",    color: "#6E6E73", bg: "rgba(110,110,115,0.10)",  icon: AlertCircle },
};

function fmt(d?: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

interface OrderItem { name: string; concentration?: string; quantity: number; price: number }
interface Order {
  id: string;
  created_at: string;
  items: OrderItem[];
  total: number;
  status: string;
  tracking_number?: string;
  tracking_url?: string;
}

export default async function OrdersPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/account/orders");

  const supabase = getServiceClient();
  const { data } = await supabase
    .from("orders")
    .select("id, created_at, items, total, status, tracking_number, tracking_url")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const orders: Order[] = data ?? [];

  return (
    <div className="min-h-screen" style={{ background: "#F6F6F8" }}>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-8" style={{ color: "#1D1D1F" }}>My Orders</h1>

        {orders.length === 0 ? (
          <div
            className="py-20 text-center rounded-2xl"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <Package className="w-10 h-10 mx-auto mb-4" style={{ color: "#D1D1D6" }} />
            <p className="font-medium mb-1" style={{ color: "#1D1D1F" }}>No orders yet</p>
            <p className="text-sm mb-6" style={{ color: "#6E6E73" }}>Your research compound orders will appear here.</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-75"
              style={{ background: "#1D1D1F", color: "#FFFFFF" }}
            >
              Browse peptides
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const sc = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
              const Icon = sc.icon;
              return (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:shadow-sm"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-bold text-sm" style={{ color: "#1D1D1F" }}>{order.id}</span>
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: sc.bg, color: sc.color }}
                      >
                        <Icon className="w-3 h-3" />
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-xs mb-1" style={{ color: "#9E9EA8" }}>{fmt(order.created_at)}</p>
                    <p className="text-xs truncate" style={{ color: "#6E6E73" }}>
                      {(order.items ?? []).map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <p className="font-bold" style={{ color: "#1B7A45" }}>${order.total.toFixed(2)}</p>
                    <ChevronRight className="w-4 h-4" style={{ color: "#C7C7CC" }} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
