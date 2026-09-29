"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aurogen_cookie_consent");
      if (!saved) setVisible(true);
    } catch {
      // localStorage blocked (private mode, etc.)
    }
  }, []);

  function accept() {
    try { localStorage.setItem("aurogen_cookie_consent", "accepted"); } catch {}
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem("aurogen_cookie_consent", "declined"); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="max-w-2xl mx-auto rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{
          background: "#18181B",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          pointerEvents: "all",
        }}
      >
        <p className="text-xs leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.6)" }}>
          We use cookies to improve your experience and analyze site traffic.
          By continuing you agree to our{" "}
          <Link href="/privacy" className="underline hover:opacity-80 transition-opacity" style={{ color: "rgba(255,255,255,0.85)" }}>
            Privacy Policy
          </Link>.
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-colors"
            style={{ color: "rgba(255,255,255,0.45)", background: "transparent" }}
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
            style={{ background: "#FFFFFF", color: "#0A0A0C" }}
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="ml-1 p-1.5 rounded-lg transition-colors"
            style={{ color: "rgba(255,255,255,0.3)" }}
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
