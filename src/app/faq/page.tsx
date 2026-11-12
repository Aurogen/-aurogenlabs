"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";
import { FLAT_SHIPPING, FREE_SHIPPING_MIN } from "@/lib/shipping";

const CATEGORIES = [
  {
    category: "Products & Quality",
    category_es: "Productos y calidad",
    items: [
      { q: "What purity level are your peptides?", q_es: "¿Qué nivel de pureza tienen sus péptidos?", a_es: "Todos los péptidos de Aurogen Labs se fabrican con una pureza mínima del 98%, verificada mediante análisis HPLC de un laboratorio externo. Cada lote incluye un Certificado de Análisis (COA) disponible en la página del producto.", a: "All Aurogen Labs peptides are manufactured to a minimum of 98% purity, verified by third-party HPLC analysis. Each batch comes with a Certificate of Analysis (COA) available on the product page." },
      { q: "How are the compounds stored?", q_es: "¿Cómo se almacenan los compuestos?", a_es: "Los péptidos liofilizados deben almacenarse a -20 °C (congelador) en un recipiente hermético, protegidos de la luz y la humedad. Una vez reconstituidos, guárdalos a 2–8 °C (refrigerador) y úsalos dentro de los 30 días. Sigue siempre las pautas de almacenamiento de la página del producto.", a: "Lyophilized peptides should be stored at -20°C (freezer) in an airtight container away from light and moisture. Once reconstituted, store at 2–8°C (refrigerator) and use within 30 days. Always follow the storage guidelines on the product page." },
      { q: "Do your products come with a Certificate of Analysis?", q_es: "¿Sus productos incluyen un Certificado de Análisis?", a_es: "Sí. Cada producto tiene un COA específico del lote, disponible con el botón 'Ver COA' en la página del producto. El COA incluye datos de pureza por HPLC, verificación del peso molecular y resultados de espectrometría de masas.", a: "Yes. Every product has a batch-specific COA available via the 'View COA' button on the product page. The COA includes HPLC purity data, molecular weight verification, and mass spectrometry results." },
      { q: "Are your peptides synthesized in the US?", q_es: "¿Sus péptidos se sintetizan en EE. UU.?", a_es: "Sí. Todos los compuestos se sintetizan y se someten a control de calidad en nuestras instalaciones en EE. UU., siguiendo estrictos protocolos cercanos a GMP.", a: "Yes. All compounds are synthesized and quality-tested in our US-based facility, following strict GMP-adjacent protocols." },
    ],
  },
  {
    category: "Orders & Payment",
    category_es: "Pedidos y pagos",
    items: [
      { q: "What payment methods do you accept?", q_es: "¿Qué métodos de pago aceptan?", a_es: "Aceptamos las principales tarjetas de crédito y débito (Visa, Mastercard, American Express), procesadas de forma segura por nuestro socio de pagos. Las transacciones están cifradas de extremo a extremo y los datos de tu tarjeta nunca se guardan en nuestros servidores.", a: "We accept all major credit and debit cards (Visa, Mastercard, American Express) processed securely through our payment partner. Transactions are encrypted end-to-end and your card details are never stored on our servers." },
      { q: "Can I modify or cancel my order?", q_es: "¿Puedo modificar o cancelar mi pedido?", a_es: "Puedes modificar o cancelar tu pedido dentro de la primera hora después de realizarlo, contactando a nuestro equipo de soporte. Pasado ese tiempo, los pedidos entran en nuestra cola de preparación y ya no se pueden cambiar.", a: "Orders can be modified or cancelled within 1 hour of placement by contacting our support team. After that, orders enter our fulfillment queue and cannot be changed." },
      { q: "Is my payment information secure?", q_es: "¿Mi información de pago está segura?", a_es: "Sí. Todo el procesamiento de pagos lo realizan sistemas de pago cifrados conforme a los estándares de la industria. No guardamos los datos completos de tu tarjeta de crédito en nuestros servidores.", a: "Yes. All payment processing is handled by industry-standard encrypted payment systems. We do not store your full credit card details on our servers." },
    ],
  },
  {
    category: "Shipping",
    category_es: "Envíos",
    items: [
      { q: "How long does shipping take?", q_es: "¿Cuánto tarda el envío?", a_es: `La entrega tarda de 2 a 5 días hábiles dentro de EE. UU. por UPS. El envío cuesta $${FLAT_SHIPPING.toFixed(2)} y es gratis en compras de $${FREE_SHIPPING_MIN} o más. Los pedidos realizados antes de las 2:00 PM (hora del Este, EST) normalmente se envían el mismo día.`, a: `Delivery takes 2–5 business days within the US via UPS. Shipping is $${FLAT_SHIPPING.toFixed(2)}, and free on orders of $${FREE_SHIPPING_MIN} or more. Orders placed before 2:00 PM EST typically ship the same day.` },
      { q: "Do you ship outside the United States?", q_es: "¿Hacen envíos fuera de Estados Unidos?", a_es: "Por ahora solo enviamos dentro de Estados Unidos. Los envíos internacionales están previstos para una actualización futura.", a: "We currently ship within the United States only. International shipping is planned for a future update." },
      { q: "How are peptides packaged for shipping?", q_es: "¿Cómo se empacan los péptidos para el envío?", a_es: "Los péptidos liofilizados se envían en viales sellados con desecantes y acolchado para evitar roturas. Todo el empaque es discreto y no hace referencia al contenido en el exterior.", a: "Lyophilized peptides are shipped in sealed vials with desiccants and padding to prevent breakage. All packaging is discreet and does not reference the contents on the exterior." },
    ],
  },
  {
    category: "Research & Usage",
    category_es: "Investigación y uso",
    items: [
      { q: "Are your products approved for human use?", q_es: "¿Sus productos están aprobados para uso humano?", a_es: "No. Todos los productos se venden estrictamente para investigación in vitro y de laboratorio. No están aprobados por la FDA para consumo humano, uso terapéutico ni uso veterinario.", a: "No. All products are sold strictly for in vitro and laboratory research purposes. They are not approved by the FDA for human consumption, therapeutic, or veterinary use." },
      { q: "Do you offer research protocols?", q_es: "¿Ofrecen protocolos de investigación?", a_es: "Sí. Nuestra Biblioteca de Protocolos contiene guías de manejo en laboratorio sobre reconstitución, almacenamiento y estabilidad, interpretación del COA y verificación analítica.", a: "Yes. Our Protocols Library contains laboratory handling guides covering reconstitution, storage and stability, COA interpretation and analytical verification." },
      { q: "Where can I find reconstitution instructions?", q_es: "¿Dónde encuentro las instrucciones de reconstitución?", a_es: "Las guías de reconstitución están disponibles en nuestro Centro de Investigación. Ahí encontrarás instrucciones paso a paso para cada compuesto de nuestro catálogo, incluidos los volúmenes recomendados y los procedimientos de manejo.", a:  "Reconstitution guides are available in our Research Center. Step-by-step instructions for every compound in our catalog are provided there, including recommended volumes and handling procedures." },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer"
      style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-5 py-4 gap-4">
        <p className="font-medium text-sm" style={{ color: "#1D1D1F" }}>{q}</p>
        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "#6B7A8D" }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          transition: "grid-template-rows 250ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease-out",
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div className="px-5 pb-4 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>{a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen" style={{ background: "#F4F3EF" }}>
      <PageHero
        eyebrow={t("Support", "Soporte")}
        title={t("Frequently Asked Questions", "Preguntas frecuentes")}
        subtitle={
          <>
            {t("Can't find what you're looking for?", "¿No encuentras lo que buscas?")}{" "}
            <Link href="/contact" className="underline hover:opacity-70" style={{ color: "#FFFFFF" }}>
              {t("Contact our team", "Contacta a nuestro equipo")}
            </Link>.
          </>
        }
      />
      <div className="max-w-3xl mx-auto px-4 pt-12 pb-16">

        <div className="space-y-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.category}>
              <h2
                className="font-medium text-lg mb-4 pb-2"
                style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
              >
                {t(cat.category, cat.category_es)}
              </h2>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <FaqItem key={item.q} q={t(item.q, item.q_es)} a={t(item.a, item.a_es)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
