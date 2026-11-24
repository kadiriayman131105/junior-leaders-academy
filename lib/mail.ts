import { Resend } from "resend";

export function mailReady() {
  return Boolean(process.env.RESEND_API_KEY && process.env.SCHOOL_EMAIL);
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function emailShell(title: string, body: string) {
  return `<div style="margin:0;padding:0;background:#FFF8F4">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:18px;overflow:hidden;font-family:Arial,sans-serif;color:#232E40">
      <div style="height:8px;background:#FC6703"></div>
      <div style="padding:28px">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#C24E02">Junior Leaders Academy</p>
        <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3">${title}</h1>
        ${body}
      </div>
    </div>
  </div>`;
}

function fromAddress() {
  return process.env.MAIL_FROM || "Junior Leaders Academy <onboarding@resend.dev>";
}

export async function sendSchoolMail(input: {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: [process.env.SCHOOL_EMAIL as string],
    subject: input.subject,
    html: input.html,
    replyTo: input.replyTo || undefined,
    attachments: input.attachments,
  });
  return !error;
}

export async function sendParentMail(input: { to: string; subject: string; html: string }) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: fromAddress(),
    to: [input.to],
    subject: input.subject,
    html: input.html,
  });
}
