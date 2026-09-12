"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function EnquiryForm({ sku, compact = false }: { sku?: string; compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          contact: data.get("contact"),
          message: data.get("message"),
          sku: data.get("sku") || undefined,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="font-sans text-sm text-ink" role="status">
        Enquiry received. We reply to every message within one business day.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {sku && <input type="hidden" name="sku" value={sku} />}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="font-sans text-xs text-ink-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="focus-ring rounded-[10px] border border-hairline bg-porcelain px-3.5 py-2.5 font-sans text-sm text-ink"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact" className="font-sans text-xs text-ink-muted">
          Email or phone
        </label>
        <input
          id="contact"
          name="contact"
          type="text"
          required
          className="focus-ring rounded-[10px] border border-hairline bg-porcelain px-3.5 py-2.5 font-sans text-sm text-ink"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-sans text-xs text-ink-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={compact ? 3 : 4}
          defaultValue={sku ? `I'm interested in stone SKU ${sku}. Please share more details.` : undefined}
          className="focus-ring resize-none rounded-[10px] border border-hairline bg-porcelain px-3.5 py-2.5 font-sans text-sm text-ink"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="focus-ring mt-1 rounded-full bg-ink px-6 py-3 font-sans text-sm text-porcelain transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      {status === "error" && (
        <p className="font-sans text-xs text-ink-muted" role="alert">
          Something went wrong. Please try again, or email sales@imperialstargems.com directly.
        </p>
      )}
    </form>
  );
}
