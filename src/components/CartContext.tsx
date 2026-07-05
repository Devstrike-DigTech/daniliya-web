"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products, type Product } from "@/lib/data";

type CartLine = { slug: string; qty: number };

// Seeded so the checkout/cart pages still demo well on a first visit.
// Clear it (or empty the cart in the UI) and it persists empty.
const SEED: CartLine[] = [
  { slug: "premium-laundry-starter-kit", qty: 1 },
  { slug: "executive-hygiene-bundle", qty: 1 },
];
const STORAGE_KEY = "daniliya-cart-v1";

type CartItem = { product: Product; qty: number };

type CartValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartCtx = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(SEED);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, ready]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug);
      if (found)
        return prev.map((l) =>
          l.slug === slug ? { ...l, qty: l.qty + qty } : l,
        );
      return [...prev, { slug, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.slug === slug ? { ...l, qty: Math.max(0, qty) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const remove = useCallback(
    (slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
    [],
  );
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartValue>(() => {
    const items: CartItem[] = lines
      .map((l) => {
        const product = products.find((p) => p.slug === l.slug);
        return product ? { product, qty: l.qty } : null;
      })
      .filter((x): x is CartItem => x !== null);
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((s, i) => s + i.product.price * i.qty, 0),
      ready,
      add,
      setQty,
      remove,
      clear,
    };
  }, [lines, ready, add, setQty, remove, clear]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
