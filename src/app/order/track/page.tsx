import type { Metadata } from "next";
import Link from "next/link";
import Ambient from "@/components/Ambient";
import Icon from "@/components/Icon";
import { apiFetchSafe } from "@/lib/api";
import LiveTrack, { type TrackedOrder } from "./LiveTrack";

export const metadata: Metadata = {
  title: "Track your Order",
};

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
  if (!order || !ref) {
    return (
      <section className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6">
        <Ambient theme="checkout" />
        <h1 className="text-[32px] font-bold sm:text-[40px]">Track your order</h1>
        <p className="mt-1 text-sm text-ink/60">
          Enter the reference from your confirmation email — no account needed.
        </p>
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
            defaultValue={ref}
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

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6">
      <Ambient theme="checkout" />

      <Link
        href={`/order/success?ref=${encodeURIComponent(order.ref)}`}
        className="inline-flex items-center gap-2 text-sm font-bold text-ink/60 transition-colors hover:text-ink"
      >
        <Icon name="arrow-left" size={18} /> Order Summary
      </Link>

      {/* Everything below the back-link live-updates on its own. */}
      <LiveTrack initialOrder={order} orderRef={ref} />
    </section>
  );
}
