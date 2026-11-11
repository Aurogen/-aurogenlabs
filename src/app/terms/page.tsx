import type { Metadata } from "next";
import { Scale } from "lucide-react";
import T from "@/components/T";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Aurogen Labs Terms of Use. All products are for research purposes only and not intended for human consumption.",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { title: "1. Research Use Only", content: `All products sold by Aurogen Labs are intended exclusively for laboratory and scientific research purposes. These compounds are not approved by the FDA for human or veterinary use and are not intended for human consumption, therapeutic use, or any medical application. By purchasing from Aurogen Labs, you acknowledge and agree to this restriction.`, titleEs: "1. Solo para uso en investigación", contentEs: `Todos los productos vendidos por Aurogen Labs están destinados exclusivamente a fines de investigación científica y de laboratorio. Estos compuestos no están aprobados por la FDA para uso humano ni veterinario y no están destinados al consumo humano, al uso terapéutico ni a ninguna aplicación médica. Al comprar en Aurogen Labs, usted reconoce y acepta esta restricción.` },
  { title: "2. Eligibility", content: `You must be at least 18 years of age to purchase from Aurogen Labs. By placing an order, you represent that you are a qualified researcher, scientist, or professional with the appropriate facilities and knowledge to handle research-grade chemical compounds safely.`, titleEs: "2. Requisitos de elegibilidad", contentEs: `Debe tener al menos 18 años de edad para comprar en Aurogen Labs. Al realizar un pedido, usted declara que es un investigador, científico o profesional calificado que cuenta con las instalaciones y los conocimientos adecuados para manipular de forma segura compuestos químicos de grado de investigación.` },
  { title: "3. Orders and Payment", content: `All orders are subject to availability and confirmation. Aurogen Labs reserves the right to refuse or cancel any order at its sole discretion. Prices are listed in USD and are subject to change without notice. We are not responsible for typographical errors in pricing or product descriptions.`, titleEs: "3. Pedidos y pagos", contentEs: `Todos los pedidos están sujetos a disponibilidad y confirmación. Aurogen Labs se reserva el derecho de rechazar o cancelar cualquier pedido a su exclusiva discreción. Los precios se indican en USD y están sujetos a cambios sin previo aviso. No nos hacemos responsables de errores tipográficos en los precios o en las descripciones de los productos.` },
  { title: "4. Shipping and Delivery", content: `We ship within the United States only. Estimated delivery times are 2–5 business days from order confirmation. Aurogen Labs is not responsible for delays caused by carriers, customs, or circumstances beyond our control. Risk of loss transfers to the buyer upon delivery to the carrier.`, titleEs: "4. Envío y entrega", contentEs: `Realizamos envíos únicamente dentro de los Estados Unidos. Los tiempos de entrega estimados son de 2 a 5 días hábiles a partir de la confirmación del pedido. Aurogen Labs no se hace responsable de los retrasos causados por los transportistas, las aduanas o circunstancias ajenas a nuestro control. El riesgo de pérdida se transfiere al comprador en el momento de la entrega al transportista.` },
  { title: "5. Returns and Refunds", content: `Due to the nature of research chemicals, all sales are final. We do not accept returns. In the event of a product defect, shipping damage, or incorrect item received, please contact us within 7 days of delivery with photographic evidence. Approved claims will be resolved with a replacement or store credit at our discretion.`, titleEs: "5. Devoluciones y reembolsos", contentEs: `Debido a la naturaleza de los productos químicos de investigación, todas las ventas son definitivas. No aceptamos devoluciones. En caso de defecto del producto, daños durante el envío o recepción de un artículo incorrecto, comuníquese con nosotros dentro de los 7 días posteriores a la entrega con evidencia fotográfica. Los reclamos aprobados se resolverán mediante un reemplazo o un crédito en la tienda, a nuestra discreción.` },
  { title: "6. Limitation of Liability", content: `Aurogen Labs shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or misuse of our products. Our total liability shall not exceed the amount paid for the specific product giving rise to the claim. You assume full responsibility for the safe handling, storage, and use of all purchased compounds.`, titleEs: "6. Limitación de responsabilidad", contentEs: `Aurogen Labs no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o mal uso de nuestros productos. Nuestra responsabilidad total no excederá el monto pagado por el producto específico que dé lugar al reclamo. Usted asume la plena responsabilidad por la manipulación, el almacenamiento y el uso seguros de todos los compuestos adquiridos.` },
  { title: "7. Intellectual Property", content: `All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Aurogen Labs and is protected by applicable intellectual property laws. Unauthorized reproduction or distribution is strictly prohibited.`, titleEs: "7. Propiedad intelectual", contentEs: `Todo el contenido de este sitio web, incluidos, entre otros, textos, gráficos, logotipos, imágenes y software, es propiedad de Aurogen Labs y está protegido por las leyes de propiedad intelectual aplicables. Queda estrictamente prohibida su reproducción o distribución no autorizada.` },
  { title: "8. Governing Law", content: `These Terms of Use shall be governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law provisions. Any disputes shall be resolved exclusively in the courts of Miami-Dade County, Florida.`, titleEs: "8. Ley aplicable", contentEs: `Estos Términos de Uso se regirán e interpretarán de conformidad con las leyes del Estado de Florida, Estados Unidos, sin tener en cuenta sus disposiciones sobre conflicto de leyes. Cualquier disputa se resolverá exclusivamente en los tribunales del condado de Miami-Dade, Florida.` },
  { title: "9. Changes to Terms", content: `Aurogen Labs reserves the right to update these Terms of Use at any time. Changes will be posted on this page with an updated effective date. Continued use of our website following any changes constitutes your acceptance of the revised terms.`, titleEs: "9. Cambios a los términos", contentEs: `Aurogen Labs se reserva el derecho de actualizar estos Términos de Uso en cualquier momento. Los cambios se publicarán en esta página con una fecha de vigencia actualizada. El uso continuado de nuestro sitio web después de cualquier cambio constituye su aceptación de los términos revisados.` },
  { title: "10. Contact", content: `For questions regarding these Terms of Use, please contact us through our Contact page. We will respond to inquiries within 2 business days.`, titleEs: "10. Contacto", contentEs: `Si tiene preguntas sobre estos Términos de Uso, comuníquese con nosotros a través de nuestra página de Contacto. Responderemos a las consultas dentro de un plazo de 2 días hábiles.` },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#F5F4F0" }}>
      <div className="max-w-3xl mx-auto">

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(22,38,74,0.08)", border: "1px solid rgba(22,38,74,0.18)" }}
            >
              <Scale className="w-5 h-5" style={{ color: "#6B7A8D" }} />
            </div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#6E6E73" }}>
              Legal
            </span>
          </div>
          <h1
            className="text-4xl font-medium mb-3"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            <T en="Terms of Use" es="Términos de Uso" />
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
          <div
            className="mt-6 p-4 rounded-xl text-sm"
            style={{ background: "rgba(22,38,74,0.04)", border: "1px solid rgba(22,38,74,0.15)", color: "#16264A" }}
          >
            <T
              en={<><strong>Important:</strong> All products are sold for research purposes only. Not for human consumption.</>}
              es={<><strong>Importante:</strong> Todos los productos se venden únicamente para fines de investigación. No aptos para el consumo humano.</>}
            />
          </div>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div
              key={s.title}
              className="pb-8 last:pb-0"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
            >
              <h2
                className="font-medium text-lg mb-3"
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
