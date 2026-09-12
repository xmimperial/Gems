import { NextResponse } from "next/server";

type EnquiryPayload = {
  name: string;
  contact: string;
  message: string;
  sku?: string;
};

function isValidPayload(value: unknown): value is EnquiryPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === "string" &&
    v.name.trim().length > 0 &&
    typeof v.contact === "string" &&
    v.contact.trim().length > 0 &&
    typeof v.message === "string" &&
    v.message.trim().length > 0
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { ok: false, error: "Name, contact and message are required." },
      { status: 400 }
    );
  }

  // TODO: wire to the real delivery channel — a transactional email API
  // (Resend/Postmark/SES) or a form backend (Formspree/Basin). Logging only
  // for now so the flow is testable end to end.
  console.info("[enquiry]", {
    name: body.name,
    contact: body.contact,
    sku: body.sku ?? null,
    message: body.message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
