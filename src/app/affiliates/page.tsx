import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTag from "@/components/SectionTag";
import Ambient from "@/components/Ambient";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { affiliateFeatures, affiliateStepper } from "@/lib/data";

export const metadata: Metadata = {
  title: "Affiliate Programme",
  description:
    "Earn while you share. Join the best affiliate programme in Nigeria — weekly Monday payouts, free training, no earning cap.",
};

/* Icon slots for the "Why join" cards — files in /public/icons */
const featureIcons = [
  "affiliate-payouts",
  "affiliate-secure",
  "affiliate-dashboard",
  "affiliate-training",
  "affiliate-links",
  "affiliate-nocap",
];

export default function AffiliatesPage() {
  return (
    <>
      <Ambient theme="affiliates" />

      {/* Hero */}
      <section className="relative bg-ink text-white">
        <div className="pinstripes absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-[1376px] px-4 sm:px-8">
          <div className="grid items-center gap-10 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-20">
            <div className="fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/20 px-4 py-1.5 text-xs text-brand">
                Payout every Monday
              </span>
              <h1 className="mt-6 text-[40px] font-bold leading-[1.05] tracking-tight sm:text-[56px] lg:text-[64px]">
                EARN WHILE
                <br />
                YOU <span className="text-brand">SHARE</span>
              </h1>
            </div>
            <div className="fade-up fade-up-1">
              <p className="max-w-md text-[15px] leading-relaxed text-white/85">
                Join Nigeria&apos;s fastest-growing affiliate network. Register,
                complete your KYC, pass the training, and start earning
                commission on every single sale — paid every Monday.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-lg bg-brand px-7 py-3.5 text-[15px] font-bold text-white transition-opacity hover:opacity-90"
                >
                  Register for free
                </Link>
                <Link
                  href="/how-it-works"
                  className="rounded-lg border border-white/70  px-7 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-white/20"
                >
                  How it Works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero image — breaks out of the dark band */}
      <div className="bg-[linear-gradient(to_bottom,var(--color-ink)_0,var(--color-ink)_150px,transparent_150px)] pt-12">
        <div className="fade-up fade-up-2 mx-auto max-w-[1376px] px-4 sm:px-8">
          <div className="relative aspect-[1360/560] min-h-[220px] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/affiliates/hero.jpg"
              alt="Digital marketing with Daniliya"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* 5 Steps to earnings — horizontal stepper */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1376px] px-4 py-24 sm:px-8">
          <Reveal>
            <h2 className="text-[34px] font-bold leading-tight sm:text-[40px]">
              5 Steps to <span className="text-brand">earnings</span>
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/80">
              From registration to your first payout — the entire process is
              guided, transparent, and designed to get you earning as fast as
              possible.
            </p>
          </Reveal>

          <div className="relative mt-14">
            {/* connector line behind the circles */}
            <span
              aria-hidden
              className="absolute left-[10%] right-[10%] top-12 hidden h-0.5 bg-brand/50 md:block"
            />
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5 md:gap-4">
              {affiliateStepper.map((s, i) => (
                <Reveal key={s.title} delay={i * 130}>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-brand bg-white shadow-sm">
                      <Icon name={s.icon} size={64} tint={false} />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                        {i + 1}
                      </span>
                    </div>
                    <p className="mt-5 text-[19px] font-bold">{s.title}</p>
                    <p className="mt-1.5 max-w-[180px] text-[13px] leading-snug text-ink/60">
                      {s.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why join Daniliya */}
      <section className="relative overflow-hidden bg-cream">
        {/* soft decorative shapes */}
        <div
          aria-hidden
          className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand/10"
        />
        <div
          aria-hidden
          className="absolute -bottom-44 -left-24 h-[380px] w-[380px] rounded-full bg-brand/10"
        />
        <div className="relative mx-auto max-w-[1376px] px-4 py-24 sm:px-8">
          <Reveal>
            <SectionTag>Why join Daniliya</SectionTag>
            <h2 className="mt-5 max-w-xl text-[34px] font-bold leading-tight sm:text-[44px]">
              The best affiliate
              <br />
              programme in <span className="text-brand">Nigeria</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {affiliateFeatures.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 120}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <Icon
                      name={featureIcons[i % featureIcons.length]}
                      size={22}
                    />
                  </span>
                  <p className="mt-6 text-[19px] font-bold">{f.title}</p>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ink/65">
                    {f.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
