import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { saveBrochureDownload } from "../lib/supabase";
import { downloadBrochurePDF } from "../lib/pdfGenerator";
import { saveBrochureToStorage } from "../lib/excelExporter";
import { sendBrochureFormToSheets } from "../lib/googleSheetsService";
import Swal from "sweetalert2";

export default function Brochure() {
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

  const generateBrochureContent = () => {
    return `
# AZORIX VLSI TECHNOLOGIES
## INDUSTRY READY DIPLOMA PROGRAMMES IN VLSI ENGINEERING AND VERIFICATION SYSTEM DESIGN

### COMPREHENSIVE CERTIFICATION COURSE

**Duration:** 8 Months Intensive Program
**Investment:** ₹1,20,000 (Base Course)
**Level:** Beginner to Industry Professional
**Mode:** Online | Offline | Hybrid

Transform your engineering career with our industry-aligned VLSI Design Verification program. Master the complete digital verification ecosystem with hands-on experience on industry-standard tools and real-world projects.

## CORE CURRICULUM (Included in Base Investment)

### MODULE 1: DIGITAL DESIGN FUNDAMENTALS (6 weeks)
**RTL Design & Verification Essentials**
✓ Hardware Description Languages (HDL) & Design Flow
✓ Verilog Modeling Techniques & Synthesis
✓ Combinational & Sequential Logic Implementation
✓ Finite State Machine Design (Moore/Mealy)
✓ Testbench Development & Simulation
✓ Timing Analysis & Design Optimization
✓ Industry-Standard Design Practices

### MODULE 2: ADVANCED SYSTEMVERILOG (8 weeks)
**Object-Oriented Verification Methodology**
✓ SystemVerilog for Design vs Verification
✓ Advanced Data Types & Interface Design
✓ Object-Oriented Programming (Classes/Inheritance)
✓ Constrained Random Verification
✓ Functional Coverage & Assertions
✓ Property Specification Language (PSL)
✓ Modular Testbench Architecture

### MODULE 3: UVM VERIFICATION METHODOLOGY (10 weeks)
**Industry-Standard Verification Framework**
✓ Universal Verification Methodology (UVM) Framework
✓ UVM Component Architecture (Agents/Drivers/Monitors)
✓ Transaction-Level Modeling (TLM) Implementation
✓ Sequence Generation & Scoreboards
✓ Factory Pattern & Configuration Database
✓ Phase Management & Objection Handling
✓ Advanced UVM Reporting & Debug Techniques
✓ Complete IP/Sub-system Verification Project

## Add-on Specialization Modules (Optional)

### PCIe Verification Specialization
**Duration:** 4 weeks | **Fee:** +₹25,000
- PCIe Protocol Architecture & Layers
- Transaction Layer Packet (TLP) Verification
- Data Link Layer Protocol Verification
- Physical Layer Link Training & Status
- PCIe Configuration Space Testing
- Error Handling & Recovery Mechanisms
- PCIe Compliance & Interoperability Testing
- Advanced PCIe Features (SR-IOV, ATS, etc.)

### SoC Integration & Verification
**Duration:** 6 weeks | **Fee:** +₹30,000
- SoC Architecture & Design Methodologies
- ARM AMBA Protocol Verification (AHB, APB, AXI)
- Interconnect Fabric Verification
- Memory Subsystem & Controller Verification
- Clock & Reset Domain Crossing
- Power Management Unit (PMU) Verification
- Interrupt Controller Verification
- DMA Controller Verification

### IP Block Verification & VIP Development
**Duration:** 3 weeks | **Fee:** +₹20,000
- IP Block Verification Strategy & Planning
- Standard Interface Protocol Verification
- USB Protocol Verification
- Ethernet MAC Verification
- Memory Interface Verification (DDR, LPDDR)
- Verification IP (VIP) Development
- Reusable Testbench Architecture
- IP Compliance & Certification

## Pricing Options

1. **Core DV Program**
   - Price: ₹1,20,000
   - Duration: 6 months
   - Includes: Verilog, SystemVerilog, UVM

2. **DV + One Specialization** (Most Popular)
   - Price: ₹1,40,000 - ₹1,50,000
   - Duration: 7-8 months
   - Includes: Core DV + Choice of PCIe/SoC/IP

3. **Complete DV Master Program**
   - Price: ₹1,95,000 (Save ₹25,000!)
   - Duration: 11 months
   - Includes: Core DV + All three specializations

## 🏆 WHY AZORIX VLSI STANDS OUT

### PROVEN TRACK RECORD
✓ 95% Placement Success Rate in Top-Tier Companies
✓ 500+ Alumni Working in Global Semiconductor Giants
✓ Average Package: 6-12 LPA for Freshers, 15-25 LPA for Experienced

### COMPREHENSIVE CAREER SUPPORT
✓ 2 Years Extended Placement Assistance
✓ Resume Building & Interview Preparation
✓ Mock Technical Interviews with Industry Experts
✓ Direct Company Connects & Referral Programs

### INDUSTRY-ALIGNED TRAINING
✓ Curriculum Designed by Ex-Intel, Qualcomm, NVIDIA Engineers
✓ Hands-on Experience with EDA Tools (ModelSim, VCS, Synopsys)
✓ Real Semiconductor Projects & Case Studies
✓ Live Industry Guest Sessions & Workshops

## Industry Partners
Intel, Qualcomm, NVIDIA, Broadcom, AMD, MediaTek, Marvell, Synopsys, Cadence, Mentor Graphics, Wipro, TCS

## Contact Information
**Address:** 3rd Floor, Tech Park Building, HITEC City, Hyderabad, Telangana 500081

**Phone:** +91 9876543210, +91 9876543211
**Email:** info@azorix.com, admissions@azorix.com
**Website:** www.azorix.com

## Eligibility
- B.E/B.Tech or M.E/M.Tech in ECE, EEE, or related branches
- Basic understanding of digital electronics and logic design
- No prior coding experience required - we teach from basics
- Passion for learning semiconductor design and verification

## Tools & Technologies You'll Master
- ModelSim, QuestaSim, VCS
- Synopsys Design Tools
- Cadence Verification Tools
- SystemVerilog & UVM
- Industry-Standard EDA Tools

Ready to transform your career? Enroll now!
Contact us at +91 9876543210 or visit www.azorix.com
    `;
  };

  const handleDownload = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields (Name, Email, Phone)",
        confirmButtonColor: "#0d9488",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Always generate and download PDF first
      downloadBrochurePDF({
        name: formData.name,
        email: formData.email,
      });

      // Save to localStorage for Excel export
      const brochureData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        background: formData.background,
      };

      saveBrochureToStorage(brochureData);

      // Send to Google Sheets automatically
      try {
        await sendBrochureFormToSheets(brochureData);
        console.log("Brochure form data sent to Google Sheets successfully");
      } catch (sheetsError) {
        console.warn(
          "Failed to sync with Google Sheets (data still saved locally):",
          sheetsError,
        );
      }

      // Try to save to Supabase (optional - don't fail if this doesn't work)
      try {
        await saveBrochureDownload({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          background: formData.background,
        });
        console.log("Successfully saved brochure download data");
      } catch (dbError: any) {
        console.warn(
          "Failed to save to database (continuing anyway):",
          dbError.message,
        );
        // Continue with success - database save is not critical for user experience
      }

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Download Successful!",
        text: "Brochure downloaded successfully! Thank you for your interest in Azorix VLSI. Our team will contact you soon.",
        confirmButtonColor: "#0d9488",
        timer: 5000,
        showConfirmButton: true,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        background: "",
      });
    } catch (error: any) {
      console.error("Error downloading brochure:", error);
      Swal.fire({
        icon: "error",
        title: "Download Error",
        text: `There was an error processing your request: ${error.message || "Unknown error"}. Please try again or contact us directly.`,
        confirmButtonColor: "#0d9488",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-vlsi-700 to-vlsi-800 text-white py-24">
          <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Download Our Course Brochure
            </h1>
            <p className="text-xl text-vlsi-100 leading-relaxed max-w-3xl mx-auto">
              Get detailed information about our comprehensive VLSI Design
              Verification course, curriculum, placement statistics, and success
              stories.
            </p>
          </div>
        </section>

        {/* Enhanced Brochure Preview */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Professional Course Brochure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get comprehensive details about our industry-leading VLSI
                training program
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Enhanced Professional Brochure Preview */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-vlsi-500 to-vlsi-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                  {/* Professional Header */}
                  <div className="bg-gradient-to-br from-navy-900 via-vlsi-900 to-navy-800 text-white p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-3xl font-black text-white mb-2 tracking-wide">
                          AZORIX VLSI
                        </h2>
                        <p className="text-vlsi-300 font-medium tracking-wider">
                          TECHNOLOGIES
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="bg-vlsi-500/20 backdrop-blur-sm border border-vlsi-400/30 rounded-full px-3 py-1 mb-2">
                          <p className="text-xs text-vlsi-200 font-medium">
                            Industry Ready
                          </p>
                        </div>
                        <p className="text-xs text-vlsi-300">
                          Diploma Programs
                        </p>
                      </div>
                    </div>
                    <div className="border-l-4 border-vlsi-400 pl-4">
                      <h3 className="text-xl font-bold mb-2 text-vlsi-100">
                        VLSI ENGINEERING & VERIFICATION
                      </h3>
                      <p className="text-vlsi-200 font-medium">
                        SYSTEM DESIGN CERTIFICATION COURSE
                      </p>
                    </div>
                  </div>

                  {/* Course Overview Section */}
                  <div className="p-8 bg-gradient-to-b from-white to-gray-50">
                    <div className="text-center mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        COURSE OVERVIEW
                      </h4>
                      <div className="w-16 h-1 bg-vlsi-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-vlsi-600">
                          8 Months
                        </div>
                        <div className="text-sm text-gray-600">Duration</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-vlsi-600">
                          ₹1,20,000
                        </div>
                        <div className="text-sm text-gray-600">Base Fee</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-lg font-bold text-vlsi-600">
                          Beginner to Advanced
                        </div>
                        <div className="text-sm text-gray-600">Level</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-lg font-bold text-vlsi-600">
                          95%
                        </div>
                        <div className="text-sm text-gray-600">
                          Placement Rate
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core Modules Section */}
                  <div className="px-8 py-6 bg-teal-50">
                    <h4 className="font-bold text-teal-800 mb-4 text-center text-lg border-b border-teal-200 pb-2">
                      CORE MODULES (INCLUDED)
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          1
                        </div>
                        <div>
                          <h5 className="font-semibold text-teal-900 text-sm">
                            Verilog Module (6 weeks)
                          </h5>
                          <p className="text-xs text-teal-700">
                            RTL design fundamentals and digital circuit
                            implementation
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          2
                        </div>
                        <div>
                          <h5 className="font-semibold text-teal-900 text-sm">
                            SystemVerilog Module (8 weeks)
                          </h5>
                          <p className="text-xs text-teal-700">
                            Advanced verification techniques and OOP concepts
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          3
                        </div>
                        <div>
                          <h5 className="font-semibold text-teal-900 text-sm">
                            UVM Module (10 weeks)
                          </h5>
                          <p className="text-xs text-teal-700">
                            Industry-standard verification methodology
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add-on Specializations */}
                  <div className="px-8 py-6 bg-orange-50">
                    <h4 className="font-bold text-orange-800 mb-4 text-center text-lg border-b border-orange-200 pb-2">
                      ADD-ON SPECIALIZATIONS (OPTIONAL)
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center p-2 bg-white rounded border border-orange-100">
                        <span className="font-medium text-orange-900">
                          PCIe Verification (4 weeks)
                        </span>
                        <span className="text-orange-700 font-semibold">
                          +₹25,000
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded border border-orange-100">
                        <span className="font-medium text-orange-900">
                          SoC Integration & Verification (6 weeks)
                        </span>
                        <span className="text-orange-700 font-semibold">
                          +₹30,000
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded border border-orange-100">
                        <span className="font-medium text-orange-900">
                          IP Block Verification & VIP Development (3 weeks)
                        </span>
                        <span className="text-orange-700 font-semibold">
                          +₹20,000
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Options */}
                  <div className="px-8 py-6 bg-blue-50">
                    <h4 className="font-bold text-blue-800 mb-4 text-center text-lg border-b border-blue-200 pb-2">
                      PRICING OPTIONS
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border border-blue-100">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-blue-900 text-sm">
                            Core DV Program
                          </span>
                          <span className="text-blue-700 font-bold">
                            ₹1,20,000
                          </span>
                        </div>
                        <p className="text-xs text-blue-600">(6 months)</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg border-2 border-blue-300 relative">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                            Most Popular
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-blue-900 text-sm">
                            DV + One Specialization
                          </span>
                          <span className="text-blue-700 font-bold">
                            ₹1,40,000-₹1,50,000
                          </span>
                        </div>
                        <p className="text-xs text-blue-600">(7-8 months)</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-blue-100">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-blue-900 text-sm">
                            Complete DV Master Program
                          </span>
                          <span className="text-blue-700 font-bold">
                            ₹1,95,000
                          </span>
                        </div>
                        <p className="text-xs text-blue-600">
                          (11 months) - Save ₹25,000!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Why Choose Section */}
                  <div className="px-8 py-6 bg-green-50">
                    <h4 className="font-bold text-green-800 mb-4 text-center text-lg border-b border-green-200 pb-2">
                      WHY CHOOSE AZORIX VLSI?
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-green-800 font-medium">
                          95% Placement Success Rate
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-green-800 font-medium">
                          2 Years Comprehensive Placement Support
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Footer */}
                  <div className="bg-gray-900 text-white p-6 text-center">
                    <p className="text-sm font-bold mb-2">
                      © 2024 Azorix Technologies Pvt Ltd. All rights reserved.
                    </p>
                    <div className="flex justify-center space-x-4 text-xs text-gray-300">
                      <span>📞 +91 9876543210</span>
                      <span>📧 info@azorix.com</span>
                      <span>🌐 www.azorix.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Form */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Download Comprehensive Brochure
                </h2>
                <div className="bg-vlsi-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-vlsi-800 mb-2">
                    📋 What's Included:
                  </h3>
                  <ul className="text-sm text-vlsi-700 space-y-1">
                    <li>• Complete course curriculum & module breakdown</li>
                    <li>• Detailed pricing & payment options</li>
                    <li>• Industry partnerships & placement statistics</li>
                    <li>• Faculty profiles & student testimonials</li>
                    <li>• Tools, technologies & lab facilities</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Background
                      </label>
                      <select
                        value={formData.background}
                        onChange={(e) =>
                          handleInputChange("background", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Select your background</option>
                        <option value="student">Engineering Student</option>
                        <option value="fresher">
                          Recent Graduate (0-1 years)
                        </option>
                        <option value="experienced">
                          Working Professional (1+ years)
                        </option>
                        <option value="career-change">
                          Career Change Professional
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    onClick={handleDownload}
                    disabled={isLoading}
                    size="lg"
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                        Generating PDF...
                      </>
                    ) : (
                      "📥 Download Professional Brochure (PDF)"
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-3">
                      By downloading, you agree to receive updates about our
                      programs. We respect your privacy and won't spam you.
                    </p>
                    <div className="flex justify-center space-x-4 text-sm text-vlsi-600">
                      <span>📞 +91 9876543210</span>
                      <span>✉️ admissions@azorix.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Inside */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What's Inside the Brochure?
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive information to help you make an informed decision
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-vlsi-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    📚
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Detailed Curriculum
                    </h3>
                    <p className="text-gray-600">
                      Complete breakdown of all 6 modules with learning
                      objectives and project details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-vlsi-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    👨‍🏫
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Faculty Profiles
                    </h3>
                    <p className="text-gray-600">
                      Meet our industry expert instructors and their
                      professional backgrounds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-vlsi-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Placement Statistics
                    </h3>
                    <p className="text-gray-600">
                      Real placement data, salary ranges, and success stories
                      from our alumni.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-vlsi-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    🏢
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Industry Partners
                    </h3>
                    <p className="text-gray-600">
                      Complete list of companies that hire our graduates and
                      partnership details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-vlsi-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    💰
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Fee Structure
                    </h3>
                    <p className="text-gray-600">
                      Transparent pricing, payment options, and available
                      scholarships.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-vlsi-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    🎓
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Student Testimonials
                    </h3>
                    <p className="text-gray-600">
                      Real feedback from students who transformed their careers
                      with us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-vlsi-700 to-vlsi-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your VLSI Journey?
            </h2>
            <p className="text-xl text-vlsi-100 mb-8 max-w-2xl mx-auto">
              After reviewing our brochure, take the next step and enroll in our
              comprehensive program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-vlsi-700 hover:bg-vlsi-50"
              >
                <Link to="/enroll">Enroll Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white bg-white/10 hover:bg-white hover:text-vlsi-700 font-semibold"
              >
                <Link to="/contact">Contact for Counseling</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
