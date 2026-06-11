import Link from "next/link";

const columns = [
  {
    heading: "Links",
    links: [
      { label: "Laundry", href: "/services/laundry" },
      { label: "Dry Cleaning", href: "/services/dry-cleaning" },
      { label: "Interior Decoration", href: "/services/interior-decoration" },
      { label: "Construction", href: "/services/construction" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Shop the Book", href: "/shop" },
      { label: "Affiliate Programme", href: "/affiliates" },
      { label: "Influencer Programme", href: "/how-it-works" },
      { label: "Vendor Portal", href: "/contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "How it Works", href: "/how-it-works" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-coal text-white">
      <div className="mx-auto max-w-[1376px] px-4 pb-6 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="text-[26px] font-bold text-brand">Daniliya</p>
            <p className="mt-5 max-w-[260px] text-[13px] leading-relaxed text-white/75">
              A unified platform for premium services, curated products, and a
              proven weekly affiliate income system.
            </p>
            <p className="mt-6 text-[11px] text-white/50">
              © 2026 Daniliya. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-[13px] font-bold text-brand">{col.heading}</p>
                <ul className="mt-5 space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-white/90 transition-colors hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p
        aria-hidden
        className="wordmark-outline select-none px-2 pb-4 text-center text-[16.5vw] font-bold leading-none"
      >
        DANILIYA
      </p>
    </footer>
  );
}
