import React, { useEffect, useMemo, useState } from "react";

function getNextSession(): Date {
  const now = new Date();
  const d = new Date(now);
  // Target: Saturday at 19:00 local time
  const targetDow = 6; // 0=Sun .. 6=Sat
  const currentDow = d.getDay();
  let addDays = (targetDow - currentDow + 7) % 7;
  if (addDays === 0 && (d.getHours() > 19 || (d.getHours() === 19 && d.getMinutes() > 0))) {
    addDays = 7;
  }
  d.setDate(d.getDate() + addDays);
  d.setHours(19, 0, 0, 0);
  return d;
}

function useCountdown(target: Date) {
  const [diff, setDiff] = useState<number>(() => target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const total = Math.max(0, diff);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function WorkshopAbout() {
  const target = useMemo(() => getNextSession(), []);
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <section className="py-16">
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 mb-4">About the Workshop</h2>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Duration:</strong> 2 hours, LIVE & interactive</li>
              <li><strong>Suitable for:</strong> ECE grads, junior engineers, upskill seekers</li>
              <li><strong>Limited seats:</strong> Only 50 seats. Book now!</li>
            </ul>
            <div className="mt-6 p-5 rounded-2xl border-2 border-vlsi-100 bg-vlsi-50/40">
              <div className="text-sm text-vlsi-700 font-medium mb-2">Next live session</div>
              <div className="text-xl font-semibold text-navy-900">Saturday, 7:00 PM (local time)</div>
              <div className="mt-4 flex gap-4">
                {[
                  { label: "Days", value: days },
                  { label: "Hours", value: hours },
                  { label: "Minutes", value: minutes },
                  { label: "Seconds", value: seconds },
                ].map((b) => (
                  <div key={b.label} className="min-w-[80px] text-center">
                    <div className="text-3xl font-extrabold text-vlsi-700">{String(b.value).padStart(2, "0")}</div>
                    <div className="text-xs text-gray-600 mt-1">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-vlsi-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-navy-900 mb-3">You’ll walk away with</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Hands-on clarity of event regions, fork-join, and randomization basics</li>
              <li>A checklist to avoid race conditions in your simulations</li>
              <li>Confidence to clear screening tests and interviews</li>
              <li>Recording access for 48 hours + role map PDF</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
