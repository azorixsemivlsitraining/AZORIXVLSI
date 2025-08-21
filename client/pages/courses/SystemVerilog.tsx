import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Zap, Target } from "lucide-react";

export default function SystemVerilog() {
  const courseFeatures = [
    "Advanced SystemVerilog features and constructs",
    "Object-Oriented Programming in SystemVerilog",
    "Interfaces and modports",
    "Randomization and constraints",
    "Assertions and functional coverage",
    "Advanced verification constructs",
  ];

  const curriculum = [
    {
      module: "SystemVerilog Basics",
      duration: "Week 1-2",
      topics: "Data types, arrays, structures, unions",
    },
    {
      module: "OOP Concepts",
      duration: "Week 3-4",
      topics: "Classes, inheritance, polymorphism, encapsulation",
    },
    {
      module: "Interfaces & Modports",
      duration: "Week 5-6",
      topics: "Interface design, modport usage, virtual interfaces",
    },
    {
      module: "Randomization",
      duration: "Week 7-8",
      topics: "Random variables, constraints, randomize() function",
    },
    {
      module: "Assertions",
      duration: "Week 9-10",
      topics: "Immediate assertions, concurrent assertions, properties",
    },
    {
      module: "Advanced Features",
      duration: "Week 11-12",
      topics: "Functional coverage, DPI, cross-module references",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <SEOHead
        title="SystemVerilog Course | RTL Design, Assertions & Testbenches"
        description="Learn SystemVerilog fundamentals including design constructs, OOP, and assertions. Perfect for students and professionals in VLSI design."
        canonical="https://azorixtech.com/courses/systemverilog"
        keywords="SystemVerilog course, RTL design, assertions, testbenches, OOP, VLSI design, SystemVerilog fundamentals"
      />
      <Header showBackButton={true} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Advanced Course
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              SystemVerilog
              <span className="block text-purple-600">
                Advanced Programming
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Take your verification skills to the next level with
              SystemVerilog's advanced features. Master OOP, randomization, and
              assertion-based verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 text-lg cta-button-enhanced cta-enroll"
              >
                <Link to="/enroll">Enroll Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg cta-button-enhanced cta-demo"
              >
                <Link to="/demo">Book Free Demo</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
              <div className="text-gray-600">Weeks Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                250+
              </div>
              <div className="text-gray-600">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                4.9/5
              </div>
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
              Advanced SystemVerilog Mastery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Go beyond basic HDL to master advanced verification concepts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-6 bg-purple-50 rounded-xl"
              >
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Curriculum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              12-week intensive program covering SystemVerilog's advanced
              features
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
                    <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.module}
                      </h3>
                      <div className="flex items-center gap-2 text-purple-600 text-sm">
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
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Advance Your Verification Skills
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Master the language that powers modern verification environments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Link to="/enroll">Enroll Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
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
