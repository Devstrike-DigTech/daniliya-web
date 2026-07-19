"use server";

import { apiFetch, ApiError } from "@/lib/api";

/** POST /bookings/quote — the booking the API creates for a quote request. */
type BookingCreated = {
  ref: string;
  status: string;
  service: string | null;
  name: string;
  email: string;
};

export type QuoteResult =
  | { ok: true; ref: string; service: string | null }
  | { ok: false; error: string };

/**
 * Request a service quote.
 *
 * Public: `POST /bookings/quote` accepts guests, so nobody has to make an
 * account to ask for a price. `apiFetch` still forwards the session cookie when
 * there is one, which is how a signed-in customer's booking gets attached to
 * their account and shows up under GET /bookings.
 */
export async function requestQuote(formData: FormData): Promise<QuoteResult> {
  const str = (k: string) => (formData.get(k) as string | null)?.trim() || undefined;

  // Attachment URLs come from the upload widget as a JSON array. Only a
  // signed-in user can upload (the endpoint requires auth), so a guest quote
  // simply carries none — the field isn't shown to them.
  let attachments: string[] | undefined;
  const raw = str("attachments");
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as string[];
      if (Array.isArray(parsed) && parsed.length) attachments = parsed;
    } catch {
      /* ignore a malformed value rather than fail the whole request */
    }
  }

  const name = str("name");
  const email = str("email");
  const phone = str("phone");
  const description = str("description");

  if (!name || !email || !phone || !description) {
    return { ok: false, error: "Name, email, phone and a description are required." };
  }

  // The API takes naira as a number; the field accepts "₦59,995" style input.
  const budgetRaw = str("budget")?.replace(/[^\d.]/g, "");
  const budget = budgetRaw ? Number(budgetRaw) : undefined;

  // <input type="date"> gives "2026-08-01"; the DTO validates a full ISO string.
  const dateRaw = str("preferredDate");
  const preferredDate = dateRaw ? new Date(`${dateRaw}T00:00:00.000Z`).toISOString() : undefined;

  try {
    const booking = await apiFetch<BookingCreated>("/bookings/quote", {
      method: "POST",
      body: JSON.stringify({
        verticalSlug: str("verticalSlug"),
        name,
        email,
        phone,
        description,
        city: str("city"),
        address: str("address"),
        ...(budget !== undefined && !Number.isNaN(budget) ? { budget } : {}),
        ...(preferredDate ? { preferredDate } : {}),
        ...(attachments ? { attachments } : {}),
      }),
    });

    return { ok: true, ref: booking.ref, service: booking.service };
  } catch (err) {
    const message =
      err instanceof ApiError
        ? err.message
        : "We could not send that request. Please try again.";
    return { ok: false, error: message };
  }
}
