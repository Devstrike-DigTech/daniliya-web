import type { Metadata } from "next";
import Link from "next/link";
import Ambient from "@/components/Ambient";
import Icon from "@/components/Icon";
import CopyButton from "@/components/CopyButton";
import { apiFetchSafe } from "@/lib/api";

export const metadata: Metadata = {
  title: "Track your Order",
};

/** GET /orders/track — public; courier/tracking/ETA stay null until a shipment exists. */
type TrackedOrder = {
  ref: string;
  status: string;
  fulfilmentMode: string;
  placedAt: string | null;
  confirmedAt: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  courier: string | null;
  trackingNumber: string | null;
  estimatedDelivery: string | null;
  items: { titleSnapshot: string; quantity: number }[];
};

/**
 * How far along the fulfilment ladder a status sits — mirrors the API and the
 * admin stepper. The timeline lights up by this rank, NOT only by which
 * timestamps exist, so a "Packed" order (PROCESSING, which has no timestamp of
 * its own) still shows as reached instead of stalling at "Confirmed".
 */
const STATUS_RANK: Record<string, number> = {
  PENDING: 0,
  CONFIRMED: 1,
  PROCESSING: 2,
  SHIPPED: 3,
  DELIVERED: 4,
  COMPLETED: 4,
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

function Lookup({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form
      action="/order/track"
      method="get"
      className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-ink/10 bg-white p-5"
    >
      <label htmlFor="ref" className="text-sm font-bold">
        Order reference
      </label>
      <input
        id="ref"
        name="ref"
        defaultValue={defaultValue}
        placeholder="DNL-XXXXXX"
        className="min-w-[200px] flex-1 rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm uppercase outline-none transition-colors placeholder:normal-case placeholder:text-ink/35 focus:border-brand"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        <Icon name="truck" size={16} /> Track
      </button>
    </form>
  );
}

export default async function TrackOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const raw = (await searchParams).ref;
  const ref = (Array.isArray(raw) ? raw[0] : raw)?.trim();

  const order = ref
    ? await apiFetchSafe<TrackedOrder>(`/orders/track?ref=${encodeURIComponent(ref)}`)
    : null;

  // No reference yet, or one that does not resolve.
  if (!order) {
    return (
      <section className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6">
        <Ambient theme="checkout" />
        <h1 className="text-[32px] font-bold sm:text-[40px]">Track your order</h1>
        <p className="mt-1 text-sm text-ink/60">
          Enter the reference from your confirmation email — no account needed.
        </p>
        <Lookup defaultValue={ref} />
        {ref && (
          <p className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            We couldn&apos;t find an order with the reference{" "}
            <span className="font-bold">{ref}</span>. Check it and try again.
          </p>
        )}
        <p className="mt-8">
          <Link href="/shop" className="text-sm font-bold text-gold hover:underline">
            Continue Shopping
          </Link>
        </p>
      </section>
    );
  }

  const cancelled = order.status === "CANCELLED" || order.status === "REFUNDED";
  const pickup = order.fulfilmentMode === "PICKUP";
  const rank = STATUS_RANK[order.status] ?? 0;

  // Each step is "done" once the order's status has reached its rank — so the
  // timeline always matches the current status, even for stages with no
  // timestamp (Packed). The exact time is shown when the API has one.
  const timeline = [
    { title: "Order placed", text: "We received your order.", at: order.placedAt, rank: 0 },
    { title: "Confirmed", text: "Your order was confirmed.", at: order.confirmedAt, rank: 1 },
    { title: "Packed", text: "We're preparing your order.", at: null, rank: 2 },
    pickup
      ? { title: "Ready for pickup", text: "Collect it from our store.", at: order.shippedAt, rank: 3 }
      : { title: "Shipped", text: "Your order left our hub.", at: order.shippedAt, rank: 3 },
    pickup
      ? { title: "Collected", text: "You picked up your order.", at: order.deliveredAt, rank: 4 }
      : { title: "Delivered", text: "Your order reached its destination.", at: order.deliveredAt, rank: 4 },
  ].map((s) => ({ ...s, done: !cancelled && rank >= s.rank }));

  const progress = cancelled
    ? 100
    : Math.round((Math.min(rank, 4) / 4) * 100);

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6">
      <Ambient theme="checkout" />

      {/* Header */}
      <Link
        href={`/order/success?ref=${encodeURIComponent(order.ref)}`}
        className="inline-flex items-center gap-2 text-sm font-bold text-ink/60 transition-colors hover:text-ink"
      >
        <Icon name="arrow-left" size={18} /> Order Summary
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-bold sm:text-[40px]">Track your order</h1>
          <p className="mt-1 text-sm text-ink/60">
            Reference <span className="font-bold text-ink">{order.ref}</span>
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white">
          <Icon name="truck" size={16} /> {humanStatus(order.status)}
        </span>
      </div>

      <Lookup />

      {/* Estimated delivery + tracking number */}
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs text-ink/50">Estimated delivery</p>
              <p className="mt-1 text-xl font-bold">
                {order.estimatedDelivery ? dateTime(order.estimatedDelivery) : "Not scheduled yet"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-ink/50">Courier</p>
              <p className="mt-1 text-xl font-bold">{order.courier ?? "Not assigned"}</p>
            </div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink/10">
            <div
              className={`h-full rounded-full ${cancelled ? "bg-red-500" : "bg-brand"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {cancelled && (
            <p className="mt-3 text-sm font-bold text-red-600">
              This order was {humanStatus(order.status).toLowerCase()} and is no longer being fulfilled.
            </p>
          )}
        </div>

        <div className="rounded-2xl bg-coal p-6 text-white">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-brand">Tracking number</p>
            {order.trackingNumber && (
              <CopyButton
                value={order.trackingNumber}
                className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white"
              />
            )}
          </div>
          {order.trackingNumber ? (
            <>
              <p className="mt-2 text-xl font-bold tracking-wide">{order.trackingNumber}</p>
              {order.courier && (
                <p className="mt-2 text-xs leading-relaxed text-white/55">
                  Use this on the {order.courier} portal for real-time courier updates.
                </p>
              )}
            </>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              A tracking number appears here once your order ships.
            </p>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-6 grid items-start gap-6">
        <ol className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8">
          {timeline.map((step, i) => {
            const last = i === timeline.length - 1;
            const done = step.done;
            return (
              <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
                {!last && (
                  <span
                    aria-hidden
                    className={`absolute left-[15px] top-9 h-[calc(100%-1.5rem)] w-0.5 ${
                      done ? "bg-green-500/40" : "bg-ink/10"
                    }`}
                  />
                )}
                <span
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    done ? "bg-green-500 text-white" : "bg-ink/10 text-ink/40"
                  }`}
                >
                  <Icon name="check" size={16} />
                </span>
                <div className="flex flex-1 items-start justify-between gap-3">
                  <div>
                    <p className={`font-bold ${done ? "" : "text-ink/50"}`}>{step.title}</p>
                    <p className="mt-0.5 text-sm text-ink/55">{step.text}</p>
                  </div>
                  <p className="shrink-0 text-xs text-ink/40">{dateTime(step.at) ?? "—"}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Items */}
      <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-6">
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

      <p className="mt-8 text-center">
        <Link href="/shop" className="text-sm font-bold text-gold hover:underline">
          Continue Shopping
        </Link>
      </p>
    </section>
  );
}
