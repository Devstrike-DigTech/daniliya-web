import Link from "next/link";
import Icon from "@/components/Icon";

const variants = {
  gold: "bg-brand text-white hover:opacity-90",
  dark: "bg-ink text-white hover:opacity-90",
  "outline-light": "border border-white/40 text-white hover:border-brand hover:text-brand",
  "outline-dark": "border border-ink/25 text-ink hover:border-ink",
  "outline-gold": "border border-brand/50 text-brand hover:border-brand",
} as const;

export default function Btn({
  href,
  variant = "gold",
  arrow = false,
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  arrow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-[15px] font-bold transition-all ${variants[variant]}`}
    >
      {children}
      {arrow && <Icon name="arrow-right" size={16} />}
    </Link>
  );
}
