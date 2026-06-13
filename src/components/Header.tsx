"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/Icon";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Book & Shop" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/affiliates", label: "Affiliates" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink text-white">
      <div className="mx-auto flex h-[72px] max-w-[1376px] items-center justify-between px-4 sm:px-8">
        <Link href="/" className="text-[26px] font-bold text-brand">
          Daniliya
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[15px] transition-colors hover:text-white ${
                pathname === link.href
                  ? "font-bold text-white"
                  : "text-white/55"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/checkout"
            aria-label="Cart"
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-mauve-50 transition-opacity hover:opacity-90"
          >
            <Icon name="cart" size={19} />
          </Link>
          <Link
            href="/affiliates"
            className="hidden rounded-lg bg-brand px-6 py-3 text-[15px] font-bold text-mauve-50 transition-opacity hover:opacity-90 sm:block"
          >
            Join as Affiliate
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center text-brand lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-ink px-4 pb-6 pt-2 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-base ${
                pathname === link.href
                  ? "font-bold text-brand"
                  : "text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/affiliates"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-brand px-5 py-3 text-center text-sm font-bold text-ink"
          >
            Join as Affiliate
          </Link>
        </nav>
      )}
    </header>
  );
}
