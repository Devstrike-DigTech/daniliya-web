"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { useCart } from "@/components/CartContext";

/** Adds one of `slug` to the cart with a brief "Added" confirmation. */
export default function AddToCartButton({ slug }: { slug: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => {
        add(slug, 1);
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
