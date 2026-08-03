"use client";

import { useState } from "react";

export default function ReconCalculator() {
  const [peptide, setPeptide] = useState(5);
  const [volume, setVolume] = useState(2);

  const concentration = volume > 0 ? peptide / volume : 0;
  const perTenUnits = concentration * 0.1;

  return (
    <div
      id="calculator"
      className="p-6 rounded-xl border border-blue-900/30"
      style={{ background: "#050D1A" }}
    >
      <h3
        className="text-white font-bold text-xl mb-4"
        style={{ fontFamily: "var(--font-heading, sans-serif)" }}
      >
        RECONSTITUTION CALCULATOR
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">
            PEPTIDE AMOUNT (mg)
          </label>
          <input
            type="number"
            min={0.1}
            step={0.1}
            value={peptide}
            onChange={(e) => setPeptide(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2.5 rounded-lg text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none"
            style={{ background: "#0A1628" }}
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">
            BAC WATER VOLUME (mL)
          </label>
          <input
            type="number"
            min={0.1}
            step={0.1}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2.5 rounded-lg text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none"
            style={{ background: "#0A1628" }}
          />
        </div>
        <div
          className="p-4 rounded-lg border border-blue-600/20 transition-all"
          style={{ background: "rgba(27, 107, 222, 0.06)" }}
        >
          <p className="text-gray-400 text-xs mb-1">Resulting concentration:</p>
          <p className="text-blue-300 font-bold text-2xl">
            {concentration.toFixed(2)} mg/mL
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Each 0.1 mL (10 units on an insulin syringe) ={" "}
            <span className="text-blue-400 font-medium">{perTenUnits.toFixed(3)} mg</span>
          </p>
        </div>
      </div>
    </div>
  );
}
