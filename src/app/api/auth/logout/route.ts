import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/lib/auth-cookies";

/** Revokes the refresh token server-side and clears both cookies. */
export async function POST() {
  const refreshToken = (await cookies()).get(REFRESH_COOKIE)?.value;

  if (refreshToken) {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }).catch(() => undefined); // best-effort; always clear locally
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ACCESS_COOKIE);
  response.cookies.delete(REFRESH_COOKIE);
  return response;
}
