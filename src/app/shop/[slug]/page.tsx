import type { Metadata } from "next";
import Ambient from "@/components/Ambient";
import Icon from "@/components/Icon";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductBuyBox from "@/components/ProductBuyBox";
import ProductReviews, { type ProductReviews as ProductReviewsData } from "@/components/ProductReviews";
import ProductGallery from "@/components/ProductGallery";
import { apiFetchSafe, type Paginated, type ProductCardDto, type ProductDetailDto } from "@/lib/api";
import { naira } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

/**
 * Always render against live data. Products are created/published from the admin
 * at runtime, so a slug must be resolved on every request — otherwise the CDN
 * can cache a 404 for a product that is added moments later and keep serving it.
 * No `generateStaticParams` for the same reason: slugs live in the API.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await apiFetchSafe<ProductDetailDto>(`/products/${encodeURIComponent(slug)}`);
  return { title: product ? product.title : "Product" };
}

const trust = [
  { icon: "truck", text: "Nationwide delivery via verified couriers" },
  { icon: "wallet", text: "Paystack secure checkout — Naira" },
  { icon: "check", text: "Affiliate referrals tracked automatically" },
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  // The API 404s anything that is not an ACTIVE product.
  const product = await apiFetchSafe<ProductDetailDto>(`/products/${encodeURIComponent(slug)}`);
  if (!product) notFound();

  // "Similar" = same category. There is no recommendations endpoint, so this is
  // an honest category query rather than a curated list.
  const related = product.category
    ? await apiFetchSafe<Paginated<ProductCardDto>>(
        `/products?category=${encodeURIComponent(product.category)}&limit=4`,
      )
    : null;
  const similar = (related?.data ?? []).filter((p) => p.slug !== product.slug).slice(0, 3);

  // Public — reviews render for everyone, signed in or not.
  const reviews = await apiFetchSafe<ProductReviewsData>(`/products/${product.id}/reviews`);

  return (
    <>
      <Ambient theme="shop" />

      {/* Detail — dark band */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[1376px] px-4 pt-8 sm:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[15px] font-bold text-brand transition-opacity hover:opacity-80"
          >
            <Icon name="arrow-left" size={18} /> Go Back
          </Link>
        </div>
        <div className="mx-auto grid max-w-[1376px] items-center gap-12 px-4 pb-20 pt-8 sm:px-8 lg:grid-cols-2">
          <ProductGallery images={product.images} alt={product.title} />
          <div className="fade-up fade-up-1">
            <h1 className="text-[36px] font-bold leading-tight sm:text-[44px]">
              {product.title}
            </h1>
            <p className="mt-2 text-[14px] text-white/60">
              Sold by <span className="font-bold text-white/85">{product.vendor}</span>
              {product.category && <> · {product.category}</>}
            </p>
            <p className="mt-3 text-[32px] font-bold text-brand">
              {naira(Number(product.price))}
            </p>
            {/* Rendered only when the API actually has copy for this product. */}
            {product.description && (
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/70">
                {product.description}
              </p>
            )}

            <p className="mt-4 text-[14px] font-bold">
              {product.inStock ? (
                <span className="text-brand">
                  In stock
                  {product.stockQuantity > 0 && (
                    <span className="font-normal text-white/60">
                      {" "}
                      · {product.stockQuantity} available
                    </span>
                  )}
                </span>
              ) : (
                <span className="text-white/60">Out of stock</span>
              )}
            </p>

            <ProductBuyBox
              productId={product.id}
              slug={product.slug}
              price={Number(product.price)}
              inStock={product.inStock}
              stockQuantity={product.stockQuantity}
              variantType={product.variantType}
              variants={product.variants}
            />

            <div className="mt-8 space-y-3 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              {trust.map((t) => (
                <p
                  key={t.text}
                  className="flex items-center gap-3 text-[14px] text-white/85"
                >
                  <Icon name={t.icon} size={18} className="text-brand" />
                  {t.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductReviews data={reviews} />

      {/* Similar products — omitted entirely when the category has no siblings. */}
      {similar.length > 0 && (
        <section className="bg-[#121212] text-white">
          <div className="mx-auto max-w-[1376px] px-4 py-20 sm:px-8">
            <h2 className="text-center text-[28px] font-bold sm:text-[34px]">
              Similar Products
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} tone="dark" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
