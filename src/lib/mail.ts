import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function firstNameFrom(fullName: string) {
  const first = fullName.trim().split(/\s+/)[0] ?? "";
  return first || fullName.trim();
}

export function brochureDownloadUrl() {
  return `${siteConfig.url}${siteConfig.brochurePath}`;
}

export function brochureEmail(fullName: string) {
  const firstName = firstNameFrom(fullName);
  const downloadUrl = brochureDownloadUrl();
  const subject = "Your MatriBhumi Pre-Launch Portfolio & Brochure";
  const text = `Dear ${firstName},

Thank you for your interest in MatriBhumi. Enclosed, you will find our comprehensive pre-launch brochure detailing our upcoming architectural visions in Dhaka and Chattogram.

${downloadUrl}

We understand that building a life in two places requires a foundation built on absolute trust, meticulous design, and seamless management. MatriBhumi residences are explicitly crafted for those who demand international structural standards without losing the warmth of a true Bangladeshi home—whether you are flying in for Eid, planning a serene retirement, or investing in the future of Dhaka’s newest premium districts.

Because you have downloaded our brochure, you have been granted provisional priority status. As floor plans and early-bird pricing tiers lock in, you will be among the very first to receive access.

If you have specific architectural preferences or layout requirements for your return, simply reply directly to this email. Our client relationship team is available across global time zones to assist you.

Welcome back to the idea of home.

Warm regards,
The MatriBhumi Team
House 12, Road 7, Gulshan, Dhaka, Bangladesh
www.matribhumi.me`;

  const safeName = escapeHtml(firstName);
  const safeUrl = escapeHtml(downloadUrl);
  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#f7f3eb;color:#1a1916;font-family:Georgia,'Iowan Old Style',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3eb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fbf8f2;padding:40px 36px;">
            <tr>
              <td style="font-family:Georgia,serif;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;color:#8a7355;">MatriBhumi</td>
            </tr>
            <tr>
              <td style="padding-top:28px;font-family:Georgia,serif;font-size:28px;line-height:1.25;color:#1a1916;">Dear ${safeName},</td>
            </tr>
            <tr>
              <td style="padding-top:20px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#2c2a26;">
                Thank you for your interest in MatriBhumi. Enclosed, you will find our comprehensive pre-launch brochure detailing our upcoming architectural visions in Dhaka and Chattogram.
              </td>
            </tr>
            <tr>
              <td style="padding-top:28px;">
                <a href="${safeUrl}" style="display:inline-block;background:#1a1916;color:#f7f3eb;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;padding:14px 22px;">Download brochure</a>
              </td>
            </tr>
            <tr>
              <td style="padding-top:28px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#2c2a26;">
                We understand that building a life in two places requires a foundation built on absolute trust, meticulous design, and seamless management. MatriBhumi residences are explicitly crafted for those who demand international structural standards without losing the warmth of a true Bangladeshi home—whether you are flying in for Eid, planning a serene retirement, or investing in the future of Dhaka’s newest premium districts.
              </td>
            </tr>
            <tr>
              <td style="padding-top:18px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#2c2a26;">
                Because you have downloaded our brochure, you have been granted provisional priority status. As floor plans and early-bird pricing tiers lock in, you will be among the very first to receive access.
              </td>
            </tr>
            <tr>
              <td style="padding-top:18px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#2c2a26;">
                If you have specific architectural preferences or layout requirements for your return, simply reply directly to this email. Our client relationship team is available across global time zones to assist you.
              </td>
            </tr>
            <tr>
              <td style="padding-top:18px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#2c2a26;">Welcome back to the idea of home.</td>
            </tr>
            <tr>
              <td style="padding-top:28px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#1a1916;">
                Warm regards,<br />
                The MatriBhumi Team<br />
                House 12, Road 7, Gulshan, Dhaka, Bangladesh<br />
                <a href="${siteConfig.url}" style="color:#8a7355;text-decoration:none;">www.matribhumi.me</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html, downloadUrl };
}

export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}) {
  const host = process.env.SMTP_HOST;
  const from = process.env.SMTP_FROM;
  if (!host || !from) {
    console.info("[mail:skipped]", options.subject, options.to);
    return { skipped: true as const };
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
      : undefined,
  });

  await transporter.sendMail({
    from,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
  console.info("[mail:sent]", options.subject, options.to);
  return { skipped: false as const };
}
