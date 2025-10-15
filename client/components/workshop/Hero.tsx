import React from "react";
import { Button } from "@/components/ui/button";

export default function WorkshopHero() {
  const scrollToForm = () => {
    const el = document.getElementById("demo-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/demo") {
        setTimeout(() => {
          const retry = document.getElementById("demo-form");
          if (retry)
            retry.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      } else {
        window.location.href = "/demo#demo-form";
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
      {/* Decorative glow + pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <svg
            className="absolute -top-24 -right-24 w-[620px] h-[620px]"
            viewBox="0 0 600 600"
            fill="none"
          >
            <circle cx="300" cy="300" r="298" stroke="url(#g)" strokeWidth="2" />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="600" y2="600">
                <stop stopColor="#22d3ee" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div
          className="absolute inset-0 [background:radial-gradient(circle_at_20%_10%,rgba(34,211,238,.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,.12),transparent_45%)]"
          aria-hidden
        />
      </div>

      <div className="container max-w-6xl pt-20 md:pt-28 pb-10 md:pb-16">
        <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12">
          {/* Left: Copy */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-white/90">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Live Workshop</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Mentor-led</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Recording access (48h)</span>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-vlsi-500 to-vlsi-600 font-semibold">Only ₹99</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight">
              Fast-Track Your Career with
              <span className="block bg-gradient-to-r from-vlsi-400 to-vlsi-600 bg-clip-text text-transparent">
                Simulation-Ready VLSI Skills
              </span>
            </h1>

            <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-200">
              Unlock critical concepts—event regions, assignments, fork-join, randomization—for just ₹99.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="cta-button-enhanced animate-pulse-glow-enhanced bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white font-semibold px-7 py-6 rounded-xl shadow-lg hover:shadow-vlsi-500/30"
              >
                Reserve My Seat for ₹99
              </Button>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="flex -space-x-2">
                  <span className="w-8 h-8 rounded-full bg-white/20 border border-white/30" />
                  <span className="w-8 h-8 rounded-full bg-white/20 border border-white/30" />
                  <span className="w-8 h-8 rounded-full bg-white/20 border border-white/30" />
                </div>
                <span>Trusted by 500+ learners</span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-gray-300/90">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Live & Interactive</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Hands-on Simulation</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Hiring-test focused</span>
            </div>
          </div>

          {/* Right: Price/Value card */}
          <div className="relative">
            <div className="group relative aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-vlsi-500/15 via-vlsi-600/10 to-vlsi-700/10 shadow-2xl overflow-hidden animate-pulse-glow-enhanced">
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-vlsi-500 to-vlsi-600 text-white text-xs font-semibold shadow-lg">
                ₹99 only
              </div>
              <div className="absolute inset-x-0 -top-1/2 h-2/3 bg-white/10 blur-3xl rounded-full" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center px-6">
                  <div className="text-sm uppercase tracking-wide text-vlsi-200">Live Workshop</div>
                  <div className="mt-1 text-5xl font-extrabold text-white">₹99</div>
                  <div className="mt-2 text-gray-200">Limited seats • Mentor-led • Recording access (48h)</div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 text-[11px] text-white/70">
                Next cohort starting soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
