"use client";

import Image from "next/image";
import { useState } from "react";
import AccentText from "@/components/AccentText";
import Reveal from "@/components/Reveal";
import { howItWorksTabs } from "@/lib/data";
import type { HowStep } from "@/lib/data";

function GridCard({ step, i }: { step: HowStep; i: number }) {
  const gold = i === 0 || i === 3;
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-3xl pt-8 sm:pt-10 ${
        gold ? "bg-brand text-ink" : "bg-coal text-white"
      }`}
    >
      <div className="px-8 sm:px-10">
        <p
          aria-hidden
          className={`bg-gradient-to-b bg-clip-text text-[56px] font-bold leading-none text-transparent sm:text-[64px] ${
            gold ? "from-white to-white/60" : "from-white/45 to-white/10"
          }`}
        >
          0{i + 1}
        </p>
        <p className="mt-3 text-[24px] font-bold sm:text-[26px]">
          <AccentText a={step.title} />
        </p>
        <p
          className={`mt-3 max-w-md text-[15px] leading-relaxed ${
            gold ? "text-ink/80" : "text-white/70"
          }`}
        >
          {step.text}
        </p>
      </div>
      {/* screenshot — full-bleed, cropped by the card's bottom edge */}
      <div className="relative mt-8 aspect-[16/9] w-full">
        <Image
          src={step.img}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function TimelineRow({ step, i }: { step: HowStep; i: number }) {
  const textFirst = i % 2 === 1;
  return (
    <div className="relative grid items-center gap-8 py-10 lg:grid-cols-2 lg:gap-24 lg:py-14">
      {/* gold connector dot on the row boundary */}
      <span
        aria-hidden
        className="absolute left-1/2 top-0 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand lg:block"
      />
      <div className={textFirst ? "" : "lg:order-2"}>
        <p
          aria-hidden
          className="bg-gradient-to-b from-[#eed9a3] to-brand bg-clip-text text-[48px] font-bold leading-none text-transparent sm:text-[56px]"
        >
          0{i + 1}
        </p>
        <p className="mt-3 text-[24px] font-bold sm:text-[26px]">
          <AccentText a={step.title} />
        </p>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/70">
          {step.text}
        </p>
      </div>
      <div>
        {/* gold panel — screenshot bleeds off the bottom edge */}
        <div className="overflow-hidden rounded-3xl bg-brand px-5 pt-5 sm:px-8 sm:pt-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
            <Image
              src={step.img}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Four-audience tab switcher: grid layout for Customers/Vendors,
 * center-line timeline for Affiliates/Influencers. */
export default function HowTabs() {
  const [active, setActive] = useState(0);
  const tab = howItWorksTabs[active];

  return (
    <div className="mx-auto max-w-[1376px] px-4 sm:px-8">
      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto border-b border-ink/10 sm:gap-8">
        {howItWorksTabs.map((t, i) => (
          <button
            key={t.key}
            onClick={() => setActive(i)}
            className={`relative shrink-0 px-2 py-4 text-[15px] transition-colors ${
              i === active
                ? "font-bold text-ink"
                : "text-ink/45 hover:text-ink/70"
            }`}
          >
            {t.label}
            {i === active && (
              <span
                aria-hidden
                className="absolute inset-x-2 -bottom-px h-0.5 bg-brand"
              />
            )}
          </button>
        ))}
      </div>

      {/* Panel */}
      {tab.layout === "grid" ? (
        <div className="grid gap-8 py-12 lg:grid-cols-2">
          {tab.steps.map((s, i) => (
            <Reveal key={`${tab.key}-${i}`} delay={i * 120}>
              <GridCard step={s} i={i} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="relative py-6">
          {/* thick soft-gray connector line */}
          <span
            aria-hidden
            className="absolute inset-y-6 left-1/2 hidden w-1.5 -translate-x-1/2 rounded-full bg-ink/10 lg:block"
          />
          {tab.steps.map((s, i) => (
            <Reveal key={`${tab.key}-${i}`} delay={i === 0 ? 0 : 100}>
              <TimelineRow step={s} i={i} />
            </Reveal>
          ))}
          {/* closing dot after the last step */}
          <span
            aria-hidden
            className="absolute bottom-6 left-1/2 hidden h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand lg:block"
          />
        </div>
      )}
    </div>
  );
}
