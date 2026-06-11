import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTag from "@/components/SectionTag";
import { verticals } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Laundry, dry cleaning, interior decoration and construction — one standard of excellence.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionTag>What we offer</SectionTag>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            OUR <span className="text-brand">SERVICES.</span>
          </h1>
          <p className="mt-5 max-w-xl text-white/60">
            Four verticals, one standard. Pick a service to see how we work,
            what we charge and how to book.
          </p>
        </div>
      </section>

      {verticals.map((v, i) => (
        <section
          key={v.slug}
          className={i % 2 === 1 ? "bg-cream" : "bg-paper"}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <SectionTag>{`Service 0${i + 1}`}</SectionTag>
              <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
                {v.name}{" "}
                <span className="text-gold">{v.tagline.split(" ").slice(-1)}</span>
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-ink/60">
                {v.heroText}
              </p>
              <ul className="mt-6 space-y-3">
                {v.badges.slice(0, 3).map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm font-bold">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs text-ink">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${v.slug}`}
                className="mt-8 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-brand transition-opacity hover:opacity-90"
              >
                Learn more
              </Link>
            </div>
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${
                i % 2 === 1 ? "lg:order-1" : ""
              }`}
            >
              <Image
                src={`/images/verticals/${v.slug}/about.jpg`}
                alt={v.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
