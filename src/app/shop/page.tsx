import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTag from "@/components/SectionTag";
import ProductCard from "@/components/ProductCard";
import { products, productCategories } from "@/lib/data";
import { naira } from "@/lib/format";

export const metadata: Metadata = {
  title: "Book & Shop",
  description:
    "Shop the Daniliya catalogue — the book, curated bundles and more.",
};

export default function ShopPage() {
  const book = products[0];

  return (
    <>
      {/* Book hero */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-20">
          <div>
            <SectionTag>Featured</SectionTag>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
              THE DANILIYA <span className="text-brand">METHOD.</span>
            </h1>
            <p className="mt-5 max-w-lg text-white/60">{book.description}</p>
            <div className="mt-8 flex items-center gap-8">
              <p className="text-3xl font-bold text-brand">{naira(book.price)}</p>
              <div className="text-sm text-white/60">
                <p>
                  <span className="font-bold text-white">240</span> pages
                </p>
                <p>
                  <span className="font-bold text-white">★ 4.9</span> rating
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/shop/${book.slug}`}
                className="rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-ink transition-opacity hover:opacity-90"
              >
                Buy the Book
              </Link>
              <Link
                href="/affiliates"
                className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold transition-colors hover:border-brand hover:text-brand"
              >
                Sell it & earn
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl">
            <Image
              src={book.image}
              alt={book.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTag>The shop</SectionTag>
        <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
          Shop our <span className="text-gold">catalogue.</span>
        </h2>
        <p className="mt-3 max-w-lg text-ink/60">
          Curated products from Daniliya and trusted Nigerian vendors.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {productCategories.map((cat, i) => (
            <span
              key={cat}
              className={`rounded-full px-5 py-2 text-sm font-bold ${
                i === 0
                  ? "bg-ink text-brand"
                  : "border border-ink/15 text-ink/60"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Sell via the network */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionTag>For sellers</SectionTag>
            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
              Sell via the <span className="text-gold">Daniliya network.</span>
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-ink/60">
              List your products on Daniliya and put hundreds of verified
              affiliates and influencers to work for your brand. You set the
              price, we handle attribution and weekly settlement.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                "Access to thousands of active affiliates promoting your products",
                "Influencer campaigns with full attribution tracking",
                "Full vendor dashboard with orders, revenue and settlement reports",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs text-ink">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-brand transition-opacity hover:opacity-90"
            >
              Become a Vendor
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-2xl"
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
        </div>
      </section>
    </>
  );
}
