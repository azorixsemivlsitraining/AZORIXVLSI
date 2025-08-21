import React from "react";
import { Zap, Users, TrendingUp, Wrench } from "lucide-react";

const features = [
  {
    title: "Adaptive Training",
    description:
      "No one-size-fits-all. We mould our training to match your individual strengths, goals, and pace.",
    icon: <Zap className="w-8 h-8" />,
  },
  {
    title: "Industry-Led Mentors",
    description:
      "Guidance from professionals who've built what you dream of — now ready to help you build your own path.",
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: "Career-Focused Growth",
    description:
      "Every course has one goal: to future-proof your skills and fuel long-term success.",
    icon: <TrendingUp className="w-8 h-8" />,
  },
  {
    title: "Hands-on Projects",
    description:
      "Work on real-time design modules like counters, ALUs, FSMs, and memory systems with industry-standard tools.",
    icon: <Wrench className="w-8 h-8" />,
  },
];

export default function WhyAzorix() {
  return (
    <section className="pt-12 pb-24 bg-gradient-to-br from-gray-50 to-vlsi-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-vlsi-100 rounded-full text-vlsi-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-vlsi-500 rounded-full mr-2"></span>
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-navy-900 mb-6">
            Why Azorix VLSI Stands Apart
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            In a world driven by innovation, real change starts with those who
            dare to think deeper, build smarter, and act bolder. We don't just
            prepare you for a job—we equip you to thrive in the semiconductor
            revolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-vlsi-500 to-vlsi-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-vlsi-500 to-vlsi-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-4 group-hover:text-vlsi-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
