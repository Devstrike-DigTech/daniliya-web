import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

/**
 * Public order-tracking relay.
 *
 * The track page hydrates a client poller that hits this every few seconds so
 * the fulfilment status updates without a manual refresh. Public, like the API
 * endpoint it fronts — guests track by reference with no session. Always
 * uncached so each poll reflects the current status.
 */
export async function GET(req: Request) {
  const ref = new URL(req.url).searchParams.get("ref");
  if (!ref) {
    return NextResponse.json({ error: "ref is required" }, { status: 400 });
  }

  const res = await fetch(
    `${API_URL}/orders/track?ref=${encodeURIComponent(ref)}`,
    { cache: "no-store" },
  );
  const body = await res.json().catch(() => null);
  return NextResponse.json(body?.data ?? null, { status: res.status });
}
