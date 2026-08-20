"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import { useLanguage } from "@/context/LanguageContext";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

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
  const { lang, setLang } = useLanguage();
  const { isSignedIn } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isSignedIn) { setIsAdmin(false); return; }
    fetch("/api/admin-check")
      .then((r) => r.json())
      .then((d) => setIsAdmin(d.isAdmin === true))
      .catch(() => setIsAdmin(false));
  }, [isSignedIn]);
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
      {/* ── Floating pill header ── */}
      <header className="sticky top-0 z-40 w-full px-4 pt-3 pointer-events-none">
        <div
          className="max-w-[1400px] mx-auto flex items-center justify-between h-[50px] px-3 rounded-full pointer-events-auto"
          style={{
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(0,0,0,0.09)",
            boxShadow: "0 2px 24px rgba(0,0,0,0.08)",
          }}
        >
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0 pl-1">
            <Logo size={26} variant="light" />
            <span
              className="font-bold text-sm tracking-widest leading-none"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
            >
              AUROGEN
              <span className="text-[9px] tracking-[0.35em] ml-1.5 align-middle" style={{ color: "#0A84FF" }}>
                LABS
              </span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-0">
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
                    className="flex items-center gap-0.5 px-3.5 py-1.5 text-sm transition-colors"
                    style={{ color: active ? "#1D1D1F" : "#6E6E73", fontWeight: active ? 600 : 400 }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "#1D1D1F"; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "#6E6E73"; }}
                  >
                    {link.label}
                    {link.sub && (
                      <ChevronDown className="w-3 h-3 ml-0.5" style={{ opacity: 0.5 }} />
                    )}
                  </Link>

                  {link.sub && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 pt-2" style={{ width: "210px" }}>
                      <div
                        className="rounded-2xl overflow-hidden shadow-xl"
                        style={{
                          background: "rgba(255,255,255,0.98)",
                          backdropFilter: "blur(24px)",
                          border: "1px solid rgba(0,0,0,0.09)",
                        }}
                      >
                        {link.sub.map((item, i) => (
                          <Link
                            key={item}
                            href={`/shop?goal=${encodeURIComponent(link.subEn ? link.subEn[i] : item)}`}
                            className="block px-4 py-2.5 text-sm transition-colors"
                            style={{
                              color: "#6E6E73",
                              borderBottom: i < link.sub!.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
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
          <div className="flex items-center gap-0.5">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex w-8 h-8 items-center justify-center rounded-full transition-colors"
              style={{ color: "#6E6E73" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language toggle */}
            <div className="hidden md:flex items-center gap-0.5 mx-1 p-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.05)" }}>
              {(["en", "es"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all"
                  style={{
                    background: lang === l ? "#0A84FF" : "transparent",
                    color: lang === l ? "#FFFFFF" : "#9E9EA8",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* My Orders link */}
            {isSignedIn && (
              <Link
                href="/account/orders"
                className="hidden md:flex items-center px-3 py-1.5 text-xs font-semibold rounded-full transition-colors"
                style={{ color: "#6B7A8D", background: "rgba(107,122,141,0.08)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(107,122,141,0.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(107,122,141,0.08)")}
              >
                {lang === "es" ? "Mis Pedidos" : "My Orders"}
              </Link>
            )}

            {/* Admin link */}
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden md:flex items-center px-3 py-1.5 text-xs font-semibold rounded-full transition-colors"
                style={{ color: "#6B7A8D", background: "rgba(107,122,141,0.08)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(107,122,141,0.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(107,122,141,0.08)")}
              >
                Admin
              </Link>
            )}

            {/* Account */}
            {isSignedIn ? (
              <div className="hidden md:flex items-center ml-1">
                <UserButton />
              </div>
            ) : (
              <SignInButton mode="redirect">
                <button
                  className="hidden md:flex items-center px-3 py-1.5 text-sm transition-colors rounded-full"
                  style={{ color: "#6E6E73" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#1D1D1F")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6E6E73")}
                >
                  {lang === "es" ? "Mi Cuenta" : "My Account"}
                </button>
              </SignInButton>
            )}

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex w-8 h-8 items-center justify-center rounded-full transition-colors"
              style={{ color: "#6E6E73" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                  style={{ background: "#0A84FF", minWidth: "15px", minHeight: "15px", padding: "0 2px" }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Shop Now CTA — "Become a Provider" equivalent */}
            <Link
              href="/shop"
              className="hidden lg:flex items-center gap-1.5 ml-1 px-5 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: "#0A84FF" }}
            >
              {lang === "es" ? "Ver Catálogo" : "Shop Now"}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile toggle */}
            <button
              className="lg:hidden flex w-8 h-8 items-center justify-center rounded-full transition-colors ml-1"
              style={{ color: "#6E6E73" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu — card below pill ── */}
        {mobileOpen && (
          <div
            className="lg:hidden mt-2 max-w-[1400px] mx-auto rounded-2xl overflow-hidden pointer-events-auto"
            style={{
              background: "rgba(255,255,255,0.98)",
              border: "1px solid rgba(0,0,0,0.09)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
            }}
          >
            <button
              onClick={() => { setSearchOpen(true); setMobileOpen(false); }}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-sm"
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
                  className="block px-5 py-3.5 text-sm transition-colors"
                  style={{
                    color: active ? "#1D1D1F" : "#6E6E73",
                    fontWeight: active ? 600 : 400,
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="block px-5 py-3.5 text-sm font-semibold"
                style={{ color: "#6B7A8D", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
              >
                Admin
              </Link>
            )}
            {isSignedIn ? (
              <Link
                href="/account/orders"
                onClick={() => setMobileOpen(false)}
                className="block px-5 py-3.5 text-sm"
                style={{ color: "#6B7A8D", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
              >
                {lang === "es" ? "Mis Pedidos" : "My Orders"}
              </Link>
            ) : (
              <SignInButton mode="redirect">
                <button
                  className="w-full text-left px-5 py-3.5 text-sm"
                  style={{ color: "#6B7A8D", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {lang === "es" ? "Mi Cuenta" : "My Account"}
                </button>
              </SignInButton>
            )}

            <div className="flex items-center gap-3 px-5 py-4">
              <span className="text-xs" style={{ color: "#9E9EA8" }}>
                {lang === "es" ? "Idioma:" : "Language:"}
              </span>
              <div className="flex gap-0.5 p-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                {(["en", "es"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                    style={{
                      background: lang === l ? "#0A84FF" : "transparent",
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
