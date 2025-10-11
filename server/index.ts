import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleGoogleSheetsSubmission,
  handleGoogleSheetsConfig,
  handleCreateHeaders
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

  // Payments & resources
  app.post("/api/payment/workshop/dummy-pay", handleWorkshopDummyPay);
  app.post("/api/payment/cohort/dummy-pay", handleCohortDummyPay);
  app.post("/api/cohort/complete", handleCohortComplete);
  app.get("/api/dashboard/resources", handleDashboardResources);

  return app;
}
