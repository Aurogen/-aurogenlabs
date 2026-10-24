import type { Metadata } from "next";
import { FlaskConical, Award, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Aurogen Labs makes full-dose, clean-label sports nutrition: whey protein isolate, creatine, pre-workout, electrolytes, collagen and magnesium. Every batch third-party tested.",
};

const STATS = [
  { value: "6", label: "Core Formulas" },
  { value: "100%", label: "Batches Third-Party Tested" },
  { value: "0", label: "Proprietary Blends" },
  { value: "GMP", label: "Certified Facility" },
];

const VALUES = [
  {
    icon: FlaskConical,
    title: "Tested, Not Trusted",
    desc: "Every batch is tested by an independent third-party lab for label accuracy and screened for heavy metals and contaminants, so what's on the label is what's in the tub.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    desc: "Our products are manufactured in a GMP-certified facility, and every container carries a printed lot number so each batch can be traced.",
  },
  {
    icon: Users,
    title: "Athlete-First",
    desc: "We built Aurogen Labs for people who train. Six focused formulas covering protein, performance, hydration and wellness, with clear directions on every label.",
  },
  {
    icon: Globe,
    title: "Transparent Labels",
    desc: "Full doses of every ingredient, listed in plain numbers. No proprietary blends, no hidden amounts — just honest formulas you can compare.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#F6F6F8" }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "#6E6E73" }}>
            About Aurogen Labs
          </p>
          <h1
            className="text-5xl font-bold mb-5"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Built for Training
          </h1>
          <p className="leading-relaxed max-w-xl mx-auto" style={{ color: "#6E6E73" }}>
            Aurogen Labs was founded with a single mission: to make sports nutrition you can trust, with full-dose, clean-label formulas backed by full transparency and independent third-party testing.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl text-center"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <p
                className="text-3xl font-bold mb-1"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#6B7A8D" }}
              >
                {s.value}
              </p>
              <p className="text-xs" style={{ color: "#6E6E73" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div
          className="mb-16 p-8 rounded-2xl"
          style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <h2
            className="font-bold text-2xl mb-5"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Our Story
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
            <p>
              Aurogen Labs was born out of frustration with the status quo in the supplement aisle — underdosed formulas, proprietary blends that hide how much of each ingredient you actually get, and labels that are hard to verify.
            </p>
            <p>
              So we kept things simple: a focused lineup of six essentials across Protein, Performance, Hydration and Wellness. Each one is made in a GMP-certified facility, tested batch by batch by an independent third-party lab, and labeled with a lot number you can trace.
            </p>
            <p>
              Whether you&apos;re building strength, staying hydrated or supporting recovery, our commitment stays the same: full doses, honest labels and quality you can check for yourself.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2
            className="font-bold text-2xl mb-6 text-center"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.18)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "#6B7A8D" }} />
                  </div>
                  <h3 className="font-bold text-sm" style={{ color: "#1D1D1F" }}>{title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
