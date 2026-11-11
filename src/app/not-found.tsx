import Link from "next/link";
import { FlaskConical, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import T from "@/components/T";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center"
      style={{ background: "#F5F4F0" }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: "rgba(22,38,74,0.08)", border: "1px solid rgba(22,38,74,0.15)" }}
      >
        <FlaskConical className="w-8 h-8" style={{ color: "#6B7A8D" }} />
      </div>

      <p className="text-sm font-semibold tracking-[0.2em] mb-2" style={{ color: "#9E9EA8" }}>404</p>
      <h1
        className="text-3xl font-medium mb-3"
        style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
      >
        <T en="Page Not Found" es="Página no encontrada" />
      </h1>
      <p className="text-sm mb-8 max-w-xs" style={{ color: "#6E6E73" }}>
        <T
          en="The compound you're looking for doesn't exist or has been moved."
          es="El compuesto que buscas no existe o se ha movido."
        />
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/shop"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
          style={{ background: "#111111" }}
        >
          <T en="Browse Products" es="Ver productos" />
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors hover:bg-black/5"
          style={{ border: "1px solid rgba(0,0,0,0.15)", color: "#1D1D1F" }}
        >
          <T en="Go Home" es="Ir al inicio" />
        </Link>
      </div>
    </div>
  );
}
