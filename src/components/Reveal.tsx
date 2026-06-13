"use client";

import { useEffect, useRef, useState } from "react";

/** Fades content up into view the first time it enters the viewport.
 * Uses IntersectionObserver with a position-check + scroll fallback so it
 * also works in environments where IO callbacks are throttled. */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** Stagger offset in ms */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const inView = () =>
      el.getBoundingClientRect().top < window.innerHeight - 40;

    if (inView()) {
      // Already visible on load: defer one paint so the initial hidden
      // state commits and the transition actually plays.
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setShown(true)),
      );
      // rAF doesn't run in hidden/throttled contexts — settle via timeout.
      const fallback = setTimeout(() => setShown(true), 150);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(fallback);
      };
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          cleanup();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    const onScroll = () => {
      if (inView()) {
        setShown(true);
        cleanup();
      }
    };
    const cleanup = () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };

    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return cleanup;
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${shown ? "reveal-shown" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
