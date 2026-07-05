import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { portals } from "@/lib/portals";

const chips = [
  { top: "Paid Every", bold: "Monday", icon: "package", tint: "text-green", bg: "bg-green/15" },
  { top: "₦10K", bold: "Per Sale", icon: "wallet", tint: "text-brand", bg: "bg-brand/15" },
  { top: "10k", bold: "Affiliates", icon: "users", tint: "text-[#a855f7]", bg: "bg-[#a855f7]/15" },
];

const avatars = ["avatar-1", "avatar-2", "avatar-3"];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#0c0c0c] text-white">
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      {/* green glow bleeding from the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[680px] w-[680px] -translate-y-1/2 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle,rgba(31,168,80,0.28) 0%,rgba(16,64,42,0.10) 45%,transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1376px] items-center gap-10 px-4 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        {/* ── Left ── */}
        <div className="text-center lg:text-left">
          {/* social proof */}
          <div className="flex items-center justify-center gap-3 lg:justify-start">
            <div className="flex -space-x-3">
              {avatars.map((a) => (
                <span
                  key={a}
                  className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-[#0c0c0c]"
                >
                  <Image src={`/images/avatars/${a}.jpg`} alt="" fill sizes="44px" className="object-cover" />
                </span>
              ))}
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0c0c0c] bg-green text-[11px] font-bold text-white">
                10k+
              </span>
            </div>
            <p className="text-left text-[15px] leading-tight text-white/85">
              <span className="font-bold text-green">10,000+</span> Nigerians
              <br />
              Already Earning on Daniliya
            </p>
          </div>

          {/* headline */}
          <h1 className="mt-7 text-[clamp(44px,7vw,84px)] font-extrabold uppercase leading-[0.92] tracking-tight">
            EARN <span className="text-brand">₦100K</span>
            <br />
            EVERY WEEK
          </h1>

          {/* body */}
          <p className="mx-auto mt-6 max-w-lg text-[15.5px] leading-relaxed text-white/70 lg:mx-0">
            Become a top earner on Daniliya by becoming an affiliate, or an
            influencer by sharing our products on your socials — enjoy weekly
            payouts &amp; bonuses. Get started today.
          </p>

          {/* stat chips */}
          <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            {chips.map((c) => (
              <div
                key={c.bold}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <span className={`flex h-9 w-9 items-center justify-center rounded-full ${c.bg} ${c.tint}`}>
                  <Icon name={c.icon} size={17} />
                </span>
                <span className="text-left leading-tight">
                  <span className="block text-[11px] text-white/55">{c.top}</span>
                  <span className="block text-sm font-bold">{c.bold}</span>
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a
              href={`${portals.affiliate}/join/signup`}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-[15px] font-bold text-ink transition-opacity hover:opacity-90"
            >
              Get started <Icon name="arrow-right" size={16} />
            </a>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-brand px-8 py-4 text-[15px] font-bold text-brand transition-colors hover:bg-brand/10"
            >
              See how it works <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          {/* trust line */}
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/65 lg:justify-start">
            <Icon name="shield-check" size={17} className="text-green" />
            KYC Verified, Trusted by thousands
          </p>
        </div>

        {/* ── Right ── */}
        <div className="relative mx-auto h-[380px] w-full max-w-[540px] sm:h-[520px]">
          {/* green disc backdrop */}
          <div
            aria-hidden
            className="absolute right-2 top-1/2 h-[340px] w-[340px] -translate-y-1/2 rounded-full sm:h-[440px] sm:w-[440px]"
            style={{
              background:
                "radial-gradient(circle at 50% 45%,#1f7a45 0%,#14512e 46%,rgba(12,12,12,0) 72%)",
            }}
          />
          {/* earner cut-out (stand-in: swap for a wallet/cash cut-out when supplied) */}
          <div className="absolute inset-0 z-10">
            <Image
              src="/images/home/hero-affiliate.png"
              alt="A Daniliya affiliate earning weekly"
              fill
              priority
              sizes="(max-width:1024px) 90vw, 540px"
              quality={90}
              className="object-contain object-bottom"
            />
          </div>

          {/* "This Week" earnings card */}
          <div className="absolute left-0 top-4 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#141414]/90 px-4 py-3 shadow-xl backdrop-blur sm:top-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green/20 text-green">
              <Icon name="trending-up" size={18} />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] text-white/50">This Week</span>
              <span className="block text-[17px] font-bold">₦147,000</span>
              <span className="block text-[11px] font-bold text-green">+24% from last week</span>
            </span>
          </div>

          {/* "Paid Every Monday" card */}
          <div
            className="absolute bottom-14 right-0 z-20 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl"
            style={{ background: "linear-gradient(135deg,#caa33a,#8a6a15)" }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white">
              <Icon name="wallet" size={17} />
            </span>
            <span className="leading-tight text-white">
              <span className="block text-[11px] opacity-80">Paid Every</span>
              <span className="block text-sm font-bold">Monday</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
