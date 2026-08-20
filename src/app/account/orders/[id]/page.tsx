import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { getServiceClient } from "@/lib/supabase-server";
import Link from "next/link";
import { ChevronLeft, Clock, Truck, CheckCircle2, AlertCircle, Package, FlaskConical, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Detail — Aurogen Labs",
};

const STATUS_STEPS = ["pending", "processing", "shipped", "delivered"] as const;

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  delivered: { label: "Delivered",  color: "#1B7A45", bg: "rgba(27,122,69,0.08)",   icon: CheckCircle2 },
  shipped:   { label: "Shipped",    color: "#0A84FF", bg: "rgba(10,132,255,0.08)",  icon: Truck },
  processing:{ label: "Processing", color: "#9A6400", bg: "rgba(234,179,8,0.08)",   icon: Clock },
  pending:   { label: "Pending",    color: "#6E6E73", bg: "rgba(110,110,115,0.10)", icon: AlertCircle },
};

function fmt(d?: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

interface OrderItem { name: string; concentration?: string; quantity: number; price: number }

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/account/orders");

  const { id } = await params;
  const supabase = getServiceClient();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (!data) notFound();

  const sc = STATUS_CONFIG[data.status] ?? STATUS_CONFIG.pending;
  const Icon = sc.icon;
  const currentStep = STATUS_STEPS.indexOf(data.status as typeof STATUS_STEPS[number]);

  return (
    <div className="min-h-screen" style={{ background: "#F6F6F8" }}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-1.5 text-sm mb-8 transition-opacity hover:opacity-70"
          style={{ color: "#6E6E73" }}
        >
          <ChevronLeft className="w-4 h-4" /> Back to orders
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: "#9E9EA8" }}>ORDER</p>
            <h1 className="text-2xl font-bold" style={{ color: "#1D1D1F" }}>{data.id}</h1>
            <p className="text-sm mt-1" style={{ color: "#9E9EA8" }}>{fmt(data.created_at)}</p>
          </div>
          <span
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: sc.bg, color: sc.color }}
          >
            <Icon className="w-4 h-4" />
            {sc.label}
          </span>
        </div>

        {/* Progress tracker */}
        <div
          className="p-5 rounded-2xl mb-4"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <p className="text-xs font-semibold mb-4" style={{ color: "#6E6E73" }}>ORDER PROGRESS</p>
          <div className="flex items-center gap-0">
            {STATUS_STEPS.map((step, i) => {
              const done = i <= currentStep;
              const active = i === currentStep;
              const StepIcon = STATUS_CONFIG[step].icon;
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      style={{
                        background: done ? "#1D1D1F" : "rgba(0,0,0,0.06)",
                        border: active ? "2px solid #1D1D1F" : "2px solid transparent",
                      }}
                    >
                      <StepIcon className="w-3.5 h-3.5" style={{ color: done ? "#FFFFFF" : "#C7C7CC" }} />
                    </div>
                    <p
                      className="text-xs mt-1.5 text-center capitalize"
                      style={{ color: done ? "#1D1D1F" : "#9E9EA8", fontWeight: active ? 600 : 400 }}
                    >
                      {STATUS_CONFIG[step].label}
                    </p>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div
                      className="flex-1 h-0.5 mx-1 mb-5"
                      style={{ background: i < currentStep ? "#1D1D1F" : "rgba(0,0,0,0.08)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tracking info */}
        {data.tracking_number && (
          <div
            className="p-5 rounded-2xl mb-4 flex items-center justify-between gap-4"
            style={{ background: "rgba(10,132,255,0.04)", border: "1px solid rgba(10,132,255,0.15)" }}
          >
            <div>
              <p className="text-xs font-semibold mb-1" style={{ color: "#0A84FF" }}>TRACKING NUMBER</p>
              <p className="font-mono font-bold" style={{ color: "#1D1D1F" }}>{data.tracking_number}</p>
            </div>
            {data.tracking_url && (
              <a
                href={data.tracking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold shrink-0 transition-opacity hover:opacity-75"
                style={{ background: "#0A84FF", color: "#FFFFFF" }}
              >
                Track <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        {/* Items */}
        <div
          className="rounded-2xl overflow-hidden mb-4"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <p className="text-xs font-semibold" style={{ color: "#6E6E73" }}>ITEMS</p>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
            {(data.items ?? []).map((item: OrderItem, i: number) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <FlaskConical className="w-4 h-4 shrink-0" style={{ color: "#6B7A8D" }} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "#1D1D1F" }}>{item.name}</p>
                    {item.concentration && (
                      <p className="text-xs" style={{ color: "#9E9EA8" }}>{item.concentration}</p>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold" style={{ color: "#1D1D1F" }}>${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-xs" style={{ color: "#9E9EA8" }}>×{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(0,0,0,0.06)", background: "rgba(0,0,0,0.01)" }}
          >
            <p className="font-semibold text-sm" style={{ color: "#1D1D1F" }}>Total</p>
            <p className="font-bold text-lg" style={{ color: "#1B7A45" }}>${data.total.toFixed(2)}</p>
          </div>
        </div>

        {/* Shipping address */}
        {data.address && (
          <div
            className="p-5 rounded-2xl"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <p className="text-xs font-semibold mb-2" style={{ color: "#6E6E73" }}>SHIPPING ADDRESS</p>
            <p className="text-sm" style={{ color: "#1D1D1F" }}>{data.name}</p>
            <p className="text-sm" style={{ color: "#6E6E73" }}>{data.address}</p>
          </div>
        )}
      </div>
    </div>
  );
}
