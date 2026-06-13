import Image from "next/image";
import Link from "next/link";
import SectionTag from "@/components/SectionTag";
import Btn from "@/components/Btn";
import Icon from "@/components/Icon";
import ProductCard from "@/components/ProductCard";
import Ambient from "@/components/Ambient";
import Reveal from "@/components/Reveal";
import HeroSlideshow from "@/components/HeroSlideshow";
import PossibilitiesStack from "@/components/PossibilitiesStack";
import AffiliateOrbit from "@/components/AffiliateOrbit";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import { products } from "@/lib/data";

const serviceCards = [
  {
    title: "Cleaning Services",
    text: "Office, residential, fumigation and laundry, request a quote in under 60 seconds",
    image: "/images/home/service-laundry.jpg",
    cta: "Book a Service",
    href: "/services/laundry",
  },
  {
    title: "Daniliya Dry Cleaning",
    chip: "Coming soon",
    text: "Office, residential, fumigation and laundry, request a quote in under 60 seconds",
    image: "/images/home/service-dry-cleaning.jpg",
    cta: "Get Early Access",
    href: "/services/dry-cleaning",
  },
];

export default function HomePage() {
  return (
    <>
      <Ambient theme="home" />
      {/* Hero */}
      <section className="relative bg-ink text-white">
        <div className="pinstripes absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-[1376px] px-4 sm:px-8">
          <div className="grid gap-10 pt-12 lg:grid-cols-2 lg:gap-80 lg:pt-16">
            {/* Left — kicker + headline */}
            <div className="text-center lg:text-left">
              <p className="text-[13px] font-bold uppercase tracking-[0.35em] text-brand">
                Nigeria&apos;s Premier Service Platform
              </p>
              <h1 className="mt-5 text-[40px] font-bold leading-[0.98] tracking-tight sm:text-[64px] lg:text-[72px]">
                <span className="whitespace-nowrap">
                  PREMIUM <span className="text-brand">SERVICES,</span>
                </span>
                <br />
                ONE HOME.
              </h1>
            </div>

            {/* Right — verified affiliates + copy + CTAs */}
            <div className="text-center lg:pt-2 lg:text-left">
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <div className="flex items-center">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="relative -ml-3 h-12 w-12 overflow-hidden rounded-full border-2 border-ink first:ml-0"
                    >
                      <Image
                        src={`/images/avatars/avatar-${i}.jpg`}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                  <span className="-ml-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-[13px] font-bold text-ink">
                    3M+
                  </span>
                </div>
                <p className="text-left text-[15px] font-bold leading-tight text-brand">
                  Verified
                  <br />
                  Affiliates
                </p>
              </div>
              <p className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-white lg:mx-0">
                Laundry and Dry cleaning. And an affiliate income system that
                pays every Monday — all under one roof.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Btn href="/services" variant="gold">
                  Explore Services
                </Btn>
                <Btn href="/affiliates" variant="outline-light">
                  Earn with Us
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero image — breaks out of the dark band, crossfading slideshow */}
      <div className="bg-[linear-gradient(to_bottom,var(--color-ink)_0,var(--color-ink)_168px,transparent_168px)] pt-14">
        <div className="mx-auto max-w-[1376px] px-4 sm:px-8">
          <HeroSlideshow />
        </div>
      </div>

      {/* One brand, infinite possibilities */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1376px] items-center gap-14 px-4 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <SectionTag>About Daniliya</SectionTag>
            <h2 className="mt-5 text-[36px] font-bold leading-tight sm:text-[40px]">
              One brand, infinite
              <br />
              <span className="text-brand">possibilities.</span>
            </h2>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink/75">
              Daniliya is a multi-vertical enterprise built on the belief that
              quality service and financial opportunity should be accessible to
              everyone in Nigeria.
            </p>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink/75">
              From spotless laundry to stunning interiors, from gripping
              literature to a proven affiliate income system, we&apos;ve built
              the platform that connects it all.
            </p>
            <div className="mt-8">
              <Btn href="/how-it-works" variant="gold" arrow>
                How it Works
              </Btn>
            </div>
          </Reveal>

          {/* Fanned photo cards + gold arcs — shuffles every few seconds */}
          <Reveal delay={150}>
            <PossibilitiesStack />
          </Reveal>
        </div>
      </section>

      {/* Every service, one destination */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1376px] px-4 py-24 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionTag>What we offer</SectionTag>
              <h2 className="mt-5 text-[42px] font-bold leading-tight sm:text-[40px]">
                Every service,
                <br />
                one <span className="text-brand">destination.</span>
              </h2>
            </div>
            <Btn href="/how-it-works" variant="gold" arrow>
              How it Works
            </Btn>
          </div>

          <Reveal>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {serviceCards.map((card) => (
              <div
                key={card.title}
                className="group relative h-[420px] overflow-hidden rounded-[20px] sm:h-[560px]"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="flex items-center gap-3 text-[24px] font-bold text-white">
                    {card.title}
                    {card.chip && (
                      <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white">
                        {card.chip}
                      </span>
                    )}
                  </p>
                  <p className="mt-2 max-w-md text-md leading-relaxed text-white/85">
                    {card.text}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    >
                      {card.cta} <Icon name="arrow-right" size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* Share a link. Get paid Monday. */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1376px] items-center gap-14 px-4 py-24 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <SectionTag>Affiliate programme</SectionTag>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="relative -ml-2.5 h-10 w-10 overflow-hidden rounded-full border-2 border-paper first:ml-0"
                  >
                    <Image
                      src={`/images/avatars/avatar-${i}.jpg`}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                ))}
                <span className="-ml-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-ink">
                  3M+
                </span>
              </div>
              <p className="text-xs font-bold leading-tight">
                Verified
                <br />
                Affiliates
              </p>
            </div>
            <h2 className="mt-6 text-[40px] font-bold leading-[1.15] sm:text-[54px]">
              Share a link.
              <br />
              <span className="text-brand">Get paid Monday.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink/80">
              Join 200+ affiliates to register, complete your KYC, pass the
              training assessment, get your unique link — and start earning on
              every sale.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Btn href="/affiliates" variant="gold" arrow>
                Join as Affiliate
              </Btn>
              <Btn href="/contact" variant="outline-gold" arrow>
                Join as Influencer
              </Btn>
            </div>
          </Reveal>

          {/* Avatar collage — satellites orbit the center portrait */}
          <Reveal delay={150}>
            <AffiliateOrbit />
          </Reveal>
        </div>
      </section>

      {/* Trending right now */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1376px] px-4 py-24 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionTag>Marketplace</SectionTag>
              <h2 className="mt-5 text-[34px] font-bold leading-tight sm:text-[40px]">
                Trending right <span className="text-brand">now</span>
              </h2>
            </div>
            <Btn href="/shop" variant="gold" arrow>
              See More Products
            </Btn>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 130}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="overflow-hidden bg-paper py-24">
        <h2 className="text-center text-[36px] font-bold sm:text-[36px]">
          Nigerians who chose <span className="text-brand">Daniliya</span>
        </h2>
        {/* opposite-direction marquee rows */}
        <TestimonialMarquee />
      </section>

      {/* Start earning CTA */}
      <section className="relative mt-36 bg-brand">
        {/* striped circle decorations */}
        <div
          aria-hidden
          className="absolute -left-10 top-6 h-24 w-24 rounded-full bg-[repeating-linear-gradient(135deg,#212121_0,#212121_5px,transparent_5px,transparent_11px)]"
        />
        <div
          aria-hidden
          className="absolute -bottom-0 right-0 h-20 w-20 overflow-hidden"
        >
          <div className="h-40 w-40 rounded-full bg-[repeating-linear-gradient(135deg,#212121_0,#212121_5px,transparent_5px,transparent_11px)]" />
        </div>

        <div className="mx-auto grid max-w-[1376px] grid-cols-1 items-center gap-8 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* cutout person — rises above the band */}
          <div className="relative hidden h-[300px] lg:block">
            <Image
              src="/images/home/cta-person.png"
              alt="Daniliya affiliate"
              width={300}
              height={450}
              className="absolute bottom-0 left-10 h-[440px] w-auto object-contain object-bottom"
            />
          </div>

          <Reveal className="py-12 lg:py-14">
            <p className="flex items-center gap-2 text-sm font-bold text-white">
              <Icon name="user" size={16} />
              Affiliate programme
            </p>
            <h2 className="mt-4 text-[34px] font-bold leading-tight text-white sm:text-[40px]">
              Start earning every
              <br />
              Monday.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white">
              Sign up, complete KYC, pass the short assessment, get your link.
              Weekly payouts. Real money, real Naira.
            </p>
            <Link
              href="/affiliates"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-coal px-10 py-4 text-[15px] font-bold text-white transition-opacity hover:opacity-90"
            >
              Join Now <Icon name="arrow-right" size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
