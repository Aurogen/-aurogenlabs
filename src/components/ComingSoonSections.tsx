import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MERCH_PREVIEW, SUPPLEMENTS_PREVIEW } from "@/data/coming-soon";
import LaunchNotifyForm from "./LaunchNotifyForm";

/**
 * Previews of lines that are not on sale yet. On the home page each section links to its own page;
 * on that page (`standalone`) it is the main content.
 */

function SoonBadge() {
  return (
    <span
      className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-semibold tracking-wide"
      style={{ background: "#111111", color: "#FFFFFF" }}
    >
      COMING SOON
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
  href,
  standalone,
}: {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  standalone?: boolean;
}) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 text-center md:text-left">
      <div>
        <p className="text-[13px] mb-2" style={{ color: "#6B6B6B" }}>{eyebrow}</p>
        <Heading
          className={standalone ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"}
          style={{ fontFamily: "var(--font-heading, serif)", color: "#111111", lineHeight: 1.05 }}
        >
          {title}
        </Heading>
        <p className="mt-3 text-[15px] max-w-xl mx-auto md:mx-0" style={{ color: "#55555A" }}>{text}</p>
      </div>
      {!standalone && (
        <Link href={href} className="inline-flex items-center justify-center gap-1.5 text-[14px] font-medium underline-offset-4 hover:underline" style={{ color: "#111111" }}>
          See all <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

export function SupplementsComingSoon({ standalone = false }: { standalone?: boolean }) {
  const items = standalone ? SUPPLEMENTS_PREVIEW : SUPPLEMENTS_PREVIEW.slice(0, 4);
  return (
    <section className="py-16 md:py-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <SectionHeader
          eyebrow="Coming soon"
          title="Protein & Supplements"
          text="A sports nutrition line from Aurogen is on the way. Leave your email and we'll let you know the day it launches."
          href="/supplements"
          standalone={standalone}
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {items.map((s) => (
            <div key={s.slug} className="rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div className="relative aspect-square" style={{ background: "#F2F1ED" }}>
                <Image src={s.image} alt={s.name} fill sizes="(max-width: 1023px) 50vw, 300px" className="object-cover" />
                <SoonBadge />
              </div>
              <div className="p-3 sm:p-4 text-center sm:text-left">
                <h3 className="font-semibold text-[14px] sm:text-[15px] leading-snug" style={{ color: "#111111" }}>{s.name}</h3>
                <p className="text-[12px] sm:text-[13px] mt-1" style={{ color: "#6B6B6B" }}>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center md:justify-start">
          <LaunchNotifyForm label="supplements" />
        </div>
      </div>
    </section>
  );
}

export function MerchComingSoon({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className="py-16 md:py-20" style={{ background: "#F5F4F0" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <SectionHeader
          eyebrow="Coming soon"
          title="Aurogen Merch"
          text="Heavyweight tees and fleece hoodies with the Aurogen mark. The first drop is in the works — get on the list to hear first."
          href="/merch"
          standalone={standalone}
        />

        {standalone && (
          <div className="relative overflow-hidden rounded-2xl mb-8 aspect-[16/9] md:aspect-[21/9]" style={{ background: "#16264A" }}>
            <Image
              src="/merch/signature-hoodie-lifestyle.webp"
              alt="Aurogen Signature Hoodie, worn"
              fill
              priority
              sizes="(max-width: 1279px) 100vw, 1200px"
              className="object-cover merch-kenburns"
              style={{ objectPosition: "50% 18%" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,16,32,0.72) 0%, rgba(10,16,32,0.25) 55%, rgba(10,16,32,0) 100%)" }} />
            <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 md:p-12 max-w-lg">
              <p className="text-[12px] tracking-[0.25em] mb-2" style={{ color: "#9DB8FF" }}>FIRST DROP</p>
              <p className="text-3xl md:text-5xl text-white" style={{ fontFamily: "var(--font-heading, serif)", lineHeight: 1.05 }}>
                Wear the lab.
              </p>
              <p className="mt-3 text-sm md:text-base" style={{ color: "rgba(255,255,255,0.8)" }}>Tees and hoodies — coming soon.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {MERCH_PREVIEW.map((m, i) => (
            <div key={m.slug} className="group rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div className="merch-flip relative aspect-square overflow-hidden" style={{ background: "#ECEAE6" }}>
                <Image src={m.lifestyle} alt={`${m.name}, worn`} fill sizes="(max-width: 639px) 100vw, 400px" className="merch-back object-cover" />
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 639px) 100vw, 400px"
                  className="merch-front object-cover"
                  style={{ animationDelay: `${i * 1.5}s` }}
                />
                <SoonBadge />
              </div>
              <div className="p-4 text-center sm:text-left">
                <h3 className="font-semibold text-[15px] leading-snug" style={{ color: "#111111" }}>{m.name}</h3>
                <p className="text-[13px] mt-1" style={{ color: "#6B6B6B" }}>{m.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center md:justify-start">
          <LaunchNotifyForm label="merch" />
        </div>
      </div>
    </section>
  );
}
