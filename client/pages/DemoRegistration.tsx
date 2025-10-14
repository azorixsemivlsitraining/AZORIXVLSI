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

function toEmbedUrl(url: string) {
  try {
    // YouTube short link
    const ytShort = /https:\/\/youtu\.be\/(.+)/i.exec(url);
    if (ytShort)
      return `https://www.youtube.com/embed/${ytShort[1]}?enablejsapi=1`;
    // youtube watch
    const ytWatch = /v=([\w-]+)/i.exec(url);
    if (ytWatch)
      return `https://www.youtube.com/embed/${ytWatch[1]}?enablejsapi=1`;
    // already embed or other
    return url;
  } catch {
    return url;
  }
}

import WorkshopHero from "@/components/workshop/Hero";
import WorkshopLearn from "@/components/workshop/Learn";
import WorkshopAbout from "@/components/workshop/About";
import WorkshopMentor from "@/components/workshop/Mentor";
import WorkshopTestimonials from "@/components/workshop/Testimonials";
import WorkshopFAQs from "@/components/workshop/FAQs";

export default function DemoRegistration() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Generate random captcha
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

  // Manual refresh captcha
  const refreshCaptcha = () => {
    setDisplayedCaptcha(generateCaptcha());
    setFormData((prev) => ({ ...prev, verificationCode: "" }));
    toast({
      title: "Captcha Refreshed",
      description: "Please enter the new verification code.",
    });
  };

  const handleInputChange = (
    field: keyof DemoRegistrationData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value as any }));
  };

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // If user returned from hosted checkout (token stored by PhonePeReturn),
  // auto-display the demo video.
  useEffect(() => {
    try {
      const token = localStorage.getItem("azorix_token");
      const email = localStorage.getItem("azorix_email");
      if (token && email && !videoUrl) {
        toast({
          title: "Payment Successful",
          description: "Accessing your demo video now.",
        });
        setVideoUrl("https://www.youtube.com/watch?v=sx4l4OqdpEI");
      }
    } catch {}
  }, [videoUrl, toast]);

  useEffect(() => {
    if (!videoUrl) return;

    const embed = toEmbedUrl(videoUrl);
    // If youtube, initialize player
    if (embed.includes("youtube.com/embed") && typeof window !== "undefined") {
      const win = window as any;

      const createPlayer = () => {
        try {
          if (!win.YT || !win.YT.Player) return;
          playerRef.current = new win.YT.Player(iframeRef.current, {
            events: {
              onStateChange: (e: any) => {
                // 0 === ended
                if (e.data === win.YT.PlayerState.ENDED) {
                  // store prefill and navigate
                  try {
                    localStorage.setItem(
                      "azorix_prefill",
                      JSON.stringify({
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                      }),
                    );
                  } catch {}
                  navigate("/cohort-preview");
                }
              },
            },
          });
        } catch (e) {
          // ignore
        }
      };

      if (!win.YT) {
        // load script
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
        // attach ready callback
        (win as any).onYouTubeIframeAPIReady = () => {
          createPlayer();
        };
      } else {
        createPlayer();
      }
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy)
        playerRef.current.destroy();
      playerRef.current = null;
    };
  }, [videoUrl, formData, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
        confirmButtonColor: "#0d9488",
      });
      return;
    }

    if (formData.verificationCode !== displayedCaptcha) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: "Please enter the correct verification code.",
        confirmButtonColor: "#0d9488",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Verify email existence via server-side verification API
      try {
        const verifyRes = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
        if (verifyRes.ok) {
          let v: any = null;
          try {
            v = await verifyRes.json();
          } catch (e) {
            console.warn("Email verification returned non-JSON response", e);
            v = { ok: true };
          }
          if (!v.ok) {
            const proceed = await Swal.fire({
              icon: "warning",
              title: "Email looks undeliverable",
              text: "The email you provided may not exist or be undeliverable. Do you want to proceed anyway?",
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
      } catch (e) {
        // If verification fails (service down), allow user to proceed
        console.warn("Email verification failed:", e);
      }

      // Build payment body
      const paymentBody = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        domainInterest: formData.courseCategory || "General",
        whatsappOptIn: formData.whatsappOptIn,
      };

      // Try PhonePe flow first (if configured on server). If redirectUrl is returned, redirect and stop.
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
        // If gateway returned an error while PhonePe is configured, surface it and stop.
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
      } catch (e) {
        // network error: fall through to dummy
      }

      // Fallback to dummy flow for local/testing
      const res = await fetch("/api/payment/workshop/dummy-pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentBody),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch (e) {
        console.warn("Payment endpoint returned non-JSON response", e);
        try {
          const text = await res.text();
          throw new Error(text || "Payment failed (invalid response)");
        } catch (_) {
          throw new Error("Payment failed (invalid response)");
        }
      }

      if (!res.ok || !data?.success)
        throw new Error(data?.message || "Payment failed");

      // Persist registration to demo table as well if available
      try {
        const demoData: SupabaseDemoData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          courseCategory: formData.courseCategory,
          preferredLocation: formData.preferredLocation,
          comments: formData.comments,
          verificationCode: formData.verificationCode,
          // store WhatsApp preference if available
          ...(typeof formData.whatsappOptIn !== "undefined"
            ? { whatsappOptIn: formData.whatsappOptIn }
            : {}),
        };
        await saveDemoRegistration(demoData);
      } catch (e) {
        // non-fatal
      }

      // Save locally as backup
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

      // Show the requested demo video immediately after success
      setVideoUrl("https://www.youtube.com/watch?v=sx4l4OqdpEI");

      // Optionally try to update from dashboard resources (non-blocking)
      try {
        const token = data.accessToken;
        const email = encodeURIComponent(formData.email);
        const tokenEnc = encodeURIComponent(token || "");
        const resourcesRes = await fetch(
          `/api/dashboard/resources?email=${email}&token=${tokenEnc}`,
        );
        if (resourcesRes.ok) {
          const resources = await resourcesRes.json();
          const recording =
            (resources.resources || []).find(
              (r: any) => r.type === "recording",
            ) || resources.resources?.[0];
          if (recording?.url) setVideoUrl(recording.url);
        }
      } catch (err) {
        // ignore; keep the default video
      }

      // show success modal
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your demo is ready. Please watch the video to continue to the 3-hour preview.",
        confirmButtonColor: "#0d9488",
      });

      // store prefill for cohort page
      try {
        localStorage.setItem(
          "azorix_prefill",
          JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
          }),
        );
      } catch {}

      // Reset form inputs (keep video state)
      setFormData((prev) => ({ ...prev, verificationCode: "" }));
      setDisplayedCaptcha(generateCaptcha());
    } catch (error: any) {
      console.error("Demo registration error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.message || "Registration failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20">
        {/* Workshop landing hero + sections moved here */}
        <WorkshopHero />
        <WorkshopLearn />
        <WorkshopAbout />
        <WorkshopMentor />
        <WorkshopTestimonials />
        <WorkshopFAQs />
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Hero Content (image CTA) */}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    (e.target as HTMLElement).click();
                  }
                }}
                className="rounded-3xl p-12 text-center shadow-2xl bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 cursor-pointer"
              >
                <div className="max-w-md mx-auto">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                    Get Started for ₹99
                  </h2>
                </div>
              </div>

              {/* Right Side - Registration Form */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Register Now
                  </h3>
                </div>

                {!videoUrl && (
                  <form
                    id="demo-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="bg-white/90 border-none rounded-full px-4 py-3"
                          required
                        />
                      </div>
                      <div>
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
                    </div>

                    <div>
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
                    </div>

                    <div>
                      <Input
                        type="tel"
                        placeholder="+91  Phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="bg-white/90 border-none rounded-full px-4 py-3"
                        required
                      />
                    </div>

                    <div>
                      <Select
                        value={formData.courseCategory}
                        onValueChange={(value) =>
                          handleInputChange("courseCategory", value)
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
                    </div>

                    <div>
                      <Select
                        value={formData.preferredLocation}
                        onValueChange={(value) =>
                          handleInputChange("preferredLocation", value)
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
                    </div>

                    <div>
                      <Textarea
                        placeholder="Comments / Inquiry"
                        value={formData.comments}
                        onChange={(e) =>
                          handleInputChange("comments", e.target.value)
                        }
                        className="bg-white/90 border-none rounded-lg px-4 py-3 min-h-[80px]"
                      />
                    </div>

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
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {isSubmitting ? "Processing..." : "Get Started for ₹99"}
                    </Button>
                  </form>
                )}

                {videoUrl && (
                  <div className="space-y-4">
                    <h3 className="text-white text-xl font-semibold text-center mb-2">
                      Your Demo Video
                    </h3>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      {toEmbedUrl(videoUrl).includes("youtube.com/embed") ? (
                        // eslint-disable-next-line jsx-a11y/iframe-has-title
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
                        Proceed for 3Hrs Class — Register for ₹1,999
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Demo Class Information */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What to Expect in Your Demo Class
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get a taste of our comprehensive VLSI training program and see
                why 500+ students chose us.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-vlsi-50 rounded-lg">
                <div className="w-16 h-16 bg-vlsi-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📚</span>
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
                  <span className="text-white text-2xl">🛠️</span>
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
                  <span className="text-white text-2xl">💼</span>
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
