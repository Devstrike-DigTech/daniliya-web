"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const REFERRAL_KEY = "daniliya-referral";

/**
 * Affiliate links land the buyer anywhere on the site with ?ref=CODE. The code
 * has to survive the walk from that landing page to checkout, so it is stored
 * the moment it is seen and read back when the order is placed.
 */
export default function ReferralCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("ref");
    // /order pages use ?ref for the ORDER reference, not a referral code.
    if (!code || pathname.startsWith("/order")) return;
    try {
      localStorage.setItem(REFERRAL_KEY, code);
    } catch {
      /* storage unavailable — the order simply records no referrer */
    }
  }, [pathname, searchParams]);

  return null;
}
