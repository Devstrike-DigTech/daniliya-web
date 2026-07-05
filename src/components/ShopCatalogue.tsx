"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import type { Product } from "@/lib/data";

const CHIPS = ["All", "Digital", "Marketplace"] as const;

/** The Store toolbar + grid — working search, category filter and price sort. */
export default function ShopCatalogue({
  products,
  tone = "light",
}: {
  products: Product[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const [chip, setChip] = useState<(typeof CHIPS)[number]>("All");
  const [query, setQuery] = useState("");
  const [ascending, setAscending] = useState(true);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => chip === "All" || p.chip === chip)
      .filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.blurb.toLowerCase().includes(q),
      )
      .sort((a, b) => (ascending ? a.price - b.price : b.price - a.price));
  }, [products, chip, query, ascending]);

  return (
    <div>
      {/* Toolbar */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label
          className={`flex min-w-[220px] flex-1 items-center gap-2.5 rounded-full px-5 py-3 ${
            dark ? "border border-white/15 bg-white/[0.04]" : "border border-ink/15 bg-white"
          }`}
        >
          <Icon name="search" size={16} className={dark ? "text-white/40" : "text-ink/40"} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className={`w-full bg-transparent text-sm outline-none ${
              dark ? "text-white placeholder:text-white/35" : "placeholder:text-ink/35"
            }`}
          />
        </label>
        {CHIPS.map((c) => (
          <button
            key={c}
            onClick={() => setChip(c)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              chip === c
                ? "bg-brand text-ink"
                : "border border-brand/40 text-brand hover:border-brand"
            }`}
          >
            {c}
          </button>
        ))}
        <button
          onClick={() => setAscending(!ascending)}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
            dark
              ? "border border-white/15 bg-white/[0.04] text-white hover:border-white/40"
              : "border border-ink/15 bg-white hover:border-ink/40"
          }`}
        >
          <Icon name="sort" size={14} />
          Price: {ascending ? "low to High" : "high to Low"}
        </button>
      </div>

      {/* Grid */}
      {list.length === 0 ? (
        <p className={`mt-14 text-center text-sm ${dark ? "text-white/50" : "text-ink/50"}`}>
          No products match &ldquo;{query}&rdquo; — try a different search.
        </p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={`${chip}-${query}-${ascending}-${p.slug}`} delay={i * 90}>
              <ProductCard product={p} tone={tone} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
