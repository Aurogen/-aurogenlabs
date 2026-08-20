"use client";

import { useState, useEffect, useCallback } from "react";
import { TrendingUp, ShoppingBag, BarChart2 } from "lucide-react";

interface DayRevenue { date: string; revenue: number }
interface TopProduct { name: string; revenue: number; units: number }
interface StatusCount { status: string; count: number }

interface Metrics {
  revenueByDay: DayRevenue[];
  topProducts: TopProduct[];
  ordersByStatus: StatusCount[];
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#9E9EA8",
  processing: "#F5A623",
  shipped: "#0A84FF",
  delivered: "#1B7A45",
};

export default function AnalyticsTab() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/metrics");
      const data = await res.json();
      setMetrics(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!metrics) return null;

  const { revenueByDay, topProducts, ordersByStatus } = metrics;

  const maxRevenue = Math.max(...revenueByDay.map((d) => d.revenue), 1);
  const totalRevenue = revenueByDay.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = ordersByStatus.reduce((s, d) => s + d.count, 0);

  // Show only every 5th label on x-axis to avoid crowding
  const labelInterval = 5;

  return (
    <div className="space-y-5">
      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "30-day Revenue", value: `$${totalRevenue.toFixed(0)}`, icon: TrendingUp, color: "#1B7A45" },
          { label: "Total Orders", value: totalOrders.toString(), icon: ShoppingBag, color: "#0A84FF" },
          { label: "Top Product", value: topProducts[0]?.name ?? "—", icon: BarChart2, color: "#9A6400" },
          { label: "Avg Order", value: totalOrders ? `$${(totalRevenue / totalOrders).toFixed(0)}` : "—", icon: TrendingUp, color: "#6B7A8D" },
        ].map((k) => (
          <div
            key={k.label}
            className="p-4 rounded-2xl"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <k.icon className="w-4 h-4 mb-2" style={{ color: k.color }} />
            <p className="text-lg font-bold leading-tight truncate" style={{ color: "#1D1D1F" }}>{k.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "#9E9EA8" }}>{k.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div
        className="p-5 rounded-2xl"
        style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
      >
        <p className="text-xs font-semibold mb-4" style={{ color: "#6E6E73" }}>REVENUE — LAST 30 DAYS</p>
        <div className="flex items-end gap-1" style={{ height: "120px" }}>
          {revenueByDay.map((d, i) => {
            const pct = maxRevenue > 0 ? d.revenue / maxRevenue : 0;
            const barH = Math.max(pct * 100, d.revenue > 0 ? 4 : 2);
            const isLast = i === revenueByDay.length - 1;
            return (
              <div key={d.date} className="flex-1 flex flex-col items-center justify-end gap-1 group relative" style={{ height: "120px" }}>
                {/* Tooltip */}
                {d.revenue > 0 && (
                  <div
                    className="absolute bottom-full mb-1 hidden group-hover:block z-10 whitespace-nowrap px-2 py-1 rounded-lg text-[10px] font-semibold"
                    style={{ background: "#1D1D1F", color: "#FFFFFF", transform: "translateX(-50%)", left: "50%" }}
                  >
                    ${d.revenue.toFixed(0)}
                    <br />
                    <span style={{ fontWeight: 400, opacity: 0.7 }}>{d.date.slice(5)}</span>
                  </div>
                )}
                <div
                  className="w-full rounded-sm transition-all"
                  style={{
                    height: `${barH}%`,
                    background: d.revenue > 0 ? "#0A84FF" : "rgba(0,0,0,0.06)",
                    minHeight: "2px",
                  }}
                />
                {(i % labelInterval === 0 || isLast) && (
                  <p className="text-[9px] leading-none" style={{ color: "#9E9EA8" }}>
                    {d.date.slice(5).replace("-", "/")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Top products */}
        <div
          className="p-5 rounded-2xl"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <p className="text-xs font-semibold mb-4" style={{ color: "#6E6E73" }}>TOP PRODUCTS BY REVENUE</p>
          {topProducts.length === 0 ? (
            <p className="text-sm py-4 text-center" style={{ color: "#9E9EA8" }}>No orders yet</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map((p, i) => {
                const maxP = topProducts[0].revenue;
                const pct = maxP > 0 ? (p.revenue / maxP) * 100 : 0;
                return (
                  <div key={p.name}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm truncate mr-2" style={{ color: "#1D1D1F" }}>
                        <span className="text-xs mr-2 font-semibold" style={{ color: "#9E9EA8" }}>#{i + 1}</span>
                        {p.name}
                      </p>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-semibold" style={{ color: "#1B7A45" }}>${p.revenue.toFixed(0)}</span>
                        <span className="text-xs ml-1.5" style={{ color: "#9E9EA8" }}>×{p.units}</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${pct}%`, background: "#0A84FF", transition: "width 0.4s ease" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Orders by status */}
        <div
          className="p-5 rounded-2xl"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <p className="text-xs font-semibold mb-4" style={{ color: "#6E6E73" }}>ORDERS BY STATUS</p>
          {totalOrders === 0 ? (
            <p className="text-sm py-4 text-center" style={{ color: "#9E9EA8" }}>No orders yet</p>
          ) : (
            <>
              {/* Stacked bar */}
              <div className="flex h-4 rounded-full overflow-hidden mb-5">
                {ordersByStatus.filter((s) => s.count > 0).map((s) => (
                  <div
                    key={s.status}
                    title={`${s.status}: ${s.count}`}
                    style={{
                      width: `${(s.count / totalOrders) * 100}%`,
                      background: STATUS_COLORS[s.status] ?? "#9E9EA8",
                    }}
                  />
                ))}
              </div>
              <div className="space-y-2">
                {ordersByStatus.map((s) => (
                  <div key={s.status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: STATUS_COLORS[s.status] ?? "#9E9EA8" }}
                      />
                      <span className="text-sm capitalize" style={{ color: "#6E6E73" }}>{s.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold" style={{ color: "#1D1D1F" }}>{s.count}</span>
                      <span className="text-xs w-10 text-right" style={{ color: "#9E9EA8" }}>
                        {totalOrders > 0 ? `${Math.round((s.count / totalOrders) * 100)}%` : "—"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
