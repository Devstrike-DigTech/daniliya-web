"use client";

import { useEffect, useRef, useState } from "react";

/** Animates a stat like "250+", "48hr" or "100%" counting up from 0 the
 * first time it scrolls into view. Renders the final value immediately when
 * the value has no leading number, the user prefers reduced motion, or the
 * page can't run animation frames (hidden/throttled contexts). */
export default function CountUp({
  value,
  className,
  durationMs = 1400,
}: {
  value: string;
  className?: string;
  durationMs?: number;
}) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLParagraphElement>(null);
  const [n, setN] = useState(0);
  const [done, setDone] = useState(!match);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.visibilityState === "hidden"
    ) {
      setDone(true);
      return;
    }

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      cleanup();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / durationMs);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
        else setDone(true);
      };
      requestAnimationFrame(tick);
      // safety: if rAF stalls (tab hidden mid-count), settle on the value
      setTimeout(() => setDone(true), durationMs + 500);
    };

    const inView = () =>
      el.getBoundingClientRect().top < window.innerHeight * 0.9;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && start(),
      { threshold: 0.5 },
    );
    const onScroll = () => inView() && start();
    const cleanup = () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };

    if (inView()) {
      start();
      return cleanup;
    }
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p ref={ref} className={className}>
      {done || !match ? value : `${n}${suffix}`}
    </p>
  );
}
