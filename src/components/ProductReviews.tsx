import Icon from "@/components/Icon";

/** GET /products/:productId/reviews — public, no auth. */
export type ProductReviews = {
  summary: { average: number | null; count: number };
  reviews: {
    reviewer: string;
    rating: number;
    body: string;
    /** The vendor's public reply, if they have written one. */
    response: string | null;
    createdAt: string;
  }[];
};

const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" });

function Stars({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon
          key={n}
          name="star"
          size={size}
          className={n <= rating ? "text-brand" : "text-ink/20"}
        />
      ))}
    </span>
  );
}

/**
 * Customer reviews for a product.
 *
 * Only buyers can write one (the API requires a confirmed order for the
 * product), so an empty list is the normal state for a new product rather than
 * something to apologise for.
 */
export default function ProductReviews({ data }: { data: ProductReviews | null }) {
  const summary = data?.summary;
  const reviews = data?.reviews ?? [];

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1376px] px-4 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[28px] font-bold sm:text-[34px]">Customer reviews</h2>
          {summary && summary.count > 0 && summary.average !== null && (
            <p className="flex items-center gap-2.5 text-sm text-ink/60">
              <Stars rating={Math.round(summary.average)} />
              <span className="font-bold text-ink">{summary.average.toFixed(1)}</span>
              <span>
                from {summary.count} {summary.count === 1 ? "review" : "reviews"}
              </span>
            </p>
          )}
        </div>

        {reviews.length > 0 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {reviews.map((r, i) => (
              <div key={i} className="rounded-2xl border border-ink/10 bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold">{r.reviewer}</p>
                  <span className="text-xs text-ink/45">{shortDate(r.createdAt)}</span>
                </div>
                <div className="mt-2">
                  <Stars rating={r.rating} size={14} />
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{r.body}</p>

                {/* The vendor's reply, shown under the review it answers. */}
                {r.response && (
                  <div className="mt-4 rounded-xl border-l-2 border-brand bg-brand/[0.05] px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand">
                      Response from the seller
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{r.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-ink/15 px-6 py-14 text-center">
            <p className="text-[15px] font-bold">No reviews yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink/55">
              Reviews come from people who have actually bought this — once your
              order is confirmed you can leave one from your account.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
