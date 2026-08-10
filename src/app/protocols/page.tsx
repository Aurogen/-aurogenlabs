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
    duration: "8-12 weeks",
    description: "Detailed reconstitution guide for BPC-157 including solvent ratios, storage, and injection protocols for research models.",
    tags: ["Recovery", "Tissue Repair"],
  },
  {
    name: "Semaglutide Research Protocol",
    compound: "Semaglutide",
    goal: "Fat Loss",
    duration: "16-24 weeks",
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
    duration: "6-8 weeks",
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
    <div className="min-h-screen" style={{ background: "#696969" }}>
      {/* Header */}
      <div className="relative py-16 px-4 text-center" style={{ background: "linear-gradient(180deg, #111111, #000000)", borderBottom: "1px solid rgba(27, 107, 222, 0.15)" }}>
        <p className="text-blue-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">Research library</p>
        <h1 className="text-white text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>PROTOCOLS</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Evidence-based research protocols for laboratory use. All protocols are for research purposes only.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {PROTOCOLS.map((p) => (
            <div
              key={p.name}
              className="group p-6 rounded-2xl border border-blue-900/20 hover:border-blue-600/30 transition-all cursor-pointer"
              style={{ background: "#111111" }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(27, 107, 222, 0.1)" }}>
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-500 text-xs">{p.duration}</span>
                </div>
              </div>

              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                {p.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded text-xs" style={{ background: "rgba(27, 107, 222, 0.08)", color: "#8EB4D4", border: "1px solid rgba(27, 107, 222, 0.15)" }}>
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-gray-600 px-2.5 py-1">Compound: {p.compound}</span>
              </div>

              <div className="flex items-center justify-between">
                <button className="flex items-center gap-1.5 text-blue-400 text-sm font-medium hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center p-10 rounded-2xl border border-blue-600/15" style={{ background: "rgba(27, 107, 222, 0.03)" }}>
          <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>Need a Custom Protocol?</h3>
          <p className="text-gray-500 mb-5">Our expert team can help you design research protocols tailored to your specific compounds and objectives.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #1B6BDE, #2B7FEF)" }}>
            Contact Our Experts
          </Link>
        </div>
      </div>
    </div>
  );
}
