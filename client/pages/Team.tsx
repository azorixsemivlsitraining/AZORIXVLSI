import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Award, BookOpen, Users } from "lucide-react";

const teamMembers = [
  {
    id: "director",
    name: "Dr. Rajesh Kumar",
    role: "Director & Founder",
    title: "Ph.D. in Electrical Engineering, IIT Bombay",
    experience: "20+ years",
    image: "/placeholder.svg",
    bio: "Dr. Rajesh Kumar is a visionary leader in the VLSI industry with over two decades of experience in semiconductor design and verification. He has led teams at major semiconductor companies and holds multiple patents in digital design. His passion for education and industry expertise drives Azorix VLSI's mission to bridge the gap between academia and industry.",
    expertise: [
      "VLSI Design & Verification",
      "Digital Signal Processing",
      "SoC Architecture",
      "Team Leadership",
      "Industry Partnerships"
    ],
    achievements: [
      "20+ years in semiconductor industry",
      "15+ patents in digital design",
      "Former Senior Director at leading chip companies",
      "Mentored 500+ engineers",
      "Published 30+ research papers"
    ],
    social: {
      linkedin: "#",
      email: "director@azorix.com"
    }
  },
  {
    id: "principal",
    name: "Prof. Priya Sharma",
    role: "Principal & Academic Head",
    title: "M.Tech in VLSI Design, IIT Delhi",
    experience: "15+ years",
    image: "/placeholder.svg",
    bio: "Prof. Priya Sharma brings extensive academic and industry experience to Azorix VLSI. With a strong background in VLSI design and verification methodologies, she has developed industry-aligned curricula that prepare students for real-world challenges. Her innovative teaching methods and industry connections ensure students receive cutting-edge education.",
    expertise: [
      "Curriculum Development",
      "SystemVerilog & UVM",
      "Design Verification",
      "Academic Leadership",
      "Student Mentoring"
    ],
    achievements: [
      "15+ years in VLSI education",
      "Designed curricula for 10+ programs",
      "95% student placement rate",
      "Industry-academia collaboration expert",
      "Guest lecturer at premier institutes"
    ],
    social: {
      linkedin: "#",
      email: "principal@azorix.com"
    }
  }
];

const mentors = [
  {
    name: "Arun Patel",
    role: "Senior Verification Engineer",
    company: "AMD",
    expertise: "UVM, SystemVerilog, PCIe",
    experience: "12 years",
    image: "/placeholder.svg"
  },
  {
    name: "Sneha Reddy", 
    role: "Design Engineer",
    company: "Qualcomm",
    expertise: "RTL Design, Synthesis",
    experience: "10 years",
    image: "/placeholder.svg"
  },
  {
    name: "Vikram Singh",
    role: "Principal Engineer", 
    company: "Analog Devices",
    expertise: "SoC Design, Physical Design",
    experience: "14 years",
    image: "/placeholder.svg"
  },
  {
    name: "Meera Gupta",
    role: "Staff Engineer",
    company: "HCL Tech",
    expertise: "Verification, DFT",
    experience: "11 years", 
    image: "/placeholder.svg"
  },
  {
    name: "Karthik Nair",
    role: "Senior Design Engineer",
    company: "L&T",
    expertise: "FPGA, RTL Design",
    experience: "9 years",
    image: "/placeholder.svg"
  },
  {
    name: "Deepa Krishnan",
    role: "Verification Lead",
    company: "Capgemini",
    expertise: "UVM, Protocols",
    experience: "13 years",
    image: "/placeholder.svg"
  }
];

export default function Team() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-navy-900 via-vlsi-900 to-navy-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-vlsi-500/20 backdrop-blur-sm border border-vlsi-400/30 rounded-full text-vlsi-300 text-sm font-medium mb-8">
                <Users className="w-4 h-4 mr-2" />
                Meet Our Team
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Expert Leadership & <br />
                <span className="bg-gradient-to-r from-vlsi-400 to-vlsi-600 bg-clip-text text-transparent">
                  Industry Mentors
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Learn from industry veterans and academic leaders who bring decades of 
                real-world experience to your VLSI education journey.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Leadership Team
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our leadership combines deep industry expertise with educational excellence 
                to deliver world-class VLSI training.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-vlsi-500 to-vlsi-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-lg text-vlsi-600 font-semibold mb-2">
                          {member.role}
                        </p>
                        <p className="text-gray-600 mb-2">{member.title}</p>
                        <p className="text-sm text-gray-500">{member.experience} Experience</p>
                        
                        <div className="flex space-x-3 mt-4">
                          <a href={member.social.linkedin} className="text-blue-600 hover:text-blue-700">
                            <Linkedin className="w-5 h-5" />
                          </a>
                          <a href={`mailto:${member.social.email}`} className="text-gray-600 hover:text-gray-700">
                            <Mail className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mt-6 mb-6">
                      {member.bio}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-vlsi-600" />
                          Expertise
                        </h4>
                        <ul className="space-y-1">
                          {member.expertise.map((skill, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <div className="w-1.5 h-1.5 bg-vlsi-500 rounded-full mr-2"></div>
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-vlsi-600" />
                          Achievements
                        </h4>
                        <ul className="space-y-1">
                          {member.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <div className="w-1.5 h-1.5 bg-vlsi-500 rounded-full mr-2"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Mentors */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Industry Mentors
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Learn directly from working professionals at top semiconductor companies 
                who share their real-world experience and industry insights.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentors.map((mentor, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-vlsi-500 to-vlsi-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-xl font-bold">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {mentor.name}
                    </h3>
                    <p className="text-vlsi-600 font-semibold mb-1">
                      {mentor.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      {mentor.company}
                    </p>
                    
                    <div className="border-t pt-4">
                      <div className="text-xs text-gray-500 mb-2">Specializes in</div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {mentor.expertise}
                      </p>
                      <div className="text-xs text-vlsi-600 font-semibold">
                        {mentor.experience} Experience
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-vlsi-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Learn from the Best in the Industry
            </h2>
            <p className="text-xl text-vlsi-100 mb-8">
              Join our programs and get mentored by industry leaders who will guide 
              your journey to VLSI excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-vlsi-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/enroll">
                  Start Your Journey
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-vlsi-600 font-semibold px-8 py-4 text-lg rounded-full"
              >
                <Link to="/demo">
                  Meet Our Mentors
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
