import type { Metadata } from "next";
import { Truck, Package, RotateCcw, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Aurogen Labs ships research peptides in 2–5 business days from our US facility. Learn about our shipping options and returns policy.",
};

const SHIPPING_OPTIONS = [
  { name: "Standard Shipping", time: "3–5 Business Days", price: "Free on orders $150+", carrier: "USPS / UPS" },
  { name: "Expedited Shipping", time: "2–3 Business Days", price: "$12.99", carrier: "UPS / FedEx" },
  { name: "Overnight Shipping", time: "Next Business Day", price: "$24.99", carrier: "FedEx Priority" },
];

const FAQ = [
  { q: "When will my order ship?", a: "Orders placed before 2:00 PM EST on business days are typically processed and shipped the same day. Orders placed after 2:00 PM or on weekends ship the next business day." },
  { q: "Do you ship internationally?", a: "Currently we ship within the United States only. International shipping is not available at this time." },
  { q: "How are research compounds packaged?", a: "All compounds are shipped in temperature-appropriate packaging with desiccants as needed. Lyophilized peptides are shipped at ambient temperature. Vials are secured to prevent breakage during transit." },
  { q: "Can I track my order?", a: "Yes. Once your order ships, you will receive a tracking number via email. You can also view your order status in your account dashboard." },
  { q: "What if my package arrives damaged?", a: "Please photograph the damage immediately and contact us within 48 hours of delivery. We will arrange a replacement or refund for damaged shipments." },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#F6F6F8" }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.18)" }}
            >
              <Truck className="w-5 h-5" style={{ color: "#C9922A" }} />
            </div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#6E6E73" }}>
              Shipping
            </span>
          </div>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Shipping & Returns
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
            We ship all orders from our US facility. Research compounds are carefully packaged to ensure integrity during transit.
          </p>
        </div>

        {/* Shipping options */}
        <div className="mb-12">
          <h2
            className="font-bold text-xl mb-5"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Shipping Options
          </h2>
          <div className="space-y-3">
            {SHIPPING_OPTIONS.map((opt) => (
              <div
                key={opt.name}
                className="p-5 rounded-2xl flex items-center gap-5"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.15)" }}
                >
                  <Clock className="w-5 h-5" style={{ color: "#C9922A" }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold" style={{ color: "#1D1D1F" }}>{opt.name}</p>
                  <p className="text-sm" style={{ color: "#6E6E73" }}>{opt.carrier} · {opt.time}</p>
                </div>
                <span className="font-bold text-sm shrink-0" style={{ color: "#1B7A45" }}>{opt.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Returns policy */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <RotateCcw className="w-5 h-5" style={{ color: "#C9922A" }} />
            <h2
              className="font-bold text-xl"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
            >
              Returns Policy
            </h2>
          </div>
          <div
            className="p-5 rounded-2xl text-sm leading-relaxed"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", color: "#6E6E73" }}
          >
            <p className="mb-3">
              Due to the sensitive nature of research compounds, <strong style={{ color: "#1D1D1F" }}>all sales are final</strong>. We do not accept returns or exchanges.
            </p>
            <p className="mb-3">
              If you receive a defective product, incorrect item, or your order arrives damaged, please contact us within <strong style={{ color: "#1D1D1F" }}>7 days of delivery</strong> with:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-3 pl-1">
              <li>Your order number</li>
              <li>Photos of the product and packaging</li>
              <li>A description of the issue</li>
            </ul>
            <p>Approved claims will be resolved with a replacement shipment or store credit.</p>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Package className="w-5 h-5" style={{ color: "#C9922A" }} />
            <h2
              className="font-bold text-xl"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
            >
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="p-5 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <p className="font-semibold mb-2 text-sm" style={{ color: "#1D1D1F" }}>{item.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
