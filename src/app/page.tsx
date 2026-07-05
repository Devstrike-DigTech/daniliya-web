import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import HomeHero from "@/components/HomeHero";
import ShopCatalogue from "@/components/ShopCatalogue";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import { products } from "@/lib/data";
import { portals } from "@/lib/portals";

type ValueCard = {
  n: string;
  title: string;
  text: string;
  img: string;
  grad: string;
  href?: string;
  external?: boolean;
  soon?: boolean;
};

const valueCards: ValueCard[] = [
  {
    n: "01",
    title: "Builder's Handbook",
    text: "A practical, no-fluff guide to stacking income streams.",
    img: "/images/products/the-daniliya-method.jpg",
    grad: "from-[#b5923a] to-[#7c6224]",
    href: "/shop/the-daniliya-method",
  },
  {
    n: "02",
    title: "Earn 100k Weekly",
    text: "Share your link and earn on every order.",
    img: "/images/home/hero-affiliate.png",
    grad: "from-[#1f7a45] to-[#123e26]",
    href: `${portals.affiliate}/join/signup`,
    external: true,
  },
  {
    n: "03",
    title: "Earn as an Influencer",
    text: "Built for creators with an audience.",
    img: "/images/home/hero-influencer.png",
    grad: "from-[#6d3fa0] to-[#3a2160]",
    href: portals.influencer,
    external: true,
  },
  {
    n: "04",
    title: "Become a Vendor",
    text: "List your products on Daniliya — coming soon.",
    img: "/images/home/hero-vendor.png",
    grad: "from-[#3a3a3a] to-[#232323]",
    soon: true,
  },
];

function ValueCardInner({ c }: { c: ValueCard }) {
  return (
    <>
      {c.soon && (
        <span className="absolute -right-11 top-6 z-10 rotate-45 bg-brand px-12 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
          Soon
        </span>
      )}
      <span className="w-fit rounded-lg bg-brand px-2.5 py-1 text-[13px] font-bold text-white">
        {c.n}
      </span>
      <h3 className="mt-4 text-[22px] font-bold leading-tight text-white">{c.title}</h3>
      <p className="mt-1.5 max-w-[85%] text-[13.5px] leading-relaxed text-white/70">{c.text}</p>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[210px]">
        <Image
          src={c.img}
          alt=""
          fill
          sizes="(max-width:1024px) 50vw, 25vw"
          className="object-contain object-bottom"
        />
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[#0c0c0c]">
      {/* Hero — single static "Earn ₦100K every week" earner hero */}
      <HomeHero />

      {/* Cleaning promo band */}
      <section className="bg-[#0c0c0c]">
        <div className="mx-auto max-w-[1376px] px-4 py-10 sm:px-8">
          <Reveal>
            <div className="relative min-h-[280px] overflow-hidden rounded-3xl sm:min-h-[340px]">
              <Image
                src="/images/home/service-laundry.jpg"
                alt="Professional cleaning by Daniliya"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent"
              />
              <div className="relative flex h-full flex-col justify-center p-8 sm:p-14">
                <h2 className="max-w-xl text-[30px] font-bold leading-tight text-white sm:text-[44px]">
                  Ready for a serious clean?
                </h2>
                <p className="mt-3 max-w-md text-[15px] text-white/85 sm:text-[16px]">
                  Get a tailored quote within 24 hours — or book a one-off service right now.
                </p>
                <Link
                  href="/quote"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-[15px] font-bold text-ink transition-opacity hover:opacity-90"
                >
                  Get a Quote <Icon name="arrow-right" size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4-card value grid */}
      <section className="bg-[#0c0c0c]">
        <div className="mx-auto max-w-[1376px] px-4 pb-16 pt-4 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valueCards.map((c, i) => {
              const cls = `group relative flex min-h-[380px] flex-col overflow-hidden rounded-2xl bg-gradient-to-b ${c.grad} p-6`;
              return (
                <Reveal key={c.n} delay={i * 100}>
                  {c.href ? (
                    c.external ? (
                      <a href={c.href} className={cls}>
                        <ValueCardInner c={c} />
                      </a>
                    ) : (
                      <Link href={c.href} className={cls}>
                        <ValueCardInner c={c} />
                      </Link>
                    )
                  ) : (
                    <div className={cls}>
                      <ValueCardInner c={c} />
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shop our catalogue */}
      <section className="bg-[#121212]">
        <div className="mx-auto max-w-[1376px] px-4 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-2.5 text-lg text-brand">
                <span aria-hidden className="h-px w-6 bg-brand" />
                The Store
              </p>
              <h2 className="mt-4 text-[34px] font-bold text-white sm:text-[44px]">
                Shop our catalogue.
              </h2>
              <p className="mt-2 text-[15px] text-white/65">
                Curated products from Daniliya and trusted Nigerian vendors.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-[15px] font-bold text-ink transition-opacity hover:opacity-90"
            >
              See More Products <Icon name="arrow-right" size={16} />
            </Link>
          </div>
          <ShopCatalogue products={products} tone="dark" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="overflow-hidden bg-[#0c0c0c] py-20">
        <h2 className="text-center text-[32px] font-bold text-white sm:text-[36px]">
          Nigerians who chose <span className="text-brand">Daniliya</span>
        </h2>
        <TestimonialMarquee />
      </section>
    </div>
  );
}
