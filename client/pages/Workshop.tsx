import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { PaymentResponse, WorkshopRegistrationRequest } from "@shared/api";

export default function Workshop() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PaymentResponse | null>(null);
  const [form, setForm] = useState<WorkshopRegistrationRequest>({
    name: "",
    email: "",
    phone: "",
    domainInterest: "Verification",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
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
      toast({ title: "Registered!", description: "You're in. Check your email for details." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Payment failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="₹99 VLSI Workshop | Azorix VLSI"
        description="Join the Rs 99 VLSI workshop. Learn fundamentals and get resources for 48 hours."
        canonical="https://azorixtech.com/workshop"
        keywords="VLSI workshop, 99 rupees, Azorix VLSI"
      />
      <Header />
      <main className="container max-w-3xl py-10">
        <h1 className="text-3xl font-bold mb-6">Hook Offer — Rs 99 Workshop</h1>
        <p className="text-muted-foreground mb-6">Automated payment and onboarding flow with instant access to workshop resources.</p>

        <form onSubmit={onSubmit} className="space-y-4 bg-card p-6 rounded-lg border">
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
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Register for ₹99"}
          </Button>
        </form>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">Free Demo</h2>
          <p className="text-sm text-muted-foreground">Watch our demo to get started:</p>
          <a className="text-primary underline" href="https://youtu.be/sx4l4OqdpEI?si=C9kezDGT7nXF7QnZ" target="_blank" rel="noreferrer">Demo Video</a>
        </section>

        {result?.success && (
          <div className="mt-8 p-4 border rounded-md bg-secondary">
            <p className="mb-2">Payment successful. Access granted for 48 hours.</p>
            {result.meetingUrl && (
              <p className="mb-2">Join link: <a className="underline" href={result.meetingUrl} target="_blank" rel="noreferrer">{result.meetingUrl}</a></p>
            )}
            <div className="flex gap-3">
              <a className="underline" href="/dashboard">Go to Dashboard</a>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
