import type { Metadata } from "next";
import { FlaskConical, Award, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Aurogen Labs is a US-based research peptide company committed to 99%+ purity, full COA transparency, and serving the scientific research community.",
};

const STATS = [
  { value: "99%+", label: "Purity Guaranteed" },
  { value: "100+", label: "Active Compounds" },
  { value: "12k+", label: "Researchers Served" },
  { value: "US", label: "Manufactured" },
];

const VALUES = [
  {
    icon: FlaskConical,
    title: "Scientific Integrity",
    desc: "Every compound we produce undergoes rigorous third-party testing. We publish full COAs so researchers can verify exactly what they're working with.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    desc: "Our synthesis protocols follow GMP-adjacent standards. We reject any batch that does not meet our 99%+ purity threshold — no exceptions.",
  },
  {
    icon: Users,
    title: "Researcher-First",
    desc: "We built Aurogen Labs for the scientific community. From our interactive dosing tools to our protocol library, every feature is designed for real researchers.",
  },
  {
    icon: Globe,
    title: "US-Based Operations",
    desc: "Synthesized, tested, and shipped entirely from our US facility. No overseas sourcing, no gray-market supply chains — just transparent, domestic production.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#F6F6F8" }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "#6E6E73" }}>
            About Aurogen Labs
          </p>
          <h1
            className="text-5xl font-bold mb-5"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Built for Science
          </h1>
          <p className="leading-relaxed max-w-xl mx-auto" style={{ color: "#6E6E73" }}>
            Aurogen Labs was founded with a single mission: to provide the scientific research community with the highest-purity peptides and research compounds available in the United States, backed by full transparency and rigorous quality control.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl text-center"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <p
                className="text-3xl font-bold mb-1"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#6B7A8D" }}
              >
                {s.value}
              </p>
              <p className="text-xs" style={{ color: "#6E6E73" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div
          className="mb-16 p-8 rounded-2xl"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <h2
            className="font-bold text-2xl mb-5"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Our Story
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
            <p>
              Aurogen Labs was born out of frustration with the status quo in the research peptide market — inconsistent quality, opaque sourcing, and a lack of resources for researchers trying to do serious scientific work.
            </p>
            <p>
              We invested in US-based synthesis infrastructure, established relationships with independent testing laboratories, and built a platform that puts the researcher&apos;s needs first: full COAs on every batch, interactive dosing tools, detailed protocols, and a catalog curated around real research applications.
            </p>
            <p>
              Today, Aurogen Labs serves thousands of researchers, laboratories, and institutions across the United States. Our commitment to purity, transparency, and scientific integrity remains unchanged.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2
            className="font-bold text-2xl mb-6 text-center"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.18)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "#6B7A8D" }} />
                  </div>
                  <h3 className="font-bold text-sm" style={{ color: "#1D1D1F" }}>{title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
