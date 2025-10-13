import type { RequestHandler } from "express";

export const handleVerifyEmail: RequestHandler = async (req, res) => {
  const email = (req.body?.email || req.query?.email) as string;
  if (!email) {
    res.status(400).json({ ok: false, message: "Missing email" });
    return;
  }

  const apiUrl = process.env.EMAIL_VERIFICATION_URL;
  const apiKey = process.env.EMAIL_VERIFICATION_API_KEY;

  if (!apiUrl) {
    res.status(500).json({ ok: false, message: "Email verification not configured" });
    return;
  }

  try {
    // Support placeholder {email} in URL or append as query param
    let url = apiUrl;
    if (url.includes("{email}")) {
      url = url.replace(/\{email\}/g, encodeURIComponent(email));
    } else {
      const sep = url.includes("?") ? "&" : "?";
      url = `${url}${sep}email=${encodeURIComponent(email)}`;
    }

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

    const r = await fetch(url, { headers });
    const data = await r.json().catch(() => ({}));

    // Heuristic detection of deliverability
    const deliverable =
      data.deliverable === true ||
      data.smtp_check === true ||
      data.is_valid === true ||
      data.status === "valid" ||
      data.result === "deliverable" ||
      (typeof data === "string" && data.toLowerCase().includes("valid"));

    res.json({ ok: !!deliverable, details: data });
  } catch (e: any) {
    res.status(500).json({ ok: false, message: e?.message || "Verification failed" });
  }
};
