import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { PaymentResponse, WorkshopRegistrationRequest } from "@shared/api";

export default function WorkshopCTA() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PaymentResponse | null>(null);
  const [form, setForm] = useState<WorkshopRegistrationRequest>({
    name: "",
    email: "",
    phone: "",
    domainInterest: "Verification",
    whatsappOptIn: true,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/payment/workshop/dummy-pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: PaymentResponse = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Payment failed");
      setResult(data);
      if (data.accessToken) {
        localStorage.setItem("azorix_email", form.email);
        localStorage.setItem("azorix_token", data.accessToken);
      }
      toast({ title: "Registered!", description: "You're in. Check your email/WhatsApp for the link." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Payment failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="py-16 bg-gradient-to-br from-navy-900 to-navy-800">
      <div className="container max-w-5xl text-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Get Started for ₹99</h2>
            <p className="mt-3 text-gray-300">Secure UPI/Card payments • Instant confirmation • Reminders via email/WhatsApp</p>
            <ul className="mt-6 space-y-2 text-gray-200 text-sm list-disc pl-5">
              <li>Confirmation email with workshop link</li>
              <li>Reminder 2 hours and 15 minutes before the session</li>
              <li>48-hour access to recording and resources</li>
            </ul>
            {result?.success && (
              <div className="mt-6 p-4 rounded-xl border border-white/20 bg-white/10">
                <p className="mb-2">Payment successful. Access granted for 48 hours.</p>
                {result.meetingUrl && (
                  <p className="mb-2">Join link: <a className="underline" href={result.meetingUrl} target="_blank" rel="noreferrer">{result.meetingUrl}</a></p>
                )}
                <div className="flex gap-3">
                  <a className="underline" href="/dashboard">Go to Dashboard</a>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={onSubmit} className="bg-white rounded-2xl p-6 border-2 border-vlsi-100 text-navy-900 shadow-xl">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm mb-1" htmlFor="name">Name</label>
                <input id="name" name="name" value={form.name} onChange={onChange} required className="w-full border rounded-md p-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={onChange} required className="w-full border rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm mb-1" htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" value={form.phone} onChange={onChange} required className="w-full border rounded-md p-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1" htmlFor="domainInterest">Domain Interest</label>
                <select id="domainInterest" name="domainInterest" value={form.domainInterest} onChange={onChange} className="w-full border rounded-md p-2">
                  <option>Verification</option>
                  <option>PD</option>
                  <option>DFT</option>
                  <option>Analog</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="whatsappOptIn" checked={!!form.whatsappOptIn} onChange={onChange} />
                Get reminders & tips via WhatsApp
              </label>
              <Button type="submit" disabled={loading} className="mt-2 bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white">
                {loading ? "Processing..." : "Pay ₹99 and Reserve Seat"}
              </Button>
              <p className="text-xs text-gray-500">By continuing you agree to our <a className="underline" href="/terms-of-service">Terms</a> and <a className="underline" href="/privacy-policy">Privacy Policy</a>.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
