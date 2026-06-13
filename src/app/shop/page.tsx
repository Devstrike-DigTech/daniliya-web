import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTag from "@/components/SectionTag";
import Ambient from "@/components/Ambient";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Icon from "@/components/Icon";
import ShopCatalogue from "@/components/ShopCatalogue";
import { products } from "@/lib/data";
import { naira } from "@/lib/format";

export const metadata: Metadata = {
  title: "Book & Shop",
  description:
    "Shop the Daniliya catalogue — the book, curated bundles and more.",
};

// Book stats per the design — pending client confirmation
const bookStats = [
  { value: "240", label: "Pages" },
  { value: "12", label: "Chapters" },
  { value: "4.9", label: "Rating", static: true },
];

export default function ShopPage() {
  const book = products[0];

  return (
    <>
      <Ambient theme="shop" />

      {/* Book hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pinstripes absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-[1376px] items-center gap-12 px-4 py-16 sm:px-8 lg:grid-cols-2 lg:py-20">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ink" />
              Now Available
            </span>
            <h1 className="mt-6 text-[40px] font-bold leading-[1.02] tracking-tight sm:text-[56px]">
              THE DANILIYA
              <br />
              <span className="text-brand">METHOD.</span>
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
              {book.blurb}
            </p>
            <p className="mt-7 text-[48px] font-bold leading-none sm:text-[56px]">
              {naira(book.price)}
            </p>
            <div className="mt-9 flex gap-12">
              {bookStats.map((s) => (
                <div key={s.label}>
                  <span aria-hidden className="block h-0.5 w-10 bg-brand" />
                  {s.static ? (
                    <p className="mt-3 flex items-center gap-1 text-[26px] font-bold leading-none text-brand">
                      <Icon name="star" size={22} />
                      {s.value}
                    </p>
                  ) : (
                    <CountUp
                      value={s.value}
                      className="mt-3 text-[26px] font-bold leading-none text-brand"
                    />
                  )}
                  <p className="mt-2 text-sm text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Book cover on gold backing panel */}
          <div className="fade-up fade-up-1 relative mx-auto w-full max-w-[430px]">
            <div
              aria-hidden
              className="absolute -bottom-8 -right-6 left-1/4 top-1/3 rounded-3xl bg-brand/25"
            />
            <div
              aria-hidden
              className="absolute -right-2 bottom-2 z-20 h-16 w-16 rounded-full bg-[repeating-linear-gradient(135deg,var(--color-brand)_0,var(--color-brand)_4px,transparent_4px,transparent_9px)]"
            />
            <Link
              href={`/shop/${book.slug}`}
              className="float-slow relative z-10 block aspect-[3/4] overflow-hidden rounded-xl shadow-2xl"
            >
              <Image
                src={book.image}
                alt={book.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 430px"
                className="object-cover"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* The Store */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1376px] px-4 py-24 sm:px-8">
          <Reveal>
            <SectionTag>The Store</SectionTag>
            <h2 className="mt-5 text-[34px] font-bold leading-tight sm:text-[40px]">
              Shop our <span className="text-brand">catalogue.</span>
            </h2>
            <p className="mt-3 text-[15px] text-ink/60">
              Curated products from Daniliya and trusted Nigerian vendors.
            </p>
          </Reveal>
          <ShopCatalogue products={products} />
        </div>
      </section>

      {/* Sell via the network */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1376px] items-center gap-14 px-4 py-24 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <SectionTag>For Entrepreneurs</SectionTag>
            <h2 className="mt-5 text-[34px] font-bold leading-tight sm:text-[40px]">
              Sell via the
              <br />
              Daniliya <span className="text-brand">network.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/75">
              List your products on our marketplace and have Daniliya&apos;s
              entire affiliate and influencer network market them for you. No
              upfront cost.
            </p>
            <ul className="mt-6 space-y-3.5">
              {[
                "Access to thousands of active affiliates promoting your product",
                "Influencer campaigns with real conversion tracking",
                "Full vendor dashboard: orders, revenue, commission breakdown",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 text-[15px] font-bold"
                >
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand"
                  />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15px] font-bold text-ink transition-opacity hover:opacity-90"
              >
                Apply as a Vendor <Icon name="arrow-right" size={15} />
              </Link>
            </div>
          </Reveal>

          {/* Vendor portrait grid */}
          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-5">
              {[5, 6, 7, 8].map((i, n) => (
                <div
                  key={i}
                  className={`relative aspect-square overflow-hidden rounded-2xl ${
                    n % 3 === 0
                      ? "bg-brand/25"
                      : n % 2 === 0
                        ? "bg-teal/15"
                        : "bg-coal/10"
                  }`}
                >
                  <Image
                    src={`/images/avatars/avatar-${i}.jpg`}
                    alt="Daniliya vendor"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
