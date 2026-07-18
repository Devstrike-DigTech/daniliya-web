import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

/**
 * Public product lookup, proxied so the cart can re-price itself from the
 * browser without the API origin (or CORS) leaking into client code.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await fetch(`${API_URL}/products/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    return NextResponse.json({ error: "Product not found" }, { status: res.status });
  }
  return NextResponse.json(body?.data ?? null);
}
