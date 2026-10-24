import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quality & Testing",
  description: "Every Aurogen Labs batch is tested by an independent third-party lab for label accuracy, heavy metals and contaminants. Learn about our sourcing, GMP manufacturing and lot traceability.",
};

const STEPS = [
  { number: "01", title: "Ingredient Sourcing", body: "Every formula starts with the ingredients and doses printed on the label. We use full doses of each ingredient and no proprietary blends, so you always know exactly how much you're getting." },
  { number: "02", title: "GMP Manufacturing", body: "All Aurogen products are manufactured in a GMP-certified facility, following Good Manufacturing Practices for consistent, documented production from batch to batch." },
  { number: "03", title: "Independent Third-Party Testing", body: "Every batch is tested by an independent third-party lab to verify label accuracy and screened for heavy metals and contaminants before it reaches you." },
  { number: "04", title: "Lot Traceability", body: "A lot number is printed on every container, linking the product in your hands to the batch it was made and tested in." },
];

const SPECS = [
  { label: "Manufacturing", value: "GMP-certified facility" },
  { label: "Third-party testing", value: "Every batch" },
  { label: "Label accuracy", value: "Verified per batch" },
  { label: "Heavy metals & contaminants", value: "Screened per batch" },
  { label: "Proprietary blends", value: "None" },
  { label: "Lot traceability", value: "Lot number on every container" },
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
            We believe you should never have to take our word for it. That&apos;s why every batch is independently tested for label accuracy and screened for heavy metals and contaminants.
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
                  style={{ color: "rgba(10,132,255,0.25)", fontFamily: "var(--font-heading, sans-serif)" }}
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

      {/* Label callout */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Know What&apos;s in Every Scoop
          </h2>
          <p className="text-base mb-8 leading-relaxed" style={{ color: "#6E6E73" }}>
            Every product page lists the full supplement facts, serving size and directions, and every container carries a printed lot number. Have a question about a specific batch? Our FAQ and support team can help.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-85"
            style={{ background: "#1D1D1F" }}
          >
            Browse Products
          </Link>
        </div>
      </section>

      {/* Footer note */}
      <div className="py-8 px-4 text-center" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <p className="text-xs" style={{ color: "#9E9EA8" }}>
          *These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}
