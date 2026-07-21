"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { portals } from "@/lib/portals";

type CTA = {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
  /** muted "coming soon" treatment — still links out */
  soon?: boolean;
};

type Slide = {
  key: string;
  proof: string;
  title: React.ReactNode;
  body: string;
  cta: CTA;
  secondary?: CTA;
  /** "book" renders the cover; otherwise an image path */
  visual: string;
};

const slides: Slide[] = [
  {
    key: "influencer",
    proof: "Active Influencers",
    title: (
      <>
        REGISTER
        <br />
        AS AN
        <br />
        <span className="text-brand">INFLUENCER</span>
      </>
    ),
    body: "Built for creators with audience. Get a custom code, higher commission rates, brand drops, and retainer opportunities.",
    cta: { label: "Apply Now", href: portals.influencer, icon: "arrow-right", external: true },
    visual: "/images/home/hero-influencer.png",
  },
  {
    key: "affiliate",
    proof: "Active Affiliates",
    title: (
      <>
        EARN AS AN
        <br />
        <span className="text-brand">AFFILIATE</span>
      </>
    ),
    body: "Share Daniliya products with your network and get paid every Monday. Setup takes about 10 minutes.",
    cta: {
      label: "Start Earning",
      href: `${portals.affiliate}/join/signup`,
      icon: "arrow-right",
      external: true,
    },
    visual: "/images/home/hero-affiliate.png",
  },
  {
    key: "vendor",
    proof: "Active Vendors",
    title: (
      <>
        POST YOUR
        <br />
        OWN
        <br />
        <span className="text-brand">PRODUCTS</span>
      </>
    ),
    body: "List your products on Daniliya. We handle payments, traffic and affiliate amplification — you focus on what you sell.",
    cta: { label: "Coming Soon", href: portals.vendor, icon: "clock", external: true, soon: true },
    visual: "/images/home/hero-vendor.png",
  },
  {
    key: "book",
    proof: "Active Reads",
    title: (
      <>
        BUILDER&apos;S
        <br />
        <span className="text-brand">HANDBOOK</span>
      </>
    ),
    body: "By Samuel Nuhu Iliya — a practical, no-fluff guide to stacking income streams from cleaning, dry cleaning, marketplace commerce and affiliate marketing.",
    cta: { label: "Buy Now", href: "/shop", icon: "wallet" },
    secondary: { label: "Gift & Package", href: "/shop", icon: "package" },
    visual: "book",
  },
];

const AVATARS = ["/images/avatars/avatar-1.jpg", "/images/avatars/avatar-2.jpg", "/images/avatars/avatar-3.jpg"];
const HOLD = 6500;

/* ── small pieces ──────────────────────────────────────────── */

function ProofCluster({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {AVATARS.map((src) => (
          <span
            key={src}
            className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-ink"
          >
            <Image src={src} alt="" fill sizes="44px" className="object-cover" />
          </span>
        ))}
        <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-brand text-[11px] font-bold text-ink">
          3M+
        </span>
      </div>
      <span className="text-[15px] text-white/85">{label}</span>
    </div>
  );
}

function CtaButton({ cta }: { cta: CTA }) {
  const classes = cta.soon
    ? "inline-flex items-center gap-2 rounded-xl bg-brand/15 px-7 py-3.5 text-[15px] font-bold text-brand transition-colors hover:bg-brand/25"
    : "inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-[15px] font-bold text-ink transition-opacity hover:opacity-90";
  const inner = (
    <>
      {cta.label} <Icon name={cta.icon} size={16} />
    </>
  );
  return cta.external ? (
    <a href={cta.href} className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={cta.href} className={classes}>
      {inner}
    </Link>
  );
}

function SecondaryButton({ cta }: { cta: CTA }) {
  return (
    <Link
      href={cta.href}
      className="inline-flex items-center gap-2 rounded-xl border border-brand/60 px-7 py-3.5 text-[15px] font-bold text-brand transition-colors hover:bg-brand/10"
    >
      <Icon name={cta.icon} size={16} /> {cta.label}
    </Link>
  );
}

const STRIPE =
  "repeating-linear-gradient(45deg, var(--color-brand) 0 9px, var(--color-ink) 9px 18px)";

function Badges() {
  return (
    <>
      <span className="absolute bottom-20 left-0 z-20 inline-flex items-center gap-2 rounded-2xl bg-white/95 px-3.5 py-2 text-[13px] font-bold text-ink shadow-lg backdrop-blur">
        <Icon name="crown" size={15} className="text-brand" /> Best Seller
      </span>
      <span className="absolute right-0 top-24 z-20 inline-flex items-center gap-2 rounded-2xl bg-white/95 px-3.5 py-2 text-[13px] font-bold text-ink shadow-lg backdrop-blur">
        <Icon name="truck" size={15} className="text-brand" /> Nationwide{" "}
        <span className="text-brand">Delivery</span>
      </span>
    </>
  );
}

function HeroVisual({ slide }: { slide: Slide }) {
  if (slide.visual === "book") {
    return (
      <div className="relative mx-auto h-[360px] w-full max-w-[500px] sm:h-[460px]">
        <div aria-hidden className="absolute inset-x-6 bottom-0 top-10 rounded-3xl bg-white/[0.04]" />
        <div
          aria-hidden
          className="absolute -bottom-2 right-4 z-0 h-28 w-28 overflow-hidden rounded-full opacity-90"
          style={{ background: STRIPE }}
        />
        <div className="relative z-10 mx-auto h-full w-[70%] overflow-hidden rounded-xl shadow-2xl">
          <Image
            src="/images/products/the-daniliya-method.jpg"
            alt="Builder's Handbook cover"
            fill
            priority
            sizes="360px"
            quality={90}
            className="object-cover"
          />
        </div>
        <Badges />
      </div>
    );
  }

  // Transparent cut-out subject sitting directly on the dark hero, full-height
  // (object-contain = never cropped) and bleeding above a soft backdrop card.
  return (
    <div className="relative mx-auto h-[400px] w-full max-w-[540px] sm:h-[500px]">
      <div aria-hidden className="absolute inset-x-2 bottom-0 top-20 rounded-3xl bg-white/[0.04]" />
      <div
        aria-hidden
        className="absolute bottom-4 right-2 z-0 h-28 w-28 overflow-hidden rounded-full opacity-90"
        style={{ background: STRIPE }}
      />
      <div className="absolute inset-0 z-10">
        <Image
          src={slide.visual}
          alt=""
          fill
          priority
          sizes="(max-width:1024px) 85vw, 540px"
          quality={90}
          className="object-contain object-bottom"
        />
      </div>
      <Badges />
    </div>
  );
}

/* ── bottom quick-link bar ─────────────────────────────────── */

const quickLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Book a Service", href: "/services" },
  { label: "Earn as an Affiliate", href: `${portals.affiliate}/join/signup`, external: true },
  { label: "Become an Influencer", href: portals.influencer, external: true },
  { label: "Become a Vendor", href: portals.vendor, external: true },
];

function QuickLink({ label, href, external }: { label: string; href: string; external?: boolean }) {
  const cls =
    "group flex items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-brand/50 hover:bg-white/[0.06]";
  const inner = (
    <>
      <span className="flex items-center gap-3 text-[15px] font-bold text-white">
        <Icon name="hexagon" size={20} className="text-white/70" />
        {label}
      </span>
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand/40 text-brand transition-colors group-hover:bg-brand group-hover:text-ink">
        <Icon name="arrow-up-right" size={14} />
      </span>
    </>
  );
  return external ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* ── main ──────────────────────────────────────────────────── */

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), HOLD);
    return () => clearInterval(t);
  }, [paused]);

  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <section
      className="relative overflow-hidden bg-ink text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pinstripes absolute inset-0" aria-hidden />

      {/* slides */}
      <div className="relative">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {slides.map((s) => (
            <div key={s.key} className="w-full shrink-0">
              <div className="mx-auto grid max-w-[1376px] items-center gap-10 px-6 pb-10 pt-12 sm:px-12 lg:grid-cols-2 lg:pt-16">
                {/* Text */}
                <div className="text-center lg:text-left">
                  <div className="flex justify-center lg:justify-start">
                    <ProofCluster label={s.proof} />
                  </div>
                  <h1 className="mt-7 text-[44px] font-bold uppercase leading-[0.95] tracking-tight sm:text-[64px] lg:text-[76px]">
                    {s.title}
                  </h1>
                  <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/75 lg:mx-0">
                    {s.body}
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                    <CtaButton cta={s.cta} />
                    {s.secondary && <SecondaryButton cta={s.secondary} />}
                  </div>
                </div>

                {/* Visual */}
                <HeroVisual slide={s} />
              </div>
            </div>
          ))}
        </div>

        {/* edge chevrons */}
        <button
          aria-label="Previous slide"
          onClick={() => go(i - 1)}
          className="absolute left-1 top-1/2 hidden -translate-y-1/2 p-2 text-brand transition-opacity hover:opacity-70 sm:left-3 sm:block"
        >
          <Icon name="chevron-left" size={30} />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(i + 1)}
          className="absolute right-1 top-1/2 hidden -translate-y-1/2 p-2 text-brand transition-opacity hover:opacity-70 sm:right-3 sm:block"
        >
          <Icon name="chevron-right" size={30} />
        </button>
      </div>

      {/* bottom quick-link bar */}
      <div className="relative mx-auto max-w-[1376px] px-6 pb-10 sm:px-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((q) => (
            <QuickLink key={q.label} {...q} />
          ))}
        </div>
      </div>
    </section>
  );
}
