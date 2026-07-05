import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import HowTabs from "./HowTabs";

export const metadata: Metadata = {
  title: "How it Works",
  description:
    "Whether you're earning as an affiliate, influencer or vendor — every process is designed to be clear and effortless.",
};

const STRIPE =
  "repeating-linear-gradient(45deg, var(--color-brand) 0 9px, var(--color-ink) 9px 18px)";

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0c0c0c] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="relative mx-auto grid max-w-[1376px] items-center gap-10 px-4 py-14 sm:px-8 lg:grid-cols-2 lg:py-20">
          {/* Left */}
          <div className="text-center lg:text-left">
            <h1 className="text-[clamp(44px,7vw,80px)] font-extrabold uppercase leading-[0.95] tracking-tight">
              HOW TO EARN
              <br />
              100K <span className="text-brand">WEEKLY</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-[15.5px] leading-relaxed text-white/70 lg:mx-0">
              Whether you&apos;re earning as an affiliate, influencer or vendor,
              every process is designed to be clear and effortless.
            </p>
          </div>

          {/* Right visual */}
          <div className="relative mx-auto h-[360px] w-full max-w-[500px] sm:h-[460px]">
            <div aria-hidden className="absolute inset-x-6 bottom-0 top-16 rounded-3xl bg-white/[0.04]" />
            <div
              aria-hidden
              className="absolute bottom-4 right-4 z-0 h-24 w-24 overflow-hidden rounded-full opacity-90"
              style={{ background: STRIPE }}
            />
            <div className="absolute inset-0 z-10">
              <Image
                src="/images/home/hero-influencer.png"
                alt="A Daniliya earner"
                fill
                priority
                sizes="(max-width:1024px) 85vw, 500px"
                quality={90}
                className="object-contain object-bottom"
              />
            </div>
            <span className="absolute left-0 top-20 z-20 inline-flex items-center gap-2 rounded-2xl bg-white/95 px-3.5 py-2 text-[13px] font-bold text-ink shadow-lg">
              <Icon name="check" size={15} className="text-brand" /> Easy to use
            </span>
            <span className="absolute right-0 top-28 z-20 inline-flex items-center gap-2 rounded-2xl bg-coal px-3.5 py-2 text-[13px] font-bold text-white shadow-lg">
              <Icon name="wallet" size={15} className="text-brand" /> Earn{" "}
              <span className="text-brand">Weekly</span>
            </span>
          </div>
        </div>
      </section>

      {/* Audience tabs */}
      <section className="bg-paper py-14">
        <HowTabs />
      </section>
    </>
  );
}
