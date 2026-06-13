import Image from "next/image";
import Icon from "@/components/Icon";
import { testimonials } from "@/lib/data";

function Card({
  quote,
  name,
  role,
  avatar,
}: {
  quote: string;
  name: string;
  role: string;
  avatar: number;
}) {
  return (
    <figure className="relative w-[440px] shrink-0 rounded-[20px] bg-coal p-7 text-white">
      <div className="flex gap-1 text-brand" aria-hidden>
        {[1, 2, 3, 4, 5].map((n) => (
          <Icon key={n} name="star" size={15} />
        ))}
      </div>
      <blockquote className="mt-4 max-w-[300px] text-[17px] leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={`/images/avatars/avatar-${avatar}.jpg`}
            alt={name}
            fill
            sizes="40px"
            className="object-cover"
          />
        </span>
        <span>
          <span className="block text-[15px] font-bold">{name}</span>
          <span className="block text-xs text-white/50">{role}</span>
        </span>
      </figcaption>
      <span
        aria-hidden
        className="absolute bottom-4 right-7 font-serif text-[110px] leading-none text-white"
      >
        &rdquo;
      </span>
    </figure>
  );
}

/** Two infinite marquee rows sliding in opposite directions.
 * Each row's content is two identical halves, so the 50% keyframe
 * shift loops seamlessly. Pauses on hover. */
export default function TestimonialMarquee() {
  // one half = testimonials ×2 (≈2780px, wider than any viewport)
  const half = [...testimonials, ...testimonials];
  const row = [...half, ...half];

  return (
    <div className="mt-12 space-y-6">
      {(["marquee-left", "marquee-right"] as const).map((dir) => (
        <div key={dir} className="flex overflow-hidden">
          <div className={`flex w-max gap-6 pr-6 ${dir}`}>
            {row.map((t, i) => (
              <Card
                key={`${t.name}-${i}`}
                quote={t.quote}
                name={t.name}
                role={t.role}
                avatar={(i % 3) + 1}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
