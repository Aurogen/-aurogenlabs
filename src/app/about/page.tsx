import type { Metadata } from "next";
import { FlaskConical, Award, Users, Globe } from "lucide-react";
import T from "@/components/T";

export const metadata: Metadata = {
  title: "About Us",
  description: "Aurogen Labs is a US-based research peptide company committed to ≥98% purity, full COA transparency, and serving the scientific research community.",
};

const STATS = [
  { value: "≥98%", label: "Minimum Purity", label_es: "Pureza mínima" },
  { value: "100%", label: "Lots with COA", label_es: "Lotes con COA" },
  { value: "12k+", label: "Researchers Served", label_es: "Investigadores atendidos" },
  { value: "US", value_es: "EE. UU.", label: "Manufactured", label_es: "Fabricado" },
];

const VALUES = [
  {
    icon: FlaskConical,
    title: "Scientific Integrity",
    title_es: "Integridad científica",
    desc: "Every compound we produce undergoes rigorous third-party testing. We publish full COAs so researchers can verify exactly what they're working with.",
    desc_es: "Cada compuesto que producimos pasa por rigurosas pruebas de laboratorios externos. Publicamos los COA (certificados de análisis) completos para que los investigadores puedan verificar exactamente con qué están trabajando.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    title_es: "Calidad sin concesiones",
    desc: "Our synthesis protocols follow GMP-adjacent standards. We reject any batch that does not meet our ≥98% purity threshold — no exceptions.",
    desc_es: "Nuestros protocolos de síntesis siguen estándares cercanos a GMP. Rechazamos cualquier lote que no alcance nuestro umbral de pureza ≥98%, sin excepciones.",
  },
  {
    icon: Users,
    title: "Researcher-First",
    title_es: "El investigador primero",
    desc: "We built Aurogen Labs for the scientific community. From batch-level COAs to our laboratory handling guides, every feature is designed for real researchers.",
    desc_es: "Creamos Aurogen Labs para la comunidad científica. Desde los COA por lote hasta nuestras guías de manejo en laboratorio, cada función está pensada para investigadores reales.",
  },
  {
    icon: Globe,
    title: "US-Based Operations",
    title_es: "Operaciones en EE. UU.",
    desc: "Synthesized, tested, and shipped entirely from our US facility. No overseas sourcing, no gray-market supply chains — just transparent, domestic production.",
    desc_es: "Sintetizados, analizados y enviados íntegramente desde nuestras instalaciones en EE. UU. Sin abastecimiento en el extranjero ni cadenas de suministro del mercado gris: solo producción nacional y transparente.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#F6F6F8" }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "#6E6E73" }}>
            <T en="About Aurogen Labs" es="Sobre Aurogen Labs" />
          </p>
          <h1
            className="text-5xl font-bold mb-5"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            <T en="Built for Science" es="Hecho para la ciencia" />
          </h1>
          <p className="leading-relaxed max-w-xl mx-auto" style={{ color: "#6E6E73" }}>
            <T
              en="Aurogen Labs was founded with a single mission: to provide the scientific research community with the highest-purity peptides and research compounds available in the United States, backed by full transparency and rigorous quality control."
              es="Aurogen Labs nació con una sola misión: ofrecer a la comunidad de investigación científica los péptidos y compuestos de investigación de mayor pureza disponibles en Estados Unidos, respaldados por total transparencia y un riguroso control de calidad."
            />
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
                {s.value_es ? <T en={s.value} es={s.value_es} /> : s.value}
              </p>
              <p className="text-xs" style={{ color: "#6E6E73" }}><T en={s.label} es={s.label_es} /></p>
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
            <T en="Our Story" es="Nuestra historia" />
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
            <T
              en={<>
                <p>
                  Aurogen Labs was born out of frustration with the status quo in the research peptide market — inconsistent quality, opaque sourcing, and a lack of resources for researchers trying to do serious scientific work.
                </p>
                <p>
                  We invested in US-based synthesis infrastructure, established relationships with independent testing laboratories, and built a platform that puts the researcher&apos;s needs first: full COAs on every batch, laboratory handling guides, and a catalog organized by compound class.
                </p>
                <p>
                  Today, Aurogen Labs serves thousands of researchers, laboratories, and institutions across the United States. Our commitment to purity, transparency, and scientific integrity remains unchanged.
                </p>
              </>}
              es={<>
                <p>
                  Aurogen Labs nació de la frustración con el statu quo del mercado de péptidos de investigación: calidad inconsistente, abastecimiento poco claro y falta de recursos para los investigadores que intentan hacer un trabajo científico serio.
                </p>
                <p>
                  Invertimos en infraestructura de síntesis en EE. UU., establecimos relaciones con laboratorios de análisis independientes y creamos una plataforma que pone primero las necesidades del investigador: COA completos en cada lote, guías de manejo en laboratorio y un catálogo organizado por clase de compuesto.
                </p>
                <p>
                  Hoy, Aurogen Labs atiende a miles de investigadores, laboratorios e instituciones en todo Estados Unidos. Nuestro compromiso con la pureza, la transparencia y la integridad científica sigue intacto.
                </p>
              </>}
            />
          </div>
        </div>

        {/* Values */}
        <div>
          <h2
            className="font-bold text-2xl mb-6 text-center"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            <T en="Our Values" es="Nuestros valores" />
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, title_es, desc, desc_es }) => (
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
                  <h3 className="font-bold text-sm" style={{ color: "#1D1D1F" }}><T en={title} es={title_es} /></h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}><T en={desc} es={desc_es} /></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
