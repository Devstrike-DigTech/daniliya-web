"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import type { ProductCardDto } from "@/lib/api";

/**
 * The Store toolbar + grid.
 *
 * Search and category filtering are driven through the URL and answered by the
 * API's own `q` / `category` query params — not by filtering a full client-side
 * dump — so results stay correct once the catalogue outgrows one page.
 *
 * Dropped versus the old dummy-data design: the "Price: low to high" sort
 * toggle. GET /products rejects unknown query params (400: "property sort
 * should not exist"), so the API cannot sort, and sorting only the current
 * page client-side would report the wrong cheapest/priciest product as soon as
 * there is more than one page. Restore it when the API gains a sort param.
 */
export default function ShopCatalogue({
  products,
  categories,
  q = "",
  category = "",
  page = 1,
  pages = 1,
  total = 0,
  basePath = "/shop",
  tone = "light",
}: {
  products: ProductCardDto[];
  categories: string[];
  q?: string;
  category?: string;
  page?: number;
  pages?: number;
  total?: number;
  /** Where the toolbar navigates. The home page sends shoppers to /shop. */
  basePath?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [draft, setDraft] = useState(q);

  // Keep the box in step with the URL (back/forward, or a chip that clears it).
  // Adjusted during render rather than in an effect — React's documented way to
  // reset state when a prop changes, and it avoids a second render pass.
  const [lastQ, setLastQ] = useState(q);
  if (q !== lastQ) {
    setLastQ(q);
    setDraft(q);
  }

  const hrefFor = (next: { q?: string; category?: string; page?: number }) => {
    const sp = new URLSearchParams();
    const nq = next.q ?? q;
    const nc = next.category ?? category;
    if (nq) sp.set("q", nq);
    if (nc) sp.set("category", nc);
    if (next.page && next.page > 1) sp.set("page", String(next.page));
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const go = (next: { q?: string; category?: string; page?: number }) =>
    startTransition(() => router.push(hrefFor(next)));

  const chips = ["All", ...categories];
  const activeChip = category || "All";

  return (
    <div>
      {/* Toolbar */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            go({ q: draft.trim(), page: 1 });
          }}
          className={`flex min-w-[220px] flex-1 items-center gap-2.5 rounded-full px-5 py-3 ${
            dark ? "border border-white/15 bg-white/[0.04]" : "border border-ink/15 bg-white"
          }`}
        >
          <Icon name="search" size={16} className={dark ? "text-white/40" : "text-ink/40"} />
          <input
            type="search"
            name="q"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className={`w-full bg-transparent text-sm outline-none ${
              dark ? "text-white placeholder:text-white/35" : "placeholder:text-ink/35"
            }`}
          />
        </form>
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => go({ category: c === "All" ? "" : c, page: 1 })}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              activeChip === c
                ? "bg-brand text-ink"
                : "border border-brand/40 text-brand hover:border-brand"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <p className={`mt-14 text-center text-sm ${dark ? "text-white/50" : "text-ink/50"}`}>
          {q || category
            ? "No products match that search — try a different term or category."
            : "No products are listed yet. Check back shortly."}
        </p>
      ) : (
        <div
          className={`mt-10 grid gap-8 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${
            pending ? "opacity-60" : ""
          }`}
        >
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} tone={tone} />
            </Reveal>
          ))}
        </div>
      )}

      {/* Pager — only appears once the catalogue outgrows a page. */}
      {pages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => go({ page: page - 1 })}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors disabled:opacity-35 ${
              dark ? "border border-white/15 text-white" : "border border-ink/15"
            }`}
          >
            Previous
          </button>
          <span className={`text-sm ${dark ? "text-white/60" : "text-ink/60"}`}>
            Page {page} of {pages} · {total} products
          </span>
          <button
            type="button"
            disabled={page >= pages}
            onClick={() => go({ page: page + 1 })}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors disabled:opacity-35 ${
              dark ? "border border-white/15 text-white" : "border border-ink/15"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
