"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import { useCart } from "@/components/CartContext";
import { naira } from "@/lib/format";

const inputStyle =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";

const DELIVERY_FEE = 8500;
const TAX = 2500;

type Mode = "delivery" | "pickup";
type Payment = "pod" | "now";

export default function CheckoutFlow() {
  const [mode, setMode] = useState<Mode>("delivery");
  const [payment, setPayment] = useState<Payment>("pod");
  const { items: cart, subtotal, setQty: setCartQty, remove } = useCart();

  const setQty = (slug: string, delta: number) => {
    const line = cart.find((i) => i.product.slug === slug);
    if (line) setCartQty(slug, line.qty + delta);
  };

  const deliveryFee = mode === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee + TAX;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-2xl font-bold sm:text-3xl"
        >
          <Icon name="arrow-left" size={22} className="text-brand" />
          Delivery Details
        </Link>
        {/* Delivery / Pickup toggle */}
        <div className="flex rounded-full border border-ink/15 bg-white p-1 text-sm font-bold">
          {(["delivery", "pickup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-5 py-2 capitalize transition-colors ${
                mode === m ? "bg-ink text-brand" : "text-ink/50"
              }`}
            >
              {m === "pickup" ? "Pick Up" : "Delivery"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Left */}
        <div className="space-y-6">
          {mode === "delivery" ? (
            <div className="rounded-2xl border border-ink/10 bg-white p-6">
              <p className="font-bold">Enter Your Address</p>
              <p className="mt-1 text-sm text-ink/50">
                Select all your location information
              </p>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-ink/25 px-4 py-6 text-sm font-bold text-ink/70 transition-colors hover:border-brand hover:text-brand">
                <Icon name="plus" size={16} /> Add delivery address
              </button>
            </div>
          ) : (
            <>
              <div className="relative flex aspect-[16/7] items-center justify-center overflow-hidden rounded-2xl bg-ink/5 text-sm text-ink/40">
                Map preview — store pickup location
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-6">
                <Icon name="pin" size={22} className="text-brand" />
                <p className="text-sm">
                  <span className="font-bold">Store Location:</span>{" "}
                  <span className="text-ink/60">Festac Town, Lagos</span>
                </p>
              </div>
            </>
          )}

          {/* Contact details */}
          <form className="rounded-2xl border border-ink/10 bg-white p-6">
            <p className="font-bold">Contact Details</p>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/60">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="Enter your full name" className={inputStyle} required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/60">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" placeholder="Enter your email" className={inputStyle} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/60">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input type="tel" placeholder="+234" className={inputStyle} required />
                </div>
              </div>
            </div>
          </form>

          {/* Payment method */}
          <div className="rounded-2xl border border-ink/10 bg-white p-6">
            <p className="font-bold">Payment Method</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {(
                [
                  ["pod", "Pay on Delivery"],
                  ["now", "Pay Now"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setPayment(key)}
                  className={`rounded-xl border px-5 py-3 text-sm font-bold transition-colors ${
                    payment === key
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-ink/15 text-ink/70 hover:border-ink/30"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {payment === "now" && (
              <p className="mt-3 text-xs text-ink/50">
                Secure payment powered by Paystack.
              </p>
            )}
          </div>
        </div>

        {/* Right — cart summary */}
        <aside className="rounded-2xl border border-ink/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="font-bold">Cart Items</p>
            <Link href="/shop" className="text-sm font-bold text-gold hover:underline">
              Add more items
            </Link>
          </div>

          {cart.length === 0 ? (
            <p className="mt-6 text-sm text-ink/50">
              Your cart is empty.{" "}
              <Link href="/shop" className="font-bold text-gold hover:underline">
                Browse the shop
              </Link>
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-ink/10">
              {cart.map(({ product, qty }) => (
                <li key={product.slug} className="flex gap-4 py-4">
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                    <Image src={product.image} alt={product.title} fill sizes="64px" className="object-cover" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-bold">{product.title}</p>
                      <button
                        aria-label={`Remove ${product.title}`}
                        onClick={() => remove(product.slug)}
                        className="text-red-500/70 transition-colors hover:text-red-500"
                      >
                        <Icon name="close" size={16} />
                      </button>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-ink/50">{product.blurb}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-bold text-gold">{naira(product.price)}</p>
                      <div className="flex items-center gap-3 rounded-full bg-ink/5 px-2 py-1">
                        <button aria-label="Decrease" onClick={() => setQty(product.slug, -1)} className="text-ink/70 hover:text-ink">
                          <Icon name="minus" size={14} />
                        </button>
                        <span className="min-w-[1ch] text-center text-xs font-bold tabular-nums">{qty}</span>
                        <button aria-label="Increase" onClick={() => setQty(product.slug, 1)} className="text-ink/70 hover:text-ink">
                          <Icon name="plus" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-2 space-y-2 border-t border-ink/10 pt-4 text-sm">
            <div className="flex justify-between text-ink/60">
              <dt>Subtotal</dt>
              <dd>{naira(subtotal)}</dd>
            </div>
            {mode === "delivery" && (
              <div className="flex justify-between text-ink/60">
                <dt>Delivery Fee</dt>
                <dd>{naira(deliveryFee)}</dd>
              </div>
            )}
            <div className="flex justify-between text-ink/60">
              <dt>Tax</dt>
              <dd>{naira(TAX)}</dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-bold">
              <dt>Total</dt>
              <dd>{naira(total)}</dd>
            </div>
          </dl>

          {payment === "pod" && (
            <p className="mt-4 rounded-xl bg-cream p-4 text-xs leading-relaxed text-ink/60">
              Please be available when the delivery person arrives, or they&apos;ll
              leave your order at the door. By placing your order, you agree to
              take full responsibility for it once it&apos;s delivered.
            </p>
          )}
        </aside>
      </div>

      {/* Proceed */}
      <Link
        href="/order/success"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        <Icon name="wallet" size={16} /> Proceed to Payment
      </Link>
    </>
  );
}
