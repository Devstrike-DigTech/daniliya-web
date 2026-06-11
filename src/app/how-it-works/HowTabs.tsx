"use client";

import Image from "next/image";
import { useState } from "react";
import { affiliateSteps, customerSteps, influencerSteps } from "@/lib/data";

const tabs = [
  { key: "customers", label: "For Customers" },
  { key: "affiliates", label: "For Affiliates" },
  { key: "influencers", label: "For Influencers" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const content: Record<
  TabKey,
  { steps: { title: string; text: string }[]; imagePrefix?: string }
> = {
  customers: { steps: customerSteps, imagePrefix: "customer-step" },
  affiliates: { steps: affiliateSteps, imagePrefix: "affiliate-step" },
  influencers: { steps: influencerSteps },
};

export default function HowTabs() {
  const [active, setActive] = useState<TabKey>("customers");
  const { steps, imagePrefix } = content[active];

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-ink/10 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
              active === tab.key
                ? "bg-ink text-brand"
                : "text-ink/50 hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-12 space-y-16">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className={`grid items-center gap-8 lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div>
              <p className="text-6xl font-bold text-brand/40">
                0{i + 1}
              </p>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                {step.title}
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-ink/60">
                {step.text}
              </p>
            </div>
            {imagePrefix ? (
              <div className="relative aspect-[10/7] overflow-hidden rounded-2xl">
                <Image
                  src={`/images/how-it-works/${imagePrefix}-${i + 1}.jpg`}
                  alt={step.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[10/7] items-center justify-center rounded-2xl bg-ink">
                <p className="px-10 text-center text-xl font-bold text-brand">
                  {step.title}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
