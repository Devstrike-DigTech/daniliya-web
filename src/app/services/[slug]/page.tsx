import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionTag from "@/components/SectionTag";
import { verticals } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return verticals.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vertical = verticals.find((v) => v.slug === slug);
  return { title: vertical ? vertical.name : "Service" };
}

export default async function VerticalPage({ params }: Props) {
  const { slug } = await params;
  const vertical = verticals.find((v) => v.slug === slug);
  if (!vertical) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionTag>{vertical.name}</SectionTag>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            {vertical.heroTitle[0]}
            <br />
            <span className="text-brand">{vertical.heroTitle[1]}</span>
          </h1>
          <p className="mt-5 max-w-xl text-white/60">{vertical.heroText}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/quote"
              className="rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-ink transition-opacity hover:opacity-90"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold transition-colors hover:border-brand hover:text-brand"
            >
              Talk to us
            </Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={`/images/verticals/${vertical.slug}/gallery-${n}.jpg`}
                  alt={`${vertical.name} gallery ${n}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {vertical.badges.map((b) => (
            <div key={b} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm text-ink">
                ✓
              </span>
              <p className="text-sm font-bold">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
          <Image
            src={`/images/verticals/${vertical.slug}/about.jpg`}
            alt={vertical.about.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionTag>About this service</SectionTag>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            {vertical.about.title}
          </h2>
          <p className="mt-5 leading-relaxed text-ink/60">{vertical.about.text}</p>
          <div className="mt-8 inline-block rounded-2xl bg-cream px-8 py-6">
            <p className="text-4xl font-bold text-gold">
              {vertical.about.stat.value}
            </p>
            <p className="mt-1 text-sm text-ink/60">{vertical.about.stat.label}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionTag>Why Daniliya</SectionTag>
          <h2 className="mt-5 max-w-xl text-3xl font-bold sm:text-4xl">
            {vertical.name} that goes beyond{" "}
            <span className="text-gold">expectations.</span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vertical.features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-bold text-ink">
                  ★
                </span>
                <p className="mt-4 font-bold">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTag>How it works</SectionTag>
        <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
          Get started in just three <span className="text-gold">steps.</span>
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {vertical.steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-2xl border border-ink/10 bg-white p-8"
            >
              <p className="text-5xl font-bold text-brand">0{i + 1}</p>
              <p className="mt-4 text-lg font-bold">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl bg-brand p-10 sm:p-14">
          <h2 className="max-w-lg text-3xl font-bold text-ink sm:text-4xl">
            {vertical.cta.title}
          </h2>
          <p className="mt-3 max-w-md text-ink/70">{vertical.cta.text}</p>
          <Link
            href="/quote"
            className="mt-7 inline-block rounded-full bg-ink px-8 py-4 text-sm font-bold text-brand transition-opacity hover:opacity-90"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
