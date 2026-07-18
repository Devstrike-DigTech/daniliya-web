import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE,
  cookieOptions,
} from "@/lib/auth-cookies";

/** Exchanges credentials for tokens and stores them as httpOnly cookies. */
export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const m = body?.message;
    return NextResponse.json(
      { error: Array.isArray(m) ? m.join(", ") : (m ?? "Could not sign in") },
      { status: res.status },
    );
  }

  const { accessToken, refreshToken, user } = body.data;
  const response = NextResponse.json({ user });
  response.cookies.set(ACCESS_COOKIE, accessToken, cookieOptions(ACCESS_MAX_AGE));
  response.cookies.set(REFRESH_COOKIE, refreshToken, cookieOptions(REFRESH_MAX_AGE));
  return response;
}
