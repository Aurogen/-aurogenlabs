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
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4" style={{ background: "#000000" }}>

      {/* Glow bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #10B981, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative w-full max-w-lg">

        {/* Animated checkmark */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <motion.div
              className="w-28 h-28 rounded-full flex items-center justify-center"
              style={{ background: "rgba(16, 185, 129, 0.1)", border: "2px solid rgba(16, 185, 129, 0.3)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              >
                <CheckCircle className="w-14 h-14 text-green-400" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            {/* Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#10B981" : "#1B6BDE",
                  top: "50%", left: "50%",
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((i / 8) * Math.PI * 2) * 70,
                  y: Math.sin((i / 8) * Math.PI * 2) * 70,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
              />
            ))}
          </div>
        </div>

        {/* Headline */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-heading, sans-serif)" }}
          >
            ORDER CONFIRMED
          </h1>
          <p className="text-gray-400 text-base">
            Your research compounds are being prepared for shipment.
          </p>
        </motion.div>

        {/* Order card */}
        <motion.div
          className="rounded-2xl border border-blue-900/30 overflow-hidden mb-6"
          style={{ background: "#111111" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Order number */}
          <div className="px-6 py-4 border-b border-blue-900/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400 text-sm">Order</span>
            </div>
            <span className="text-blue-400 font-mono font-bold text-sm">
              #{order?.id ?? "—"}
            </span>
          </div>

          {/* Items */}
          {order && order.items.length > 0 && (
            <div className="px-6 py-4 space-y-3 border-b border-blue-900/20">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="text-white text-sm font-medium">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.concentration} · Qty {item.quantity}</p>
                  </div>
                  <span className="text-white text-sm font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Total + shipping */}
          <div className="px-6 py-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Shipping</span>
              <span className="text-green-400 font-medium">FREE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white font-bold">Total</span>
              <span className="text-white font-bold text-xl">
                ${order?.total.toFixed(2) ?? "—"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Estimated delivery */}
        <motion.div
          className="rounded-xl border border-blue-900/20 px-5 py-4 mb-8 flex items-center gap-4"
          style={{ background: "rgba(27, 107, 222, 0.06)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(27,107,222,0.15)" }}>
            <Package className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Estimated Delivery</p>
            <p className="text-gray-400 text-xs">2–5 business days · Ships from US</p>
          </div>
          {order?.email && (
            <div className="ml-auto text-right">
              <p className="text-gray-500 text-xs">Confirmation sent to</p>
              <p className="text-blue-400 text-xs font-medium">{order.email}</p>
            </div>
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            href="/dashboard"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}
          >
            <LayoutDashboard className="w-4 h-4" />
            VIEW MY ORDERS
          </Link>
          <Link
            href="/shop"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-gray-300 text-sm border border-blue-900/30 hover:border-blue-600/50 transition-colors"
            style={{ background: "#111111" }}
          >
            <ShoppingBag className="w-4 h-4" />
            CONTINUE SHOPPING
            <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          className="text-center text-gray-600 text-xs mt-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          All compounds are shipped for research use only.
          Not for human consumption.
        </motion.p>
      </div>
    </div>
  );
}
