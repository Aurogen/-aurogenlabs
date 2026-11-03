import type { Metadata } from "next";
import { FileText, Download, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Laboratory Protocols",
  description: "Laboratory handling guides for research peptides: reconstitution, storage and stability, COA interpretation, HPLC verification and concentration calculations. For in-vitro research use only.",
};

const PROTOCOLS = [
  {
    name: "Peptide Reconstitution Guide",
    format: "Lab guide",
    description: "Laboratory procedure for reconstituting lyophilized peptides: solvent selection, volume calculation, aseptic handling and vial labeling.",
    tags: ["Reconstitution", "Lab Handling"],
  },
  {
    name: "Storage & Stability Guidelines",
    format: "Reference",
    description: "Recommended temperatures for lyophilized and reconstituted material, light protection, freeze-thaw limits and shelf-life considerations.",
    tags: ["Storage", "Stability"],
  },
  {
    name: "Reading a Certificate of Analysis",
    format: "Reference",
    description: "How to interpret HPLC chromatograms, mass spectrometry identity data, purity calculations and lot traceability on a batch COA.",
    tags: ["QC", "Documentation"],
  },
  {
    name: "HPLC Purity Verification",
    format: "Method",
    description: "General reverse-phase HPLC method for independently reproducing identity and purity verification of peptide reagents in your own lab.",
    tags: ["Analytical", "HPLC"],
  },
  {
    name: "Concentration & Dilution Calculations",
    format: "Worksheet",
    description: "Worked examples for calculating stock concentrations (mg/mL, molarity) and preparing serial dilutions for in-vitro assays.",
    tags: ["Calculations", "In-Vitro"],
  },
  {
    name: "Laboratory Safety & Disposal",
    format: "Reference",
    description: "Personal protective equipment, spill response and disposal procedures for chemical research reagents.",
    tags: ["Safety", "Compliance"],
  },
];

export default function ProtocolsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F6F6F8", color: "#1D1D1F" }}>
      {/* Header */}
      <div
        className="py-16 px-4 text-center"
        style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      >
        <p className="text-xs font-bold tracking-[0.25em] mb-3" style={{ color: "#6E6E73" }}>
          Research Library
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
        >
          Laboratory Protocols
        </h1>
        <p className="max-w-xl mx-auto text-base leading-relaxed" style={{ color: "#6E6E73" }}>
          Handling, storage and analytical guides for in-vitro laboratory work. For research use only.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {PROTOCOLS.map((p) => (
            <div
              key={p.name}
              className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.18)" }}
                >
                  <FileText className="w-5 h-5" style={{ color: "#6B7A8D" }} />
                </div>
                <span className="text-xs shrink-0" style={{ color: "#9E9EA8" }}>{p.format}</span>
              </div>

              <h3
                className="font-bold text-lg mb-2"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                {p.name}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#6E6E73" }}>{p.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded text-xs font-medium"
                    style={{ background: "rgba(10,132,255,0.06)", color: "#0A84FF", border: "1px solid rgba(10,132,255,0.15)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: "#6B7A8D" }}
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <ChevronRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: "#9E9EA8" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-12 text-center p-10 rounded-2xl"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <h3
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Need Technical Documentation?
          </h3>
          <p className="mb-6 text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
            Our team can provide Certificates of Analysis, Safety Data Sheets and analytical data for any compound in our catalog.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-85"
            style={{ background: "#1D1D1F" }}
          >
            Contact Support
          </Link>
        </div>
      </div>

      {/* Footer note */}
      <div className="py-8 px-4 text-center" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <p className="text-xs" style={{ color: "#9E9EA8" }}>
          Aurogen Labs products are intended for laboratory research use only. Not for human or veterinary use.
        </p>
      </div>
    </div>
  );
}
