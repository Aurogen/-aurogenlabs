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
    <section className="py-20 px-4" style={{ background: "#5C5C5C" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>Why researchers choose us</p>
          <h2
            className="text-white text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading, sans-serif)" }}
          >
            TRUST &amp; TRANSPARENCY
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Our mission is to supply researchers with the purest, most reliable compounds on the market.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
              style={{ background: "#1C1C1E", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${f.color}12`, border: `1px solid ${f.color}30` }}
              >
                <f.icon className="w-6 h-6" style={{ color: f.color }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
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
              style={{ background: "#1C1C1E", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p
                className="font-bold text-4xl mb-1"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#C9922A" }}
              >
                {stat.value}
              </p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
