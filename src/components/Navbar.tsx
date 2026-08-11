"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import { useLanguage } from "@/context/LanguageContext";

interface NavLink {
  label: string;
  href: string;
  match?: string;
  sub?: string[];
  subEn?: string[];
}

const NAV_LINKS_EN: NavLink[] = [
  { label: "Home", href: "/", match: "/" },
  {
    label: "Shop by Goal",
    href: "/shop",
    match: "/shop",
    sub: ["Fat Loss", "Muscle Growth", "Recovery", "Anti-Aging", "Skin & Hair", "Brain Health", "Performance"],
  },
  { label: "Shop by Compound", href: "/shop", match: "/shop" },
  { label: "Protocols", href: "/protocols", match: "/protocols" },
  { label: "Research Center", href: "/research", match: "/research" },
];

const NAV_LINKS_ES: NavLink[] = [
  { label: "Inicio", href: "/", match: "/" },
  {
    label: "Comprar por Objetivo",
    href: "/shop",
    match: "/shop",
    sub: ["Pérdida de Grasa", "Crecimiento Muscular", "Recuperación", "Antienvejecimiento", "Piel y Cabello", "Salud Cerebral", "Rendimiento"],
    subEn: ["Fat Loss", "Muscle Growth", "Recovery", "Anti-Aging", "Skin & Hair", "Brain Health", "Performance"],
  },
  { label: "Comprar por Compuesto", href: "/shop", match: "/shop" },
  { label: "Protocolos", href: "/protocols", match: "/protocols" },
  { label: "Centro de Investigación", href: "/research", match: "/research" },
];

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const { isSignedIn } = useUser();
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const NAV_LINKS = lang === "es" ? NAV_LINKS_ES : NAV_LINKS_EN;

  function isActive(link: NavLink) {
    if (link.match === "/") return pathname === "/";
    return link.match ? pathname.startsWith(link.match) : false;
  }

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full"
        style={{
          background: "rgba(251,251,253,0.92)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Logo size={30} variant="light" />
            <div>
              <p
                className="font-bold text-sm leading-none tracking-widest"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                AUROGEN
              </p>
              <p className="text-[8px] tracking-[0.4em] leading-none mt-0.5" style={{ color: "#6B7A8D" }}>
                LABS
              </p>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-0.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                    style={{
                      background: active ? "#1D1D1F" : "transparent",
                      color: active ? "#FFFFFF" : "#6E6E73",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.color = "#1D1D1F";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.color = "#6E6E73";
                    }}
                  >
                    {link.label}
                    {link.sub && (
                      <ChevronDown
                        className="w-3 h-3"
                        style={{ opacity: active ? 0.7 : 0.45 }}
                      />
                    )}
                  </Link>

                  {link.sub && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 w-54 pt-1" style={{ width: "210px" }}>
                      <div
                        className="rounded-xl overflow-hidden shadow-xl"
                        style={{
                          background: "rgba(251,251,253,0.97)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(0,0,0,0.1)",
                        }}
                      >
                        {link.sub.map((item, i) => (
                          <Link
                            key={item}
                            href={`/shop?goal=${encodeURIComponent(link.subEn ? link.subEn[i] : item)}`}
                            className="block px-4 py-2.5 text-sm transition-colors"
                            style={{
                              color: "#6E6E73",
                              borderBottom: i < link.sub!.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "#1D1D1F";
                              e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "#6E6E73";
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
              );
            })}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-1.5">

            {/* Language toggle — pill style (CellGenic) */}
            <div className="hidden md:flex items-center gap-1 mr-1 p-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.05)" }}>
              {(["en", "es"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all"
                  style={{
                    background: lang === l ? "#1D1D1F" : "transparent",
                    color: lang === l ? "#FFFFFF" : "#9E9EA8",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex w-8 h-8 items-center justify-center rounded-lg transition-colors"
              style={{ color: "#6E6E73" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* User */}
            {isSignedIn ? (
              <div className="hidden md:flex items-center w-8 h-8 justify-center">
                <UserButton appearance={{ elements: { avatarBox: "w-7 h-7" } }} />
              </div>
            ) : (
              <SignInButton mode="redirect" fallbackRedirectUrl="/dashboard">
                <button
                  className="hidden md:flex w-8 h-8 items-center justify-center rounded-lg transition-colors"
                  style={{ color: "#6E6E73" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </button>
              </SignInButton>
            )}

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex w-8 h-8 items-center justify-center rounded-lg transition-colors"
              style={{ color: "#6E6E73" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                  style={{ background: "#6B7A8D", minWidth: "16px", minHeight: "16px", padding: "0 2px" }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* CTA — Shop Now (CellGenic-style "Become a Provider") */}
            <Link
              href="/shop"
              className="hidden lg:flex items-center gap-1.5 ml-1 px-4 py-1.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: "#1D1D1F" }}
            >
              {lang === "es" ? "Ver Catálogo" : "Shop Now"}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile toggle */}
            <button
              className="lg:hidden flex w-8 h-8 items-center justify-center rounded-lg transition-colors"
              style={{ color: "#6E6E73" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
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
              className="w-full flex items-center gap-3 px-6 py-3.5 text-sm"
              style={{ color: "#6E6E73", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
            >
              <Search className="w-4 h-4" />
              {lang === "es" ? "Buscar" : "Search"}
            </button>

            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3.5 text-sm font-medium transition-colors"
                  style={{
                    color: active ? "#1D1D1F" : "#6E6E73",
                    background: active ? "rgba(0,0,0,0.03)" : "transparent",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3.5 text-sm font-medium"
              style={{ color: "#6B7A8D", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
            >
              {lang === "es" ? "Mi Cuenta" : "My Account"}
            </Link>

            {/* Language mobile */}
            <div className="flex items-center gap-3 px-6 py-4">
              <span className="text-xs" style={{ color: "#6E6E73" }}>
                {lang === "es" ? "Idioma:" : "Language:"}
              </span>
              <div className="flex gap-1 p-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                {(["en", "es"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                    style={{
                      background: lang === l ? "#1D1D1F" : "transparent",
                      color: lang === l ? "#FFFFFF" : "#9E9EA8",
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
