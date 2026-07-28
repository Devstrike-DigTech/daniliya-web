"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useCart } from "@/components/CartContext";

/**
 * Adds one of a product to the cart with a brief "Added" confirmation.
 * The cart keys lines by `productId` and re-prices them by `slug`, so both
 * identifiers have to come from the API record — never from a slug alone.
 */
export default function AddToCartButton({
  productId,
  slug,
  inStock = true,
  hasSizes = false,
}: {
  productId: string;
  slug: string;
  inStock?: boolean;
  /** Sized products can't be quick-added — a size must be chosen on the page. */
  hasSizes?: boolean;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (!inStock) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2.5 text-[13px] font-bold text-white/50">
        Out of stock
      </span>
    );
  }

  if (hasSizes) {
    return (
      <Link
        href={`/shop/${slug}`}
        className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
      >
        <Icon name="package" size={14} /> Choose size
      </Link>
    );
  }

  return (
    <button
      onClick={() => {
        add({ productId, slug, qty: 1 });
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
      }}
      className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
    >
      <Icon name={added ? "check" : "plus"} size={14} />
      {added ? "Added" : "Add to Cart"}
    </button>
  );
}
