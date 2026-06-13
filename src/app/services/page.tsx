import type { Metadata } from "next";
import Link from "next/link";
import SectionTag from "@/components/SectionTag";
import Ambient from "@/components/Ambient";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CrossfadeImage from "@/components/CrossfadeImage";
import { verticals } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Laundry, dry cleaning, interior decoration and construction — one standard of excellence.",
};

export default function ServicesPage() {
  return (
    <>
      <Ambient theme="home" />

      {/* Hero */}
      <section className="relative bg-ink text-white">
        <div className="pinstripes absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-[1376px] px-4 pt-14 sm:px-8 lg:pt-20">
          <p className="fade-up text-[13px] font-bold uppercase tracking-[0.35em] text-brand">
            What we offer
          </p>
          <h1 className="fade-up fade-up-1 mt-4 text-[44px] font-bold leading-none tracking-tight sm:text-[64px] lg:text-[80px]">
            OUR SERVICES.
          </h1>
        </div>
      </section>

      {/* Hero image — breaks out of the dark band */}
      <div className="bg-[linear-gradient(to_bottom,var(--color-ink)_0,var(--color-ink)_150px,transparent_150px)] pt-10">
        <div className="fade-up fade-up-2 mx-auto max-w-[1376px] px-4 sm:px-8">
          <div className="relative aspect-[1360/520] min-h-[220px] w-full overflow-hidden rounded-2xl">
            {/* crossfades through every service */}
            <CrossfadeImage
              priority
              images={[
                "/images/services/hero.jpg",
                ...verticals.map((v) => `/images/verticals/${v.slug}/hero.jpg`),
              ]}
              alt="Daniliya services"
              sizes="100vw"
              intervalMs={5000}
            />
          </div>
        </div>
      </div>

      {/* Service sections — alternating layout, design's collage pattern */}
      {verticals.map((v, i) => {
        const mirrored = i % 2 === 1;
        return (
          <section key={v.slug} className={mirrored ? "bg-cream" : "bg-paper"}>
            <div className="mx-auto grid max-w-[1376px] items-center gap-14 px-4 py-24 sm:px-8 lg:grid-cols-2">
              {/* Text column */}
              <Reveal className={mirrored ? "lg:order-2" : ""}>
                <SectionTag>{`Service 0${i + 1}`}</SectionTag>
                <h2 className="mt-5 text-[34px] font-bold leading-tight sm:text-[44px]">
                  {v.index.line1}
                  <br />
                  {v.index.line2.pre}
                  <span className="italic text-brand">{v.index.line2.gold}</span>
                  {v.index.line2.post}
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/75">
                  {v.index.text}
                </p>
                <ul className="mt-6 space-y-3.5">
                  {v.index.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-3 text-[15px] font-bold"
                    >
                      <span
                        aria-hidden
                        className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {v.index.comingSoon ? (
                    <span className="inline-flex cursor-default items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-[15px] font-bold text-white">
                      <Icon name="clock" size={16} />
                      Coming Soon
                    </span>
                  ) : (
                    <Link
                      href={`/services/${v.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-[15px] font-bold text-white transition-opacity hover:opacity-90"
                    >
                      Learn More <Icon name="arrow-right" size={15} />
                    </Link>
                  )}
                </div>
              </Reveal>

              {/* Collage column: one tall image + two stacked */}
              <Reveal
                delay={150}
                className={mirrored ? "lg:order-1" : ""}
              >
                {/* each tile cycles the gallery on a staggered timer */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative row-span-2 min-h-[340px] overflow-hidden rounded-2xl sm:min-h-[420px]">
                    <CrossfadeImage
                      images={[1, 2, 3].map(
                        (n) => `/images/verticals/${v.slug}/gallery-${n}.jpg`,
                      )}
                      alt={`${v.name} 1`}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      intervalMs={7000}
                      startDelayMs={i * 800}
                    />
                  </div>
                  {[2, 3].map((n) => (
                    <div
                      key={n}
                      className="relative aspect-[5/4] overflow-hidden rounded-2xl"
                    >
                      <CrossfadeImage
                        images={[n, (n % 3) + 1, ((n + 1) % 3) + 1].map(
                          (m) => `/images/verticals/${v.slug}/gallery-${m}.jpg`,
                        )}
                        alt={`${v.name} ${n}`}
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        intervalMs={7000}
                        startDelayMs={i * 800 + n * 1700}
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}
    </>
  );
}
