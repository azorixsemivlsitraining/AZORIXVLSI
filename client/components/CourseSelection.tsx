import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Cpu, Layers, Zap, ArrowRight, Shield } from "lucide-react";

const courses = [
  {
    id: "dv",
    title: "Design Verification (DV)",
    description:
      "Master digital verification with SystemVerilog, UVM, and industry-standard methodologies",
    duration: "8 months",
    level: "Beginner to Advanced",
    Fee:"70,000",
    icon: <Shield className="w-8 h-8" />,
    available: true,
    path: "/courses/design-verification",
  },
  {
    id: "rtl",
    title: "RTL Design",
    description:
      "Learn Register Transfer Level design with Verilog/VHDL and synthesis techniques",
    duration: "6 months",
    level: "Beginner to Intermediate",
    Fee:"70,000",
    icon: <Cpu className="w-8 h-8" />,
    available: false,
    path: "/courses/rtl",
  },
  {
    id: "pd",
    title: "Physical Design (PD)",
    description:
      "Complete physical design flow from netlist to GDSII with advanced tools",
    duration: "8 months",
    level: "Intermediate to Advanced",
    Fee:"70,000",
    icon: <Layers className="w-8 h-8" />,
    available: false,
    path: "/courses/pd",
  },
];

export default function CourseSelection() {
  return (
    <section className="pt-24 pb-0 bg-gradient-to-br from-gray-50 to-vlsi-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-vlsi-100 rounded-full text-vlsi-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-vlsi-500 rounded-full mr-2"></span>
            Choose Your Path
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-navy-900 mb-6">
            VLSI Training Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Select from our comprehensive VLSI courses designed to transform
            your career in semiconductor design and verification.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={course.id} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-vlsi-500 to-vlsi-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div
                className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 transform group-hover:-translate-y-2 ${
                  course.available
                    ? "border-vlsi-200 shadow-xl hover:shadow-2xl"
                    : "border-gray-200 shadow-lg"
                }`}
              >
                {/* Coming Soon Badge */}
                {!course.available && (
                  <div className="absolute -top-3 -right-3">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    course.available
                      ? "bg-gradient-to-br from-vlsi-500 to-vlsi-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {course.icon}
                </div>

                {/* Content */}
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    course.available
                      ? "text-navy-900 group-hover:text-vlsi-700 transition-colors"
                      : "text-gray-600"
                  }`}
                >
                  {course.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {course.description}
                </p>

               {/* Course Details */}
<div className="space-y-3 mb-8">
  {/* Duration and Fee */}
  <div className="flex items-center text-sm space-x-6">
    <div className="flex items-center">
      <div
        className={`w-2 h-2 rounded-full mr-2 ${
          course.available ? "bg-vlsi-500" : "bg-gray-400"
        }`}
      ></div>
      <span className="text-gray-600">Duration: {course.duration}</span>
    </div>
    <div className="flex items-center">
      <div
        className={`w-2 h-2 rounded-full mr-2 ${
          course.available ? "bg-vlsi-500" : "bg-gray-400"
        }`}
      ></div>
      <span className="text-gray-600">Fee: ₹{course.Fee}</span>
    </div>
  </div>

  {/* Level */}
  <div className="flex items-center text-sm">
    <div
      className={`w-2 h-2 rounded-full mr-3 ${
        course.available ? "bg-vlsi-500" : "bg-gray-400"
      }`}
    ></div>
    <span className="text-gray-600">Level: {course.level}</span>
  </div>
</div>


                {/* CTA Button */}
                <Button
                  asChild
                  className={`w-full font-semibold py-3 text-lg rounded-xl transition-all duration-300 ${
                    course.available
                      ? "bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  <Link
                    to={course.path}
                    className="flex items-center justify-center"
                  >
                    {course.available ? "Explore Course" : "Learn More"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 mb-12">
          <p className="text-gray-600 mb-8 text-lg">
            Not sure which course is right for you?
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-vlsi-600 text-vlsi-600 hover:bg-vlsi-600 hover:text-white font-semibold px-10 py-5 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/demo">Book Free Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
