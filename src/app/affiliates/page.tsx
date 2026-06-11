import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTag from "@/components/SectionTag";
import { affiliateFeatures, affiliateSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Affiliate Programme",
  description:
    "Earn while you share. Join the best affiliate programme in Nigeria — weekly Monday payouts, free training, no earning cap.",
};

const stepIcons = ["📝", "🪪", "🎓", "🔗", "💸"];

export default function AffiliatesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionTag>Affiliate programme</SectionTag>
              <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
                EARN WHILE <br />
                YOU <span className="text-brand">SHARE</span>
              </h1>
            </div>
            <p className="max-w-md text-white/60">
              Join Nigerians earning a steady weekly income by sharing
              Daniliya products with their network. Train, verify, share —
              and get paid every Monday.
            </p>
          </div>
          <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-2xl">
            <Image
              src="/images/affiliates/hero.jpg"
              alt="Earn with the Daniliya affiliate programme"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5 steps */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTag>Getting started</SectionTag>
        <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
          5 Steps to <span className="text-gold">earnings</span>
        </h2>
        <p className="mt-3 max-w-lg text-ink/60">
          From registration to your first payout — the process is guided,
          transparent and designed to get you earning as fast as possible.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {affiliateSteps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-ink/10 bg-white p-6"
            >
              <span className="text-3xl" aria-hidden>
                {stepIcons[i]}
              </span>
              <p className="mt-3 text-xs font-bold text-gold">STEP {i + 1}</p>
              <p className="mt-1 font-bold leading-snug">{step.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink/60">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionTag>Why join</SectionTag>
          <h2 className="mt-6 max-w-xl text-3xl font-bold sm:text-4xl">
            The best affiliate programme in{" "}
            <span className="text-gold">Nigeria</span>
          </h2>
          <p className="mt-3 max-w-lg text-ink/60">
            Built for transparency and consistency — so you always know what
            you&apos;ve earned and exactly when it arrives.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {affiliateFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white p-7 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-bold text-ink">
                  ✓
                </span>
                <p className="mt-4 font-bold">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl bg-brand p-10 text-center sm:p-14">
          <h2 className="mx-auto max-w-xl text-3xl font-bold text-ink sm:text-4xl">
            Your network is worth more than you think.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ink/70">
            Registration takes 5 minutes. Training is free. Your first Monday
            payout could be next week.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-ink px-9 py-4 text-sm font-bold text-brand transition-opacity hover:opacity-90"
          >
            Join as Affiliate
          </Link>
          <p className="mt-4 text-xs text-ink/50">
            Affiliate registration opens with the platform launch — contact us
            to join the waitlist.
          </p>
        </div>
      </section>
    </>
  );
}
