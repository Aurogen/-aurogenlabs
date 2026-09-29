import type { Metadata } from "next";
import { RotateCcw, AlertCircle, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy — Aurogen Labs",
  description: "Aurogen Labs refund and returns policy for research compounds. All sales are final. Learn about eligible claims for damaged or incorrect orders.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#F6F6F8" }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.18)" }}
            >
              <RotateCcw className="w-5 h-5" style={{ color: "#6B7A8D" }} />
            </div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#6E6E73" }}>
              Policies
            </span>
          </div>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Refund Policy
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
            Last updated: September 2026
          </p>
        </div>

        {/* All Sales Final Notice */}
        <div
          className="p-5 rounded-2xl mb-8 flex gap-4"
          style={{ background: "rgba(255,59,48,0.06)", border: "1px solid rgba(255,59,48,0.18)" }}
        >
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#FF3B30" }} />
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: "#1D1D1F" }}>All Sales Are Final</p>
            <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
              Due to the sensitive and perishable nature of research compounds, we do not accept returns, exchanges,
              or cancellations once an order has been placed and confirmed.
            </p>
          </div>
        </div>

        {/* Eligible Claims */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <CheckCircle className="w-5 h-5" style={{ color: "#6B7A8D" }} />
            <h2
              className="font-bold text-xl"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
            >
              Eligible Refund Claims
            </h2>
          </div>
          <div
            className="p-5 rounded-2xl text-sm leading-relaxed mb-4"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", color: "#6E6E73" }}
          >
            <p className="mb-4">
              Refunds or replacements may be issued only in the following circumstances:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="shrink-0 font-bold" style={{ color: "#1D1D1F" }}>1.</span>
                <span><strong style={{ color: "#1D1D1F" }}>Damaged shipment</strong> — the product arrived visibly damaged due to carrier mishandling.</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 font-bold" style={{ color: "#1D1D1F" }}>2.</span>
                <span><strong style={{ color: "#1D1D1F" }}>Wrong item received</strong> — you received a product different from what you ordered.</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 font-bold" style={{ color: "#1D1D1F" }}>3.</span>
                <span><strong style={{ color: "#1D1D1F" }}>Missing item</strong> — a confirmed item from your order was not included in the shipment.</span>
              </li>
            </ul>
          </div>
          <p className="text-sm" style={{ color: "#6E6E73" }}>
            Claims must be submitted within <strong style={{ color: "#1D1D1F" }}>7 days of the confirmed delivery date</strong>.
            Claims submitted after this window will not be eligible.
          </p>
        </div>

        {/* How to File */}
        <div className="mb-10">
          <h2
            className="font-bold text-xl mb-5"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            How to File a Claim
          </h2>
          <div className="space-y-3">
            {[
              { step: "1", text: "Email us at support@aurogenlabs.com with the subject line: Refund Request – Order #[your order number]" },
              { step: "2", text: "Attach clear photographs of the product, packaging, and any visible damage or discrepancy." },
              { step: "3", text: "Include a brief description of the issue." },
              { step: "4", text: "Our team will review your claim and respond within 2–3 business days." },
            ].map(({ step, text }) => (
              <div
                key={step}
                className="p-5 rounded-2xl flex gap-4"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: "rgba(10,132,255,0.08)", color: "#0A84FF" }}
                >
                  {step}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution */}
        <div className="mb-10">
          <h2
            className="font-bold text-xl mb-5"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Resolution
          </h2>
          <div
            className="p-5 rounded-2xl text-sm leading-relaxed"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", color: "#6E6E73" }}
          >
            <p className="mb-3">
              Approved claims will be resolved with one of the following at our discretion:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Replacement shipment of the same product</li>
              <li>Store credit for a future order</li>
              <li>Partial or full refund to the original payment method</li>
            </ul>
            <p className="mt-3">
              Refunds to the original payment method, when issued, may take 5–10 business days to appear
              depending on your financial institution.
            </p>
          </div>
        </div>

        {/* Research Use Disclaimer */}
        <div
          className="p-5 rounded-2xl mb-10 text-sm leading-relaxed"
          style={{ background: "rgba(10,132,255,0.07)", border: "1px solid rgba(10,132,255,0.25)", color: "#6E6E73" }}
        >
          <p className="font-semibold mb-2" style={{ color: "#1D1D1F" }}>Research Use Only</p>
          <p>
            All products sold by Aurogen Labs are intended exclusively for in-vitro laboratory and scientific
            research purposes. They are not intended for human consumption, are not drugs or supplements, and
            have not been evaluated by the FDA. By placing an order, you confirm that you are a qualified
            researcher and that the compounds will be used solely for research purposes.
          </p>
        </div>

        {/* Contact */}
        <div
          className="p-6 rounded-2xl flex gap-4"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <Mail className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#6B7A8D" }} />
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: "#1D1D1F" }}>Questions?</p>
            <p className="text-sm" style={{ color: "#6E6E73" }}>
              Contact our support team at{" "}
              <a href="mailto:support@aurogenlabs.com" className="underline" style={{ color: "#0A84FF" }}>
                support@aurogenlabs.com
              </a>{" "}
              or visit our{" "}
              <Link href="/shipping" className="underline" style={{ color: "#0A84FF" }}>
                Shipping & Returns
              </Link>{" "}
              page for more information.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
