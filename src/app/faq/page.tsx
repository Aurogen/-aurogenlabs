"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  {
    category: "Products & Quality",
    items: [
      { q: "What is creatine?", a: "Creatine is a molecule your body makes naturally from amino acids and stores in muscle, where it helps supply energy for short, intense efforts like lifting and sprinting. Aurogen Creatine Monohydrate provides 5 g of micronized creatine per serving to support strength and power.*" },
      { q: "What's the difference between whey isolate and whey concentrate?", a: "Whey isolate is filtered further than concentrate to remove most of the lactose, fat and carbohydrates, so it delivers more protein per scoop. Aurogen Whey Protein Isolate provides 25 g of protein per serving with minimal sugar and fat, and mixes smoothly." },
      { q: "Can I stack your products?", a: "Yes. Our products are designed to work together. A common stack is Whey Protein Isolate and Creatine after training, Ignite Pre-Workout before, and Hydrate during. Follow the directions on each label, and note that Ignite contains 200 mg of caffeine per scoop, so account for other caffeine sources such as coffee." },
      { q: "Is every batch tested?", a: "Yes. Every batch is tested by an independent third-party lab for label accuracy and screened for heavy metals and contaminants. Our products are manufactured in a GMP-certified facility, and a lot number is printed on every container." },
      { q: "How should I store my supplements?", a: "Store all products in a cool, dry place with the lid tightly closed, away from direct sunlight. Always follow the storage guidelines on the product label." },
    ],
  },
  {
    category: "Orders & Payment",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, American Express) processed securely through our payment partner. Transactions are encrypted end-to-end and your card details are never stored on our servers." },
      { q: "Can I modify or cancel my order?", a: "Orders can be modified or cancelled within 1 hour of placement by contacting our support team. After that, orders enter our fulfillment queue and cannot be changed." },
      { q: "Is my payment information secure?", a: "Yes. All payment processing is handled by industry-standard encrypted payment systems. We do not store your full credit card details on our servers." },
    ],
  },
  {
    category: "Shipping",
    items: [
      { q: "How long does shipping take?", a: "Delivery takes 2–5 business days within the US. Shipping is $7.99, and free on orders of $99 or more. Orders placed before 2:00 PM EST typically ship the same day." },
      { q: "Do you ship outside the United States?", a: "We currently ship within the United States only. International shipping is planned for a future update." },
      { q: "How are orders packaged for shipping?", a: "Products ship in their sealed containers with padding to prevent damage in transit. All packaging is discreet and does not reference the contents on the exterior." },
    ],
  },
  {
    category: "Returns & Safety",
    items: [
      { q: "Can I return a product?", a: "For product safety and hygiene reasons, all sales are final and we do not accept returns or exchanges. If your order arrives damaged, you receive the wrong item, or an item is missing, contact us within 7 days of delivery with photos and we'll make it right." },
      { q: "Should I talk to my doctor before using supplements?", a: "Our products are dietary supplements intended for healthy adults 18 and over. Consult a healthcare professional before use if you are pregnant, nursing, taking medication, or have a medical condition. Use as directed on the label." },
      { q: "Have these products been evaluated by the FDA?", a: "These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease." },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer"
      style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-5 py-4 gap-4">
        <p className="font-medium text-sm" style={{ color: "#1D1D1F" }}>{q}</p>
        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "#6B7A8D" }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          transition: "grid-template-rows 250ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease-out",
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div className="px-5 pb-4 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>{a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#F4F3EF" }}>
      <div className="max-w-3xl mx-auto">

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <HelpCircle className="w-5 h-5" style={{ color: "#6B7A8D" }} />
            </div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#6E6E73" }}>
              Support
            </span>
          </div>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-sm" style={{ color: "#6E6E73" }}>
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/contact" className="underline hover:opacity-70" style={{ color: "#1D1D1F" }}>
              Contact our team
            </Link>.
          </p>
        </div>

        <div className="space-y-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.category}>
              <h2
                className="font-bold text-lg mb-4 pb-2"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
              >
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
