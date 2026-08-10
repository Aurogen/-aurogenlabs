"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";
import Link from "next/link";

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
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}
      >
        {/* Top accent rule */}
        <div style={{ height: "2px", background: "#C9922A", opacity: 0.7 }} />

        <div className="p-8 text-center">
          {/* Logo wordmark */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <LogoMark />
            <div className="text-left">
              <p
                className="font-bold text-xl tracking-widest leading-none"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                AUROGEN
              </p>
              <p className="text-xs tracking-[0.3em]" style={{ color: "#C9922A" }}>LABS</p>
            </div>
          </div>

          {!declined ? (
            <>
              {/* Shield icon */}
              <div className="flex justify-center mb-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.18)" }}
                >
                  <ShieldCheck className="w-8 h-8" style={{ color: "#C9922A" }} />
                </div>
              </div>

              <h2
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                Age Verification
              </h2>
              <p className="text-sm mb-6" style={{ color: "#9E9EA8" }}>
                Research compounds — restricted access
              </p>

              {/* Info box */}
              <div
                className="mb-6 p-4 rounded-xl text-left"
                style={{ background: "rgba(201,146,42,0.04)", border: "1px solid rgba(201,146,42,0.14)" }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
                  This site contains information about peptides intended for
                  <strong style={{ color: "#1D1D1F" }}> research use only</strong>.
                  Not intended for human consumption.
                </p>
              </div>

              <p className="font-semibold mb-6" style={{ color: "#1D1D1F" }}>
                Are you 18 years of age or older?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={confirm}
                  className="flex-1 py-3 px-6 rounded-full font-semibold text-white transition-opacity hover:opacity-85"
                  style={{ background: "#1D1D1F" }}
                >
                  Yes, I am 18+
                </button>
                <button
                  onClick={decline}
                  className="flex-1 py-3 px-6 rounded-full font-semibold transition-all"
                  style={{ border: "1px solid rgba(0,0,0,0.15)", color: "#1D1D1F", background: "transparent" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(220,38,38,0.4)";
                    e.currentTarget.style.color = "#DC2626";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
                    e.currentTarget.style.color = "#1D1D1F";
                  }}
                >
                  No
                </button>
              </div>

              <p className="text-xs mt-5" style={{ color: "#9E9EA8" }}>
                By continuing you confirm you are 18+ and agree to our{" "}
                <Link href="/terms" className="transition-opacity hover:opacity-70" style={{ color: "#C9922A" }}>
                  Terms of Service
                </Link>
                .
              </p>
            </>
          ) : (
            <div className="py-8">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(220,38,38,0.07)", border: "1px solid rgba(220,38,38,0.15)" }}
              >
                <X className="w-7 h-7" style={{ color: "#DC2626" }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "#1D1D1F", fontFamily: "var(--font-heading, sans-serif)" }}>
                Access Denied
              </h3>
              <p className="text-sm" style={{ color: "#6E6E73" }}>
                You must be 18 or older to access this site.
                <br />Redirecting…
              </p>
            </div>
          )}
        </div>

        {/* Bottom disclaimer */}
        <div
          className="px-8 pb-6"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          <p className="text-center text-xs pt-4" style={{ color: "#9E9EA8" }}>
            FOR RESEARCH USE ONLY · NOT FOR HUMAN USE · MADE IN USA
          </p>
        </div>
      </div>
    </div>
  );
}

function LogoMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="19" stroke="#C9922A" strokeWidth="1.5" opacity="0.6" />
      <path d="M20 8 L28 28 H24 L22 23 H18 L16 28 H12 L20 8Z" fill="#1D1D1F" opacity="0.85" />
      <path d="M19 20 H21 L20 17Z" fill="#C9922A" />
    </svg>
  );
}
