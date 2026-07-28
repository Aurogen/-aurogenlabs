"use client";

import { Lock, CreditCard, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { state, totalPrice } = useCart();

  return (
    <div className="min-h-screen py-10" style={{ background: "#020810" }}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Secure Checkout</span>
          </div>
          <h1 className="text-white text-4xl font-bold" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>CHECKOUT</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contact */}
            <div className="p-6 rounded-2xl border border-blue-900/20" style={{ background: "#0A1628" }}>
              <h2 className="text-white font-bold text-lg mb-4" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>INFORMACIÓN DE CONTACTO</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">NOMBRE</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none" style={{ background: "#050D1A" }} placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">APELLIDO</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none" style={{ background: "#050D1A" }} placeholder="Smith" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">EMAIL</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none" style={{ background: "#050D1A" }} placeholder="john@research.com" />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="p-6 rounded-2xl border border-blue-900/20" style={{ background: "#0A1628" }}>
              <h2 className="text-white font-bold text-lg mb-4" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>DIRECCIÓN DE ENVÍO</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">DIRECCIÓN</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none" style={{ background: "#050D1A" }} placeholder="123 Research Blvd" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">CIUDAD</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none" style={{ background: "#050D1A" }} placeholder="Miami" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1.5">ESTADO</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none" style={{ background: "#050D1A" }} placeholder="FL" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">ZIP CODE</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none" style={{ background: "#050D1A" }} placeholder="33101" />
                </div>
              </div>
            </div>

            {/* Payment placeholder */}
            <div className="p-6 rounded-2xl border border-blue-600/20" style={{ background: "#0A1628" }}>
              <h2 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>PAGO</h2>
              <div className="flex items-center gap-3 py-6 text-center flex-col">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(27, 107, 222, 0.1)" }}>
                  <CreditCard className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Pasarela de pago próximamente</p>
                  <p className="text-gray-500 text-sm">
                    Stripe, PayPal y más métodos serán habilitados próximamente.
                    Por ahora, <Link href="/contact" className="text-blue-400 hover:underline">contáctanos</Link> para completar tu pedido.
                  </p>
                </div>
              </div>
            </div>

            {/* Research agreement */}
            <div className="p-4 rounded-xl border border-yellow-600/20" style={{ background: "rgba(161, 130, 0, 0.04)" }}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-0.5 accent-blue-500" />
                <p className="text-gray-400 text-xs leading-relaxed">
                  Confirmo que soy un investigador calificado, que los productos son para uso exclusivo en laboratorio/investigación científica,
                  que tengo 18+ años, y que he leído y acepto los{" "}
                  <Link href="/terms" className="text-blue-400 hover:underline">Términos de Uso</Link> y la{" "}
                  <Link href="/privacy" className="text-blue-400 hover:underline">Política de Privacidad</Link>.
                </p>
              </label>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 p-6 rounded-2xl border border-blue-900/20" style={{ background: "#0A1628" }}>
              <h2 className="text-white font-bold text-lg mb-4" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>RESUMEN</h2>
              <div className="space-y-3 mb-5">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.product.name} × {item.quantity}</span>
                    <span className="text-white font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-blue-900/20 pt-4 flex justify-between mb-6">
                <span className="text-white font-bold">Total</span>
                <span className="text-white font-bold text-2xl">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white opacity-50 cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}
              >
                PAGO EN CONSTRUCCIÓN
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-gray-600 text-xs mt-2">
                Próximamente: Stripe · PayPal · Crypto
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
