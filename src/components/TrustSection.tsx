import { FlaskConical, ShieldCheck, Microscope, Truck, HeartHandshake } from "lucide-react";

const FEATURES = [
  {
    icon: FlaskConical,
    title: "CoA Every Batch",
    desc: "Third-party Certificate of Analysis included with every shipment — batch number, purity, identity.",
  },
  {
    icon: ShieldCheck,
    title: "99%+ Purity",
    desc: "HPLC-verified purity guaranteed across all compounds. Batches below threshold are rejected.",
  },
  {
    icon: Microscope,
    title: "Research Grade",
    desc: "Formulated exclusively for scientific research and controlled laboratory studies.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    desc: "Discreet, secure delivery in 2–5 business days anywhere in the continental US.",
  },
  {
    icon: HeartHandshake,
    title: "Expert Support",
    desc: "Peptide-specialized team available for technical queries and reconstitution guidance.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-24 px-4" style={{ background: "#F4F3EF", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span style={{ display: "block", width: 24, height: 1, background: "#B8975A" }} />
            <p className="text-[10px] font-semibold tracking-[0.38em] uppercase" style={{ color: "#9E9EA8" }}>
              Why researchers choose us
            </p>
            <span style={{ display: "block", width: 24, height: 1, background: "#B8975A" }} />
          </div>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-heading, sans-serif)",
              color: "#111111",
              fontSize: "clamp(36px, 4.5vw, 58px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Trust &amp; Transparency
          </h2>
          <p className="max-w-lg mx-auto text-sm" style={{ color: "#6B6B6B" }}>
            Our mission is to supply researchers with the purest, most reliable compounds on the market.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.07)]"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)" }}
              >
                <f.icon className="w-5 h-5" style={{ color: "#111111" }} />
              </div>
              <h3 className="font-bold text-base mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#111111" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B6B6B" }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "100+", label: "Peptides available" },
            { value: "99%+", label: "Guaranteed purity" },
            { value: "2–5", label: "Day US delivery" },
            { value: "24/7", label: "Technical support" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center py-8 px-6 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <p
                className="font-bold mb-1"
                style={{
                  fontFamily: "var(--font-heading, sans-serif)",
                  color: "#111111",
                  fontSize: "clamp(32px, 4vw, 44px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </p>
              <p className="text-xs tracking-wide uppercase" style={{ color: "#9E9EA8", letterSpacing: "0.08em" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
