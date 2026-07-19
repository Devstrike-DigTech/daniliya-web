"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { openTicket, PRIORITIES } from "./actions";

const FIELD =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-brand";
const LABEL = "mb-1.5 block text-sm font-bold";

const priorityLabel: Record<string, string> = {
  LOW: "Low — a question, no rush",
  NORMAL: "Normal",
  HIGH: "High — my order or money is affected",
  URGENT: "Urgent — something is badly wrong",
};

/** Open a ticket. Collapsed until asked for, so the list stays the main thing. */
export default function NewTicketForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError("");
    startTransition(async () => {
      const res = await openTicket(formData);
      if (!res.ok) return setError(res.error);
      setOpen(false);
      router.push(`/support/${res.data.ref}`);
    });
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        <Icon name="plus" size={16} /> New request
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="w-full rounded-2xl border border-ink/10 bg-white p-6">
      <p className="text-lg font-bold">What can we help with?</p>

      <div className="mt-5 space-y-5">
        <div>
          <label htmlFor="subject" className={LABEL}>Subject</label>
          <input
            id="subject"
            name="subject"
            className={FIELD}
            placeholder="e.g. My order hasn't arrived"
            required
          />
        </div>

        <div>
          <label htmlFor="priority" className={LABEL}>How urgent is it?</label>
          <select id="priority" name="priority" className={FIELD} defaultValue="NORMAL">
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {priorityLabel[p]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="body" className={LABEL}>Details</label>
          <textarea
            id="body"
            name="body"
            maxLength={2000}
            className={`${FIELD} min-h-[130px] resize-y`}
            placeholder="Include your order reference if it's about an order — it helps us find it fast."
            required
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send request"}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError("");
          }}
          className="rounded-xl border border-ink/15 px-6 py-3 text-sm font-bold hover:bg-ink/5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
