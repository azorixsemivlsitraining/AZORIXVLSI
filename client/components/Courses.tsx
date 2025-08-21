import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Cpu, Settings, Shield, Zap, Layers, Cog } from "lucide-react";

const getIcon = (iconName: string) => {
  const iconMap = {
    cpu: <Cpu className="w-8 h-8 text-green-600" />,
    settings: <Settings className="w-8 h-8 text-green-600" />,
    shield: <Shield className="w-8 h-8 text-green-600" />,
    zap: <Zap className="w-8 h-8 text-orange-600" />,
    layers: <Layers className="w-8 h-8 text-orange-600" />,
    cog: <Cog className="w-8 h-8 text-orange-600" />,
  };
  return iconMap[iconName as keyof typeof iconMap] || <Cpu className="w-8 h-8 text-green-600" />;
};

const dvCourse = {
  title: "Design Verification (DV) Course",
  description:
    "Comprehensive 8-month program covering all aspects of digital verification from RTL design to advanced verification methodologies. Master the complete VLSI verification flow.",
  duration: "8 months",
  level: "Beginner to Advanced",
  baseFee: "₹XXXX",
  coreModules: [
    {
      name: "Verilog",
      description: "RTL design fundamentals and digital circuit implementation",
      icon: "cpu",
      included: true,
    },
    {
      name: "SystemVerilog",
      description: "Advanced verification techniques and OOP concepts",
      icon: "settings",
      included: true,
    },
    {
      name: "UVM",
      description: "Industry-standard verification methodology",
      icon: "shield",
      included: true,
    },
  ],
  addonCourses: [
    {
      name: "PCIe",
      description:
        "High-speed serial computer expansion bus standard verification",
      icon: "zap",
      fee: "₹XXXX",
      duration: "4 weeks",
      included: false,
    },
    {
      name: "SoC",
      description: "System-on-Chip integration and verification techniques",
      icon: "layers",
      fee: "₹XXXX",
      duration: "6 weeks",
      included: false,
    },
    {
      name: "IP",
      description: "Intellectual Property block verification and validation",
      icon: "cog",
      fee: "₹XXXX",
      duration: "3 weeks",
      included: false,
    },
  ],
  highlights: [
    "Complete verification flow coverage",
    "Industry-standard tools and methodologies",
    "Real-time project experience",
    "Expert mentorship from VLSI professionals",
    "2 years placement support",
  ],
};

export default function Courses() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-vlsi-100 rounded-full text-vlsi-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-vlsi-500 rounded-full mr-2"></span>
            Professional Training Program
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-navy-900 mb-6">
            Master VLSI Design Verification
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Begin your journey into the core of semiconductor design and
            verification with our comprehensive 8-month program. Master
            everything from RTL design to advanced verification methodologies.
          </p>
        </div>

        {/* Main DV Course Card */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-vlsi-500 to-vlsi-600 rounded-3xl blur-xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-navy-900 via-vlsi-900 to-navy-800 text-white rounded-3xl p-12 border border-vlsi-500/30 shadow-2xl">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-black mb-6">
                  {dvCourse.title}
                </h3>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-semibold">
                    <span className="text-vlsi-300"></span>{" "}
                    {dvCourse.duration}
                  </span>
                  <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-semibold">
                    <span className="text-vlsi-300"></span> {dvCourse.level}
                  </span>
                  {/* Pricing hidden per requirements */}
                </div>
                <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                  {dvCourse.description}
                </p>
              </div>
            </div>
          </div>

          {/* Course Structure Section */}
          <div className="mb-12">
            {/* Core Modules Section */}
            <div className="mb-10 pt-12">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-3">
                  Core Modules (Included)
                </h4>
                <p className="text-gray-600">
                  Fundamental skills covered in the base program
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {dvCourse.coreModules.map((module, index) => (
                  <Link
                    key={index}
                    to={`/courses/${module.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block"
                  >
                    <div className="bg-white border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer hover:border-green-300">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          {getIcon(module.icon)}
                        </div>
                        <h5 className="font-bold text-gray-900 mb-2 text-lg">
                          {module.name}
                        </h5>
                        <p className="text-sm text-gray-600 mb-4">
                          {module.description}
                        </p>
                        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                          ✓ Included
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Add-on Specializations Section */}
            <div>
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-3">
                  Add-on Specializations (Optional)
                </h4>
                <p className="text-gray-600">
                  Advanced modules available for additional expertise
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {dvCourse.addonCourses.map((addon, index) => (
                  <Link
                    key={index}
                    to={`/courses/${addon.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block"
                  >
                    <div className="bg-white border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer hover:border-orange-300">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          {getIcon(addon.icon)}
                        </div>
                        <h5 className="font-bold text-gray-900 mb-2 text-lg">
                          {addon.name}
                        </h5>
                        <p className="text-sm text-gray-600 mb-3">
                          {addon.description}
                        </p>
                        <p className="text-xs text-orange-600 font-medium mb-4">
                          {addon.duration} duration
                        </p>
                        {/* Pricing hidden per requirements */}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6">
                  <div className="text-center">
                    <span className="text-2xl mb-3 block"></span>
                    <h5 className="font-semibold text-orange-900 mb-2">
                      Flexible Learning Path
                    </h5>
                    <p className="text-sm text-orange-800">
                      Add-on specializations can be taken individually or
                      combined with the core program to create your personalized
                      learning journey
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program Highlights */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4 text-center">
              Program Highlights
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {dvCourse.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="text-vlsi-600 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-vlsi-600 hover:bg-vlsi-700 text-white px-8 py-3"
            >
              <Link to="/courses/dv-course">Learn More About DV Course</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
