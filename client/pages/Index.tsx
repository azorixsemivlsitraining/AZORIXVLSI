import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import WhyAzorix from "../components/WhyAzorix";
import CourseSelection from "../components/CourseSelection";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

export default function Index() {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Best VLSI & Semiconductor Training Institutes in Hyderabad | Azorix VLSI Technologies"
        description="Looking for the best VLSI institute in Hyderabad? Azorix VLSI offers semiconductor-focused training, expert mentors, and 100% placement support. Enroll now to start your VLSI career!"
        canonical="https://azorixtech.com/"
        keywords="VLSI training Hyderabad, best VLSI institute Hyderabad, semiconductor training, Design Verification, Verilog, SystemVerilog, UVM, RTL Design, Physical Design, VLSI courses, Azorix VLSI"
      />
      <Header />
      <Hero />
      <CourseSelection />
      <WhyAzorix />
      <CTA />
      <Footer />
    </div>
  );
}
