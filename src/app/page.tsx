import Image from "next/image";
import Link from "next/link";
import SectionTag from "@/components/SectionTag";
import Btn from "@/components/Btn";
import ProductCard from "@/components/ProductCard";
import { products, testimonials } from "@/lib/data";

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

      {/* Hero image — breaks out of the dark band */}
      <div className="bg-[linear-gradient(to_bottom,var(--color-ink)_0,var(--color-ink)_168px,transparent_168px)] pt-14">
        <div className="mx-auto max-w-[1376px] px-4 sm:px-8">
          <div className="relative aspect-[1360/530] min-h-[220px] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/home/hero.jpg"
              alt="Daniliya premium home services"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* One brand, infinite possibilities */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1376px] items-center gap-14 px-4 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
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
          </div>

          {/* Fanned photo cards + gold arcs */}
          <div className="relative mx-auto h-[420px] w-full max-w-[480px] sm:h-[500px]">
            <svg
              aria-hidden
              viewBox="0 0 220 110"
              className="absolute -bottom-6 left-2 w-56 text-brand"
              fill="none"
            >
              <path
                d="M10 110a100 100 0 0 1 200 0"
                stroke="currentColor"
                strokeOpacity="0.5"
              />
              <path
                d="M30 110a80 80 0 0 1 160 0"
                stroke="currentColor"
                strokeOpacity="0.35"
              />
              <path
                d="M50 110a60 60 0 0 1 120 0"
                stroke="currentColor"
                strokeOpacity="0.2"
              />
            </svg>
            <div
              aria-hidden
              className="absolute left-0 top-12 h-[300px] w-[220px] -rotate-[14deg] rounded-2xl bg-teal/25 sm:h-[360px] sm:w-[260px]"
            />
            <div className="absolute left-14 top-6 h-[320px] w-[230px] -rotate-[6deg] overflow-hidden rounded-2xl shadow-lg sm:h-[390px] sm:w-[280px]">
              <Image
                src="/images/home/possibilities-2.jpg"
                alt="Daniliya at work"
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
            <div className="absolute right-0 top-0 h-[360px] w-[260px] rotate-[3deg] overflow-hidden rounded-2xl shadow-xl sm:h-[440px] sm:w-[320px]">
              <Image
                src="/images/home/possibilities-1.jpg"
                alt="The Daniliya standard"
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
          </div>
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
                      {card.cta} <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share a link. Get paid Monday. */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1376px] items-center gap-14 px-4 py-24 sm:px-8 lg:grid-cols-2">
          <div>
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
          </div>

          {/* Avatar collage */}
          <div className="relative mx-auto hidden h-[480px] w-full max-w-[480px] lg:block">
            <div
              aria-hidden
              className="absolute left-[88px] top-[150px] h-28 w-24 bg-[radial-gradient(circle,var(--color-brand)_1.5px,transparent_1.5px)] [background-size:14px_14px]"
            />
            <div
              aria-hidden
              className="absolute left-[270px] top-[260px] h-40 w-40 rounded-2xl bg-cream"
            />
            {/* center portrait */}
            <span className="absolute left-[150px] top-[110px] block h-[250px] w-[250px] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/avatars/avatar-1.jpg"
                alt="Daniliya affiliate"
                fill
                sizes="250px"
                className="object-cover"
              />
            </span>
            {/* satellites */}
            {[
              { src: 2, cls: "left-[210px] top-[15px] h-20 w-20" },
              { src: 3, cls: "left-[55px] top-[55px] h-[72px] w-[72px]" },
              { src: 4, cls: "right-[55px] top-[70px] h-20 w-20" },
              { src: 5, cls: "right-[30px] top-[200px] h-[76px] w-[76px]" },
              { src: 6, cls: "left-[20px] top-[250px] h-[84px] w-[84px]" },
              { src: 7, cls: "left-[170px] bottom-[30px] h-20 w-20" },
              { src: 8, cls: "left-[280px] top-[280px] h-[88px] w-[88px]" },
            ].map((a) => (
              <span
                key={a.src}
                className={`absolute block overflow-hidden rounded-2xl shadow-md ${a.cls}`}
              >
                <Image
                  src={`/images/avatars/avatar-${a.src}.jpg`}
                  alt=""
                  fill
                  sizes="90px"
                  className="object-cover"
                />
              </span>
            ))}
          </div>
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
            {products.slice(0, 3).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="overflow-hidden bg-paper py-24">
        <h2 className="text-center text-[36px] font-bold sm:text-[36px]">
          Nigerians who chose <span className="text-brand">Daniliya</span>
        </h2>
        <div className="mt-12 space-y-6">
          {[0, 1].map((row) => (
            <div
              key={row}
              className={`flex gap-6 overflow-x-auto px-4 lg:overflow-visible lg:px-0 ${
                row === 0 ? "lg:-ml-40" : "lg:-ml-10"
              }`}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <figure
                  key={`${t.name}-${i}`}
                  className="relative w-[440px] shrink-0 rounded-[20px] bg-coal p-7 text-white"
                >
                  <div
                    className="flex gap-1 text-[15px] text-brand"
                    aria-hidden
                  >
                    {"★★★★★"}
                  </div>
                  <blockquote className="mt-4 max-w-[300px] text-[17px] leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={`/images/avatars/avatar-${(i % 3) + 1}.jpg`}
                        alt={t.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                    <span>
                      <span className="block text-[15px] font-bold">
                        {t.name}
                      </span>
                      <span className="block text-xs text-white/50">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                  <span
                    aria-hidden
                    className="absolute bottom-4 right-7 font-serif text-[110px] leading-none text-white"
                  >
                    &rdquo;
                  </span>
                </figure>
              ))}
            </div>
          ))}
        </div>
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

          <div className="py-12 lg:py-14">
            <p className="flex items-center gap-2 text-sm font-bold text-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
              </svg>
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
              Join Now <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
