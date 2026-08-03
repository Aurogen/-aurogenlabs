import type { Metadata } from "next";
import { BookOpen, FlaskConical, Calculator, Video, FileCheck, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Research Center",
  description:
    "Research resources for peptide scientists: reconstitution guides, dosing calculators, safety data sheets, and video protocols. For laboratory use only.",
};

const RESOURCES = [
  {
    icon: BookOpen,
    title: "Peptide Science Library",
    desc: "Peer-reviewed articles, clinical studies, and literature reviews on research peptides.",
    color: "#4DA3FF",
    href: "#",
  },
  {
    icon: FlaskConical,
    title: "Reconstitution Guides",
    desc: "Step-by-step instructions for reconstituting every lyophilized peptide in our catalog.",
    color: "#1B6BDE",
    href: "#reconstitution",
  },
  {
    icon: Calculator,
    title: "Dosing Calculator",
    desc: "Interactive tool for calculating research doses based on concentration and volume.",
    color: "#6BB4FF",
    href: "#calculator",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    desc: "Lab-grade video guides covering handling, storage, and reconstitution protocols.",
    color: "#4DA3FF",
    href: "#",
  },
  {
    icon: FileCheck,
    title: "Certificates of Analysis",
    desc: "Access third-party CoAs for every batch — purity, identity, and lot traceability included.",
    color: "#1B6BDE",
    href: "#sds",
  },
  {
    icon: Shield,
    title: "Safety Data Sheets",
    desc: "MSDS/SDS documents for safe handling of each compound in controlled laboratory environments.",
    color: "#6BB4FF",
    href: "#sds",
  },
];

const RECON_STEPS = [
  {
    step: "1",
    title: "Gather supplies",
    desc: "Bacteriostatic water (BAC water), 1mL insulin syringe, 25–27g needle, 70% isopropyl alcohol.",
  },
  {
    step: "2",
    title: "Sterilize",
    desc: "Wipe the vial septum with alcohol. Allow to dry 10–15 seconds before inserting the needle.",
  },
  {
    step: "3",
    title: "Add solvent",
    desc: "Inject BAC water slowly along the vial wall — not directly onto the powder. Use 1–2 mL per 5 mg vial.",
  },
  {
    step: "4",
    title: "Gentle mixing",
    desc: "Roll the vial gently between your fingers. Do NOT shake. Allow powder to dissolve fully (1–2 minutes).",
  },
  {
    step: "5",
    title: "Storage",
    desc: "Refrigerate at 2–8 °C. Once reconstituted, use within 30 days. Keep away from light.",
  },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen" style={{ background: "#020810" }}>
      {/* Header */}
      <div
        className="relative py-16 px-4 text-center border-b"
        style={{
          background: "linear-gradient(180deg, #0A1628, #020810)",
          borderColor: "rgba(27, 107, 222, 0.15)",
        }}
      >
        <p className="text-blue-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">
          Knowledge Base
        </p>
        <h1
          className="text-white text-5xl lg:text-6xl font-bold mb-4"
          style={{ fontFamily: "var(--font-heading, sans-serif)" }}
        >
          RESEARCH CENTER
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Your scientific hub for peptide research — guides, calculators, CoAs, and protocols in one place.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Resources grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESOURCES.map((r) => (
            <a
              key={r.title}
              href={r.href}
              className="group p-6 rounded-2xl border border-blue-900/20 hover:border-blue-600/30 transition-all"
              style={{ background: "#0A1628" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ background: `${r.color}15`, border: `1px solid ${r.color}30` }}
              >
                <r.icon className="w-6 h-6" style={{ color: r.color }} />
              </div>
              <h3
                className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors"
                style={{ fontFamily: "var(--font-heading, sans-serif)" }}
              >
                {r.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
            </a>
          ))}
        </div>

        {/* Reconstitution guide */}
        <div
          id="reconstitution"
          className="p-8 rounded-2xl border border-blue-600/20"
          style={{ background: "#0A1628" }}
        >
          <h2
            className="text-white text-3xl font-bold mb-6"
            style={{ fontFamily: "var(--font-heading, sans-serif)" }}
          >
            RECONSTITUTION GUIDE
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {RECON_STEPS.map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-white text-sm"
                    style={{ background: "rgba(27, 107, 222, 0.2)" }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-0.5">{s.title}</p>
                    <p className="text-gray-500 text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculator */}
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
                    defaultValue="5"
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
                    defaultValue="2"
                    className="w-full px-4 py-2.5 rounded-lg text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none"
                    style={{ background: "#0A1628" }}
                  />
                </div>
                <div
                  className="p-4 rounded-lg border border-blue-600/20"
                  style={{ background: "rgba(27, 107, 222, 0.06)" }}
                >
                  <p className="text-gray-400 text-xs mb-1">Resulting concentration:</p>
                  <p className="text-blue-300 font-bold text-2xl">2.5 mg/mL</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Each 0.1 mL (10 units on an insulin syringe) = 0.25 mg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="p-6 rounded-2xl border border-yellow-600/15 text-center"
          style={{ background: "rgba(161, 130, 0, 0.04)" }}
        >
          <p className="text-yellow-500/70 text-sm leading-relaxed max-w-3xl mx-auto">
            ⚠️{" "}
            <strong className="text-yellow-400/80">Disclaimer:</strong> All information in the
            Aurogen Labs Research Center is intended exclusively for qualified researchers in
            controlled laboratory environments. It does not constitute medical advice, diagnosis, or
            treatment. Peptides sold are not FDA-approved for human use.
          </p>
        </div>
      </div>
    </div>
  );
}
