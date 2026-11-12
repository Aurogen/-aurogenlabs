import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";
import T from "./T";

const LINKS = [
  {
    title: "Shop",
    title_es: "Tienda",
    links: [
      { label: "All Products", label_es: "Todos los productos", href: "/shop" },
      { label: "GLP-1 Receptor Agonists", label_es: "Agonistas de GLP-1", href: "/shop?category=GLP-1%20Receptor%20Agonists" },
      { label: "Growth Hormone Axis", label_es: "Eje de la GH", href: "/shop?category=Growth%20Hormone%20Axis" },
      { label: "Reagents", label_es: "Reactivos", href: "/shop?category=Reagents" },
    ],
  },
  {
    title: "Research",
    title_es: "Investigación",
    links: [
      { label: "Protocols", label_es: "Protocolos", href: "/protocols" },
      { label: "Research Center", label_es: "Centro de investigación", href: "/research" },
      { label: "Reconstitution Guide", label_es: "Guía de reconstitución", href: "/research#reconstitution" },
      { label: "Quality Standards", label_es: "Estándares de calidad", href: "/quality" },
    ],
  },
  {
    title: "Company",
    title_es: "Empresa",
    links: [
      { label: "About Us", label_es: "Quiénes somos", href: "/about" },
      { label: "Quality & Testing", label_es: "Calidad y análisis", href: "/quality" },
      { label: "Become a Partner", label_es: "Hazte socio", href: "/affiliates" },
      { label: "Contact", label_es: "Contacto", href: "/contact" },
    ],
  },
  {
    title: "Support",
    title_es: "Soporte",
    links: [
      { label: "FAQ", label_es: "Preguntas frecuentes", href: "/faq" },
      { label: "Shipping & Returns", label_es: "Envíos y devoluciones", href: "/shipping" },
      { label: "Refund Policy", label_es: "Política de reembolso", href: "/refund" },
      { label: "Privacy Policy", label_es: "Política de privacidad", href: "/privacy" },
      { label: "Terms of Service", label_es: "Términos del servicio", href: "/terms" },
      { label: "Disclaimer", label_es: "Aviso legal", href: "/disclaimer" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      {/* Newsletter */}
      <div className="py-12 px-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-white font-medium text-2xl mb-1" style={{ fontFamily: "var(--font-heading, sans-serif)" }}>
              <T en="Stay in the loop" es="Mantente al día" />
            </h3>
            <p className="text-gray-500 text-sm">
              <T
                en="New compounds, lab guides and restock notices. No spam."
                es="Nuevos compuestos, guías de laboratorio y avisos de reposición. Sin spam."
              />
            </p>
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
              <Logo height={38} variant="dark" />
            </Link>
            <p className="text-gray-500 text-xs leading-relaxed mb-4 max-w-xs mx-auto lg:mx-0">
              <T
                en="Research peptides and reagents with a third-party Certificate of Analysis for every lot."
                es="Péptidos y reactivos de investigación con un Certificado de Análisis externo para cada lote."
              />
            </p>
          </div>

          {/* Nav columns */}
          {LINKS.map(({ title, title_es, links }) => (
            <div key={title}>
              <h4 className="text-white font-bold text-xs tracking-widest mb-4 uppercase">
                <T en={title} es={title_es} />
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-500 hover:text-gray-200 text-sm transition-colors">
                      <T en={link.label} es={link.label_es} />
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
          <p>
            <T en="© 2026 Aurogen Labs · All rights reserved." es="© 2026 Aurogen Labs · Todos los derechos reservados." />
          </p>
          <div className="flex items-center gap-4">
            <span
              className="px-2.5 py-1 rounded text-[10px] tracking-[0.12em] uppercase font-medium"
              style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.6)" }}
            >
              <T
                en="For Research Use Only · Not for Human Consumption"
                es="Solo para investigación · No apto para consumo humano"
              />
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shipping" className="hover:text-gray-300 transition-colors"><T en="Shipping" es="Envíos" /></Link>
            <Link href="/refund" className="hover:text-gray-300 transition-colors"><T en="Refund" es="Reembolsos" /></Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors"><T en="Privacy" es="Privacidad" /></Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors"><T en="Terms" es="Términos" /></Link>
            <Link href="/disclaimer" className="hover:text-gray-300 transition-colors"><T en="Disclaimer" es="Aviso legal" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
