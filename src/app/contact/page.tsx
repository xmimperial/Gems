import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { SALES_EMAIL, WHATSAPP_BUSINESS_NUMBER } from "@/lib/enquiry";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Imperial Star Gems by email, WhatsApp or enquiry form.",
};

export default function ContactPage() {
  return (
    <div className="container-isg py-16">
      <div className="max-w-2xl">
        <p className="font-sans text-xs uppercase tracking-wide text-ink-muted">Contact</p>
        <h1 className="mt-2 font-display text-4xl">Talk to us directly</h1>
        <p className="mt-4 font-sans text-sm text-ink-muted">
          For a specific stone, use the enquiry button on its listing so we
          have the SKU on hand. For anything else — sourcing a specification
          we don&apos;t currently list, trade terms, or a general question —
          reach us here.
        </p>
      </div>

      <div className="mt-14 grid gap-14 md:grid-cols-2">
        <div>
          <h2 className="font-sans text-sm font-medium text-ink">Direct</h2>
          <dl className="mt-4 space-y-3 font-sans text-sm">
            <div className="flex gap-2">
              <dt className="text-ink-muted">Email</dt>
              <dd>
                <a className="focus-ring text-ink underline underline-offset-4" href={`mailto:${SALES_EMAIL}`}>
                  {SALES_EMAIL}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-ink-muted">WhatsApp</dt>
              <dd>
                <a
                  className="focus-ring text-ink underline underline-offset-4"
                  href={`https://wa.me/${WHATSAPP_BUSINESS_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Message us
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="font-sans text-sm font-medium text-ink">Send an enquiry</h2>
          <div className="mt-4">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
