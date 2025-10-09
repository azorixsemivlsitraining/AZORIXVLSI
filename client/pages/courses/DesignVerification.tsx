import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  Users,
  Award,
  BookOpen,
  Code,
  Zap,
} from "lucide-react";

export default function DesignVerification() {
  const courseFeatures = [
    "Comprehensive SystemVerilog verification",
    "UVM methodology and testbench architecture",
    "Functional coverage and assertion-based verification",
    "Industry-standard verification tools",
    "Real project experience",
    "100% placement assistance",
  ];

  const curriculum = [
    {
      module: "Verification Fundamentals",
      duration: "Week 1-2",
      topics: "Verification flow, testbench architecture, SystemVerilog basics",
    },
    {
      module: "SystemVerilog for Verification",
      duration: "Week 3-4",
      topics: "OOP concepts, interfaces, packages, randomization",
    },
    {
      module: "UVM Methodology",
      duration: "Week 5-8",
      topics: "UVM components, sequences, virtual sequences, scoreboards",
    },
    {
      module: "Coverage & Assertions",
      duration: "Week 9-10",
      topics: "Functional coverage, SVA, formal verification",
    },
    {
      module: "Advanced Topics",
      duration: "Week 11-12",
      topics: "Low-power verification, mixed-signal verification",
    },
    {
      module: "Industry Project",
      duration: "Week 13-16",
      topics: "Complete verification project with real-world scenarios",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEOHead
        title="Design Verification Course - AZORIX TECH VLSI Institute"
        description="Master Design Verification with SystemVerilog and UVM. Comprehensive 16-week course with hands-on projects, industry tools, and 100% placement assistance."
        canonical="https://azorixtech.com/courses/design-verification"
        keywords="Design Verification, SystemVerilog, UVM, verification engineer, VLSI verification, testbench, functional coverage"
      />
      <Header showBackButton={true} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-vlsi-100 text-vlsi-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              Most Popular Course
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Design Verification
              <span className="block text-vlsi-600">Mastery Program</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Become a verification expert with our comprehensive SystemVerilog
              and UVM course. Master industry-standard methodologies and tools
              used by top semiconductor companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white px-8 py-4 text-lg cta-button-enhanced cta-enroll"
              >
                <Link to="/enroll">Enroll Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-vlsi-600 text-vlsi-600 hover:bg-vlsi-600 hover:text-white px-8 py-4 text-lg cta-button-enhanced cta-demo"
              >
                <Link to="/demo">Book Free Demo</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          {/* Stats */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
  <div className="text-center">
    <div className="text-3xl font-bold text-vlsi-600 mb-2">16</div>
    <div className="text-gray-600">Weeks Duration</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-bold text-vlsi-600 mb-2">₹69,999</div>
    <div className="text-gray-600">Course Fee</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-bold text-vlsi-600 mb-2">500+</div>
    <div className="text-gray-600">Students Trained</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-bold text-vlsi-600 mb-2">100%</div>
    <div className="text-gray-600">Placement Rate</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-bold text-vlsi-600 mb-2">4.9/5</div>
    <div className="text-gray-600">Student Rating</div>
  </div>
</div>

        </div>
      </section>

      {/* Course Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Design Verification Course?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-aligned curriculum designed by verification experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-6 bg-slate-50 rounded-xl"
              >
                <CheckCircle className="w-6 h-6 text-vlsi-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Curriculum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              16-week structured program covering all aspects of design
              verification
            </p>
          </div>

          <div className="space-y-6">
            {curriculum.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-vlsi-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.module}
                      </h3>
                      <div className="flex items-center gap-2 text-vlsi-600 text-sm">
                        <Clock className="w-4 h-4" />
                        {item.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600">{item.topics}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-vlsi-600 to-vlsi-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Verification Journey?
          </h2>
          <p className="text-xl mb-8 text-vlsi-100">
            Join hundreds of successful verification engineers who started their
            careers with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-vlsi-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Link to="/enroll">Enroll Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white text-vlsi-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Link to="/contact">Get Course Details</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
