"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  { icon: ShoppingBag, label: "Shop Now", desc: "Browse all peptides", href: "/shop", color: "#1B6BDE" },
  { icon: BookOpen, label: "Research Center", desc: "Guides & resources", href: "/research", color: "#10B981" },
  { icon: FileText, label: "Protocols", desc: "Research protocols", href: "/protocols", color: "#8B5CF6" },
  { icon: Users, label: "Affiliates", desc: "Earn commissions", href: "/affiliates", color: "#F59E0B" },
];

const STATUS_CONFIG = {
  delivered: { label: "Delivered", color: "#10B981", bg: "rgba(16,185,129,0.1)", icon: CheckCircle2 },
  shipped: { label: "Shipped", color: "#4DA3FF", bg: "rgba(77,163,255,0.1)", icon: Truck },
  processing: { label: "Processing", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", icon: Clock },
  pending: { label: "Pending", color: "#9CA3AF", bg: "rgba(156,163,175,0.1)", icon: AlertCircle },
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
    ? (user.firstName ?? user.emailAddresses[0]?.emailAddress?.split("@")[0] ?? "RESEARCHER").toUpperCase()
    : "RESEARCHER";

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
    { icon: Package, label: "Total Orders", value: orders.length.toString(), color: "#4DA3FF" },
    { icon: DollarSign, label: "Total Spent", value: `$${totalSpent.toFixed(0)}`, color: "#10B981" },
    { icon: FlaskConical, label: "Compounds", value: uniqueCompounds.toString(), color: "#8B5CF6" },
    { icon: Star, label: "Loyalty Points", value: loyaltyPoints.toLocaleString(), color: "#F59E0B" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#696969" }}>
      {/* Header */}
      <div
        className="relative py-10 px-4 border-b"
        style={{
          background: "linear-gradient(180deg, #111111, #000000)",
          borderColor: "rgba(27, 107, 222, 0.15)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            {/* Avatar */}
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-blue-600/30 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1B6BDE22, #1B6BDE44)" }}>
              <UserButton
                appearance={{ elements: { avatarBox: "w-14 h-14 rounded-2xl", userButtonPopoverCard: "z-50" } }}
                              />
            </div>
            <div>
              <p className="text-blue-400 text-xs font-medium tracking-[0.3em] uppercase mb-1">
                Researcher Account
              </p>
              <h1
                className="text-white text-3xl font-bold"
                style={{ fontFamily: "var(--font-heading, sans-serif)" }}
              >
                WELCOME BACK, {userName}
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">researcher@aurogen.com · Member since Jan 2025</p>
            </div>
          </motion.div>

          {/* Tier badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border"
            style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.2)" }}
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 font-bold text-sm">RESEARCHER PRO</span>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto mt-8 flex gap-1">
          {(["overview", "orders", "profile"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize"
              style={
                activeTab === tab
                  ? { background: "rgba(27, 107, 222, 0.15)", color: "#4DA3FF", border: "1px solid rgba(27,107,222,0.3)" }
                  : { color: "#6B7280", border: "1px solid transparent" }
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
  stats: { icon: React.ElementType; label: string; value: string; color: string }[];
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
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="p-5 rounded-2xl border border-blue-900/20"
            style={{ background: "#111111" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${s.color}15` }}
            >
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <p className="text-gray-500 text-xs mb-1">{s.label}</p>
            <p className="text-white font-bold text-2xl" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
              {s.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 rounded-2xl border border-blue-900/20 overflow-hidden" style={{ background: "#111111" }}>
          <div className="px-6 py-4 border-b border-blue-900/20 flex items-center justify-between">
            <h2 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
              RECENT ORDERS
            </h2>
            <button
              className="text-blue-400 text-sm hover:text-white transition-colors"
            >
              View all →
            </button>
          </div>
          <div className="divide-y divide-blue-900/20">
            {recentOrders.map((order) => {
              const sc = STATUS_CONFIG[order.status];
              const StatusIcon = sc.icon;
              return (
                <div key={order.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-bold text-sm">{order.id}</span>
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ background: sc.bg, color: sc.color }}
                      >
                        <StatusIcon className="w-2.5 h-2.5" />
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs truncate">
                      {order.items.map((i) => `${i.name} ×${i.quantity}`).join(" · ")}
                    </p>
                    <p className="text-gray-600 text-xs mt-0.5">{formatDate(order.date)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white font-bold">${order.total.toFixed(2)}</p>
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
            <div className="p-5 rounded-2xl border border-blue-600/20" style={{ background: "rgba(27,107,222,0.06)" }}>
              <h3 className="text-white font-bold mb-3 text-sm" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                CART IN PROGRESS
              </h3>
              <div className="space-y-2 mb-4">
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.product.id} className="flex justify-between text-xs">
                    <span className="text-gray-400 truncate">{item.product.name} × {item.quantity}</span>
                    <span className="text-white ml-2">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <p className="text-gray-600 text-xs">+{cartItems.length - 3} more items</p>
                )}
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-gray-400 text-sm">Total</span>
                <span className="text-white font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}
              >
                Proceed to Checkout
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Loyalty progress */}
          <div className="p-5 rounded-2xl border border-yellow-600/20" style={{ background: "rgba(245,158,11,0.04)" }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                LOYALTY STATUS
              </h3>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
            <p className="text-yellow-400 font-bold text-xl mb-1">Researcher Pro</p>
            <div className="w-full rounded-full h-2 mb-2" style={{ background: "rgba(245,158,11,0.15)" }}>
              <div className="h-2 rounded-full" style={{ width: "68%", background: "linear-gradient(90deg, #F59E0B, #FCD34D)" }} />
            </div>
            <p className="text-gray-500 text-xs">680 pts to Elite tier · Earn 3.7 pts per $1</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2
          className="text-white font-bold text-lg mb-4"
          style={{ fontFamily: "var(--font-heading, sans-serif)" }}
        >
          QUICK ACTIONS
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
            >
              <Link
                href={a.href}
                className="group flex flex-col gap-3 p-5 rounded-2xl border border-blue-900/20 hover:border-blue-600/30 transition-all"
                style={{ background: "#111111" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: `${a.color}15` }}
                >
                  <a.icon className="w-5 h-5" style={{ color: a.color }} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm group-hover:text-blue-300 transition-colors">
                    {a.label}
                  </p>
                  <p className="text-gray-500 text-xs">{a.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity chart */}
      <div className="p-6 rounded-2xl border border-blue-900/20" style={{ background: "#111111" }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
            SPENDING ACTIVITY
          </h2>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <BarChart2 className="w-3.5 h-3.5" />
            Last 6 months
          </div>
        </div>
        <SpendingChart orders={orders} />
      </div>
    </div>
  );
}

function SpendingChart({ orders }: { orders: Order[] }) {
  // Build last 6 months labels and aggregate spending from real orders
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
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(values[i] / max) * 100}%` }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className="w-full rounded-t-lg"
              style={{
                background: values[i] > 0
                  ? "linear-gradient(180deg, #1B6BDE, #0D2244)"
                  : "rgba(27,107,222,0.08)",
                minHeight: 4,
              }}
            />
          </div>
          <span className="text-gray-600 text-[10px]">{label}</span>
          {values[i] > 0 && (
            <span className="text-blue-400 text-[10px] font-medium">${values[i].toFixed(0)}</span>
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
        <h2 className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
          ORDER HISTORY
        </h2>
        <span className="text-gray-500 text-sm">{orders.length} orders total</span>
      </div>

      {orders.map((order, i) => {
        const sc = STATUS_CONFIG[order.status];
        const StatusIcon = sc.icon;
        return (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="p-6 rounded-2xl border border-blue-900/20"
            style={{ background: "#111111" }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-white font-bold text-lg"
                    style={{ fontFamily: "var(--font-heading, sans-serif)" }}
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
                <p className="text-gray-500 text-sm mb-3">{formatDate(order.date)}</p>
                <div className="space-y-1.5">
                  {order.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <FlaskConical className="w-3.5 h-3.5 text-blue-400/60 shrink-0" />
                      <span className="text-gray-300">{item.name}</span>
                      <span className="text-gray-600">×{item.quantity}</span>
                      <span className="text-gray-500 ml-auto">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs mb-1">Order Total</p>
                <p className="text-white font-bold text-2xl">${order.total.toFixed(2)}</p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1 mt-3 text-blue-400 text-sm hover:text-white transition-colors"
                >
                  Reorder
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function ProfileTab() {
  const { user } = useUser();

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
        PROFILE SETTINGS
      </h2>

      {/* Personal info */}
      <div className="p-6 rounded-2xl border border-blue-900/20" style={{ background: "#111111" }}>
        <div className="flex items-center gap-2 mb-5">
          <Settings className="w-4 h-4 text-blue-400" />
          <h3 className="text-white font-bold">Personal Information</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">FIRST NAME</label>
              <input
                defaultValue={user?.firstName ?? ""}
                readOnly
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white border border-blue-900/30 focus:outline-none opacity-70"
                style={{ background: "#050D1A" }}
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">LAST NAME</label>
              <input
                defaultValue={user?.lastName ?? ""}
                readOnly
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white border border-blue-900/30 focus:outline-none opacity-70"
                style={{ background: "#050D1A" }}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">EMAIL</label>
            <input
              defaultValue={user?.primaryEmailAddress?.emailAddress ?? ""}
              readOnly
              type="email"
              className="w-full px-4 py-2.5 rounded-xl text-sm text-white border border-blue-900/30 focus:outline-none opacity-70"
              style={{ background: "#050D1A" }}
            />
          </div>
          <p className="text-gray-600 text-xs">To update your profile, use the account menu in the top navigation bar.</p>
        </div>
      </div>

      {/* Preferences */}
      <div className="p-6 rounded-2xl border border-blue-900/20" style={{ background: "#111111" }}>
        <div className="flex items-center gap-2 mb-5">
          <Settings className="w-4 h-4 text-blue-400" />
          <h3 className="text-white font-bold">Preferences</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Order updates via email", checked: true },
            { label: "Restock notifications", checked: true },
            { label: "New product announcements", checked: false },
            { label: "Research protocol updates", checked: true },
          ].map((pref) => (
            <label key={pref.label} className="flex items-center justify-between cursor-pointer group">
              <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{pref.label}</span>
              <div
                className="w-10 h-5 rounded-full relative transition-colors"
                style={{ background: pref.checked ? "#1B6BDE" : "rgba(27,107,222,0.15)" }}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
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
