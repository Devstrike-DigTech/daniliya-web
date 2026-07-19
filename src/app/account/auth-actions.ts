"use server";

import { cookies } from "next/headers";
import { API_URL } from "@/lib/api";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE,
  cookieOptions,
} from "@/lib/auth-cookies";

export type AuthResult =
  | { ok: true; claimedGuestOrders?: boolean }
  | { ok: false; error: string };

const messageOf = (body: unknown, fallback: string) => {
  const m = (body as { message?: unknown } | null)?.message;
  if (Array.isArray(m)) return m.join(", ");
  return typeof m === "string" ? m : fallback;
};

async function call(path: string, payload: unknown) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const body = await res.json().catch(() => null);
  return { res, body };
}

/** Store the pair as httpOnly cookies — no token ever reaches the browser. */
async function persist(data: { accessToken: string; refreshToken: string }) {
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, data.accessToken, cookieOptions(ACCESS_MAX_AGE));
  jar.set(REFRESH_COOKIE, data.refreshToken, cookieOptions(REFRESH_MAX_AGE));
}

export async function signIn(formData: FormData): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { ok: false, error: "Enter your email and password." };

  const { res, body } = await call("/auth/login", { email, password });
  if (!res.ok) return { ok: false, error: messageOf(body, "Could not sign you in.") };

  await persist(body.data);
  return { ok: true };
}

/**
 * Create an account.
 *
 * If this email checked out as a guest before, the API attaches that history to
 * the new account and reports it as `claimedGuestOrders` — worth telling the
 * person, since their past orders appearing is otherwise a surprise.
 */
export async function register(formData: FormData): Promise<AuthResult> {
  const payload = {
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || undefined,
  };
  if (!payload.email || !payload.password || !payload.firstName || !payload.lastName) {
    return { ok: false, error: "Name, email and password are all required." };
  }

  const { res, body } = await call("/auth/register", payload);
  if (!res.ok) return { ok: false, error: messageOf(body, "Could not create your account.") };

  return { ok: true, claimedGuestOrders: Boolean(body?.data?.claimedGuestOrders) };
}

/** Confirm the 6-digit code. On success the API returns a signed-in session. */
export async function verifyCode(formData: FormData): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();
  if (!email || !code) return { ok: false, error: "Enter the code we emailed you." };

  const { res, body } = await call("/auth/verify-otp", { email, code });
  if (!res.ok) return { ok: false, error: messageOf(body, "That code was not accepted.") };

  await persist(body.data);
  return { ok: true };
}

export async function resendCode(email: string): Promise<AuthResult> {
  const { res, body } = await call("/auth/resend-otp", { email });
  if (!res.ok) return { ok: false, error: messageOf(body, "Could not send a new code.") };
  return { ok: true };
}

export async function signOut(): Promise<void> {
  const jar = await cookies();
  const refreshToken = jar.get(REFRESH_COOKIE)?.value;
  if (refreshToken) {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }).catch(() => undefined);
  }
  jar.delete(ACCESS_COOKIE);
  jar.delete(REFRESH_COOKIE);
}
