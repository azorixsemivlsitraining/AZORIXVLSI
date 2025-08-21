import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Calendar, BookOpen, Users, ArrowLeft } from "lucide-react";

const courseDetails = {
  rtl: {
    title: "RTL Design Course",
    description: "Master the fundamentals of Register Transfer Level (RTL) design with industry-standard tools and methodologies.",
    fullDescription: "Our comprehensive RTL Design course covers digital circuit design, Verilog/VHDL programming, synthesis, timing analysis, and verification. You'll learn to design complex digital systems from concept to implementation using cutting-edge EDA tools.",
    duration: "6 months",
    modules: [
      "Digital Design Fundamentals",
      "Verilog/VHDL Programming",
      "Synthesis and Optimization",
      "Timing Analysis",
      "Verification Techniques",
      "Industry Tools (Synopsys, Cadence)"
    ],
    career: [
      "RTL Design Engineer",
      "Digital Design Engineer", 
      "ASIC Design Engineer",
      "FPGA Design Engineer"
    ]
  },
  pd: {
    title: "Physical Design Course", 
    description: "Learn the complete physical design flow from netlist to GDSII for advanced semiconductor manufacturing.",
    fullDescription: "Our Physical Design course provides hands-on training in floorplanning, placement, routing, timing closure, and signoff. Master the physical implementation of digital designs using industry-leading tools and advanced process technologies.",
    duration: "8 months",
    modules: [
      "Floorplanning & Power Planning",
      "Placement & Clock Tree Synthesis", 
      "Routing & DRC/LVS",
      "Timing Closure & Optimization",
      "Physical Verification",
      "Advanced Technology Nodes"
    ],
    career: [
      "Physical Design Engineer",
      "Backend Design Engineer",
      "Layout Engineer", 
      "CAD Engineer"
    ]
  }
};

export default function ComingSoon() {
  const location = useLocation();

  // Extract course ID from URL path
  const courseId = location.pathname.includes('/rtl') ? 'rtl' :
                   location.pathname.includes('/pd') ? 'pd' : null;

  const course = courseId ? courseDetails[courseId as keyof typeof courseDetails] : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Coming Soon</h1>
            <p className="text-gray-600 mb-4">This course will be available soon. Stay tuned!</p>
            <Link to="/" className="text-vlsi-600 hover:underline">Return to Home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-navy-900 via-vlsi-900 to-navy-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-medium mb-8">
                <Calendar className="w-4 h-4 mr-2" />
                Coming Soon
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-vlsi-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  <Link to="/demo">
                    Book Free Demo
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-navy-900 font-semibold px-8 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Link to="/contact">
                    Get Notified
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Course Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  What to Expect
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {course.fullDescription}
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-vlsi-50 rounded-lg">
                    <div className="w-12 h-12 bg-vlsi-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-vlsi-600 mb-1">{course.duration}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  
                  <div className="text-center p-4 bg-vlsi-50 rounded-lg">
                    <div className="w-12 h-12 bg-vlsi-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-vlsi-600 mb-1">Live</div>
                    <div className="text-sm text-gray-600">Instruction</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-vlsi-600" />
                  Course Modules
                </h3>
                <div className="space-y-3">
                  {course.modules.map((module, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-vlsi-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{module}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Career Opportunities */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Career Opportunities
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Upon completion, you'll be prepared for exciting roles in the semiconductor industry
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {course.career.map((role, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="w-12 h-12 bg-vlsi-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-lg font-bold">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{role}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notification Section */}
        <section className="py-16 bg-vlsi-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Be the First to Know
            </h2>
            <p className="text-xl text-vlsi-100 mb-8">
              Get notified when this course launches and receive early bird pricing
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-vlsi-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/contact">
                  Notify Me
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white text-vlsi-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
