import type { Metadata } from "next";
import { FileText } from "lucide-react";
import Link from "next/link";
import T from "@/components/T";

export const metadata: Metadata = {
  title: "Laboratory Protocols",
  description: "Laboratory handling guides for research peptides: reconstitution, storage and stability, COA interpretation, HPLC verification and concentration calculations. For in-vitro research use only.",
};

const PROTOCOLS = [
  {
    name: "Peptide Reconstitution Guide",
    name_es: "Guía de reconstitución de péptidos",
    format: "Lab guide",
    format_es: "Guía de laboratorio",
    description_es: "Procedimiento de laboratorio para reconstituir péptidos liofilizados: selección del solvente, cálculo del volumen, manejo aséptico y etiquetado de viales.",
    description: "Laboratory procedure for reconstituting lyophilized peptides: solvent selection, volume calculation, aseptic handling and vial labeling.",
    tags: ["Reconstitution", "Lab Handling"],
    tags_es: ["Reconstitución", "Manejo en laboratorio"],
  },
  {
    name: "Storage & Stability Guidelines",
    name_es: "Pautas de almacenamiento y estabilidad",
    format: "Reference",
    format_es: "Referencia",
    description_es: "Temperaturas recomendadas para material liofilizado y reconstituido, protección contra la luz, límites de congelación y descongelación y consideraciones sobre la vida útil.",
    description: "Recommended temperatures for lyophilized and reconstituted material, light protection, freeze-thaw limits and shelf-life considerations.",
    tags: ["Storage", "Stability"],
    tags_es: ["Almacenamiento", "Estabilidad"],
  },
  {
    name: "Reading a Certificate of Analysis",
    name_es: "Cómo leer un certificado de análisis",
    format: "Reference",
    format_es: "Referencia",
    description_es: "Cómo interpretar cromatogramas de HPLC, datos de identidad por espectrometría de masas, cálculos de pureza y trazabilidad del lote en el COA de un lote.",
    description: "How to interpret HPLC chromatograms, mass spectrometry identity data, purity calculations and lot traceability on a batch COA.",
    tags: ["QC", "Documentation"],
    tags_es: ["Control de calidad", "Documentación"],
  },
  {
    name: "HPLC Purity Verification",
    name_es: "Verificación de pureza por HPLC",
    format: "Method",
    format_es: "Método",
    description_es: "Método general de HPLC de fase reversa para reproducir de forma independiente, en tu propio laboratorio, la verificación de identidad y pureza de reactivos peptídicos.",
    description: "General reverse-phase HPLC method for independently reproducing identity and purity verification of peptide reagents in your own lab.",
    tags: ["Analytical", "HPLC"],
    tags_es: ["Analítico", "HPLC"],
  },
  {
    name: "Concentration & Dilution Calculations",
    name_es: "Cálculos de concentración y dilución",
    format: "Worksheet",
    format_es: "Hoja de trabajo",
    description_es: "Ejemplos resueltos para calcular concentraciones de soluciones madre (mg/mL, molaridad) y preparar diluciones seriadas para ensayos in vitro.",
    description: "Worked examples for calculating stock concentrations (mg/mL, molarity) and preparing serial dilutions for in-vitro assays.",
    tags: ["Calculations", "In-Vitro"],
    tags_es: ["Cálculos", "In vitro"],
  },
  {
    name: "Laboratory Safety & Disposal",
    name_es: "Seguridad y eliminación de residuos en el laboratorio",
    format: "Reference",
    format_es: "Referencia",
    description_es: "Equipo de protección personal, respuesta ante derrames y procedimientos de eliminación de reactivos químicos de investigación.",
    description: "Personal protective equipment, spill response and disposal procedures for chemical research reagents.",
    tags: ["Safety", "Compliance"],
    tags_es: ["Seguridad", "Cumplimiento normativo"],
  },
];

export default function ProtocolsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F6F6F8", color: "#1D1D1F" }}>
      {/* Header */}
      <div
        className="py-16 px-4 text-center"
        style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      >
        <p className="text-xs font-bold tracking-[0.25em] mb-3" style={{ color: "#6E6E73" }}>
          <T en="Research Library" es="Biblioteca de investigación" />
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
        >
          <T en="Laboratory Protocols" es="Protocolos de laboratorio" />
        </h1>
        <p className="max-w-xl mx-auto text-base leading-relaxed" style={{ color: "#6E6E73" }}>
          <T
            en="Handling, storage and analytical guides for in-vitro laboratory work. For research use only."
            es="Guías de manejo, almacenamiento y análisis para el trabajo de laboratorio in vitro. Solo para uso en investigación."
          />
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {PROTOCOLS.map((p) => (
            <div
              key={p.name}
              className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.18)" }}
                >
                  <FileText className="w-5 h-5" style={{ color: "#6B7A8D" }} />
                </div>
                <span className="text-xs shrink-0" style={{ color: "#9E9EA8" }}><T en={p.format} es={p.format_es} /></span>
              </div>

              <h3
                className="font-bold text-lg mb-2"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                <T en={p.name} es={p.name_es} />
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#6E6E73" }}><T en={p.description} es={p.description_es} /></p>

              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded text-xs font-medium"
                    style={{ background: "rgba(10,132,255,0.06)", color: "#0A84FF", border: "1px solid rgba(10,132,255,0.15)" }}
                  >
                    <T en={tag} es={p.tags_es[i]} />
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-12 text-center p-10 rounded-2xl"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <h3
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            <T en="Need Technical Documentation?" es="¿Necesitas documentación técnica?" />
          </h3>
          <p className="mb-6 text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
            <T
              en="Our team can provide Certificates of Analysis, Safety Data Sheets and analytical data for any compound in our catalog."
              es="Nuestro equipo puede proporcionarte certificados de análisis, hojas de datos de seguridad y datos analíticos de cualquier compuesto de nuestro catálogo."
            />
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-85"
            style={{ background: "#1D1D1F" }}
          >
            <T en="Contact Support" es="Contactar a soporte" />
          </Link>
        </div>
      </div>

      {/* Footer note */}
      <div className="py-8 px-4 text-center" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <p className="text-xs" style={{ color: "#9E9EA8" }}>
          <T
            en="Aurogen Labs products are intended for laboratory research use only. Not for human or veterinary use."
            es="Los productos de Aurogen Labs están destinados únicamente a la investigación en laboratorio. No son para uso humano ni veterinario."
          />
        </p>
      </div>
    </div>
  );
}
