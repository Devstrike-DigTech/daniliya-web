"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useCart } from "@/components/CartContext";
import { naira } from "@/lib/format";

/**
 * The cart shows line prices re-read from the live catalogue, and nothing else.
 * Delivery, tax and gift wrapping are priced by the API at checkout — this page
 * deliberately does not guess at them or show a total it cannot vouch for.
 */
export default function CartView() {
  const { items, unavailable, resolving, subtotal, setQty, setGiftWrap, remove, count, ready } =
    useCart();

  if (!ready || (resolving && items.length === 0 && unavailable.length === 0)) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-ink/10 bg-white p-12 text-center text-sm text-ink/50">
        Loading your cart…
      </div>
    );
  }

  if (items.length === 0 && unavailable.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-ink/10 bg-white p-12 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream text-brand">
          <Icon name="cart" size={28} />
        </span>
        <h1 className="mt-5 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-ink/60">
          Browse the shop and add a few things to get started.
        </p>
        <Link
          href="/shop"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Browse the Shop <Icon name="arrow-right" size={15} />
        </Link>
      </div>
    );
  }

  const outOfStock = items.some((i) => !i.inStock);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-[32px] font-bold sm:text-[40px]">Your Cart</h1>
        <p className="text-sm text-ink/55">
          {count} {count === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Lines whose product no longer resolves against the catalogue. */}
      {unavailable.length > 0 && (
        <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5">
          <p className="text-sm font-bold text-amber-900">
            {unavailable.length === 1 ? "An item is" : "Some items are"} no longer available
          </p>
          <ul className="mt-3 space-y-2">
            {unavailable.map((l) => (
              <li key={l.productId} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-amber-900/80">{l.slug}</span>
                <button
                  onClick={() => remove(l.productId)}
                  className="font-bold text-amber-900 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-4 sm:p-5"
            >
              <Link
                href={`/shop/${item.slug}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ink/5"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-ink/25">
                    <Icon name="package" size={22} />
                  </span>
                )}
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    {!item.inStock && (
                      <span className="inline-block rounded-full bg-red-500/10 px-2.5 py-0.5 text-[11px] font-bold text-red-600">
                        Out of stock
                      </span>
                    )}
                    <Link href={`/shop/${item.slug}`} className="mt-1.5 block">
                      <p className="truncate text-[15px] font-bold">{item.title}</p>
                    </Link>
                    <p className="mt-0.5 text-xs text-ink/50">{naira(item.price)} each</p>
                  </div>
                  <button
                    aria-label={`Remove ${item.title}`}
                    onClick={() => remove(item.productId)}
                    className="text-ink/40 transition-colors hover:text-red-500"
                  >
                    <Icon name="close" size={18} />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-full bg-ink/5 px-3 py-1.5">
                    <button
                      aria-label="Decrease"
                      onClick={() => setQty(item.productId, item.qty - 1)}
                      className="text-ink/70 hover:text-ink"
                    >
                      <Icon name="minus" size={14} />
                    </button>
                    <span className="min-w-[1.5ch] text-center text-sm font-bold tabular-nums">
                      {item.qty}
                    </span>
                    <button
                      aria-label="Increase"
                      onClick={() => setQty(item.productId, item.qty + 1)}
                      className="text-ink/70 hover:text-ink"
                    >
                      <Icon name="plus" size={14} />
                    </button>
                  </div>
                  <p className="text-[15px] font-bold">{naira(item.price * item.qty)}</p>
                </div>
                <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs text-ink/60">
                  <input
                    type="checkbox"
                    checked={Boolean(item.giftWrap)}
                    onChange={(e) => setGiftWrap(item.productId, e.target.checked)}
                    className="h-4 w-4 accent-brand"
                  />
                  Gift wrap this item
                </label>
              </div>
            </div>
          ))}

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:underline"
          >
            <Icon name="arrow-left" size={15} /> Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <aside className="rounded-2xl border border-ink/10 bg-white p-6 lg:sticky lg:top-24">
          <p className="font-bold">Order Summary</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between font-bold">
              <dt>Items subtotal</dt>
              <dd>{resolving ? "…" : naira(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink/45">
              <dt>Delivery, tax &amp; gift wrap</dt>
              <dd>Calculated at checkout</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Proceed to Checkout <Icon name="arrow-right" size={15} />
          </Link>
          {outOfStock && (
            <p className="mt-3 text-center text-xs text-red-600">
              An item in your cart is out of stock and may be rejected at checkout.
            </p>
          )}
          <p className="mt-3 text-center text-xs text-ink/45">
            Secure checkout · Pay now or on delivery · No account needed
          </p>
        </aside>
      </div>
    </>
  );
}
