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
export type CartLine = { productId: string; slug: string; qty: number; giftWrap?: boolean };

export type CartItem = CartLine & {
  title: string;
  price: number;
  image: string | null;
  inStock: boolean;
};

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
  setQty: (productId: string, qty: number) => void;
  setGiftWrap: (productId: string, giftWrap: boolean) => void;
  remove: (productId: string) => void;
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
            return [
              line.productId,
              {
                ...line,
                title: p.title as string,
                price: Number(p.price),
                image: (p.images?.[0] as string) ?? null,
                inStock: Boolean(p.inStock),
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
    setLines((prev) => {
      const found = prev.find((l) => l.productId === line.productId);
      if (found) {
        return prev.map((l) =>
          l.productId === line.productId
            ? { ...l, qty: l.qty + qty, giftWrap: line.giftWrap ?? l.giftWrap }
            : l,
        );
      }
      return [...prev, { ...line, qty }];
    });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.productId === productId ? { ...l, qty: Math.max(0, qty) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const setGiftWrap = useCallback((productId: string, giftWrap: boolean) => {
    setLines((prev) => prev.map((l) => (l.productId === productId ? { ...l, giftWrap } : l)));
  }, []);

  const remove = useCallback(
    (productId: string) => setLines((prev) => prev.filter((l) => l.productId !== productId)),
    [],
  );

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartValue>(() => {
    const items = lines
      .map((l) => resolved.get(l.productId))
      .filter((x): x is CartItem => x !== undefined);
    // Only claim a line is gone once re-pricing has actually finished.
    const unavailable = resolving ? [] : lines.filter((l) => !resolved.has(l.productId));

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
