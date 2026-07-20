"use client";

import { useState } from "react";
import Image from "next/image";
import ProductImage from "./ProductImage";

/**
 * Product image gallery: a large main image plus a thumbnail strip when the
 * product has more than one photo. With zero or one image it degrades to the
 * single main image (and ProductImage's branded placeholder when there's none).
 */
export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? null;

  return (
    <div className="fade-up">
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl">
        <ProductImage
          src={main}
          alt={alt}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        <div
          aria-hidden
          className="absolute -bottom-2 -left-2 h-16 w-16 bg-[repeating-linear-gradient(135deg,var(--color-brand)_0,var(--color-brand)_4px,transparent_4px,transparent_9px)]"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {images.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-square w-[72px] shrink-0 overflow-hidden rounded-xl ring-2 transition-all ${
                i === active ? "ring-brand" : "ring-white/15 hover:ring-white/40"
              }`}
            >
              <Image
                src={url}
                alt={`${alt} — image ${i + 1}`}
                fill
                sizes="72px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
