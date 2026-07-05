"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

const input =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";
const label = "mb-1.5 block text-sm font-bold";

export default function ServiceQuoteForm() {
  const [files, setFiles] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-4 rounded-2xl border border-green/30 bg-green/5 p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green/15 text-green">
          <Icon name="check" size={26} />
        </span>
        <h3 className="text-[22px] font-bold">Request received</h3>
        <p className="max-w-sm text-[15px] leading-relaxed text-ink/70">
          Thanks — our team will review the details and respond with a tailored
          quote within 24 hours.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setFiles([]);
          }}
          className="mt-1 text-sm font-bold text-brand hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

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

      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>First Name</label>
            <input className={input} placeholder="Enter your first name" />
          </div>
          <div>
            <label className={label}>Last Name</label>
            <input className={input} placeholder="Enter your last name" />
          </div>
          <div>
            <label className={label}>
              Phone number <span className="text-red-500">*</span>
            </label>
            <input className={input} placeholder="Enter your phone number" required />
          </div>
          <div>
            <label className={label}>
              Email <span className="text-red-500">*</span>
            </label>
            <input type="email" className={input} placeholder="e.g youremail@gmail.com" required />
          </div>
        </div>
        <div>
          <label className={label}>
            Service description <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`${input} min-h-[130px] resize-y`}
            placeholder="Tell us what needs to be cleaned"
            required
          />
        </div>
        <div>
          <label className={label}>
            Location <span className="text-red-500">*</span>
          </label>
          <input className={input} placeholder="Enter your address" required />
        </div>
        <div>
          <label className={label}>Attachments (optional)</label>
          <label className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-ink/20 bg-cream/50 px-6 py-8 text-center transition-colors hover:border-brand">
            <input
              type="file"
              accept="image/png,image/jpeg"
              multiple
              className="hidden"
              onChange={(e) =>
                setFiles(Array.from(e.target.files ?? []).map((f) => f.name))
              }
            />
            <Icon name="upload" size={22} className="text-ink/50" />
            <span className="text-sm font-bold">Upload Photos</span>
            <span className="text-xs text-ink/50">jpg, png up to 5mb</span>
            {files.length > 0 && (
              <span className="mt-1 text-xs font-bold text-brand">
                {files.length} file{files.length > 1 ? "s" : ""} selected
              </span>
            )}
          </label>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-[15px] font-bold text-white transition-opacity hover:opacity-90">
          Send Message <Icon name="arrow-right" size={16} />
        </button>
      </form>
    </div>
  );
}
