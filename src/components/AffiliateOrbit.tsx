import Image from "next/image";

const SATELLITES = [
  { src: 2, cls: "left-[210px] top-[15px] h-20 w-20" },
  { src: 3, cls: "left-[55px] top-[55px] h-[72px] w-[72px]" },
  { src: 4, cls: "right-[55px] top-[70px] h-20 w-20" },
  { src: 5, cls: "right-[30px] top-[200px] h-[76px] w-[76px]" },
  { src: 6, cls: "left-[20px] top-[250px] h-[84px] w-[84px]" },
  { src: 7, cls: "left-[170px] bottom-[30px] h-20 w-20" },
  { src: 8, cls: "left-[280px] top-[280px] h-[88px] w-[88px]" },
];

/** Affiliate avatar collage — satellites orbit slowly around the fixed
 * center portrait; each avatar counter-rotates so faces stay upright. */
export default function AffiliateOrbit() {
  return (
    <div className="relative mx-auto hidden h-[480px] w-full max-w-[480px] lg:block">
      {/* static accents */}
      <div
        aria-hidden
        className="absolute left-[88px] top-[150px] h-28 w-24 bg-[radial-gradient(circle,var(--color-brand)_1.5px,transparent_1.5px)] [background-size:14px_14px]"
      />
      <div
        aria-hidden
        className="absolute left-[270px] top-[260px] h-40 w-40 rounded-2xl bg-cream"
      />

      {/* center portrait — fixed */}
      <span className="absolute left-[115px] top-[115px] block h-[250px] w-[250px] overflow-hidden rounded-3xl shadow-lg">
        <Image
          src="/images/avatars/avatar-1.jpg"
          alt="Daniliya affiliate"
          fill
          sizes="250px"
          className="object-cover"
        />
      </span>

      {/* orbiting satellites */}
      <div className="orbit absolute inset-0">
        {SATELLITES.map((a) => (
          <span
            key={a.src}
            className={`orbit-counter absolute block overflow-hidden rounded-2xl shadow-md ${a.cls}`}
          >
            <Image
              src={`/images/avatars/avatar-${a.src}.jpg`}
              alt=""
              fill
              sizes="90px"
              className="object-cover"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
