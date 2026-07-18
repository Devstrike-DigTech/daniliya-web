import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import { ACCESS_COOKIE } from "@/lib/auth-cookies";

/**
 * Place the order. A signed-in buyer orders from their server cart; a guest
 * posts their lines and the API attaches the order to a passwordless account
 * keyed by their email, which they can claim later by registering.
 */
export async function POST(req: Request) {
  const body = await req.json();
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;

  // Always order the cart the shopper saw, for the same reason the quote route
  // does: /orders places the server-side cart, which on this storefront is a
  // different basket to the one on screen. The guest endpoint attaches the
  // order to an account by contact email, so a signed-in buyer using their own
  // address still gets it in their history.
  const res = await fetch(`${API_URL}/orders/guest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const m = data?.message;
    return NextResponse.json(
      { error: Array.isArray(m) ? m.join(", ") : (m ?? "Could not place this order") },
      { status: res.status },
    );
  }
  return NextResponse.json(data?.data ?? null);
}
