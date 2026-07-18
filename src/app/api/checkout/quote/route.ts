import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import { ACCESS_COOKIE } from "@/lib/auth-cookies";

/**
 * Authoritative order totals. Signed-in buyers quote against their server-side
 * cart; guests post their browser cart. Either way the arithmetic is the API's,
 * never the client's — the storefront only ever displays what comes back.
 */
export async function POST(req: Request) {
  const { mode, items } = await req.json();
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;

  // Always price the cart the shopper is actually looking at. The signed-in
  // endpoint prices the *server* cart instead, which is a different basket —
  // quoting against it would show one total and charge another. Until a
  // browser-cart -> server-cart sync exists, the guest endpoint is the only one
  // that is guaranteed to match the screen. The session is still forwarded so
  // the order is attributed to the buyer's account.
  const res = await fetch(`${API_URL}/checkout/guest-quote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ mode, items }),
    cache: "no-store",
  });

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const m = body?.message;
    return NextResponse.json(
      { error: Array.isArray(m) ? m.join(", ") : (m ?? "Could not price this order") },
      { status: res.status },
    );
  }
  return NextResponse.json(body?.data ?? null);
}
