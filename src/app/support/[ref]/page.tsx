import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { apiFetchSafe } from "@/lib/api";
import ReplyBox from "./ReplyBox";
import { statusPill, titled } from "../page";

/** GET /support/tickets/:ref — owner only. */
type Thread = {
  ref: string;
  subject: string;
  priority: string;
  status: string;
  updatedAt: string;
  messages: { fromAdmin: boolean; body: string; at: string }[];
};

type Props = { params: Promise<{ ref: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ref } = await params;
  return { title: `Request ${ref}` };
}

const stampFull = (iso: string) =>
  new Date(iso).toLocaleString("en-NG", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export default async function TicketPage({ params }: Props) {
  const { ref } = await params;

  // Owner-only server-side: someone else's reference 404s rather than leaking
  // that it exists.
  const thread = await apiFetchSafe<Thread>(`/support/tickets/${ref}`);
  if (!thread) notFound();

  const closed = thread.status === "CLOSED";

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[900px] px-4 py-16 sm:px-8">
        <Link
          href="/support"
          className="inline-flex items-center gap-2 text-sm font-bold text-ink/60 hover:text-ink"
        >
          <Icon name="arrow-left" size={16} /> All requests
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold leading-tight sm:text-[34px]">
              {thread.subject}
            </h1>
            <p className="mt-2 font-mono text-sm text-ink/50">
              {thread.ref} · {titled(thread.priority)} priority
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${statusPill[thread.status] ?? "bg-ink/10 text-ink/55"}`}
          >
            {titled(thread.status)}
          </span>
        </div>

        <div className="mt-8 space-y-6">
          {thread.messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.fromAdmin ? "" : "flex-row-reverse"}`}>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  m.fromAdmin ? "bg-ink text-brand" : "bg-brand/15 text-brand"
                }`}
              >
                {m.fromAdmin ? "D" : "You"}
              </span>
              <div className={`max-w-[80%] ${m.fromAdmin ? "" : "text-right"}`}>
                <p className="text-xs text-ink/45">
                  <span className="font-bold text-ink/70">
                    {m.fromAdmin ? "Daniliya" : "You"}
                  </span>{" "}
                  · {stampFull(m.at)}
                </p>
                <div
                  className={`mt-1.5 rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    m.fromAdmin ? "bg-white border border-ink/10" : "bg-brand/[0.07]"
                  }`}
                >
                  {m.body}
                </div>
              </div>
            </div>
          ))}
          {thread.messages.length === 0 && (
            <p className="py-6 text-center text-sm text-ink/45">No messages yet.</p>
          )}
        </div>

        <ReplyBox ticketRef={thread.ref} closed={closed} />
      </div>
    </section>
  );
}
