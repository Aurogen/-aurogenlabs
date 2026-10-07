import Link from "next/link";
import Logo from "./Logo";

// Investor preview: only the shopping journey is live, so every link points into the store.
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
  ],
  Recovery: [
    { label: "Hydrate Electrolytes", href: "/product/hydrate-electrolyte-mix" },
    { label: "Collagen Type I & III", href: "/product/collagen-type-1-3" },
    { label: "Magnesium Glycinate", href: "/product/magnesium-glycinate" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      {/* Links */}
      <div className="py-14 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left">
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
          <p className="max-w-xl md:text-right leading-relaxed">
            *These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
}
