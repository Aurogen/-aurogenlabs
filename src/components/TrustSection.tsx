import { FlaskConical, ShieldCheck, Microscope, Truck, HeartHandshake } from "lucide-react";

const FEATURES = [
  {
    icon: FlaskConical,
    title: "CoA Every Batch",
    desc: "Third-party Certificate of Analysis included with every shipment — batch number, purity, identity.",
    color: "#C9922A",
  },
  {
    icon: ShieldCheck,
    title: "99%+ Purity",
    desc: "HPLC-verified purity guaranteed across all compounds. Batches below threshold are rejected.",
    color: "#F0B429",
  },
  {
    icon: Microscope,
    title: "Research Grade",
    desc: "Formulated exclusively for scientific research and controlled laboratory studies.",
    color: "#C9922A",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    desc: "Discreet, secure delivery in 2–5 business days anywhere in the continental US.",
    color: "#F0B429",
  },
  {
    icon: HeartHandshake,
    title: "Expert Support",
    desc: "Peptide-specialized team available for technical queries and reconstitution guidance.",
    color: "#D4A03A",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 px-4" style={{ background: "#F6F6F8", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-[0.3em] uppercase mb-3" style={{ color: "#6E6E73" }}>Why researchers choose us</p>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Trust &amp; Transparency
          </h2>
          <p className="max-w-lg mx-auto text-sm" style={{ color: "#6E6E73" }}>
            Our mission is to supply researchers with the purest, most reliable compounds on the market.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${f.color}12`, border: `1px solid ${f.color}30` }}
              >
                <f.icon className="w-6 h-6" style={{ color: f.color }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "100+", label: "Peptides available" },
            { value: "99%+", label: "Guaranteed purity" },
            { value: "2-5", label: "Day US delivery" },
            { value: "24/7", label: "Technical support" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <p
                className="font-bold text-4xl mb-1"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#C9922A" }}
              >
                {stat.value}
              </p>
              <p className="text-sm" style={{ color: "#6E6E73" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
