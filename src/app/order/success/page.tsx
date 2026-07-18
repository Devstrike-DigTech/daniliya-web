import type { Metadata } from "next";
import Link from "next/link";
import Ambient from "@/components/Ambient";
import Icon from "@/components/Icon";
import CopyButton from "@/components/CopyButton";
import OrderPlacedSummary from "@/components/OrderPlacedSummary";
import { apiFetchSafe } from "@/lib/api";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

/** GET /orders/track — public, and the only order read a guest can make. */
type TrackedOrder = {
  ref: string;
  status: string;
  placedAt: string | null;
  confirmedAt: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  courier: string | null;
  trackingNumber: string | null;
  estimatedDelivery: string | null;
  items: { titleSnapshot: string; quantity: number }[];
};

const humanStatus = (s: string) =>
  s
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase());

const dateTime = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const raw = (await searchParams).ref;
  const ref = Array.isArray(raw) ? raw[0] : raw;

  const order = ref
    ? await apiFetchSafe<TrackedOrder>(`/orders/track?ref=${encodeURIComponent(ref)}`)
    : null;

  if (!ref || !order) {
    return (
      <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6">
        <Ambient theme="checkout" />
        <div className="mx-auto max-w-md rounded-2xl border border-ink/10 bg-white p-12 text-center">
          <h1 className="text-2xl font-bold">
            {ref ? "We couldn't find that order" : "No order to show"}
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            {ref
              ? `No order matches the reference ${ref}.`
              : "This page shows an order once you have placed one."}
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Browse the Shop <Icon name="arrow-right" size={15} />
          </Link>
        </div>
      </section>
    );
  }

  const placed = dateTime(order.placedAt);

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6">
      <Ambient theme="checkout" />

      {/* Confirmation header */}
      <div className="fade-up rounded-2xl border border-ink/10 bg-white p-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-green-400 to-green-600 text-white shadow-lg shadow-green-500/20">
          <Icon name="check" size={30} />
        </span>
        <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
          {order.status === "PENDING"
            ? "Thank you — your order is recorded."
            : "Thank you — your order is confirmed."}
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          {order.status === "PENDING"
            ? "It is awaiting payment. We'll email you as soon as that is settled."
            : "We've emailed a receipt and will keep you posted as it progresses."}
        </p>
        <div className="mx-auto mt-6 flex max-w-sm items-center justify-between gap-4 rounded-xl bg-cream px-5 py-4">
          <div className="text-left">
            <p className="text-xs text-ink/50">Order reference</p>
            <p className="text-lg font-bold tracking-wide">{order.ref}</p>
          </div>
          <CopyButton
            value={order.ref}
            className="rounded-lg bg-ink px-4 py-2.5 text-xs font-bold text-white"
          />
        </div>
      </div>

      {/* Info cards — only what the API actually returns for this order */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="fade-up fade-up-1 rounded-2xl border border-ink/10 bg-white p-5">
          <p className="flex items-center gap-2 text-xs text-ink/50">
            <Icon name="check" size={16} className="text-brand" /> Status
          </p>
          <p className="mt-2 text-[15px] font-bold">{humanStatus(order.status)}</p>
        </div>
        <div className="fade-up fade-up-1 rounded-2xl border border-ink/10 bg-white p-5">
          <p className="flex items-center gap-2 text-xs text-ink/50">
            <Icon name="receipt" size={16} className="text-brand" /> Placed
          </p>
          <p className="mt-2 text-[15px] font-bold">{placed ?? "—"}</p>
        </div>
        <div className="fade-up fade-up-1 rounded-2xl border border-ink/10 bg-white p-5">
          <p className="flex items-center gap-2 text-xs text-ink/50">
            <Icon name="truck" size={16} className="text-brand" /> Estimated delivery
          </p>
          <p className="mt-2 text-[15px] font-bold">
            {order.estimatedDelivery ? dateTime(order.estimatedDelivery) : "Not scheduled yet"}
          </p>
          <p className="text-xs text-ink/50">
            {order.courier ?? "Courier assigned when it ships"}
          </p>
        </div>
      </div>

      {/* Items + payment summary */}
      <div className="mt-6 grid items-start gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <p className="flex items-center gap-2 font-bold">
            <Icon name="package" size={18} className="text-brand" />
            Items in this order
          </p>
          <ul className="mt-4 space-y-4">
            {order.items.map((item, i) => (
              <li key={`${item.titleSnapshot}-${i}`} className="flex gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-ink/5 text-ink/25">
                  <Icon name="package" size={22} />
                </span>
                <div>
                  <p className="text-sm font-bold">{item.titleSnapshot}</p>
                  <p className="mt-0.5 text-xs text-ink/50">Qty: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <OrderPlacedSummary orderRef={order.ref} />
      </div>

      <p className="mt-8 text-center">
        <Link href="/shop" className="text-sm font-bold text-gold hover:underline">
          Continue Shopping
        </Link>
      </p>
    </section>
  );
}
