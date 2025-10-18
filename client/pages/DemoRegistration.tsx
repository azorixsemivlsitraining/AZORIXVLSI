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
import Header from "../components/Header";
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
      <Header />
      <main className="pt-20">
        <WorkshopHero />
        <WorkshopLearn />
        <WorkshopAbout />
        <WorkshopMentor />
        <WorkshopTestimonials />
        <WorkshopFAQs />

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left CTA */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  document.documentElement.classList.add("smooth-scroll");
                  document
                    .getElementById("demo-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                  setTimeout(
                    () =>
                      document.documentElement.classList.remove(
                        "smooth-scroll",
                      ),
                    1000,
                  );
                }}
                onKeyDown={(e) =>
                  e.key === "Enter" || e.key === " "
                    ? (e.target as HTMLElement).click()
                    : null
                }
                className="rounded-3xl p-12 text-center shadow-2xl bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 cursor-pointer"
              >
                <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                  Get Started for ₹99
                </h2>
              </div>

              {/* Right Form */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Register Now
                  </h3>
                </div>

                {!videoUrl ? (
                  <form
                    id="demo-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name Inputs */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="bg-white/90 border-none rounded-full px-4 py-3"
                        required
                      />
                      <Input
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="bg-white/90 border-none rounded-full px-4 py-3"
                        required
                      />
                    </div>

                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="bg-white/90 border-none rounded-full px-4 py-3"
                      required
                    />
                    <Input
                      type="tel"
                      placeholder="+91 Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="bg-white/90 border-none rounded-full px-4 py-3"
                      required
                    />

                    {/* Selects */}
                    <Select
                      value={formData.courseCategory}
                      onValueChange={(val) =>
                        handleInputChange("courseCategory", val)
                      }
                    >
                      <SelectTrigger className="bg-white/90 border-none rounded-full px-4 py-3">
                        <SelectValue placeholder="Select Course Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dv-course">
                          Design Verification (DV)
                        </SelectItem>
                        <SelectItem value="pcie">
                          PCIe Specialization
                        </SelectItem>
                        <SelectItem value="soc">SoC Integration</SelectItem>
                        <SelectItem value="ip">
                          IP Block Verification
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={formData.preferredLocation}
                      onValueChange={(val) =>
                        handleInputChange("preferredLocation", val)
                      }
                    >
                      <SelectTrigger className="bg-white/90 border-none rounded-full px-4 py-3">
                        <SelectValue placeholder="Preferred Training Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">
                          Offline (HITEC City)
                        </SelectItem>
                        <SelectItem value="hybrid">
                          Hybrid (Online + Offline)
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Textarea
                      placeholder="Comments / Inquiry"
                      value={formData.comments}
                      onChange={(e) =>
                        handleInputChange("comments", e.target.value)
                      }
                      className="bg-white/90 border-none rounded-lg px-4 py-3 min-h-[80px]"
                    />

                    {/* Captcha */}
                    <div>
                      <Label className="text-white mb-2 block">
                        Verification Code *
                      </Label>
                      <div className="grid grid-cols-2 gap-4 items-center">
                        <div className="bg-white rounded-lg p-4 text-center relative">
                          <span className="text-2xl font-bold text-gray-800 tracking-widest">
                            {displayedCaptcha}
                          </span>
                          <Button
                            type="button"
                            onClick={refreshCaptcha}
                            className="absolute top-2 right-2 p-1 h-6 w-6 bg-gray-200 hover:bg-gray-300 text-gray-600"
                            variant="ghost"
                            size="sm"
                          >
                            <RefreshCw className="w-3 h-3" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Enter the code above"
                          value={formData.verificationCode}
                          onChange={(e) =>
                            handleInputChange(
                              "verificationCode",
                              e.target.value,
                            )
                          }
                          className="bg-white/90 border-none rounded-full px-4 py-3"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-300 mt-1">
                        Captcha refreshes automatically every 30 seconds
                      </p>
                      <label className="flex items-center gap-2 text-sm text-gray-300 mt-3">
                        <input
                          type="checkbox"
                          checked={!!formData.whatsappOptIn}
                          onChange={(e) =>
                            handleInputChange("whatsappOptIn", e.target.checked)
                          }
                          className="w-4 h-4 rounded"
                        />
                        <span>Get reminders & tips via WhatsApp</span>
                      </label>
                    </div>

                    <Button
                      type="button"
                      onClick={() =>
                        (window.location.href =
                          "https://razorpay.com/payment-link/plink_RTQLrhqb2nkVV0")
                      }
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {isSubmitting ? "Processing..." : "Get Started for ₹99"}
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-white text-xl font-semibold text-center mb-2">
                      Your Demo Video
                    </h3>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      {toEmbedUrl(videoUrl).includes("youtube.com/embed") ? (
                        <iframe
                          ref={(el) => (iframeRef.current = el)}
                          id="azorix-demo-player"
                          className="w-full h-full"
                          src={toEmbedUrl(videoUrl)}
                          allow="autoplay; encrypted-media"
                        />
                      ) : (
                        <video
                          className="w-full h-full"
                          controls
                          onEnded={() => navigate("/cohort-preview")}
                        >
                          <source src={videoUrl} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                    <div className="text-center">
                      <Button
                        onClick={() => navigate("/cohort-preview")}
                        className="bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white font-semibold px-6"
                      >
                        Proceed to 3hrs Class
                      </Button>
                    </div>
                  </div>
                )}
              </div>
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
