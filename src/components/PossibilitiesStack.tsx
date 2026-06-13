"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGES = [
  "/images/home/possibilities-1.jpg",
  "/images/home/possibilities-2.jpg",
  "/images/home/possibilities-3.jpg",
];

const SHUFFLE_MS = 4000;

/** Slot styles: 0 = front, 1 = middle, 2 = back. All images share one base
 * size and animate between slots via transform only (GPU-friendly). */
const SLOTS = [
  { x: 150, y: 0, r: 3, s: 1, z: 30, shadow: "0 20px 45px rgba(33,33,33,0.25)" },
  { x: 52, y: 26, r: -6, s: 0.88, z: 20, shadow: "0 14px 32px rgba(33,33,33,0.18)" },
  { x: 0, y: 52, r: -14, s: 0.78, z: 10, shadow: "0 8px 20px rgba(33,33,33,0.12)" },
];

/** The fanned About card stack — cards trade places every few seconds. */
export default function PossibilitiesStack() {
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setShift((s) => (s + 1) % 3), SHUFFLE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[480px] sm:h-[500px]">
      {/* gold arcs */}
      <svg
        aria-hidden
        viewBox="0 0 220 110"
        className="absolute -bottom-6 left-2 w-56 text-brand"
        fill="none"
      >
        <path d="M10 110a100 100 0 0 1 200 0" stroke="currentColor" strokeOpacity="0.5" />
        <path d="M30 110a80 80 0 0 1 160 0" stroke="currentColor" strokeOpacity="0.35" />
        <path d="M50 110a60 60 0 0 1 120 0" stroke="currentColor" strokeOpacity="0.2" />
      </svg>
      {/* static teal backing card, deepest layer */}
      <div
        aria-hidden
        className="absolute left-0 top-16 h-[300px] w-[220px] -rotate-[18deg] rounded-2xl bg-teal/25 sm:h-[350px] sm:w-[250px]"
      />
      {IMAGES.map((src, i) => {
        const slot = SLOTS[(i + shift) % 3];
        return (
          <div
            key={src}
            className="absolute left-0 top-0 h-[330px] w-[240px] overflow-hidden rounded-2xl transition-transform duration-1000 ease-in-out motion-reduce:transition-none sm:h-[430px] sm:w-[315px]"
            style={{
              transform: `translate(${slot.x}px, ${slot.y}px) rotate(${slot.r}deg) scale(${slot.s})`,
              zIndex: slot.z,
              boxShadow: slot.shadow,
            }}
          >
            <Image
              src={src}
              alt="Daniliya at work"
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
