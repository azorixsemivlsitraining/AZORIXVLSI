import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  Users,
  Award,
  ArrowRight,
  Target,
  Zap,
  Cpu,
} from "lucide-react";

const coursesData = [
  {
    id: "design-verification",
    title: "Design Verification",
    shortName: "DV",
    duration: "16 weeks",
    level: "Beginner to Advanced",
    Fee:"69999",
    description:
      "Master SystemVerilog and UVM methodology for comprehensive verification of digital designs. Learn industry-standard verification practices.",
    features: [
      "SystemVerilog fundamentals",
      "UVM methodology mastery",
      "Functional coverage",
      "Assertion-based verification",
      "Industry tools & projects",
    ],
    subcourses: [
      { name: "Verilog", path: "/courses/verilog", duration: "4 weeks" },
      {
        name: "SystemVerilog",
        path: "/courses/systemverilog",
        duration: "6 weeks",
      },
      { name: "UVM", path: "/courses/uvm", duration: "6 weeks" },
    ],
    bgColor: "from-vlsi-500 to-vlsi-600",
    icon: "🔍",
    students: "500+",
    rating: "4.9",
    placement: "100%",
  },
  {
    id: "rtl-design",
    title: "RTL Design",
    shortName: "RTL",
    duration: "14 weeks",
    level: "Intermediate",
    Fee:"65999",
    description:
      "Learn Register Transfer Level design using Verilog and SystemVerilog. Master digital design from concept to synthesis.",
    features: [
      "Digital design fundamentals",
      "Verilog & SystemVerilog",
      "Synthesis optimization",
      "Timing analysis",
      "Real processor design",
    ],
    subcourses: [],
    bgColor: "from-orange-500 to-orange-600",
    icon: "⚡",
    students: "350+",
    rating: "4.8",
    placement: "95%",
  },
  {
    id: "physical-design",
    title: "Physical Design",
    shortName: "PD",
    duration: "14 weeks",
    level: "Advanced",
    Fee:"63999",
    description:
      "Master the complete physical design flow from floorplanning to signoff. Learn placement, routing, and timing closure.",
    features: [
      "Complete PD flow",
      "Floorplanning & placement",
      "Clock tree synthesis",
      "Timing closure",
      "Industry EDA tools",
    ],
    subcourses: [],
    bgColor: "from-indigo-500 to-indigo-600",
    icon: "🏗️",
    students: "200+",
    rating: "4.9",
    placement: "100%",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEOHead
        title="Azorix VLSI Hyderabad – Semiconductor Training in Design Verification, SV & UVM"
        description="Build your semiconductor career with Azorix VLSI Hyderabad. Learn Design Verification, System Verilog & UVM from industry experts with real-world projects and job placement support."
        canonical="https://azorixtech.com/courses"
        keywords="Azorix VLSI Hyderabad, semiconductor training, Design Verification, SystemVerilog, UVM, VLSI courses Hyderabad, semiconductor career, job placement"
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our VLSI Training
            <span className="block text-vlsi-600">Courses</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Choose from our expertly designed courses in Design Verification,
            RTL Design, and Physical Design. Each program is crafted to meet
            industry standards and accelerate your VLSI career.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.map((course, index) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Course Header */}
<div
  className={`bg-gradient-to-r ${course.bgColor} text-white p-6 relative overflow-hidden`}
>
  <div className="relative z-10">
    <div className="text-4xl mb-3">{course.icon}</div>
    <h3 className="text-2xl font-bold mb-2">{course.title}</h3>

    <div className="flex items-center gap-4 text-sm flex-wrap">
      {/* Duration */}
      <span className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        {course.duration}
      </span>

      {/* Level */}
      <span className="bg-white/20 px-2 py-1 rounded text-xs">
        {course.level}
      </span>

      {/* Fee */}
      <span className="bg-white/20 px-2 py-1 rounded text-xs">
        Fee: ₹{Number(course.Fee).toLocaleString("en-IN")}
      </span>
    </div>
  </div>

  {/* Decorative background circle */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
</div>


                {/* Course Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {course.students}
                      </div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {course.rating}/5
                      </div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {course.placement}
                      </div>
                      <div className="text-xs text-gray-600">Placement</div>
                    </div>
                  </div>

                  {/* Subcourses for DV */}
                  {course.subcourses.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Sub-Courses:
                      </h4>
                      <div className="space-y-2">
                        {course.subcourses.map((subcourse, idx) => (
                          <Link
                            key={idx}
                            to={subcourse.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-vlsi-50 rounded-lg hover:bg-vlsi-100 transition-colors group"
                          >
                            <div>
                              <span className="font-medium text-vlsi-700">
                                {subcourse.name}
                              </span>
                              <span className="text-sm text-gray-600 ml-2">
                                ({subcourse.duration})
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-vlsi-600 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Button
                      asChild
                      className={`w-full bg-gradient-to-r ${course.bgColor} hover:opacity-90 text-white`}
                    >
                      <Link
                        to={`/courses/${course.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Course Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/enroll">Enroll Now</Link>
                    </Button>
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
            Ready to Start Your VLSI Journey?
          </h2>
          <p className="text-xl mb-8 text-vlsi-100">
            Join thousands of successful engineers who started their careers
            with our expert training programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-vlsi-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold cta-button-enhanced cta-enroll"
            >
              <Link to="/enroll">Enroll Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white text-vlsi-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold cta-button-enhanced cta-demo"
            >
              <Link to="/demo">Book Free Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
