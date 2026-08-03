import { Scale } from "lucide-react";

const SECTIONS = [
  {
    title: "1. Research Use Only",
    content: `All products sold by Aurogen Labs are intended exclusively for laboratory and scientific research purposes. These compounds are not approved by the FDA for human or veterinary use and are not intended for human consumption, therapeutic use, or any medical application. By purchasing from Aurogen Labs, you acknowledge and agree to this restriction.`,
  },
  {
    title: "2. Eligibility",
    content: `You must be at least 18 years of age to purchase from Aurogen Labs. By placing an order, you represent that you are a qualified researcher, scientist, or professional with the appropriate facilities and knowledge to handle research-grade chemical compounds safely.`,
  },
  {
    title: "3. Orders and Payment",
    content: `All orders are subject to availability and confirmation. Aurogen Labs reserves the right to refuse or cancel any order at its sole discretion. Prices are listed in USD and are subject to change without notice. We are not responsible for typographical errors in pricing or product descriptions.`,
  },
  {
    title: "4. Shipping and Delivery",
    content: `We ship within the United States only. Estimated delivery times are 2–5 business days from order confirmation. Aurogen Labs is not responsible for delays caused by carriers, customs, or circumstances beyond our control. Risk of loss transfers to the buyer upon delivery to the carrier.`,
  },
  {
    title: "5. Returns and Refunds",
    content: `Due to the nature of research chemicals, all sales are final. We do not accept returns. In the event of a product defect, shipping damage, or incorrect item received, please contact us within 7 days of delivery with photographic evidence. Approved claims will be resolved with a replacement or store credit at our discretion.`,
  },
  {
    title: "6. Limitation of Liability",
    content: `Aurogen Labs shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or misuse of our products. Our total liability shall not exceed the amount paid for the specific product giving rise to the claim. You assume full responsibility for the safe handling, storage, and use of all purchased compounds.`,
  },
  {
    title: "7. Intellectual Property",
    content: `All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Aurogen Labs and is protected by applicable intellectual property laws. Unauthorized reproduction or distribution is strictly prohibited.`,
  },
  {
    title: "8. Governing Law",
    content: `These Terms of Use shall be governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law provisions. Any disputes shall be resolved exclusively in the courts of Miami-Dade County, Florida.`,
  },
  {
    title: "9. Changes to Terms",
    content: `Aurogen Labs reserves the right to update these Terms of Use at any time. Changes will be posted on this page with an updated effective date. Continued use of our website following any changes constitutes your acceptance of the revised terms.`,
  },
  {
    title: "10. Contact",
    content: `For questions regarding these Terms of Use, please contact us through our Contact page. We will respond to inquiries within 2 business days.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#020810" }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(27,107,222,0.12)" }}>
              <Scale className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">Legal</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
            TERMS OF USE
          </h1>
          <p className="text-gray-500 text-sm">Effective date: July 1, 2025</p>
          <div className="mt-6 p-4 rounded-xl border border-yellow-600/20 text-yellow-400/80 text-sm" style={{ background: "rgba(161,130,0,0.05)" }}>
            <strong>Important:</strong> All products are sold for research purposes only. Not for human consumption.
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title} className="border-b border-blue-900/20 pb-8 last:border-0">
              <h2 className="text-white font-bold text-lg mb-3" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                {s.title}
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
