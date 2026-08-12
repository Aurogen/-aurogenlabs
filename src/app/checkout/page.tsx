"use client";

import { useState } from "react";
import { Lock, ArrowRight, CheckCircle, ChevronLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const INPUT_STYLE = {
  background: "#FFFFFF",
  border: "1px solid rgba(0,0,0,0.12)",
  color: "#1D1D1F",
};
const LABEL_CLASS = "block text-xs font-semibold tracking-[0.08em] uppercase mb-1.5";
const LABEL_STYLE = { color: "#9E9EA8" };
const INPUT_CLASS =
  "w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors focus:border-black/30";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  stateField: string;
  zip: string;
}

function PayForm({
  clientSecret,
  orderId,
  form,
  total,
  items,
  onBack,
}: {
  clientSecret: string;
  orderId: string;
  form: FormData;
  total: number;
  items: { name: string; concentration: string; quantity: number; price: number }[];
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { clearCart } = useCart();
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setPaying(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-success?order_id=${orderId}`,
        payment_method_data: {
          billing_details: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
          },
        },
      },
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message ?? "Payment failed. Please try again.");
      setPaying(false);
      return;
    }

    // Payment succeeded without redirect (e.g. card)
    localStorage.setItem(
      "aurogen_last_order",
      JSON.stringify({ id: orderId, email: form.email, name: `${form.firstName} ${form.lastName}`, items, total })
    );
    clearCart();
    router.push(`/order-success?order_id=${orderId}`);
  }

  return (
    <form onSubmit={handlePay} className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-60"
        style={{ color: "#6E6E73" }}
      >
        <ChevronLeft className="w-4 h-4" /> Back to shipping
      </button>

      <div
        className="p-6 rounded-2xl"
        style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
      >
        <h2
          className="font-bold text-lg mb-5"
          style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
        >
          Payment
        </h2>

        <PaymentElement
          options={{
            layout: "tabs",
            fields: { billingDetails: { name: "never", email: "never" } },
          }}
        />

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}
      </div>

      <div
        className="p-4 rounded-xl"
        style={{ background: "rgba(10,132,255,0.04)", border: "1px solid rgba(10,132,255,0.15)" }}
      >
        <p className="text-xs leading-relaxed" style={{ color: "#6E6E73" }}>
          I confirm I am a qualified researcher, products are for laboratory/research use only,
          I am 18+ years old, and I agree to the{" "}
          <Link href="/terms" className="underline hover:opacity-70" style={{ color: "#1D1D1F" }}>
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:opacity-70" style={{ color: "#1D1D1F" }}>
            Privacy Policy
          </Link>.
        </p>
      </div>

      <button
        type="submit"
        disabled={!stripe || paying}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-sm text-white transition-opacity"
        style={{
          background: paying || !stripe ? "rgba(0,0,0,0.2)" : "#1D1D1F",
          cursor: paying || !stripe ? "not-allowed" : "pointer",
        }}
      >
        {paying ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4" />
            Pay ${total.toFixed(2)}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs" style={{ color: "#C0C0C5" }}>
        🔒 Secured by Stripe · SSL encrypted
      </p>
    </form>
  );
}

export default function CheckoutPage() {
  const { state, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "",
    address: "", city: "", stateField: "", zip: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<"info" | "payment">("info");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const filled =
    form.firstName && form.lastName && form.email &&
    form.address && form.city && form.stateField && form.zip;
  const canContinue = !!filled && agreed && state.items.length > 0 && !loading;

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleContinue() {
    if (!canContinue) return;
    setLoading(true);
    setApiError(null);

    const id = `AUG-${Date.now().toString(36).toUpperCase()}`;
    const orderItems = state.items.map((i) => ({
      name: i.product.name,
      concentration: i.product.concentration,
      quantity: i.quantity,
      price: i.product.price,
    }));

    try {
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          orderId: id,
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          address: `${form.address}, ${form.city}, ${form.stateField} ${form.zip}`,
          items: orderItems,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.clientSecret) {
        setApiError(data.error ?? "Could not initialize payment. Please try again.");
        return;
      }

      setOrderId(id);
      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const orderItems = state.items.map((i) => ({
    name: i.product.name,
    concentration: i.product.concentration,
    quantity: i.quantity,
    price: i.product.price,
  }));

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

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div
              className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: step === "info" ? "#1D1D1F" : "#1B7A45" }}
            >
              {step === "payment" ? (
                <CheckCircle className="w-4 h-4" style={{ color: "#1B7A45" }} />
              ) : (
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px]"
                  style={{ background: "#1D1D1F" }}
                >1</span>
              )}
              Contact & Shipping
            </div>
            <div className="w-8 h-px" style={{ background: "rgba(0,0,0,0.15)" }} />
            <div
              className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: step === "payment" ? "#1D1D1F" : "rgba(0,0,0,0.3)" }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                style={{
                  background: step === "payment" ? "#1D1D1F" : "rgba(0,0,0,0.12)",
                  color: step === "payment" ? "#FFFFFF" : "rgba(0,0,0,0.35)",
                }}
              >2</span>
              Payment
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left: Form */}
          <div className="lg:col-span-3 space-y-5">

            {step === "info" ? (
              <>
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

                {apiError && (
                  <p className="text-sm text-red-600 text-center">{apiError}</p>
                )}

                <button
                  onClick={handleContinue}
                  disabled={!canContinue}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-sm text-white transition-opacity"
                  style={{
                    background: canContinue ? "#1D1D1F" : "rgba(0,0,0,0.2)",
                    cursor: canContinue ? "pointer" : "not-allowed",
                  }}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Loading…
                    </>
                  ) : (
                    <>
                      Continue to Payment
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {!filled && state.items.length > 0 && (
                  <p className="text-center text-xs" style={{ color: "#9E9EA8" }}>
                    Fill in all fields to continue
                  </p>
                )}
                {filled && !agreed && (
                  <p className="text-center text-xs" style={{ color: "#9E9EA8" }}>
                    Accept the terms to continue
                  </p>
                )}
              </>
            ) : clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#1D1D1F",
                      borderRadius: "12px",
                      fontFamily: "var(--font-body, -apple-system, sans-serif)",
                    },
                  },
                }}
              >
                <PayForm
                  clientSecret={clientSecret}
                  orderId={orderId}
                  form={form}
                  total={totalPrice}
                  items={orderItems}
                  onBack={() => setStep("info")}
                />
              </Elements>
            ) : null}
          </div>

          {/* Right: Order Summary */}
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

              <div className="pt-4 space-y-2" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
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
