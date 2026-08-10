import type { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Aurogen Labs Privacy Policy. Learn how we collect, use, and protect your personal information.",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `When you place an order or create an account, we collect personal information such as your name, email address, shipping address, and purchase history. We also collect non-personal data such as browser type, IP address, and pages visited to improve our website experience.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use your information to process and fulfill orders, communicate with you about your purchases, send order confirmations and shipping updates, improve our website and product offerings, and comply with legal obligations. We do not sell, rent, or trade your personal information to third parties.`,
  },
  {
    title: "3. Cookies and Tracking",
    content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience, remember your cart contents, and analyze site traffic. You may disable cookies in your browser settings, though some features of our website may not function properly as a result.`,
  },
  {
    title: "4. Data Storage and Security",
    content: `Your data is stored securely using industry-standard encryption and security practices. While we take all reasonable precautions to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee the absolute security of your data.`,
  },
  {
    title: "5. Third-Party Services",
    content: `We may use third-party services for payment processing, shipping, and analytics. These providers are contractually bound to keep your information confidential and use it only for the services they provide on our behalf. They have their own privacy policies which we encourage you to review.`,
  },
  {
    title: "6. Data Retention",
    content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal requirements, resolve disputes, and enforce our agreements. You may request deletion of your account and associated data at any time by contacting us.`,
  },
  {
    title: "7. Your Rights",
    content: `You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, please contact us. We will respond to your request within 30 days.`,
  },
  {
    title: "8. Children's Privacy",
    content: `Our website is not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors. If you believe we have collected information from a minor, please contact us immediately and we will take steps to delete it.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date. Continued use of our website after changes are posted constitutes your acceptance of the revised policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#696969" }}>
      <div className="max-w-3xl mx-auto">

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(27,107,222,0.12)" }}>
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">Legal</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
            PRIVACY POLICY
          </h1>
          <p className="text-gray-500 text-sm">Effective date: July 1, 2025</p>
          <p className="text-gray-400 text-sm mt-4 leading-relaxed">
            At Aurogen Labs, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
          </p>
        </div>

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
