import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Briefcase,
  Laptop,
  Network,
  TrendingUp,
} from "lucide-react";

const teamMembers = [
  // Director & Principal (using Dhanush sir details)
  {
    name: "DHANUSH",
    role: "Director",
    experience: "18+ years",
    background:
      "Expert in Semiconductor Design and Management with extensive industry experience",
    image: "/placeholder.svg",
    specialization: "Semiconductor Design, Management, VLSI Architecture",
  },
  {
    name: "DHANUSH",
    role: "Principal",
    experience: "18+ years",
    background:
      "Expert in Semiconductor Design and Management with extensive industry experience",
    image: "/placeholder.svg",
    specialization: "Semiconductor Design, Management, VLSI Architecture",
  },
  // Mentors
  {
    name: "B.N.Reddy",
    role: "Senior Mentor - VLSI DV PCIe Director",
    experience: "18+ years",
    background:
      "VLSI Design Verification expert specializing in PCIe protocols with extensive industry leadership experience",
    image: "/placeholder.svg",
    specialization: "VLSI Design Verification, PCIe Protocols, Team Leadership",
  },
  {
    name: "Saketh",
    role: "Senior Mentor - VLSI Design",
    experience: "8+ years",
    background:
      "Digital Electronics specialist with strong industry experience in VLSI design and verification",
    image: "/placeholder.svg",
    specialization:
      "VLSI Design, Digital Electronics, Verification Methodologies",
  },
];

const achievements = [
  {
    number: "500+",
    label: "Students Trained",
    description: "Successfully trained and placed in top companies",
  },
  {
    number: "95%",
    label: "Placement Rate",
    description: "Within 6 months of course completion",
  },
  {
    number: "50+",
    label: "Industry Partners",
    description: "Tier-1 companies and startups for placements",
  },
  {
    number: "8",
    label: "Years Experience",
    description: "In VLSI training and industry connections",
  },
];

const companyPartners = ["AZO SEMICONDUCTOR", "ASOCSEMI COMPANIES"];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="About Azorix VLSI | Best Semiconductor & VLSI Institute in Hyderabad"
        description="At Azorix VLSI, we shape future chip designers with expert-led semiconductor training, state-of-the-art labs, and 100% placement support in Hyderabad."
        canonical="https://azorixtech.com/about"
        keywords="Azorix VLSI, best VLSI institute Hyderabad, semiconductor training, chip designers, VLSI experts, placement support Hyderabad"
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-vlsi-700 to-vlsi-800 text-white py-24">
          <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Azorix VLSI
            </h1>
            <p className="text-xl text-vlsi-100 leading-relaxed max-w-3xl mx-auto">
              Pioneering VLSI education and career transformation since 2016. We
              bridge the gap between academic knowledge and industry
              requirements.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Founded in 2016 by a team of industry veterans, Azorix VLSI
                    was born from a simple observation: there was a significant
                    gap between what engineering colleges taught and what the
                    semiconductor industry needed.
                  </p>
                  <p>
                    Our founders, having worked at leading companies like Intel,
                    Qualcomm, and NVIDIA, understood the real challenges faced
                    by verification engineers. They decided to create a training
                    program that would prepare students and professionals for
                    actual industry work, not just theoretical knowledge, making
                    Azorix one of the most trusted VLSI training institutes in
                    Hyderabad and a recognised name among top VLSI training
                    institutes in India.
                  </p>
                  <p>
                    Today, we're proud to have trained over 500 engineers who
                    are now working at top-tier semiconductor companies
                    worldwide, contributing to cutting-edge technologies that
                    power our digital world.
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 mb-6">
                  To democratize access to high-quality VLSI education and
                  create a pipeline of skilled verification engineers who can
                  drive innovation in the semiconductor industry.
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600">
                  To be the global leader in VLSI verification training, known
                  for our industry-relevant curriculum, expert mentorship, and
                  exceptional placement support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Achievements
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Numbers that reflect our commitment to excellence and student
                success
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-vlsi-600 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {achievement.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {achievement.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Partners */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Industry Partners
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We work closely with leading companies to ensure our curriculum
                meets industry standards
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {companyPartners.map((company, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 flex items-center justify-center border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <span className="text-gray-700 font-medium text-center">
                    {company}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Azorix VLSI?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center group hover:bg-vlsi-50 p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="w-16 h-16 bg-vlsi-600 group-hover:bg-vlsi-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-vlsi-700 mb-3 transition-colors duration-300">
                  Industry-Relevant Curriculum
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Our curriculum is designed by industry experts and regularly
                  updated to match current market needs.
                </p>
              </div>
              <div className="text-center group hover:bg-vlsi-50 p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="w-16 h-16 bg-vlsi-600 group-hover:bg-vlsi-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-vlsi-700 mb-3 transition-colors duration-300">
                  Expert Mentorship
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Learn directly from professionals who have worked on
                  real-world verification projects.
                </p>
              </div>
              <div className="text-center group hover:bg-vlsi-50 p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="w-16 h-16 bg-vlsi-600 group-hover:bg-vlsi-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-vlsi-700 mb-3 transition-colors duration-300">
                  Placement Support
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Comprehensive career support including resume building,
                  interview prep, and job placement assistance.
                </p>
              </div>
              <div className="text-center group hover:bg-vlsi-50 p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="w-16 h-16 bg-vlsi-600 group-hover:bg-vlsi-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <Laptop className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-vlsi-700 mb-3 transition-colors duration-300">
                  Hands-on Projects
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Work on real verification projects using industry-standard
                  tools and methodologies.
                </p>
              </div>
              <div className="text-center group hover:bg-vlsi-50 p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="w-16 h-16 bg-vlsi-600 group-hover:bg-vlsi-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <Network className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-vlsi-700 mb-3 transition-colors duration-300">
                  Industry Connections
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Strong partnerships with leading semiconductor companies for
                  internships and placements.
                </p>
              </div>
              <div className="text-center group hover:bg-vlsi-50 p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer">
                <div className="w-16 h-16 bg-vlsi-600 group-hover:bg-vlsi-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-vlsi-700 mb-3 transition-colors duration-300">
                  Career Growth
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Continued support and guidance even after course completion to
                  help advance your career.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Companies We Work With */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Companies We Work With
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our graduates work at leading technology companies and our
                training programs are trusted by industry leaders worldwide.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
              {/* CAPGEMINI */}
              <div className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-all">
                <div className="h-20 flex items-center justify-center mb-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F07ba826074254d3191a55ee32e800a58%2F2d35dd03a3f844f2ba426f2ad62e0a45?format=webp&width=800"
                    alt="Capgemini Logo"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">CAPGEMINI</p>
              </div>

              {/* HCL TECH */}
              <div className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-all">
                <div className="h-20 flex items-center justify-center mb-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F07ba826074254d3191a55ee32e800a58%2Fef9ffb8d7c444356935a1e6086b9f687?format=webp&width=800"
                    alt="HCL Technologies Logo"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">HCL TECH</p>
              </div>

              {/* TRUECHIP */}
              <div className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-all">
                <div className="h-20 flex items-center justify-center mb-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F07ba826074254d3191a55ee32e800a58%2Fd86fec28aed74d9487c8f3fedfb5583c?format=webp&width=800"
                    alt="TrueChip Logo"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">TRUECHIP</p>
              </div>

              {/* AEVA */}
              <div className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-all">
                <div className="h-20 flex items-center justify-center mb-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F07ba826074254d3191a55ee32e800a58%2F6c35a40cb5734f22987ae85316e89e8a?format=webp&width=800"
                    alt="Aeva Logo"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">AEVA</p>
              </div>

              {/* SMARTSOC */}
              <div className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-all">
                <div className="h-20 flex items-center justify-center mb-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F07ba826074254d3191a55ee32e800a58%2F118af7902fdc4533a8fa22f1be9f1c84?format=webp&width=800"
                    alt="SmartSoc Logo"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">SMARTSOC</p>
              </div>

              {/* AMD */}
              <div className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-all">
                <div className="h-20 flex items-center justify-center mb-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F07ba826074254d3191a55ee32e800a58%2Fc3755ae89ce24881944cd0eef5ea471f?format=webp&width=800"
                    alt="AMD Logo"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">AMD</p>
              </div>

              {/* LEADSOC */}
              <div className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-all">
                <div className="h-20 flex items-center justify-center mb-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F07ba826074254d3191a55ee32e800a58%2F292600500eea4fb19bd1e9034fa6b601?format=webp&width=800"
                    alt="LeadSoc Logo"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">LEADSOC</p>
              </div>

              {/* ANALOG DEVICES */}
              <div className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-all">
                <div className="h-20 flex items-center justify-center mb-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F07ba826074254d3191a55ee32e800a58%2F04f39ce5525a452fa3da09ebe38378b2?format=webp&width=800"
                    alt="Analog Devices Logo"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  ANALOG DEVICES
                </p>
              </div>

              {/* QUALCOMM */}
              <div className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-all">
                <div className="h-20 flex items-center justify-center mb-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F07ba826074254d3191a55ee32e800a58%2F4c14a21c68d34b5385481d57e0fa6066?format=webp&width=800"
                    alt="Qualcomm Logo"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">QUALCOMM</p>
              </div>

              {/* L&T */}
              <div className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-all">
                <div className="h-20 flex items-center justify-center mb-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F07ba826074254d3191a55ee32e800a58%2F924c0adb9e904533919e88dee2dafc42?format=webp&width=800"
                    alt="L&T Logo"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">L&T</p>
              </div>

              {/* AXIADO */}
              <div className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-all col-span-2 md:col-span-1">
                <div className="h-20 flex items-center justify-center mb-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F07ba826074254d3191a55ee32e800a58%2F6878d40817ef4be1ab94e11684555747?format=webp&width=800"
                    alt="Axiado Logo"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">AXIADO</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Leadership & Mentors
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Meet our experienced team of industry professionals who guide
                and mentor our students with their extensive expertise in VLSI
                design and verification.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Director & Principal */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Leadership
                </h3>
                <div className="grid gap-8">
                  {teamMembers.slice(0, 2).map((member, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-vlsi-500 to-vlsi-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">
                            {member.name}
                          </h4>
                          <p className="text-vlsi-600 font-semibold mb-3">
                            {member.role}
                          </p>
                          <p className="text-gray-600 mb-4">
                            {member.background}
                          </p>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <span className="inline-block bg-vlsi-100 text-vlsi-700 px-3 py-1 rounded-full text-sm font-medium">
                              {member.experience} Experience
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-3 italic">
                            {member.specialization}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentors */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Senior Mentors
                </h3>
                <div className="grid gap-8">
                  {teamMembers.slice(2).map((member, index) => (
                    <div
                      key={index + 2}
                      className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">
                            {member.name}
                          </h4>
                          <p className="text-orange-600 font-semibold mb-3">
                            {member.role}
                          </p>
                          <p className="text-gray-600 mb-4">
                            {member.background}
                          </p>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                              {member.experience} Experience
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-3 italic">
                            {member.specialization}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-vlsi-700 to-vlsi-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your VLSI Journey?
            </h2>
            <p className="text-xl text-vlsi-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful engineers who have transformed their
              careers with Azorix VLSI.
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
        </section>
      </main>
      <Footer />
    </div>
  );
}
