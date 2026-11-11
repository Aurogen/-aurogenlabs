import type { Metadata } from "next";
import { Truck, Package, RotateCcw, Clock } from "lucide-react";
import { DELIVERY_DAYS, FLAT_SHIPPING, FREE_SHIPPING_MIN } from "@/lib/shipping";
import T from "@/components/T";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Aurogen Labs ships research peptides in 2–5 business days from our US facility. Learn about our shipping options and returns policy.",
};

const SHIPPING_OPTIONS = [
  {
    name: "Standard Shipping",
    name_es: "Envío estándar",
    time: `${DELIVERY_DAYS.min}–${DELIVERY_DAYS.max} Business Days`,
    time_es: `${DELIVERY_DAYS.min}–${DELIVERY_DAYS.max} días hábiles`,
    price: `$${FLAT_SHIPPING.toFixed(2)} · Free on orders $${FREE_SHIPPING_MIN}+`,
    price_es: `$${FLAT_SHIPPING.toFixed(2)} · Gratis en pedidos de $${FREE_SHIPPING_MIN}+`,
    carrier: "UPS",
  },
];

const FAQ = [
  { q: "When will my order ship?", q_es: "¿Cuándo se enviará mi pedido?", a_es: "Los pedidos realizados antes de las 2:00 PM (hora del Este, EST) en días hábiles normalmente se procesan y envían el mismo día. Los pedidos realizados después de las 2:00 PM o en fin de semana se envían el siguiente día hábil.", a: "Orders placed before 2:00 PM EST on business days are typically processed and shipped the same day. Orders placed after 2:00 PM or on weekends ship the next business day." },
  { q: "Do you ship internationally?", q_es: "¿Hacen envíos internacionales?", a_es: "Por ahora solo enviamos dentro de Estados Unidos. Los envíos internacionales no están disponibles en este momento.", a: "Currently we ship within the United States only. International shipping is not available at this time." },
  { q: "How are research compounds packaged?", q_es: "¿Cómo se empacan los compuestos de investigación?", a_es: "Todos los compuestos se envían en empaques adecuados a su temperatura, con desecantes cuando es necesario. Los péptidos liofilizados se envían a temperatura ambiente. Los viales se aseguran para evitar roturas durante el transporte.", a: "All compounds are shipped in temperature-appropriate packaging with desiccants as needed. Lyophilized peptides are shipped at ambient temperature. Vials are secured to prevent breakage during transit." },
  { q: "Can I track my order?", q_es: "¿Puedo rastrear mi pedido?", a_es: "Sí. Cuando tu pedido se envíe, recibirás un número de seguimiento por correo electrónico. También puedes ver el estado de tu pedido en el panel de tu cuenta.", a: "Yes. Once your order ships, you will receive a tracking number via email. You can also view your order status in your account dashboard." },
  { q: "What if my package arrives damaged?", q_es: "¿Qué pasa si mi paquete llega dañado?", a_es: "Toma fotos del daño de inmediato y contáctanos dentro de las 48 horas posteriores a la entrega. Gestionaremos un reemplazo o un reembolso para los envíos dañados.", a: "Please photograph the damage immediately and contact us within 48 hours of delivery. We will arrange a replacement or refund for damaged shipments." },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#F5F4F0" }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(22,38,74,0.08)", border: "1px solid rgba(22,38,74,0.18)" }}
            >
              <Truck className="w-5 h-5" style={{ color: "#6B7A8D" }} />
            </div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#6E6E73" }}>
              <T en="Shipping" es="Envíos" />
            </span>
          </div>
          <h1
            className="text-4xl font-medium mb-3"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            <T en="Shipping & Returns" es="Envíos y devoluciones" />
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}>
            <T
              en="We ship all orders from our US facility. Research compounds are carefully packaged to ensure integrity during transit."
              es="Enviamos todos los pedidos desde nuestras instalaciones en EE. UU. Los compuestos de investigación se empacan con cuidado para garantizar su integridad durante el transporte."
            />
          </p>
        </div>

        {/* Shipping options */}
        <div className="mb-12">
          <h2
            className="font-medium text-xl mb-5"
            style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
          >
            <T en="Shipping Options" es="Opciones de envío" />
          </h2>
          <div className="space-y-3">
            {SHIPPING_OPTIONS.map((opt) => (
              <div
                key={opt.name}
                className="p-5 rounded-2xl flex items-center gap-5"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(22,38,74,0.08)", border: "1px solid rgba(22,38,74,0.15)" }}
                >
                  <Clock className="w-5 h-5" style={{ color: "#6B7A8D" }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold" style={{ color: "#1D1D1F" }}><T en={opt.name} es={opt.name_es} /></p>
                  <p className="text-sm" style={{ color: "#6E6E73" }}>{opt.carrier} · <T en={opt.time} es={opt.time_es} /></p>
                </div>
                <span className="font-bold text-sm shrink-0" style={{ color: "#1B7A45" }}><T en={opt.price} es={opt.price_es} /></span>
              </div>
            ))}
          </div>
        </div>

        {/* Returns policy */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <RotateCcw className="w-5 h-5" style={{ color: "#6B7A8D" }} />
            <h2
              className="font-medium text-xl"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
            >
              <T en="Returns Policy" es="Política de devoluciones" />
            </h2>
          </div>
          <div
            className="p-5 rounded-2xl text-sm leading-relaxed"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", color: "#6E6E73" }}
          >
            <T
              en={<>
                <p className="mb-3">
                  Due to the sensitive nature of research compounds, <strong style={{ color: "#1D1D1F" }}>all sales are final</strong>. We do not accept returns or exchanges.
                </p>
                <p className="mb-3">
                  If you receive a defective product, incorrect item, or your order arrives damaged, please contact us within <strong style={{ color: "#1D1D1F" }}>7 days of delivery</strong> with:
                </p>
                <ul className="list-disc list-inside space-y-1 mb-3 pl-1">
                  <li>Your order number</li>
                  <li>Photos of the product and packaging</li>
                  <li>A description of the issue</li>
                </ul>
                <p>Approved claims will be resolved with a replacement shipment or store credit.</p>
              </>}
              es={<>
                <p className="mb-3">
                  Debido a la naturaleza delicada de los compuestos de investigación, <strong style={{ color: "#1D1D1F" }}>todas las ventas son finales</strong>. No aceptamos devoluciones ni cambios.
                </p>
                <p className="mb-3">
                  Si recibes un producto defectuoso, un artículo incorrecto o tu pedido llega dañado, contáctanos dentro de los <strong style={{ color: "#1D1D1F" }}>7 días posteriores a la entrega</strong> con:
                </p>
                <ul className="list-disc list-inside space-y-1 mb-3 pl-1">
                  <li>Tu número de pedido</li>
                  <li>Fotos del producto y del empaque</li>
                  <li>Una descripción del problema</li>
                </ul>
                <p>Los reclamos aprobados se resolverán con un envío de reemplazo o crédito en la tienda.</p>
              </>}
            />
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Package className="w-5 h-5" style={{ color: "#6B7A8D" }} />
            <h2
              className="font-medium text-xl"
              style={{ fontFamily: "var(--font-heading, sans-serif)", color: "#1D1D1F" }}
            >
              <T en="Frequently Asked Questions" es="Preguntas frecuentes" />
            </h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="p-5 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <p className="font-semibold mb-2 text-sm" style={{ color: "#1D1D1F" }}><T en={item.q} es={item.q_es} /></p>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6E73" }}><T en={item.a} es={item.a_es} /></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
