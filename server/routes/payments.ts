import type { RequestHandler } from "express";
import crypto from "node:crypto";
import {
  CohortEnrollmentRequest,
  DashboardResourcesResponse,
  WorkshopRegistrationRequest,
} from "@shared/api";
import {
  saveCohortEnrollment,
  saveWorkshopRegistration,
} from "../lib/supabase";
import { sendEmail } from "../lib/email";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "dev-secret";
const WORKSHOP_PRICE = 99;
const COHORT_PRICE = 1999;
const DV_PRICE = 69999;

function makeAccessToken(email: string, ttlSeconds: number): string {
  const expiresAt = Math.floor(Date.now() / 1000) + ttlSeconds;
  const data = `${email}:${expiresAt}`;
  const hmac = crypto
    .createHmac("sha256", ACCESS_TOKEN_SECRET)
    .update(data)
    .digest("hex");
  const token = Buffer.from(`${data}:${hmac}`).toString("base64url");
  return token;
}

function verifyAccessToken(
  token: string,
  email?: string,
): { ok: boolean; expiresAt?: number } {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [em, expStr, sig] = decoded.split(":");
    if (!em || !expStr || !sig) return { ok: false };
    if (email && email !== em) return { ok: false };
    const data = `${em}:${expStr}`;
    const expected = crypto
      .createHmac("sha256", ACCESS_TOKEN_SECRET)
      .update(data)
      .digest("hex");
    if (expected !== sig) return { ok: false };
    const expiresAt = parseInt(expStr, 10);
    if (Number.isNaN(expiresAt) || expiresAt < Math.floor(Date.now() / 1000))
      return { ok: false };
    return { ok: true, expiresAt };
  } catch {
    return { ok: false };
  }
}

import { sendWhatsApp } from "../lib/whatsapp";

export const handleWorkshopDummyPay: RequestHandler = async (req, res) => {
  const body = req.body as WorkshopRegistrationRequest & {
    whatsappOptIn?: boolean;
  };
  if (!body?.name || !body?.email || !body?.phone || !body?.domainInterest) {
    res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
    return;
  }

  try {
    await saveWorkshopRegistration({
      name: body.name,
      email: body.email,
      phone: body.phone,
      domain_interest: body.domainInterest,
      payment_status: "success",
      amount: WORKSHOP_PRICE,
      currency: "INR",
    });
  } catch (e) {
    // Non-fatal if DB is not configured
  }

  const ttl = 60 * 60 * 48; // 48 hours
  const token = makeAccessToken(body.email, ttl);
  const meetingUrl = process.env.WORKSHOP_MEETING_URL || null;

  // Send confirmation email (uses server/lib/email.ts - SendGrid)
  const emailed = await sendEmail({
    to: body.email,
    subject: "Workshop Registration Confirmed",
    html: `<p>Hi ${body.name},</p>
<p>Your payment of ₹${WORKSHOP_PRICE} was successful. You're registered for the workshop.</p>
${meetingUrl ? `<p>Join link: <a href="${meetingUrl}">${meetingUrl}</a></p>` : ""}
<p>Access your resources for 48 hours using the dashboard.</p>`,
  }).catch(() => false);

  // Send WhatsApp notification if user opted in and we have a phone
  let whatsappSent = false;
  try {
    if (body.whatsappOptIn && body.phone) {
      const phoneNumeric = body.phone.replace(/[^0-9]/g, "");
      const message = `Hi ${body.name}, your registration for the ₹${WORKSHOP_PRICE} workshop is confirmed. We'll send reminders before the session.`;
      whatsappSent = await sendWhatsApp({ phone: phoneNumeric, message });
    }
  } catch (e) {
    whatsappSent = false;
  }

  res.json({
    success: true,
    orderId: `dummy-${Date.now()}`,
    accessToken: token,
    meetingUrl,
    message: emailed ? "Email sent" : undefined,
    whatsappSent,
  });
};

export const handleCohortDummyPay: RequestHandler = async (req, res) => {
  const body = req.body as CohortEnrollmentRequest;
  if (!body?.name || !body?.email) {
    res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
    return;
  }

  // Do NOT persist cohort enrollment here. Persist AFTER user completes the 3-hour preview video.

  const ttl = 60 * 60 * 24 * 30; // 30 days
  const token = makeAccessToken(body.email, ttl);
  const meetingUrl = process.env.COHORT_MEETING_URL || null;

  const emailed = await sendEmail({
    to: body.email,
    subject: "Cohort Registration Received",
    html: `<p>Hi ${body.name},</p>
<p>Your payment of ₹${COHORT_PRICE} was successful. Please watch the 3-hour preview to complete your registration.</p>
${meetingUrl ? `<p>Cohort link: <a href="${meetingUrl}">${meetingUrl}</a></p>` : ""}
<p>We'll follow up with schedule and calendar invite after you complete the preview.</p>`,
  }).catch(() => false);

  res.json({
    success: true,
    orderId: `dummy-${Date.now()}`,
    accessToken: token,
    meetingUrl,
    message: emailed ? "Email sent" : undefined,
  });
};

export const handleCohortComplete: RequestHandler = async (req, res) => {
  const { email, token, name, phone } = req.body as {
    email?: string;
    token?: string;
    name?: string;
    phone?: string;
  };
  if (!email || !token) {
    res.status(400).json({ success: false, message: "Missing email or token" });
    return;
  }

  const verified = verifyAccessToken(token, email);
  if (!verified.ok) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
    return;
  }

  try {
    await saveCohortEnrollment({
      name: name || email,
      email,
      phone,
      payment_status: "success",
      amount: COHORT_PRICE,
      currency: "INR",
    });
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e?.message || "Failed to save enrollment",
    });
  }
};

export const handleDashboardResources: RequestHandler = (req, res) => {
  const email = (req.query.email as string) || "";
  const token = (req.query.token as string) || "";
  const verified = verifyAccessToken(token, email);
  if (!verified.ok) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const now = new Date();
  const expires = new Date(verified.expiresAt! * 1000);

  const resources: DashboardResourcesResponse = {
    resources: [
      {
        title: "Workshop Slides",
        url:
          process.env.WORKSHOP_SLIDES_URL || "https://example.com/slides.pdf",
        type: "pdf",
        expiresAt: expires.toISOString(),
      },
      {
        title: "Workshop Recording (48h)",
        url:
          process.env.WORKSHOP_RECORDING_URL || "https://youtu.be/sx4l4OqdpEI",
        type: "recording",
        expiresAt: expires.toISOString(),
      },
      {
        title: "Role Map PDF",
        url: process.env.ROLE_MAP_PDF_URL || "https://example.com/role-map.pdf",
        type: "pdf",
        expiresAt: expires.toISOString(),
      },
      {
        title: "Checklist",
        url:
          process.env.WORKSHOP_CHECKLIST_URL ||
          "https://example.com/checklist.pdf",
        type: "pdf",
        expiresAt: expires.toISOString(),
      },
      {
        title: "3-hour Preview Session",
        url:
          process.env.COHORT_PREVIEW_VIDEO_URL ||
          "https://youtu.be/YE-JrestfRw",
        type: "recording",
      },
    ],
    upsellLink: process.env.COHORT_UPSELL_URL || "/cohort-preview",
  };

  res.json(resources);
};

// -------------------- PhonePe Integration (optional) --------------------
import { initiatePayment, fetchPaymentStatus } from "../lib/phonepe";

function getBaseUrl(req: any) {
  if (process.env.APP_BASE_URL) return process.env.APP_BASE_URL;
  const proto =
    (req.headers["x-forwarded-proto"] as string) || req.protocol || "https";
  const host = (req.headers["x-forwarded-host"] as string) || req.get("host");
  return `${proto}://${host}`;
}

function signRedirect(email: string, txn: string) {
  const data = `${email}:${txn}`;
  return crypto
    .createHmac("sha256", ACCESS_TOKEN_SECRET)
    .update(data)
    .digest("hex");
}

export const handleWorkshopPay: RequestHandler = async (req, res) => {
  const body = req.body as WorkshopRegistrationRequest & {
    whatsappOptIn?: boolean;
  };
  if (!body?.name || !body?.email || !body?.phone || !body?.domainInterest) {
    res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
    return;
  }

  try {
    const txn = `ws-${Date.now()}`;
    const base = getBaseUrl(req);
    const sig = signRedirect(body.email, txn);
    const redirectTarget = `${base}/phonepe-return?purpose=workshop&txn=${encodeURIComponent(txn)}&email=${encodeURIComponent(body.email)}&sig=${sig}`;

    const out = await initiatePayment({
      merchantTransactionId: txn,
      amountInPaise: WORKSHOP_PRICE * 100,
      name: body.name,
      email: body.email,
      mobile: body.phone,
      redirectUrl: redirectTarget,
    });

    res.json({ success: true, redirectUrl: out.redirectUrl });
  } catch (e: any) {
    if (
      (process.env.PHONEPE_CLIENT_ID && process.env.PHONEPE_CLIENT_SECRET) ||
      (process.env.PHONEPE_MERCHANT_ID && process.env.PHONEPE_SALT_KEY)
    ) {
      console.error("PhonePe init error (workshop):", e?.message || e);
      res.status(502).json({
        success: false,
        message: `PhonePe init failed: ${e?.message || "unknown"}`,
      });
      return;
    }
    // Fallback to dummy behavior if PhonePe not configured
    return handleWorkshopDummyPay(req, res, (() => {}) as any);
  }
};

export const handleWorkshopConfirm: RequestHandler = async (req, res) => {
  const txn = (req.query.txn as string) || (req.body as any)?.txn;
  const email = (req.query.email as string) || (req.body as any)?.email;
  const sig = (req.query.sig as string) || (req.body as any)?.sig;
  if (!txn || !email || !sig) {
    res.status(400).json({ success: false, message: "Missing parameters" });
    return;
  }
  const expected = signRedirect(email, txn);
  if (expected !== sig) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    return;
  }
  try {
    const status = await fetchPaymentStatus(txn);
    const ok =
      status?.success ||
      status?.code === "PAYMENT_SUCCESS" ||
      status?.data?.state === "COMPLETED";
    if (!ok) {
      const phonepeConfigured = !!(
        (process.env.PHONEPE_CLIENT_ID && process.env.PHONEPE_CLIENT_SECRET) ||
        (process.env.PHONEPE_MERCHANT_ID && process.env.PHONEPE_SALT_KEY)
      );
      if (!phonepeConfigured) {
        // Dev fallback: issue access token so demo flow continues during testing
        const token = makeAccessToken(email, 60 * 60 * 48);
        try {
          await saveWorkshopRegistration({
            name: email,
            email,
            phone: undefined as any,
            domain_interest: "General",
            payment_status: "success",
            amount: WORKSHOP_PRICE,
            currency: "INR",
          });
        } catch {}
        res.json({
          success: true,
          accessToken: token,
          message: "Dev fallback: token issued",
        });
        return;
      }

      res
        .status(400)
        .json({ success: false, message: "Payment not successful" });
      return;
    }

    try {
      await saveWorkshopRegistration({
        name: email,
        email,
        phone: undefined as any,
        domain_interest: "General",
        payment_status: "success",
        amount: WORKSHOP_PRICE,
        currency: "INR",
      });
    } catch {}

    const token = makeAccessToken(email, 60 * 60 * 48);
    const meetingUrl = process.env.WORKSHOP_MEETING_URL || null;
    res.json({ success: true, accessToken: token, meetingUrl });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e?.message || "Failed" });
  }
};

export const handleCohortPay: RequestHandler = async (req, res) => {
  const body = req.body as CohortEnrollmentRequest;
  if (!body?.name || !body?.email) {
    res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
    return;
  }
  try {
    const txn = `ch-${Date.now()}`;
    const base = getBaseUrl(req);
    const sig = signRedirect(body.email, txn);
    const redirectTarget = `${base}/phonepe-return?purpose=cohort&txn=${encodeURIComponent(txn)}&email=${encodeURIComponent(body.email)}&sig=${sig}`;

    const out = await initiatePayment({
      merchantTransactionId: txn,
      amountInPaise: COHORT_PRICE * 100,
      name: body.name,
      email: body.email,
      mobile: body.phone,
      redirectUrl: redirectTarget,
    });
    res.json({ success: true, redirectUrl: out.redirectUrl });
  } catch (e: any) {
    if (
      (process.env.PHONEPE_CLIENT_ID && process.env.PHONEPE_CLIENT_SECRET) ||
      (process.env.PHONEPE_MERCHANT_ID && process.env.PHONEPE_SALT_KEY)
    ) {
      console.error("PhonePe init error (cohort):", e?.message || e);
      res.status(502).json({
        success: false,
        message: `PhonePe init failed: ${e?.message || "unknown"}`,
      });
      return;
    }
    return handleCohortDummyPay(req, res, (() => {}) as any);
  }
};

export const handleCohortConfirm: RequestHandler = async (req, res) => {
  const txn = (req.query.txn as string) || (req.body as any)?.txn;
  const email = (req.query.email as string) || (req.body as any)?.email;
  const sig = (req.query.sig as string) || (req.body as any)?.sig;
  if (!txn || !email || !sig) {
    res.status(400).json({ success: false, message: "Missing parameters" });
    return;
  }
  const expected = signRedirect(email, txn);
  if (expected !== sig) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    return;
  }
  try {
    const status = await fetchPaymentStatus(txn);
    const ok =
      status?.success ||
      status?.code === "PAYMENT_SUCCESS" ||
      status?.data?.state === "COMPLETED";
    if (!ok) {
      const phonepeConfigured = !!(
        (process.env.PHONEPE_CLIENT_ID && process.env.PHONEPE_CLIENT_SECRET) ||
        (process.env.PHONEPE_MERCHANT_ID && process.env.PHONEPE_SALT_KEY)
      );
      if (!phonepeConfigured) {
        // Dev fallback: issue access token for cohort flow
        const token = makeAccessToken(email, 60 * 60 * 24 * 30);
        res.json({
          success: true,
          accessToken: token,
          message: "Dev fallback: token issued",
        });
        return;
      }

      res
        .status(400)
        .json({ success: false, message: "Payment not successful" });
      return;
    }

    const token = makeAccessToken(email, 60 * 60 * 24 * 30);
    const meetingUrl = process.env.COHORT_MEETING_URL || null;
    res.json({ success: true, accessToken: token, meetingUrl });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e?.message || "Failed" });
  }
};

export const handleDVPay: RequestHandler = async (req, res) => {
  const { name, email, phone } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
  };
  if (!name || !email) {
    res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
    return;
  }
  try {
    const txn = `dv-${Date.now()}`;
    const base = getBaseUrl(req);
    const sig = signRedirect(email, txn);
    const redirectTarget = `${base}/phonepe-return?purpose=dv&txn=${encodeURIComponent(txn)}&email=${encodeURIComponent(email)}&sig=${sig}`;

    const out = await initiatePayment({
      merchantTransactionId: txn,
      amountInPaise: DV_PRICE * 100,
      name,
      email,
      mobile: phone,
      redirectUrl: redirectTarget,
    });
    res.json({ success: true, redirectUrl: out.redirectUrl });
  } catch (e: any) {
    if (
      (process.env.PHONEPE_CLIENT_ID && process.env.PHONEPE_CLIENT_SECRET) ||
      (process.env.PHONEPE_MERCHANT_ID && process.env.PHONEPE_SALT_KEY)
    ) {
      console.error("PhonePe init error (dv):", e?.message || e);
      res.status(502).json({
        success: false,
        message: `PhonePe init failed: ${e?.message || "unknown"}`,
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: e?.message || "PhonePe not configured",
    });
  }
};

export const handleDVConfirm: RequestHandler = async (req, res) => {
  const txn = (req.query.txn as string) || (req.body as any)?.txn;
  const email = (req.query.email as string) || (req.body as any)?.email;
  const sig = (req.query.sig as string) || (req.body as any)?.sig;
  if (!txn || !email || !sig) {
    res.status(400).json({ success: false, message: "Missing parameters" });
    return;
  }
  const expected = signRedirect(email, txn);
  if (expected !== sig) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    return;
  }
  try {
    const status = await fetchPaymentStatus(txn);
    const ok =
      status?.success ||
      status?.code === "PAYMENT_SUCCESS" ||
      status?.data?.state === "COMPLETED";
    if (!ok) {
      const phonepeConfigured = !!(
        (process.env.PHONEPE_CLIENT_ID && process.env.PHONEPE_CLIENT_SECRET) ||
        (process.env.PHONEPE_MERCHANT_ID && process.env.PHONEPE_SALT_KEY)
      );
      if (!phonepeConfigured) {
        // Dev fallback for DV: record success locally and return
        try {
          await saveCohortEnrollment({
            name: email,
            email,
            phone: undefined as any,
            payment_status: "success",
            amount: DV_PRICE,
            currency: "INR",
          });
        } catch {}
        res.json({ success: true, message: "Dev fallback: recorded success" });
        return;
      }

      res
        .status(400)
        .json({ success: false, message: "Payment not successful" });
      return;
    }

    try {
      await saveCohortEnrollment({
        name: email,
        email,
        phone: undefined as any,
        payment_status: "success",
        amount: DV_PRICE,
        currency: "INR",
      });
    } catch {}

    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e?.message || "Failed" });
  }
};

// PhonePe webhook endpoint: receives asynchronous notifications from PhonePe about transaction state
export const handlePhonePeWebhook: RequestHandler = async (req, res) => {
  const body = req.body;
  const headers = req.headers;
  const ts = Date.now();
  try {
    const logsDir = require("node:path").join(process.cwd(), "server", "logs");
    const fs = require("node:fs");
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
    fs.writeFileSync(
      require("node:path").join(logsDir, `phonepe_webhook_${ts}.json`),
      JSON.stringify({ headers, body }, null, 2),
      "utf8",
    );
  } catch (e) {
    console.warn("Failed to write webhook log", e);
  }

  // Try to extract merchantTransactionId from common payload shapes
  const txn =
    body?.data?.merchantTransactionId ||
    body?.merchantTransactionId ||
    body?.txn ||
    body?.transactionId ||
    body?.order?.merchantTransactionId ||
    body?.request?.merchantTransactionId;

  if (!txn) {
    // Ack to PhonePe but log for manual inspection
    res.status(200).json({ ok: true, message: "received" });
    return;
  }

  try {
    const status = await fetchPaymentStatus(txn);
    const ok =
      status?.success ||
      status?.code === "PAYMENT_SUCCESS" ||
      status?.data?.state === "COMPLETED";
    if (!ok) {
      // Not a success event — acknowledge and return
      res.status(200).json({ ok: true, message: "not completed" });
      return;
    }

    // Determine type by txn prefix
    if (txn.startsWith("ws-")) {
      const email =
        body?.data?.merchantUserId || body?.merchantUserId || body?.email || "";
      try {
        await saveWorkshopRegistration({
          name: email,
          email,
          phone: undefined as any,
          domain_interest: "General",
          payment_status: "success",
          amount: WORKSHOP_PRICE,
          currency: "INR",
        });
      } catch (e) {}
      const token = makeAccessToken(email, 60 * 60 * 48);
      try {
        await sendEmail({
          to: email,
          subject: "Payment confirmed",
          html: `<p>Your payment is confirmed. Access token: ${token}</p>`,
        }).catch(() => false);
      } catch {}
    } else if (txn.startsWith("ch-") || txn.startsWith("dv-")) {
      const email =
        body?.data?.merchantUserId || body?.merchantUserId || body?.email || "";
      try {
        await saveCohortEnrollment({
          name: email,
          email,
          phone: undefined as any,
          payment_status: "success",
          amount: txn.startsWith("dv-") ? DV_PRICE : COHORT_PRICE,
          currency: "INR",
        });
      } catch (e) {}
      const token = makeAccessToken(email, 60 * 60 * 24 * 30);
      try {
        await sendEmail({
          to: email,
          subject: "Payment confirmed",
          html: `<p>Your payment is confirmed. Access token: ${token}</p>`,
        }).catch(() => false);
      } catch {}
    }

    res.status(200).json({ ok: true });
  } catch (e: any) {
    console.error("Webhook handling error", e);
    res.status(500).json({ ok: false });
  }
};
