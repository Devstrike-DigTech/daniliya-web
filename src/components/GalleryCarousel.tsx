"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const GAP = 16; // matches gap-4

/** Swipeable snap carousel with dot indicators (mobile gallery). */
export default function GalleryCarousel({
  images,
  altBase,
  className = "",
}: {
  images: string[];
  altBase: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const slideWidth = () => {
    const slide = trackRef.current?.firstElementChild as HTMLElement | null;
    return slide ? slide.offsetWidth + GAP : 0;
  };

  const onScroll = () => {
    const el = trackRef.current;
    const w = slideWidth();
    if (!el || !w) return;
    setActive(
      Math.max(0, Math.min(images.length - 1, Math.round(el.scrollLeft / w))),
    );
  };

  const goTo = (i: number) => {
    // scrollIntoView cooperates with scroll-snap where scrollTo({smooth}) is
    // sometimes cancelled by the snap resolver (Chromium).
    trackRef.current?.children[i]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div className={className}>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[4/3.6] w-[86%] shrink-0 snap-center overflow-hidden rounded-2xl"
          >
            <Image
              src={src}
              alt={`${altBase} ${i + 1}`}
              fill
              priority={i === 0}
              sizes="86vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to image ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-brand" : "w-2 bg-ink/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
