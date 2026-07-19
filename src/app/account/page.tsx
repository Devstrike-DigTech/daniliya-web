import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { apiFetchSafe } from "@/lib/api";
import { naira } from "@/lib/format";
import AccountAuth from "./AccountAuth";
import ReviewButton from "./ReviewButton";
import { signOut } from "./auth-actions";

export const metadata: Metadata = { title: "Your account" };

type Me = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
};

/** GET /orders */
type OrderRow = {
  ref: string;
  status: string;
  channel: string;
  total: string;
  createdAt: string;
  payment: { status: string; method: string } | null;
};

/** GET /orders/:ref — owner only; carries the line items. */
type OrderDetail = {
  ref: string;
  items: { productId: string; title: string; quantity: number }[];
};

/** Reviewable once the order stands. Mirrors the API's own rule. */
const REVIEWABLE: string[] = ["CONFIRMED", "DELIVERED", "COMPLETED"];

/** GET /bookings */
type BookingRow = {
  ref: string;
  status: string;
  service: string | null;
  quotedAmount: string | null;
  createdAt: string;
};

const statusPill: Record<string, string> = {
  CONFIRMED: "bg-green/15 text-green",
  COMPLETED: "bg-green/15 text-green",
  DELIVERED: "bg-green/15 text-green",
  SHIPPED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  PENDING: "bg-amber-100 text-amber-700",
  REQUESTED: "bg-amber-100 text-amber-700",
  CANCELLED: "bg-ink/10 text-ink/55",
  REFUNDED: "bg-ink/10 text-ink/55",
  REJECTED: "bg-red-100 text-red-600",
};

const titled = (v: string) =>
  v.charAt(0) + v.slice(1).toLowerCase().replace(/_/g, " ");

const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" });

export default async function AccountPage() {
  // No session → the sign-in / create-account panel. Everything on this page
  // needs a token, so there is nothing to show a guest here.
  const me = await apiFetchSafe<Me>("/auth/me");
  if (!me) {
    return (
      <section className="bg-paper">
        <div className="mx-auto max-w-[1376px] px-4 py-20 sm:px-8">
          <AccountAuth />
        </div>
      </section>
    );
  }

  const [orders, bookings] = await Promise.all([
    apiFetchSafe<OrderRow[]>("/orders"),
    apiFetchSafe<BookingRow[]>("/bookings"),
  ]);

  // The list endpoint carries no line items, so the detail of each reviewable
  // order is fetched to know what can be reviewed. Orders per customer are few;
  // if that stops being true this wants a single endpoint returning items.
  const details = await Promise.all(
    (orders ?? [])
      .filter((o) => REVIEWABLE.includes(o.status))
      .map((o) => apiFetchSafe<OrderDetail>(`/orders/${o.ref}`)),
  );
  const itemsByRef = new Map(
    details.filter(Boolean).map((d) => [d!.ref, d!.items]),
  );

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1376px] px-4 py-16 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.3em] text-brand">
              Your account
            </p>
            <h1 className="mt-3 text-[36px] font-bold leading-none sm:text-[44px]">
              {me.firstName} {me.lastName}
            </h1>
            <p className="mt-2 text-[15px] text-ink/60">
              {me.email}
              {me.phone ? ` · ${me.phone}` : ""}
            </p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-ink/15 px-5 py-3 text-sm font-bold transition-colors hover:bg-ink/5"
            >
              <Icon name="logout" size={16} /> Sign out
            </button>
          </form>
        </div>

        {/* Orders */}
        <h2 className="mt-14 text-[24px] font-bold">Your orders</h2>
        {orders && orders.length > 0 ? (
          <div className="mt-5 space-y-4">
            {orders.map((o) => (
              <div
                key={o.ref}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-5"
              >
                <div>
                  <p className="font-mono text-sm font-bold">{o.ref}</p>
                  <p className="mt-1 text-sm text-ink/55">
                    Placed {shortDate(o.createdAt)}
                    {o.payment ? ` · ${titled(o.payment.method)}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold">{naira(Number(o.total))}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${statusPill[o.status] ?? "bg-ink/10 text-ink/55"}`}
                  >
                    {titled(o.status)}
                  </span>
                  <Link
                    href={`/order/track?ref=${o.ref}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-xs font-bold text-white hover:opacity-90"
                  >
                    Track
                  </Link>
                </div>

                {/* Reviewing is only offered on orders that actually stand. */}
                {(itemsByRef.get(o.ref) ?? []).length > 0 && (
                  <div className="flex w-full flex-col gap-2 border-t border-ink/8 pt-4">
                    {(itemsByRef.get(o.ref) ?? []).map((it) => (
                      <div key={it.productId} className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm text-ink/70">
                          {it.title} × {it.quantity}
                        </span>
                        <ReviewButton productId={it.productId} title={it.title} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-ink/15 px-6 py-12 text-center">
            <p className="text-sm text-ink/55">No orders on this account yet.</p>
            <Link href="/shop" className="mt-3 inline-block text-sm font-bold text-brand hover:underline">
              Browse the shop
            </Link>
          </div>
        )}

        {/* Service requests */}
        <h2 className="mt-14 text-[24px] font-bold">Your service requests</h2>
        {bookings && bookings.length > 0 ? (
          <div className="mt-5 space-y-4">
            {bookings.map((b) => (
              <div
                key={b.ref}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-5"
              >
                <div>
                  <p className="font-mono text-sm font-bold">{b.ref}</p>
                  <p className="mt-1 text-sm text-ink/55">
                    {b.service ?? "Service"} · requested {shortDate(b.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {/* Only set once an admin has quoted the job. */}
                  <span className="text-lg font-bold">
                    {b.quotedAmount ? naira(Number(b.quotedAmount)) : "Awaiting quote"}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${statusPill[b.status] ?? "bg-ink/10 text-ink/55"}`}
                  >
                    {titled(b.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-ink/15 px-6 py-12 text-center">
            <p className="text-sm text-ink/55">No service requests on this account yet.</p>
            <Link href="/quote" className="mt-3 inline-block text-sm font-bold text-brand hover:underline">
              Request a quote
            </Link>
          </div>
        )}

        {/* Support */}
        <h2 className="mt-14 text-[24px] font-bold">Help</h2>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-5">
          <p className="text-sm text-ink/65">
            Something wrong with an order or a payment? Raise a request and we
            reply in a thread you can follow.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center gap-2 rounded-xl border border-brand px-5 py-3 text-sm font-bold text-brand transition-colors hover:bg-brand/10"
          >
            Help &amp; support
          </Link>
        </div>

        {/*
          Nothing here is editable: the API has no profile-update endpoint, so a
          "save details" form would have nowhere to post.
        */}
      </div>
    </section>
  );
}
