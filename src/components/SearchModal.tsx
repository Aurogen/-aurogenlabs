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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-xl rounded-2xl overflow-hidden border border-blue-600/30 shadow-2xl"
        style={{ background: "#0A1628" }}
      >
        <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-blue-900/30">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search peptides, compounds, goals..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 text-base focus:outline-none"
          />
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="px-5 py-8 text-center text-gray-500 text-sm">
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
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-600/10 transition-colors group"
                >
                  {/* Mini vial icon */}
                  <div
                    className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center border border-blue-900/40"
                    style={{ background: "linear-gradient(135deg, #050D1A, #0F2040)" }}
                  >
                    <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
                      <rect x="5" y="0" width="6" height="3" rx="1.5" fill="#4DA3FF" opacity="0.8" />
                      <rect x="3" y="3" width="10" height="16" rx="3" fill="#152A55" />
                      <rect x="4" y="10" width="8" height="6" rx="1.5" fill="#1B6BDE" opacity="0.3" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors truncate">
                      {p.name}
                    </p>
                    <p className="text-gray-500 text-xs truncate">
                      {p.concentration} · {p.goals.slice(0, 2).join(", ")}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-blue-400 font-bold text-sm">${p.price}</p>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-400 transition-colors ml-auto mt-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query.trim().length < 2 && (
            <div className="px-5 py-6">
              <p className="text-gray-600 text-xs mb-3 tracking-wide">POPULAR SEARCHES</p>
              <div className="flex flex-wrap gap-2">
                {["Semaglutide", "BPC-157", "Retatrutide", "TB-500", "IGF-1"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white border border-blue-900/30 hover:border-blue-600/40 transition-all"
                    style={{ background: "rgba(27,107,222,0.05)" }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="border-t border-blue-900/30 px-5 py-3">
            <Link
              href={`/shop?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors flex items-center gap-1"
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
