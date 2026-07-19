"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { register, resendCode, signIn, verifyCode } from "./auth-actions";

const FIELD =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";
const LABEL = "mb-1.5 block text-sm font-bold";

type Mode = "signin" | "register" | "verify";

/**
 * Sign in or create an account.
 *
 * An account is optional on this storefront — you can buy and track an order
 * as a guest. The reason to make one is that registering with the email you
 * checked out under claims those past orders, which is called out explicitly
 * when the API reports it.
 */
export default function AccountAuth() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [pendingEmail, setPendingEmail] = useState("");
  const [claimed, setClaimed] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError("");
    setNotice("");

    startTransition(async () => {
      if (mode === "signin") {
        const res = await signIn(formData);
        if (res.ok) router.refresh();
        else setError(res.error);
        return;
      }
      if (mode === "register") {
        const res = await register(formData);
        if (!res.ok) return setError(res.error);
        setPendingEmail(String(formData.get("email") ?? ""));
        setClaimed(Boolean(res.claimedGuestOrders));
        setMode("verify");
        return;
      }
      const res = await verifyCode(formData);
      if (res.ok) router.refresh();
      else setError(res.error);
    });
  };

  if (mode === "verify") {
    return (
      <div className="mx-auto max-w-md">
        <h1 className="text-[32px] font-bold">Check your email</h1>
        <p className="mt-2 text-[15px] text-ink/60">
          We sent a 6-digit code to <span className="font-bold">{pendingEmail}</span>.
        </p>
        {claimed && (
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-green/10 px-4 py-3 text-sm font-bold text-green">
            <Icon name="check" size={16} className="mt-0.5 shrink-0" />
            You&apos;ve ordered with us before — those orders will be waiting in your
            account once you confirm this code.
          </p>
        )}

        <form onSubmit={submit} className="mt-6 space-y-5">
          <input type="hidden" name="email" value={pendingEmail} />
          <div>
            <label htmlFor="code" className={LABEL}>6-digit code</label>
            <input id="code" name="code" inputMode="numeric" maxLength={6} className={FIELD} placeholder="000000" required />
          </div>
          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>}
          {notice && <p className="rounded-xl bg-ink/5 px-4 py-3 text-sm font-bold text-ink/70">{notice}</p>}
          <button type="submit" disabled={pending} className="w-full rounded-xl bg-brand py-4 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60">
            {pending ? "Confirming…" : "Confirm and sign in"}
          </button>
        </form>

        <button
          onClick={() =>
            startTransition(async () => {
              const res = await resendCode(pendingEmail);
              if (res.ok) setNotice("A new code is on its way.");
              else setError(res.error);
            })
          }
          disabled={pending}
          className="mt-4 text-sm font-bold text-brand hover:underline disabled:opacity-60"
        >
          Send another code
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-[32px] font-bold">
        {mode === "signin" ? "Sign in" : "Create an account"}
      </h1>
      <p className="mt-2 text-[15px] text-ink/60">
        {mode === "signin"
          ? "See your orders and service requests in one place."
          : "Use the email you order with and your past orders come with you."}
      </p>

      <form onSubmit={submit} className="mt-6 space-y-5">
        {mode === "register" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className={LABEL}>First name</label>
              <input id="firstName" name="firstName" className={FIELD} required />
            </div>
            <div>
              <label htmlFor="lastName" className={LABEL}>Last name</label>
              <input id="lastName" name="lastName" className={FIELD} required />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email" className={LABEL}>Email</label>
          <input id="email" name="email" type="email" className={FIELD} placeholder="you@example.com" required />
        </div>

        {mode === "register" && (
          <div>
            <label htmlFor="phone" className={LABEL}>Phone</label>
            <input id="phone" name="phone" className={FIELD} placeholder="+234" />
          </div>
        )}

        <div>
          <label htmlFor="password" className={LABEL}>Password</label>
          <input id="password" name="password" type="password" className={FIELD} required />
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>}

        <button type="submit" disabled={pending} className="w-full rounded-xl bg-brand py-4 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60">
          {pending ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-sm text-ink/60">
        {mode === "signin" ? "No account yet? " : "Already have one? "}
        <button
          onClick={() => {
            setMode(mode === "signin" ? "register" : "signin");
            setError("");
          }}
          className="font-bold text-brand hover:underline"
        >
          {mode === "signin" ? "Create one" : "Sign in"}
        </button>
      </p>
      <p className="mt-2 text-xs text-ink/45">
        You don&apos;t need an account to buy — you can check out as a guest and
        track any order with its reference.
      </p>
    </div>
  );
}
