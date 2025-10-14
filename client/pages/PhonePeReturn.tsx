import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function PhonePeReturn() {
  const [status, setStatus] = useState<string>("Processing payment...");

  useEffect(() => {
    const url = new URL(window.location.href);
    const purpose = url.searchParams.get("purpose") || "";
    const txn = url.searchParams.get("txn") || "";
    const email = url.searchParams.get("email") || "";
    const sig = url.searchParams.get("sig") || "";

    async function run() {
      try {
        const endpoint =
          purpose === "cohort"
            ? `/api/payment/cohort/confirm?txn=${encodeURIComponent(txn)}&email=${encodeURIComponent(email)}&sig=${encodeURIComponent(sig)}`
            : purpose === "dv"
              ? `/api/payment/dv/confirm?txn=${encodeURIComponent(txn)}&email=${encodeURIComponent(email)}&sig=${encodeURIComponent(sig)}`
              : `/api/payment/workshop/confirm?txn=${encodeURIComponent(txn)}&email=${encodeURIComponent(email)}&sig=${encodeURIComponent(sig)}`;
        const res = await fetch(endpoint);
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.success)
          throw new Error(data?.message || "Payment verification failed");
        if (data.accessToken) {
          localStorage.setItem("azorix_email", email);
          localStorage.setItem("azorix_token", data.accessToken);
        }
        setStatus("Payment verified successfully.");
        setTimeout(() => {
          if (purpose === "cohort") window.location.href = "/cohort-preview";
          else if (purpose === "dv")
            window.location.href = "/courses/design-verification";
          else window.location.href = "/demo";
        }, 1000);
      } catch (e: any) {
        setStatus(e?.message || "Payment verification failed");
      }
    }

    if (txn && email && sig) run();
    else setStatus("Missing parameters in redirect URL.");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-16">
        <h1 className="text-2xl font-bold mb-2">PhonePe Payment</h1>
        <p className="text-muted-foreground mb-6">{status}</p>
        <div className="flex gap-3">
          <Button onClick={() => (window.location.href = "/")}>Go Home</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
