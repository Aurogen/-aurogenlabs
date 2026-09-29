"use client";

import { useState } from "react";
import { Lock, ArrowRight, Loader2, CreditCard, Tag, CheckCircle, XCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
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
  const { state, totalPrice } = useCart();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    address: "", city: "", stateField: "", zip: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discountInput, setDiscountInput] = useState("");
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountData, setDiscountData] = useState<{
    code: string;
    discount_amount: number;
    type: string;
    value: number;
    code_id: string;
  } | null>(null);
  const [discountError, setDiscountError] = useState("");

  const filled =
    form.firstName && form.lastName && form.email &&
    form.address && form.city && form.stateField && form.zip;

  const finalTotal = Math.max(0, totalPrice - (discountData?.discount_amount ?? 0));

  async function applyDiscount() {
    if (!discountInput.trim()) return;
    setDiscountLoading(true);
    setDiscountError("");
    setDiscountData(null);
    try {
      const res = await fetch("/api/discount-codes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: discountInput.trim(), order_total: totalPrice }),
      });
      const data = await res.json();
      if (data.valid) {
        setDiscountData({
          code: discountInput.trim().toUpperCase(),
          discount_amount: data.discount_amount,
          type: data.type,
          value: data.value,
          code_id: data.code_id,
        });
      } else {
        setDiscountError(data.error ?? "Invalid code");
      }
    } catch {
      setDiscountError("Could not validate code");
    } finally {
      setDiscountLoading(false);
    }
  }

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function getRefCookie(): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/(?:^|;\s*)aurogen_ref=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  async function handlePlaceOrder() {
    if (!filled || !agreed || state.items.length === 0 || loading) return;
    setLoading(true);
    try {
      const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
      const orderDate = new Date().toISOString();
      const items = state.items.map((item) => ({
        name: item.product.name,
        concentration: item.product.concentration,
        quantity: item.quantity,
        price: item.product.price,
      }));
      const affiliateCode = getRefCookie();

      // Save order to DB as pending_payment before redirecting to payment
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: orderId,
          date: orderDate,
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          address: `${form.address}, ${form.city}, ${form.stateField} ${form.zip}`,
          items,
          total: finalTotal,
          status: "pending_payment",
          payment_status: "pending",
          ...(affiliateCode ? { affiliate_code: affiliateCode } : {}),
          ...(discountData
            ? { discount_code: discountData.code, discount_amount: discountData.discount_amount }
            : {}),
        }),
      });

      localStorage.setItem("aurogen_last_order", JSON.stringify({
        id: orderId,
        date: orderDate,
        items,
        total: finalTotal,
        email: form.email,
        name: `${form.firstName} ${form.lastName}`,
      }));

      // TODO: redirect to payment processor once configured (Authorize.net / PaymentCloud)
      // Order is saved to DB; payment integration will be wired here.
      alert("Your order has been received. Our team will contact you to complete payment. Thank you!");
      window.location.href = `/order-success?id=${orderId}`;
    } catch {
      setLoading(false);
    }
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
          <div className="lg:col-span-3 space-y-5 order-2 lg:order-1">

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
                      className={INPUT_CLASS} style={INPUT_STYLE} placeholder="John"
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} style={LABEL_STYLE}>Last Name</label>
                    <input
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      className={INPUT_CLASS} style={INPUT_STYLE} placeholder="Smith"
                    />
                  </div>
                </div>
                <div>
                  <label className={LABEL_CLASS} style={LABEL_STYLE}>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={INPUT_CLASS} style={INPUT_STYLE} placeholder="john@research.com"
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
                    className={INPUT_CLASS} style={INPUT_STYLE} placeholder="123 Research Blvd"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL_CLASS} style={LABEL_STYLE}>City</label>
                    <input
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      className={INPUT_CLASS} style={INPUT_STYLE} placeholder="Miami"
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} style={LABEL_STYLE}>State</label>
                    <input
                      value={form.stateField}
                      onChange={(e) => set("stateField", e.target.value)}
                      className={INPUT_CLASS} style={INPUT_STYLE} placeholder="FL"
                    />
                  </div>
                </div>
                <div>
                  <label className={LABEL_CLASS} style={LABEL_STYLE}>ZIP Code</label>
                  <input
                    value={form.zip}
                    onChange={(e) => set("zip", e.target.value)}
                    className={INPUT_CLASS} style={INPUT_STYLE} placeholder="33101"
                  />
                </div>
              </div>
            </div>

            {/* Research agreement */}
            <div
              className="p-4 rounded-xl"
              style={{ background: "rgba(10,132,255,0.04)", border: "1px solid rgba(10,132,255,0.15)" }}
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

            {/* Discount Code */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h2
                className="font-bold text-lg mb-4"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                Discount Code
              </h2>
              {discountData ? (
                <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: "rgba(27,122,69,0.06)", border: "1px solid rgba(27,122,69,0.2)" }}>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: "#1B7A45" }} />
                    <span className="text-sm font-semibold" style={{ color: "#1B7A45" }}>{discountData.code}</span>
                    <span className="text-xs" style={{ color: "#6E6E73" }}>
                      — {discountData.type === "percentage" ? `${discountData.value}% off` : `$${discountData.value} off`}
                    </span>
                  </div>
                  <button
                    onClick={() => { setDiscountData(null); setDiscountInput(""); }}
                    className="text-xs underline"
                    style={{ color: "#9E9EA8" }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={discountInput}
                    onChange={(e) => { setDiscountInput(e.target.value); setDiscountError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && applyDiscount()}
                    className={INPUT_CLASS + " flex-1"}
                    style={INPUT_STYLE}
                    placeholder="Enter discount code"
                  />
                  <button
                    onClick={applyDiscount}
                    disabled={!discountInput.trim() || discountLoading}
                    className="px-4 py-3 rounded-xl text-sm font-semibold transition-opacity"
                    style={{ background: "#1D1D1F", color: "#FFFFFF", opacity: !discountInput.trim() || discountLoading ? 0.4 : 1 }}
                  >
                    {discountLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                  </button>
                </div>
              )}
              {discountError && (
                <div className="flex items-center gap-1.5 mt-2">
                  <XCircle className="w-3.5 h-3.5" style={{ color: "#FF3B30" }} />
                  <p className="text-xs" style={{ color: "#FF3B30" }}>{discountError}</p>
                </div>
              )}
            </div>

            {/* Payment */}
            <div
              className="p-5 rounded-2xl flex items-center gap-4"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(10,132,255,0.06)" }}
              >
                <CreditCard className="w-5 h-5" style={{ color: "#0A84FF" }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#1D1D1F" }}>Secure Payment</p>
                <p className="text-xs mt-0.5" style={{ color: "#9E9EA8" }}>
                  All transactions are encrypted and processed securely.
                </p>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={!filled || !agreed || state.items.length === 0 || loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-sm text-white transition-opacity"
              style={{
                background: filled && agreed && state.items.length > 0 && !loading ? "#1D1D1F" : "rgba(0,0,0,0.2)",
                cursor: filled && agreed && state.items.length > 0 && !loading ? "pointer" : "not-allowed",
              }}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              {loading ? "Placing order..." : "Place Order"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <p className="text-center text-xs" style={{ color: "#C0C0C5" }}>
              🔒 SSL encrypted · Secure processing
            </p>
          </div>

          {/* Right: Order Summary — shows first on mobile */}
          <div className="lg:col-span-2 order-1 lg:order-2">
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

              <div className="pt-4 space-y-2" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6E6E73" }}>Subtotal</span>
                  <span className="font-medium" style={{ color: "#1D1D1F" }}>${totalPrice.toFixed(2)}</span>
                </div>
                {discountData && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#1B7A45" }}>
                      <Tag className="w-3 h-3 inline mr-1" />
                      {discountData.code}
                    </span>
                    <span className="font-medium" style={{ color: "#1B7A45" }}>
                      −${discountData.discount_amount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6E6E73" }}>Shipping</span>
                  <span className="font-medium" style={{ color: "#1B7A45" }}>FREE</span>
                </div>
                <div className="flex justify-between pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <span className="font-bold" style={{ color: "#1D1D1F" }}>Total</span>
                  <span className="font-bold text-2xl" style={{ color: "#1D1D1F" }}>
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-center text-xs mt-5" style={{ color: "#C0C0C5" }}>
                🔒 SSL encrypted · Secure processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
