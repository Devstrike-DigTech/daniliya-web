import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

/**
 * Verify a Paystack payment on the buyer's return from checkout.
 *
 * Public — Paystack redirects the buyer straight here, and guest checkout has no
 * session. It just relays the reference to the API's public verify endpoint,
 * which confirms the order if the payment genuinely succeeded.
 */
export async function GET(req: Request) {
  const reference = new URL(req.url).searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "reference is required" }, { status: 400 });
  }

  const res = await fetch(
    `${API_URL}/payments/verify?reference=${encodeURIComponent(reference)}`,
    { cache: "no-store" },
  );
  const body = await res.json().catch(() => null);
  return NextResponse.json(body?.data ?? { paid: false }, { status: res.status });
}
