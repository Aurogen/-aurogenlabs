"use client";

import { useState } from "react";
import { Lock, ArrowRight, Loader2, CreditCard, Tag, CheckCircle, XCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { shippingFor, FREE_SHIPPING_MIN, FLAT_SHIPPING, OVERNIGHT_SHIPPING, DELIVERY_DAYS, type ShippingMethod } from "@/lib/shipping";
import { useLanguage } from "@/context/LanguageContext";
import {
  FIRST_ORDER_CODE, FIRST_ORDER_PCT, BUNDLE_CODE, BUNDLE_PCT, BUNDLE_MIN_UNITS, AFFILIATE_DEFAULT_PCT, peptideUnits,
} from "@/lib/promos";

// Set when Stripe is connected; without it orders are taken for manual payment.
const CARD_PAYMENTS = Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const INPUT_STYLE = {
  background: "#FFFFFF",
  border: "1px solid rgba(0,0,0,0.12)",
  color: "#1D1D1F",
};
const LABEL_CLASS = "block text-xs font-semibold tracking-[0.08em] uppercase mb-1.5";
const LABEL_STYLE = { color: "#9E9EA8" };
const INPUT_CLASS =
  "w-full px-4 py-3 rounded-xl text-base sm:text-sm focus:outline-none transition-colors focus:border-black/30";

export default function CheckoutPage() {
  const { state, totalPrice, clearCart } = useCart();
  const { user } = useUser();
  const { t } = useLanguage();
  const [edited, setEdited] = useState({
    firstName: "", lastName: "", email: "",
    address: "", city: "", stateField: "", zip: "",
  });
  // Contact fields default to the signed-in account until the customer types over them.
  const form = {
    ...edited,
    firstName: edited.firstName || user?.firstName || "",
    lastName: edited.lastName || user?.lastName || "",
    email: edited.email || user?.primaryEmailAddress?.emailAddress || "",
  };
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
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

  const goodsTotal = Math.max(0, totalPrice - (discountData?.discount_amount ?? 0));
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const shipping = shippingFor(goodsTotal, shippingMethod);
  const finalTotal = goodsTotal + shipping;

  const units = peptideUnits(
    state.items.map((i) => ({ slug: i.product.slug, goals: i.product.goals, quantity: i.quantity })),
  );

  // Spanish for the promo messages the server can send back.
  function promoError(msg: string) {
    if (!msg.includes("first-order") && !msg.includes("first purchase") && !msg.includes("bacteriostatic")) return msg;
    if (msg.includes("Enter your email")) return t(msg, "Escribe tu correo para usar el descuento de primera compra");
    if (msg.includes("first purchase")) return t(msg, "El descuento de primera compra es solo para tu primer pedido");
    const missing = Math.max(1, BUNDLE_MIN_UNITS - units);
    return t(msg, `Agrega ${missing} péptido${missing === 1 ? "" : "s"} más para usar este descuento (el agua bacteriostática no cuenta)`);
  }

  async function applyDiscount(codeArg?: string) {
    const code = (codeArg ?? discountInput).trim();
    if (!code) return;
    setDiscountLoading(true);
    setDiscountError("");
    setDiscountData(null);
    try {
      const res = await fetch("/api/discount-codes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          order_total: totalPrice,
          email: form.email,
          items: state.items.map((item) => ({ slug: item.product.slug, quantity: item.quantity })),
        }),
      });
      const data = await res.json();
      if (data.valid) {
        setDiscountData({
          code: code.toUpperCase(),
          discount_amount: data.discount_amount,
          type: data.type,
          value: data.value,
          code_id: data.code_id,
        });
      } else {
        setDiscountError(data.error ? promoError(data.error) : t("Invalid code", "Código inválido"));
      }
    } catch {
      setDiscountError(t("Could not validate code", "No se pudo validar el código"));
    } finally {
      setDiscountLoading(false);
    }
  }

  function set(field: string, value: string) {
    setEdited((prev) => ({ ...prev, [field]: value }));
  }

  async function handlePlaceOrder() {
    if (!filled || !agreed || state.items.length === 0 || loading) return;
    setLoading(true);
    setOrderError("");
    try {
      const name = `${form.firstName} ${form.lastName}`.trim();
      // Only product and quantity are sent; the server prices the order from the catalog.
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: form.email,
          address: `${form.address}, ${form.city}, ${form.stateField} ${form.zip}`,
          items: state.items.map((item) => ({ slug: item.product.slug, quantity: item.quantity })),
          discount_code: discountData?.code ?? null,
          shipping_method: shippingMethod,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.id) {
        setOrderError(
          (data.error ?? t("We couldn't place your order. Please try again or contact us.", "No pudimos procesar tu pedido. Inténtalo de nuevo o contáctanos.")) +
            (data.detail ? ` [${data.detail}]` : ""),
        );
        setLoading(false);
        return;
      }

      localStorage.setItem("aurogen_last_order", JSON.stringify({
        id: data.id,
        date: data.date,
        items: data.items,
        total: data.total,
        shipping: data.shipping,
        email: form.email,
        name,
      }));

      // Card payments: keep the cart until Stripe confirms, so a cancelled payment can be retried.
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      clearCart();
      window.location.href = `/order-success?id=${data.id}`;
    } catch {
      setOrderError(t("Connection error. Please check your internet and try again.", "Error de conexión. Revisa tu internet e inténtalo de nuevo."));
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-12" style={{ background: "#F5F4F0" }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lock className="w-4 h-4" style={{ color: "#1B7A45" }} />
            <span className="text-sm font-medium" style={{ color: "#1B7A45" }}>{t("Secure Checkout", "Pago seguro")}</span>
          </div>
          <h1
            className="text-4xl font-medium"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            {t("Checkout", "Finalizar compra")}
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
                className="font-medium text-lg mb-5"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                {t("Contact Information", "Información de contacto")}
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL_CLASS} style={LABEL_STYLE}>{t("First Name", "Nombre")}</label>
                    <input
                    name="firstName" autoComplete="given-name"
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      className={INPUT_CLASS} style={INPUT_STYLE} placeholder={t("John", "Juan")}
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} style={LABEL_STYLE}>{t("Last Name", "Apellido")}</label>
                    <input
                    name="lastName" autoComplete="family-name"
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      className={INPUT_CLASS} style={INPUT_STYLE} placeholder={t("Smith", "Pérez")}
                    />
                  </div>
                </div>
                <div>
                  <label className={LABEL_CLASS} style={LABEL_STYLE}>{t("Email", "Correo electrónico")}</label>
                  <input
                    name="email" autoComplete="email" inputMode="email" autoCapitalize="none" spellCheck={false}
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={INPUT_CLASS} style={INPUT_STYLE} placeholder={t("john@research.com", "juan@research.com")}
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
                className="font-medium text-lg mb-5"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                {t("Shipping Address", "Dirección de envío")}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={LABEL_CLASS} style={LABEL_STYLE}>{t("Address", "Dirección")}</label>
                  <input
                    name="address" autoComplete="address-line1"
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    className={INPUT_CLASS} style={INPUT_STYLE} placeholder="123 Research Blvd"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL_CLASS} style={LABEL_STYLE}>{t("City", "Ciudad")}</label>
                    <input
                    name="city" autoComplete="address-level2"
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      className={INPUT_CLASS} style={INPUT_STYLE} placeholder="Miami"
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS} style={LABEL_STYLE}>{t("State", "Estado")}</label>
                    <input
                    name="state" autoComplete="address-level1" autoCapitalize="characters" maxLength={2}
                      value={form.stateField}
                      onChange={(e) => set("stateField", e.target.value)}
                      className={INPUT_CLASS} style={INPUT_STYLE} placeholder="FL"
                    />
                  </div>
                </div>
                <div>
                  <label className={LABEL_CLASS} style={LABEL_STYLE}>{t("ZIP Code", "Código postal")}</label>
                  <input
                    name="zip" autoComplete="postal-code" inputMode="numeric" maxLength={10}
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
              style={{ background: "rgba(22,38,74,0.04)", border: "1px solid rgba(22,38,74,0.15)" }}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 shrink-0 rounded accent-black"
                />
                <p className="text-xs leading-relaxed" style={{ color: "#6E6E73" }}>
                  {t(
                    "I confirm I am a qualified researcher, that products are for laboratory/research use only, that I am 18+ years old, and that I agree to the",
                    "Confirmo que soy un investigador calificado, que los productos son solo para uso de laboratorio/investigación, que tengo 18 años o más y que acepto los",
                  )}{" "}
                  <Link href="/terms" className="underline hover:opacity-70" style={{ color: "#1D1D1F" }}>
                    {t("Terms of Use", "Términos de uso")}
                  </Link>{" "}
                  {t("and", "y la")}{" "}
                  <Link href="/privacy" className="underline hover:opacity-70" style={{ color: "#1D1D1F" }}>
                    {t("Privacy Policy", "Política de privacidad")}
                  </Link>.
                </p>
              </label>
            </div>

            {/* Shipping method */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h2
                className="font-medium text-lg mb-1"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                {t("Shipping method", "Método de envío")}
              </h2>
              <p className="text-xs mb-4" style={{ color: "#6E6E73" }}>
                {t("All orders ship by UPS. Orders placed before 12:00 PM ET ship the same business day.", "Todos los pedidos se envían por UPS. Los pedidos hechos antes de las 12:00 PM (ET) salen el mismo día hábil.")}
              </p>
              <div className="grid sm:grid-cols-2 gap-2" role="radiogroup" aria-label={t("Shipping method", "Método de envío")}>
                {([
                  {
                    id: "standard" as const,
                    title: t("UPS Standard", "UPS Estándar"),
                    note: t(`${DELIVERY_DAYS.min}–${DELIVERY_DAYS.max} business days`, `${DELIVERY_DAYS.min}–${DELIVERY_DAYS.max} días hábiles`),
                    price: goodsTotal >= FREE_SHIPPING_MIN ? t("FREE", "GRATIS") : `$${FLAT_SHIPPING.toFixed(2)}`,
                  },
                  {
                    id: "overnight" as const,
                    title: t("UPS Overnight", "UPS Overnight"),
                    note: t("Next business day", "Siguiente día hábil"),
                    price: `$${OVERNIGHT_SHIPPING.toFixed(2)}`,
                  },
                ]).map((o) => {
                  const on = shippingMethod === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setShippingMethod(o.id)}
                      className="flex items-center justify-between gap-3 text-left px-4 py-3 rounded-xl transition-colors"
                      style={{ border: `1px solid ${on ? "#111111" : "rgba(0,0,0,0.12)"}`, background: on ? "#F5F4F0" : "#FFFFFF" }}
                    >
                      <span>
                        <span className="block text-sm font-semibold" style={{ color: "#1D1D1F" }}>{o.title}</span>
                        <span className="block text-xs mt-0.5" style={{ color: "#6E6E73" }}>{o.note}</span>
                      </span>
                      <span className="text-sm font-semibold shrink-0" style={{ color: "#1D1D1F" }}>{o.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Discount Code */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h2
                className="font-medium text-lg mb-4"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                {t("Discount", "Descuento")}
              </h2>
              <p className="text-xs mb-3" style={{ color: "#6E6E73" }}>
                {t("One discount per order. Choose the one you want:", "Un solo descuento por compra. Elige el que quieras:")}
              </p>
              <div className="grid sm:grid-cols-2 gap-2 mb-4">
                {[
                  {
                    code: FIRST_ORDER_CODE,
                    title: t(`First order · ${FIRST_ORDER_PCT}% off`, `Primera compra · ${FIRST_ORDER_PCT}% de descuento`),
                    note: t("For your first purchase", "Para tu primer pedido"),
                    ok: true,
                  },
                  {
                    code: BUNDLE_CODE,
                    title: t(`${BUNDLE_MIN_UNITS}+ peptides · ${BUNDLE_PCT}% off`, `${BUNDLE_MIN_UNITS}+ péptidos · ${BUNDLE_PCT}% de descuento`),
                    note: units >= BUNDLE_MIN_UNITS
                      ? t("On the peptides in your order (BAC water doesn't count)", "Sobre los péptidos de tu pedido (el agua BAC no cuenta)")
                      : t(`Add ${BUNDLE_MIN_UNITS - units} more peptide${BUNDLE_MIN_UNITS - units === 1 ? "" : "s"} (BAC water doesn't count)`, `Agrega ${BUNDLE_MIN_UNITS - units} péptido${BUNDLE_MIN_UNITS - units === 1 ? "" : "s"} más (el agua BAC no cuenta)`),
                    ok: units >= BUNDLE_MIN_UNITS,
                  },
                ].map((o) => {
                  const active = discountData?.code === o.code;
                  return (
                    <button
                      key={o.code}
                      type="button"
                      onClick={() => (active ? (setDiscountData(null), setDiscountInput("")) : applyDiscount(o.code))}
                      disabled={!o.ok || discountLoading}
                      aria-pressed={active}
                      className="text-left px-4 py-3 rounded-xl transition-colors disabled:cursor-not-allowed"
                      style={{
                        border: `1px solid ${active ? "#1B7A45" : "rgba(0,0,0,0.12)"}`,
                        background: active ? "rgba(27,122,69,0.06)" : o.ok ? "#FFFFFF" : "#F5F4F0",
                        opacity: o.ok ? 1 : 0.7,
                      }}
                    >
                      <span className="block text-sm font-semibold" style={{ color: active ? "#1B7A45" : "#1D1D1F" }}>{o.title}</span>
                      <span className="block text-xs mt-0.5" style={{ color: "#6E6E73" }}>{o.note}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs mb-2" style={{ color: "#6E6E73" }}>
                {t(
                  `Or enter a discount or affiliate code (affiliate codes give ${AFFILIATE_DEFAULT_PCT}% off):`,
                  `O escribe un código de descuento o de afiliado (los códigos de afiliado dan ${AFFILIATE_DEFAULT_PCT}% de descuento):`,
                )}
              </p>
              {discountData ? (
                <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: "rgba(27,122,69,0.06)", border: "1px solid rgba(27,122,69,0.2)" }}>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: "#1B7A45" }} />
                    <span className="text-sm font-semibold" style={{ color: "#1B7A45" }}>{discountData.code}</span>
                    <span className="text-xs" style={{ color: "#6E6E73" }}>
                      — {discountData.type === "percentage"
                        ? t(`${discountData.value}% off`, `${discountData.value}% de descuento`)
                        : t(`$${discountData.value} off`, `$${discountData.value} de descuento`)}
                    </span>
                  </div>
                  <button
                    onClick={() => { setDiscountData(null); setDiscountInput(""); }}
                    className="text-xs underline"
                    style={{ color: "#9E9EA8" }}
                  >
                    {t("Remove", "Quitar")}
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
                    placeholder={t("Enter discount code", "Ingresa tu código de descuento")}
                  />
                  <button
                    onClick={() => applyDiscount()}
                    disabled={!discountInput.trim() || discountLoading}
                    className="px-4 py-3 rounded-xl text-sm font-semibold transition-opacity"
                    style={{ background: "#1D1D1F", color: "#FFFFFF", opacity: !discountInput.trim() || discountLoading ? 0.4 : 1 }}
                  >
                    {discountLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : t("Apply", "Aplicar")}
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
                style={{ background: "rgba(22,38,74,0.06)" }}
              >
                <CreditCard className="w-5 h-5" style={{ color: "#16264A" }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#1D1D1F" }}>{t("Secure Payment", "Pago seguro")}</p>
                <p className="text-xs mt-0.5" style={{ color: "#9E9EA8" }}>
                  {CARD_PAYMENTS
                    ? t("You'll pay on Stripe's secure page: card, Apple Pay or Google Pay.", "Pagarás en la página segura de Stripe: tarjeta, Apple Pay o Google Pay.")
                    : t("All transactions are encrypted and processed securely.", "Todas las transacciones están cifradas y se procesan de forma segura.")}
                </p>
              </div>
            </div>

            {orderError && (
              <p
                role="alert"
                className="text-sm text-center px-4 py-3 rounded-xl"
                style={{ background: "rgba(192,57,43,0.08)", color: "#C0392B" }}
              >
                {orderError}
              </p>
            )}

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
              {loading
                ? (CARD_PAYMENTS ? t("Opening payment...", "Abriendo el pago...") : t("Placing order...", "Procesando pedido..."))
                : CARD_PAYMENTS ? t("Continue to Payment", "Continuar al pago") : t("Place Order", "Realizar pedido")}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <p className="text-center text-xs" style={{ color: "#C0C0C5" }}>
              🔒 {t("SSL encrypted · Secure processing", "Cifrado SSL · Procesamiento seguro")}
            </p>
          </div>

          {/* Right: Order Summary — shows first on mobile */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div
              className="sticky top-24 p-6 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h2
                className="font-medium text-lg mb-4"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                {t("Order Summary", "Resumen del pedido")}
              </h2>

              {state.items.length === 0 ? (
                <p className="text-sm text-center py-6" style={{ color: "#9E9EA8" }}>
                  {t("Your cart is empty.", "Tu carrito está vacío.")}
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
                  <span style={{ color: "#6E6E73" }}>{t("Subtotal", "Subtotal")}</span>
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
                  <span style={{ color: "#6E6E73" }}>
                    {shippingMethod === "overnight" ? t("Shipping · UPS Overnight", "Envío · UPS Overnight") : t("Shipping · UPS Standard", "Envío · UPS Estándar")}
                  </span>
                  <span className="font-medium" style={{ color: shipping ? "#1D1D1F" : "#1B7A45" }}>
                    {shipping ? `$${shipping.toFixed(2)}` : t("FREE", "GRATIS")}
                  </span>
                </div>
                {shippingMethod === "standard" && shipping > 0 && (
                  <p className="text-xs" style={{ color: "#6E6E73" }}>
                    {t(
                      `Add $${(FREE_SHIPPING_MIN - goodsTotal).toFixed(2)} more for free shipping.`,
                      `Agrega $${(FREE_SHIPPING_MIN - goodsTotal).toFixed(2)} más para envío gratis.`,
                    )}
                  </p>
                )}
                <div className="flex justify-between pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <span className="font-bold" style={{ color: "#1D1D1F" }}>{t("Total", "Total")}</span>
                  <span className="font-bold text-2xl" style={{ color: "#1D1D1F" }}>
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-center text-xs mt-5" style={{ color: "#C0C0C5" }}>
                🔒 {t("SSL encrypted · Secure processing", "Cifrado SSL · Procesamiento seguro")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
