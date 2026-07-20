import QuoteRequestForm, { type ServiceOption } from "@/components/QuoteRequestForm";

/**
 * The quote block on the services page — marketing copy plus the real form.
 *
 * This used to be a client component whose submit handler set a `sent` flag and
 * rendered "Request received… we'll respond within 24 hours" without calling
 * anything. Nothing was ever sent. It now posts to /bookings/quote and shows the
 * booking reference the API returns.
 */
export default function ServiceQuoteForm({
  services,
}: {
  services: ServiceOption[];
}) {
  return (
    <div>
      <p className="flex items-center gap-2.5 text-lg text-brand">
        <span aria-hidden className="h-px w-6 bg-brand" />
        Fill the form below to get a quote
      </p>
      <h2 className="mt-4 text-[34px] font-bold leading-tight sm:text-[46px]">
        Industrial Cleaning &amp;
        <br />
        <span className="italic text-brand">Fumigation.</span>
      </h2>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink/70">
        Daniliya provides expert industrial cleaning and fumigation services
        under your brand, ensuring quality results and reliable customer
        satisfaction.
      </p>

      <div className="mt-8">
        <QuoteRequestForm services={services} submitLabel="Send request" />
      </div>
    </div>
  );
}
