import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer — Aurogen Labs",
  description: "Dietary supplement disclaimer for Aurogen Labs products, including the FDA statement, safe-use guidance, caffeine and allergen information.",
  robots: { index: true, follow: true },
};

const SECTION = "mb-8";
const H2 = "text-xl font-bold mb-3";
const P = "text-sm leading-relaxed mb-3";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-16" style={{ background: "#F6F6F8" }}>
      <div className="max-w-3xl mx-auto px-4">

        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "#9E9EA8" }}>
            Legal
          </p>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Supplement Disclaimer
          </h1>
          <p className="text-sm" style={{ color: "#6E6E73" }}>
            Last updated: October 2026
          </p>
        </div>

        <div
          className="p-8 rounded-2xl space-y-0"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>Dietary Supplements</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              Products sold by Aurogen Labs are <strong>dietary supplements intended for healthy
              adults</strong>. They are meant to supplement a balanced diet and active lifestyle, not to
              replace a varied diet or healthy habits. Always use as directed on the product label and do
              not exceed the recommended serving.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>FDA Statement</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              These statements have not been evaluated by the Food and Drug Administration. These
              products are not intended to diagnose, treat, cure, or prevent any disease. Any statement
              on this website marked with an asterisk (*) describes a supplement&apos;s role in
              supporting normal structure or function of the body.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>Age Restriction &amp; Who Should Not Use</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              Our products are intended for healthy adults 18 years of age or older. They are not
              intended for use by pregnant or nursing women. Keep all products out of reach of
              children. By purchasing from Aurogen Labs, you confirm that you are at least 18 years old.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>Consult a Healthcare Professional</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              Consult a physician or qualified healthcare professional before using any dietary
              supplement, especially if you are pregnant or nursing, taking prescription medication,
              or have a known medical condition. Discontinue use and consult your healthcare provider
              if you experience any adverse reaction. Aurogen Labs is not responsible for any misuse
              of its products.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>Caffeine Warning</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              Ignite Pre-Workout contains 200 mg of caffeine per scoop. Do not combine with other
              sources of caffeine or stimulants, and do not use within several hours of bedtime.
              Not recommended for individuals sensitive to caffeine. Do not exceed the recommended
              serving.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>Allergen Information</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              Whey Protein Isolate contains milk. Always read the full ingredient list and allergen
              statement on each product label before use, particularly if you have a food allergy
              or sensitivity.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>No Medical Advice</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              Nothing on this website or in any Aurogen Labs communication constitutes medical advice.
              Any information provided about our products is for general educational purposes only.
              Always consult a licensed medical professional before making any health decisions.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>Limitation of Liability</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              Aurogen Labs shall not be held liable for any direct, indirect, incidental, special,
              or consequential damages arising from the misuse, improper handling, or use of its
              products other than as directed on the product label.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>Individual Results Vary</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              Results from using dietary supplements vary from person to person and depend on factors
              such as diet, training, sleep, and individual health. Any scientific studies or references
              to published literature provided on this website are for informational purposes only,
              and Aurogen Labs makes no guarantee of specific results.
            </p>
          </div>

          <div style={{ background: "rgba(255,59,48,0.04)", border: "1px solid rgba(255,59,48,0.15)", borderRadius: "12px", padding: "20px" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "#FF3B30" }}>
              Important Notice
            </p>
            <p className="text-sm" style={{ color: "#6E6E73" }}>
              By purchasing from Aurogen Labs you expressly acknowledge that you have read,
              understood, and agree to this disclaimer in its entirety. If you do not agree
              with any part of this disclaimer, do not purchase or use our products.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
