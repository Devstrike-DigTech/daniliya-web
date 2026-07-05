import SectionTag from "@/components/SectionTag";

export type LegalSection = { heading: string; body: string[] };

/** Shared layout for Terms / Privacy pages. */
export default function LegalPage({
  kicker,
  title,
  updated,
  intro,
  sections,
}: {
  kicker: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[820px] px-4 py-16 sm:px-6 lg:py-20">
          <SectionTag>{kicker}</SectionTag>
          <h1 className="mt-5 text-[40px] font-bold leading-tight sm:text-[52px]">
            {title}
          </h1>
          <p className="mt-4 text-sm text-white/55">Last updated: {updated}</p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[820px] px-4 py-16 sm:px-6">
          {/* placeholder notice — replace with the client's final policy */}
          <p className="mb-10 rounded-2xl bg-cream p-5 text-sm leading-relaxed text-ink/70">
            <span className="font-bold text-ink">Placeholder copy.</span> This
            is sample wording for layout purposes. The final {title.toLowerCase()}{" "}
            will be supplied by Daniliya before launch.
          </p>

          <p className="text-[15px] leading-relaxed text-ink/75">{intro}</p>

          <div className="mt-10 space-y-10">
            {sections.map((s, i) => (
              <div key={s.heading}>
                <h2 className="text-[20px] font-bold">
                  <span className="text-brand">{i + 1}.</span> {s.heading}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-3 text-[15px] leading-relaxed text-ink/70">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-12 text-sm text-ink/55">
            Questions? Reach us at{" "}
            <span className="font-bold text-ink">hello@daniliya.com</span>.
          </p>
        </div>
      </section>
    </>
  );
}
