import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

/**
 * Optional account creation. Registering with an email that previously checked
 * out as a guest claims that history — the API reports it as claimedGuestOrders,
 * which the UI surfaces so the buyer knows their past orders came with them.
 */
export async function POST(req: Request) {
  const payload = await req.json();

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const m = body?.message;
    return NextResponse.json(
      { error: Array.isArray(m) ? m.join(", ") : (m ?? "Could not create your account") },
      { status: res.status },
    );
  }
  return NextResponse.json(body?.data ?? null);
}
