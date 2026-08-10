"use client";

import { useState } from "react";
import { Lock, CreditCard, ArrowRight, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const INPUT_STYLE = {
  background: "#FFFFFF",
  border: "1px solid rgba(0,0,0,0.12)",
  color: "#1D1D1F",
};

const LABEL_CLASS = "block text-xs font-semibold tracking-[0.08em] uppercase mb-1.5";
const LABEL_STYLE = { color: "#9E9EA8" };

const INPUT_CLASS =
  "w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors focus:border-black/30";

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

  const canSubmit = !!filled && agreed && state.items.length > 0 && !placing;

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

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch (err) {
      console.error("Failed to save order:", err);
    }

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
    <div className="min-h-screen py-12" style={{ background: "#F6F6F8" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lock className="w-4 h-4" style={{ color: "#1B7A45" }} />
            <span className="text-sm font-medium" style={{ color: "#1B7A45" }}>Secure Checkout</span>
          </div>
          <h1
            className="text-4xl font-bold"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left: Form */}
          <div className="lg:col-span-3 space-y-5">

            {/* Contact */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h2
                className="font-bold text-lg mb-5"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL_CLASS} style={LABEL_STYLE}>First Name</label>
                    <input
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      className={INPUT_CLASS}
                      style={INPUT_STYLE}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} style={LABEL_STYLE}>Last Name</label>
                    <input
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      className={INPUT_CLASS}
                      style={INPUT_STYLE}
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div>
                  <label className={LABEL_CLASS} style={LABEL_STYLE}>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={INPUT_CLASS}
                    style={INPUT_STYLE}
                    placeholder="john@research.com"
                  />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h2
                className="font-bold text-lg mb-5"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={LABEL_CLASS} style={LABEL_STYLE}>Address</label>
                  <input
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    className={INPUT_CLASS}
                    style={INPUT_STYLE}
                    placeholder="123 Research Blvd"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL_CLASS} style={LABEL_STYLE}>City</label>
                    <input
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      className={INPUT_CLASS}
                      style={INPUT_STYLE}
                      placeholder="Miami"
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} style={LABEL_STYLE}>State</label>
                    <input
                      value={form.stateField}
                      onChange={(e) => set("stateField", e.target.value)}
                      className={INPUT_CLASS}
                      style={INPUT_STYLE}
                      placeholder="FL"
                    />
                  </div>
                </div>
                <div>
                  <label className={LABEL_CLASS} style={LABEL_STYLE}>ZIP Code</label>
                  <input
                    value={form.zip}
                    onChange={(e) => set("zip", e.target.value)}
                    className={INPUT_CLASS}
                    style={INPUT_STYLE}
                    placeholder="33101"
                  />
                </div>
              </div>
            </div>

            {/* Payment placeholder */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h2
                className="font-bold text-lg mb-4"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                Payment
              </h2>
              <div
                className="flex items-center gap-4 py-5 px-4 rounded-xl"
                style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.07)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.18)" }}
                >
                  <CreditCard className="w-6 h-6" style={{ color: "#C9922A" }} />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#1D1D1F" }}>
                    Payment processing — coming soon
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#6E6E73" }}>
                    Place your order now and our team will contact you to complete payment securely.
                  </p>
                </div>
              </div>
            </div>

            {/* Research agreement */}
            <div
              className="p-4 rounded-xl"
              style={{ background: "rgba(201,146,42,0.04)", border: "1px solid rgba(201,146,42,0.15)" }}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 shrink-0 rounded accent-black"
                />
                <p className="text-xs leading-relaxed" style={{ color: "#6E6E73" }}>
                  I confirm I am a qualified researcher, that products are for laboratory/research use only,
                  that I am 18+ years old, and that I agree to the{" "}
                  <Link href="/terms" className="underline hover:opacity-70" style={{ color: "#1D1D1F" }}>
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline hover:opacity-70" style={{ color: "#1D1D1F" }}>
                    Privacy Policy
                  </Link>.
                </p>
              </label>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-2">
            <div
              className="sticky top-24 p-6 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h2
                className="font-bold text-lg mb-4"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                Order Summary
              </h2>

              {state.items.length === 0 ? (
                <p className="text-sm text-center py-6" style={{ color: "#9E9EA8" }}>
                  Your cart is empty.
                </p>
              ) : (
                <div className="space-y-3 mb-5">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <div>
                        <p style={{ color: "#1D1D1F" }}>{item.product.name}</p>
                        <p className="text-xs" style={{ color: "#9E9EA8" }}>
                          {item.product.concentration} · ×{item.quantity}
                        </p>
                      </div>
                      <span className="font-medium shrink-0 ml-2" style={{ color: "#1D1D1F" }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 space-y-2 mb-6" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6E6E73" }}>Shipping</span>
                  <span className="font-medium" style={{ color: "#1B7A45" }}>FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold" style={{ color: "#1D1D1F" }}>Total</span>
                  <span className="font-bold text-2xl" style={{ color: "#1D1D1F" }}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!canSubmit}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-sm text-white transition-opacity"
                style={{
                  background: canSubmit ? "#1D1D1F" : "rgba(0,0,0,0.2)",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
              >
                {placing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Placing Order…
                  </span>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Place Order
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {!filled && state.items.length > 0 && (
                <p className="text-center text-xs mt-2" style={{ color: "#9E9EA8" }}>
                  Fill in all fields to continue
                </p>
              )}
              {filled && !agreed && (
                <p className="text-center text-xs mt-2" style={{ color: "#9E9EA8" }}>
                  Accept the terms to continue
                </p>
              )}

              <p className="text-center text-xs mt-4" style={{ color: "#C0C0C5" }}>
                🔒 SSL encrypted · Secure processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
