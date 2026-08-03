import { FlaskConical, Award, Users, Globe } from "lucide-react";

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
    <div className="min-h-screen py-16 px-4" style={{ background: "#020810" }}>
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">About Aurogen Labs</span>
          <h1 className="text-5xl font-bold text-white mt-3 mb-5" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
            BUILT FOR SCIENCE
          </h1>
          <p className="text-gray-400 leading-relaxed max-w-xl mx-auto">
            Aurogen Labs was founded with a single mission: to provide the scientific research community with the highest-purity peptides and research compounds available in the United States, backed by full transparency and rigorous quality control.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map((s) => (
            <div key={s.label} className="p-6 rounded-2xl border border-blue-900/20 text-center" style={{ background: "#0A1628" }}>
              <p className="text-3xl font-bold text-blue-400 mb-1" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>{s.value}</p>
              <p className="text-gray-500 text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="mb-16 p-8 rounded-2xl border border-blue-900/20" style={{ background: "#0A1628" }}>
          <h2 className="text-white font-bold text-2xl mb-5" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
            OUR STORY
          </h2>
          <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
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
          <h2 className="text-white font-bold text-2xl mb-6 text-center" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
            OUR VALUES
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl border border-blue-900/20" style={{ background: "#0A1628" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(27,107,222,0.1)" }}>
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-white font-bold text-sm">{title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
