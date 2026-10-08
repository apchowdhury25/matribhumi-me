import nodemailer from "nodemailer";
import { buyerFeeDisclosure } from "@/config/businessModel";
import { howWeWork } from "@/config/legal";
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
  const subject = "Your MatriBhumi property brochure";
  const text = `Dear ${firstName},

Thank you for your interest in MatriBhumi. Enclosed is a brochure of selected projects from participating developers in Bangladesh — including Dhaka, Chattogram, and Bashundhara.

${downloadUrl}

MatriBhumi helps buyers find and evaluate properties from participating developers in Bangladesh and coordinates the buyer’s interaction with the developer. ${buyerFeeDisclosure} The participating developer is the seller.

Because you have downloaded the brochure, we will keep you on the list for floor plans and viewing slots as they are released.

If you have specific layout, budget, or location requirements, reply to this email. The advisory team is available across time zones.

Welcome back to the idea of home.

Warm regards,
The MatriBhumi Team
${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city} ${siteConfig.address.postal}, ${siteConfig.address.country}
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
                Thank you for your interest in MatriBhumi. Enclosed is a brochure of selected projects from participating developers in Bangladesh — including Dhaka, Chattogram, and Bashundhara.
              </td>
            </tr>
            <tr>
              <td style="padding-top:28px;">
                <a href="${safeUrl}" style="display:inline-block;background:#1a1916;color:#f7f3eb;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;padding:14px 22px;">Download brochure</a>
              </td>
            </tr>
            <tr>
              <td style="padding-top:28px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#2c2a26;">
                MatriBhumi helps buyers find and evaluate properties from participating developers in Bangladesh and coordinates the buyer’s interaction with the developer. ${escapeHtml(buyerFeeDisclosure)} The participating developer is the seller.
              </td>
            </tr>
            <tr>
              <td style="padding-top:18px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#2c2a26;">
                Because you have downloaded the brochure, we will keep you on the list for floor plans and viewing slots as they are released.
              </td>
            </tr>
            <tr>
              <td style="padding-top:18px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#2c2a26;">
                If you have specific layout, budget, or location requirements, reply to this email. The advisory team is available across time zones.
              </td>
            </tr>
            <tr>
              <td style="padding-top:18px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#2c2a26;">Welcome back to the idea of home.</td>
            </tr>
            <tr>
              <td style="padding-top:28px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#1a1916;">
                Warm regards,<br />
                The MatriBhumi Team<br />
                ${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city} ${siteConfig.address.postal}, ${siteConfig.address.country}<br />
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

export function advisorRequestEmail(input: {
  name: string;
  preferredCity: string;
  preferredMarket: string;
  propertyType: string;
  budget: string;
  currency: string;
}) {
  const firstName = firstNameFrom(input.name);
  const subject = "We received your MatriBhumi property requirements";
  const text = `Dear ${firstName},

Thank you for sharing your requirements with MatriBhumi.

A property advisor will review what you sent — ${input.propertyType.toLowerCase().replace(/_/g, " ")} in ${input.preferredCity}, ${input.preferredMarket}, around ${input.budget} ${input.currency} — and contact you. This is a human review, not an automated valuation or legal opinion.

${buyerFeeDisclosure} ${howWeWork.purchaseAgreement}

Warm regards,
The MatriBhumi Team
${siteConfig.url}`;
  return { subject, text };
}

export function viewingRequestEmail(input: { name: string; propertyName?: string }) {
  const firstName = firstNameFrom(input.name);
  const subject = "Your MatriBhumi viewing request";
  const text = `Dear ${firstName},

We have received your viewing request${input.propertyName ? ` for ${input.propertyName}` : ""}. A MatriBhumi advisor will coordinate with the developer and confirm availability. Preferred times are requests, not confirmed appointments.

The purchase, if you proceed, is completed with the developer or seller.

Warm regards,
The MatriBhumi Team
${siteConfig.url}`;
  return { subject, text };
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
