import type { Metadata } from "next";
import SectionTag from "@/components/SectionTag";
import ContactCards from "@/components/ContactCards";
import { verticals } from "@/lib/data";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Tell us about the job — we'll respond with a tailored quote within 24 hours.",
};

const inputStyle =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";

export default function QuotePage() {
  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_1.1fr]">
        {/* Left — dark info panel */}
        <div className="px-4 py-16 text-white sm:px-6 lg:py-20">
          <SectionTag>Quote request</SectionTag>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            GET A <span className="text-brand">QUOTE</span>
          </h1>
          <p className="mt-4 max-w-sm text-white/60">
            Tell us what you need and we&apos;ll respond with a tailored quote
            within 24 hours.
          </p>
          <div className="mt-10">
            <ContactCards />
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-paper px-4 py-16 sm:px-8 lg:py-20">
          <h2 className="text-3xl font-bold">
            Tell us about the <span className="text-gold">job</span>
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            We&apos;ll respond with a tailored quote within 24 hours.
          </p>

          {/* TODO: wire to POST /hub/quote-requests once the API is deployed */}
          <form className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-bold">
                Service type <span className="text-red-500">*</span>
              </label>
              <select className={inputStyle} defaultValue="" required>
                <option value="" disabled>
                  Select the service you need
                </option>
                {verticals.map((v) => (
                  <option key={v.slug} value={v.slug}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold">
                Project description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Tell us what needs to be done"
                className={inputStyle}
                required
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-bold">Budget (₦)</label>
                <input type="text" placeholder="e.g ₦59,995" className={inputStyle} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold">Preferred date</label>
                <input type="date" className={inputStyle} />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="e.g youremail@gmail.com"
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold">
                Attachments (optional)
              </label>
              <div className="flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-ink/25 bg-white px-4 py-8 text-center">
                <p className="text-sm font-bold">Upload Photos</p>
                <p className="mt-1 text-xs text-ink/50">jpg, png up to 5mb</p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-brand py-4 text-sm font-bold text-ink transition-opacity hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
