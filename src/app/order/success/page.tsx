import type { Metadata } from "next";
import Ambient from "@/components/Ambient";
import Icon from "@/components/Icon";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { naira } from "@/lib/format";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

// Static demo order — replaced by real order data when commerce is wired up.
const order = {
  reference: "DNL-XXXXXX",
  customer: "Customer",
  items: [{ product: products[1], qty: 1 }],
  deliveryFee: 8500,
  tax: 2500,
};

export default function OrderSuccessPage() {
  const subtotal = order.items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const total = subtotal + order.deliveryFee + order.tax;

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Ambient theme="checkout" />
      <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white">
          <Icon name="check" size={26} />
        </span>
        <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
          Thank you, {order.customer}!
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Your payment was successful. A receipt has been sent to your email.
        </p>
        <div className="mx-auto mt-6 flex max-w-sm items-center justify-between rounded-xl bg-cream px-5 py-4">
          <div className="text-left">
            <p className="text-xs text-ink/50">Order reference</p>
            <p className="font-bold tracking-wide">{order.reference}</p>
          </div>
          <span className="rounded-lg bg-ink px-4 py-2 text-xs font-bold text-white">
            Copy
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Estimated delivery", value: "2–5 working days" },
          { label: "Ship to", value: "Your delivery address" },
          { label: "Receipt", value: "Sent to your email" },
        ].map((info) => (
          <div key={info.label} className="rounded-2xl border border-ink/10 bg-white p-5">
            <p className="text-xs text-ink/50">{info.label}</p>
            <p className="mt-1 text-sm font-bold">{info.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid items-start gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <p className="font-bold">Items in this order</p>
          <ul className="mt-4 space-y-4">
            {order.items.map(({ product, qty }) => (
              <li key={product.slug} className="flex gap-4">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <div>
                  <p className="text-sm font-bold">{product.title}</p>
                  <p className="mt-0.5 text-xs text-ink/50">Qty: {qty}</p>
                  <p className="mt-1 text-sm font-bold text-gold">
                    {naira(product.price)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <p className="font-bold">Payment summary</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink/60">
              <dt>Subtotal</dt>
              <dd>{naira(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink/60">
              <dt>Delivery Fee</dt>
              <dd>{naira(order.deliveryFee)}</dd>
            </div>
            <div className="flex justify-between text-ink/60">
              <dt>Tax</dt>
              <dd>{naira(order.tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-bold">
              <dt>Total</dt>
              <dd>{naira(total)}</dd>
            </div>
          </dl>
          <button className="mt-6 w-full rounded-full bg-brand py-3.5 text-sm font-bold text-ink transition-opacity hover:opacity-90">
            Track this Order
          </button>
        </div>
      </div>

      <p className="mt-8 text-center">
        <Link href="/shop" className="text-sm font-bold text-gold hover:underline">
          Continue Shopping
        </Link>
      </p>
    </section>
  );
}
