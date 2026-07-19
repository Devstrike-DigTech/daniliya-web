import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import ContactCards from "@/components/ContactCards";
import { apiFetchSafe } from "@/lib/api";
import NewTicketForm from "./NewTicketForm";

export const metadata: Metadata = { title: "Help & support" };

/** GET /support/tickets */
type TicketRow = {
  ref: string;
  subject: string;
  priority: string;
  status: string;
  updatedAt: string;
};

export const statusPill: Record<string, string> = {
  OPEN: "bg-amber-100 text-amber-700",
  PENDING: "bg-blue-100 text-blue-700",
  CLOSED: "bg-ink/10 text-ink/55",
};

export const titled = (v: string) => v.charAt(0) + v.slice(1).toLowerCase();

export const stamp = (iso: string) =>
  new Date(iso).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default async function SupportPage() {
  // Opening a ticket needs an account — there is no public support endpoint —
  // so a signed-out visitor gets the real contact channels instead of a form
  // that could not send.
  const tickets = await apiFetchSafe<TicketRow[]>("/support/tickets");

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1376px] px-4 py-16 sm:px-8">
        <p className="text-[13px] font-bold uppercase tracking-[0.3em] text-brand">
          Help &amp; support
        </p>
        <h1 className="mt-3 text-[36px] font-bold leading-none sm:text-[44px]">
          Talk to a human.
        </h1>

        {tickets === null ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="max-w-lg text-[15px] leading-relaxed text-ink/70">
                Reach us on any of these — they are monitored by the same team.
                To raise a tracked request and follow it here, sign in first.
              </p>
              <div className="mt-8">
                <ContactCards />
              </div>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white p-8">
              <p className="text-lg font-bold">Track your requests</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/65">
                With an account, every request you raise gets a reference and a
                thread you can come back to, so nothing gets lost in an inbox.
              </p>
              <Link
                href="/account"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Sign in or create an account <Icon name="arrow-right" size={16} />
              </Link>
              <p className="mt-4 text-xs text-ink/45">
                Chasing an order instead? You can track any order with its
                reference — no account needed.{" "}
                <Link href="/order/track" className="font-bold text-brand hover:underline">
                  Track an order
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
              <p className="max-w-lg text-[15px] leading-relaxed text-ink/70">
                Raise a request and we&apos;ll reply in this thread. You&apos;ll
                see every message here.
              </p>
              <NewTicketForm />
            </div>

            {tickets.length > 0 ? (
              <div className="mt-8 space-y-4">
                {tickets.map((t) => (
                  <Link
                    key={t.ref}
                    href={`/support/${t.ref}`}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-5 transition-colors hover:border-brand/40"
                  >
                    <div>
                      <p className="font-bold">{t.subject}</p>
                      <p className="mt-1 font-mono text-xs text-ink/50">
                        {t.ref} · updated {stamp(t.updatedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-ink/50">
                        {titled(t.priority)} priority
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${statusPill[t.status] ?? "bg-ink/10 text-ink/55"}`}
                      >
                        {titled(t.status)}
                      </span>
                      <Icon name="arrow-right" size={16} className="text-ink/40" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-ink/15 px-6 py-14 text-center">
                <p className="text-[15px] font-bold">No requests yet</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-ink/55">
                  When you raise one it appears here with its full history.
                </p>
              </div>
            )}

            <div className="mt-12">
              <p className="text-sm font-bold text-ink/70">Prefer to talk?</p>
              <div className="mt-4">
                <ContactCards />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
