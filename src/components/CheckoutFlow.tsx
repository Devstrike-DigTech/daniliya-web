"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Icon from "@/components/Icon";
import { useCart } from "@/components/CartContext";
import { REFERRAL_KEY } from "@/components/ReferralCapture";
import { naira } from "@/lib/format";

const inputStyle =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";

/** The API's enums. Sending anything else is rejected with a 400. */
type Mode = "DELIVERY" | "PICKUP";
type PaymentMethod = "PAY_ON_DELIVERY" | "PAYSTACK";

/** Every figure here is the API's; the storefront never does order arithmetic. */
type Quote = {
  mode: string;
  subtotal: string;
  giftAddon: string;
  deliveryFee: string;
  tax: string;
  total: string;
};

type PlacedOrder = {
  order: { ref: string; status: string; channel: string; total: string; createdAt: string };
  payment: {
    method: string;
    status: string;
    reference?: string;
    authorizationUrl?: string;
    simulated?: boolean;
  };
  message?: string;
};

/** Handed to /order/success so it can show the totals the API just returned. */
export const orderHandoffKey = (ref: string) => `daniliya-order-${ref}`;

const money = (v: string | undefined) => naira(Number(v ?? 0));

/** localStorage never changes under us mid-checkout, so there is nothing to subscribe to. */
const subscribeNoop = () => () => {};
const readReferral = () => {
  try {
    return localStorage.getItem(REFERRAL_KEY);
  } catch {
    return null;
  }
};

export default function CheckoutFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, unavailable, resolving, setQty: setCartQty, setGiftWrap, remove, clear } =
    useCart();

  const [mode, setMode] = useState<Mode>("DELIVERY");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("PAY_ON_DELIVERY");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [showAddress, setShowAddress] = useState(false);

  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [quoting, setQuoting] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // An affiliate link lands the buyer on the site with ?ref=CODE; ReferralCapture
  // stores it so it survives the walk to checkout. The URL wins if both exist.
  // Read through useSyncExternalStore so the server render (null) and the client
  // render stay in step without an effect.
  const storedReferral = useSyncExternalStore(subscribeNoop, readReferral, () => null);
  const referral = searchParams.get("ref") ?? storedReferral;

  const payload = useMemo(
    () =>
      items.map((i) => ({
        productId: i.productId,
        quantity: i.qty,
        giftWrap: Boolean(i.giftWrap),
      })),
    [items],
  );
  const payloadKey = JSON.stringify(payload);

  // Re-quote on every change of mode or cart contents. The displayed total is
  // whatever comes back — there is no client-side fallback arithmetic.
  const quoteSeq = useRef(0);
  useEffect(() => {
    // An empty cart renders no totals at all, so there is nothing to reset here;
    // refilling it re-runs this effect and replaces any stale quote.
    if (payload.length === 0) return;
    const seq = ++quoteSeq.current;
    (async () => {
      setQuoting(true);
      try {
        const res = await fetch("/api/checkout/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode, items: payload }),
        });
        const body = await res.json().catch(() => null);
        if (seq !== quoteSeq.current) return;
        if (!res.ok) {
          setQuote(null);
          setQuoteError(body?.error ?? "Could not price this order.");
        } else {
          setQuote(body as Quote);
          setQuoteError(null);
        }
      } catch {
        if (seq !== quoteSeq.current) return;
        setQuote(null);
        setQuoteError("Could not reach the server to price this order.");
      } finally {
        if (seq === quoteSeq.current) setQuoting(false);
      }
    })();
    // payloadKey is the stable identity of `payload`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, payloadKey]);

  const bump = (productId: string, delta: number) => {
    const line = items.find((i) => i.productId === productId);
    if (line) setCartQty(productId, line.qty + delta);
  };

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) errs.email = "Enter a valid email address.";
    if (phone.trim().length < 7) errs.phone = "Enter a phone number we can reach you on.";
    if (mode === "DELIVERY") {
      if (!street.trim()) errs.street = "Enter a street address.";
      if (!city.trim()) errs.city = "Enter a city.";
      if (!state.trim()) errs.state = "Enter a state.";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }, [fullName, email, phone, mode, street, city, state]);

  const submit = async () => {
    setError(null);
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (mode === "DELIVERY") setShowAddress(true);
    if (!validate()) {
      setError("Please correct the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          paymentMethod,
          contact: { fullName: fullName.trim(), email: email.trim(), phone: phone.trim() },
          ...(mode === "DELIVERY"
            ? {
                deliveryAddress: {
                  street: street.trim(),
                  city: city.trim(),
                  state: state.trim(),
                },
              }
            : {}),
          ...(referral ? { affiliateCode: referral } : {}),
          ...(promoCode.trim() ? { promoCode: promoCode.trim() } : {}),
          items: payload,
        }),
      });
      const body = await res.json().catch(() => null);

      if (!res.ok || !body?.order?.ref) {
        setError(body?.error ?? "We could not place your order. Please try again.");
        setSubmitting(false);
        return;
      }

      const placed = body as PlacedOrder;

      // Hand the API's own figures to the success page — track/:ref is public
      // but returns no totals, so this is the only honest source for them.
      try {
        sessionStorage.setItem(
          orderHandoffKey(placed.order.ref),
          JSON.stringify({
            total: placed.order.total,
            status: placed.order.status,
            channel: placed.order.channel,
            mode,
            email: email.trim(),
            fullName: fullName.trim(),
            payment: placed.payment,
            quote,
            message: placed.message ?? null,
          }),
        );
      } catch {
        /* the success page degrades to the public track data without this */
      }

      clear();

      // A real gateway session gets a redirect. A simulated one must not — the
      // URL is not a payment page, and pretending otherwise would strand the buyer.
      const url = placed.payment?.authorizationUrl;
      if (url && placed.payment?.simulated !== true) {
        window.location.assign(url);
        return;
      }
      router.push(`/order/success?ref=${encodeURIComponent(placed.order.ref)}`);
    } catch {
      setError("We could not reach the server. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  const disabled = submitting || items.length === 0 || quoting || !quote;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/cart" className="inline-flex items-center gap-2 text-2xl font-bold sm:text-3xl">
          <Icon name="arrow-left" size={22} className="text-brand" />
          {mode === "DELIVERY" ? "Delivery Details" : "Pickup Details"}
        </Link>
        {/* Delivery / Pickup toggle — changing it re-quotes against the API */}
        <div className="flex rounded-full border border-ink/15 bg-white p-1 text-sm font-bold">
          {(["DELIVERY", "PICKUP"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-full px-5 py-2 capitalize transition-colors ${
                mode === m ? "bg-ink text-brand" : "text-ink/50"
              }`}
            >
              {m === "PICKUP" ? "Pick Up" : "Delivery"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Left */}
        <div className="space-y-6">
          {mode === "DELIVERY" ? (
            <div className="rounded-2xl border border-ink/10 bg-white p-6">
              <p className="font-bold">Enter Your Address</p>
              <p className="mt-1 text-sm text-ink/50">Where should we deliver this order?</p>
              {!showAddress ? (
                <button
                  type="button"
                  onClick={() => setShowAddress(true)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-ink/25 px-4 py-6 text-sm font-bold text-ink/70 transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon name="plus" size={16} /> Add delivery address
                </button>
              ) : (
                <div className="mt-4 space-y-4">
                  <Field
                    label="Street address"
                    error={fieldErrors.street}
                    value={street}
                    onChange={setStreet}
                    placeholder="House number and street"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="City"
                      error={fieldErrors.city}
                      value={city}
                      onChange={setCity}
                      placeholder="City"
                    />
                    <Field
                      label="State"
                      error={fieldErrors.state}
                      value={state}
                      onChange={setState}
                      placeholder="State"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-6">
              <Icon name="pin" size={22} className="text-brand" />
              <p className="text-sm">
                <span className="font-bold">Store Location:</span>{" "}
                <span className="text-ink/60">Festac Town, Lagos</span>
                <span className="mt-1 block text-xs text-ink/45">
                  Collect your order here once we confirm it is ready.
                </span>
              </p>
            </div>
          )}

          {/* Contact details */}
          <div className="rounded-2xl border border-ink/10 bg-white p-6">
            <p className="font-bold">Contact Details</p>
            <p className="mt-1 text-sm text-ink/50">
              No account needed — this is all we need to reach you about the order.
            </p>
            <div className="mt-4 space-y-4">
              <Field
                label="Full Name"
                required
                error={fieldErrors.fullName}
                value={fullName}
                onChange={setFullName}
                placeholder="Enter your full name"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Email"
                  required
                  type="email"
                  error={fieldErrors.email}
                  value={email}
                  onChange={setEmail}
                  placeholder="Enter your email"
                />
                <Field
                  label="Phone Number"
                  required
                  type="tel"
                  error={fieldErrors.phone}
                  value={phone}
                  onChange={setPhone}
                  placeholder="+234"
                />
              </div>
              <Field
                label="Promo code"
                value={promoCode}
                onChange={setPromoCode}
                placeholder="Optional"
              />
            </div>
            <p className="mt-4 rounded-xl bg-cream p-4 text-xs leading-relaxed text-ink/60">
              You are checking out as a guest. We will email order updates to the address
              above. If you later register an account with that same email, this order joins
              your order history automatically — there is nothing to set up now.
            </p>
            {referral && (
              <p className="mt-3 text-xs text-ink/50">
                Referral code <span className="font-bold text-ink">{referral}</span> applied to
                this order.
              </p>
            )}
          </div>

          {/* Payment method */}
          <div className="rounded-2xl border border-ink/10 bg-white p-6">
            <p className="font-bold">Payment Method</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {(
                [
                  ["PAY_ON_DELIVERY", "Pay on Delivery"],
                  ["PAYSTACK", "Pay Now"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPaymentMethod(key)}
                  className={`rounded-xl border px-5 py-3 text-sm font-bold transition-colors ${
                    paymentMethod === key
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-ink/15 text-ink/70 hover:border-ink/30"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {paymentMethod === "PAYSTACK" && (
              <p className="mt-3 text-xs text-ink/50">Secure payment powered by Paystack.</p>
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

          {unavailable.length > 0 && (
            <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
              {unavailable.length} item{unavailable.length === 1 ? "" : "s"} in your cart are no
              longer available and are not included.{" "}
              <Link href="/cart" className="font-bold underline">
                Review cart
              </Link>
            </p>
          )}

          {items.length === 0 ? (
            <p className="mt-6 text-sm text-ink/50">
              Your cart is empty.{" "}
              <Link href="/shop" className="font-bold text-gold hover:underline">
                Browse the shop
              </Link>
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-ink/10">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4 py-4">
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-ink/5">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-ink/25">
                        <Icon name="package" size={18} />
                      </span>
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-bold">{item.title}</p>
                      <button
                        type="button"
                        aria-label={`Remove ${item.title}`}
                        onClick={() => remove(item.productId)}
                        className="text-red-500/70 transition-colors hover:text-red-500"
                      >
                        <Icon name="close" size={16} />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-bold text-gold">{naira(item.price)}</p>
                      <div className="flex items-center gap-3 rounded-full bg-ink/5 px-2 py-1">
                        <button
                          type="button"
                          aria-label="Decrease"
                          onClick={() => bump(item.productId, -1)}
                          className="text-ink/70 hover:text-ink"
                        >
                          <Icon name="minus" size={14} />
                        </button>
                        <span className="min-w-[1ch] text-center text-xs font-bold tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase"
                          onClick={() => bump(item.productId, 1)}
                          className="text-ink/70 hover:text-ink"
                        >
                          <Icon name="plus" size={14} />
                        </button>
                      </div>
                    </div>
                    <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-xs text-ink/55">
                      <input
                        type="checkbox"
                        checked={Boolean(item.giftWrap)}
                        onChange={(e) => setGiftWrap(item.productId, e.target.checked)}
                        className="h-3.5 w-3.5 accent-brand"
                      />
                      Gift wrap
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Totals — every line below comes from POST /api/checkout/quote */}
          {items.length > 0 && (
            <dl className="mt-2 space-y-2 border-t border-ink/10 pt-4 text-sm">
              {quoteError ? (
                <p className="text-sm text-red-600">{quoteError}</p>
              ) : !quote ? (
                <p className="text-sm text-ink/45">
                  {resolving || quoting ? "Pricing your order…" : "Totals unavailable."}
                </p>
              ) : (
                <>
                  <div className="flex justify-between text-ink/60">
                    <dt>Subtotal</dt>
                    <dd>{money(quote.subtotal)}</dd>
                  </div>
                  {Number(quote.giftAddon) > 0 && (
                    <div className="flex justify-between text-ink/60">
                      <dt>Gift wrapping</dt>
                      <dd>{money(quote.giftAddon)}</dd>
                    </div>
                  )}
                  {Number(quote.deliveryFee) > 0 && (
                    <div className="flex justify-between text-ink/60">
                      <dt>Delivery Fee</dt>
                      <dd>{money(quote.deliveryFee)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between text-ink/60">
                    <dt>Tax</dt>
                    <dd>{money(quote.tax)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-bold">
                    <dt>Total</dt>
                    <dd className={quoting ? "opacity-40" : ""}>{money(quote.total)}</dd>
                  </div>
                </>
              )}
            </dl>
          )}

          {paymentMethod === "PAY_ON_DELIVERY" && mode === "DELIVERY" && (
            <p className="mt-4 rounded-xl bg-cream p-4 text-xs leading-relaxed text-ink/60">
              Please be available when the delivery person arrives, or they&apos;ll leave your
              order at the door. By placing your order, you agree to take full responsibility
              for it once it&apos;s delivered.
            </p>
          )}
        </aside>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {/* Proceed */}
      <button
        type="button"
        onClick={submit}
        disabled={disabled}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon name="wallet" size={16} />
        {submitting
          ? "Placing your order…"
          : paymentMethod === "PAY_ON_DELIVERY"
            ? "Place Order"
            : "Proceed to Payment"}
      </button>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/60">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={`${inputStyle} ${error ? "border-red-400" : ""}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
