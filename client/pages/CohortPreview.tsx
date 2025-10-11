import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { CohortEnrollmentRequest, PaymentResponse } from "@shared/api";

export default function CohortPreview() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PaymentResponse | null>(null);
  const [form, setForm] = useState<CohortEnrollmentRequest>({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("azorix_prefill");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed) {
          setForm((f) => ({ ...f, name: parsed.name || f.name, email: parsed.email || f.email }));
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/payment/cohort/dummy-pay", {
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
      toast({ title: "Enrolled!", description: "Welcome to the 3-day cohort." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Payment failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Cohort Preview (3 days) | Azorix VLSI"
        description="Join the 3-day cohort preview for ₹1,999. Get assignments, TA support, and community access."
        canonical="https://azorixtech.com/cohort-preview"
        keywords="VLSI cohort, cohort preview, Azorix VLSI"
      />
      <Header />
      <main className="container max-w-3xl py-10">
        <h1 className="text-3xl font-bold mb-2">Core Cohort Preview — ₹1,999 (3 days)</h1>
        <p className="text-muted-foreground mb-6">Convert warm buyers into serious learners. Includes live sessions, assignments, TA support, and community.</p>

        <section className="mb-6 p-4 rounded-md border bg-card">
          <h2 className="text-xl font-semibold mb-2">Offer</h2>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>3 live sessions</li>
            <li>Assignments and TA support</li>
            <li>Community forum access</li>
            <li>Discovery call booking (Calendly)</li>
          </ul>
        </section>

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
              <input id="phone" name="phone" value={form.phone || ""} onChange={onChange} className="w-full border rounded-md p-2" />
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Register for ₹1,999"}
          </Button>
        </form>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">3-hour Preview Video</h2>
          <a className="text-primary underline" href="https://youtu.be/YE-JrestfRw?si=5B2Wp9y4bBAS4Jx6" target="_blank" rel="noreferrer">Watch now</a>
        </section>

        {result?.success && (
          <div className="mt-8 p-4 border rounded-md bg-secondary">
            <p className="mb-2">Enrollment successful.</p>
            {result.meetingUrl && (
              <p className="mb-2">Cohort link: <a className="underline" href={result.meetingUrl} target="_blank" rel="noreferrer">{result.meetingUrl}</a></p>
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
