"use client";

import { useState, useTransition } from "react";
import Icon from "@/components/Icon";
import DatePicker from "@/components/DatePicker";
import FileUpload, { type UploadedFile } from "@/components/FileUpload";
import { requestQuote } from "@/app/quote-actions";

/** GET /services — only what the picker needs. */
export type ServiceOption = {
  slug: string;
  name: string;
  comingSoon: boolean;
};

const FIELD =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";
const LABEL = "mb-1.5 block text-sm font-bold";

export default function QuoteRequestForm({
  services,
  defaultSlug,
  submitLabel = "Request a quote",
}: {
  services: ServiceOption[];
  defaultSlug?: string;
  submitLabel?: string;
}) {
  const [done, setDone] = useState<{ ref: string; service: string | null } | null>(null);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pending, startTransition] = useTransition();

  // A service that isn't taking work yet can't be requested — the API would
  // accept it, but the business can't fulfil it, so don't offer it.
  const bookable = services.filter((s) => !s.comingSoon);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (files.length) formData.set("attachments", JSON.stringify(files.map((f) => f.url)));
    setError("");
    startTransition(async () => {
      const res = await requestQuote(formData);
      if (res.ok) setDone({ ref: res.ref, service: res.service });
      else setError(res.error);
    });
  };

  if (done) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-green/30 bg-green/5 p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green/15 text-green">
          <Icon name="check" size={26} />
        </span>
        <h3 className="text-[22px] font-bold">Request received</h3>
        <p className="max-w-sm text-[15px] leading-relaxed text-ink/70">
          {done.service ? `Your ${done.service.toLowerCase()} request` : "Your request"} is
          with our team. Keep this reference — you can quote it in any message
          about the job.
        </p>
        <p className="rounded-xl bg-ink px-5 py-3 font-mono text-lg font-bold tracking-wide text-brand">
          {done.ref}
        </p>
        <button
          onClick={() => setDone(null)}
          className="mt-1 text-sm font-bold text-brand hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="verticalSlug" className={LABEL}>
          Service type <span className="text-red-500">*</span>
        </label>
        <select
          id="verticalSlug"
          name="verticalSlug"
          className={FIELD}
          defaultValue={defaultSlug ?? ""}
          required
        >
          <option value="" disabled>
            Select the service you need
          </option>
          {bookable.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>
            Full name <span className="text-red-500">*</span>
          </label>
          <input id="name" name="name" className={FIELD} placeholder="Enter your full name" required />
        </div>
        <div>
          <label htmlFor="phone" className={LABEL}>
            Phone number <span className="text-red-500">*</span>
          </label>
          <input id="phone" name="phone" className={FIELD} placeholder="+234" required />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={LABEL}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={FIELD}
          placeholder="e.g youremail@gmail.com"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className={LABEL}>
          What needs doing? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          className={`${FIELD} min-h-[130px] resize-y`}
          placeholder="Tell us about the job — size, condition, anything we should know"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className={LABEL}>City</label>
          <input id="city" name="city" className={FIELD} placeholder="e.g Lagos" />
        </div>
        <div>
          <label htmlFor="address" className={LABEL}>Address</label>
          <input id="address" name="address" className={FIELD} placeholder="Street address" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className={LABEL}>Budget (₦)</label>
          <input id="budget" name="budget" inputMode="numeric" className={FIELD} placeholder="e.g 59,995" />
        </div>
        <div>
          <label htmlFor="preferredDate" className={LABEL}>Preferred date</label>
          <DatePicker id="preferredDate" name="preferredDate" className={FIELD} placeholder="Pick a date" />
        </div>
      </div>

      {/* Photos help us quote accurately — optional, and open to guests too
          (the quote form takes anyone; the upload uses the public path). */}
      <div>
        <label className={LABEL}>Photos (optional)</label>
        <FileUpload
          purpose="booking"
          multiple
          accept="image/jpeg,image/png,image/webp,application/pdf"
          value={files}
          onChange={setFiles}
          hint="JPEG, PNG, WebP or PDF, up to 10MB each"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        <Icon name="send" size={16} />
        {pending ? "Sending…" : submitLabel}
      </button>
      <p className="text-xs text-ink/50">
        No account needed. We&apos;ll reply to the email you give us.
      </p>
    </form>
  );
}
