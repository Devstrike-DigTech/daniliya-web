import type { Metadata } from "next";
import Ambient from "@/components/Ambient";
import Icon from "@/components/Icon";
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
      <Ambient theme="contact" />
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_1.1fr]">
        {/* Left — dark info panel */}
        <div className="fade-up px-4 py-16 text-white sm:px-6 lg:py-20">
          <span className="inline-flex rounded-full bg-brand/15 px-5 py-2.5 text-[15px] font-bold text-brand">
            Get in Touch
          </span>
          <h1 className="mt-7 text-[44px] font-bold leading-none sm:text-[56px] lg:text-[64px]">
            LET&apos;S <span className="text-brand">TALK.</span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/75">
            Whether you need a quote, have a question, or want to explore a
            partnership — we&apos;re here and responsive.
          </p>
          <div className="mt-10">
            <ContactCards />
          </div>
        </div>

        {/* Right — form */}
        <div className="fade-up fade-up-1 bg-paper px-4 py-16 sm:px-8 lg:py-20">
          <h2 className="text-[32px] font-bold sm:text-[40px]">
            Send us a <span className="text-gold">message</span>.
          </h2>
          <p className="mt-2 text-[15px] text-ink/60">
            Fill in the form and we&apos;ll get back to you within 2 hours
            during business hours.
          </p>

          {/* TODO: wire to the contact endpoint once the API is deployed */}
          <form className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-bold">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className={inputStyle}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className={inputStyle}
                  required
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g yourmail@gmail.com"
                  className={inputStyle}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="e.g +2349283747..."
                  className={inputStyle}
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold">
                What do you need?
              </label>
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              <Icon name="send" size={16} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
