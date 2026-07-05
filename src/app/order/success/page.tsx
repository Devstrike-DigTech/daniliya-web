import type { Metadata } from "next";
import Ambient from "@/components/Ambient";
import Icon from "@/components/Icon";
import CopyButton from "@/components/CopyButton";
import Image from "next/image";
import Link from "next/link";
import { demoOrder } from "@/lib/data";
import { naira } from "@/lib/format";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

const order = demoOrder;

export default function OrderSuccessPage() {
  const subtotal = order.items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const total = subtotal + order.deliveryFee + order.tax;

  const info = [
    { icon: "truck", label: "Estimated delivery", value: order.estimatedDelivery, sub: order.courier },
    { icon: "pin", label: "Ship to", value: order.shipName, sub: order.shipArea },
    { icon: "receipt", label: "Receipt", value: order.receiptName, sub: order.receiptPhone },
  ];

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6">
      <Ambient theme="checkout" />

      {/* Confirmation header */}
      <div className="fade-up rounded-2xl border border-ink/10 bg-white p-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-green-400 to-green-600 text-white shadow-lg shadow-green-500/20">
          <Icon name="check" size={30} />
        </span>
        <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
          Thank you, {order.customerFirstName}!
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Your payment was successful. A receipt has been sent to{" "}
          {order.receiptName}.
        </p>
        <div className="mx-auto mt-6 flex max-w-sm items-center justify-between gap-4 rounded-xl bg-cream px-5 py-4">
          <div className="text-left">
            <p className="text-xs text-ink/50">Order reference</p>
            <p className="text-lg font-bold tracking-wide">{order.reference}</p>
          </div>
          <CopyButton
            value={order.reference}
            className="rounded-lg bg-ink px-4 py-2.5 text-xs font-bold text-white"
          />
        </div>
      </div>

      {/* Info cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {info.map((i) => (
          <div key={i.label} className="fade-up fade-up-1 rounded-2xl border border-ink/10 bg-white p-5">
            <p className="flex items-center gap-2 text-xs text-ink/50">
              <Icon name={i.icon} size={16} className="text-brand" />
              {i.label}
            </p>
            <p className="mt-2 text-[15px] font-bold">{i.value}</p>
            <p className="text-xs text-ink/50">{i.sub}</p>
          </div>
        ))}
      </div>

      {/* Items + payment summary */}
      <div className="mt-6 grid items-start gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <p className="flex items-center gap-2 font-bold">
            <Icon name="package" size={18} className="text-brand" />
            Items in this order
          </p>
          <ul className="mt-4 space-y-4">
            {order.items.map(({ product, qty }) => (
              <li key={product.slug} className="flex gap-4">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image src={product.image} alt={product.title} fill sizes="64px" className="object-cover" />
                </span>
                <div>
                  <p className="text-sm font-bold">{product.title}</p>
                  <p className="mt-0.5 text-xs text-ink/50">Qty: {qty}</p>
                  <p className="mt-1 text-sm font-bold text-gold">{naira(product.price)}</p>
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
          <Link
            href="/order/track"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            <Icon name="truck" size={16} /> Track this Order
          </Link>
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
