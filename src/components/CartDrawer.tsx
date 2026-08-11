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
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          state.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          state.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "#FFFFFF", borderLeft: "1px solid rgba(0,0,0,0.08)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-5"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5" style={{ color: "#6B7A8D" }} />
            <h2
              className="font-bold text-lg tracking-wide"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
            >
              Cart
            </h2>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
              style={{ background: "#6B7A8D" }}
            >
              {state.items.length}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-black/05"
            style={{ color: "#6E6E73" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(10,132,255,0.06)", border: "1px solid rgba(10,132,255,0.15)" }}
              >
                <ShoppingCart className="w-8 h-8" style={{ color: "#9E9EA8" }} />
              </div>
              <div>
                <p className="font-medium mb-1" style={{ color: "#1D1D1F" }}>Your cart is empty</p>
                <p className="text-sm" style={{ color: "#6E6E73" }}>Add research compounds to get started</p>
              </div>
              <Link
                href="/shop"
                onClick={closeCart}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
                style={{ background: "#1D1D1F" }}
              >
                Browse Products
              </Link>
            </div>
          ) : (
            state.items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4 rounded-xl"
                style={{ background: "#F6F6F8", border: "1px solid rgba(0,0,0,0.07)" }}
              >
                {/* Product visual */}
                <div
                  className="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center"
                  style={{ background: "#F5F2EC", border: "1px solid rgba(0,0,0,0.07)" }}
                >
                  <VialIcon />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: "#1D1D1F" }}>{item.product.name}</p>
                  <p className="text-xs mb-2" style={{ color: "#9E9EA8" }}>{item.product.concentration}</p>

                  <div className="flex items-center justify-between">
                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center transition-all"
                        style={{ border: "1px solid rgba(0,0,0,0.12)", color: "#6E6E73", background: "#FFFFFF" }}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-5 text-center" style={{ color: "#1D1D1F" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center transition-all"
                        style={{ border: "1px solid rgba(0,0,0,0.12)", color: "#6E6E73", background: "#FFFFFF" }}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm" style={{ color: "#1B7A45" }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="transition-colors"
                        style={{ color: "#9E9EA8" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#DC2626")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#9E9EA8")}
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
          <div
            className="p-5"
            style={{ borderTop: "1px solid rgba(0,0,0,0.08)", background: "#F6F6F8" }}
          >
            {/* Research disclaimer */}
            <div
              className="mb-4 p-3 rounded-lg"
              style={{ background: "rgba(10,132,255,0.05)", border: "1px solid rgba(10,132,255,0.15)" }}
            >
              <p className="text-[11px] text-center" style={{ color: "#0A84FF" }}>
                ⚠️ For Research Use Only · Not for Human Consumption
              </p>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span style={{ color: "#6E6E73" }}>Subtotal</span>
              <span className="font-bold text-xl" style={{ color: "#1B7A45" }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-xs mb-4 text-center" style={{ color: "#9E9EA8" }}>
              Shipping calculated at checkout · Delivery 2–5 business days
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: "#1D1D1F" }}
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-center text-xs mt-3" style={{ color: "#9E9EA8" }}>
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
      <rect x="9" y="0" width="10" height="4" rx="2" fill="#6B7A8D" opacity="0.9" />
      <rect x="11" y="3" width="6" height="2" fill="#0A84FF" opacity="0.7" />
      <rect x="8" y="5" width="12" height="22" rx="4" fill="url(#vialGrad)" />
      <rect x="10" y="5" width="3" height="22" rx="1.5" fill="white" opacity="0.06" />
      <rect x="10" y="20" width="8" height="7" rx="2" fill="#6B7A8D" opacity="0.15" />
      <defs>
        <linearGradient id="vialGrad" x1="8" y1="5" x2="20" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2A2C" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
      </defs>
    </svg>
  );
}
