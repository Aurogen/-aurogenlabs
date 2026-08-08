"use client";

import { X, Minus, Plus, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQty, totalPrice } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          state.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          state.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "#111111", borderLeft: "1px solid rgba(201, 146, 42, 0.15)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5" style={{ borderBottom: "1px solid rgba(201, 146, 42, 0.1)" }}>
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5" style={{ color: "#C9922A" }} />
            <h2 className="text-white font-bold text-lg tracking-wide" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
              CART
            </h2>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
              style={{ background: "#C9922A" }}
            >
              {state.items.length}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(201, 146, 42, 0.08)")}
            onMouseLeave={e => (e.currentTarget.style.background = "")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(201, 146, 42, 0.04)", border: "1px solid rgba(201, 146, 42, 0.12)" }}
              >
                <ShoppingCart className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <p className="text-gray-400 font-medium mb-1">Your cart is empty</p>
                <p className="text-gray-600 text-sm">Add research compounds to get started</p>
              </div>
              <Link
                href="/shop"
                onClick={closeCart}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #C9922A, #D4A03A)" }}
              >
                Browse Products
              </Link>
            </div>
          ) : (
            state.items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4 rounded-xl transition-colors"
                style={{ background: "rgba(20, 16, 10, 0.6)", border: "1px solid rgba(201, 146, 42, 0.1)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201, 146, 42, 0.25)")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201, 146, 42, 0.1)")}
              >
                {/* Product visual */}
                <div
                  className="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #0A0A0A, #161616)", border: "1px solid rgba(201, 146, 42, 0.15)" }}
                >
                  <VialIcon />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{item.product.name}</p>
                  <p className="text-gray-500 text-xs mb-2">{item.product.concentration}</p>

                  <div className="flex items-center justify-between">
                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white transition-all"
                        style={{ border: "1px solid rgba(201, 146, 42, 0.2)" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(201, 146, 42, 0.1)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "")}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white text-sm font-medium w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white transition-all"
                        style={{ border: "1px solid rgba(201, 146, 42, 0.2)" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(201, 146, 42, 0.1)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "")}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm" style={{ color: "#C9922A" }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="p-5" style={{ borderTop: "1px solid rgba(201, 146, 42, 0.1)", background: "#0C0C0C" }}>
            {/* Research disclaimer */}
            <div className="mb-4 p-3 rounded-lg border border-yellow-600/20" style={{ background: "rgba(161, 130, 0, 0.05)" }}>
              <p className="text-yellow-500/80 text-[11px] text-center">
                ⚠️ For Research Use Only · Not for Human Consumption
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white font-bold text-xl">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-gray-600 text-xs mb-4 text-center">
              Shipping calculated at checkout · Delivery 2-5 business days
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #C9922A, #D4A03A)" }}
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-center text-gray-600 text-xs mt-3">
              🔒 Secure payment · SSL Encrypted
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function VialIcon() {
  return (
    <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="0" width="10" height="4" rx="2" fill="#AAAAAA" opacity="0.7" />
      <rect x="11" y="3" width="6" height="2" fill="#888888" opacity="0.5" />
      <rect x="8" y="5" width="12" height="22" rx="4" fill="url(#vialGrad)" />
      <rect x="10" y="5" width="3" height="22" rx="1.5" fill="white" opacity="0.06" />
      <rect x="10" y="20" width="8" height="7" rx="2" fill="#C9922A" opacity="0.25" />
      <defs>
        <linearGradient id="vialGrad" x1="8" y1="5" x2="20" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E1E1E" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
      </defs>
    </svg>
  );
}
