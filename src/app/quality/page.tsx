import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quality & Testing",
  description:
    "Every Aurogen Labs peptide is third-party tested for purity and identity. Learn about our quality standards, CoA process, and manufacturing practices.",
};

const STEPS = [
  {
    number: "01",
    title: "US Manufacturing",
    body:
      "All peptides are synthesized in FDA-registered US facilities under cGMP-compliant conditions. Strict environmental controls and documented batch records are maintained throughout production.",
  },
  {
    number: "02",
    title: "Identity Verification",
    body:
      "Every batch undergoes HPLC-MS (high-performance liquid chromatography–mass spectrometry) to confirm molecular identity and sequence integrity before leaving the facility.",
  },
  {
    number: "03",
    title: "Purity Testing",
    body:
      "Reverse-phase HPLC quantifies purity. We require ≥98% purity on all products. Batches that fall below threshold are rejected—no exceptions.",
  },
  {
    number: "04",
    title: "Third-Party Certificate",
    body:
      "An independent ISO-accredited laboratory issues a Certificate of Analysis (CoA) for each lot. CoAs are available on every product page and ship with every order.",
  },
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
    <div className="min-h-screen" style={{ background: "#000000", color: "#E8EDF5" }}>
      {/* Hero */}
      <section
        className="relative py-24 px-4 text-center border-b"
        style={{
          background: "linear-gradient(180deg, #111111 0%, #000000 100%)",
          borderColor: "rgba(27, 107, 222, 0.15)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs font-bold tracking-[0.25em] mb-4"
            style={{ color: "#4DA3FF" }}
          >
            QUALITY ASSURANCE
          </p>
          <h1
            className="text-4xl md:text-5xl font-black tracking-tight mb-6"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #4DA3FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Every Batch Tested.<br />Every Result Documented.
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#A0B4CC" }}>
            We believe you should never have to take our word for it. That&apos;s why every vial
            ships with a third-party Certificate of Analysis from an ISO 17025-accredited lab.
          </p>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl font-black tracking-tight text-center mb-14"
            style={{ color: "#FFFFFF" }}
          >
            OUR QA PROCESS
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {STEPS.map((s) => (
              <div
                key={s.number}
                className="rounded-2xl p-8 border"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(27, 107, 222, 0.15)",
                }}
              >
                <span
                  className="block text-5xl font-black mb-4 leading-none"
                  style={{ color: "rgba(77,163,255,0.2)" }}
                >
                  {s.number}
                </span>
                <h3
                  className="text-lg font-bold mb-3 tracking-wide"
                  style={{ color: "#FFFFFF" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#A0B4CC" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs table */}
      <section
        className="py-16 px-4 border-y"
        style={{ borderColor: "rgba(27, 107, 222, 0.15)" }}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-2xl font-black tracking-tight text-center mb-10"
            style={{ color: "#FFFFFF" }}
          >
            QUALITY SPECIFICATIONS
          </h2>
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "rgba(27, 107, 222, 0.2)" }}
          >
            {SPECS.map((s, i) => (
              <div
                key={s.label}
                className="flex items-center justify-between px-6 py-4"
                style={{
                  background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
                  borderBottom: i < SPECS.length - 1 ? "1px solid rgba(27,107,222,0.12)" : "none",
                }}
              >
                <span className="text-sm font-medium" style={{ color: "#A0B4CC" }}>
                  {s.label}
                </span>
                <span className="text-sm font-bold" style={{ color: "#4DA3FF" }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CoA callout */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl font-black tracking-tight mb-4"
            style={{ color: "#FFFFFF" }}
          >
            CERTIFICATES OF ANALYSIS
          </h2>
          <p className="text-base mb-8 leading-relaxed" style={{ color: "#A0B4CC" }}>
            CoAs are linked on every product page. You can verify batch numbers, purity percentages,
            and testing dates before you order. A printed copy is included in every shipment.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold tracking-wide text-sm transition-all"
            style={{
              background: "linear-gradient(135deg, #1B6BDE, #4DA3FF)",
              color: "#FFFFFF",
            }}
          >
            BROWSE PRODUCTS &amp; CoAs
          </Link>
        </div>
      </section>

      {/* Footer note */}
      <div
        className="py-8 px-4 text-center border-t"
        style={{ borderColor: "rgba(27, 107, 222, 0.1)" }}
      >
        <p className="text-xs" style={{ color: "#4A6080" }}>
          Aurogen Labs products are intended for laboratory research use only.
          Not for human or veterinary use.
        </p>
      </div>
    </div>
  );
}
