import Link from "next/link";
import Icon from "@/components/Icon";

/** Gold pill button with an embedded dark arrow circle (vertical pages). */
export default function PillArrowBtn({
  href,
  dark = false,
  children,
}: {
  href: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full py-2.5 pl-7 pr-3 text-[15px] font-bold transition-opacity hover:opacity-90 ${
        dark ? "bg-coal text-white" : "bg-brand text-white"
      }`}
    >
      {children}
      <span
        aria-hidden
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${
          dark ? "bg-white/10 text-brand" : "bg-ink text-white"
        }`}
      >
        <Icon name="arrow-right" size={16} />
      </span>
    </Link>
  );
}
