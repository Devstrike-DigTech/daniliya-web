"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import Icon from "@/components/Icon";
import { orderHandoffKey } from "@/components/CheckoutFlow";
import { naira } from "@/lib/format";

type Handoff = {
  total: string;
  status: string;
  channel?: string;
  mode?: string;
  email?: string;
  fullName?: string;
  payment?: {
    method?: string;
    status?: string;
    reference?: string;
    authorizationUrl?: string;
    simulated?: boolean;
  };
  quote?: {
    subtotal: string;
    giftAddon: string;
    deliveryFee: string;
    tax: string;
    total: string;
  } | null;
  message?: string | null;
};

const money = (v: string | undefined) => naira(Number(v ?? 0));

/**
 * The public track endpoint returns no money figures, so the only honest source
 * for this order's totals is the response the API gave when it was placed. That
 * is stashed at checkout and read back here. Open the page on another device and
 * there is nothing to show — so it says so, rather than inventing numbers.
 */
/** The stash is written once at checkout and never mutates, so there is nothing to subscribe to. */
const subscribeNoop = () => () => {};

export default function OrderPlacedSummary({ orderRef }: { orderRef: string }) {
  const raw = useSyncExternalStore(
    subscribeNoop,
    () => {
      try {
        return sessionStorage.getItem(orderHandoffKey(orderRef));
      } catch {
        return null;
      }
    },
    () => null,
  );

  const data = useMemo<Handoff | null>(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Handoff;
    } catch {
      return null;
    }
  }, [raw]);

  if (!data) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-6">
        <p className="font-bold">Payment summary</p>
        <p className="mt-3 text-sm text-ink/55">
          The amounts for this order are not available on this device. Your emailed receipt
          has the full breakdown.
        </p>
        <Link
          href={`/order/track?ref=${encodeURIComponent(orderRef)}`}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          <Icon name="truck" size={16} /> Track this Order
        </Link>
      </div>
    );
  }

  const q = data.quote;
  const simulated = data.payment?.simulated === true;

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6">
      <p className="font-bold">Payment summary</p>
      <dl className="mt-4 space-y-2 text-sm">
        {q && (
          <>
            <div className="flex justify-between text-ink/60">
              <dt>Subtotal</dt>
              <dd>{money(q.subtotal)}</dd>
            </div>
            {Number(q.giftAddon) > 0 && (
              <div className="flex justify-between text-ink/60">
                <dt>Gift wrapping</dt>
                <dd>{money(q.giftAddon)}</dd>
              </div>
            )}
            {Number(q.deliveryFee) > 0 && (
              <div className="flex justify-between text-ink/60">
                <dt>Delivery Fee</dt>
                <dd>{money(q.deliveryFee)}</dd>
              </div>
            )}
            <div className="flex justify-between text-ink/60">
              <dt>Tax</dt>
              <dd>{money(q.tax)}</dd>
            </div>
          </>
        )}
        <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-bold">
          <dt>Total</dt>
          <dd>{money(data.total)}</dd>
        </div>
      </dl>

      {data.payment?.method && (
        <p className="mt-4 text-xs text-ink/55">
          Payment method: <span className="font-bold text-ink">{data.payment.method}</span>
          {data.payment.status ? ` · ${data.payment.status}` : ""}
        </p>
      )}

      {simulated && (
        <p className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
          <span className="font-bold">Payment is in test mode.</span> No live payment gateway
          is connected yet, so no money has been taken and no card details were collected.
          Your order is recorded and is awaiting payment — we will contact you to complete it.
        </p>
      )}

      <Link
        href={`/order/track?ref=${encodeURIComponent(orderRef)}`}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        <Icon name="truck" size={16} /> Track this Order
      </Link>
    </div>
  );
}
