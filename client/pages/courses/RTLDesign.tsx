import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Cpu, Zap } from "lucide-react";

export default function RTLDesign() {
  const courseFeatures = [
    "Complete RTL design methodology",
    "Advanced digital design concepts",
    "Synthesis and timing optimization",
    "Industry-standard design tools",
    "Real-world processor design projects",
    "Performance and power optimization",
  ];

  const curriculum = [
    {
      module: "RTL Design Basics",
      duration: "Week 1-2",
      topics: "RTL coding guidelines, design hierarchy, clock domains",
    },
    {
      module: "Combinational Design",
      duration: "Week 3-4",
      topics: "Adders, multipliers, ALU design, optimization techniques",
    },
    {
      module: "Sequential Design",
      duration: "Week 5-6",
      topics: "State machines, counters, memory elements, pipelining",
    },
    {
      module: "Advanced Architectures",
      duration: "Week 7-8",
      topics: "Processor design, cache controllers, bus interfaces",
    },
    {
      module: "Synthesis & Timing",
      duration: "Week 9-10",
      topics: "Synthesis optimization, timing closure, power analysis",
    },
    {
      module: "Industry Projects",
      duration: "Week 11-14",
      topics: "Complete processor or SoC component design",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <SEOHead
        title="RTL Design Course - AZORIX TECH VLSI Institute"
        description="Master RTL Design with Verilog and SystemVerilog. Learn digital design, synthesis, timing optimization, and real-world processor design."
        canonical="https://azorixtech.com/courses/rtl-design"
        keywords="RTL Design, digital design, synthesis, processor design, Verilog, SystemVerilog, timing optimization"
      />
      <Header showBackButton={true} />

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 text-center fixed top-16 left-0 right-0 z-40">
        <p className="font-semibold text-lg">
          🚀 Coming Soon - Course launching soon
        </p>
      </div>

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Cpu className="w-4 h-4" />
              Design Track
            </div>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4 text-lg cta-button-enhanced cta-demo"
            >
              Coming Soon
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              RTL Design
              <span className="block text-orange-600">Mastery Program</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Master the art of RTL design and become a digital design expert.
              Learn to create efficient, synthesizable digital circuits for
              complex systems and processors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg cta-button-enhanced cta-enroll"
              >
                <Link to="/enroll">Enroll Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4 text-lg cta-button-enhanced cta-demo"
              >
                <Link to="/demo">Book Free Demo</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
  {/* Duration */}
  <div className="text-center">
    <div className="text-3xl font-bold text-orange-600 mb-2">14</div>
    <div className="text-gray-600">Weeks Duration</div>
  </div>

  {/* Course Fee */}
  <div className="text-center">
    <div className="text-3xl font-bold text-vlsi-600 mb-2">₹70,000</div>
    <div className="text-gray-600">Course Fee</div>
  </div>

  {/* Students Trained */}
  <div className="text-center">
    <div className="text-3xl font-bold text-orange-600 mb-2">350+</div>
    <div className="text-gray-600">Students Trained</div>
  </div>

  {/* Placement Rate */}
  <div className="text-center">
    <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
    <div className="text-gray-600">Placement Rate</div>
  </div>

  {/* Rating */}
  <div className="text-center">
    <div className="text-3xl font-bold text-orange-600 mb-2">4.8/5</div>
    <div className="text-gray-600">Student Rating</div>
  </div>
</div>

      </section>

      {/* Course Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive RTL Design Training
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From basic concepts to advanced processor design
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-6 bg-orange-50 rounded-xl"
              >
                <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Design Curriculum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              14-week program covering all aspects of RTL design
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
                    <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.module}
                      </h3>
                      <div className="flex items-center gap-2 text-orange-600 text-sm">
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
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Design the Future of Computing
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Master the skills that power today's processors and digital systems
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Link to="/enroll">Enroll Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
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
