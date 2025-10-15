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
  });
  app.post("/api/cohort/complete", handleCohortComplete);
  app.get("/api/dashboard/resources", handleDashboardResources);

  return app;
}
