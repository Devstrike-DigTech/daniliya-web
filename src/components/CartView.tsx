"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useCart } from "@/components/CartContext";
import { naira } from "@/lib/format";

const TAX = 2500;

export default function CartView() {
  const { items, subtotal, setQty, remove, count, ready } = useCart();

  if (ready && items.length === 0) {
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

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-[32px] font-bold sm:text-[40px]">Your Cart</h1>
        <p className="text-sm text-ink/55">
          {count} {count === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Items */}
        <div className="space-y-4">
          {items.map(({ product, qty }) => (
            <div
              key={product.slug}
              className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-4 sm:p-5"
            >
              <Link
                href={`/shop/${product.slug}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl"
              >
                <Image src={product.image} alt={product.title} fill sizes="96px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="inline-block rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-bold text-brand">
                      {product.chip}
                    </span>
                    <Link href={`/shop/${product.slug}`} className="mt-1.5 block">
                      <p className="truncate text-[15px] font-bold">{product.title}</p>
                    </Link>
                    <p className="mt-0.5 line-clamp-1 text-xs text-ink/50">{product.blurb}</p>
                  </div>
                  <button
                    aria-label={`Remove ${product.title}`}
                    onClick={() => remove(product.slug)}
                    className="text-ink/40 transition-colors hover:text-red-500"
                  >
                    <Icon name="close" size={18} />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-full bg-ink/5 px-3 py-1.5">
                    <button aria-label="Decrease" onClick={() => setQty(product.slug, qty - 1)} className="text-ink/70 hover:text-ink">
                      <Icon name="minus" size={14} />
                    </button>
                    <span className="min-w-[1.5ch] text-center text-sm font-bold tabular-nums">{qty}</span>
                    <button aria-label="Increase" onClick={() => setQty(product.slug, qty + 1)} className="text-ink/70 hover:text-ink">
                      <Icon name="plus" size={14} />
                    </button>
                  </div>
                  <p className="text-[15px] font-bold">{naira(product.price * qty)}</p>
                </div>
              </div>
            </div>
          ))}

          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:underline">
            <Icon name="arrow-left" size={15} /> Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <aside className="rounded-2xl border border-ink/10 bg-white p-6 lg:sticky lg:top-24">
          <p className="font-bold">Order Summary</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink/60">
              <dt>Subtotal</dt>
              <dd>{naira(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink/60">
              <dt>Tax</dt>
              <dd>{naira(TAX)}</dd>
            </div>
            <div className="flex justify-between text-ink/45">
              <dt>Delivery</dt>
              <dd>Calculated at checkout</dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-bold">
              <dt>Estimated total</dt>
              <dd>{naira(subtotal + TAX)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Proceed to Checkout <Icon name="arrow-right" size={15} />
          </Link>
          <p className="mt-3 text-center text-xs text-ink/45">
            Secure checkout · Pay now or on delivery
          </p>
        </aside>
      </div>
    </>
  );
}
