"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/Icon";
import { useCart } from "@/components/CartContext";
import type { ProductVariantDto, ProductVariantType } from "@/lib/api";
import { naira } from "@/lib/format";

const SIZE_LABEL: Record<ProductVariantType, string> = {
  CLOTHING_SIZE: "Size",
  DIMENSION: "Dimensions",
  WEIGHT: "Weight",
  OTHER: "Option",
};

/**
 * Gift-wrap surcharge per line. Verified against the API's own pricing —
 * POST /checkout/guest-quote returns `giftAddon: "1500"` for one wrapped line
 * and "0" without — but there is no endpoint that exposes the figure on its
 * own, so it is mirrored here for display. The quote returned at checkout is
 * authoritative; if the API's figure changes, update this constant.
 */
const GIFT_ADDON = 1500;

const packaging = [
  {
    title: "Indigo-cloth wrap",
    text: "Premium fabric wrap in Daniliya indigo, sealed with a wax stamp.",
  },
  {
    title: "Handwritten note",
    text: "A personal note card written in calligraphy with your message.",
  },
];

/** Delivery choice + quantity stepper + Add to cart for the product page. */
export default function ProductBuyBox({
  productId,
  slug,
  price,
  inStock,
  stockQuantity,
  variantType = null,
  variants = [],
}: {
  productId: string;
  slug: string;
  price: number;
  inStock: boolean;
  /** From GET /products/:slug — caps the stepper at what can actually ship. */
  stockQuantity: number;
  variantType?: ProductVariantType | null;
  variants?: ProductVariantDto[];
}) {
  const hasSizes = !!variantType && variants.length > 0;

  const [qty, setQty] = useState(1);
  const [gift, setGift] = useState(false);
  // Default to the first in-stock size, else the first.
  const [variantId, setVariantId] = useState<string | null>(
    hasSizes ? (variants.find((v) => v.inStock) ?? variants[0]).id : null,
  );
  const { add } = useCart();
  const router = useRouter();

  const selected = hasSizes ? variants.find((v) => v.id === variantId) ?? null : null;
  const activePrice = selected ? Number(selected.price) : price;
  const activeStock = selected ? selected.stockQuantity : stockQuantity;
  const canBuy = selected ? selected.inStock : inStock;

  const max = activeStock > 0 ? activeStock : 1;

  const pickSize = (v: ProductVariantDto) => {
    setVariantId(v.id);
    setQty((q) => Math.min(q, v.stockQuantity > 0 ? v.stockQuantity : 1));
  };

  const addToCart = () => {
    add({
      productId,
      slug,
      ...(selected ? { variantId: selected.id, variantName: selected.name } : {}),
      qty,
      giftWrap: gift,
    });
    router.push("/cart");
  };

  if (!inStock) {
    return (
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-[15px] font-bold text-white">Currently out of stock</p>
        <p className="mt-2 text-[13px] leading-relaxed text-white/60">
          This product can&apos;t be ordered right now. Browse the rest of the
          catalogue in the meantime.
        </p>
      </div>
    );
  }

  const optionCard = (active: boolean) =>
    `rounded-2xl border p-5 text-left transition-colors ${
      active
        ? "border-brand bg-brand/[0.06]"
        : "border-white/10 bg-white/[0.03] hover:border-white/25"
    }`;

  return (
    <div className="mt-8">
      {hasSizes && variantType && (
        <div className="mb-8">
          <div className="flex items-baseline justify-between">
            <p className="text-[17px] font-bold text-white">Choose {SIZE_LABEL[variantType].toLowerCase()}</p>
            {selected && (
              <p className="text-[15px] font-bold text-brand">{naira(activePrice)}</p>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {variants.map((v) => {
              const active = v.id === variantId;
              return (
                <button
                  key={v.id}
                  type="button"
                  disabled={!v.inStock}
                  onClick={() => pickSize(v)}
                  className={`rounded-xl border px-4 py-2.5 text-[14px] font-bold transition-colors ${
                    active
                      ? "border-brand bg-brand/[0.12] text-white"
                      : "border-white/15 text-white/75 hover:border-white/35"
                  } ${!v.inStock ? "cursor-not-allowed text-white/25 line-through" : ""}`}
                >
                  {v.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-[17px] font-bold text-white">Choose how to receive it</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <button type="button" onClick={() => setGift(false)} className={optionCard(!gift)}>
          <span className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 text-brand">
              <Icon name="truck" size={16} />
            </span>
            <span className="text-[15px] font-bold text-white">Buy for me</span>
          </span>
          <span className="mt-3 block text-[13px] leading-relaxed text-white/60">
            Standard delivery in branded packaging. Arrives in 2–5 working days
            nationwide.
          </span>
          <span className="mt-3 block text-[17px] font-bold text-brand">{naira(activePrice)}</span>
        </button>

        <button type="button" onClick={() => setGift(true)} className={optionCard(gift)}>
          <span className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 text-brand">
              <Icon name="package" size={16} />
            </span>
            <span className="text-[15px] font-bold text-white">Gift &amp; Package</span>
          </span>
          <span className="mt-3 block text-[13px] leading-relaxed text-white/60">
            Hand wrapped, sealed, hand delivered with a personal note.
          </span>
          <span className="mt-3 block text-[17px] font-bold text-brand">+{naira(GIFT_ADDON)}</span>
        </button>
      </div>

      {gift && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="flex items-center gap-2.5 text-[15px] font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 text-brand">
              <Icon name="package" size={16} />
            </span>
            What&apos;s included in Signature Gift Packaging
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {packaging.map((p) => (
              <div key={p.title} className="rounded-xl bg-brand/[0.08] p-4">
                <p className="flex items-center gap-2 text-[14px] font-bold text-white">
                  <Icon name="package" size={14} className="text-brand" />
                  {p.title}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-white/60">
            You&apos;ll add the recipient&apos;s name, address and your gift
            message during checkout. Adds {naira(GIFT_ADDON)} per item.
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-5 rounded-xl bg-white/10 px-4 py-3">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-7 w-7 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10"
          >
            <Icon name="minus" size={16} />
          </button>
          <span className="min-w-[1.5ch] text-center text-lg font-bold tabular-nums">
            {qty}
          </span>
          <button
            aria-label="Increase quantity"
            disabled={qty >= max}
            onClick={() => setQty((q) => Math.min(max, q + 1))}
            className="flex h-7 w-7 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10"
          >
            <Icon name="plus" size={16} />
          </button>
        </div>
        <button
          onClick={addToCart}
          disabled={!canBuy}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-8 py-4 text-[15px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
        >
          <Icon name="plus" size={16} /> {canBuy ? "Add to cart" : "Size unavailable"}
        </button>
      </div>
    </div>
  );
}
