import "./global.css";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import CoursesPage from "./pages/CoursesPage";
import CourseDetail from "./pages/CourseDetail";
import Contact from "./pages/Contact";
import Enroll from "./pages/Enroll";
import Brochure from "./pages/Brochure";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import DemoRegistration from "./pages/DemoRegistration";
import RefundPolicy from "./pages/RefundPolicy";
import CodeOfConduct from "./pages/CodeOfConduct";
import CopyrightPolicy from "./pages/CopyrightPolicy";
import PhonePeReturn from "./pages/PhonePeReturn";
import ComingSoon from "./pages/ComingSoon";
import Team from "./pages/Team";
import { BrochureModalProvider } from "./contexts/BrochureModalContext";
import DemoPopup from "./components/DemoPopup";
import HiddenAdminAccess from "./components/HiddenAdminAccess";
import URLAdminAccess from "./components/URLAdminAccess";
import FloatingButtons from "./components/FloatingButtons";
import DesignVerification from "./pages/courses/DesignVerification";
import Verilog from "./pages/courses/Verilog";
import SystemVerilog from "./pages/courses/SystemVerilog";
import UVM from "./pages/courses/UVM";
import RTLDesign from "./pages/courses/RTLDesign";
import PhysicalDesign from "./pages/courses/PhysicalDesign";
import Workshop from "./pages/Workshop";
import CohortPreview from "./pages/CohortPreview";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrochureModalProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PaymentRedirectHandler />
          <Routes>
            {/* Redirect any "/." prefixed path to the same path without the dot */}
            <Route path="/.:rest*" element={<DotAliasRedirect />} />
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/.admin" element={<Admin />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route
              path="/courses/design-verification"
              element={<DesignVerification />}
            />
            <Route path="/courses/verilog" element={<Verilog />} />
            <Route path="/courses/systemverilog" element={<SystemVerilog />} />
            <Route path="/courses/uvm" element={<UVM />} />
            <Route path="/courses/rtl-design" element={<RTLDesign />} />
            <Route
              path="/courses/physical-design"
              element={<PhysicalDesign />}
            />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/demo" element={<DemoRegistration />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/cohort-preview" element={<CohortPreview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/phonepe-return" element={<PhonePeReturn />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/code-of-conduct" element={<CodeOfConduct />} />
            <Route path="/copyright-policy" element={<CopyrightPolicy />} />
            <Route path="/courses/rtl" element={<ComingSoon />} />
            <Route path="/courses/pd" element={<ComingSoon />} />
            <Route path="/team" element={<Team />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <HiddenAdminAccess />
          <URLAdminAccess />
          <FloatingButtons />
          <DemoPopup />
        </BrowserRouter>
      </BrochureModalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

function DotAliasRedirect() {
  const location = useLocation();
  const originalPath = location.pathname;
  const normalized = originalPath.startsWith("/.")
    ? originalPath.replace("/.", "/")
    : originalPath;
  return <Navigate to={normalized} replace />;
}

function PaymentRedirectHandler() {
  const location = useLocation();
  const navigate =
    (window as any).__navigate ||
    ((path) => window.history.replaceState({}, "", path));

  React.useEffect(() => {
    (async () => {
      try {
        const url = new URL(window.location.href);
        const txn = url.searchParams.get("txn");
        const email = url.searchParams.get("email");
        const sig = url.searchParams.get("sig");
        const purpose = url.searchParams.get("purpose") || "workshop";

        if (!txn || !email || !sig) return;

        // Build confirm endpoint based on purpose
        const endpoint =
          purpose === "cohort"
            ? `/api/payment/cohort/confirm?txn=${encodeURIComponent(txn)}&email=${encodeURIComponent(email)}&sig=${encodeURIComponent(sig)}`
            : purpose === "dv"
              ? `/api/payment/dv/confirm?txn=${encodeURIComponent(txn)}&email=${encodeURIComponent(email)}&sig=${encodeURIComponent(sig)}`
              : `/api/payment/workshop/confirm?txn=${encodeURIComponent(txn)}&email=${encodeURIComponent(email)}&sig=${encodeURIComponent(sig)}`;

        try {
          const res = await fetch(endpoint);
          const data = await res.json().catch(() => null);
          if (res.ok && data?.success) {
            if (data.accessToken) {
              try {
                localStorage.setItem("azorix_token", data.accessToken);
              } catch {}
            }
            try {
              localStorage.setItem("azorix_email", email);
            } catch {}

            // Navigate to demo page and signal it to show the video
            window.location.href = "/demo?showDemo=1";
          }
        } catch (e) {
          // ignore
        }
      } catch (e) {
        // ignore
      }
    })();
    // run on location change
  }, [location]);

  return null;
}

// Prevent multiple root creation during HMR
const container = document.getElementById("root")!;
let root = (globalThis as any).__react_root__;

if (!root) {
  root = createRoot(container);
  (globalThis as any).__react_root__ = root;
}

root.render(<App />);
