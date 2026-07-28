"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Shop by Goal",
    href: "/shop?filter=goal",
    sub: ["Fat Loss", "Muscle Growth", "Recovery", "Anti-Aging", "Skin & Hair", "Brain Health", "Performance"],
  },
  { label: "Shop by Compound", href: "/shop" },
  { label: "Protocols", href: "/protocols" },
  { label: "Research Center", href: "/research" },
  { label: "Affiliates", href: "/affiliates" },
];

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: "rgba(5, 13, 26, 0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(27, 107, 222, 0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <Logo size={34} />
          <div>
            <p className="text-white font-bold text-lg leading-none tracking-widest group-hover:text-blue-300 transition-colors" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
              AUROGEN
            </p>
            <p className="text-blue-400 text-[9px] tracking-[0.4em] leading-none mt-0.5">LABS</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="relative group"
              onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors py-2 font-medium tracking-wide"
              >
                {link.label}
                {link.sub && <ChevronDown className="w-3 h-3 opacity-60" />}
              </Link>

              {link.sub && activeDropdown === link.label && (
                <div
                  className="absolute top-full left-0 w-52 rounded-xl overflow-hidden shadow-2xl border border-blue-600/20"
                  style={{ background: "#0A1628" }}
                >
                  {link.sub.map((item) => (
                    <Link
                      key={item}
                      href={`/shop?goal=${encodeURIComponent(item)}`}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-blue-600/10 transition-colors border-b border-blue-900/30 last:border-0"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-blue-600/10 transition-all">
            <Search className="w-4 h-4" />
          </button>
          <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-blue-600/10 transition-all">
            <User className="w-4 h-4" />
          </button>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative flex w-9 h-9 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-blue-600/10 transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                style={{ background: "#1B6BDE", minWidth: "18px", minHeight: "18px" }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden flex w-9 h-9 items-center justify-center rounded-lg text-gray-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-blue-900/30" style={{ background: "#0A1628" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3.5 text-sm text-gray-300 hover:text-white hover:bg-blue-600/10 border-b border-blue-900/20 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
