"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  {
    category: "Products & Quality",
    items: [
      {
        q: "What purity level are your peptides?",
        a: "All Aurogen Labs peptides are manufactured to a minimum of 99%+ purity, verified by third-party HPLC analysis. Each batch comes with a Certificate of Analysis (COA) available on the product page.",
      },
      {
        q: "How are the compounds stored?",
        a: "Lyophilized peptides should be stored at -20°C (freezer) in an airtight container away from light and moisture. Once reconstituted, store at 2–8°C (refrigerator) and use within 30 days. Always follow the storage guidelines on the product page.",
      },
      {
        q: "Do your products come with a Certificate of Analysis?",
        a: "Yes. Every product has a batch-specific COA available via the 'View COA' button on the product page. The COA includes HPLC purity data, molecular weight verification, and mass spectrometry results.",
      },
      {
        q: "Are your peptides synthesized in the US?",
        a: "Yes. All compounds are synthesized and quality-tested in our US-based facility, following strict GMP-adjacent protocols.",
      },
    ],
  },
  {
    category: "Orders & Payment",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We are currently integrating WHOP as our payment gateway. In the meantime, please place your order and our team will contact you to complete payment via bank transfer or other available methods.",
      },
      {
        q: "Can I modify or cancel my order?",
        a: "Orders can be modified or cancelled within 1 hour of placement by contacting our support team. After that, orders enter our fulfillment queue and cannot be changed.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes. All payment processing is handled by industry-standard encrypted payment systems. We do not store your full credit card details on our servers.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 3–5 business days. Expedited (2–3 days) and overnight options are available. Orders placed before 2:00 PM EST typically ship same day.",
      },
      {
        q: "Do you ship outside the United States?",
        a: "We currently ship within the United States only. International shipping is planned for a future update.",
      },
      {
        q: "How are peptides packaged for shipping?",
        a: "Lyophilized peptides are shipped in sealed vials with desiccants and padding to prevent breakage. All packaging is discreet and does not reference the contents on the exterior.",
      },
    ],
  },
  {
    category: "Research & Usage",
    items: [
      {
        q: "Are your products approved for human use?",
        a: "No. All products are sold strictly for in vitro and laboratory research purposes. They are not approved by the FDA for human consumption, therapeutic, or veterinary use.",
      },
      {
        q: "Do you offer research protocols?",
        a: "Yes. Our Protocols Library contains detailed research protocols for our most popular compounds, including dosing guidelines, reconstitution instructions, and study references.",
      },
      {
        q: "Where can I find reconstitution instructions?",
        a: "Reconstitution guides are available in our Research Center. You can also use the interactive Dosing Calculator on each product page to calculate exact reconstitution ratios.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-blue-900/20 rounded-xl overflow-hidden cursor-pointer"
      style={{ background: "#0A1628" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-5 py-4 gap-4">
        <p className="text-white font-medium text-sm">{q}</p>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-blue-400 shrink-0" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-5 pb-4 border-t border-blue-900/20 pt-4">
              <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#020810" }}>
      <div className="max-w-3xl mx-auto">

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(27,107,222,0.12)" }}>
              <HelpCircle className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">Support</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-gray-400 text-sm">
            Can&apos;t find what you&apos;re looking for? <a href="/contact" className="text-blue-400 hover:underline">Contact our team</a>.
          </p>
        </div>

        <div className="space-y-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-white font-bold text-lg mb-4 pb-2 border-b border-blue-900/20" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
                {cat.category}
              </h2>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
