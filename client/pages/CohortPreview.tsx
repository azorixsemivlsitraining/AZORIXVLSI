import React, { useEffect, useRef, useState } from "react";
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
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [accessGranted, setAccessGranted] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<any>(null);

  const [form, setForm] = useState<CohortEnrollmentRequest>({
    name: "",
    email: "",
    phone: "",
  });

  // -------- Access Control --------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("access") === "1") {
      setAccessGranted(true);
    } else {
      const token = localStorage.getItem("azorix_token");
      if (token) setAccessGranted(true);
    }
  }, []);

  // -------- Pre-fill Form --------
  useEffect(() => {
    try {
      const raw = localStorage.getItem("azorix_prefill");
      if (raw) {
        const parsed = JSON.parse(raw);
        setForm((f) => ({
          ...f,
          name: parsed.name || f.name,
          email: parsed.email || f.email,
        }));
      }
    } catch {}
  }, []);

  // -------- YouTube Player Handler --------
  useEffect(() => {
    if (!videoUrl || !accessGranted) return;

    const embed = videoUrl.includes("youtu.be")
      ? `https://www.youtube.com/embed/${videoUrl.split("/").pop()}?enablejsapi=1`
      : videoUrl.includes("youtube.com") && !videoUrl.includes("embed")
        ? videoUrl.replace("watch?v=", "embed/") + "?enablejsapi=1"
        : videoUrl;

    const win = window as any;

    const createPlayer = () => {
      if (!win.YT || !win.YT.Player || !iframeRef.current) return;
      playerRef.current = new win.YT.Player(iframeRef.current, {
        events: {
          onStateChange: async (e: any) => {
            if (e.data === win.YT.PlayerState.ENDED) {
              try {
                const token = localStorage.getItem("azorix_token");
                const email = localStorage.getItem("azorix_email");
                await fetch("/api/cohort/complete", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email,
                    token,
                    name: form.name,
                    phone: form.phone,
                  }),
                });
                toast({
                  title: "Registration completed",
                  description: "Your enrollment details were saved.",
                });
              } catch {
                toast({
                  title: "Error",
                  description: "Failed to save enrollment after video.",
                });
              }
            }
          },
        },
      });
    };

    if (!win.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
      (win as any).onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }

    return () => {
      if (playerRef.current?.destroy) playerRef.current.destroy();
      playerRef.current = null;
    };
  }, [videoUrl, accessGranted, form.name, form.phone, toast]);

  // -------- Form Handlers --------
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // PhonePe hosted flow
      try {
        const pp = await fetch("/api/payment/cohort/pay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const ppData = await pp.json().catch(() => null);
        if (pp.ok && ppData?.redirectUrl) {
          window.location.href = ppData.redirectUrl;
          return;
        }
        if (!pp.ok && ppData?.message) {
          toast({ title: "Payment Error", description: ppData.message });
          setLoading(false);
          return;
        }
      } catch {}

      // Fallback dummy payment
      const res = await fetch("/api/payment/cohort/dummy-pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: PaymentResponse = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Payment failed");
      setResult(data);

      if (data.accessToken) {
        localStorage.setItem("azorix_email", form.email);
        localStorage.setItem("azorix_token", data.accessToken);
      }
      toast({
        title: "Payment Successful",
        description: "You can now watch the 3-hour preview.",
      });

      // Fetch preview video
      try {
        const token = encodeURIComponent(data.accessToken || "");
        const email = encodeURIComponent(form.email);
        const r = await fetch(
          `/api/dashboard/resources?email=${email}&token=${token}`,
        );
        if (r.ok) {
          const resources = await r.json();
          const preview =
            (resources.resources || []).find((x: any) =>
              x.title?.toLowerCase().includes("3-hour"),
            ) || resources.resources?.[0];
          setVideoUrl(
            preview?.url ||
              process.env.REACT_APP_COHORT_PREVIEW_VIDEO_URL ||
              "https://youtu.be/YE-JrestfRw",
          );
        } else {
          setVideoUrl("https://youtu.be/YE-JrestfRw");
        }
      } catch {
        setVideoUrl("https://youtu.be/YE-JrestfRw");
      }
      setAccessGranted(true);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Payment failed" });
    } finally {
      setLoading(false);
    }
  };

  if (!accessGranted)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <Header />
        <p className="text-lg text-gray-700">
          Payment required to access cohort preview.
        </p>
        <a href="/cohort-registration" className="mt-4">
          <Button>Register Now</Button>
        </a>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Cohort Preview (3 days) | Azorix VLSI"
        description="Join the 3-day cohort preview for ₹1,999. Get assignments, TA support, and community access."
        canonical="https://www.azorixvlsi.com/cohort-preview"
        keywords="VLSI cohort, cohort preview, Azorix VLSI"
      />
      <Header />
      <main className="container max-w-3xl py-10">
        <h1 className="text-3xl font-bold mb-2">
          Core Cohort Preview — ₹1,999 (3 days)
        </h1>
        <p className="text-muted-foreground mb-6">
          Convert warm buyers into serious learners. Includes live sessions,
          assignments, TA support, and community.
        </p>

        {!result?.success && (
          <form
            onSubmit={onSubmit}
            className="space-y-4 bg-card p-6 rounded-lg border"
          >
            <div>
              <label htmlFor="name" className="block text-sm mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm mb-1">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone || ""}
                  onChange={onChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Register for ₹1,999"}
            </Button>
          </form>
        )}

        {result?.success && videoUrl && (
          <div className="mt-6">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                ref={iframeRef}
                className="w-full h-full"
                src={
                  videoUrl.includes("youtu")
                    ? videoUrl.replace("watch?v=", "embed/") + "?enablejsapi=1"
                    : videoUrl
                }
                allow="autoplay; encrypted-media"
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
