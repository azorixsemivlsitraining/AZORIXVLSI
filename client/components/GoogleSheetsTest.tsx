import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  sendContactFormToSheets,
  getConfigurationStatus,
} from "../lib/googleSheetsService";

export default function GoogleSheetsTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [config, setConfig] = useState(getConfigurationStatus());

  const testGoogleSheetsConnection = async () => {
    setIsLoading(true);
    setResult("");

    try {
      const testData = {
        name: "Test User",
        email: "test@example.com",
        phone: "+91 9052653636",
        subject: "Test Subject",
        inquiryType: "course-info",
        message: "This is a test message from the integration test",
        submittedAt: new Date().toISOString(),
      };

      console.log("Sending test data to Google Sheets...");
      console.log("Web App URL:", config.webAppUrl);
      console.log("Spreadsheet ID:", config.spreadsheetId);
      console.log("Test Data:", testData);

      const success = await sendContactFormToSheets(testData);

      if (success) {
        setResult(
          "✅ SUCCESS: Test data sent to Google Sheets! Check your spreadsheet.",
        );
      } else {
        setResult(
          "❌ FAILED: Could not send data to Google Sheets. Check console for errors.",
        );
      }
    } catch (error) {
      console.error("Test error:", error);
      setResult("❌ ERROR: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Google Sheets Integration Test</h3>

      <div className="space-y-4">
        <div className="p-4 bg-white rounded border">
          <h4 className="font-semibold mb-2">Configuration Status:</h4>
          <p
            className={`text-sm ${config.configured ? "text-green-600" : "text-red-600"}`}
          >
            {config.message}
          </p>
          <div className="mt-2 text-xs text-gray-600">
            <p>
              <strong>Spreadsheet ID:</strong> {config.spreadsheetId}
            </p>
            <p>
              <strong>Web App URL:</strong> {config.webAppUrl.substring(0, 50)}
              ...
            </p>
          </div>
        </div>

        <Button
          onClick={testGoogleSheetsConnection}
          disabled={isLoading || !config.configured}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? "Testing..." : "Test Google Sheets Connection"}
        </Button>

        {result && (
          <div
            className={`p-4 rounded border ${
              result.startsWith("✅")
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <p className="text-sm">{result}</p>
          </div>
        )}

        <div className="text-xs text-gray-600">
          <p>
            <strong>What this test does:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Sends a test contact form submission to your Google Sheets</li>
            <li>Uses the same integration that the real forms use</li>
            <li>Check your "Contact Forms" sheet for the test entry</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
