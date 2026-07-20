import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import ServiceQuoteForm from "@/components/ServiceQuoteForm";
import { apiFetchSafe, type ServiceDto } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Industrial cleaning and fumigation under your brand — get a tailored quote within 24 hours.",
};

export default async function ServicesPage() {
  // Which services exist, and which are actually taking work, comes from the
  // API so operations can switch one off without a deploy.
  const services = (await apiFetchSafe<ServiceDto[]>("/services")) ?? [];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink text-center text-white">
        <div className="pinstripes absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-[1376px] px-4 py-16 sm:px-8 lg:py-24">
          <p className="fade-up text-[13px] font-bold uppercase tracking-[0.35em] text-brand">
            What we offer
          </p>
          <h1 className="fade-up fade-up-1 mt-4 text-[44px] font-bold leading-none tracking-tight sm:text-[64px] lg:text-[80px]">
            OUR SERVICES.
          </h1>
        </div>
      </section>

      {/* Quote section */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1376px] items-start gap-12 px-4 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <Reveal>
            <div className="relative min-h-[420px] overflow-hidden rounded-2xl border-l-4 border-brand lg:sticky lg:top-24 lg:min-h-[640px]">
              <Image
                src="/images/verticals/laundry/hero.jpg"
                alt="Daniliya industrial cleaning"
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ServiceQuoteForm services={services} />
          </Reveal>
        </div>
      </section>

      {/* Laundry — coming soon */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1376px] px-4 py-16 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-ink text-white">
            <div className="pinstripes absolute inset-0 opacity-40" aria-hidden />
            <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold text-brand">
                  <Icon name="clock" size={13} /> Coming soon
                </span>
                <h2 className="mt-5 text-[32px] font-bold leading-tight sm:text-[42px]">
                  Laundry done{" "}
                  <span className="italic text-brand">right.</span>
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75">
                  Premium pickup-and-delivery laundry and dry cleaning is on the
                  way. Join the waitlist and we&apos;ll let you know the moment
                  it launches in your area.
                </p>
                <span className="mt-7 inline-flex cursor-default items-center gap-2 rounded-xl bg-white/10 px-7 py-3.5 text-[15px] font-bold text-white/80">
                  <Icon name="clock" size={16} /> Coming Soon
                </span>
              </div>
              <div className="relative hidden min-h-[240px] overflow-hidden rounded-2xl lg:block">
                <Image
                  src="/images/verticals/dry-cleaning/hero.jpg"
                  alt="Daniliya laundry"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
