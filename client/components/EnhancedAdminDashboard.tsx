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
import { Separator } from "./ui/separator";
import {
  getAdminStats,
  exportAllDataToExcel,
  exportFormTypeToExcel,
  clearAllFormData,
  fetchAllFormData,
  type AdminStats,
  type AdminFormData,
} from "../lib/adminDataService";
import { checkSupabaseConfig } from "../lib/supabase";
import Swal from "sweetalert2";
import {
  Download,
  RefreshCw,
  Trash2,
  FileSpreadsheet,
  Users,
  FileText,
  BookOpen,
  Video,
  Calendar,
  TrendingUp,
  Database,
} from "lucide-react";

export default function EnhancedAdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    contact: 0,
    enroll: 0,
    brochure: 0,
    demo: 0,
    total: 0,
  });
  const [formData, setFormData] = useState<AdminFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    setIsSupabaseConfigured(checkSupabaseConfig());
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      if (!checkSupabaseConfig()) {
        throw new Error("Supabase not configured");
      }

      const [statsData, allData] = await Promise.all([
        getAdminStats(),
        fetchAllFormData(),
      ]);

      setStats(statsData);
      setFormData(allData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Load Data",
        text: error instanceof Error ? error.message : "Unknown error occurred",
        confirmButtonColor: "#0d9488",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportAll = async () => {
    setIsExporting(true);
    try {
      const result = await exportAllDataToExcel();

      Swal.fire({
        icon: "success",
        title: "Export Successful!",
        html: `
          <div class="text-left">
            <p><strong>File:</strong> ${result.filename}</p>
            <p><strong>Contact Forms:</strong> ${result.contactCount}</p>
            <p><strong>Enrollment Forms:</strong> ${result.enrollmentCount}</p>
            <p><strong>Brochure Downloads:</strong> ${result.brochureCount}</p>
            <p><strong>Demo Registrations:</strong> ${result.demoCount}</p>
            <p><strong>Total Records:</strong> ${result.totalCount}</p>
          </div>
        `,
        confirmButtonColor: "#0d9488",
      });
    } catch (error) {
      console.error("Export error:", error);
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text: error instanceof Error ? error.message : "Failed to export data",
        confirmButtonColor: "#0d9488",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportFormType = async (
    formType:
      | "contacts"
      | "enrollments"
      | "brochureDownloads"
      | "demoRegistrations",
    typeName: string,
  ) => {
    try {
      const result = await exportFormTypeToExcel(formType);

      Swal.fire({
        icon: "success",
        title: `${typeName} Exported!`,
        html: `
          <div class="text-left">
            <p><strong>File:</strong> ${result.filename}</p>
            <p><strong>Records:</strong> ${result.count}</p>
          </div>
        `,
        confirmButtonColor: "#0d9488",
      });
    } catch (error) {
      console.error(`Export ${formType} error:`, error);
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text:
          error instanceof Error
            ? error.message
            : `Failed to export ${typeName}`,
        confirmButtonColor: "#0d9488",
      });
    }
  };

  const handleClearAllData = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Clear All Data?",
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>This will permanently delete:</strong></p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>${stats.contact} Contact Forms</li>
            <li>${stats.enroll} Enrollment Forms</li>
            <li>${stats.brochure} Brochure Downloads</li>
            <li>${stats.demo} Demo Registrations</li>
          </ul>
          <p class="mt-3 text-red-600 font-semibold">This action cannot be undone!</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Yes, Clear All Data",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#0d9488",
    });

    if (result.isConfirmed) {
      setIsClearing(true);
      try {
        await clearAllFormData();
        await loadDashboardData();

        Swal.fire({
          icon: "success",
          title: "Data Cleared",
          text: "All form submission data has been permanently deleted.",
          confirmButtonColor: "#0d9488",
        });
      } catch (error) {
        console.error("Clear data error:", error);
        Swal.fire({
          icon: "error",
          title: "Clear Failed",
          text: error instanceof Error ? error.message : "Failed to clear data",
          confirmButtonColor: "#0d9488",
        });
      } finally {
        setIsClearing(false);
      }
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="space-y-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <Database className="w-5 h-5 mr-2" />
              Database Not Configured
            </CardTitle>
            <CardDescription className="text-red-600">
              Supabase database connection is not configured. Please set up the
              database to use the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-600 mb-4">
              To use the enhanced admin dashboard, you need to:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-red-700">
              <li>Set up Supabase database with the required tables</li>
              <li>Configure environment variables for database connection</li>
              <li>Restart the application</li>
            </ol>
            <p className="text-xs text-red-500 mt-4">
              See SUPABASE_SETUP.md for detailed instructions.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h2>
          <p className="text-gray-600">
            Manage all form submissions and export data from Supabase database
          </p>
          <p className="text-sm text-gray-500 flex items-center mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        </div>
        <Button
          onClick={loadDashboardData}
          disabled={isLoading}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Overview Stats */}
      <Card className="bg-gradient-to-r from-vlsi-50 to-blue-50 border-vlsi-200">
        <CardHeader>
          <CardTitle className="flex items-center text-vlsi-700">
            <TrendingUp className="w-5 h-5 mr-2" />
            Overview Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-vlsi-600">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600">Total Forms</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.contact}
              </div>
              <div className="text-sm text-gray-600">Contact</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.enroll}
              </div>
              <div className="text-sm text-gray-600">Enrollment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {stats.brochure}
              </div>
              <div className="text-sm text-gray-600">Brochure</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.demo}
              </div>
              <div className="text-sm text-gray-600">Demo</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Details Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Contact Forms */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Contact Forms
            </CardTitle>
            <CardDescription>Inquiry and contact submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="text-lg px-3 py-1 bg-blue-100 text-blue-700"
                >
                  {stats.contact}
                </Badge>
                <span className="text-sm text-gray-500">Total submissions</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleExportFormType("contacts", "Contact Forms")
                }
                disabled={stats.contact === 0 || isLoading}
                className="w-full flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enrollment Forms */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              Enrollment Forms
            </CardTitle>
            <CardDescription>Course enrollment applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="text-lg px-3 py-1 bg-green-100 text-green-700"
                >
                  {stats.enroll}
                </Badge>
                <span className="text-sm text-gray-500">
                  Total applications
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleExportFormType("enrollments", "Enrollment Forms")
                }
                disabled={stats.enroll === 0 || isLoading}
                className="w-full flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Brochure Downloads */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-orange-600" />
              Brochure Downloads
            </CardTitle>
            <CardDescription>Brochure download requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="text-lg px-3 py-1 bg-orange-100 text-orange-700"
                >
                  {stats.brochure}
                </Badge>
                <span className="text-sm text-gray-500">Total downloads</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleExportFormType(
                    "brochureDownloads",
                    "Brochure Downloads",
                  )
                }
                disabled={stats.brochure === 0 || isLoading}
                className="w-full flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Registrations */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Video className="w-5 h-5 mr-2 text-purple-600" />
              Demo Registrations
            </CardTitle>
            <CardDescription>Free demo class registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="text-lg px-3 py-1 bg-purple-100 text-purple-700"
                >
                  {stats.demo}
                </Badge>
                <span className="text-sm text-gray-500">
                  Total registrations
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleExportFormType(
                    "demoRegistrations",
                    "Demo Registrations",
                  )
                }
                disabled={stats.demo === 0 || isLoading}
                className="w-full flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Excel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export All Data Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileSpreadsheet className="w-5 h-5 mr-2 text-vlsi-600" />
            Export All Data
          </CardTitle>
          <CardDescription>
            Export all form submissions to a single Excel file with multiple
            sheets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleExportAll}
                disabled={isExporting || stats.total === 0 || isLoading}
                className="bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white flex items-center gap-2"
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Export All to Excel
                  </>
                )}
              </Button>

              <div className="text-sm text-gray-600 flex items-center">
                {stats.total > 0 ? (
                  <span>Ready to export {stats.total} total records</span>
                ) : (
                  <span>No data available for export</span>
                )}
              </div>
            </div>

            {stats.total > 0 && (
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                <p className="font-semibold mb-2">Export will include:</p>
                <ul className="space-y-1">
                  <li>
                    • Contact Forms sheet with {stats.contact} submissions
                  </li>
                  <li>
                    • Enrollment Forms sheet with {stats.enroll} applications
                  </li>
                  <li>
                    • Brochure Downloads sheet with {stats.brochure} downloads
                  </li>
                  <li>
                    • Demo Registrations sheet with {stats.demo} registrations
                  </li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Management Section */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center">
            <Trash2 className="w-5 h-5 mr-2" />
            Data Management
          </CardTitle>
          <CardDescription className="text-red-600">
            Danger zone - Permanently delete all stored data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700 mb-2">
                <strong>Warning:</strong> This action will permanently delete
                all form submissions from the database.
              </p>
              <p className="text-xs text-red-600">
                Make sure to export your data before clearing if you need to
                keep records.
              </p>
            </div>

            <Button
              variant="destructive"
              onClick={handleClearAllData}
              disabled={isClearing || stats.total === 0 || isLoading}
              className="flex items-center gap-2"
            >
              {isClearing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Clearing Data...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Clear All Data ({stats.total} records)
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
