"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";

export type ReviewResult = { ok: true } | { ok: false; error: string };

/**
 * Leave a review for something you bought.
 *
 * The API is the authority on eligibility: it requires a confirmed order for
 * the product and allows one review per buyer. Its refusals are readable
 * ("You can only review products you have purchased", "You have already
 * reviewed this product"), so they are surfaced as-is rather than reworded.
 */
export async function submitReview(
  productId: string,
  rating: number,
  body: string,
): Promise<ReviewResult> {
  if (!rating || rating < 1 || rating > 5) {
    return { ok: false, error: "Pick a rating from 1 to 5 stars." };
  }
  if (!body.trim()) {
    return { ok: false, error: "Write a few words about the product." };
  }

  try {
    await apiFetch("/reviews", {
      method: "POST",
      body: JSON.stringify({ productId, rating, body: body.trim() }),
    });
    revalidatePath("/account");
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof ApiError ? err.message : "Could not post that review.",
    };
  }
}
