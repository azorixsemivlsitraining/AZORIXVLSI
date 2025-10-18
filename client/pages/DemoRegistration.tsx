import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import Footer from "../components/Footer";
import { useToast } from "../hooks/use-toast";
import { saveDemoToStorage } from "../lib/excelExporter";
import {
  saveDemoRegistration,
  DemoRegistrationData as SupabaseDemoData,
} from "../lib/supabase";
import { RefreshCw } from "lucide-react";
import Swal from "sweetalert2";

// Workshop sections
import WorkshopHero from "@/components/workshop/Hero";
import WorkshopLearn from "@/components/workshop/Learn";
import WorkshopAbout from "@/components/workshop/About";
import WorkshopMentor from "@/components/workshop/Mentor";
import WorkshopTestimonials from "@/components/workshop/Testimonials";
import WorkshopFAQs from "@/components/workshop/FAQs";

interface DemoRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseCategory: string;
  preferredLocation: string;
  comments: string;
  verificationCode: string;
  whatsappOptIn?: boolean;
}

// -------- VIDEO EMBED --------
function toEmbedUrl(url: string) {
  try {
    const ytShort = /https:\/\/youtu\.be\/(.+)/i.exec(url);
    if (ytShort)
      return `https://www.youtube.com/embed/${ytShort[1]}?enablejsapi=1`;
    const ytWatch = /v=([\w-]+)/i.exec(url);
    if (ytWatch)
      return `https://www.youtube.com/embed/${ytWatch[1]}?enablejsapi=1`;
    return url;
  } catch {
    return url;
  }
}

export default function DemoRegistration() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [formData, setFormData] = useState<DemoRegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    courseCategory: "",
    preferredLocation: "",
    comments: "",
    verificationCode: "",
    whatsappOptIn: true,
  });

  // -------- CAPTCHA --------
  const generateCaptcha = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);

  const [displayedCaptcha, setDisplayedCaptcha] = useState(() =>
    generateCaptcha(),
  );

  // Auto-refresh captcha every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedCaptcha(generateCaptcha());
      setFormData((prev) => ({ ...prev, verificationCode: "" }));
    }, 30000);
    return () => clearInterval(interval);
  }, [generateCaptcha]);

  const refreshCaptcha = () => {
    setDisplayedCaptcha(generateCaptcha());
    setFormData((prev) => ({ ...prev, verificationCode: "" }));
    toast({
      title: "Captcha Refreshed",
      description: "Please enter the new code.",
    });
  };

  const handleInputChange = (
    field: keyof DemoRegistrationData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value as any }));
  };

  // Load video if user has completed payment
  useEffect(() => {
    (async () => {
      if (typeof window === "undefined") return;

      const url = new URL(window.location.href);
      const txn = url.searchParams.get("txn");
      const emailParam = url.searchParams.get("email");
      const sig = url.searchParams.get("sig");
      const showDemo = url.searchParams.get("showDemo");

      // Force demo video
      if (showDemo === "1" && !videoUrl) {
        const urlToken = url.searchParams.get("token");
        if (urlToken) {
          try {
            localStorage.setItem("azorix_token", urlToken);
            localStorage.setItem(
              "azorix_email",
              url.searchParams.get("email") || "",
            );
            setAccessToken(urlToken);
          } catch {}
        }
        toast({
          title: "Payment Complete",
          description: "Opening demo video.",
        });
        setVideoUrl("https://www.youtube.com/watch?v=sx4l4OqdpEI");
        return;
      }

      // Confirm payment if redirected with params
      if (txn && emailParam && sig && !videoUrl) {
        try {
          const endpoint = `/api/payment/workshop/confirm?txn=${encodeURIComponent(
            txn,
          )}&email=${encodeURIComponent(emailParam)}&sig=${encodeURIComponent(sig)}`;

          const res = await fetch(endpoint);
          const data = await res.json().catch(() => null);

          if (res.ok && data?.success) {
            if (data.accessToken)
              localStorage.setItem("azorix_token", data.accessToken);
            localStorage.setItem("azorix_email", emailParam);

            toast({
              title: "Payment Verified",
              description: "Loading demo video...",
            });
            setVideoUrl("https://www.youtube.com/watch?v=sx4l4OqdpEI");
            return;
          }
        } catch (err) {
          console.warn("Payment confirmation failed:", err);
        }

        // If immediate confirm failed (common when PhonePe redirects inside iframe), poll the server status endpoint with exponential backoff
        try {
          let attempts = 0;
          const maxAttempts = 10;
          const maxDelay = 8000;
          const pollOnce = async (delay: number) => {
            await new Promise((r) => setTimeout(r, delay));
            attempts++;
            try {
              const st = await fetch(
                `/api/payment/status?txn=${encodeURIComponent(txn)}&email=${encodeURIComponent(emailParam)}`,
              );
              const sd = await st.json().catch(() => null);
              if (st.ok && sd?.success) {
                if (sd.accessToken) {
                  localStorage.setItem("azorix_token", sd.accessToken);
                  localStorage.setItem("azorix_email", emailParam);
                }
                toast({
                  title: "Payment Verified",
                  description: "Loading demo video...",
                });
                setVideoUrl("https://www.youtube.com/watch?v=sx4l4OqdpEI");
                return true;
              }
            } catch (e) {
              // ignore network
            }
            if (attempts >= maxAttempts) return false;
            const nextDelay = Math.min(maxDelay, Math.pow(2, attempts) * 1000);
            return await pollOnce(nextDelay);
          };
          // kick off with small initial delay
          const success = await pollOnce(500);
          if (!success) {
            toast({
              title: "Payment pending",
              description:
                "We couldn't verify payment automatically. Please check your email for confirmation.",
            });
          }
        } catch (e) {
          console.warn("Polling failed", e);
        }
      }

      // Fallback: token already stored
      const token = localStorage.getItem("azorix_token");
      const email = localStorage.getItem("azorix_email");
      if (token && email && !videoUrl) {
        toast({
          title: "Payment Successful",
          description: "Accessing your demo video now.",
        });
        setVideoUrl("https://www.youtube.com/watch?v=sx4l4OqdpEI");
      }
    })();
  }, [videoUrl, toast]);

  // Initialize YouTube Player
  useEffect(() => {
    if (!videoUrl) return;
    const embed = toEmbedUrl(videoUrl);
    if (embed.includes("youtube.com/embed") && typeof window !== "undefined") {
      const win = window as any;

      const createPlayer = () => {
        if (!win.YT || !win.YT.Player) return;
        playerRef.current = new win.YT.Player(iframeRef.current, {
          events: {
            onStateChange: (e: any) => {
              if (e.data === win.YT.PlayerState.ENDED) {
                localStorage.setItem(
                  "azorix_prefill",
                  JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                  }),
                );
                navigate("/cohort-preview");
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
    }

    return () => {
      if (playerRef.current?.destroy) playerRef.current.destroy();
      playerRef.current = null;
    };
  }, [videoUrl, formData, navigate]);

  // -------- FORM SUBMIT --------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
        confirmButtonColor: "#0d9488",
      });
    }

    if (formData.verificationCode !== displayedCaptcha) {
      return Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: "Please enter the correct verification code.",
        confirmButtonColor: "#0d9488",
      });
    }

    setIsSubmitting(true);
    try {
      // Verify email via API (non-blocking)
      try {
        const verifyRes = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
        if (verifyRes.ok) {
          const v = await verifyRes.json().catch(() => ({ ok: true }));
          if (!v.ok) {
            const proceed = await Swal.fire({
              icon: "warning",
              title: "Email may be undeliverable",
              text: "Do you want to proceed anyway?",
              showCancelButton: true,
              confirmButtonText: "Proceed",
              cancelButtonText: "Edit Email",
              confirmButtonColor: "#0d9488",
            });
            if (!proceed.isConfirmed) {
              setIsSubmitting(false);
              return;
            }
          }
        }
      } catch (err) {
        console.warn("Email verification failed:", err);
      }

      // Payment Body
      const paymentBody = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        domainInterest: formData.courseCategory || "General",
        whatsappOptIn: formData.whatsappOptIn,
      };

      // PhonePe flow
      try {
        const pp = await fetch("/api/payment/workshop/pay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentBody),
        });
        const ppData = await pp.json().catch(() => null);
        if (pp.ok && ppData?.redirectUrl) {
          window.location.href = ppData.redirectUrl;
          return;
        }
        if (!pp.ok && ppData?.message) {
          await Swal.fire({
            icon: "error",
            title: "Payment Error",
            text: ppData.message,
            confirmButtonColor: "#0d9488",
          });
          setIsSubmitting(false);
          return;
        }
      } catch {}

      // Dummy payment fallback
      const res = await fetch("/api/payment/workshop/dummy-pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentBody),
      });
      const data = await res.json();

      if (!res.ok || !data?.success)
        throw new Error(data?.message || "Payment failed");

      // Save to Supabase
      try {
        const demoData: SupabaseDemoData = {
          ...formData,
        };
        await saveDemoRegistration(demoData);
      } catch {}

      // Save locally
      saveDemoToStorage(formData);

      if (data.accessToken) {
        localStorage.setItem("azorix_email", formData.email);
        localStorage.setItem("azorix_token", data.accessToken);
        setAccessToken(data.accessToken);
      }

      toast({
        title: "Registration Complete",
        description: "Payment successful. Loading demo video...",
      });
      setVideoUrl("https://www.youtube.com/watch?v=sx4l4OqdpEI");

      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your demo is ready. Watch the video to continue to the 3-hour preview.",
        confirmButtonColor: "#0d9488",
      });

      localStorage.setItem(
        "azorix_prefill",
        JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
        }),
      );

      setFormData((prev) => ({ ...prev, verificationCode: "" }));
      setDisplayedCaptcha(generateCaptcha());
    } catch (err: any) {
      console.error("Demo registration error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.message || "Registration failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------- JSX --------
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full px-4 py-3">
          <div className="flex items-center justify-between w-full bg-transparent py-2">
            <div className="flex items-center gap-4 max-w-7xl mx-auto w-full px-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F1b9c62c1213140709e07580a4ee1f322%2Fbf5d0ebb5d4b4a1d84182413a96183fd?format=webp&width=800"
                alt="Azorix VLSI"
                className="h-12 md:h-14 w-auto"
              />
              <div>
                <div className="flex items-baseline gap-3">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">₹99 workshop</h1>
                  <span className="text-xs md:text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">Only ₹99</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">Live workshop • Mentor-led • Recording access</p>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <a
                  href="https://rzp.io/rzp/plKYtrp5"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-vlsi-500 to-vlsi-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
                  aria-label="Enroll Now"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* spacer to prevent content overlap with fixed header */}
      <div className="h-16 md:h-20" />

      <main className="pt-8">
        <WorkshopHero />
        <WorkshopLearn />
        <WorkshopAbout />
        <WorkshopMentor />
        <WorkshopTestimonials />
        <WorkshopFAQs />

        {/* Orange Get Started card placed after FAQs */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <a
                href="https://rzp.io/rzp/plKYtrp5"
                target="_blank"
                rel="noreferrer"
                className="w-full md:w-1/2 rounded-3xl p-12 text-center shadow-2xl bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 cursor-pointer hover:scale-102 transition-transform"
              >
                <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                  Get Started for ₹99
                </h2>
                <p className="mt-3 text-white/90">Secure your spot — limited seats</p>
              </a>
            </div>
          </div>
        </section>

        {/* Demo Info */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What to Expect in Your ₹99 workshop
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get a taste of our comprehensive VLSI training program and see
                why 500+ students chose us.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-vlsi-50 rounded-lg">
                <div className="w-16 h-16 bg-vlsi-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  📚
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Curriculum Overview
                </h3>
                <p className="text-gray-600">
                  Complete walkthrough of our Design Verification program
                  structure and modules.
                </p>
              </div>
              <div className="text-center p-6 bg-vlsi-50 rounded-lg">
                <div className="w-16 h-16 bg-vlsi-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  🛠️
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Hands-on Session
                </h3>
                <p className="text-gray-600">
                  Live demonstration of industry-standard tools and real-world
                  projects.
                </p>
              </div>
              <div className="text-center p-6 bg-vlsi-50 rounded-lg">
                <div className="w-16 h-16 bg-vlsi-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  💼
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Career Guidance
                </h3>
                <p className="text-gray-600">
                  Insights into VLSI career paths, job opportunities, and
                  placement support.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
