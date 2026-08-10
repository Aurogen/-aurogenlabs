"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  DollarSign,
  FlaskConical,
  Star,
  ChevronRight,
  ShoppingBag,
  BookOpen,
  FileText,
  Users,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  Settings,
  BarChart2,
} from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useCart } from "@/context/CartContext";

interface OrderItem {
  name: string;
  concentration?: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "delivered" | "shipped" | "processing" | "pending";
}

const DEMO_ORDERS: Order[] = [
  {
    id: "ORG-2501",
    date: "2025-01-15",
    items: [
      { name: "Retatrutide 5mg", concentration: "5mg", quantity: 1, price: 129.99 },
      { name: "BPC-157 5mg", concentration: "5mg", quantity: 1, price: 89.99 },
    ],
    total: 219.98,
    status: "delivered",
  },
  {
    id: "ORG-2487",
    date: "2024-12-28",
    items: [{ name: "Semaglutide 5mg", concentration: "5mg", quantity: 2, price: 109.99 }],
    total: 219.98,
    status: "delivered",
  },
  {
    id: "ORG-2510",
    date: "2025-01-22",
    items: [
      { name: "TB-500 5mg", concentration: "5mg", quantity: 1, price: 99.99 },
      { name: "IGF-1 LR3 1mg", concentration: "1mg", quantity: 1, price: 129.99 },
    ],
    total: 229.98,
    status: "shipped",
  },
  {
    id: "ORG-2531",
    date: "2025-01-28",
    items: [{ name: "CJC-1295 2mg", concentration: "2mg", quantity: 1, price: 74.99 }],
    total: 74.99,
    status: "processing",
  },
];

const QUICK_ACTIONS = [
  { icon: ShoppingBag, label: "Shop Now", desc: "Browse all peptides", href: "/shop" },
  { icon: BookOpen, label: "Research Center", desc: "Guides & resources", href: "/research" },
  { icon: FileText, label: "Protocols", desc: "Research protocols", href: "/protocols" },
  { icon: Users, label: "Affiliates", desc: "Earn commissions", href: "/affiliates" },
];

const STATUS_CONFIG = {
  delivered: { label: "Delivered", color: "#1B7A45", bg: "rgba(27,122,69,0.08)", icon: CheckCircle2 },
  shipped: { label: "Shipped", color: "#C9922A", bg: "rgba(201,146,42,0.08)", icon: Truck },
  processing: { label: "Processing", color: "#D97706", bg: "rgba(217,119,6,0.08)", icon: Clock },
  pending: { label: "Pending", color: "#9E9EA8", bg: "rgba(158,158,168,0.10)", icon: AlertCircle },
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function DashboardPage() {
  const { state: cartState, totalPrice, totalItems } = useCart();
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "profile">("overview");

  const userName = isLoaded && user
    ? (user.firstName ?? user.emailAddresses[0]?.emailAddress?.split("@")[0] ?? "Researcher")
    : "Researcher";

  useEffect(() => {
    if (!isLoaded) return;
    const email = user?.primaryEmailAddress?.emailAddress ?? "";

    if (email) {
      fetch(`/api/orders?email=${encodeURIComponent(email)}`)
        .then((r) => r.json())
        .then(({ orders: dbOrders }) => {
          if (Array.isArray(dbOrders) && dbOrders.length > 0) {
            setOrders(dbOrders);
          } else {
            try {
              const saved = localStorage.getItem("aurogen_orders");
              const parsed: Order[] = saved ? JSON.parse(saved) : [];
              setOrders(parsed.length > 0 ? parsed : DEMO_ORDERS);
            } catch {
              setOrders(DEMO_ORDERS);
            }
          }
        })
        .catch(() => setOrders(DEMO_ORDERS));
    } else {
      setOrders(DEMO_ORDERS);
    }
  }, [isLoaded, user]);

  const totalSpent = orders.reduce((s, o) => s + o.total, 0);
  const uniqueCompounds = new Set(orders.flatMap((o) => o.items.map((i) => i.name.split(" ")[0]))).size;
  const loyaltyPoints = Math.round(totalSpent * 3.7);

  const STATS = [
    { icon: Package, label: "Total Orders", value: orders.length.toString(), accent: "#C9922A" },
    { icon: DollarSign, label: "Total Spent", value: `$${totalSpent.toFixed(0)}`, accent: "#1B7A45" },
    { icon: FlaskConical, label: "Compounds", value: uniqueCompounds.toString(), accent: "#C9922A" },
    { icon: Star, label: "Loyalty Points", value: loyaltyPoints.toLocaleString(), accent: "#C9922A" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F6F6F8", color: "#1D1D1F" }}>
      {/* Header */}
      <div
        className="py-10 px-4"
        style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ background: "rgba(201,146,42,0.06)", border: "1px solid rgba(201,146,42,0.18)" }}
            >
              <UserButton
                appearance={{ elements: { avatarBox: "w-14 h-14 rounded-2xl", userButtonPopoverCard: "z-50" } }}
              />
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.25em] mb-1" style={{ color: "#6E6E73" }}>
                Researcher Account
              </p>
              <h1
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                Welcome back, {userName}
              </h1>
              <p className="text-sm mt-0.5" style={{ color: "#9E9EA8" }}>
                {user?.primaryEmailAddress?.emailAddress ?? "researcher@aurogen.com"} · Member since Jan 2025
              </p>
            </div>
          </div>

          {/* Tier badge */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ background: "rgba(201,146,42,0.06)", border: "1px solid rgba(201,146,42,0.18)" }}
          >
            <Star className="w-4 h-4 fill-current" style={{ color: "#C9922A" }} />
            <span className="font-bold text-sm" style={{ color: "#C9922A" }}>Researcher Pro</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto mt-8 flex gap-1">
          {(["overview", "orders", "profile"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all capitalize"
              style={
                activeTab === tab
                  ? { background: "#1D1D1F", color: "#FFFFFF" }
                  : { color: "#6E6E73", background: "transparent" }
              }
            >
              {tab === "overview" ? "Overview" : tab === "orders" ? "My Orders" : "Profile"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "overview" && (
          <OverviewTab
            stats={STATS}
            orders={orders}
            cartItems={cartState.items}
            totalItems={totalItems}
            totalPrice={totalPrice}
          />
        )}
        {activeTab === "orders" && <OrdersTab orders={orders} />}
        {activeTab === "profile" && <ProfileTab />}
      </div>
    </div>
  );
}

function OverviewTab({
  stats,
  orders,
  cartItems,
  totalItems,
  totalPrice,
}: {
  stats: { icon: React.ElementType; label: string; value: string; accent: string }[];
  orders: Order[];
  cartItems: { product: { id: string; name: string; concentration: string; price: number }; quantity: number }[];
  totalItems: number;
  totalPrice: number;
}) {
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-5 rounded-2xl"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${s.accent}14`, border: `1px solid ${s.accent}30` }}
            >
              <s.icon className="w-5 h-5" style={{ color: s.accent }} />
            </div>
            <p className="text-xs mb-1" style={{ color: "#6E6E73" }}>{s.label}</p>
            <p
              className="font-bold text-2xl"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div
          className="lg:col-span-2 rounded-2xl overflow-hidden"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
          >
            <h2
              className="font-bold text-lg"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
            >
              Recent Orders
            </h2>
            <button className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: "#C9922A" }}>
              View all →
            </button>
          </div>
          <div>
            {recentOrders.map((order, i) => {
              const sc = STATUS_CONFIG[order.status];
              const StatusIcon = sc.icon;
              return (
                <div
                  key={order.id}
                  className="px-6 py-4 flex items-center justify-between gap-4"
                  style={{ borderBottom: i < recentOrders.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm" style={{ color: "#1D1D1F" }}>{order.id}</span>
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ background: sc.bg, color: sc.color }}
                      >
                        <StatusIcon className="w-2.5 h-2.5" />
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-xs truncate" style={{ color: "#6E6E73" }}>
                      {order.items.map((i) => `${i.name} ×${i.quantity}`).join(" · ")}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#9E9EA8" }}>{formatDate(order.date)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold" style={{ color: "#1B7A45" }}>${order.total.toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Cart summary */}
          {totalItems > 0 && (
            <div
              className="p-5 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h3
                className="font-bold mb-3 text-sm"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                Cart in Progress
              </h3>
              <div className="space-y-2 mb-4">
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.product.id} className="flex justify-between text-xs">
                    <span className="truncate" style={{ color: "#6E6E73" }}>{item.product.name} × {item.quantity}</span>
                    <span className="ml-2 font-medium" style={{ color: "#1D1D1F" }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <p className="text-xs" style={{ color: "#9E9EA8" }}>+{cartItems.length - 3} more items</p>
                )}
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-sm" style={{ color: "#6E6E73" }}>Total</span>
                <span className="font-bold" style={{ color: "#1B7A45" }}>${totalPrice.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
                style={{ background: "#1D1D1F" }}
              >
                Proceed to Checkout
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Loyalty progress */}
          <div
            className="p-5 rounded-2xl"
            style={{ background: "rgba(201,146,42,0.04)", border: "1px solid rgba(201,146,42,0.15)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}>
                Loyalty Status
              </h3>
              <Star className="w-4 h-4 fill-current" style={{ color: "#C9922A" }} />
            </div>
            <p className="font-bold text-xl mb-2" style={{ color: "#C9922A" }}>Researcher Pro</p>
            <div className="w-full rounded-full h-1.5 mb-2" style={{ background: "rgba(201,146,42,0.15)" }}>
              <div className="h-1.5 rounded-full" style={{ width: "68%", background: "#C9922A" }} />
            </div>
            <p className="text-xs" style={{ color: "#A07520" }}>680 pts to Elite tier · Earn 3.7 pts per $1</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2
          className="font-bold text-lg mb-4"
          style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
        >
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="group flex flex-col gap-3 p-5 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.18)" }}
              >
                <a.icon className="w-5 h-5" style={{ color: "#C9922A" }} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#1D1D1F" }}>{a.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "#6E6E73" }}>{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity chart */}
      <div
        className="p-6 rounded-2xl"
        style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2
            className="font-bold text-lg"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Spending Activity
          </h2>
          <div className="flex items-center gap-1" style={{ color: "#9E9EA8" }}>
            <BarChart2 className="w-3.5 h-3.5" />
            <span className="text-xs">Last 6 months</span>
          </div>
        </div>
        <SpendingChart orders={orders} />
      </div>
    </div>
  );
}

function SpendingChart({ orders }: { orders: Order[] }) {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return { label: d.toLocaleString("en-US", { month: "short" }), key: `${d.getFullYear()}-${d.getMonth()}` };
  });

  const values = months.map(({ key }) =>
    orders
      .filter((o) => {
        const d = new Date(o.date);
        return `${d.getFullYear()}-${d.getMonth()}` === key;
      })
      .reduce((s, o) => s + o.total, 0)
  );

  const max = Math.max(...values, 1);

  return (
    <div className="flex items-end gap-3 h-32">
      {months.map(({ label }, i) => (
        <div key={label + i} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full flex items-end justify-center" style={{ height: 96 }}>
            <div
              className="w-full rounded-t-lg transition-all duration-700"
              style={{
                height: `${(values[i] / max) * 100}%`,
                background: values[i] > 0 ? "#C9922A" : "rgba(201,146,42,0.12)",
                minHeight: 4,
              }}
            />
          </div>
          <span className="text-[10px]" style={{ color: "#9E9EA8" }}>{label}</span>
          {values[i] > 0 && (
            <span className="text-[10px] font-medium" style={{ color: "#C9922A" }}>${values[i].toFixed(0)}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function OrdersTab({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2
          className="font-bold text-xl"
          style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
        >
          Order History
        </h2>
        <span className="text-sm" style={{ color: "#6E6E73" }}>{orders.length} orders total</span>
      </div>

      {orders.map((order) => {
        const sc = STATUS_CONFIG[order.status];
        const StatusIcon = sc.icon;
        return (
          <div
            key={order.id}
            className="p-6 rounded-2xl"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="font-bold text-lg"
                    style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                  >
                    {order.id}
                  </span>
                  <span
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ background: sc.bg, color: sc.color }}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {sc.label}
                  </span>
                </div>
                <p className="text-sm mb-3" style={{ color: "#9E9EA8" }}>{formatDate(order.date)}</p>
                <div className="space-y-1.5">
                  {order.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <FlaskConical className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(201,146,42,0.6)" }} />
                      <span style={{ color: "#1D1D1F" }}>{item.name}</span>
                      <span style={{ color: "#9E9EA8" }}>×{item.quantity}</span>
                      <span className="ml-auto" style={{ color: "#6E6E73" }}>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs mb-1" style={{ color: "#6E6E73" }}>Order Total</p>
                <p
                  className="font-bold text-2xl"
                  style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1B7A45" }}
                >
                  ${order.total.toFixed(2)}
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1 mt-3 text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: "#C9922A" }}
                >
                  Reorder
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProfileTab() {
  const { user } = useUser();

  return (
    <div className="max-w-2xl space-y-6">
      <h2
        className="font-bold text-xl"
        style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
      >
        Profile Settings
      </h2>

      {/* Personal info */}
      <div
        className="p-6 rounded-2xl"
        style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Settings className="w-4 h-4" style={{ color: "#C9922A" }} />
          <h3 className="font-bold" style={{ color: "#1D1D1F" }}>Personal Information</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1.5 tracking-[0.12em] font-medium" style={{ color: "#9E9EA8" }}>
                FIRST NAME
              </label>
              <input
                defaultValue={user?.firstName ?? ""}
                readOnly
                className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none opacity-70"
                style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.10)", color: "#1D1D1F" }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1.5 tracking-[0.12em] font-medium" style={{ color: "#9E9EA8" }}>
                LAST NAME
              </label>
              <input
                defaultValue={user?.lastName ?? ""}
                readOnly
                className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none opacity-70"
                style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.10)", color: "#1D1D1F" }}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs mb-1.5 tracking-[0.12em] font-medium" style={{ color: "#9E9EA8" }}>
              EMAIL
            </label>
            <input
              defaultValue={user?.primaryEmailAddress?.emailAddress ?? ""}
              readOnly
              type="email"
              className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none opacity-70"
              style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.10)", color: "#1D1D1F" }}
            />
          </div>
          <p className="text-xs" style={{ color: "#9E9EA8" }}>
            To update your profile, use the account menu in the top navigation bar.
          </p>
        </div>
      </div>

      {/* Preferences */}
      <div
        className="p-6 rounded-2xl"
        style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Settings className="w-4 h-4" style={{ color: "#C9922A" }} />
          <h3 className="font-bold" style={{ color: "#1D1D1F" }}>Preferences</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Order updates via email", checked: true },
            { label: "Restock notifications", checked: true },
            { label: "New product announcements", checked: false },
            { label: "Research protocol updates", checked: true },
          ].map((pref) => (
            <label key={pref.label} className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm" style={{ color: "#1D1D1F" }}>{pref.label}</span>
              <div
                className="w-10 h-5 rounded-full relative transition-colors"
                style={{ background: pref.checked ? "#C9922A" : "rgba(0,0,0,0.12)" }}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm"
                  style={{ left: pref.checked ? "calc(100% - 18px)" : "2px" }}
                />
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
