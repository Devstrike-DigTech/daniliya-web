import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

/** Confirms the 6-digit code emailed after registration. */
export async function POST(req: Request) {
  const { email, code, resend } = await req.json();

  const res = await fetch(`${API_URL}/auth/${resend ? "resend-otp" : "verify-otp"}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resend ? { email } : { email, code }),
    cache: "no-store",
  });

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const m = body?.message;
    return NextResponse.json(
      { error: Array.isArray(m) ? m.join(", ") : (m ?? "Could not verify that code") },
      { status: res.status },
    );
  }
  return NextResponse.json(body?.data ?? null);
}
