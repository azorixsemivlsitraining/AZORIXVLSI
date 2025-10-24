
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
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <svg
            className="absolute -top-24 -right-24 w-[620px] h-[620px]"
            viewBox="0 0 600 600"
            fill="none"
          >
            <circle
              cx="300"
              cy="300"
              r="298"
              stroke="url(#g)"
              strokeWidth="2"
            />
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

      <div className="container max-w-6xl pt-20 md:pt-28 pb-8 md:pb-12">
        <div className="grid md:grid-cols-2 items-center gap-6 md:gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-white/90">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                Live Workshop
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                Mentor-led
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                Recording access (48h)
              </span>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-vlsi-500 to-vlsi-600 font-semibold">
                Only ₹99
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.12] tracking-tight">
              Fast-Track Your Career with
              <span className="block bg-gradient-to-r from-vlsi-400 to-vlsi-600 bg-clip-text text-transparent">
                Simulation-Ready VLSI Skills
              </span>
            </h1>

            <p className="mt-2 md:mt-3 text-base md:text-lg text-gray-200 max-w-2xl">
              Unlock critical concepts—event regions, assignments, fork-join,
              randomization—and get hands-on simulation experience designed for
              hiring tests.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                onClick={() => window.open("https://rzp.io/rzp/3yDHkted", "_blank")}
                size="lg"
                className="cta-button-enhanced animate-pulse-glow-enhanced bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white font-semibold px-7 py-5 rounded-xl shadow-lg hover:shadow-vlsi-500/30"
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

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-300/90">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                Live & Interactive
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                Hands-on Simulation
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                Hiring-test focused
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-vlsi-500/15 via-vlsi-600/10 to-vlsi-700/10 shadow-2xl overflow-hidden animate-pulse-glow-enhanced p-4 md:p-6">
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-vlsi-500 to-vlsi-600 text-white text-xs font-semibold shadow-lg">
                ₹99 only
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
                <div className="flex-1 flex flex-col items-center justify-center text-center md:text-left md:items-start md:justify-start">
                  <div className="text-sm uppercase tracking-wide text-vlsi-200">
                    Live Workshop
                  </div>
                  <div className="mt-2 text-4xl md:text-5xl font-extrabold text-white leading-tight">
                    ₹99
                  </div>
                  <div className="mt-2 text-sm text-gray-200">
                    Limited seats • Mentor-led • Recording access (48h)
                  </div>

                  <div className="mt-4 w-full md:w-auto">
                    <Button
                      onClick={() => window.open("https://rzp.io/rzp/3yDHkted", "_blank")}
                      size="lg"
                      className="w-full md:w-auto bg-white text-navy-900 font-semibold rounded-full px-4 py-3 shadow-sm"
                    >
                      Book Seat
                    </Button>
                  </div>

                  <div className="mt-3 text-xs text-gray-300">
                    Seats left:{" "}
                    <span className="font-semibold text-white">12</span>
                  </div>
                </div>

                <div className="w-full md:w-[1px] bg-white/5 rounded-full md:mx-2 hidden md:block" />

                <div className="flex-1">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-vlsi-600/20 grid place-items-center text-vlsi-600 font-semibold">
                        ⏱
                      </span>
                      <div>
                        <div className="font-semibold text-white">
                          2-hour intensive
                        </div>
                        <div className="text-gray-300 text-xs">
                          Concise, hands-on session
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-vlsi-600/20 grid place-items-center text-vlsi-600 font-semibold">
                        🧪
                      </span>
                      <div>
                        <div className="font-semibold text-white">
                          Simulation files
                        </div>
                        <div className="text-gray-300 text-xs">
                          Example testbenches you keep
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-vlsi-600/20 grid place-items-center text-vlsi-600 font-semibold">
                        🎓
                      </span>
                      <div>
                        <div className="font-semibold text-white">
                          Certificate
                        </div>
                        <div className="text-gray-300 text-xs">
                          Certificate of completion
                        </div>
                      </div>
                    </li>
                  </ul>
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
