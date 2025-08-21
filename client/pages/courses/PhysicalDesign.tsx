import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Layers, Target } from "lucide-react";

export default function PhysicalDesign() {
  const courseFeatures = [
    "Complete physical design flow",
    "Floorplanning and placement optimization",
    "Clock tree synthesis and routing",
    "DRC, LVS, and timing closure",
    "Advanced node technology challenges",
    "Industry-standard EDA tools training",
  ];

  const curriculum = [
    {
      module: "PD Fundamentals",
      duration: "Week 1-2",
      topics: "Physical design flow, technology files, design constraints",
    },
    {
      module: "Floorplanning",
      duration: "Week 3-4",
      topics: "Die size estimation, macro placement, power planning",
    },
    {
      module: "Placement",
      duration: "Week 5-6",
      topics: "Global and detailed placement, optimization techniques",
    },
    {
      module: "Clock Tree Synthesis",
      duration: "Week 7-8",
      topics: "CTS algorithms, skew minimization, useful skew",
    },
    {
      module: "Routing",
      duration: "Week 9-10",
      topics: "Global and detailed routing, via optimization",
    },
    {
      module: "Timing & Signoff",
      duration: "Week 11-14",
      topics: "STA, timing closure, DRC/LVS verification",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <SEOHead
        title="Physical Design Course - AZORIX TECH VLSI Institute"
        description="Master Physical Design from floorplanning to signoff. Learn placement, routing, CTS, timing closure with industry-standard EDA tools."
        canonical="https://azorixtech.com/courses/physical-design"
        keywords="Physical Design, floorplanning, placement, routing, CTS, timing closure, DRC, LVS, PD flow"
      />
      <Header showBackButton={true} />

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 px-4 text-center fixed top-16 left-0 right-0 z-40">
        <p className="font-semibold text-lg">
          🚀 Coming Soon - Course launching soon
        </p>
      </div>

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Layers className="w-4 h-4" />
              Backend Track
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Physical Design
              <span className="block text-indigo-600">Expert Program</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Master the complete physical design flow from floorplanning to
              signoff. Learn to transform RTL designs into manufacturable
              silicon layouts using cutting-edge EDA tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-4 text-lg cta-button-enhanced cta-enroll"
              >
                <Link to="/enroll">Enroll Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-4 text-lg cta-button-enhanced cta-demo"
              >
                <Link to="/demo">Book Free Demo</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">14</div>
              <div className="text-gray-600">Weeks Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                200+
              </div>
              <div className="text-gray-600">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                100%
              </div>
              <div className="text-gray-600">Industry Relevance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
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
              Complete Physical Design Mastery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From design to silicon - master every step of the PD flow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-6 bg-indigo-50 rounded-xl"
              >
                <CheckCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry-Standard Curriculum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              14-week comprehensive program covering the complete PD flow
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
                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.module}
                      </h3>
                      <div className="flex items-center gap-2 text-indigo-600 text-sm">
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
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Shape Silicon Innovation
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Master the art and science of transforming designs into silicon
            reality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Link to="/enroll">Enroll Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
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
