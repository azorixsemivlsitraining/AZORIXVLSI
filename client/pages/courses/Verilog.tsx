import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Code2, Cpu, Zap } from "lucide-react";

export default function Verilog() {
  const courseFeatures = [
    "Complete Verilog HDL fundamentals",
    "Digital design concepts and methodology",
    "Synthesis and simulation techniques",
    "Industry-standard EDA tools",
    "Hands-on FPGA implementation",
    "Project-based learning approach",
  ];

  const curriculum = [
    {
      module: "Digital Design Basics",
      duration: "Week 1-2",
      topics: "Number systems, Boolean algebra, combinational circuits",
    },
    {
      module: "Verilog Fundamentals",
      duration: "Week 3-4",
      topics: "Modules, ports, data types, operators",
    },
    {
      module: "Behavioral Modeling",
      duration: "Week 5-6",
      topics: "Always blocks, if-else, case statements, loops",
    },
    {
      module: "Structural Modeling",
      duration: "Week 7-8",
      topics: "Gate-level modeling, module instantiation, hierarchical design",
    },
    {
      module: "Sequential Circuits",
      duration: "Week 9-10",
      topics: "Flip-flops, latches, counters, state machines",
    },
    {
      module: "Advanced Topics",
      duration: "Week 11-12",
      topics: "Timing, synthesis, FPGA implementation, real projects",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEOHead
        title="Verilog Module in VLSI | Learn Ports, Syntax & Examples | Azorix VLSI Hyderabad"
        description="Enroll in Verilog Module training at Azorix VLSI. Learn module syntax, coding, ports, and applications with placement-focused mentoring."
        canonical="https://azorixtech.com/courses/verilog"
        keywords="Verilog module, Verilog syntax, Verilog ports, Verilog examples, Azorix VLSI Hyderabad, VLSI training, hardware description language"
      />
      <Header showBackButton={true} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Code2 className="w-4 h-4" />
              Foundation Course
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Verilog HDL
              <span className="block text-blue-600">Fundamentals</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Master the foundation of digital design with Verilog HDL. Learn to
              design, simulate, and implement digital circuits using
              industry-standard methodologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg cta-button-enhanced cta-enroll"
              >
                <Link to="/enroll">Enroll Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg cta-button-enhanced cta-demo"
              >
                <Link to="/demo">Book Free Demo</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-600">Weeks Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">300+</div>
              <div className="text-gray-600">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.8/5</div>
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
              Why Learn Verilog With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build a strong foundation in digital design and HDL programming
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-6 bg-blue-50 rounded-xl"
              >
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Structured Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              12-week comprehensive program from basics to advanced
              implementation
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
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.module}
                      </h3>
                      <div className="flex items-center gap-2 text-blue-600 text-sm">
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Digital Design Journey
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Master the fundamentals that power today's digital world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Link to="/enroll">Enroll Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
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
