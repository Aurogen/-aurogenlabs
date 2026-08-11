import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quality & Testing",
  description: "Every Aurogen Labs peptide is third-party tested for purity and identity. Learn about our quality standards, CoA process, and manufacturing practices.",
};

const STEPS = [
  { number: "01", title: "US Manufacturing", body: "All peptides are synthesized in FDA-registered US facilities under cGMP-compliant conditions. Strict environmental controls and documented batch records are maintained throughout production." },
  { number: "02", title: "Identity Verification", body: "Every batch undergoes HPLC-MS (high-performance liquid chromatography–mass spectrometry) to confirm molecular identity and sequence integrity before leaving the facility." },
  { number: "03", title: "Purity Testing", body: "Reverse-phase HPLC quantifies purity. We require ≥98% purity on all products. Batches that fall below threshold are rejected — no exceptions." },
  { number: "04", title: "Third-Party Certificate", body: "An independent ISO-accredited laboratory issues a Certificate of Analysis (CoA) for each lot. CoAs are available on every product page and ship with every order." },
];

const SPECS = [
  { label: "Minimum purity", value: "≥98%" },
  { label: "Testing method", value: "HPLC / HPLC-MS" },
  { label: "Lab accreditation", value: "ISO 17025" },
  { label: "Batch traceability", value: "Full lot tracking" },
  { label: "Cold-chain shipping", value: "Included at no charge" },
  { label: "Lyophilization", value: "Standard on all vials" },
];

export default function QualityPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F6F6F8", color: "#1D1D1F" }}>
      {/* Header */}
      <section
        className="py-24 px-4 text-center"
        style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.25em] mb-4" style={{ color: "#6E6E73" }}>
            Quality Assurance
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Every Batch Tested.<br />Every Result Documented.
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#6E6E73" }}>
            We believe you should never have to take our word for it. That&apos;s why every vial ships with a third-party Certificate of Analysis from an ISO 17025-accredited lab.
          </p>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-14"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Our QA Process
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {STEPS.map((s) => (
              <div
                key={s.number}
                className="rounded-2xl p-8"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <span
                  className="block text-5xl font-bold mb-4 leading-none"
                  style={{ color: "rgba(201,146,42,0.25)", fontFamily: "var(--font-heading, sans-serif)" }}
                >
                  {s.number}
                </span>
                <h3 className="text-lg font-bold mb-3" style={{ color: "#1D1D1F" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>{s.body}</p>
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
            className="text-2xl font-bold text-center mb-10"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Quality Specifications
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
                <span className="text-sm" style={{ color: "#6E6E73" }}>{s.label}</span>
                <span className="text-sm font-bold" style={{ color: "#6B7A8D" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CoA callout */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Certificates of Analysis
          </h2>
          <p className="text-base mb-8 leading-relaxed" style={{ color: "#6E6E73" }}>
            CoAs are linked on every product page. You can verify batch numbers, purity percentages, and testing dates before you order. A printed copy is included in every shipment.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-85"
            style={{ background: "#1D1D1F" }}
          >
            Browse Products &amp; CoAs
          </Link>
        </div>
      </section>

      {/* Footer note */}
      <div className="py-8 px-4 text-center" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <p className="text-xs" style={{ color: "#9E9EA8" }}>
          Aurogen Labs products are intended for laboratory research use only. Not for human or veterinary use.
        </p>
      </div>
    </div>
  );
}
