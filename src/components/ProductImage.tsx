import Image from "next/image";

/**
 * Product imagery.
 *
 * API GAP: the catalogue API currently returns `image: null` on every card and
 * an empty `images: []` on every detail record — no product photography has
 * been seeded. Until it is, we render a neutral branded placeholder.
 *
 * Deliberately NOT falling back to /public/images/products/*.jpg: those files
 * are keyed by the old dummy slugs from src/lib/data.ts, most of which no
 * longer exist in the API, so pairing them by slug would show one product's
 * photo against another product's name.
 */
export default function ProductImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${alt} — no product image available`}
      className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--color-brand) 0 6px, transparent 6px 14px)",
        }}
      />
      <span className="relative text-[28px] font-extrabold tracking-tight text-brand/70">D</span>
    </div>
  );
}
