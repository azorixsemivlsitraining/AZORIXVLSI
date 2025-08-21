import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const courseData: Record<string, any> = {
  "dv-course": {
    title: "Design Verification (DV) Course",
    duration: "8 months",
    level: "Beginner to Advanced",
    baseFee: "₹XXXX",
    description:
      "Comprehensive VLSI verification program covering the complete digital verification flow. Master core verification technologies with optional specialization add-ons.",
    coreModules: [
      {
        name: "Verilog Module",
        duration: "6 weeks",
        description:
          "RTL design fundamentals and digital circuit implementation",
        type: "core",
        topics: [
          "Introduction to HDL & Design Flow",
          "Verilog Syntax & Modeling Styles (Behavioral, Dataflow, Structural)",
          "Combinational and Sequential Logic Design",
          "Finite State Machines (Moore & Mealy)",
          "Writing Testbenches for Simulation",
          "Synthesis Concepts & Design Constraints",
          "Coding for Synthesis vs Simulation",
          "Debugging, Timing, and Optimisation",
        ],
      },
      {
        name: "SystemVerilog Module",
        duration: "8 weeks",
        description: "Advanced verification techniques and OOP concepts",
        type: "core",
        topics: [
          "SystemVerilog for Design vs Verification",
          "Data Types, Interfaces, and Modports",
          "Classes, Objects, and Inheritance",
          "Randomization & Constraints",
          "Functional Coverage & Covergroups",
          "Assertions & Property Specification",
          "Testbench Architecture & Modularity",
          "Advanced Verification Constructs",
        ],
      },
      {
        name: "UVM Module",
        duration: "10 weeks",
        description: "Industry-standard verification methodology",
        type: "core",
        topics: [
          "UVM Base Class Library & Simulation Flow",
          "UVM Components: Agents, Drivers, Monitors, Sequencers",
          "Transaction-Level Modelling (TLM)",
          "Sequences, Scoreboards, and Functional Coverage",
          "Factory Pattern & Configuration Database",
          "Phase Mechanism & Objection Handling",
          "UVM Reporting & Debugging Techniques",
          "Complete IP/Sub-system Level Project",
        ],
      },
    ],
    addonModules: [
      {
        name: "PCIe Verification Specialization",
        duration: "4 weeks",
        fee: "₹XXXX",
        description:
          "High-speed serial computer expansion bus standard verification with real-world PCIe designs",
        type: "addon",
        topics: [
          "PCIe Protocol Architecture & Layers",
          "Transaction Layer Packet (TLP) Verification",
          "Data Link Layer Protocol Verification",
          "Physical Layer Link Training & Status",
          "PCIe Configuration Space Testing",
          "Error Handling & Recovery Mechanisms",
          "PCIe Compliance & Interoperability Testing",
          "Advanced PCIe Features (SR-IOV, ATS, etc.)",
          "Industry-Standard PCIe VIP Usage",
          "Real PCIe Controller Verification Project",
        ],
        tools: [
          "Synopsys VCS",
          "Cadence Xcelium",
          "PCIe VIP",
          "Protocol Analyzers",
        ],
        projects: [
          "PCIe Root Complex Verification",
          "PCIe Endpoint Testing",
          "Multi-Function Device Verification",
        ],
      },
      {
        name: "SoC Integration & Verification",
        duration: "6 weeks",
        fee: "₹XXXX",
        description:
          "System-on-Chip integration and comprehensive verification methodologies",
        type: "addon",
        topics: [
          "SoC Architecture & Design Methodologies",
          "ARM AMBA Protocol Verification (AHB, APB, AXI)",
          "Interconnect Fabric Verification",
          "Memory Subsystem & Controller Verification",
          "Clock & Reset Domain Crossing",
          "Power Management Unit (PMU) Verification",
          "Interrupt Controller Verification",
          "DMA Controller Verification",
          "System-Level Integration Testing",
          "Performance & Power Analysis",
        ],
        tools: [
          "ARM Fast Models",
          "Synopsys Platform Architect",
          "Power Analysis Tools",
        ],
        projects: [
          "Multi-Core SoC Verification",
          "Automotive SoC Testing",
          "IoT SoC Integration",
        ],
      },
      {
        name: "IP Block Verification & VIP Development",
        duration: "3 weeks",
        fee: "₹XXXX",
        description:
          "Intellectual Property block verification and Verification IP development",
        type: "addon",
        topics: [
          "IP Block Verification Strategy & Planning",
          "Standard Interface Protocol Verification (I2C, SPI, UART)",
          "USB Protocol Verification",
          "Ethernet MAC Verification",
          "Memory Interface Verification (DDR, LPDDR)",
          "Verification IP (VIP) Development",
          "Reusable Testbench Architecture",
          "IP Compliance & Certification",
          "Third-Party IP Integration",
          "IP Documentation & Delivery",
        ],
        tools: ["Questa VIP", "Cadence VIP", "Custom VIP Development"],
        projects: [
          "USB 3.0 Controller Verification",
          "DDR4 Controller Testing",
          "Custom VIP Creation",
        ],
      },
    ],
    highlights: [
      "Complete verification flow from RTL to system level",
      "Industry-standard tools and methodologies",
      "Real-time project experience on live designs",
      "Expert mentorship from VLSI verification professionals",
      "2 years placement support with tier-1 companies",
      "Hands-on experience with cutting-edge verification techniques",
    ],
    eligibility: [
      "B.E/B.Tech or M.E/M.Tech in ECE, EEE, or related branches",
      "Basic understanding of digital electronics and logic design",
      "No prior coding experience required - we teach from basics",
      "Passion for learning semiconductor design and verification",
    ],
    careerSupport: [
      "Industry Projects and Live Assignments",
      "Resume Building and Interview Preparation",
      "2 Years Comprehensive Placement Assistance",
      "Partnerships with Tier-1 VLSI Companies",
      "Portfolio Development with Real Project Experience",
    ],
    pricingOptions: [
      {
        name: "Core DV Program",
        price: "₹XXXX",
        duration: "6 months",
        modules: ["Verilog", "SystemVerilog", "UVM"],
        popular: false,
      },
      {
        name: "DV + One Specialization",
        price: "₹XXXX",
        duration: "7-8 months",
        modules: ["Core DV", "Choice of PCIe/SoC/IP"],
        popular: true,
      },
      {
        name: "Complete DV Master Program",
        price: "₹XXXX",
        duration: "11 months",
        modules: ["Core DV", "All three specializations"],
        popular: false,
        savings: "₹XXXX",
      },
    ],
  },
};

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();

  const course = courseId ? courseData[courseId] : null;

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Course Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The course you're looking for doesn't exist.
            </p>
            <Button asChild className="bg-vlsi-600 hover:bg-vlsi-700">
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-vlsi-700 to-vlsi-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 mb-4">
              <span className="text-sm bg-vlsi-600 text-white px-3 py-1 rounded">
                {course.duration}
              </span>
              <span className="text-sm bg-white/20 text-white px-3 py-1 rounded">
                {course.level}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {course.title}
            </h1>
            {/* Pricing hidden per requirements */}
            <p className="text-xl text-vlsi-100 leading-relaxed">
              {course.description}
            </p>
          </div>
        </section>

        {/* Course Overview Stats */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-vlsi-600">8</div>
                <div className="text-gray-600">Months</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-vlsi-600">6</div>
                <div className="text-gray-600">Modules</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-vlsi-600">40+</div>
                <div className="text-gray-600">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-vlsi-600">95%</div>
                <div className="text-gray-600">Placement Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Pricing Options - Hidden per requirements */}

            {/* Core Modules */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                Core Verification Modules (Included)
              </h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                These foundational modules are included in the base program and
                form the essential verification skill set.
              </p>

              <div className="space-y-8">
                {course.coreModules.map((module: any, index: number) => (
                  <div key={index} className="relative">
                    {/* Module Card */}
                    <div className="bg-white border-2 border-green-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                      {/* Module Header */}
                      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                              {index + 1}
                            </span>
                            <div>
                              <h3 className="text-2xl font-bold">
                                {module.name}
                              </h3>
                              <div className="flex items-center mt-2">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium mr-3">
                                  📅 {module.duration}
                                </span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                  ✅ Included
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl opacity-75">
                              {index === 0 && "📐"}
                              {index === 1 && "🔧"}
                              {index === 2 && "⚡"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Module Content */}
                      <div className="p-6">
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                          {module.description}
                        </p>

                        <div>
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                            <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-3">
                              📚
                            </span>
                            Complete Curriculum
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {module.topics.map((topic: string, idx: number) => (
                              <div key={idx} className="flex items-start">
                                <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-gray-700 text-sm">
                                  {topic}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Connection Line (except for last module) */}
                    {index < course.coreModules.length - 1 && (
                      <div className="flex justify-center py-4">
                        <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-green-300 rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Add-on Specialization Modules */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                Add-on Specialization Modules (Optional)
              </h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Enhance your expertise with specialized modules. These can be
                taken individually or combined with the core program.
              </p>

              <div className="space-y-8">
                {course.addonModules.map((module: any, index: number) => (
                  <div key={index} className="relative">
                    {/* Module Card */}
                    <div className="bg-white border-2 border-orange-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                      {/* Module Header */}
                      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                              +{index + 1}
                            </span>
                            <div>
                              <h3 className="text-2xl font-bold">
                                {module.name}
                              </h3>
                              <div className="flex items-center mt-2 flex-wrap gap-2">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                  📅 {module.duration}
                                </span>
                                {/* Fee hidden per requirements */}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl opacity-75">
                              {index === 0 && "🚄"}
                              {index === 1 && "💻"}
                              {index === 2 && "🏗️"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Module Content */}
                      <div className="p-6">
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                          {module.description}
                        </p>

                        <div className="grid lg:grid-cols-3 gap-6">
                          {/* Curriculum */}
                          <div className="lg:col-span-2">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                              <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm mr-3">
                                📚
                              </span>
                              Detailed Curriculum
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {module.topics.map(
                                (topic: string, idx: number) => (
                                  <div key={idx} className="flex items-start">
                                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span className="text-gray-700 text-sm">
                                      {topic}
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          {/* Tools & Projects */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm mr-3">
                                  🛠️
                                </span>
                                Tools Used
                              </h4>
                              <div className="space-y-2">
                                {module.tools.map(
                                  (tool: string, idx: number) => (
                                    <div
                                      key={idx}
                                      className="bg-orange-50 text-orange-800 px-3 py-1 rounded-lg text-sm"
                                    >
                                      {tool}
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm mr-3">
                                </span>
                                Key Projects
                              </h4>
                              <div className="space-y-2">
                                {module.projects.map(
                                  (project: string, idx: number) => (
                                    <div
                                      key={idx}
                                      className="text-sm text-gray-700 flex items-start"
                                    >
                                      <span className="text-orange-600 mr-2">
                                        •
                                      </span>
                                      {project}
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Connection Line (except for last module) */}
                    {index < course.addonModules.length - 1 && (
                      <div className="flex justify-center py-4">
                        <div className="w-1 h-8 bg-gradient-to-b from-orange-600 to-orange-300 rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Program Features Grid */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Why Choose Our Program?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {course.highlights.map((highlight: string, index: number) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
                  >
                    <div className="w-16 h-16 bg-vlsi-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Eligibility */}
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-3"></span> Eligibility Criteria
                </h2>
                <ul className="space-y-4">
                  {course.eligibility.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-6 h-6 bg-vlsi-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools & Technologies */}
              <div className="bg-vlsi-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-3">🛠️</span> Tools & Technologies
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "ModelSim",
                    "QuestaSim",
                    "VCS",
                    "Synopsys",
                    "Cadence",
                    "SystemVerilog",
                    "UVM",
                    "DVT",
                  ].map((tool, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 text-center shadow-sm"
                    >
                      <span className="text-gray-700 font-medium">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Support */}
            <div className="mb-12 bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Career Support Included
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.careerSupport.map((support: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <span className="text-vlsi-600 mr-3 mt-1"></span>
                    <span className="text-gray-700 font-medium">{support}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-gradient-to-r from-vlsi-700 to-vlsi-800 text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Start Your VLSI Verification Journey?
              </h3>
              <p className="text-vlsi-100 mb-6 max-w-2xl mx-auto">
                Join our comprehensive 8-month program and become a skilled
                verification engineer. Build your career on chips, not just
                scripts!
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
                  className="bg-white text-vlsi-700 hover:bg-vlsi-50"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
