"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";

export default function AgeGate() {
  const [show, setShow] = useState(false);
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem("aurogen_age_verified");
    if (!verified) setShow(true);
  }, []);

  function confirm() {
    sessionStorage.setItem("aurogen_age_verified", "1");
    setShow(false);
  }

  function decline() {
    setDeclined(true);
    setTimeout(() => {
      window.location.href = "https://www.google.com";
    }, 2000);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: "rgba(2, 8, 16, 0.97)" }}>
      {/* DNA background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-300 to-transparent" />
      </div>

      <div className="relative w-full max-w-md mx-4">
        {/* Card */}
        <div className="rounded-2xl overflow-hidden border border-blue-600/30" style={{ background: "#0A1628" }}>
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          <div className="p-8 text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <LogoSVG className="w-10 h-10" />
              <div className="text-left">
                <p className="text-white font-bold text-xl tracking-widest" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                  AUROGEN
                </p>
                <p className="text-blue-400 text-xs tracking-[0.3em] -mt-0.5">LABS</p>
              </div>
            </div>

            {!declined ? (
              <>
                {/* Shield icon */}
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border border-blue-500/30" style={{ background: "rgba(27, 107, 222, 0.1)" }}>
                    <ShieldCheck className="w-8 h-8 text-blue-400" />
                  </div>
                </div>

                <h2 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                  VERIFICACIÓN DE EDAD
                </h2>
                <p className="text-blue-300 text-sm tracking-widest mb-1">AGE VERIFICATION</p>

                <div className="my-6 p-4 rounded-xl border border-blue-600/20" style={{ background: "rgba(27, 107, 222, 0.05)" }}>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    Este sitio contiene información sobre péptidos de uso exclusivo para investigación científica.
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    This site contains information about peptides for research use only. Not intended for human consumption.
                  </p>
                </div>

                <p className="text-white text-lg font-semibold mb-6">
                  ¿Eres mayor de 18 años?<br />
                  <span className="text-gray-400 text-sm font-normal">Are you 18 years of age or older?</span>
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={confirm}
                    className="flex-1 py-3 px-6 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}
                  >
                    SÍ, TENGO 18+ / YES
                  </button>
                  <button
                    onClick={decline}
                    className="flex-1 py-3 px-6 rounded-xl font-semibold text-gray-400 border border-gray-600 hover:border-red-500 hover:text-red-400 transition-all duration-200"
                  >
                    NO
                  </button>
                </div>

                <p className="text-gray-500 text-xs mt-4">
                  Al continuar, confirmas que tienes 18+ años y aceptas los{" "}
                  <span className="text-blue-400 cursor-pointer">Términos de Uso</span>.
                </p>
              </>
            ) : (
              <div className="py-8">
                <X className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">Acceso Denegado</h3>
                <p className="text-gray-400 text-sm">
                  Debes tener 18 años o más para acceder a este sitio.<br />
                  Redirigiendo...
                </p>
              </div>
            )}
          </div>

          {/* Bottom disclaimer */}
          <div className="px-8 pb-6">
            <p className="text-center text-gray-600 text-xs">
              FOR RESEARCH USE ONLY · NOT FOR HUMAN USE · MADE IN USA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="19" stroke="#1B6BDE" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="19" stroke="url(#logoGrad)" strokeWidth="1.5" strokeOpacity="0.6" />
      {/* A letter */}
      <path d="M20 8 L28 28 H24 L22 23 H18 L16 28 H12 L20 8Z" fill="white" opacity="0.9" />
      <path d="M19 20 H21 L20 17Z" fill="#1B6BDE" />
      {/* DNA helix dots */}
      <circle cx="32" cy="14" r="1.5" fill="#4DA3FF" opacity="0.8" />
      <circle cx="8" cy="14" r="1.5" fill="#4DA3FF" opacity="0.8" />
      <circle cx="34" cy="20" r="1" fill="#4DA3FF" opacity="0.5" />
      <circle cx="6" cy="20" r="1" fill="#4DA3FF" opacity="0.5" />
      <circle cx="32" cy="26" r="1.5" fill="#4DA3FF" opacity="0.8" />
      <circle cx="8" cy="26" r="1.5" fill="#4DA3FF" opacity="0.8" />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#1B6BDE" />
          <stop offset="100%" stopColor="#4DA3FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
