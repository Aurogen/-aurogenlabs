import type { Metadata } from "next";
import Link from "next/link";
import T from "@/components/T";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Quality & Testing",
  description: "Every Aurogen Labs peptide is third-party tested for purity and identity. Learn about our quality standards, CoA process, and manufacturing practices.",
};

const STEPS = [
  { number: "01", title: "US Manufacturing", title_es: "Fabricación en EE. UU.", body_es: "Todos los péptidos se sintetizan en instalaciones de EE. UU. registradas ante la FDA, en condiciones que cumplen con cGMP. Durante toda la producción se mantienen controles ambientales estrictos y registros documentados de cada lote.", body: "All peptides are synthesized in FDA-registered US facilities under cGMP-compliant conditions. Strict environmental controls and documented batch records are maintained throughout production." },
  { number: "02", title: "Identity Verification", title_es: "Verificación de identidad", body_es: "Cada lote se analiza por HPLC-MS (cromatografía líquida de alta resolución acoplada a espectrometría de masas) para confirmar la identidad molecular y la integridad de la secuencia antes de salir de las instalaciones.", body: "Every batch undergoes HPLC-MS (high-performance liquid chromatography–mass spectrometry) to confirm molecular identity and sequence integrity before leaving the facility." },
  { number: "03", title: "Purity Testing", title_es: "Análisis de pureza", body_es: "La HPLC de fase reversa cuantifica la pureza. Exigimos una pureza ≥98% en todos los productos. Los lotes que no alcanzan el umbral se rechazan, sin excepciones.", body: "Reverse-phase HPLC quantifies purity. We require ≥98% purity on all products. Batches that fall below threshold are rejected — no exceptions." },
  { number: "04", title: "Third-Party Certificate", title_es: "Certificado de un laboratorio externo", body_es: "Un laboratorio independiente acreditado por ISO emite un Certificado de Análisis (CoA) para cada lote. Los CoA están disponibles en la página de cada producto y se incluyen con cada pedido.", body: "An independent ISO-accredited laboratory issues a Certificate of Analysis (CoA) for each lot. CoAs are available on every product page and ship with every order." },
];

const SPECS = [
  { label: "Minimum purity", value: "≥98%", label_es: "Pureza mínima" },
  { label: "Testing method", value: "HPLC / HPLC-MS", label_es: "Método de análisis" },
  { label: "Lab accreditation", value: "ISO 17025", label_es: "Acreditación del laboratorio" },
  { label: "Batch traceability", value: "Full lot tracking", label_es: "Trazabilidad de lotes", value_es: "Seguimiento completo por lote" },
  { label: "Cold-chain shipping", value: "Included at no charge", label_es: "Envío con cadena de frío", value_es: "Incluido sin costo" },
  { label: "Lyophilization", value: "Standard on all vials", label_es: "Liofilización", value_es: "Estándar en todos los viales" },
];

export default function QualityPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F5F4F0", color: "#1D1D1F" }}>
      <PageHero
        eyebrow={<T en="Quality Assurance" es="Aseguramiento de calidad" />}
        title={
          <T
            en={<>Every Batch Tested.<br />Every Result Documented.</>}
            es={<>Cada lote, analizado.<br />Cada resultado, documentado.</>}
          />
        }
        subtitle={
          <T
            en={<>We believe you should never have to take our word for it. That&apos;s why every vial ships with a third-party Certificate of Analysis from an ISO 17025-accredited lab.</>}
            es="Creemos que nunca deberías tener que confiar solo en nuestra palabra. Por eso cada vial se envía con un Certificado de Análisis de un laboratorio externo acreditado bajo ISO 17025."
          />
        }
      />

      {/* Process steps */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl font-medium text-center mb-14"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            <T en="Our QA Process" es="Nuestro proceso de control de calidad" />
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {STEPS.map((s) => (
              <div
                key={s.number}
                className="rounded-2xl p-8"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <span
                  className="block text-5xl font-medium mb-4 leading-none"
                  style={{ color: "rgba(22,38,74,0.25)", fontFamily: "var(--font-heading, sans-serif)" }}
                >
                  {s.number}
                </span>
                <h3 className="text-lg font-bold mb-3" style={{ color: "#1D1D1F" }}><T en={s.title} es={s.title_es} /></h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}><T en={s.body} es={s.body_es} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs table */}
      <section
        className="py-16 px-4"
        style={{ borderTop: "1px solid rgba(0,0,0,0.08)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-2xl font-medium text-center mb-10"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            <T en="Quality Specifications" es="Especificaciones de calidad" />
          </h2>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
            {SPECS.map((s, i) => (
              <div
                key={s.label}
                className="flex items-center justify-between px-6 py-4"
                style={{
                  background: i % 2 === 0 ? "#FFFFFF" : "rgba(0,0,0,0.018)",
                  borderBottom: i < SPECS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                }}
              >
                <span className="text-sm" style={{ color: "#6E6E73" }}><T en={s.label} es={s.label_es} /></span>
                <span className="text-sm font-bold" style={{ color: "#6B7A8D" }}>{s.value_es ? <T en={s.value} es={s.value_es} /> : s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CoA callout */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl font-medium mb-4"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            <T en="Certificates of Analysis" es="Certificados de análisis" />
          </h2>
          <p className="text-base mb-8 leading-relaxed" style={{ color: "#6E6E73" }}>
            <T
              en="CoAs are linked on every product page. You can verify batch numbers, purity percentages, and testing dates before you order. A printed copy is included in every shipment."
              es="Los CoA están enlazados en la página de cada producto. Puedes verificar números de lote, porcentajes de pureza y fechas de análisis antes de hacer tu pedido. Cada envío incluye una copia impresa."
            />
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-85"
            style={{ background: "#1D1D1F" }}
          >
            <T en={<>Browse Products &amp; CoAs</>} es="Ver productos y CoA" />
          </Link>
        </div>
      </section>

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
