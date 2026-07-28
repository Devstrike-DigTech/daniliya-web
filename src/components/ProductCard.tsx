import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImage from "@/components/ProductImage";
import type { ProductCardDto } from "@/lib/api";
import { naira } from "@/lib/format";

/**
 * Catalogue card, fed by GET /products.
 *
 * Dropped versus the old dummy-data design, because the API has no field for
 * them and inventing values would misrepresent the catalogue:
 *  - `badge`    ("Best Seller" etc.)  — no equivalent API field.
 *  - `oldPrice` (struck-through compare-at price) — no equivalent API field.
 * The chip now carries the product's real `category` instead of the old
 * hardcoded "Digital"/"Marketplace" label.
 */
export default function ProductCard({
  product,
  tone = "light",
}: {
  product: ProductCardDto;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  // Prices arrive from the API as decimal strings.
  const price = Number(product.price);

  return (
    <div className="group">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-[10/11] overflow-hidden rounded-2xl bg-white"
      >
        <ProductImage
          src={product.image}
          alt={product.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-ink shadow-sm">
            Out of stock
          </span>
        )}
      </Link>
      <div className="mt-4">
        {product.category && (
          <span
            className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-bold ${
              dark
                ? "border border-white/20 bg-white/[0.06] text-white/85"
                : "bg-brand/15 text-brand"
            }`}
          >
            {product.category}
          </span>
        )}
        <Link href={`/shop/${product.slug}`} className="mt-2.5 block">
          <p className={`text-[17px] font-bold leading-snug ${dark ? "text-white" : ""}`}>
            {product.title}
          </p>
        </Link>
        {product.blurb && (
          <p
            className={`mt-1 line-clamp-2 text-[13px] leading-relaxed ${
              dark ? "text-white/55" : "text-ink/60"
            }`}
          >
            {product.blurb}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="flex items-baseline gap-1.5">
            {product.fromPrice && (
              <span className={`text-[12px] font-bold uppercase tracking-wide ${dark ? "text-white/45" : "text-ink/40"}`}>
                from
              </span>
            )}
            <span className={`text-[17px] font-bold ${dark ? "text-white" : ""}`}>
              {naira(price)}
            </span>
          </p>
          <AddToCartButton
            productId={product.id}
            slug={product.slug}
            inStock={product.inStock}
            hasSizes={product.fromPrice}
          />
        </div>
      </div>
    </div>
  );
}
