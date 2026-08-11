"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight, LayoutDashboard, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface OrderItem {
  name: string;
  concentration: string;
  quantity: number;
  price: number;
}

interface SavedOrder {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  email: string;
  name: string;
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<SavedOrder | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aurogen_last_order");
      if (saved) setOrder(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4" style={{ background: "#F6F6F8" }}>
      <div className="w-full max-w-lg">

        {/* Check icon */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(27,122,69,0.08)",
              border: "1.5px solid rgba(27,122,69,0.25)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 280, damping: 22 }}
            >
              <CheckCircle className="w-12 h-12" style={{ color: "#1B7A45" }} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>

        {/* Headline */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h1
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Order Confirmed
          </h1>
          <p style={{ color: "#6E6E73" }}>
            Your research compounds are being prepared for shipment.
          </p>
        </motion.div>

        {/* Order card */}
        <motion.div
          className="rounded-2xl overflow-hidden mb-5"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          {/* Order number */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
          >
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" style={{ color: "#6B7A8D" }} />
              <span className="text-sm" style={{ color: "#6E6E73" }}>Order</span>
            </div>
            <span className="font-mono font-bold text-sm" style={{ color: "#1D1D1F" }}>
              #{order?.id ?? "—"}
            </span>
          </div>

          {/* Items */}
          {order && order.items.length > 0 && (
            <div
              className="px-6 py-4 space-y-3"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
            >
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#1D1D1F" }}>{item.name}</p>
                    <p className="text-xs" style={{ color: "#9E9EA8" }}>
                      {item.concentration} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "#1D1D1F" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Total */}
          <div className="px-6 py-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span style={{ color: "#6E6E73" }}>Shipping</span>
              <span className="font-medium" style={{ color: "#1B7A45" }}>FREE</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold" style={{ color: "#1D1D1F" }}>Total</span>
              <span className="font-bold text-xl" style={{ color: "#1D1D1F" }}>
                ${order?.total.toFixed(2) ?? "—"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Estimated delivery */}
        <motion.div
          className="rounded-xl px-5 py-4 mb-8 flex items-center gap-4"
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.18)" }}
          >
            <Package className="w-5 h-5" style={{ color: "#6B7A8D" }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "#1D1D1F" }}>Estimated Delivery</p>
            <p className="text-xs" style={{ color: "#6E6E73" }}>2–5 business days · Ships from US</p>
          </div>
          {order?.email && (
            <div className="text-right">
              <p className="text-xs" style={{ color: "#9E9EA8" }}>Confirmation sent to</p>
              <p className="text-xs font-medium" style={{ color: "#1D1D1F" }}>{order.email}</p>
            </div>
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <Link
            href="/dashboard"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-white text-sm transition-opacity hover:opacity-85"
            style={{ background: "#1D1D1F" }}
          >
            <LayoutDashboard className="w-4 h-4" />
            View My Orders
          </Link>
          <Link
            href="/shop"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-black/5"
            style={{ border: "1px solid rgba(0,0,0,0.2)", color: "#1D1D1F" }}
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
            <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>

        <motion.p
          className="text-center text-xs mt-6"
          style={{ color: "#C0C0C5" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          All compounds are shipped for research use only. Not for human consumption.
        </motion.p>
      </div>
    </div>
  );
}
