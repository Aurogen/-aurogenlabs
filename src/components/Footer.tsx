import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

const LINKS = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Protein", href: "/shop?category=Protein" },
    { label: "Performance", href: "/shop?category=Performance" },
    { label: "Hydration", href: "/shop?category=Hydration" },
    { label: "Wellness", href: "/shop?category=Wellness" },
  ],
  "Best sellers": [
    { label: "Whey Protein Isolate", href: "/product/whey-protein-isolate" },
    { label: "Creatine Monohydrate", href: "/product/creatine-monohydrate" },
    { label: "Ignite Pre-Workout", href: "/product/ignite-pre-workout" },
    { label: "Hydrate Electrolytes", href: "/product/hydrate-electrolyte-mix" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Quality & Testing", href: "/quality" },
    { label: "Become a Partner", href: "/affiliates" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      {/* Newsletter */}
      <div className="py-12 px-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-2xl mb-1" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
              Stay in the loop
            </h3>
            <p className="text-gray-500 text-sm">New products, training tips and restock notices. No spam.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Links */}
      <div className="py-14 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-8 text-center lg:text-left">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center justify-center lg:justify-start gap-2.5 mb-4">
              <Logo size={32} />
              <div>
                <p className="text-white font-bold text-base tracking-widest" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>AUROGEN</p>
                <p className="text-[9px] tracking-[0.4em] -mt-0.5" style={{ color: "#0A84FF" }}>LABS</p>
              </div>
            </Link>
            <p className="text-gray-500 text-xs leading-relaxed mb-4 max-w-xs mx-auto lg:mx-0">
              Performance nutrition with full-dose, clean-label formulas. Every batch third-party tested.
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-xs tracking-widest mb-4 uppercase">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-500 hover:text-gray-200 text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-6 px-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600 text-center">
          <p>© 2026 Aurogen Labs · All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span
              className="px-2.5 py-1 rounded text-[10px] tracking-[0.12em] uppercase font-medium"
              style={{ border: "1px solid rgba(10,132,255,0.25)", color: "rgba(10,132,255,0.7)" }}
            >
              *Not evaluated by the FDA · Not intended to diagnose, treat, cure or prevent any disease
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shipping" className="hover:text-gray-300 transition-colors">Shipping</Link>
            <Link href="/refund" className="hover:text-gray-300 transition-colors">Refund</Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="/disclaimer" className="hover:text-gray-300 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
