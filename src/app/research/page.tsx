import type { Metadata } from "next";
import { BookOpen, FlaskConical, Video, FileCheck, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Research Center",
  description: "Research resources for peptide scientists: reconstitution guides, safety data sheets, and video protocols. For laboratory use only.",
};

const RESOURCES = [
  { icon: BookOpen, title: "Peptide Science Library", desc: "Peer-reviewed articles, clinical studies, and literature reviews on research peptides.", href: "#" },
  { icon: FlaskConical, title: "Reconstitution Guides", desc: "Step-by-step instructions for reconstituting every lyophilized peptide in our catalog.", href: "#reconstitution" },
  { icon: Video, title: "Video Tutorials", desc: "Lab-grade video guides covering handling, storage, and reconstitution protocols.", href: "#" },
  { icon: FileCheck, title: "Certificates of Analysis", desc: "Access third-party CoAs for every batch — purity, identity, and lot traceability included.", href: "#sds" },
  { icon: Shield, title: "Safety Data Sheets", desc: "MSDS/SDS documents for safe handling of each compound in controlled laboratory environments.", href: "#sds" },
];

const RECON_STEPS = [
  { step: "1", title: "Gather supplies", desc: "Bacteriostatic water (BAC water), 1mL insulin syringe, 25–27g needle, 70% isopropyl alcohol." },
  { step: "2", title: "Sterilize", desc: "Wipe the vial septum with alcohol. Allow to dry 10–15 seconds before inserting the needle." },
  { step: "3", title: "Add solvent", desc: "Inject BAC water slowly along the vial wall — not directly onto the powder. Use 1–2 mL per 5 mg vial." },
  { step: "4", title: "Gentle mixing", desc: "Roll the vial gently between your fingers. Do NOT shake. Allow powder to dissolve fully (1–2 minutes)." },
  { step: "5", title: "Storage", desc: "Refrigerate at 2–8 °C. Once reconstituted, use within 30 days. Keep away from light." },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F6F6F8" }}>
      {/* Header */}
      <div
        className="py-14 px-4 text-center"
        style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      >
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "#6E6E73" }}>
          Knowledge Base
        </p>
        <h1
          className="font-bold mb-4"
          style={{ fontFamily: "var(--font-heading, sans-serif)", fontSize: "clamp(36px, 6vw, 72px)", color: "#1D1D1F" }}
        >
          Research Center
        </h1>
        <p className="max-w-xl mx-auto" style={{ color: "#6E6E73" }}>
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
              className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.18)" }}
              >
                <r.icon className="w-6 h-6" style={{ color: "#6B7A8D" }} />
              </div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>{r.desc}</p>
            </a>
          ))}
        </div>

        {/* Reconstitution guide */}
        <div
          id="reconstitution"
          className="p-8 rounded-2xl"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <h2
            className="text-3xl font-bold mb-6"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Reconstitution Guide
          </h2>
          <div className="space-y-4">
            {RECON_STEPS.map((s) => (
              <div key={s.step} className="flex gap-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm"
                  style={{ background: "rgba(10,132,255,0.1)", color: "#6B7A8D", border: "1px solid rgba(10,132,255,0.2)" }}
                >
                  {s.step}
                </div>
                <div>
                  <p className="font-semibold mb-0.5" style={{ color: "#1D1D1F" }}>{s.title}</p>
                  <p className="text-sm" style={{ color: "#6E6E73" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="p-6 rounded-2xl text-center"
          style={{ background: "rgba(10,132,255,0.04)", border: "1px solid rgba(10,132,255,0.15)" }}
        >
          <p className="text-sm leading-relaxed max-w-3xl mx-auto" style={{ color: "#0A84FF" }}>
            <strong>Disclaimer:</strong> All information in the Aurogen Labs Research Center is intended exclusively for qualified researchers in controlled laboratory environments. It does not constitute medical advice, diagnosis, or treatment. Peptides sold are not FDA-approved for human use.
          </p>
        </div>
      </div>
    </div>
  );
}
