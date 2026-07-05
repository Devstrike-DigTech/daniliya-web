import type { Metadata } from "next";
import Ambient from "@/components/Ambient";
import Icon from "@/components/Icon";
import CopyButton from "@/components/CopyButton";
import Image from "next/image";
import Link from "next/link";
import { demoOrder } from "@/lib/data";
import { naira } from "@/lib/format";

export const metadata: Metadata = {
  title: "Track your Order",
};

const order = demoOrder;

export default function TrackOrderPage() {
  const doneCount = order.timeline.filter((s) => s.done).length;
  const progress = Math.round((doneCount / order.timeline.length) * 100);

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6">
      <Ambient theme="checkout" />

      {/* Header */}
      <Link
        href="/order/success"
        className="inline-flex items-center gap-2 text-sm font-bold text-ink/60 transition-colors hover:text-ink"
      >
        <Icon name="arrow-left" size={18} /> Order Summary
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-bold sm:text-[40px]">Track your order</h1>
          <p className="mt-1 text-sm text-ink/60">
            Reference <span className="font-bold text-ink">{order.reference}</span>
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white">
          <Icon name="truck" size={16} /> {order.status}
        </span>
      </div>

      {/* Estimated delivery + tracking number */}
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-ink/50">Estimated delivery</p>
              <p className="mt-1 text-xl font-bold">{order.estimatedDelivery}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-ink/50">Courier</p>
              <p className="mt-1 text-xl font-bold">{order.courier}</p>
            </div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink/10">
            <div className="h-full rounded-full bg-brand" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="rounded-2xl bg-coal p-6 text-white">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-brand">Tracking number</p>
            <CopyButton
              value={order.trackingNumber}
              className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white"
            />
          </div>
          <p className="mt-2 text-xl font-bold tracking-wide">{order.trackingNumber}</p>
          <p className="mt-2 text-xs leading-relaxed text-white/55">
            Use this on the {order.courier} portal for real-time courier updates.
          </p>
        </div>
      </div>

      {/* Timeline + side cards */}
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
        <ol className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8">
          {order.timeline.map((step, i) => {
            const last = i === order.timeline.length - 1;
            return (
              <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
                {!last && (
                  <span
                    aria-hidden
                    className={`absolute left-[15px] top-9 h-[calc(100%-1.5rem)] w-0.5 ${
                      step.done ? "bg-green-500/40" : "bg-ink/10"
                    }`}
                  />
                )}
                <span
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    step.done ? "bg-green-500 text-white" : "bg-ink/10 text-ink/40"
                  }`}
                >
                  <Icon name="check" size={16} />
                </span>
                <div className="flex flex-1 items-start justify-between gap-3">
                  <div>
                    <p className={`font-bold ${step.done ? "" : "text-ink/50"}`}>
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-sm text-ink/55">{step.text}</p>
                  </div>
                  <p className="shrink-0 text-xs text-ink/40">{step.at}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="space-y-4">
          <div className="rounded-2xl border border-ink/10 bg-white p-5">
            <p className="flex items-center gap-2 text-xs text-ink/50">
              <Icon name="receipt" size={16} className="text-brand" /> Receipt
            </p>
            <p className="mt-2 text-[15px] font-bold">{order.receiptName}</p>
            <p className="text-xs text-ink/50">{order.receiptPhone}</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-5">
            <p className="flex items-center gap-2 text-xs text-ink/50">
              <Icon name="pin" size={16} className="text-brand" /> Ship to
            </p>
            <p className="mt-2 text-[15px] font-bold">{order.shipName}</p>
            <p className="text-xs text-ink/50">{order.shipArea}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-6">
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
                <p className="mt-0.5 line-clamp-1 text-xs text-ink/50">{product.blurb}</p>
                <p className="mt-1 text-sm font-bold text-gold">
                  {naira(product.price)}
                  <span className="ml-2 font-normal text-ink/50">Qty: {qty}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-center">
        <Link href="/shop" className="text-sm font-bold text-gold hover:underline">
          Continue Shopping
        </Link>
      </p>
    </section>
  );
}
