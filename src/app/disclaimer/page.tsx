import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer — Aurogen Labs",
  description: "Important disclaimer regarding Aurogen Labs research peptides and compounds.",
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
            Research Use Disclaimer
          </h1>
          <p className="text-sm" style={{ color: "#6E6E73" }}>
            Last updated: January 2026
          </p>
        </div>

        <div
          className="p-8 rounded-2xl space-y-0"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>Not for Human Consumption</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              ALL products sold by Aurogen Labs are strictly intended for <strong>in vitro laboratory
              research and scientific study only</strong>. They are NOT intended for human consumption,
              veterinary use, food additive use, or any other use outside of controlled scientific
              research settings. These compounds are not drugs, dietary supplements, or medical devices.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>FDA Statement</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              These statements have not been evaluated by the Food and Drug Administration (FDA).
              Aurogen Labs products are not intended to diagnose, treat, cure, or prevent any disease
              or medical condition. No claims are made regarding the safety or efficacy of these
              compounds for use in humans or animals.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>Age Restriction</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              All purchasers must be 18 years of age or older and must be qualified research
              professionals, licensed scientists, or otherwise authorized to work with research
              compounds in their jurisdiction. By purchasing from Aurogen Labs, you confirm
              that you meet these requirements.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>Purchaser Responsibility</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              The purchaser assumes full responsibility for complying with all applicable federal,
              state, and local laws regarding the purchase, possession, and use of these research
              compounds. Aurogen Labs is not responsible for any misuse of its products.
              Purchasers are solely responsible for ensuring that research use complies with all
              applicable laws in their jurisdiction.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>No Medical Advice</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              Nothing on this website or in any Aurogen Labs communication constitutes medical advice.
              Any information provided about research compounds is for educational and scientific
              reference purposes only. Always consult a licensed medical professional before making
              any health decisions.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>Limitation of Liability</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              Aurogen Labs shall not be held liable for any direct, indirect, incidental, special,
              or consequential damages arising from the misuse, improper handling, or unauthorized
              use of its products outside of their intended research application.
            </p>
          </div>

          <div className={SECTION}>
            <h2 className={H2} style={{ color: "#1D1D1F" }}>Third-Party Research References</h2>
            <p className={P} style={{ color: "#6E6E73" }}>
              Any scientific studies, research citations, or references to published literature
              provided on this website are for informational purposes only. Aurogen Labs makes no
              representations regarding the accuracy, completeness, or applicability of such
              third-party research to any specific use case.
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
