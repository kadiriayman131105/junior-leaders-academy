import { site } from "@/lib/site";

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function toWhatsAppNumber(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = `212${digits.slice(1)}`;
  return digits;
}

export function lines(parts: Array<string | false | undefined>) {
  return parts.filter((part): part is string => Boolean(part && part.trim())).join("\n");
}
