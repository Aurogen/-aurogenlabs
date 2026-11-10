import type { Metadata } from "next";
import { Shield } from "lucide-react";
import T from "@/components/T";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Aurogen Labs Privacy Policy. Learn how we collect, use, and protect your personal information.",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { title: "1. Information We Collect", content: `When you place an order or create an account, we collect personal information such as your name, email address, shipping address, and purchase history. We also collect non-personal data such as browser type, IP address, and pages visited to improve our website experience.`, titleEs: "1. Información que recopilamos", contentEs: `Cuando usted realiza un pedido o crea una cuenta, recopilamos información personal como su nombre, dirección de correo electrónico, dirección de envío e historial de compras. También recopilamos datos no personales, como el tipo de navegador, la dirección IP y las páginas visitadas, para mejorar la experiencia en nuestro sitio web.` },
  { title: "2. How We Use Your Information", content: `We use your information to process and fulfill orders, communicate with you about your purchases, send order confirmations and shipping updates, improve our website and product offerings, and comply with legal obligations. We do not sell, rent, or trade your personal information to third parties.`, titleEs: "2. Cómo usamos su información", contentEs: `Usamos su información para procesar y completar pedidos, comunicarnos con usted sobre sus compras, enviar confirmaciones de pedido y actualizaciones de envío, mejorar nuestro sitio web y nuestra oferta de productos, y cumplir con obligaciones legales. No vendemos, alquilamos ni intercambiamos su información personal con terceros.` },
  { title: "3. Cookies and Tracking", content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience, remember your cart contents, and analyze site traffic. You may disable cookies in your browser settings, though some features of our website may not function properly as a result.`, titleEs: "3. Cookies y seguimiento", contentEs: `Nuestro sitio web utiliza cookies y tecnologías de seguimiento similares para mejorar su experiencia de navegación, recordar el contenido de su carrito y analizar el tráfico del sitio. Puede desactivar las cookies en la configuración de su navegador, aunque, como consecuencia, es posible que algunas funciones de nuestro sitio web no funcionen correctamente.` },
  { title: "4. Data Storage and Security", content: `Your data is stored securely using industry-standard encryption and security practices. While we take all reasonable precautions to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee the absolute security of your data.`, titleEs: "4. Almacenamiento y seguridad de los datos", contentEs: `Sus datos se almacenan de forma segura mediante cifrado y prácticas de seguridad estándar de la industria. Si bien tomamos todas las precauciones razonables para proteger su información, ningún método de transmisión por internet es 100% seguro. No podemos garantizar la seguridad absoluta de sus datos.` },
  { title: "5. Third-Party Services", content: `We may use third-party services for payment processing, shipping, and analytics. These providers are contractually bound to keep your information confidential and use it only for the services they provide on our behalf. They have their own privacy policies which we encourage you to review.`, titleEs: "5. Servicios de terceros", contentEs: `Podemos utilizar servicios de terceros para el procesamiento de pagos, el envío y el análisis. Estos proveedores están obligados contractualmente a mantener la confidencialidad de su información y a usarla únicamente para los servicios que prestan en nuestro nombre. Cuentan con sus propias políticas de privacidad, que le recomendamos revisar.` },
  { title: "6. Data Retention", content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal requirements, resolve disputes, and enforce our agreements. You may request deletion of your account and associated data at any time by contacting us.`, titleEs: "6. Conservación de los datos", contentEs: `Conservamos su información personal durante el tiempo que sea necesario para cumplir con los fines descritos en esta política, cumplir con requisitos legales, resolver disputas y hacer cumplir nuestros acuerdos. Puede solicitar la eliminación de su cuenta y de los datos asociados en cualquier momento comunicándose con nosotros.` },
  { title: "7. Your Rights", content: `You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, please contact us. We will respond to your request within 30 days.`, titleEs: "7. Sus derechos", contentEs: `Usted tiene derecho a acceder a su información personal, corregirla o eliminarla. También puede optar por dejar de recibir comunicaciones de marketing en cualquier momento. Para ejercer estos derechos, comuníquese con nosotros. Responderemos a su solicitud dentro de un plazo de 30 días.` },
  { title: "8. Children's Privacy", content: `Our website is not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors. If you believe we have collected information from a minor, please contact us immediately and we will take steps to delete it.`, titleEs: "8. Privacidad de menores", contentEs: `Nuestro sitio web no está dirigido a personas menores de 18 años. No recopilamos a sabiendas información personal de menores. Si cree que hemos recopilado información de un menor, comuníquese con nosotros de inmediato y tomaremos medidas para eliminarla.` },
  { title: "9. Changes to This Policy", content: `We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date. Continued use of our website after changes are posted constitutes your acceptance of the revised policy.`, titleEs: "9. Cambios a esta política", contentEs: `Podemos actualizar esta Política de Privacidad periódicamente. Los cambios se publicarán en esta página con una fecha de vigencia actualizada. El uso continuado de nuestro sitio web después de la publicación de los cambios constituye su aceptación de la política revisada.` },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#F6F6F8" }}>
      <div className="max-w-3xl mx-auto">

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.18)" }}
            >
              <Shield className="w-5 h-5" style={{ color: "#6B7A8D" }} />
            </div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#6E6E73" }}>
              Legal
            </span>
          </div>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            <T en="Privacy Policy" es="Política de Privacidad" />
          </h1>
          <T
            en={null}
            es={
              <p className="text-sm mb-2 italic" style={{ color: "#6E6E73" }}>
                Esta es una traducción de cortesía. En caso de discrepancia, prevalece la versión en inglés.
              </p>
            }
          />
          <p className="text-sm" style={{ color: "#9E9EA8" }}>
            <T en="Effective date: July 1, 2025" es="Fecha de vigencia: 1 de julio de 2025" />
          </p>
          <p className="text-sm mt-4 leading-relaxed" style={{ color: "#6E6E73" }}>
            <T
              en="At Aurogen Labs, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information."
              es="En Aurogen Labs, nos comprometemos a proteger su privacidad. Esta política explica cómo recopilamos, usamos y protegemos su información personal."
            />
          </p>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div
              key={s.title}
              className="pb-8 last:pb-0"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h2
                className="font-bold text-lg mb-3"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
              >
                <T en={s.title} es={s.titleEs} />
              </h2>
              <p className="leading-relaxed text-sm" style={{ color: "#6E6E73" }}>
                <T en={s.content} es={s.contentEs} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
