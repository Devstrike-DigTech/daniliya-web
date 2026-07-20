import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import { ACCESS_COOKIE } from "@/lib/auth-cookies";

/**
 * Proxies a file upload to the API.
 *
 * The browser can't call the API directly — the access token is an httpOnly
 * cookie it never sees. This forwards the multipart body and hands back
 * {url, key, ...} or the API's own error.
 *
 * Signed-in users upload to the authed POST /uploads for any purpose. Guests
 * are allowed exactly one thing: attaching photos to a quote request, which
 * goes to the public POST /uploads/quote — the quote form takes guests, so the
 * attachment must too. Any other purpose without a session is refused.
 */
export async function POST(req: Request) {
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;

  const { searchParams } = new URL(req.url);
  const purpose = searchParams.get("purpose") ?? "";

  if (!token && purpose !== "booking") {
    return NextResponse.json({ error: "Please sign in to upload a file." }, { status: 401 });
  }

  // Stream the incoming multipart body straight through — no buffering, no
  // re-encoding, so the API sees exactly what the browser sent.
  const form = await req.formData();

  const endpoint = token
    ? `${API_URL}/uploads?purpose=${encodeURIComponent(purpose)}`
    : `${API_URL}/uploads/quote`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: form,
    cache: "no-store",
  });

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const m = body?.message;
    return NextResponse.json(
      { error: Array.isArray(m) ? m.join(", ") : (m ?? "Upload failed.") },
      { status: res.status },
    );
  }
  // Unwrap the API's { success, data } envelope so the client gets { url, key, … } directly.
  return NextResponse.json(body?.data ?? body);
}
