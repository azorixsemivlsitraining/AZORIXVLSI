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

export const handleWorkshopDummyPay: RequestHandler = async (req, res) => {
  const body = req.body as WorkshopRegistrationRequest;
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

  const emailed = await sendEmail({
    to: body.email,
    subject: "Workshop Registration Confirmed",
    html: `<p>Hi ${body.name},</p>
<p>Your payment of ₹${WORKSHOP_PRICE} was successful. You're registered for the workshop.</p>
${meetingUrl ? `<p>Join link: <a href="${meetingUrl}">${meetingUrl}</a></p>` : ""}
<p>Access your resources for 48 hours using the dashboard.</p>`,
  }).catch(() => false);

  res.json({
    success: true,
    orderId: `dummy-${Date.now()}`,
    accessToken: token,
    meetingUrl,
    message: emailed ? "Email sent" : undefined,
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
    res
      .status(500)
      .json({
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
