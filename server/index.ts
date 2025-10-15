import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleGoogleSheetsSubmission,
  handleGoogleSheetsConfig,
  handleCreateHeaders,
} from "./routes/google-sheets";
import {
  handleWorkshopDummyPay,
  handleCohortDummyPay,
  handleDashboardResources,
  handleCohortComplete,
} from "./routes/payments";

import crypto from "node:crypto";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Google Sheets API routes
  app.post("/api/google-sheets", handleGoogleSheetsSubmission);
  app.get("/api/google-sheets/config", handleGoogleSheetsConfig);
  app.post("/api/google-sheets/create-headers", handleCreateHeaders);

  // Email verification
  import("./routes/verify-email").then((m) => {
    app.post("/api/verify-email", m.handleVerifyEmail);
  });

  // Payments & resources
  app.post("/api/payment/workshop/dummy-pay", handleWorkshopDummyPay);
  app.post("/api/payment/cohort/dummy-pay", handleCohortDummyPay);
  // PhonePe-enabled endpoints (fallback to dummy internally if not configured)
  import("./routes/payments").then((m) => {
    app.post("/api/payment/workshop/pay", m.handleWorkshopPay);
    app.post("/api/payment/cohort/pay", m.handleCohortPay);
    app.post("/api/payment/dv/pay", m.handleDVPay);
    app.get("/api/payment/workshop/confirm", m.handleWorkshopConfirm);
    app.get("/api/payment/cohort/confirm", m.handleCohortConfirm);
    app.get("/api/payment/dv/confirm", m.handleDVConfirm);
    // PhonePe webhook receiver
    app.post("/api/payment/phonepe/webhook", m.handlePhonePeWebhook);
    // Alias path to match dashboard configuration
    app.post("/api/phonepe/webhook", m.handlePhonePeWebhook);

    // Debug endpoint to simulate confirm flow for a test txn
    app.get("/__debug/phonepe/confirm-test", async (req, res) => {
      try {
        const txn = "ws-TEST12345";
        const email = "testuser@example.com";
        const secret = process.env.ACCESS_TOKEN_SECRET || "dev-secret";
        const sig = crypto.createHmac("sha256", secret).update(`${email}:${txn}`).digest("hex");
        (req as any).query = { txn, email, sig };
        // Call the same handler used by the client return flow
        await m.handleWorkshopConfirm(req, res);
      } catch (e: any) {
        console.error("Debug confirm error", e);
        res.status(500).json({ ok: false, error: e?.message || String(e) });
      }
    });

    // Generic debug confirm: accept txn/email/sig via query and call confirm handler
    app.get("/__debug/phonepe/confirm", async (req, res) => {
      try {
        // Forward the received query params directly to the handler
        await m.handleWorkshopConfirm(req, res);
      } catch (e: any) {
        console.error("Debug confirm error", e);
        res.status(500).json({ ok: false, error: e?.message || String(e) });
      }
    });
  });
  app.post("/api/cohort/complete", handleCohortComplete);
  app.get("/api/dashboard/resources", handleDashboardResources);

  return app;
}
