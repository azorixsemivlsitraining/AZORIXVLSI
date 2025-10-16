import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { saveEnrollmentData } from "../lib/supabase";
import { saveEnrollToStorage } from "../lib/excelExporter";
import { sendEnrollFormToSheets } from "../lib/googleSheetsService";
import Swal from "sweetalert2";
import SEOHead from "../components/SEOHead";

export default function Enroll() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    education: "",
    branch: "",
    graduationYear: "",
    experience: "",
    currentRole: "",
    company: "",
    course: "dv-course",
    preferredMode: "",
    previousExperience: "",
    motivation: "",
    hearAboutUs: "",
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.education ||
      !formData.branch ||
      !formData.graduationYear ||
      !formData.experience ||
      !formData.motivation ||
      !formData.hearAboutUs ||
      !formData.agreeTerms
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields and agree to terms and conditions.",
        confirmButtonColor: "#0d9488",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Save to localStorage for Excel export
      saveEnrollToStorage(formData);

      // Send to Google Sheets automatically
      try {
        await sendEnrollFormToSheets(formData);
        console.log("Enrollment form data sent to Google Sheets successfully");
      } catch (sheetsError) {
        console.warn(
          "Failed to sync with Google Sheets (data still saved locally):",
          sheetsError,
        );
      }

      // Try to save to Supabase (optional)
      try {
        await saveEnrollmentData(formData);
      } catch (dbError) {
        console.warn(
          "Failed to save to database (data still saved locally):",
          dbError,
        );
      }

      Swal.fire({
        icon: "success",
        title: "Enrollment Submitted!",
        text: "Thank you for your enrollment! Our admissions team will contact you within 24-48 hours.",
        confirmButtonColor: "#0d9488",
        timer: 5000,
        showConfirmButton: true,
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        education: "",
        branch: "",
        graduationYear: "",
        experience: "",
        currentRole: "",
        company: "",
        course: "dv-course",
        preferredMode: "",
        previousExperience: "",
        motivation: "",
        hearAboutUs: "",
        agreeTerms: false,
        agreeMarketing: false,
      });
    } catch (error: any) {
      console.error("Error submitting enrollment:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: `There was an error processing your enrollment: ${error.message || "Unknown error"}. Please try again or contact us directly at admissions@azorix.com or +91 9052653636.`,
        confirmButtonColor: "#0d9488",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Enroll in Our VLSI Program | Azorix VLSI"
        description="Our admissions team is here to help. Call: +91 9052653636. Enroll now in our comprehensive VLSI Design Verification program."
        canonical="https://www.azorixvlsi.com/enroll"
        keywords="Enroll VLSI, VLSI course enrollment, Design Verification admission, Azorix VLSI Hyderabad"
      />
      <Header />
      <main className="flex-1 bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Enroll in Our VLSI Program
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take the first step towards your VLSI verification career. Fill
              out the form below to secure your spot in our comprehensive
              8-month program.
            </p>
          </div>

          {/* Course Overview Card */}
          <div className="bg-gradient-to-r from-vlsi-700 to-vlsi-800 text-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Design Verification (DV) Course
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">8</div>
                <div className="text-vlsi-100">Months Duration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">6</div>
                <div className="text-vlsi-100">Core Modules</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">2</div>
                <div className="text-vlsi-100">Years Support</div>
              </div>
            </div>
          </div>

          {/* Enrollment Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Educational Background */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Educational Background
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="education">Highest Education *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("education", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btech">B.Tech</SelectItem>
                        <SelectItem value="be">B.E</SelectItem>
                        <SelectItem value="mtech">M.Tech</SelectItem>
                        <SelectItem value="me">M.E</SelectItem>
                        <SelectItem value="bsc">B.Sc</SelectItem>
                        <SelectItem value="msc">M.Sc</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="branch">Branch/Specialization *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("branch", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ece">
                          Electronics & Communication Engineering
                        </SelectItem>
                        <SelectItem value="eee">
                          Electrical & Electronics Engineering
                        </SelectItem>
                        <SelectItem value="cse">
                          Computer Science Engineering
                        </SelectItem>
                        <SelectItem value="it">
                          Information Technology
                        </SelectItem>
                        <SelectItem value="mechanical">
                          Mechanical Engineering
                        </SelectItem>
                        <SelectItem value="civil">Civil Engineering</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="graduationYear">Graduation Year *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("graduationYear", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() - i;
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Professional Experience
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>Work Experience *</Label>
                    <RadioGroup
                      className="mt-2"
                      onValueChange={(value) =>
                        handleInputChange("experience", value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fresher" id="fresher" />
                        <Label htmlFor="fresher">Fresher (0-1 years)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="junior" id="junior" />
                        <Label htmlFor="junior">Junior (1-3 years)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="experienced" id="experienced" />
                        <Label htmlFor="experienced">
                          Experienced (3+ years)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="currentRole">Current Role/Position</Label>
                      <Input
                        id="currentRole"
                        value={formData.currentRole}
                        onChange={(e) =>
                          handleInputChange("currentRole", e.target.value)
                        }
                        placeholder="e.g., Software Engineer, Student"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">
                        Current Company/Institution
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        placeholder="e.g., TCS, Infosys, College Name"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Preferences */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Course Preferences
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>Preferred Learning Mode *</Label>
                    <RadioGroup
                      className="mt-2"
                      onValueChange={(value) =>
                        handleInputChange("preferredMode", value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="offline" id="offline" />
                        <Label htmlFor="offline">
                          Offline Classes (In-person)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="online" id="online" />
                        <Label htmlFor="online">Online Classes (Live)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hybrid" id="hybrid" />
                        <Label htmlFor="hybrid">Hybrid (Mix of both)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label htmlFor="previousExperience">
                      Previous VLSI/Hardware Experience
                    </Label>
                    <Textarea
                      id="previousExperience"
                      value={formData.previousExperience}
                      onChange={(e) =>
                        handleInputChange("previousExperience", e.target.value)
                      }
                      placeholder="Describe any previous experience with VLSI, hardware design, or verification..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="motivation">
                      Why do you want to join this program? *
                    </Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) =>
                        handleInputChange("motivation", e.target.value)
                      }
                      placeholder="Tell us about your career goals and motivation..."
                      className="mt-1"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="hearAboutUs">
                      How did you hear about us? *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("hearAboutUs", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google Search</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="friend">
                          Friend/Colleague Reference
                        </SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="college">
                          College/University
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) =>
                      handleInputChange("agreeTerms", checked as boolean)
                    }
                    required
                  />
                  <Label htmlFor="agreeTerms" className="text-sm leading-5">
                    I agree to the{" "}
                    <a href="#" className="text-vlsi-600 hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-vlsi-600 hover:underline">
                      Privacy Policy
                    </a>{" "}
                    *
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onCheckedChange={(checked) =>
                      handleInputChange("agreeMarketing", checked as boolean)
                    }
                  />
                  <Label htmlFor="agreeMarketing" className="text-sm leading-5">
                    I agree to receive marketing communications and updates
                    about the program
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Submitting Application...
                    </>
                  ) : (
                    "Submit and Pay now "
                  )}
                </Button>
                <p className="text-sm text-gray-500 text-center mt-3">
                  Our admissions team will review your application and contact
                  you within 24-48 hours.
                </p>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-8 bg-vlsi-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              Have questions about the enrollment process? Our admissions team
              is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919052653636"
                className="text-vlsi-600 font-medium hover:underline"
              >
                📞 Call: +91 9052653636
              </a>
              <a
                href="mailto:admissions@azorix.com"
                className="text-vlsi-600 font-medium hover:underline"
              >
                ✉️ Email:info@azorix.com
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
