import React from "react";
import { Check } from "lucide-react";

const items = [
  {
    title: "Simulation event regions",
    desc: "Avoid race conditions by understanding the scheduler.",
  },
  {
    title: "Blocking vs non-blocking",
    desc: "Write robust primitives and timing-correct RTL/testbench code.",
  },
  {
    title: "Fork-join",
    desc: "Master concurrency for scalable, deterministic testbenches.",
  },
  {
    title: "Randomization & constraints",
    desc: "Ace hiring tests with clean constraints and coverage-driven thinking.",
  },
];

export default function WorkshopLearn() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-vlsi-50/30">
      <div className="container max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 bg-vlsi-100 rounded-full text-vlsi-700 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-vlsi-500 rounded-full mr-2" /> What
            you’ll learn
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900">
            Be job-ready on day one
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              className="p-6 rounded-2xl border-2 border-vlsi-100 bg-white shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 w-9 h-9 rounded-full bg-vlsi-100 text-vlsi-700 grid place-items-center">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-900">
                    {it.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{it.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
