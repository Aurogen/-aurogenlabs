import { BookOpen, FlaskConical, Calculator, Video, FileCheck, Shield } from "lucide-react";
import Link from "next/link";

const RESOURCES = [
  {
    icon: BookOpen,
    title: "Peptide Science Library",
    desc: "Artículos científicos, estudios clínicos y revisiones de literatura sobre péptidos de investigación.",
    color: "#4DA3FF",
    href: "#",
  },
  {
    icon: FlaskConical,
    title: "Guías de Reconstitución",
    desc: "Instrucciones detalladas paso a paso para reconstituir cada tipo de péptido liofilizado.",
    color: "#1B6BDE",
    href: "#reconstitution",
  },
  {
    icon: Calculator,
    title: "Calculadora de Dosis",
    desc: "Herramienta interactiva para calcular dosis de investigación basadas en concentración y volumen.",
    color: "#6BB4FF",
    href: "#calculator",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    desc: "Guías en video sobre manejo, almacenamiento y protocolo de reconstitución en laboratorio.",
    color: "#4DA3FF",
    href: "#",
  },
  {
    icon: FileCheck,
    title: "Certificates of Analysis",
    desc: "Accede a los COA (Certificates of Analysis) de cada lote de péptidos disponibles en nuestro catálogo.",
    color: "#1B6BDE",
    href: "#sds",
  },
  {
    icon: Shield,
    title: "Safety Data Sheets",
    desc: "Fichas de seguridad MSDS/SDS para el manejo seguro de cada compuesto en entornos de laboratorio.",
    color: "#6BB4FF",
    href: "#sds",
  },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen" style={{ background: "#020810" }}>
      {/* Header */}
      <div className="relative py-16 px-4 text-center" style={{ background: "linear-gradient(180deg, #0A1628, #020810)", borderBottom: "1px solid rgba(27, 107, 222, 0.15)" }}>
        <p className="text-blue-400 text-xs font-medium tracking-[0.3em] uppercase mb-3">Knowledge base</p>
        <h1 className="text-white text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>RESEARCH CENTER</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Tu hub de recursos científicos para investigación con péptidos. Todo lo que necesitas en un solo lugar.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Resources grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESOURCES.map((r) => (
            <a key={r.title} href={r.href} className="group p-6 rounded-2xl border border-blue-900/20 hover:border-blue-600/30 transition-all" style={{ background: "#0A1628" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: `${r.color}15`, border: `1px solid ${r.color}30` }}>
                <r.icon className="w-6 h-6" style={{ color: r.color }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                {r.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
            </a>
          ))}
        </div>

        {/* Reconstitution guide */}
        <div id="reconstitution" className="p-8 rounded-2xl border border-blue-600/20" style={{ background: "#0A1628" }}>
          <h2 className="text-white text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>GUÍA DE RECONSTITUCIÓN</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { step: "1", title: "Materiales necesarios", desc: "Agua bacteriostática (BAC Water), jeringa de insulina 1mL, aguja 25-27g, alcohol al 70%." },
                { step: "2", title: "Esterilización", desc: "Limpia el tapón del vial con alcohol. Deja secar 10-15 segundos antes de insertar la aguja." },
                { step: "3", title: "Añadir solvente", desc: "Inyecta el agua BAC lentamente por la pared del vial, no directamente al polvo. Usar 1-2mL por vial de 5mg." },
                { step: "4", title: "Mezcla suave", desc: "Gira suavemente el vial. NO agitar. Deja que el polvo se disuelva completamente (1-2 minutos)." },
                { step: "5", title: "Almacenamiento", desc: "Refrigera entre 2-8°C. Una vez reconstituido, usar dentro de 30 días. Proteger de la luz." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-white text-sm" style={{ background: "rgba(27, 107, 222, 0.2)" }}>
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
            <div id="calculator" className="p-6 rounded-xl border border-blue-900/30" style={{ background: "#050D1A" }}>
              <h3 className="text-white font-bold text-xl mb-4" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                CALCULADORA DE RECONSTITUCIÓN
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">CANTIDAD DE PÉPTIDO (mg)</label>
                  <input type="number" defaultValue="5" className="w-full px-4 py-2.5 rounded-lg text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none" style={{ background: "#0A1628" }} />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5 tracking-wide">VOLUMEN DE BAC WATER (mL)</label>
                  <input type="number" defaultValue="2" className="w-full px-4 py-2.5 rounded-lg text-sm text-white border border-blue-900/30 focus:border-blue-500 focus:outline-none" style={{ background: "#0A1628" }} />
                </div>
                <div className="p-4 rounded-lg border border-blue-600/20" style={{ background: "rgba(27, 107, 222, 0.06)" }}>
                  <p className="text-gray-400 text-xs mb-1">Concentración resultante:</p>
                  <p className="text-blue-300 font-bold text-2xl">2.5 mg/mL</p>
                  <p className="text-gray-500 text-xs mt-2">Por cada 0.1mL (10 unidades en jeringa de insulina) = 0.25mg</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-6 rounded-2xl border border-yellow-600/15 text-center" style={{ background: "rgba(161, 130, 0, 0.04)" }}>
          <p className="text-yellow-500/70 text-sm leading-relaxed max-w-3xl mx-auto">
            ⚠️ <strong className="text-yellow-400/80">Disclaimer:</strong> Toda la información en el Research Center de Aurogen Labs está destinada
            exclusivamente a investigadores calificados en entornos de laboratorio controlados. No constituye asesoramiento médico, diagnóstico o tratamiento.
            Los péptidos vendidos no están aprobados por la FDA para uso en humanos.
          </p>
        </div>
      </div>
    </div>
  );
}
