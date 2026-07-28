import { FlaskConical, ShieldCheck, Award, Microscope, Truck, HeartHandshake } from "lucide-react";

const FEATURES = [
  {
    icon: FlaskConical,
    title: "COA en Cada Lote",
    desc: "Certificate of Analysis verificado por laboratorio independiente con cada envío.",
    color: "#1B6BDE",
  },
  {
    icon: ShieldCheck,
    title: "Pureza 99%+",
    desc: "Pureza verificada por HPLC garantizada en todos nuestros compuestos.",
    color: "#4DA3FF",
  },
  {
    icon: Award,
    title: "Made in USA",
    desc: "Producción en instalaciones certificadas bajo los más altos estándares de calidad.",
    color: "#6BB4FF",
  },
  {
    icon: Microscope,
    title: "Research Grade",
    desc: "Formulados exclusivamente para investigación científica y estudios de laboratorio.",
    color: "#1B6BDE",
  },
  {
    icon: Truck,
    title: "Envío Rápido",
    desc: "Entregas discretas y seguras en 2-5 días hábiles dentro de EE.UU.",
    color: "#4DA3FF",
  },
  {
    icon: HeartHandshake,
    title: "Soporte Experto",
    desc: "Equipo especializado en péptidos disponible para consultas técnicas y protocolos.",
    color: "#6BB4FF",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 px-4" style={{ background: "#050D1A" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-blue-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">Why researchers choose us</p>
          <h2
            className="text-white text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading, sans-serif)" }}
          >
            CONFIANZA Y TRANSPARENCIA
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Nuestra misión es proveer a investigadores con los compuestos más puros y confiables del mercado
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl border border-blue-900/20 hover:border-blue-600/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(27,107,222,0.1)]"
              style={{ background: "#0A1628" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}
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
            { value: "100+", label: "Péptidos disponibles" },
            { value: "99%+", label: "Pureza garantizada" },
            { value: "2-5", label: "Días de entrega USA" },
            { value: "24/7", label: "Soporte técnico" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl border border-blue-600/15"
              style={{ background: "rgba(27, 107, 222, 0.04)" }}
            >
              <p
                className="text-blue-400 font-bold text-4xl mb-1"
                style={{ fontFamily: "var(--font-heading, sans-serif)" }}
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
