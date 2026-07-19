"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { replyToTicket } from "../actions";

/**
 * Reply on your own ticket.
 *
 * A customer message sets the ticket back to OPEN server-side, so replying to
 * a closed one reopens it. That is said up front rather than surprising anyone.
 */
export default function ReplyBox({ ticketRef, closed }: { ticketRef: string; closed: boolean }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const send = () => {
    setError("");
    startTransition(async () => {
      const res = await replyToTicket(ticketRef, body);
      if (!res.ok) return setError(res.error);
      setBody("");
      router.refresh();
    });
  };

  return (
    <div className="mt-8">
      {closed && (
        <p className="mb-3 rounded-xl bg-ink/5 px-4 py-3 text-sm text-ink/65">
          This request is closed. Replying will reopen it for the team.
        </p>
      )}
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Add to this request"
        className="min-h-[110px] w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand"
      />
      {error && (
        <p className="mt-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>
      )}
      <button
        onClick={send}
        disabled={pending}
        className="mt-4 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Sending…" : closed ? "Reply and reopen" : "Send reply"}
      </button>
    </div>
  );
}
