import type { Metadata } from "next";
import Image from "next/image";
import Ambient from "@/components/Ambient";
import GalleryCarousel from "@/components/GalleryCarousel";
import HowTabs from "./HowTabs";

export const metadata: Metadata = {
  title: "How it Works",
  description:
    "Whether you're booking a service, buying a product, or earning as an affiliate — every process is designed to be clear and effortless.",
};

const heroImages = [1, 2, 3].map((n) => `/images/how-it-works/hero-${n}.jpg`);

export default function HowItWorksPage() {
  return (
    <>
      <Ambient theme="steps" />

      {/* Hero */}
      <section className="relative bg-ink text-white">
        <div className="pinstripes absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-[1376px] px-4 sm:px-8">
          <div className="grid items-center gap-10 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-20">
            <h1 className="fade-up text-[40px] font-bold leading-[1.05] tracking-tight sm:text-[56px] lg:text-[64px]">
              SIMPLE,
              <br />
              <span className="text-brand">TRANSPARENT.</span>
            </h1>
            <p className="fade-up fade-up-1 max-w-md text-[15px] leading-relaxed text-white/85">
              Whether you&apos;re booking a service, buying a product, or
              earning as an affiliate — every process is designed to be clear
              and effortless.
            </p>
          </div>
        </div>
      </section>

      {/* Hero photos — break out of the dark band */}
      <div className="bg-[linear-gradient(to_bottom,var(--color-ink)_0,var(--color-ink)_150px,transparent_150px)] pt-12">
        <div className="fade-up fade-up-2 mx-auto max-w-[1376px] px-4 sm:px-8">
          <GalleryCarousel
            className="sm:hidden"
            images={heroImages}
            altBase="How Daniliya works"
          />
          <div className="hidden grid-cols-3 gap-6 sm:grid">
            {heroImages.map((src, n) => (
              <div
                key={src}
                className="relative aspect-[4/3.2] overflow-hidden rounded-2xl"
              >
                <Image
                  src={src}
                  alt={`How Daniliya works ${n + 1}`}
                  fill
                  priority={n === 0}
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audience tabs */}
      <section className="bg-paper py-14">
        <HowTabs />
      </section>
    </>
  );
}
