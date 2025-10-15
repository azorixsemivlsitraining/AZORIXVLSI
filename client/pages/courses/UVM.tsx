import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Trophy, Target } from "lucide-react";

export default function UVM() {
  const courseFeatures = [
    "Complete UVM methodology training",
    "Testbench architecture and components",
    "Sequence and virtual sequence concepts",
    "TLM and factory pattern implementation",
    "Real-world verification projects",
    "Industry best practices and guidelines",
  ];

  const curriculum = [
    {
      module: "UVM Introduction",
      duration: "Week 1-2",
      topics: "UVM basics, testbench architecture, component hierarchy",
    },
    {
      module: "UVM Components",
      duration: "Week 3-4",
      topics: "Driver, monitor, agent, sequencer, scoreboard",
    },
    {
      module: "Sequences",
      duration: "Week 5-6",
      topics: "Sequence items, sequences, virtual sequences",
    },
    {
      module: "TLM & Factory",
      duration: "Week 7-8",
      topics: "Transaction level modeling, factory pattern, configuration",
    },
    {
      module: "Advanced UVM",
      duration: "Week 9-10",
      topics: "Callbacks, register model, reporting, phasing",
    },
    {
      module: "UVM Projects",
      duration: "Week 11-14",
      topics: "Complete verification environment development",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <SEOHead
        title="UVM Training | Universal Verification Methodology for VLSI"
        description="Become an expert in UVM training. Learn methodology-driven verification, coverage models, and reusable testbench design."
        canonical="https://www.azorixvlsi.com/courses/uvm"
        keywords="UVM training, Universal Verification Methodology, methodology-driven verification, coverage models, testbench design, VLSI verification"
      />
      <Header showBackButton={true} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-4 h-4" />
              Industry Standard
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              UVM Methodology
              <span className="block text-emerald-600">Expert Training</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Master the Universal Verification Methodology (UVM) - the industry
              standard for scalable and reusable verification environments used
              by leading semiconductor companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 text-lg cta-button-enhanced cta-enroll"
              >
                <Link to="/enroll">Enroll Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg cta-button-enhanced cta-demo"
              >
                <Link to="/demo">Book Free Demo</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">14</div>
              <div className="text-gray-600">Weeks Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                400+
              </div>
              <div className="text-gray-600">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                100%
              </div>
              <div className="text-gray-600">Industry Adoption</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
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
              Master Industry Standard UVM
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn the methodology used by top semiconductor companies
              worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-6 bg-emerald-50 rounded-xl"
              >
                <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete UVM Training
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              14-week comprehensive program covering all UVM concepts and
              applications
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
                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.module}
                      </h3>
                      <div className="flex items-center gap-2 text-emerald-600 text-sm">
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
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Become a UVM Expert
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join the ranks of verification engineers using industry-standard
            methodology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Link to="/enroll">Enroll Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
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
