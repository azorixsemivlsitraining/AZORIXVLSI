import React from "react";

const testimonials = [
  {
    quote:
      "The ₹99 session cleared my doubts on race conditions and improved my testbench quality immediately.",
    name: "Ananya, DV Intern",
  },
  {
    quote:
      "Fork-join and constraints were explained so clearly. Helped me crack a screening test the same week.",
    name: "Praveen, Graduate Trainee",
  },
  {
    quote:
      "Practical focus with examples—exactly what I needed to connect theory to real simulation flows.",
    name: "Sahil, Junior Engineer",
  },
];

export default function WorkshopTestimonials() {
  return (
    <section className="py-16">
      <div className="container max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900">
            What learners say
          </h2>
          <p className="text-gray-600 mt-2">
            Rated 4.8/5 �� Alumni placed across semiconductor roles
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border-2 border-vlsi-100 bg-white p-6 shadow-sm"
            >
              <div className="text-yellow-500">★★★★★</div>
              <blockquote className="mt-3 text-gray-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-gray-500">
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
