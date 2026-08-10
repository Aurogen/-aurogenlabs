"use client";

import { useState } from "react";
import { Lock, CreditCard, ArrowRight, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { state, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    address: "", city: "", stateField: "", zip: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [placing, setPlacing] = useState(false);

  const filled =
    form.firstName && form.lastName && form.email &&
    form.address && form.city && form.stateField && form.zip;

  const canSubmit = filled && agreed && state.items.length > 0 && !placing;

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handlePlaceOrder() {
    if (!canSubmit) return;
    setPlacing(true);

    const orderId = `AUG-${Date.now().toString(36).toUpperCase()}`;
    const order = {
      id: orderId,
      date: new Date().toISOString(),
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      address: `${form.address}, ${form.city}, ${form.stateField} ${form.zip}`,
      items: state.items.map((i) => ({
        name: i.product.name,
        concentration: i.product.concentration,
        quantity: i.quantity,
        price: i.product.price,
      })),
      total: totalPrice,
      status: "processing",
    };

    // Save to Supabase
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch (err) {
      console.error("Failed to save order to DB:", err);
    }

    // Save locally as fallback / confirmation page reference
    localStorage.setItem("aurogen_last_order", JSON.stringify(order));
    try {
      const existing = JSON.parse(localStorage.getItem("aurogen_orders") || "[]");
      localStorage.setItem("aurogen_orders", JSON.stringify([order, ...existing]));
    } catch {
      localStorage.setItem("aurogen_orders", JSON.stringify([order]));
    }

    clearCart();
    router.push("/order-success");
  }

  return (
    <div className="min-h-screen py-10" style={{ background: "#696969" }}>
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Secure Checkout</span>
          </div>
          <h1 className="text-white text-4xl font-bold" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
            CHECKOUT
          </h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left: Form */}
          <div className="lg:col-span-3 space-y-6">

            {/* Contact */}
            <div className="p-6 rounded-2xl border border-blue-900/20" style={{ background: "#111111" }}>
              <h2 className="text-white font-bold text-lg mb-4" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                CONTACT INFORMATION
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">FIRST NAME</label>
                    <input
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors"
                      style={{ background: "#050D1A" }}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">LAST NAME</label>
                    <input
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors"
                      style={{ background: "#050D1A" }}
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">EMAIL</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors"
                    style={{ background: "#050D1A" }}
                    placeholder="john@research.com"
                  />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="p-6 rounded-2xl border border-blue-900/20" style={{ background: "#111111" }}>
              <h2 className="text-white font-bold text-lg mb-4" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                SHIPPING ADDRESS
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">ADDRESS</label>
                  <input
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors"
                    style={{ background: "#050D1A" }}
                    placeholder="123 Research Blvd"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">CITY</label>
                    <input
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors"
                      style={{ background: "#050D1A" }}
                      placeholder="Miami"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">STATE</label>
                    <input
                      value={form.stateField}
                      onChange={(e) => set("stateField", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors"
                      style={{ background: "#050D1A" }}
                      placeholder="FL"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">ZIP CODE</label>
                  <input
                    value={form.zip}
                    onChange={(e) => set("zip", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors"
                    style={{ background: "#050D1A" }}
                    placeholder="33101"
                  />
                </div>
              </div>
            </div>

            {/* Payment - WHOP coming */}
            <div className="p-6 rounded-2xl border border-blue-600/20" style={{ background: "#111111" }}>
              <h2 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                PAYMENT
              </h2>
              <div className="flex items-center gap-3 py-6 flex-col text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(27, 107, 222, 0.1)" }}>
                  <CreditCard className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">WHOP Payment — Coming Soon</p>
                  <p className="text-gray-500 text-sm">
                    Place your order now and our team will contact you to complete payment.
                  </p>
                </div>
              </div>
            </div>

            {/* Research agreement */}
            <div className="p-4 rounded-xl border border-yellow-600/20" style={{ background: "rgba(161, 130, 0, 0.04)" }}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-blue-500 w-4 h-4 shrink-0"
                />
                <p className="text-gray-400 text-xs leading-relaxed">
                  I confirm that I am a qualified researcher, that products are for laboratory/research use only,
                  that I am 18+ years old, and that I have read and agree to the{" "}
                  <Link href="/terms" className="text-blue-400 hover:underline">Terms of Use</Link> and{" "}
                  <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
                </p>
              </label>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 p-6 rounded-2xl border border-blue-900/20" style={{ background: "#111111" }}>
              <h2 className="text-white font-bold text-lg mb-4" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                ORDER SUMMARY
              </h2>

              {state.items.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6">Your cart is empty.</p>
              ) : (
                <div className="space-y-3 mb-5">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-300">{item.product.name}</p>
                        <p className="text-gray-600 text-xs">{item.product.concentration} · ×{item.quantity}</p>
                      </div>
                      <span className="text-white font-medium shrink-0 ml-2">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-blue-900/20 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-white font-bold text-2xl">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                onClick={handlePlaceOrder}
                disabled={!canSubmit}
                whileTap={canSubmit ? { scale: 0.97 } : {}}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-all"
                style={{
                  background: canSubmit
                    ? "linear-gradient(135deg, #1B6BDE, #2B7FEF)"
                    : "rgba(27, 107, 222, 0.25)",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  opacity: canSubmit ? 1 : 0.6,
                }}
              >
                {placing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    PLACING ORDER...
                  </span>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    PLACE ORDER
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {!filled && state.items.length > 0 && (
                <p className="text-center text-gray-600 text-xs mt-2">
                  Fill in all fields to continue
                </p>
              )}
              {filled && !agreed && (
                <p className="text-center text-gray-600 text-xs mt-2">
                  Accept the terms to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
