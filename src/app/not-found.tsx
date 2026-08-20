import Link from "next/link";
import { FlaskConical, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center"
      style={{ background: "#F6F6F8" }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.15)" }}
      >
        <FlaskConical className="w-8 h-8" style={{ color: "#6B7A8D" }} />
      </div>

      <p className="text-sm font-semibold tracking-[0.2em] mb-2" style={{ color: "#9E9EA8" }}>404</p>
      <h1
        className="text-3xl font-bold mb-3"
        style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
      >
        Page Not Found
      </h1>
      <p className="text-sm mb-8 max-w-xs" style={{ color: "#6E6E73" }}>
        The compound you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/shop"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
          style={{ background: "#0A84FF" }}
        >
          Browse Products
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors hover:bg-black/5"
          style={{ border: "1px solid rgba(0,0,0,0.15)", color: "#1D1D1F" }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
