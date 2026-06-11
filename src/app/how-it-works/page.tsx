import type { Metadata } from "next";
import Image from "next/image";
import SectionTag from "@/components/SectionTag";
import HowTabs from "./HowTabs";

export const metadata: Metadata = {
  title: "How it Works",
  description:
    "Whether you're booking a service, buying a product, or earning as an affiliate — every process is designed to be clear and effortless.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionTag>How it works</SectionTag>
              <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
                SIMPLE, <span className="text-brand">TRANSPARENT.</span>
              </h1>
            </div>
            <p className="max-w-md text-white/60">
              Whether you&apos;re booking a service, buying a product, or
              earning as an affiliate — every process is designed to be clear
              and effortless.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={`/images/how-it-works/hero-${n}.jpg`}
                  alt="Daniliya in action"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <HowTabs />
      </section>
    </>
  );
}
