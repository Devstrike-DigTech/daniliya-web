import type { Metadata } from "next";
import Ambient from "@/components/Ambient";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { naira } from "@/lib/format";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Delivery details and payment.",
};

const inputStyle =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";

// Static demo cart — replaced by real cart state when commerce is wired up.
const cartItems = [
  { product: products[1], qty: 1 },
  { product: products[2], qty: 1 },
];

export default function CheckoutPage() {
  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const tax = 2500;
  const total = subtotal + tax;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Ambient theme="checkout" />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Delivery Details</h1>
        <div className="flex rounded-full border border-ink/15 p-1 text-sm font-bold">
          <span className="rounded-full bg-ink px-5 py-2 text-brand">Delivery</span>
          <span className="px-5 py-2 text-ink/50">Pick Up</span>
        </div>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Left — delivery form */}
        <div className="space-y-6">
          <div className="flex aspect-[16/6] items-center justify-center rounded-2xl bg-ink/5 text-sm text-ink/40">
            Map preview — coming with delivery integration
          </div>

          <div className="rounded-2xl border border-ink/10 bg-white p-6">
            <p className="text-sm">
              <span className="font-bold">Store Location:</span>{" "}
              <span className="text-ink/60">Abuja, Nigeria</span>
            </p>
          </div>

          {/* TODO: wire to order creation + Paystack once commerce API ships */}
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
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/60">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="Street, city, state" className={inputStyle} required />
              </div>
            </div>

            <p className="mt-6 font-bold">Payment Method</p>
            <div className="mt-3 flex rounded-full border border-ink/15 p-1 text-sm font-bold">
              <span className="flex-1 rounded-full bg-brand px-5 py-2.5 text-center text-ink">
                Pay Now
              </span>
              <span className="flex-1 px-5 py-2.5 text-center text-ink/40">
                Pay on Delivery
              </span>
            </div>
            <p className="mt-2 text-xs text-ink/50">
              Secure payment powered by Paystack.
            </p>

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-brand py-4 text-sm font-bold text-ink transition-opacity hover:opacity-90"
            >
              Proceed to Payment
            </button>
          </form>
        </div>

        {/* Right — cart summary */}
        <aside className="rounded-2xl border border-ink/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="font-bold">Cart Items</p>
            <Link href="/shop" className="text-sm font-bold text-gold hover:underline">
              Add more items
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-ink/10">
            {cartItems.map(({ product, qty }) => (
              <li key={product.slug} className="flex gap-4 py-4">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{product.title}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-ink/50">
                    {product.blurb}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-bold text-gold">
                      {naira(product.price)}
                    </p>
                    <span className="text-xs text-ink/60">Qty: {qty}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-2 space-y-2 border-t border-ink/10 pt-4 text-sm">
            <div className="flex justify-between text-ink/60">
              <dt>Subtotal</dt>
              <dd>{naira(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink/60">
              <dt>Tax</dt>
              <dd>{naira(tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-bold">
              <dt>Total</dt>
              <dd>{naira(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
