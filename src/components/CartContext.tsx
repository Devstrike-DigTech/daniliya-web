"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * The cart lives in the browser so shopping never requires an account. Only the
 * identity and quantity of a line are stored; title, price and availability are
 * re-read from the API on every load, so a stale localStorage cart can never
 * show an out-of-date price or resurrect a delisted product. The order total is
 * computed server-side at checkout regardless — this is display only.
 */
export type CartLine = {
  productId: string;
  slug: string;
  /** The chosen size, when the product has sizes. */
  variantId?: string | null;
  variantName?: string | null;
  qty: number;
  giftWrap?: boolean;
};

export type CartItem = CartLine & {
  /** Stable per-line key: a product+size pair is one line, distinct from the
   *  same product in another size. */
  key: string;
  title: string;
  price: number;
  image: string | null;
  inStock: boolean;
};

/** A product in two sizes is two lines; the same product+size is one. */
export const lineKey = (productId: string, variantId?: string | null) =>
  variantId ? `${productId}::${variantId}` : productId;

const STORAGE_KEY = "daniliya-cart-v2";

type CartValue = {
  items: CartItem[];
  /** Lines whose product no longer resolves — surfaced, never silently dropped. */
  unavailable: CartLine[];
  /** True while prices are being re-read from the API. */
  resolving: boolean;
  count: number;
  subtotal: number;
  ready: boolean;
  add: (line: Omit<CartLine, "qty"> & { qty?: number }) => void;
  setQty: (key: string, qty: number) => void;
  setGiftWrap: (key: string, giftWrap: boolean) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartCtx = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [resolved, setResolved] = useState<Map<string, CartItem>>(new Map());
  const [ready, setReady] = useState(false);
  // True while re-pricing. Without this, every line would read as "unavailable"
  // for the duration of the fetch and flash a false warning.
  const [resolving, setResolving] = useState(false);

  // Hydrate from localStorage after mount (avoids an SSR mismatch). This is the
  // sanctioned "read once from an external system" case for an effect — the
  // store cannot be read during render because it does not exist on the server.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* a corrupt cart is not worth crashing the site over */
    }
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, ready]);

  // Re-price every line against the live catalogue whenever the cart changes.
  useEffect(() => {
    // Nothing to re-price. The stale map is left alone deliberately: `items` is
    // derived from `lines`, so entries for removed products are never read.
    if (!ready || lines.length === 0) return;
    let cancelled = false;
    // Flags that a fetch against an external system is in flight — the case the
    // rule exempts, but it cannot see through the async IIFE below.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResolving(true);

    (async () => {
      const entries = await Promise.all(
        lines.map(async (line) => {
          try {
            const res = await fetch(`/api/products/${line.slug}`);
            if (!res.ok) return null;
            const p = await res.json();
            const key = lineKey(line.productId, line.variantId);
            // For a sized line, price/stock/name come from the chosen size.
            const variant = line.variantId
              ? (p.variants ?? []).find((v: { id: string }) => v.id === line.variantId)
              : null;
            if (line.variantId && !variant) return null; // size gone → unavailable
            const title = variant
              ? `${p.title} — ${variant.name}`
              : (p.title as string);
            return [
              key,
              {
                ...line,
                key,
                title,
                price: Number(variant ? variant.price : p.price),
                image: (p.images?.[0] as string) ?? null,
                inStock: variant ? Boolean(variant.inStock) : Boolean(p.inStock),
              },
            ] as const;
          } catch {
            return null;
          }
        }),
      );
      if (cancelled) return;
      setResolved(new Map(entries.filter((e): e is NonNullable<typeof e> => e !== null)));
      setResolving(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [lines, ready]);

  const add = useCallback((line: Omit<CartLine, "qty"> & { qty?: number }) => {
    const qty = line.qty ?? 1;
    const key = lineKey(line.productId, line.variantId);
    setLines((prev) => {
      const found = prev.find((l) => lineKey(l.productId, l.variantId) === key);
      if (found) {
        return prev.map((l) =>
          lineKey(l.productId, l.variantId) === key
            ? { ...l, qty: l.qty + qty, giftWrap: line.giftWrap ?? l.giftWrap }
            : l,
        );
      }
      return [...prev, { ...line, qty }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (lineKey(l.productId, l.variantId) === key ? { ...l, qty: Math.max(0, qty) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const setGiftWrap = useCallback((key: string, giftWrap: boolean) => {
    setLines((prev) => prev.map((l) => (lineKey(l.productId, l.variantId) === key ? { ...l, giftWrap } : l)));
  }, []);

  const remove = useCallback(
    (key: string) => setLines((prev) => prev.filter((l) => lineKey(l.productId, l.variantId) !== key)),
    [],
  );

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartValue>(() => {
    const items = lines
      .map((l) => resolved.get(lineKey(l.productId, l.variantId)))
      .filter((x): x is CartItem => x !== undefined);
    // Only claim a line is gone once re-pricing has actually finished.
    const unavailable = resolving
      ? []
      : lines.filter((l) => !resolved.has(lineKey(l.productId, l.variantId)));

    return {
      items,
      unavailable,
      resolving,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: items.reduce((s, i) => s + i.price * i.qty, 0),
      ready,
      add,
      setQty,
      setGiftWrap,
      remove,
      clear,
    };
  }, [lines, resolved, resolving, ready, add, setQty, setGiftWrap, remove, clear]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
