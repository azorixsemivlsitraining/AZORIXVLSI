import React from "react";
import { Button } from "@/components/ui/button";

export default function WorkshopHero() {
  const scrollToForm = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-vlsi-900 to-navy-800 text-white">
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
        <svg className="absolute -top-20 -right-20 w-[600px] h-[600px]" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="298" stroke="url(#g)" strokeWidth="2" />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="600" y2="600">
              <stop stopColor="#22d3ee" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="container max-w-6xl pt-28 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Fast-Track Your Career with
              <span className="block bg-gradient-to-r from-vlsi-400 to-vlsi-600 bg-clip-text text-transparent">Simulation-Ready VLSI Skills</span>
            </h1>
            <p className="mt-5 text-lg text-gray-200">
              Unlock critical concepts—event regions, assignments, fork-join, randomization—for just ₹99.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button onClick={scrollToForm} size="lg" className="bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white font-semibold px-8 py-6 rounded-xl">
                Reserve My Seat for ₹99
              </Button>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="flex -space-x-2">
                  <span className="w-8 h-8 rounded-full bg-white/20 border border-white/30" />
                  <span className="w-8 h-8 rounded-full bg-white/20 border border-white/30" />
                  <span className="w-8 h-8 rounded-full bg-white/20 border border-white/30" />
                </div>
                <span>Trusted by 500+ learners • Certificate of Completion</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-300/90">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Live & Interactive</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Hands-on Simulation</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Hiring-Test Focused</span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-vlsi-500/20 to-vlsi-600/10 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center px-6">
                  <div className="text-sm uppercase tracking-wide text-vlsi-200">Live Workshop</div>
                  <div className="mt-2 text-5xl font-extrabold text-white">₹99</div>
                  <div className="mt-2 text-gray-200">Limited seats • Mentor-led • Recording access (48h)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
