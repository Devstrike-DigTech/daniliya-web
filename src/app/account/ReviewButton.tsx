"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { submitReview } from "./review-actions";

/**
 * Write a review for one purchased item.
 *
 * This sits against an order rather than on the product page because purchase
 * is provable here — the item is in the buyer's own order. The API still has
 * the final say, and one review per product means the second attempt is
 * refused with a message worth showing.
 */
export default function ReviewButton({
  productId,
  title,
}: {
  productId: string;
  title: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const send = () => {
    setError("");
    startTransition(async () => {
      const res = await submitReview(productId, rating, body);
      if (!res.ok) return setError(res.error);
      setDone(true);
      setOpen(false);
      router.refresh();
    });
  };

  if (done) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green">
        <Icon name="check" size={14} /> Review posted
      </span>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-bold text-brand hover:underline"
      >
        Write a review
      </button>
    );
  }

  return (
    <div className="mt-3 w-full rounded-xl border border-ink/10 bg-paper p-4">
      <p className="text-sm font-bold">Review {title}</p>

      <div className="mt-3 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            className="p-0.5"
          >
            <Icon name="star" size={22} className={n <= rating ? "text-brand" : "text-ink/25"} />
          </button>
        ))}
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={1000}
        placeholder="How was it? What should other buyers know?"
        className="mt-3 min-h-[90px] w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand"
      />

      {error && (
        <p className="mt-2 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600">{error}</p>
      )}

      <div className="mt-3 flex gap-3">
        <button
          onClick={send}
          disabled={pending}
          className="rounded-xl bg-brand px-5 py-2.5 text-xs font-bold text-white hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Posting…" : "Post review"}
        </button>
        <button
          onClick={() => {
            setOpen(false);
            setError("");
          }}
          className="rounded-xl border border-ink/15 px-5 py-2.5 text-xs font-bold hover:bg-ink/5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
