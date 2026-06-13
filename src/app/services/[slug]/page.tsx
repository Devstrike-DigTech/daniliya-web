import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import SectionTag from "@/components/SectionTag";
import AccentText from "@/components/AccentText";
import PillArrowBtn from "@/components/PillArrowBtn";
import Ambient, { type AmbientTheme } from "@/components/Ambient";
import GalleryCarousel from "@/components/GalleryCarousel";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Icon from "@/components/Icon";
import { verticals } from "@/lib/data";

const AMBIENT_THEMES: Record<string, AmbientTheme> = {
  laundry: "cleaning",
  "dry-cleaning": "drycleaning",
  "interior-decoration": "interior",
  construction: "construction",
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return verticals.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vertical = verticals.find((v) => v.slug === slug);
  return { title: vertical ? vertical.name : "Service" };
}

const featureIcons = [
  "feature-fast",
  "feature-team",
  "feature-natural",
  "feature-pricing",
];

const stepIcons = ["step-book", "step-clean", "step-fresh"];

export default async function VerticalPage({ params }: Props) {
  const { slug } = await params;
  const vertical = verticals.find((v) => v.slug === slug);
  if (!vertical) notFound();

  return (
    <>
      <Ambient theme={AMBIENT_THEMES[vertical.slug] ?? "home"} />
      {/* Hero */}
      <section className="relative bg-ink text-white">
        <div className="pinstripes absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-[1376px] px-4 sm:px-8">
          <div className="grid items-center gap-10 pt-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16 lg:pt-20">
            <h1 className="fade-up text-[38px] font-bold leading-[1.05] tracking-tight sm:text-[52px] lg:text-[64px]">
              {vertical.hero.line1}
              <br />
              <AccentText a={vertical.hero.line2} />
            </h1>
            <div className="fade-up fade-up-1">
              <p className="max-w-sm text-[15px] leading-relaxed text-white/85">
                {vertical.hero.text}
              </p>
              <div className="mt-6">
                <PillArrowBtn href="/quote">{vertical.hero.cta}</PillArrowBtn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero gallery — breaks out of the dark band.
          Mobile: swipeable carousel · sm and up: 3-column grid */}
      <div className="bg-[linear-gradient(to_bottom,var(--color-ink)_0,var(--color-ink)_150px,transparent_150px)] pt-12">
        <div className="fade-up fade-up-2 mx-auto max-w-[1376px] px-4 sm:px-8">
          <GalleryCarousel
            className="sm:hidden"
            altBase={`${vertical.name} gallery`}
            images={[1, 2, 3].map(
              (n) => `/images/verticals/${vertical.slug}/gallery-${n}.jpg`,
            )}
          />
          <div className="hidden gap-6 sm:grid sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="relative aspect-[4/3.6] overflow-hidden rounded-2xl"
              >
                <Image
                  src={`/images/verticals/${vertical.slug}/gallery-${n}.jpg`}
                  alt={`${vertical.name} gallery ${n}`}
                  fill
                  priority={n === 1}
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1376px] items-center gap-14 px-4 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="relative mb-14 lg:mb-0">
            <div className="relative aspect-[5/6] max-w-[440px] overflow-hidden rounded-2xl">
              <Image
                src={`/images/verticals/${vertical.slug}/about.jpg`}
                alt={vertical.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            {/* floating stat card */}
            <div className="absolute -bottom-12 left-4 w-60 rounded-2xl bg-white p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="relative -ml-2.5 h-9 w-9 overflow-hidden rounded-full border-2 border-white first:ml-0"
                    >
                      <Image
                        src={`/images/avatars/avatar-${i}.jpg`}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                </div>

                <CountUp
                  value={vertical.about.stat.value}
                  className="text-[34px] font-bold text-brand leading-none"
                />
              </div>

              <p className="mt-2 text-[13px] leading-snug text-ink">
                {vertical.about.stat.label}
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <SectionTag>About us</SectionTag>
            <h2 className="mt-5 max-w-xl text-[34px] font-bold leading-tight sm:text-[40px]">
              <AccentText a={vertical.about.title} variant="badge" />
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink">
              {vertical.about.text}
            </p>
            <div className="mt-8 grid max-w-md grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {vertical.badges.map((b) => (
                <p
                  key={b}
                  className="flex items-center gap-2.5 text-[15px] font-bold"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                    <Icon name="check" size={12} />
                  </span>
                  {b}
                </p>
              ))}
            </div>
            <div className="mt-9">
              <PillArrowBtn href="/quote">Get a Quote</PillArrowBtn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why choose us — checkerboard features */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1376px] items-center gap-14 px-4 py-24 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <SectionTag>Why Choose us</SectionTag>
            <h2 className="mt-5 max-w-lg text-[34px] font-bold leading-tight sm:text-[40px]">
              <AccentText a={vertical.why.title} />
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/75">
              {vertical.why.text}
            </p>
            <div className="mt-9">
              <PillArrowBtn href="/quote">Get a Quote</PillArrowBtn>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {vertical.features.map((f, i) => {
              const dark = i === 0 || i === 3;
              return (
                <Reveal key={f.text} delay={i * 120}>
                <div
                  className={`h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                    dark
                      ? "bg-coal text-white hover:shadow-xl"
                      : "bg-white shadow-sm hover:shadow-lg"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      dark ? "bg-white/10 text-brand" : "bg-ink text-brand"
                    }`}
                  >
                    <Icon
                      name={featureIcons[i % featureIcons.length]}
                      size={20}
                    />
                  </span>
                  <p className="mt-5 text-[19px] font-bold">
                    <AccentText a={f.title} />
                  </p>
                  <p
                    className={`mt-2 text-[13px] leading-relaxed ${
                      dark ? "text-white/70" : "text-ink/60"
                    }`}
                  >
                    {f.text}
                  </p>
                </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process — staggered steps */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1376px] px-4 py-24 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionTag>Our Process</SectionTag>
              <h2 className="mt-5 max-w-lg text-[34px] font-bold leading-tight sm:text-[40px]">
                <AccentText a={vertical.process.title} />
              </h2>
            </div>
            <PillArrowBtn href="/quote">Get a Quote</PillArrowBtn>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {vertical.steps.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 150}
                className={
                  i === 1 ? "lg:mt-20" : i === 2 ? "lg:mt-40" : ""
                }
              >
              <div className="relative h-full rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgba(33,33,33,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(33,33,33,0.12)]">
                <span
                  aria-hidden
                  className="absolute right-7 top-6 text-[56px] font-bold leading-none text-ink/10"
                >
                  0{i + 1}
                </span>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-coal text-brand">
                  <Icon name={stepIcons[i % stepIcons.length]} size={24} />
                </span>
                <p className="mt-8 text-[21px] font-bold">{s.title}</p>
                <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-ink/60">
                  {s.text}
                </p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mt-32 bg-brand">
        <div
          aria-hidden
          className="absolute -left-10 top-6 h-24 w-24 rounded-full bg-[repeating-linear-gradient(135deg,#212121_0,#212121_5px,transparent_5px,transparent_11px)]"
        />
        <div
          aria-hidden
          className="absolute bottom-0 right-0 h-20 w-20 overflow-hidden"
        >
          <div className="h-40 w-40 rounded-full bg-[repeating-linear-gradient(135deg,#212121_0,#212121_5px,transparent_5px,transparent_11px)]" />
        </div>

        <div className="mx-auto grid max-w-[1376px] grid-cols-1 items-center gap-8 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative hidden h-[280px] lg:block">
            <Image
              src={`/images/verticals/${vertical.slug}/cta-person.png`}
              alt={`${vertical.name} professional`}
              width={300}
              height={430}
              className="absolute bottom-0 left-10 h-[400px] w-auto object-contain object-bottom"
            />
          </div>

          <Reveal className="py-12 lg:py-14">
            <h2 className="max-w-md text-[34px] font-bold leading-tight text-ink sm:text-[40px]">
              {vertical.cta.title}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white">
              {vertical.cta.text}
            </p>
            <div className="mt-7">
              <PillArrowBtn href="/quote" dark>
                {vertical.cta.button}
              </PillArrowBtn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
