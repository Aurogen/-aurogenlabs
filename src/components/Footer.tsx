import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

const LINKS = {
  Shop: [
    { label: "Shop by Goal", href: "/shop" },
    { label: "Shop by Compound", href: "/shop" },
    { label: "New Arrivals", href: "/shop?sort=popular" },
    { label: "Best Sellers", href: "/shop?sort=popular" },
  ],
  Research: [
    { label: "Protocols", href: "/protocols" },
    { label: "Research Center", href: "/research" },
    { label: "Reconstitution Guide", href: "/research#reconstitution" },
    { label: "Quality Standards", href: "/quality" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Quality & Testing", href: "/quality" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#3A3A3A", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Newsletter */}
      <div className="py-12 px-4" style={{ borderBottom: "1px solid rgba(201, 146, 42, 0.08)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-2xl mb-1" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
              STAY IN THE LOOP
            </h3>
            <p className="text-gray-500 text-sm">New peptides, protocols, and research updates</p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Links */}
      <div className="py-14 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Logo size={32} />
              <div>
                <p className="text-white font-bold text-base tracking-widest" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>AUROGEN</p>
                <p className="text-[9px] tracking-[0.4em] -mt-0.5" style={{ color: "#C9922A" }}>LABS</p>
              </div>
            </Link>
            <p className="text-gray-500 text-xs leading-relaxed mb-4">
              Engineering the Future of Peptide Research. Premium compounds for advanced scientific investigation.
            </p>
            <p className="text-gray-600 text-[11px]">COA Available · cGMP Certified</p>
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
      <div className="py-6 px-4" style={{ borderTop: "1px solid rgba(201, 146, 42, 0.08)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© 2025 Aurogen Labs · All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="px-2 py-1 rounded border border-yellow-600/20 text-yellow-600/70 text-[10px] tracking-wide">
              ⚠️ FOR RESEARCH USE ONLY · NOT FOR HUMAN CONSUMPTION
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
