import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import ProductImage from "@/components/ProductImage";
import ShopCatalogue from "@/components/ShopCatalogue";
import { apiFetchSafe, type Paginated, type ProductCardDto } from "@/lib/api";

/** GET /products/featured-book — the admin-designated Builder's Handbook. */
type FeaturedBook = {
  slug: string;
  title: string;
  description: string | null;
  price: string;
  images: string[];
  status: string;
  available: boolean;
};

export const metadata: Metadata = {
  title: "Book & Shop",
  description:
    "Shop the Daniliya catalogue — the Builder's Handbook, curated bundles and more.",
};

const STRIPE =
  "repeating-linear-gradient(45deg, var(--color-brand) 0 9px, var(--color-ink) 9px 18px)";
const avatars = ["avatar-1", "avatar-2", "avatar-3"];

const PAGE_SIZE = 24; // GET /products caps `limit` at 60.

type Props = {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const category = sp.category?.trim() ?? "";
  const page = Math.max(1, Number(sp.page) || 1);

  const query = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) });
  if (q) query.set("q", q);
  if (category) query.set("category", category);

  const [listing, categories, book] = await Promise.all([
    apiFetchSafe<Paginated<ProductCardDto>>(`/products?${query}`),
    apiFetchSafe<string[]>("/products/categories"),
    apiFetchSafe<FeaturedBook>("/products/featured-book"),
  ]);

  // A featured book can be buyable, present-but-unavailable (draft/out of stock),
  // or not set at all — the hero renders a different CTA for each.
  const bookHref = book?.available ? `/shop/${book.slug}` : "/shop";

  const products = listing?.data ?? [];
  const meta = listing?.meta;

  return (
    <div className="bg-[#0c0c0c]">
      {/* Book hero */}
      <section className="relative overflow-hidden bg-[#0c0c0c] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="relative mx-auto grid max-w-[1376px] items-center gap-10 px-4 py-14 sm:px-8 lg:grid-cols-2 lg:py-20">
          {/* Left */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex -space-x-3">
                {avatars.map((a) => (
                  <span
                    key={a}
                    className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-[#0c0c0c]"
                  >
                    <Image src={`/images/avatars/${a}.jpg`} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                ))}
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0c0c0c] bg-brand text-[11px] font-bold text-ink">
                  3M+
                </span>
              </div>
              <span className="text-[15px] text-white/85">Active Reads</span>
            </div>

            <h1 className="mt-7 text-[clamp(40px,6vw,72px)] font-extrabold uppercase leading-[0.95] tracking-tight">
              {book ? book.title : "Builder's Handbook"}
            </h1>
            {book?.description ? (
              <p className="mx-auto mt-6 max-w-md text-[15.5px] leading-relaxed text-white/70 lg:mx-0">
                {book.description}
              </p>
            ) : (
              !book && (
                <p className="mx-auto mt-6 max-w-md text-[15.5px] leading-relaxed text-white/60 lg:mx-0">
                  The Builder&apos;s Handbook isn&apos;t available yet — check back
                  soon.
                </p>
              )
            )}

            {book && book.available ? (
              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link
                  href={`/shop/${book.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-[15px] font-bold text-ink transition-opacity hover:opacity-90"
                >
                  <Icon name="wallet" size={16} /> Buy Now
                </Link>
                <Link
                  href={`/shop/${book.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-brand px-8 py-4 text-[15px] font-bold text-brand transition-colors hover:bg-brand/10"
                >
                  <Icon name="package" size={16} /> Gift &amp; Package
                </Link>
              </div>
            ) : (
              <div className="mt-8 flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-[15px] font-bold text-white/60">
                  <Icon name="clock" size={16} /> Currently unavailable
                </span>
              </div>
            )}
          </div>

          {/* Book cover + badges */}
          <div className="relative mx-auto h-[380px] w-full max-w-[460px] sm:h-[480px]">
            <div aria-hidden className="absolute inset-x-8 bottom-0 top-10 rounded-3xl bg-white/[0.04]" />
            <div
              aria-hidden
              className="absolute -bottom-2 right-6 z-0 h-24 w-24 overflow-hidden rounded-full opacity-90"
              style={{ background: STRIPE }}
            />
            <Link
              href={bookHref}
              className="float-slow relative z-10 mx-auto block h-full w-[68%] overflow-hidden rounded-xl shadow-2xl"
            >
              <ProductImage
                src={book?.images[0] ?? null}
                alt={book?.title ?? "Builder's Handbook"}
                sizes="320px"
                priority
              />
            </Link>
            {/* The old "Best Seller" badge was dropped: the API exposes no sales
                rank or badge field, so it would have been a decorative claim. */}
            <span className="absolute right-0 top-24 z-20 inline-flex items-center gap-2 rounded-2xl bg-coal px-3.5 py-2 text-[13px] font-bold text-white shadow-lg">
              <Icon name="truck" size={15} className="text-brand" /> Nationwide{" "}
              <span className="text-brand">Delivery</span>
            </span>
          </div>
        </div>
      </section>

      {/* The Store */}
      <section className="bg-[#121212]">
        <div className="mx-auto max-w-[1376px] px-4 py-20 sm:px-8">
          <p className="flex items-center gap-2.5 text-lg text-brand">
            <span aria-hidden className="h-px w-6 bg-brand" />
            The Store
          </p>
          <h2 className="mt-4 text-[34px] font-bold text-white sm:text-[44px]">
            Shop our catalogue.
          </h2>
          <p className="mt-2 text-[15px] text-white/65">
            Curated products from Daniliya and trusted Nigerian vendors.
          </p>
          <ShopCatalogue
            products={products}
            categories={categories ?? []}
            q={q}
            category={category}
            page={meta?.page ?? 1}
            pages={meta?.pages ?? 1}
            total={meta?.total ?? 0}
            tone="dark"
          />
        </div>
      </section>
    </div>
  );
}
