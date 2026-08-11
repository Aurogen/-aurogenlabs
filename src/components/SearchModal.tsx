"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";

interface Props {
  onClose: () => void;
}

export default function SearchModal({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = query.trim().length < 2 ? [] : PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.compound.toLowerCase().includes(query.toLowerCase()) ||
      p.goals.some((g) => g.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)" }}
      >
        {/* Input */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          <Search className="w-5 h-5 shrink-0" style={{ color: "#6B7A8D" }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search peptides, compounds, goals..."
            className="flex-1 bg-transparent text-base focus:outline-none"
            style={{ color: "#1D1D1F" }}
          />
          <button
            onClick={onClose}
            className="transition-opacity hover:opacity-60"
            style={{ color: "#9E9EA8" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="px-5 py-8 text-center text-sm" style={{ color: "#6E6E73" }}>
              No products found for &quot;{query}&quot;
            </p>
          )}
          {results.length > 0 && (
            <div className="p-2">
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl transition-colors group"
                  style={{ background: "transparent" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  {/* Mini vial icon */}
                  <div
                    className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center"
                    style={{ background: "#F5F2EC", border: "1px solid rgba(0,0,0,0.07)" }}
                  >
                    <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
                      <rect x="5" y="0" width="6" height="3" rx="1.5" fill="#6B7A8D" opacity="0.9" />
                      <rect x="3" y="3" width="10" height="16" rx="3" fill="#1D1D1F" />
                      <rect x="4" y="10" width="8" height="6" rx="1.5" fill="#6B7A8D" opacity="0.2" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: "#1D1D1F" }}>
                      {p.name}
                    </p>
                    <p className="text-xs truncate" style={{ color: "#6E6E73" }}>
                      {p.concentration} · {p.goals.slice(0, 2).join(", ")}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm" style={{ color: "#1B7A45" }}>${p.price}</p>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto mt-0.5" style={{ color: "#9E9EA8" }} />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query.trim().length < 2 && (
            <div className="px-5 py-6">
              <p className="text-xs mb-3 tracking-[0.18em] font-medium" style={{ color: "#9E9EA8" }}>
                POPULAR SEARCHES
              </p>
              <div className="flex flex-wrap gap-2">
                {["Semaglutide", "BPC-157", "Retatrutide", "TB-500", "IGF-1"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-lg text-xs transition-all"
                    style={{
                      background: "#F6F6F8",
                      color: "#1D1D1F",
                      border: "1px solid rgba(0,0,0,0.10)",
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div
            className="px-5 py-3"
            style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
          >
            <Link
              href={`/shop?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="text-xs font-medium transition-opacity hover:opacity-70 flex items-center gap-1"
              style={{ color: "#6B7A8D" }}
            >
              View all results for &quot;{query}&quot;
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
