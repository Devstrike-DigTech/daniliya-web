"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/Icon";
import { useCart } from "@/components/CartContext";
import { portals } from "@/lib/portals";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Book & Shop" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/affiliates", label: "Affiliates" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Help & support" },
  { href: "/account", label: "Your account" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { count, ready } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-ink text-white">
      <div className="relative mx-auto flex h-[72px] max-w-[1376px] items-center justify-between px-4 sm:px-8">
        {/* Logo + wordmark */}
        <Link href="/" aria-label="Daniliya home" className="flex items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
            <Image
              src="/images/brand/emblem.png"
              alt=""
              width={40}
              height={40}
              priority
              className="h-8 w-8 object-contain"
            />
          </span>
          <span className="text-[22px] font-bold tracking-tight">Daniliya</span>
        </Link>

        {/* Cart + Options */}
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-xl border border-brand px-4 py-2.5 text-[15px] font-bold text-brand transition-colors hover:bg-brand/10"
          >
            <Icon name="cart" size={18} />
            <span className="hidden sm:inline">Cart</span>
            {ready && count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-ink">
                {count}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-[15px] font-bold text-ink transition-opacity hover:opacity-90"
          >
            Options
            <Icon
              name="chevron-right"
              size={15}
              className={`transition-transform ${open ? "-rotate-90" : "rotate-90"}`}
            />
          </button>

          {/* Options menu */}
          {open && (
            <>
              <div
                className="fixed inset-0 z-40"
                aria-hidden
                onClick={() => setOpen(false)}
              />
              <div
                role="menu"
                className="absolute right-4 top-[74px] z-50 w-[248px] overflow-hidden rounded-2xl border border-white/10 bg-coal p-2 shadow-2xl sm:right-8"
              >
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      role="menuitem"
                      className={`block rounded-lg px-4 py-2.5 text-[15px] transition-colors ${
                        active
                          ? "bg-white/10 font-bold text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="my-2 border-t border-white/10" />
                <Link
                  href="/shop/the-daniliya-method"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg border border-white/25 px-4 py-2.5 text-center text-[15px] font-bold text-white transition-colors hover:border-white"
                >
                  Buy the book
                </Link>
                <a
                  href={`${portals.affiliate}/join/signup`}
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-lg bg-brand px-4 py-2.5 text-center text-[15px] font-bold text-ink transition-opacity hover:opacity-90"
                >
                  Get Started
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
