"use client";

import { useEffect, useRef, useState } from "react";
import { Diamond } from "@/lib/diamonds";
import { getShape } from "@/lib/shapes";
import { mailtoHref, whatsappHref, stoneSummary } from "@/lib/enquiry";
import { ShapeIcon } from "./shape-icon";
import { EnquiryForm } from "./enquiry-form";

export function EnquiryModal({ diamond }: { diamond: Diamond }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const shape = getShape(diamond.shape);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring w-full rounded-full border border-ink px-5 py-2.5 font-sans text-sm text-ink transition-colors hover:bg-ink hover:text-porcelain"
      >
        Enquire
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(false);
        }}
        className="w-[min(640px,92vw)] rounded-[28px] border border-hairline bg-porcelain p-0 backdrop:bg-ink/40"
        aria-labelledby="enquiry-title"
      >
        <div className="max-h-[85vh] overflow-y-auto p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p id="enquiry-title" className="font-display text-2xl">
                {shape.name}, {diamond.carat.toFixed(2)}ct
              </p>
              <p className="mt-1 font-sans text-sm text-ink-muted">
                {diamond.sku} · {diamond.origin === "natural" ? "Natural" : "Lab-grown"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="focus-ring rounded-full p-2 text-ink-muted hover:text-ink"
            >
              ✕
            </button>
          </div>

          <div className="mt-6 flex items-center gap-6 rounded-2xl bg-panel p-6">
            <ShapeIcon shape={shape} size={88} active showFacets />
            <dl className="grid flex-1 grid-cols-2 gap-x-4 gap-y-2 font-sans text-sm">
              <dt className="text-ink-muted">Color</dt>
              <dd className="text-ink">{diamond.color}</dd>
              <dt className="text-ink-muted">Clarity</dt>
              <dd className="text-ink">{diamond.clarity}</dd>
              <dt className="text-ink-muted">Cut</dt>
              <dd className="text-ink">{diamond.cut}</dd>
              <dt className="text-ink-muted">Certificate</dt>
              <dd className="text-ink">{diamond.lab} {diamond.certificateNo}</dd>
            </dl>
          </div>

          <p className="mt-6 font-sans text-xs uppercase tracking-wide text-ink-muted">
            Reach us directly
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <a
              href={mailtoHref(diamond)}
              className="focus-ring flex-1 rounded-full bg-ink px-5 py-2.5 text-center font-sans text-sm text-porcelain transition-opacity hover:opacity-90"
            >
              Email about this stone
            </a>
            <a
              href={whatsappHref(diamond)}
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex-1 rounded-full border border-ink px-5 py-2.5 text-center font-sans text-sm text-ink transition-colors hover:bg-ink hover:text-porcelain"
            >
              WhatsApp us
            </a>
          </div>

          <div className="mt-8 border-t border-hairline pt-6">
            <p className="mb-4 font-sans text-xs uppercase tracking-wide text-ink-muted">
              Or send an enquiry directly
            </p>
            <EnquiryForm sku={diamond.sku} compact />
          </div>

          <p className="sr-only">{stoneSummary(diamond)}</p>
        </div>
      </dialog>
    </>
  );
}
