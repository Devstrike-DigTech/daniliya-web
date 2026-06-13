import type { CSSProperties } from "react";

export type AmbientTheme =
  | "home"
  | "cleaning"
  | "drycleaning"
  | "interior"
  | "construction"
  | "shop"
  | "affiliates"
  | "steps"
  | "contact"
  | "checkout";

/* Small outline glyphs, drawn in a 24×24 box, stroked in currentColor. */
const GLYPHS: Record<string, React.ReactNode> = {
  sparkle: <path d="M12 2c1 5 3 7 8 8-5 1-7 3-8 8-1-5-3-7-8-8 5-1 7-3 8-8z" />,
  circle: <circle cx="12" cy="12" r="9" />,
  bubble: (
    <g>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 8a5.5 5.5 0 0 1 4-2" />
    </g>
  ),
  hanger: <path d="M12 7a2 2 0 1 1 2-2c0 1-2 1.5-2 3l-9 7h18l-9-7z" />,
  steam: <path d="M7 20c0-3 4-3 4-6s-4-3-4-6m10 12c0-3 4-3 4-6s-4-3-4-6" />,
  square: <rect x="4" y="4" width="16" height="16" rx="2" />,
  triangle: <path d="M12 4 21 20H3l9-16z" />,
  arc: <path d="M4 20a16 16 0 0 1 16-16" />,
  setsquare: <path d="M4 20V4l16 16H4zm4-8v4h4" />,
  ruler: <path d="M3 16 16 3l5 5L8 21l-5-5zm4-1 2 2m1-5 2 2m1-5 2 2" />,
  tag: (
    <g>
      <path d="M3 3h8l10 10-8 8L3 11V3z" />
      <circle cx="8" cy="8" r="1.5" />
    </g>
  ),
  book: <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4zm0 13V4m14 9H8" />,
  cart: (
    <g>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h3l2.5 12h11L21 7H6" />
    </g>
  ),
  coin: (
    <g>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 16V8l7 8V8M8 10.5h8M8 13.5h8" />
    </g>
  ),
  one: (
    <g>
      <circle cx="12" cy="12" r="9" />
      <path d="M11 8.5 13 7v10" />
    </g>
  ),
  check: (
    <g>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9" />
    </g>
  ),
  envelope: <path d="M3 6h18v12H3V6zm0 1 9 7 9-7" />,
  box: <path d="M3 8 12 3l9 5v8l-9 5-9-5V8zm9 5L3 8m9 5 9-5m-9 5v8" />,
};

type Item = {
  g: keyof typeof GLYPHS;
  left: string;
  size: number;
  anim: "ambient-rise" | "ambient-fall" | "ambient-drift";
  dur: number;
  delay: number;
  top?: string;
  opacity?: number;
};

/** Spread N items across the width with varied durations/delays. */
function spread(
  glyphs: (keyof typeof GLYPHS)[],
  anim: Item["anim"],
  count: number,
  durBase: number,
): Item[] {
  return Array.from({ length: count }, (_, i) => ({
    g: glyphs[i % glyphs.length],
    left: `${(i * 83) % 96}%`,
    size: 20 + ((i * 11) % 34),
    anim,
    dur: durBase + ((i * 7) % 14),
    delay: -((i * 5.5) % (durBase + 14)),
    top: anim === "ambient-drift" ? `${(i * 37 + 8) % 85}%` : undefined,
  }));
}

const THEMES: Record<AmbientTheme, Item[]> = {
  home: spread(["sparkle", "circle", "sparkle"], "ambient-drift", 12, 12),
  cleaning: spread(["bubble", "circle", "bubble"], "ambient-rise", 13, 16),
  drycleaning: spread(["hanger", "steam", "hanger"], "ambient-drift", 11, 13),
  interior: spread(["square", "triangle", "arc", "circle"], "ambient-drift", 12, 14),
  construction: spread(["setsquare", "ruler", "triangle"], "ambient-drift", 10, 15),
  shop: spread(["tag", "book", "cart"], "ambient-drift", 12, 13),
  affiliates: spread(["coin", "coin", "sparkle"], "ambient-fall", 12, 18),
  steps: spread(["one", "check", "circle"], "ambient-drift", 11, 14),
  contact: spread(["envelope", "circle"], "ambient-drift", 10, 14),
  checkout: spread(["box", "tag"], "ambient-drift", 10, 14),
};

/** Content-themed ambient background — gold outline glyphs drifting behind
 * the page. Decorative only: hidden from a11y tree, no pointer events,
 * removed entirely under prefers-reduced-motion. */
export default function Ambient({ theme }: { theme: AmbientTheme }) {
  const items = THEMES[theme];
  return (
    <div
      aria-hidden
      className="ambient-layer pointer-events-none fixed inset-0 z-[5] overflow-hidden text-brand"
    >
      {theme === "construction" && (
        <div
          className="ambient-pan absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      )}
      {items.map((it, i) => {
        const style: CSSProperties = {
          left: it.left,
          top: it.anim === "ambient-drift" ? it.top : "-60px",
          width: it.size,
          height: it.size,
          animationDuration: `${it.dur}s`,
          animationDelay: `${it.delay}s`,
          opacity: it.opacity ?? 0.16,
        };
        if (it.anim === "ambient-rise") style.top = undefined;
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute ${it.anim}`}
            style={style}
          >
            {GLYPHS[it.g]}
          </svg>
        );
      })}
    </div>
  );
}
