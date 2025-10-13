import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import WorkshopHero from "@/components/workshop/Hero";
import WorkshopLearn from "@/components/workshop/Learn";
import WorkshopAbout from "@/components/workshop/About";
import WorkshopMentor from "@/components/workshop/Mentor";
import WorkshopTestimonials from "@/components/workshop/Testimonials";
import WorkshopCTA from "@/components/workshop/CTA";
import WorkshopFAQs from "@/components/workshop/FAQs";

export default function Workshop() {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="₹99 VLSI Workshop | Azorix VLSI"
        description="Fast-track your career with simulation-ready VLSI skills. Learn event regions, assignments, fork-join, and randomization—live for just ₹99."
        canonical="https://azorixtech.com/workshop"
        keywords="VLSI workshop, 99 rupees, Azorix VLSI, SystemVerilog, UVM, fork-join, randomization"
      />
      <Header />
      <main>
        <WorkshopHero />
        <WorkshopLearn />
        <WorkshopAbout />
        <WorkshopMentor />
        <WorkshopTestimonials />
        <WorkshopCTA />
        <WorkshopFAQs />
      </main>
      <Footer />
    </div>
  );
}
