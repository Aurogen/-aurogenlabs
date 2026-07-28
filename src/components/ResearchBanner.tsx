"use client";

import { FlaskConical, AlertTriangle } from "lucide-react";

export default function ResearchBanner() {
  return (
    <div
      className="w-full z-50 text-center py-2 px-4"
      style={{
        background: "linear-gradient(90deg, #0A1628 0%, #0F2040 50%, #0A1628 100%)",
        borderBottom: "1px solid rgba(27, 107, 222, 0.3)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap">
        <FlaskConical className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <p className="text-xs text-blue-200 tracking-widest uppercase font-medium">
          For Research Use Only · Not for Human Consumption · 18+ Only
        </p>
        <AlertTriangle className="w-3.5 h-3.5 text-yellow-500/70 shrink-0" />
        <p className="text-xs text-gray-500 tracking-wider hidden sm:block">
          All products sold for laboratory research purposes only
        </p>
      </div>
    </div>
  );
}
