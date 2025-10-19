import React from "react";

export default function WorkshopMentor() {
  return (
    <section className="py-16 bg-gradient-to-br from-vlsi-50/40 to-white">
      <div className="container max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
          <img
  src="/mentor.jpg"
  alt="Mentor portrait"
  className="rounded-2xl shadow-xl border-2 border-vlsi-100 object-cover w-full h-[320px]"
/>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 mb-2">
              Tejaswini
            </h2>
            <p className="text-vlsi-700 font-semibold">
              Lead Mentor, Azorix VLSI
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              10+ years training and building verification environments with
              exposure to Synopsys toolchains, IIT-alumni-led teaching
              practices, and hands-on RISC‑V projects. Specializes in
              SystemVerilog, UVM, and simulation methodologies that scale in
              real teams.
            </p>
            <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-xl border bg-white">
                SystemVerilog • UVM
              </div>
              <div className="p-3 rounded-xl border bg-white">
                Synopsys Tooling
              </div>
              <div className="p-3 rounded-xl border bg-white">
                RISC‑V Verification
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
