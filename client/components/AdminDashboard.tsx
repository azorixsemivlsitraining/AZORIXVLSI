import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  exportAllFormsToExcel,
  exportContactFormsToExcel,
  exportEnrollFormsToExcel,
  exportBrochureFormsToExcel,
  exportDemoFormsToExcel,
  getStorageStatistics,
  clearAllStoredData,
} from "../lib/excelExporter";
import {
  exportAllFormsAsCSV,
  prepareDataForGoogleSheets,
  GOOGLE_SHEETS_SETUP_INSTRUCTIONS,
} from "../lib/googleSheetsIntegration";
import {
  getConfigurationStatus,
  createGoogleSheetsTemplate,
  SETUP_INSTRUCTIONS,
} from "../lib/googleSheetsService";
import GoogleSheetsTest from "./GoogleSheetsTest";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contact: 0,
    enroll: 0,
    brochure: 0,
    demo: 0,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [googleSheetsStatus, setGoogleSheetsStatus] = useState({
    configured: false,
    message: "",
  });

  useEffect(() => {
    loadStats();
    loadGoogleSheetsStatus();
  }, []);

  const loadStats = () => {
    setStats(getStorageStatistics());
  };

  const loadGoogleSheetsStatus = () => {
    const status = getConfigurationStatus();
    setGoogleSheetsStatus(status);
  };

  const handleExportAll = async () => {
    if (
      stats.contact === 0 &&
      stats.enroll === 0 &&
      stats.brochure === 0 &&
      stats.demo === 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "No Data Found",
        text: "No form submissions found to export.",
        confirmButtonColor: "#0d9488",
      });
      return;
    }

    setIsExporting(true);
    try {
      const result = exportAllFormsToExcel();

      Swal.fire({
        icon: "success",
        title: "Export Successful!",
        html: `
          <div class="text-left">
            <p><strong>File:</strong> ${result.filename}</p>
            <p><strong>Contact Forms:</strong> ${result.contactCount}</p>
            <p><strong>Enrollment Forms:</strong> ${result.enrollCount}</p>
            <p><strong>Brochure Downloads:</strong> ${result.brochureCount}</p>
          </div>
        `,
        confirmButtonColor: "#0d9488",
      });
    } catch (error) {
      console.error("Export error:", error);
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text: "Failed to export data. Please try again.",
        confirmButtonColor: "#0d9488",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleShowDetailedSetup = () => {
    Swal.fire({
      title: "Google Sheets Setup Instructions",
      html: `
        <div class="text-left text-sm">
          <div class="mb-4 p-3 bg-blue-100 text-blue-800 rounded">
            <strong>AUTOMATIC SYNC:</strong> Once configured, all form submissions will automatically appear in your Google Sheets!
          </div>

          <div class="space-y-4">
            <div class="p-3 border rounded">
              <h4 class="font-bold mb-2">📋 STEP 1: Create Google Sheets</h4>
              <ol class="list-decimal list-inside space-y-1">
                <li>Go to sheets.google.com and create new spreadsheet</li>
                <li>Name it "Azorix VLSI Form Submissions"</li>
                <li>Create 3 sheets: "Contact Forms", "Enrollment Forms", "Brochure Downloads"</li>
              </ol>
            </div>

            <div class="p-3 border rounded">
              <h4 class="font-bold mb-2">⚙️ STEP 2: Set Up Google Apps Script</h4>
              <ol class="list-decimal list-inside space-y-1">
                <li>In your spreadsheet: Extensions → Apps Script</li>
                <li>Replace default code with provided script</li>
                <li>Deploy as web app with "Anyone" access</li>
                <li>Copy the web app URL</li>
              </ol>
            </div>

            <div class="p-3 border rounded">
              <h4 class="font-bold mb-2">🔧 STEP 3: Update Configuration</h4>
              <ol class="list-decimal list-inside space-y-1">
                <li>Copy your spreadsheet ID from URL</li>
                <li>Update googleSheetsService.ts with your IDs</li>
                <li>Test the integration</li>
              </ol>
            </div>
          </div>

          <div class="mt-4 p-3 bg-green-100 text-green-800 rounded">
            <strong>Result:</strong> All future form submissions will automatically sync to your Google Sheets in real-time!
          </div>
        </div>
      `,
      confirmButtonText: "Got It!",
      confirmButtonColor: "#0d9488",
      width: "700px",
    });
  };

  const handleExportToGoogleSheets = () => {
    const data = prepareDataForGoogleSheets();
    const totalRecords =
      data["Contact Forms"].length +
      data["Enrollment Forms"].length +
      data["Brochure Downloads"].length;

    if (totalRecords === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Data Found",
        text: "No form submissions found to export.",
        confirmButtonColor: "#0d9488",
      });
      return;
    }

    Swal.fire({
      icon: "info",
      title: "Google Sheets Integration",
      html: `
        <div class="text-left">
          <p class="mb-4">To integrate with Google Sheets:</p>
          <ol class="list-decimal list-inside space-y-2 mb-4">
            <li>Create a new Google Sheets document</li>
            <li>Create three sheets: "Contact Forms", "Enrollment Forms", "Brochure Downloads"</li>
            <li>Download CSV files using the button below</li>
            <li>Import each CSV to the corresponding sheet</li>
          </ol>
          <p><strong>Total Records:</strong> ${totalRecords}</p>
          <p><strong>Contact Forms:</strong> ${data["Contact Forms"].length}</p>
          <p><strong>Enrollment Forms:</strong> ${data["Enrollment Forms"].length}</p>
          <p><strong>Brochure Downloads:</strong> ${data["Brochure Downloads"].length}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Download CSV Files",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0d9488",
    }).then((result) => {
      if (result.isConfirmed) {
        const csvResults = exportAllFormsAsCSV();
        if (csvResults.success) {
          Swal.fire({
            icon: "success",
            title: "CSV Files Downloaded!",
            text: "Import these files to your Google Sheets document.",
            confirmButtonColor: "#0d9488",
          });
        }
      }
    });
  };

  const handleClearData = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Clear All Data?",
      text: "This will permanently delete all stored form submissions. This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Yes, Clear All",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#0d9488",
    });

    if (result.isConfirmed) {
      clearAllStoredData();
      loadStats();
      Swal.fire({
        icon: "success",
        title: "Data Cleared",
        text: "All form submission data has been cleared.",
        confirmButtonColor: "#0d9488",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Form Submissions Dashboard
        </h2>
        <p className="text-gray-600">
          Manage and export form submission data from Contact, Enrollment, and
          Brochure forms.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Contact Forms</CardTitle>
            <CardDescription>Contact us submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {stats.contact}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={exportContactFormsToExcel}
                disabled={stats.contact === 0}
              >
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Enrollment Forms</CardTitle>
            <CardDescription>Course enrollment applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {stats.enroll}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={exportEnrollFormsToExcel}
                disabled={stats.enroll === 0}
              >
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Brochure Downloads</CardTitle>
            <CardDescription>Brochure download requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {stats.brochure}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={exportBrochureFormsToExcel}
                disabled={stats.brochure === 0}
              >
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Demo Registrations</CardTitle>
            <CardDescription>Free demo class registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {stats.demo}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={exportDemoFormsToExcel}
                disabled={stats.demo === 0}
              >
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Google Sheets Integration Status */}
      <Card
        className={
          googleSheetsStatus.configured
            ? "border-green-200"
            : "border-yellow-200"
        }
      >
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2">
              {googleSheetsStatus.configured ? "✅" : "⚠️"}
            </span>
            Google Sheets Real-Time Integration
          </CardTitle>
          <CardDescription>
            {googleSheetsStatus.configured
              ? "Forms automatically sync to Google Sheets when submitted"
              : "Set up automatic form syncing to Google Sheets"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`p-4 rounded-lg ${googleSheetsStatus.configured ? "bg-green-50" : "bg-yellow-50"}`}
          >
            <p
              className={`text-sm ${googleSheetsStatus.configured ? "text-green-800" : "text-yellow-800"}`}
            >
              <strong>Status:</strong> {googleSheetsStatus.message}
            </p>
          </div>

          <Button
            onClick={handleShowDetailedSetup}
            className={`w-full ${
              googleSheetsStatus.configured
                ? "bg-green-600 hover:bg-green-700"
                : "bg-yellow-600 hover:bg-yellow-700"
            } text-white`}
          >
            {googleSheetsStatus.configured
              ? "View Integration Details"
              : "Setup Real-Time Google Sheets Sync"}
          </Button>

          {googleSheetsStatus.configured && (
            <div className="text-sm text-gray-600">
              <p>
                ✅ All form submissions are automatically syncing to your Google
                Sheets
              </p>
              <p>✅ No manual exports needed - data updates in real-time</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Google Sheets Test Section */}
      <GoogleSheetsTest />

      {/* Export All Section */}
      <Card>
        <CardHeader>
          <CardTitle>Export All Data</CardTitle>
          <CardDescription>
            Export all form submissions to Excel or Google Sheets format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Button
              onClick={handleExportAll}
              disabled={isExporting}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
            >
              {isExporting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Exporting...
                </>
              ) : (
                "Export to Excel"
              )}
            </Button>

            <Button
              onClick={handleExportToGoogleSheets}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              📋 Export to Google Sheets
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              <strong>Excel Export:</strong> Creates a single Excel file with
              multiple sheets
            </p>
            <p>
              <strong>Google Sheets Export:</strong> Downloads CSV files that
              can be imported to Google Sheets
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Contact Forms sheet with all contact submissions</li>
              <li>Enrollment Forms sheet with all enrollment applications</li>
              <li>Brochure Downloads sheet with all download requests</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700">Data Management</CardTitle>
          <CardDescription>
            Danger zone - Clear all stored data permanently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={handleClearData}
            disabled={
              stats.contact === 0 &&
              stats.enroll === 0 &&
              stats.brochure === 0 &&
              stats.demo === 0
            }
          >
            🗑️ Clear All Data
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            This action cannot be undone. Export data before clearing if needed.
          </p>
        </CardContent>
      </Card>

      {/* Refresh Stats */}
      <div className="text-center">
        <Button variant="outline" onClick={loadStats}>
          🔄 Refresh Statistics
        </Button>
      </div>
    </div>
  );
}
