import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import type { Product } from "@/lib/data";
import { naira } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-[10/11] overflow-hidden rounded-2xl bg-white"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-ink shadow-sm">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="mt-4">
        <span className="inline-block rounded-full bg-brand/15 px-3.5 py-1.5 text-xs font-bold text-brand">
          {product.chip}
        </span>
        <Link href={`/shop/${product.slug}`} className="mt-2.5 block">
          <p className="text-[17px] font-bold leading-snug">{product.title}</p>
        </Link>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-ink/60">
          {product.blurb}
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="flex items-baseline gap-2">
            {product.oldPrice && (
              <span className="text-sm text-ink/40 line-through">
                {naira(product.oldPrice)}
              </span>
            )}
            <span className="text-[17px] font-bold">{naira(product.price)}</span>
          </p>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
          >
            <Icon name="plus" size={14} /> Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
