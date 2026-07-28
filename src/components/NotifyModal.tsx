"use client";

import { useState } from "react";
import { X, Bell, Mail, Phone, CheckCircle2 } from "lucide-react";

interface Props {
  productName: string;
  onClose: () => void;
}

export default function NotifyModal({ productName, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email && !phone) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden border border-blue-600/30 shadow-2xl"
        style={{ background: "#0A1628" }}
      >
        <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

        <div className="p-6">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600/10"
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <>
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(27, 107, 222, 0.15)" }}
                >
                  <Bell className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                    NOTIFÍCAME
                  </h3>
                  <p className="text-gray-400 text-sm">Cuando vuelva a estar disponible</p>
                </div>
              </div>

              {/* Product name */}
              <div
                className="mb-5 p-3 rounded-xl border border-blue-900/30"
                style={{ background: "rgba(27, 107, 222, 0.05)" }}
              >
                <p className="text-blue-300 text-sm text-center font-medium">{productName}</p>
                <p className="text-gray-500 text-xs text-center mt-0.5">Out of stock · Restock estimated soon</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">EMAIL *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors"
                      style={{ background: "#050D1A" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">
                    TELÉFONO <span className="text-gray-600">(opcional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border border-blue-900/30 focus:border-blue-500 focus:outline-none transition-colors"
                      style={{ background: "#050D1A" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}
                >
                  {loading ? "Registrando..." : "Notifícame cuando esté disponible"}
                </button>
              </form>

              <p className="text-gray-600 text-xs text-center mt-4">
                No spam. Solo te notificaremos cuando haya restock.
              </p>
            </>
          ) : (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                ¡Registrado!
              </h3>
              <p className="text-gray-400 text-sm mb-1">
                Te avisaremos cuando <span className="text-blue-300">{productName}</span> vuelva a estar disponible.
              </p>
              <p className="text-gray-500 text-xs mb-6">Revisa tu bandeja de entrada para confirmar.</p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white border border-blue-600/40 hover:border-blue-400 transition-colors"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
