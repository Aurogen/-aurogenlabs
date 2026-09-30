"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORIES } from "@/data/products";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

const INK = "#111111";
const MUTED = "#55555A";
const LINE = "rgba(0,0,0,0.09)";

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const { lang, setLang, t } = useLanguage();
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<"shop" | "account" | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (!isSignedIn) return;
    fetch("/api/admin-check")
      .then((r) => r.json())
      .then((d) => setIsAdmin(d.isAdmin === true))
      .catch(() => setIsAdmin(false));
  }, [isSignedIn]);

  const links = [
    { href: "/protocols", label: t("Protocols", "Protocolos") },
    { href: "/research", label: t("Research Center", "Centro de Investigación") },
    { href: "/quality", label: t("Quality", "Calidad") },
    { href: "/affiliates", label: t("Partners", "Partners") },
  ];

  const accountLinks = [
    { href: "/account/orders", label: t("My Orders", "Mis Pedidos") },
    { href: "/account/affiliate", label: t("Affiliate Portal", "Portal de Afiliados") },
    ...(isSignedIn && isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  const navLinkStyle = (href: string) => {
    const active = pathname.startsWith(href);
    return {
      color: active ? INK : MUTED,
      boxShadow: active ? `inset 0 -1.5px 0 ${INK}` : "none",
    };
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full"
        style={{
          background: "#F5F4F0",
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        <div className="max-w-7xl mx-auto h-16 px-5 sm:px-8 md:px-12 lg:px-16 flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Aurogen Labs home">
            <Logo size={28} variant="light" />
            <span className="leading-none" style={{ color: INK }}>
              <span className="block font-semibold text-[15px] tracking-[0.14em]">AUROGEN</span>
              <span className="block text-[9px] tracking-[0.3em] mt-0.5" style={{ color: MUTED }}>LABS</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 h-full text-[14px]">
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setMenu("shop")}
              onMouseLeave={() => setMenu(null)}
            >
              <Link
                href="/shop"
                className="flex items-center gap-1 h-full transition-colors hover:text-[#111111]"
                style={navLinkStyle("/shop")}
              >
                {t("Shop", "Tienda")}
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>

              {menu === "shop" && (
                <div className="absolute top-full left-[-20px] pt-px">
                  <div
                    className="w-[480px] p-5 rounded-b-xl"
                    style={{ background: "#FFFFFF", border: `1px solid ${LINE}`, borderTop: "none", boxShadow: "0 18px 40px -18px rgba(0,0,0,0.18)" }}
                  >
                    <p className="text-xs mb-3" style={{ color: MUTED }}>
                      {t("Browse by compound class", "Explorar por clase de compuesto")}
                    </p>
                    <div className="grid grid-cols-2 gap-x-6">
                      {CATEGORIES.map((c) => (
                        <Link
                          key={c.label}
                          href={`/shop?category=${encodeURIComponent(c.label)}`}
                          className="py-2 text-[14px] transition-colors hover:text-[#0A84FF]"
                          style={{ color: INK, borderBottom: `1px solid ${LINE}` }}
                          onClick={() => setMenu(null)}
                        >
                          {lang === "es" ? c.label_es : c.label}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/shop"
                      className="inline-block mt-4 text-[13px] font-medium"
                      style={{ color: "#0A84FF" }}
                      onClick={() => setMenu(null)}
                    >
                      {t("View all products →", "Ver todos los productos →")}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center h-full transition-colors hover:text-[#111111]"
                style={navLinkStyle(l.href)}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
              style={{ color: INK }}
              aria-label={t("Search", "Buscar")}
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            <div className="hidden md:flex items-center text-[13px] px-1" aria-label="Language">
              {(["en", "es"] as const).map((l, i) => (
                <span key={l} className="flex items-center">
                  {i > 0 && <span className="mx-1.5" style={{ color: "rgba(0,0,0,0.2)" }}>/</span>}
                  <button
                    onClick={() => setLang(l)}
                    className="transition-colors"
                    style={{ color: lang === l ? INK : "#9A9AA0", fontWeight: lang === l ? 600 : 400 }}
                    aria-pressed={lang === l}
                  >
                    {l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            {isSignedIn ? (
              <div
                className="relative hidden md:flex items-center h-16"
                onMouseEnter={() => setMenu("account")}
                onMouseLeave={() => setMenu(null)}
              >
                <button className="flex items-center gap-1 px-2 text-[14px]" style={{ color: INK }}>
                  {t("Account", "Cuenta")}
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>
                {menu === "account" && (
                  <div className="absolute top-full right-0 pt-px">
                    <div
                      className="w-56 py-2 rounded-b-xl"
                      style={{ background: "#FFFFFF", border: `1px solid ${LINE}`, borderTop: "none", boxShadow: "0 18px 40px -18px rgba(0,0,0,0.18)" }}
                    >
                      {accountLinks.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          className="block px-4 py-2.5 text-[14px] transition-colors hover:bg-black/[0.03]"
                          style={{ color: INK }}
                          onClick={() => setMenu(null)}
                        >
                          {l.label}
                        </Link>
                      ))}
                      <div className="px-4 pt-2 mt-1" style={{ borderTop: `1px solid ${LINE}` }}>
                        <UserButton />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <SignInButton mode="redirect">
                <button className="hidden md:block px-2 text-[14px] transition-colors hover:text-[#111111]" style={{ color: MUTED }}>
                  {t("Sign in", "Iniciar sesión")}
                </button>
              </SignInButton>
            )}

            <button
              onClick={openCart}
              className="relative w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
              style={{ color: INK }}
              aria-label={t("Cart", "Carrito")}
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {totalItems > 0 && (
                <span
                  className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-semibold flex items-center justify-center"
                  style={{ background: "#0A84FF", color: "#FFFFFF" }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              href="/shop"
              className="hidden lg:flex items-center h-10 px-5 ml-1 rounded-full text-[14px] font-medium transition-opacity hover:opacity-90"
              style={{ background: INK, color: "#FFFFFF" }}
            >
              {t("Shop now", "Comprar")}
            </Link>

            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
              style={{ color: INK }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden" style={{ background: "#F5F4F0", borderTop: `1px solid ${LINE}` }}>
            <div className="px-5 sm:px-8 py-2">
              {[{ href: "/shop", label: t("Shop all", "Toda la tienda") }, ...links].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3.5 text-[16px]"
                  style={{ color: INK, borderBottom: `1px solid ${LINE}` }}
                >
                  {l.label}
                </Link>
              ))}

              <p className="pt-5 pb-2 text-xs" style={{ color: MUTED }}>
                {t("Compound classes", "Clases de compuesto")}
              </p>
              <div className="grid grid-cols-2 gap-x-4">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.label}
                    href={`/shop?category=${encodeURIComponent(c.label)}`}
                    onClick={() => setMobileOpen(false)}
                    className="py-2.5 text-[14px]"
                    style={{ color: MUTED }}
                  >
                    {lang === "es" ? c.label_es : c.label}
                  </Link>
                ))}
              </div>

              <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${LINE}` }}>
                {isSignedIn ? (
                  accountLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-[15px]"
                      style={{ color: INK }}
                    >
                      {l.label}
                    </Link>
                  ))
                ) : (
                  <SignInButton mode="redirect">
                    <button className="block py-3 text-[15px]" style={{ color: INK }} onClick={() => setMobileOpen(false)}>
                      {t("Sign in", "Iniciar sesión")}
                    </button>
                  </SignInButton>
                )}
              </div>

              <div className="flex items-center gap-4 py-4 text-[14px]">
                {(["en", "es"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{ color: lang === l ? INK : "#9A9AA0", fontWeight: lang === l ? 600 : 400 }}
                  >
                    {l === "en" ? "English" : "Español"}
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
