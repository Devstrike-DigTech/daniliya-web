import type { Metadata } from "next";
import Link from "next/link";
import Ambient from "@/components/Ambient";
import Icon from "@/components/Icon";
import ContactCards from "@/components/ContactCards";
import { apiFetchSafe } from "@/lib/api";
import NewTicketForm from "@/app/support/NewTicketForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Whether you need a quote, have a question, or want to explore a partnership — we're here and responsive.",
};

export default async function ContactPage() {
  // Raising a request needs an account — the support API has no public route —
  // so a guest is pointed at the published channels rather than shown a form
  // that cannot send. This page previously rendered an inert form that
  // discarded whatever anyone typed into it.
  const me = await apiFetchSafe<{ firstName: string }>("/auth/me");
  return (
    <section className="bg-ink">
      <Ambient theme="contact" />
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_1.1fr]">
        {/* Left — dark info panel */}
        <div className="fade-up px-4 py-16 text-white sm:px-6 lg:py-20">
          <span className="inline-flex rounded-full bg-brand/15 px-5 py-2.5 text-[15px] font-bold text-brand">
            Get in Touch
          </span>
          <h1 className="mt-7 text-[44px] font-bold leading-none sm:text-[56px] lg:text-[64px]">
            LET&apos;S <span className="text-brand">TALK.</span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/75">
            Whether you need a quote, have a question, or want to explore a
            partnership — we&apos;re here and responsive.
          </p>
          <div className="mt-10">
            <ContactCards />
          </div>
        </div>

        {/* Right — message panel */}
        <div className="fade-up fade-up-1 bg-paper px-4 py-16 sm:px-8 lg:py-20">
          <h2 className="text-[32px] font-bold sm:text-[40px]">
            Send us a <span className="text-gold">message</span>.
          </h2>

          {me ? (
            <>
              <p className="mt-2 text-[15px] text-ink/60">
                Raise a request and we&apos;ll reply in a thread you can follow
                — every message stays in one place.
              </p>
              <div className="mt-8">
                <NewTicketForm />
              </div>
              <p className="mt-4 text-sm text-ink/55">
                Already raised something?{" "}
                <Link href="/support" className="font-bold text-brand hover:underline">
                  See your requests
                </Link>
              </p>
            </>
          ) : (
            <>
              <p className="mt-2 text-[15px] text-ink/60">
                The channels on the left reach the same team and are the quickest
                way to get us if you don&apos;t have an account.
              </p>
              <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
                <p className="font-bold">Want it tracked?</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/65">
                  Sign in and your request gets a reference and a thread, so you
                  can follow it and nothing gets buried in an inbox.
                </p>
                <Link
                  href="/account"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Sign in or create an account <Icon name="arrow-right" size={16} />
                </Link>
              </div>
              <p className="mt-4 text-sm text-ink/55">
                Chasing an order? You can{" "}
                <Link href="/order/track" className="font-bold text-brand hover:underline">
                  track it with its reference
                </Link>{" "}
                — no account needed.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
