"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Fill-image that crossfades through a list of sources on a timer.
 * Place inside a `relative` container. `startDelayMs` staggers multiple
 * instances so they don't all switch at once. */
export default function CrossfadeImage({
  images,
  alt,
  sizes,
  intervalMs = 6000,
  startDelayMs = 0,
  priority = false,
}: {
  images: string[];
  alt: string;
  sizes: string;
  intervalMs?: number;
  startDelayMs?: number;
  priority?: boolean;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const kickoff = setTimeout(() => {
      setIdx((i) => (i + 1) % images.length);
      interval = setInterval(
        () => setIdx((i) => (i + 1) % images.length),
        intervalMs,
      );
    }, intervalMs + startDelayMs);
    return () => {
      clearTimeout(kickoff);
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          priority={priority && i === 0}
          sizes={sizes}
          className={`object-cover transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
