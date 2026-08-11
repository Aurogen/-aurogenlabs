"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import { useLanguage } from "@/context/LanguageContext";

interface NavLink {
  label: string;
  href: string;
  sub?: string[];
  subEn?: string[];
}

const NAV_LINKS_EN: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop by Goal",
    href: "/shop",
    sub: ["Fat Loss", "Muscle Growth", "Recovery", "Anti-Aging", "Skin & Hair", "Brain Health", "Performance"],
  },
  { label: "Shop by Compound", href: "/shop" },
  { label: "Protocols", href: "/protocols" },
  { label: "Research Center", href: "/research" },
];

const NAV_LINKS_ES: NavLink[] = [
  { label: "Inicio", href: "/" },
  {
    label: "Comprar por Objetivo",
    href: "/shop",
    sub: ["Pérdida de Grasa", "Crecimiento Muscular", "Recuperación", "Antienvejecimiento", "Piel y Cabello", "Salud Cerebral", "Rendimiento"],
    subEn: ["Fat Loss", "Muscle Growth", "Recovery", "Anti-Aging", "Skin & Hair", "Brain Health", "Performance"],
  },
  { label: "Comprar por Compuesto", href: "/shop" },
  { label: "Protocolos", href: "/protocols" },
  { label: "Centro de Investigación", href: "/research" },
];

const LINK_COLOR = "#1D1D1F";
const LINK_MUTED = "#6E6E73";

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const { isSignedIn } = useUser();
  const { lang, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const NAV_LINKS = lang === "es" ? NAV_LINKS_ES : NAV_LINKS_EN;

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full"
        style={{
          background: "rgba(251,251,253,0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Logo size={32} variant="light" />
            <div>
              <p
                className="font-bold text-base leading-none tracking-widest"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: LINK_COLOR }}
              >
                AUROGEN
              </p>
              <p className="text-[9px] tracking-[0.4em] leading-none mt-0.5" style={{ color: "#C9922A" }}>
                LABS
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-0.5 px-3 py-1.5 text-sm rounded-md transition-colors"
                  style={{ color: LINK_MUTED, fontWeight: 400 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = LINK_COLOR)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = LINK_MUTED)}
                >
                  {link.label}
                  {link.sub && <ChevronDown className="w-3 h-3 opacity-50" />}
                </Link>

                {link.sub && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 w-52 pt-1">
                  <div
                    className="rounded-xl overflow-hidden shadow-xl"
                    style={{
                      background: "rgba(251,251,253,0.96)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    {link.sub.map((item, i) => (
                      <Link
                        key={item}
                        href={`/shop?goal=${encodeURIComponent("subEn" in link && link.subEn ? link.subEn[i] : item)}`}
                        className="block px-4 py-2.5 text-sm transition-colors"
                        style={{
                          color: LINK_MUTED,
                          borderBottom: i < link.sub!.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = LINK_COLOR;
                          e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = LINK_MUTED;
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* Language toggle */}
            <div className="hidden md:flex items-center mr-1">
              <button
                onClick={() => setLang("en")}
                className="px-2 py-1 text-xs font-semibold tracking-wide transition-colors rounded"
                style={{ color: lang === "en" ? LINK_COLOR : "#C0C0C6" }}
              >
                EN
              </button>
              <span className="text-xs" style={{ color: "rgba(0,0,0,0.15)" }}>|</span>
              <button
                onClick={() => setLang("es")}
                className="px-2 py-1 text-xs font-semibold tracking-wide transition-colors rounded"
                style={{ color: lang === "es" ? LINK_COLOR : "#C0C0C6" }}
              >
                ES
              </button>
            </div>

            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg transition-colors"
              style={{ color: LINK_MUTED }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {isSignedIn ? (
              <div className="hidden md:flex items-center w-9 h-9 justify-center">
                <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
              </div>
            ) : (
              <SignInButton mode="redirect" fallbackRedirectUrl="/dashboard">
                <button
                  className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg transition-colors"
                  style={{ color: LINK_MUTED }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </button>
              </SignInButton>
            )}

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex w-9 h-9 items-center justify-center rounded-lg transition-colors"
              style={{ color: LINK_MUTED }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                  style={{ background: "#C9922A", minWidth: "17px", minHeight: "17px", padding: "0 3px" }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile toggle */}
            <button
              className="lg:hidden flex w-9 h-9 items-center justify-center rounded-lg transition-colors"
              style={{ color: LINK_MUTED }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="lg:hidden"
            style={{
              background: "rgba(251,251,253,0.97)",
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <button
              onClick={() => { setSearchOpen(true); setMobileOpen(false); }}
              className="w-full flex items-center gap-3 px-6 py-3.5 text-sm transition-colors"
              style={{ color: LINK_MUTED, borderBottom: "1px solid rgba(0,0,0,0.06)" }}
            >
              <Search className="w-4 h-4" />
              {lang === "es" ? "Buscar" : "Search"}
            </button>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3.5 text-sm transition-colors"
                style={{ color: LINK_MUTED, borderBottom: "1px solid rgba(0,0,0,0.06)" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3.5 text-sm font-medium transition-colors"
              style={{ color: "#C9922A", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
            >
              {lang === "es" ? "Mi Cuenta" : "My Account"}
            </Link>
            {/* Language toggle mobile */}
            <div className="flex items-center gap-3 px-6 py-4">
              <span className="text-xs" style={{ color: LINK_MUTED }}>
                {lang === "es" ? "Idioma:" : "Language:"}
              </span>
              <button
                onClick={() => setLang("en")}
                className="text-xs font-semibold px-2 py-1 rounded transition-colors"
                style={{
                  background: lang === "en" ? "#1D1D1F" : "transparent",
                  color: lang === "en" ? "#FFFFFF" : LINK_MUTED,
                  border: "1px solid rgba(0,0,0,0.12)",
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLang("es")}
                className="text-xs font-semibold px-2 py-1 rounded transition-colors"
                style={{
                  background: lang === "es" ? "#1D1D1F" : "transparent",
                  color: lang === "es" ? "#FFFFFF" : LINK_MUTED,
                  border: "1px solid rgba(0,0,0,0.12)",
                }}
              >
                ES
              </button>
            </div>
          </div>
        )}
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
