import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { X } from "lucide-react";
import { saveBrochureDownload } from "../lib/supabase";
import { downloadBrochurePDF } from "../lib/pdfGenerator";
import { saveBrochureToStorage } from "../lib/excelExporter";
import { sendBrochureFormToSheets } from "../lib/googleSheetsService";
import { useToast } from "../hooks/use-toast";
import Swal from "sweetalert2";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    background: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        html: `
          <div class="text-center">
            <p class="text-lg mb-4">📝 Please complete all required fields</p>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <p class="text-sm text-yellow-700">
                We need your name, email, and phone number to send you the brochure
              </p>
            </div>
          </div>
        `,
        confirmButtonText: "Got it!",
        confirmButtonColor: "#f59e0b",
        customClass: {
          popup: "rounded-2xl shadow-2xl",
          confirmButton: "px-6 py-3 rounded-lg font-semibold",
        },
      });
      return;
    }

    setIsLoading(true);

    try {
      // Show loading alert
      Swal.fire({
        title: "Preparing Your Brochure...",
        html: `
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Generating your personalized VLSI course brochure</p>
          </div>
        `,
        allowOutsideClick: false,
        showConfirmButton: false,
        background: "#ffffff",
        customClass: {
          popup: "rounded-2xl shadow-2xl",
        },
      });

      // Save to multiple storage systems
      await Promise.all([
        saveBrochureDownload(formData),
        saveBrochureToStorage(formData),
        sendBrochureFormToSheets(formData),
      ]);

      // Generate and download PDF brochure
      await downloadBrochurePDF();

      // Show success alert
      await Swal.fire({
        icon: "success",
        title: "Brochure Downloaded Successfully!",
        html: `
          <div class="text-center">
            <p class="text-lg mb-4">🎉 Your VLSI course brochure is ready!</p>
            <div class="bg-green-50 p-4 rounded-lg mb-4">
              <p class="text-sm text-green-700">
                📁 Check your <strong>Downloads</strong> folder<br/>
                📧 Course details also sent to your email
              </p>
            </div>
            <p class="text-gray-600">Ready to start your VLSI journey?</p>
          </div>
        `,
        confirmButtonText: "Explore Courses",
        showCancelButton: true,
        cancelButtonText: "Close",
        confirmButtonColor: "#0891b2",
        cancelButtonColor: "#6b7280",
        customClass: {
          popup: "rounded-2xl shadow-2xl",
          confirmButton: "px-6 py-3 rounded-lg font-semibold",
          cancelButton: "px-6 py-3 rounded-lg font-semibold",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to courses page
          window.location.href = "/courses";
        }
      });

      // Reset form and close modal
      setFormData({ name: "", email: "", phone: "", background: "" });
      onClose();
    } catch (error) {
      console.error("Error downloading brochure:", error);

      Swal.fire({
        icon: "error",
        title: "Download Failed",
        html: `
          <div class="text-center">
            <p class="text-lg mb-4">😞 Something went wrong</p>
            <div class="bg-red-50 p-4 rounded-lg mb-4">
              <p class="text-sm text-red-700">
                Please check your internet connection and try again
              </p>
            </div>
            <p class="text-gray-600">Need help? Contact us directly!</p>
          </div>
        `,
        confirmButtonText: "Try Again",
        showCancelButton: true,
        cancelButtonText: "Contact Us",
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#0891b2",
        customClass: {
          popup: "rounded-2xl shadow-2xl",
          confirmButton: "px-6 py-3 rounded-lg font-semibold",
          cancelButton: "px-6 py-3 rounded-lg font-semibold",
        },
      }).then((result) => {
        if (
          result.isDismissed &&
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // Navigate to contact page
          window.location.href = "/contact";
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-vlsi-500 to-vlsi-600 p-6 rounded-t-2xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Download Brochure</h2>
              <p className="text-vlsi-100 mt-1">Get complete course details</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-vlsi-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-vlsi-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-vlsi-800 mb-2">
              📋 What's Included:
            </h3>
            <ul className="text-sm text-vlsi-700 space-y-1">
              <li>• Complete course curriculum & module breakdown</li>
              <li>• Detailed placement statistics & industry partnerships</li>
              <li>• Faculty profiles & student testimonials</li>
              <li>• Tools, technologies & lab facilities overview</li>
              <li>• Career guidance & certification details</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="background">Educational Background</Label>
              <Textarea
                id="background"
                value={formData.background}
                onChange={(e) =>
                  handleInputChange("background", e.target.value)
                }
                placeholder="Tell us about your educational background (optional)"
                className="mt-1"
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white font-semibold py-3 text-lg"
            >
              {isLoading ? "Preparing Download..." : "Download Brochure"}
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            By downloading, you agree to receive course information via email
            and SMS.
          </p>
        </div>
      </div>
    </div>
  );
}
