import fetch from "node-fetch";

export interface WhatsAppParams {
  phone: string; // international format, e.g. 919876543210
  message: string;
}

export async function sendWhatsApp(params: WhatsAppParams): Promise<boolean> {
  // Preferred: Zapier webhook or custom webhook URL
  const webhook = process.env.WHATSAPP_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      try {
        const text = await res.text().catch(() => "");
        if (!res.ok)
          console.error(
            "WhatsApp webhook failed:",
            res.status,
            res.statusText,
            text,
          );
        else
          console.log(
            "WhatsApp webhook sent to",
            webhook,
            "for phone",
            params.phone,
          );
      } catch {}
      return res.ok;
    } catch (e) {
      console.error("WhatsApp webhook error:", e);
      return false;
    }
  }

  // Fallback: Twilio API if configured
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM; // e.g. 'whatsapp:+1415xxxxxxx'

  if (accountSid && authToken && from) {
    try {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const body = new URLSearchParams();
      body.append("From", from);
      body.append(
        "To",
        `whatsapp:+${params.phone.replace(/^\+/, "").replace(/[^0-9]/g, "")}`,
      );
      body.append("Body", params.message);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      return res.ok;
    } catch (e) {
      return false;
    }
  }

  return false;
}
