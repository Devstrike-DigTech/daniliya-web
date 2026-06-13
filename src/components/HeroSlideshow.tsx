"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  "/images/home/hero-1.jpg",
  "/images/home/hero-2.jpg",
  "/images/home/hero-3.jpg",
];

const HOLD_MS = 5000;

/** Crossfading hero slideshow — images fade in/out in place, no sliding. */
export default function HeroSlideshow() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), HOLD_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative aspect-[1360/530] min-h-[220px] w-full overflow-hidden rounded-2xl">
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Daniliya premium home services"
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
