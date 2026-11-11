"use client";

import Link from "next/link";
import { shippingFor, FREE_SHIPPING_MIN } from "@/lib/shipping";
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { purityLabel, sizeLabel } from "@/data/products-es";
import PromoHint from "@/components/PromoHint";

export default function CartPage() {
  const { state, removeItem, updateQty, totalPrice, totalItems } = useCart();
  const { lang, t } = useLanguage();
  const shipping = shippingFor(totalPrice);

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "#F5F4F0" }}>
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
          <ShoppingCart className="w-10 h-10" style={{ color: "#6B7A8D" }} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}>
            {t("Your Cart Is Empty", "Tu carrito está vacío")}
          </h2>
          <p style={{ color: "#6E6E73" }}>{t("Add research compounds to get started.", "Añade compuestos de investigación para empezar.")}</p>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-85"
          style={{ background: "#1D1D1F" }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Browse Catalog", "Ver catálogo")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10" style={{ background: "#F5F4F0" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h1
          className="text-4xl font-medium mb-8"
          style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
        >
          {t("Cart", "Carrito")}{" "}
          <span className="text-2xl font-normal" style={{ color: "#6E6E73" }}>
            ({totalItems} {totalItems === 1 ? t("item", "artículo") : t("items", "artículos")})
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-5 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                {/* Vial thumb */}
                <div
                  className="w-20 h-20 rounded-xl shrink-0 flex items-center justify-center"
                  style={{ background: "#F5F2EC", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <svg width="28" height="40" viewBox="0 0 28 40" fill="none">
                    <rect x="9" y="0" width="10" height="5" rx="2" fill="#C9C9C9" />
                    <rect x="5" y="4" width="18" height="32" rx="5" fill="url(#cartVial)" />
                    <rect x="7" y="12" width="14" height="16" rx="2.5" fill="#1E1E1E" opacity="0.85" />
                    <text x="14" y="23" textAnchor="middle" fill="#6B7A8D" fontSize="5" fontWeight="bold" fontFamily="sans-serif">A</text>
                    <rect x="5" y="32" width="18" height="5" rx="2.5" fill="#6B7A8D" opacity="0.18" />
                    <defs>
                      <linearGradient id="cartVial" x1="5" y1="4" x2="23" y2="36" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#2A2A2A" />
                        <stop offset="100%" stopColor="#111111" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-bold text-lg hover:opacity-70 transition-opacity"
                        style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm mt-0.5" style={{ color: "#6E6E73" }}>
                        {item.product.concentration} · {sizeLabel(item.product.size, lang)}
                      </p>
                      <p className="text-xs" style={{ color: "#9E9EA8" }}>{t(`${item.product.purity} purity`, `Pureza ${purityLabel(item.product.purity, lang)}`)}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      aria-label={t("Remove item", "Quitar producto")}
                      className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
                      style={{ color: "#9E9EA8" }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div
                      className="flex items-center gap-0 rounded-xl overflow-hidden"
                      style={{ border: "1px solid rgba(0,0,0,0.12)", background: "#FFFFFF" }}
                    >
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity - 1)}
                        aria-label={t("Decrease quantity", "Restar uno")}
                        className="px-3 py-2 transition-colors hover:bg-black/5"
                        style={{ color: "#6E6E73" }}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span
                        className="font-semibold text-sm px-3 min-w-8 text-center"
                        style={{ color: "#1D1D1F" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity + 1)}
                        aria-label={t("Increase quantity", "Sumar uno")}
                        className="px-3 py-2 transition-colors hover:bg-black/5"
                        style={{ color: "#6E6E73" }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl" style={{ color: "#1B7A45" }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs" style={{ color: "#9E9EA8" }}>
                        ${item.product.price.toFixed(2)} / {t("unit", "unidad")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/shop"
              className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "#6E6E73" }}
            >
              <ArrowLeft className="w-4 h-4" />
              {t("Continue shopping", "Seguir comprando")}
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 p-6 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h2
                className="font-medium text-lg mb-5"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                {t("Order Summary", "Resumen del pedido")}
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6E6E73" }}>{t(`Subtotal (${totalItems} ${totalItems === 1 ? "item" : "items"})`, `Subtotal (${totalItems} ${totalItems === 1 ? "artículo" : "artículos"})`)}</span>
                  <span className="font-medium" style={{ color: "#1D1D1F" }}>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6E6E73" }}>{t("Shipping", "Envío")}</span>
                  <span className="font-medium" style={{ color: shipping ? "#1D1D1F" : "#1B7A45" }}>
                    {shipping ? `$${shipping.toFixed(2)}` : t("FREE", "GRATIS")}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs" style={{ color: "#6E6E73" }}>
                    {t(
                      `Add $${(FREE_SHIPPING_MIN - totalPrice).toFixed(2)} more for free shipping.`,
                      `Añade $${(FREE_SHIPPING_MIN - totalPrice).toFixed(2)} más para obtener envío gratis.`,
                    )}
                  </p>
                )}
              </div>

              <div className="mb-4"><PromoHint compact /></div>

              <div className="pt-4 mb-5" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="flex justify-between">
                  <span className="font-bold" style={{ color: "#1D1D1F" }}>{t("Total", "Total")}</span>
                  <span className="font-bold text-2xl" style={{ color: "#1D1D1F" }}>${(totalPrice + shipping).toFixed(2)}</span>
                </div>
              </div>

              <div
                className="mb-4 p-3 rounded-xl text-center text-xs"
                style={{ background: "rgba(22,38,74,0.06)", border: "1px solid rgba(22,38,74,0.15)", color: "#16264A" }}
              >
                {t("For Research Use Only · Not for Human Consumption", "Solo para uso en investigación · No apto para consumo humano")}
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-white text-sm transition-opacity hover:opacity-85"
                style={{ background: "#1D1D1F" }}
              >
                {t("Proceed to Checkout", "Ir a pagar")}
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-center text-xs mt-3" style={{ color: "#9E9EA8" }}>
                🔒 {t("SSL encrypted checkout", "Pago con cifrado SSL")}
              </p>

              <p className="mt-4 text-xs text-center" style={{ color: "#6E6E73" }}>
                {t("Have a discount or affiliate code? You can apply it at checkout.", "¿Tienes un código de descuento o de afiliado? Puedes aplicarlo al pagar.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
