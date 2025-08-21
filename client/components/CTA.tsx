import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function CTA() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-navy-900 via-vlsi-900 to-navy-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-vlsi-500/20 backdrop-blur-sm border border-vlsi-400/30 rounded-full text-vlsi-300 text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-vlsi-400 rounded-full mr-2 animate-pulse"></span>
          Ready to Transform Your Career?
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8">
          <span className="block text-white">Start Your VLSI</span>
          <span className="block bg-gradient-to-r from-vlsi-400 to-vlsi-600 bg-clip-text text-transparent">
            Journey Today
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join 500+ engineers who have transformed their careers with our
          expert-led training programs. Your future in semiconductor design
          starts here.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white font-bold px-12 py-4 text-lg rounded-full shadow-2xl hover:shadow-vlsi-500/25 cta-button-enhanced cta-enroll"
          >
            <Link to="/enroll">Apply Now</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-vlsi-400 bg-vlsi-400/10 backdrop-blur-sm text-vlsi-300 hover:bg-vlsi-400 hover:text-navy-900 font-semibold px-12 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Link to="/contact#contact-form">
              <span className="mr-2">💬</span>
              Talk to Expert
            </Link>
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-vlsi-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-vlsi-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
}
