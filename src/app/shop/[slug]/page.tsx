import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
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

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const similar = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-white/50 sm:px-6">
          <Link href="/shop" className="hover:text-brand">
            Book & Shop
          </Link>{" "}
          / <span className="text-white/80">{product.title}</span>
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-2xl">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-brand">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-3 text-3xl font-bold text-brand">
              {naira(product.price)}
            </p>
            <p className="mt-5 max-w-lg leading-relaxed text-white/60">
              {product.description}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/70">
              <li>✓ Nationwide delivery within 2–5 working days</li>
              <li>✓ Secure payment powered by Paystack</li>
              <li>✓ Instant order confirmation & tracking reference</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/checkout"
                className="rounded-full bg-brand px-8 py-4 text-sm font-bold text-ink transition-opacity hover:opacity-90"
              >
                Buy Now
              </Link>
              <Link
                href="/affiliates"
                className="rounded-full border border-white/25 px-8 py-4 text-sm font-bold transition-colors hover:border-brand hover:text-brand"
              >
                Earn by selling this
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Similar Products</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
