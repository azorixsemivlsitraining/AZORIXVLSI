export interface SendEmailParams {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: SendEmailParams): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM;
  if (!apiKey || !from) return false;

  const payload = {
    personalizations: [{ to: [{ email: params.to }] }],
    from: { email: from },
    subject: params.subject,
    content: [
      {
        type: params.html ? "text/html" : "text/plain",
        value: params.html || params.text || "",
      },
    ],
  };

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  // Debug logging for delivery
  try {
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("SendGrid send failed:", res.status, res.statusText, text);
    } else {
      console.log("SendGrid send ok for", params.to);
    }
  } catch (e) {
    console.error("SendGrid logging error:", e);
  }

  return res.ok;
}
