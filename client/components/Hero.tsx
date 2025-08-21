import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useBrochureModalContext } from "../contexts/BrochureModalContext";

export default function Hero() {
  const { openModal } = useBrochureModalContext();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-navy-900 via-vlsi-900 to-navy-800 text-white overflow-hidden">
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-vlsi-500/20 backdrop-blur-sm border border-vlsi-400/30 rounded-full text-vlsi-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-vlsi-400 rounded-full mr-2 animate-pulse"></span>
              Leading VLSI Training Institute in India
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="block text-white">Where Passion Meets</span>
              <span className="block bg-gradient-to-r from-vlsi-400 to-vlsi-600 bg-clip-text text-transparent">
                Precision in VLSI
              </span>
              <span className="block text-white">Training</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your career with industry-leading semiconductor design
              and verification training. Join 500+ successful engineers who
              chose excellence.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-vlsi-400 mb-2">
                  95%
                </div>
                <div className="text-sm text-gray-400">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-vlsi-400 mb-2">
                  500+
                </div>
                <div className="text-sm text-gray-400">Engineers Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-vlsi-400 mb-2">
                  50+
                </div>
                <div className="text-sm text-gray-400">Industry Partners</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white font-semibold px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-vlsi-500/25 cta-button-enhanced cta-enroll min-w-[220px]"
              >
                <Link to="/courses">Start Your Journey</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={openModal}
                className="border-2 border-white bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-navy-900 font-semibold px-10 py-4 text-lg rounded-full shadow-xl cta-button-enhanced cta-brochure min-w-[220px]"
              >
                Download Brochure
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-yellow-400 bg-yellow-400/20 backdrop-blur-sm text-white hover:bg-yellow-400 hover:text-navy-900 font-semibold px-10 py-4 text-lg rounded-full shadow-xl cta-button-enhanced cta-demo min-w-[220px]"
              >
                <Link to="/demo">Book Free Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
