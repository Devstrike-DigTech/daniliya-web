import type { Metadata } from "next";
import SectionTag from "@/components/SectionTag";
import ContactCards from "@/components/ContactCards";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Whether you need a quote, have a question, or want to explore a partnership — we're here and responsive.",
};

const inputStyle =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";

export default function ContactPage() {
  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_1.1fr]">
        {/* Left — dark info panel */}
        <div className="px-4 py-16 text-white sm:px-6 lg:py-20">
          <SectionTag>Get in touch</SectionTag>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            LET&apos;S <span className="text-brand">TALK.</span>
          </h1>
          <p className="mt-4 max-w-sm text-white/60">
            Whether you need a quote, have a question, or want to explore a
            partnership — we&apos;re here and responsive.
          </p>
          <div className="mt-10">
            <ContactCards />
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-paper px-4 py-16 sm:px-8 lg:py-20">
          <h2 className="text-3xl font-bold">
            Send us a <span className="text-gold">message.</span>
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            Fill in the form and we&apos;ll get back to you within 2 hours
            during business hours.
          </p>

          {/* TODO: wire to the contact endpoint once the API is deployed */}
          <form className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-bold">First Name</label>
                <input type="text" placeholder="First Name" className={inputStyle} required />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold">Last Name</label>
                <input type="text" placeholder="Last Name" className={inputStyle} required />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-bold">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g yourmail@gmail.com"
                  className={inputStyle}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold">Phone / WhatsApp</label>
                <input type="tel" placeholder="e.g +2349283747..." className={inputStyle} />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold">What do you need?</label>
              <select className={inputStyle} defaultValue="">
                <option value="" disabled>
                  Select a service inquiry or type
                </option>
                <option>Service quote</option>
                <option>Product order</option>
                <option>Affiliate programme</option>
                <option>Influencer partnership</option>
                <option>Vendor application</option>
                <option>Something else</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us more about what you need"
                className={inputStyle}
              />
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
