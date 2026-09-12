import { Diamond } from "./diamonds";
import { getShape } from "./shapes";

// TODO: replace with the real WhatsApp Business number (country code, no
// leading +, no spaces) before launch.
export const WHATSAPP_BUSINESS_NUMBER = "10000000000";
export const SALES_EMAIL = "sales@imperialstargems.com";

export function stoneSummary(diamond: Diamond): string {
  const shape = getShape(diamond.shape);
  return `${shape.name}, ${diamond.carat.toFixed(2)}ct, ${diamond.color}/${diamond.clarity}`;
}

export function enquiryMessage(diamond: Diamond): string {
  return `Hi, I'm interested in stone SKU ${diamond.sku} (${stoneSummary(diamond)}). Please share more details.`;
}

export function mailtoHref(diamond: Diamond): string {
  const subject = `Enquiry - SKU ${diamond.sku}`;
  const body = enquiryMessage(diamond);
  return `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function whatsappHref(diamond: Diamond): string {
  return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(enquiryMessage(diamond))}`;
}
