import type { Metadata } from "next";
import Ambient from "@/components/Ambient";
import ContactCards from "@/components/ContactCards";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import { apiFetchSafe, type ServiceDto } from "@/lib/api";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Tell us about the job — we'll respond with a tailored quote within 24 hours.",
};

type Props = { searchParams: Promise<{ service?: string }> };

export default async function QuotePage({ searchParams }: Props) {
  // ?service=laundry lets a vertical page deep-link into this form pre-filled.
  const { service } = await searchParams;
  const services = (await apiFetchSafe<ServiceDto[]>("/services")) ?? [];
  // Attachments need a session; the widget is only offered when signed in.
  const canUpload = (await apiFetchSafe<{ id: string }>("/auth/me")) !== null;

  return (
    <section className="bg-ink">
      <Ambient theme="contact" />
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_1.1fr]">
        {/* Left — dark info panel */}
        <div className="fade-up px-4 py-16 text-white sm:px-6 lg:py-20">
          <span className="inline-flex rounded-full bg-brand/15 px-5 py-2.5 text-[15px] font-bold text-brand">
            Quote Request
          </span>
          <h1 className="mt-7 text-[44px] font-bold leading-none sm:text-[56px] lg:text-[64px]">
            GET A <span className="text-brand">QUOTE</span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/75">
            Tell us what you need and we&apos;ll respond with a tailored quote
            within 24 hours.
          </p>
          <div className="mt-10">
            <ContactCards />
          </div>
        </div>

        {/* Right — form */}
        <div className="fade-up fade-up-1 bg-paper px-4 py-16 sm:px-8 lg:py-20">
          <h2 className="text-[32px] font-bold sm:text-[40px]">
            Tell us about the <span className="text-gold">job</span>
          </h2>
          <p className="mt-2 text-[15px] text-ink/60">
            We&apos;ll respond with a tailored quote within 24 hours.
          </p>

          <div className="mt-8">
            <QuoteRequestForm services={services} defaultSlug={service} canUpload={canUpload} />
          </div>
        </div>
      </div>
    </section>
  );
}
