import type { Metadata } from "next";
import { FlaskConical, FileCheck } from "lucide-react";
import T from "@/components/T";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Research Center",
  description: "Research resources for peptide scientists: reconstitution guides and certificates of analysis. For laboratory use only.",
};

const RESOURCES = [
  { icon: FlaskConical, title: "Reconstitution Guides", title_es: "Guías de reconstitución", desc_es: "Instrucciones paso a paso para reconstituir cada péptido liofilizado de nuestro catálogo.", desc: "Step-by-step instructions for reconstituting every lyophilized peptide in our catalog.", href: "#reconstitution" },
  { icon: FileCheck, title: "Certificates of Analysis", title_es: "Certificados de análisis", desc_es: "Accede a los CoA de laboratorios externos de cada lote, con pureza, identidad y trazabilidad del lote incluidas.", desc: "Access third-party CoAs for every batch — purity, identity, and lot traceability included.", href: "/quality" },
];

const RECON_STEPS = [
  { step: "1", title: "Gather supplies", title_es: "Reúne los materiales", desc_es: "Agua bacteriostática (agua BAC), jeringa de insulina de 1 mL, aguja de 25–27 G, alcohol isopropílico al 70%.", desc: "Bacteriostatic water (BAC water), 1mL insulin syringe, 25–27g needle, 70% isopropyl alcohol." },
  { step: "2", title: "Sterilize", title_es: "Esteriliza", desc_es: "Limpia el septo del vial con alcohol. Deja secar de 10 a 15 segundos antes de insertar la aguja.", desc: "Wipe the vial septum with alcohol. Allow to dry 10–15 seconds before inserting the needle." },
  { step: "3", title: "Add solvent", title_es: "Agrega el solvente", desc_es: "Agrega el agua BAC lentamente por la pared del vial, no directamente sobre el polvo. Usa 1–2 mL por cada vial de 5 mg.", desc: "Add BAC water slowly along the vial wall — not directly onto the powder. Use 1–2 mL per 5 mg vial." },
  { step: "4", title: "Gentle mixing", title_es: "Mezcla suavemente", desc_es: "Haz rodar el vial suavemente entre los dedos. NO lo agites. Deja que el polvo se disuelva por completo (1–2 minutos).", desc: "Roll the vial gently between your fingers. Do NOT shake. Allow powder to dissolve fully (1–2 minutes)." },
  { step: "5", title: "Storage", title_es: "Almacenamiento", desc_es: "Refrigera a 2–8 °C. Una vez reconstituido, úsalo dentro de los 30 días. Mantenlo protegido de la luz.", desc: "Refrigerate at 2–8 °C. Once reconstituted, use within 30 days. Keep away from light." },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F5F4F0" }}>
      <PageHero
        eyebrow={<T en="Knowledge Base" es="Base de conocimiento" />}
        title={<T en="Research Center" es="Centro de Investigación" />}
        subtitle={
          <T
            en="Your scientific hub for peptide research — guides, CoAs, and protocols in one place."
            es="Tu centro científico para la investigación con péptidos: guías, CoA y protocolos en un solo lugar."
          />
        }
      />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Resources grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {RESOURCES.map((r) => (
            <a
              key={r.title}
              href={r.href}
              className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(22,38,74,0.08)", border: "1px solid rgba(22,38,74,0.18)" }}
              >
                <r.icon className="w-6 h-6" style={{ color: "#6B7A8D" }} />
              </div>
              <h3
                className="font-medium text-lg mb-2"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                <T en={r.title} es={r.title_es} />
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}><T en={r.desc} es={r.desc_es} /></p>
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
            className="text-3xl font-medium mb-6"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            <T en="Reconstitution Guide" es="Guía de reconstitución" />
          </h2>
          <div className="space-y-4">
            {RECON_STEPS.map((s) => (
              <div key={s.step} className="flex gap-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm"
                  style={{ background: "rgba(22,38,74,0.1)", color: "#6B7A8D", border: "1px solid rgba(22,38,74,0.2)" }}
                >
                  {s.step}
                </div>
                <div>
                  <p className="font-semibold mb-0.5" style={{ color: "#1D1D1F" }}><T en={s.title} es={s.title_es} /></p>
                  <p className="text-sm" style={{ color: "#6E6E73" }}><T en={s.desc} es={s.desc_es} /></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="p-6 rounded-2xl text-center"
          style={{ background: "rgba(22,38,74,0.04)", border: "1px solid rgba(22,38,74,0.15)" }}
        >
          <p className="text-sm leading-relaxed max-w-3xl mx-auto" style={{ color: "#16264A" }}>
            <T
              en={<><strong>Disclaimer:</strong> All information in the Aurogen Labs Research Center is intended exclusively for qualified researchers in controlled laboratory environments. It does not constitute medical advice, diagnosis, or treatment. Peptides sold are not FDA-approved for human use.</>}
              es={<><strong>Aviso legal:</strong> Toda la información del Centro de Investigación de Aurogen Labs está dirigida exclusivamente a investigadores calificados en entornos de laboratorio controlados. No constituye consejo, diagnóstico ni tratamiento médico. Los péptidos que vendemos no están aprobados por la FDA para uso humano.</>}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
