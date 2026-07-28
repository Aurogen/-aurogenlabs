"use client";

import Link from "next/link";
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { state, removeItem, updateQty, totalPrice, totalItems } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "#020810" }}>
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center border border-blue-900/30" style={{ background: "rgba(27, 107, 222, 0.05)" }}>
          <ShoppingCart className="w-10 h-10 text-gray-600" />
        </div>
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>TU CARRITO ESTÁ VACÍO</h2>
          <p className="text-gray-500">Agrega productos de investigación para continuar</p>
        </div>
        <Link href="/shop" className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}>
          <ArrowLeft className="w-4 h-4" />
          Explorar Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10" style={{ background: "#020810" }}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-white text-4xl font-bold mb-8" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
          CARRITO <span className="text-gray-600 text-2xl font-normal">({totalItems} items)</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-5 rounded-2xl border border-blue-900/20" style={{ background: "#0A1628" }}>
                {/* Image */}
                <div className="w-20 h-20 rounded-xl shrink-0 flex items-center justify-center border border-blue-900/30" style={{ background: "linear-gradient(135deg, #050D1A, #0F2040)" }}>
                  <svg width="32" height="44" viewBox="0 0 32 44" fill="none">
                    <rect x="10" y="0" width="12" height="6" rx="2.5" fill="#4DA3FF" opacity="0.8" />
                    <rect x="6" y="5" width="20" height="34" rx="6" fill="url(#cVial)" />
                    <rect x="8" y="14" width="16" height="18" rx="3" fill="#0F2040" opacity="0.8" />
                    <rect x="8" y="36" width="16" height="4" rx="2" fill="#1B6BDE" opacity="0.2" />
                    <defs>
                      <linearGradient id="cVial" x1="6" y1="5" x2="26" y2="39" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#152A55" />
                        <stop offset="100%" stopColor="#050D1A" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <Link href={`/product/${item.product.slug}`} className="text-white font-bold text-lg hover:text-blue-300 transition-colors" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                        {item.product.name}
                      </Link>
                      <p className="text-gray-500 text-sm">{item.product.concentration} · {item.product.size}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{item.product.purity} purity</p>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-gray-600 hover:text-red-400 transition-colors p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 border border-blue-900/30 rounded-xl" style={{ background: "#050D1A" }}>
                      <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="px-3 py-2 text-gray-400 hover:text-white transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-white font-medium px-1 min-w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="px-3 py-2 text-gray-400 hover:text-white transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-xl">${(item.product.price * item.quantity).toFixed(2)}</p>
                      <p className="text-gray-500 text-xs">${item.product.price} / unit</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link href="/shop" className="flex items-center gap-2 text-blue-400 hover:text-white transition-colors text-sm font-medium mt-2">
              <ArrowLeft className="w-4 h-4" />
              Seguir comprando
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl border border-blue-900/20" style={{ background: "#0A1628" }}>
              <h2 className="text-white font-bold text-lg mb-5" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>RESUMEN DEL PEDIDO</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal ({totalItems} items)</span>
                  <span className="text-white font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-400 text-xs font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Taxes</span>
                  <span className="text-gray-400 text-xs">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-blue-900/20 pt-4 mb-5">
                <div className="flex justify-between">
                  <span className="text-white font-bold text-lg">Total</span>
                  <span className="text-white font-bold text-2xl">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mb-4 p-3 rounded-xl border border-yellow-600/15" style={{ background: "rgba(161, 130, 0, 0.04)" }}>
                <p className="text-yellow-500/70 text-[11px] text-center">⚠️ For Research Use Only · Not for Human Consumption</p>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}
              >
                PROCEDER AL PAGO
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-center text-gray-600 text-xs mt-3">🔒 SSL Secured · Encrypted Checkout</p>

              {/* Promo code */}
              <div className="mt-4">
                <input type="text" placeholder="Código de descuento / Affiliado" className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 border border-blue-900/30 focus:border-blue-500 focus:outline-none" style={{ background: "#050D1A" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
