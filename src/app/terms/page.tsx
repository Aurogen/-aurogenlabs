import type { Metadata } from "next";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Aurogen Labs Terms of Use. Our products are dietary supplements intended for healthy adults 18 and over.",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { title: "1. Dietary Supplements", content: `All products sold by Aurogen Labs are dietary supplements intended for healthy adults and must be used as directed on the product label. These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. By purchasing from Aurogen Labs, you acknowledge and agree to these terms.` },
  { title: "2. Eligibility", content: `You must be at least 18 years of age to purchase from Aurogen Labs. By placing an order, you represent that you are 18 or older and that you will use our products as directed. If you are pregnant, nursing, taking medication, or have a medical condition, you agree to consult a healthcare provider before using any of our products.` },
  { title: "3. Orders and Payment", content: `All orders are subject to availability and confirmation. Aurogen Labs reserves the right to refuse or cancel any order at its sole discretion. Prices are listed in USD and are subject to change without notice. We are not responsible for typographical errors in pricing or product descriptions.` },
  { title: "4. Shipping and Delivery", content: `We ship within the United States only. Estimated delivery times are 2–5 business days from order confirmation. Aurogen Labs is not responsible for delays caused by carriers, customs, or circumstances beyond our control. Risk of loss transfers to the buyer upon delivery to the carrier.` },
  { title: "5. Returns and Refunds", content: `For product safety and hygiene reasons, as our products are consumables, all sales are final. We do not accept returns. In the event of a product defect, shipping damage, or incorrect item received, please contact us within 7 days of delivery with photographic evidence. Approved claims will be resolved with a replacement or store credit at our discretion.` },
  { title: "6. Limitation of Liability", content: `Aurogen Labs shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or misuse of our products. Our total liability shall not exceed the amount paid for the specific product giving rise to the claim. You assume full responsibility for the proper storage and use of all purchased products in accordance with the label directions.` },
  { title: "7. Intellectual Property", content: `All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Aurogen Labs and is protected by applicable intellectual property laws. Unauthorized reproduction or distribution is strictly prohibited.` },
  { title: "8. Governing Law", content: `These Terms of Use shall be governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law provisions. Any disputes shall be resolved exclusively in the courts of Miami-Dade County, Florida.` },
  { title: "9. Changes to Terms", content: `Aurogen Labs reserves the right to update these Terms of Use at any time. Changes will be posted on this page with an updated effective date. Continued use of our website following any changes constitutes your acceptance of the revised terms.` },
  { title: "10. Contact", content: `For questions regarding these Terms of Use, please contact us through our Contact page. We will respond to inquiries within 2 business days.` },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#F6F6F8" }}>
      <div className="max-w-3xl mx-auto">

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.18)" }}
            >
              <Scale className="w-5 h-5" style={{ color: "#6B7A8D" }} />
            </div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#6E6E73" }}>
              Legal
            </span>
          </div>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Terms of Use
          </h1>
          <p className="text-sm" style={{ color: "#9E9EA8" }}>Effective date: October 24, 2026</p>
          <div
            className="mt-6 p-4 rounded-xl text-sm"
            style={{ background: "rgba(10,132,255,0.04)", border: "1px solid rgba(10,132,255,0.15)", color: "#0A84FF" }}
          >
            <strong>Important:</strong> Our products are dietary supplements intended for healthy adults 18+. Use as directed and consult a healthcare provider if you are pregnant, nursing, on medication, or have a medical condition.
          </div>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div
              key={s.title}
              className="pb-8 last:pb-0"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h2
                className="font-bold text-lg mb-3"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                {s.title}
              </h2>
              <p className="leading-relaxed text-sm" style={{ color: "#6E6E73" }}>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
