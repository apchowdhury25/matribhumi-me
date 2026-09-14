export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
}) {
  const host = process.env.SMTP_HOST;
  const from = process.env.SMTP_FROM;
  if (!host || !from) {
    console.info("[mail:skipped]", options.subject, options.to);
    return { skipped: true };
  }
  console.info("[mail:queued]", options.subject, options.to);
  return { skipped: false };
}
