"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";

export type SupportResult<T = undefined> =
  | ({ ok: true } & (T extends undefined ? object : { data: T }))
  | { ok: false; error: string };

const failed = (e: unknown): { ok: false; error: string } => ({
  ok: false,
  error: e instanceof ApiError ? e.message : "Something went wrong. Please try again.",
});

export const PRIORITIES = ["LOW", "NORMAL", "HIGH", "URGENT"] as const;
export type Priority = (typeof PRIORITIES)[number];

/**
 * Open a support ticket.
 *
 * The API requires a signed-in user — there is no public way to raise one, so
 * the form is only offered to people with an account and guests are pointed at
 * the published contact channels instead.
 */
export async function openTicket(formData: FormData): Promise<SupportResult<{ ref: string }>> {
  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const priority = String(formData.get("priority") ?? "NORMAL") as Priority;

  if (!subject || !body) {
    return { ok: false, error: "Add a subject and tell us what's happened." };
  }

  try {
    const ticket = await apiFetch<{ ref: string }>("/support/tickets", {
      method: "POST",
      body: JSON.stringify({ subject, body, priority }),
    });
    revalidatePath("/support");
    return { ok: true, data: { ref: ticket.ref } };
  } catch (e) {
    return failed(e);
  }
}

/**
 * Reply on your own ticket.
 *
 * Note this reopens a closed ticket: the API sets the status back to OPEN on a
 * customer message, which is why the UI says so before you send.
 */
export async function replyToTicket(ref: string, body: string): Promise<SupportResult> {
  if (!body.trim()) return { ok: false, error: "Write a reply first." };
  try {
    await apiFetch(`/support/tickets/${ref}/reply`, {
      method: "POST",
      body: JSON.stringify({ body: body.trim() }),
    });
    revalidatePath(`/support/${ref}`);
    revalidatePath("/support");
    return { ok: true };
  } catch (e) {
    return failed(e);
  }
}
