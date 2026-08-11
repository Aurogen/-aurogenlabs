import type { Metadata } from "next";
import { FileText, Download, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research Protocols",
  description: "Download research protocols for BPC-157, Semaglutide, IGF-1 LR3, TB-500, and more. Detailed dosing, reconstitution, and study guides for researchers.",
};

const PROTOCOLS = [
  {
    name: "BPC-157 Reconstitution Protocol",
    compound: "BPC-157",
    goal: "Recovery",
    duration: "8–12 weeks",
    description: "Detailed reconstitution guide for BPC-157 including solvent ratios, storage, and injection protocols for research models.",
    tags: ["Recovery", "Tissue Repair"],
  },
  {
    name: "Semaglutide Research Protocol",
    compound: "Semaglutide",
    goal: "Fat Loss",
    duration: "16–24 weeks",
    description: "GLP-1 receptor agonist research protocol covering dosing escalation models, metabolic parameter tracking, and safety monitoring.",
    tags: ["Fat Loss", "Metabolic"],
  },
  {
    name: "Anti-Aging Peptide Stack",
    compound: "Multiple",
    goal: "Anti-Aging",
    duration: "12 weeks",
    description: "Multi-compound protocol investigating synergistic effects of Epithalon, MOTS-c, and CJC-1295 in longevity research models.",
    tags: ["Anti-Aging", "Longevity"],
  },
  {
    name: "IGF-1 LR3 Research Protocol",
    compound: "IGF-1 LR3",
    goal: "Muscle Growth",
    duration: "4 weeks",
    description: "Anabolic signaling research using IGF-1 LR3 with detailed reconstitution, dosing, and outcome measurement methodologies.",
    tags: ["Muscle Growth", "Anabolic"],
  },
  {
    name: "TB-500 Wound Healing Study",
    compound: "TB-500",
    goal: "Recovery",
    duration: "6–8 weeks",
    description: "Thymosin Beta-4 analog protocol for musculoskeletal repair research, including tendon and ligament injury models.",
    tags: ["Recovery", "Wound Healing"],
  },
  {
    name: "Nootropic Peptide Protocol",
    compound: "Selank + Epithalon",
    goal: "Brain Health",
    duration: "8 weeks",
    description: "Cognitive enhancement research protocol combining anxiolytic and neuroprotective peptides for neurological studies.",
    tags: ["Brain Health", "Neuroprotection"],
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
          Research Protocols
        </h1>
        <p className="max-w-xl mx-auto text-base leading-relaxed" style={{ color: "#6E6E73" }}>
          Evidence-based research protocols for laboratory use. All protocols are for research purposes only.
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
                <div className="flex items-center gap-1.5 shrink-0">
                  <Clock className="w-3.5 h-3.5" style={{ color: "#9E9EA8" }} />
                  <span className="text-xs" style={{ color: "#9E9EA8" }}>{p.duration}</span>
                </div>
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
                <span className="text-xs px-2.5 py-1" style={{ color: "#9E9EA8" }}>
                  Compound: {p.compound}
                </span>
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
            Need a Custom Protocol?
          </h3>
          <p className="mb-6 text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
            Our expert team can help you design research protocols tailored to your specific compounds and objectives.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-85"
            style={{ background: "#1D1D1F" }}
          >
            Contact Our Experts
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
