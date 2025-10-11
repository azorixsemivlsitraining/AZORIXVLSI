import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import type { DashboardResourcesResponse } from "@shared/api";

export default function Dashboard() {
  const [data, setData] = useState<DashboardResourcesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("azorix_email") || "";
    const token = localStorage.getItem("azorix_token") || "";
    if (!email || !token) {
      setError("Access denied. Please complete registration.");
      return;
    }
    fetch(`/api/dashboard/resources?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then((j) => setData(j))
      .catch((e) => setError(e.message || "Failed to load resources"));
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Learning Dashboard | Azorix VLSI"
        description="Access your workshop and cohort resources."
        canonical="https://azorixtech.com/dashboard"
        keywords="dashboard, resources, Azorix VLSI"
      />
      <Header />
      <main className="container max-w-3xl py-10">
        <h1 className="text-3xl font-bold mb-6">Learning Dashboard</h1>
        {error && <div className="p-4 border rounded-md bg-destructive/10 text-destructive">{error}</div>}
        {!error && !data && <p>Loading...</p>}
        {data && (
          <div className="space-y-4">
            {data.resources.map((r, idx) => (
              <div key={idx} className="p-4 border rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{r.title}</p>
                    {r.expiresAt && (
                      <p className="text-xs text-muted-foreground">Expires: {new Date(r.expiresAt).toLocaleString()}</p>
                    )}
                  </div>
                  <a className="text-primary underline" href={r.url} target="_blank" rel="noreferrer">Open</a>
                </div>
              </div>
            ))}
            {data.upsellLink && (
              <div className="p-4 border rounded-md bg-secondary">
                <p className="mb-2">Ready for the full experience?</p>
                <a className="underline" href={data.upsellLink}>Upgrade to Core Cohort</a>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
