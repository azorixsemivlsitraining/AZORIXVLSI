import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useToast } from "../hooks/use-toast";
import { saveDemoToStorage } from "../lib/excelExporter";
import {
  saveDemoRegistration,
  DemoRegistrationData as SupabaseDemoData,
} from "../lib/supabase";
import { RefreshCw } from "lucide-react";
import Swal from "sweetalert2";

interface DemoRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseCategory: string;
  preferredLocation: string;
  comments: string;
  verificationCode: string;
}

export default function DemoRegistration() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<DemoRegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    courseCategory: "",
    preferredLocation: "",
    comments: "",
    verificationCode: "",
  });

  // Generate random captcha
  const generateCaptcha = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);

  const [displayedCaptcha, setDisplayedCaptcha] = useState(() =>
    generateCaptcha(),
  );

  // Auto-refresh captcha every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedCaptcha(generateCaptcha());
      // Clear verification code when captcha refreshes
      setFormData((prev) => ({ ...prev, verificationCode: "" }));
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [generateCaptcha]);

  // Manual refresh captcha
  const refreshCaptcha = () => {
    setDisplayedCaptcha(generateCaptcha());
    setFormData((prev) => ({ ...prev, verificationCode: "" }));
    toast({
      title: "Captcha Refreshed",
      description: "Please enter the new verification code.",
    });
  };

  const handleInputChange = (
    field: keyof DemoRegistrationData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
        confirmButtonColor: "#0d9488",
      });
      return;
    }

    if (formData.verificationCode !== displayedCaptcha) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: "Please enter the correct verification code.",
        confirmButtonColor: "#0d9488",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for Supabase
      const demoData: SupabaseDemoData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        courseCategory: formData.courseCategory,
        preferredLocation: formData.preferredLocation,
        comments: formData.comments,
        verificationCode: formData.verificationCode,
      };

      // Save to Supabase database
      await saveDemoRegistration(demoData);

      // Also store in localStorage as backup
      saveDemoToStorage(formData);

      // Success message
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Thank you for registering for the demo class. We'll contact you soon with the details.",
        confirmButtonColor: "#0d9488",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        courseCategory: "",
        preferredLocation: "",
        comments: "",
        verificationCode: "",
      });

      // Refresh captcha after successful submission
      setDisplayedCaptcha(generateCaptcha());
    } catch (error: any) {
      // Log error for debugging
      console.error("Demo registration error:", error);

      // Try to save to localStorage as fallback
      try {
        saveDemoToStorage(formData);
        toast({
          title: "Registration Saved Locally",
          description:
            "Your registration has been saved. We'll process it soon.",
        });
      } catch (localError) {
        toast({
          title: "Registration Failed",
          description: error.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Hero Content */}
              <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 rounded-3xl p-12 text-center text-white shadow-2xl">
                <h1 className="text-4xl md:text-5xl font-black mb-6">
                  REGISTER FOR DEMO CLASS
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  FOR FREE
                </h2>
                <div className="w-16 h-1 bg-white mx-auto mb-8"></div>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white border-none px-8 py-3 text-lg font-semibold"
                  onClick={() => {
                    document.documentElement.classList.add("smooth-scroll");
                    document
                      .getElementById("demo-form")
                      ?.scrollIntoView({ behavior: "smooth" });
                    setTimeout(
                      () =>
                        document.documentElement.classList.remove(
                          "smooth-scroll",
                        ),
                      1000,
                    );
                  }}
                >
                  Click Here For Details
                </Button>
              </div>

              {/* Right Side - Registration Form */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Register Now
                  </h3>
                </div>

                <form
                  id="demo-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="bg-white/90 border-none rounded-full px-4 py-3"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="bg-white/90 border-none rounded-full px-4 py-3"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="bg-white/90 border-none rounded-full px-4 py-3"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Input
                      type="tel"
                      placeholder="+91  Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="bg-white/90 border-none rounded-full px-4 py-3"
                      required
                    />
                  </div>

                  {/* Course Category */}
                  <div>
                    <Select
                      value={formData.courseCategory}
                      onValueChange={(value) =>
                        handleInputChange("courseCategory", value)
                      }
                    >
                      <SelectTrigger className="bg-white/90 border-none rounded-full px-4 py-3">
                        <SelectValue placeholder="Select Course Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dv-course">
                          Design Verification (DV)
                        </SelectItem>
                        <SelectItem value="pcie">
                          PCIe Specialization
                        </SelectItem>
                        <SelectItem value="soc">SoC Integration</SelectItem>
                        <SelectItem value="ip">
                          IP Block Verification
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Preferred Location */}
                  <div>
                    <Select
                      value={formData.preferredLocation}
                      onValueChange={(value) =>
                        handleInputChange("preferredLocation", value)
                      }
                    >
                      <SelectTrigger className="bg-white/90 border-none rounded-full px-4 py-3">
                        <SelectValue placeholder="Preferred Training Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">
                          Offline (HITEC City)
                        </SelectItem>
                        <SelectItem value="hybrid">
                          Hybrid (Online + Offline)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Comments */}
                  <div>
                    <Textarea
                      placeholder="Comments / Inquiry"
                      value={formData.comments}
                      onChange={(e) =>
                        handleInputChange("comments", e.target.value)
                      }
                      className="bg-white/90 border-none rounded-lg px-4 py-3 min-h-[80px]"
                    />
                  </div>

                  {/* Verification Code */}
                  <div>
                    <Label className="text-white mb-2 block">
                      Verification Code *
                    </Label>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <div className="bg-white rounded-lg p-4 text-center relative">
                        <span className="text-2xl font-bold text-gray-800 tracking-widest">
                          {displayedCaptcha}
                        </span>
                        <Button
                          type="button"
                          onClick={refreshCaptcha}
                          className="absolute top-2 right-2 p-1 h-6 w-6 bg-gray-200 hover:bg-gray-300 text-gray-600"
                          variant="ghost"
                          size="sm"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Enter the code above"
                        value={formData.verificationCode}
                        onChange={(e) =>
                          handleInputChange("verificationCode", e.target.value)
                        }
                        className="bg-white/90 border-none rounded-full px-4 py-3"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-300 mt-1">
                      Captcha refreshes automatically every 30 seconds
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubmitting
                      ? "Registering..."
                      : "Register for Demo Class"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Class Information */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What to Expect in Your Free Demo Class
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get a taste of our comprehensive VLSI training program and see
                why 500+ students chose us.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-vlsi-50 rounded-lg">
                <div className="w-16 h-16 bg-vlsi-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Curriculum Overview
                </h3>
                <p className="text-gray-600">
                  Complete walkthrough of our Design Verification program
                  structure and modules.
                </p>
              </div>

              <div className="text-center p-6 bg-vlsi-50 rounded-lg">
                <div className="w-16 h-16 bg-vlsi-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🛠️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Hands-on Session
                </h3>
                <p className="text-gray-600">
                  Live demonstration of industry-standard tools and real-world
                  projects.
                </p>
              </div>

              <div className="text-center p-6 bg-vlsi-50 rounded-lg">
                <div className="w-16 h-16 bg-vlsi-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💼</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Career Guidance
                </h3>
                <p className="text-gray-600">
                  Insights into VLSI career paths, job opportunities, and
                  placement support.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
