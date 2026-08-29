"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const REFERRAL_KEY = "daniliya-referral";
export const PROMO_KEY = "daniliya-promo";

/**
 * Affiliate and influencer share links land the buyer anywhere on the site with
 * an attribution param — `?ref=CODE` for an affiliate referral, `?promo=CODE`
 * for an influencer campaign. Each has to survive the walk from that landing
 * page to checkout, so it is stored the moment it is seen and read back when the
 * order is placed. (The tracking redirect that logs the click sets these params.)
 */
export default function ReferralCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // /order pages use ?ref for the ORDER reference, not a referral code.
    if (pathname.startsWith("/order")) return;
    const ref = searchParams.get("ref");
    const promo = searchParams.get("promo");
    try {
      if (ref) localStorage.setItem(REFERRAL_KEY, ref);
      if (promo) localStorage.setItem(PROMO_KEY, promo);
    } catch {
      /* storage unavailable — the order simply records no referrer */
    }
  }, [pathname, searchParams]);

  return null;
}
