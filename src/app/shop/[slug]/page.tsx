import type { Metadata } from "next";
import Ambient from "@/components/Ambient";
import Icon from "@/components/Icon";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductBuyBox from "@/components/ProductBuyBox";
import { products } from "@/lib/data";
import { naira } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return { title: product ? product.title : "Product" };
}

const trust = [
  { icon: "truck", text: "Nationwide delivery via verified couriers" },
  { icon: "wallet", text: "Paystack secure checkout — Naira" },
  { icon: "check", text: "Affiliate referrals tracked automatically" },
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const similar = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <Ambient theme="shop" />

      {/* Detail — dark band */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[1376px] px-4 pt-8 sm:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[15px] font-bold text-brand transition-opacity hover:opacity-80"
          >
            <Icon name="arrow-left" size={18} /> Go Back
          </Link>
        </div>
        <div className="mx-auto grid max-w-[1376px] items-center gap-12 px-4 pb-20 pt-8 sm:px-8 lg:grid-cols-2">
          <div className="fade-up relative aspect-[5/4] w-full overflow-hidden rounded-2xl">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute -bottom-2 -left-2 h-16 w-16 bg-[repeating-linear-gradient(135deg,var(--color-brand)_0,var(--color-brand)_4px,transparent_4px,transparent_9px)]"
            />
          </div>
          <div className="fade-up fade-up-1">
            <h1 className="text-[36px] font-bold leading-tight sm:text-[44px]">
              {product.title}
            </h1>
            <p className="mt-3 text-[32px] font-bold text-brand">
              {naira(product.price)}
            </p>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/70">
              {product.description}
            </p>

            <ProductBuyBox slug={product.slug} price={product.price} />

            <div className="mt-8 space-y-3 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              {trust.map((t) => (
                <p
                  key={t.text}
                  className="flex items-center gap-3 text-[14px] text-white/85"
                >
                  <Icon name={t.icon} size={18} className="text-brand" />
                  {t.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Similar products */}
      <section className="bg-[#121212] text-white">
        <div className="mx-auto max-w-[1376px] px-4 py-20 sm:px-8">
          <h2 className="text-center text-[28px] font-bold sm:text-[34px]">
            Similar Products
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <ProductCard key={p.slug} product={p} tone="dark" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
