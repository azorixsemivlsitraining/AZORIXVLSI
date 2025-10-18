import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function DemoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Don't show popup on course pages (assuming they're opened in new tabs)
    const isCoursePageInNewTab =
      location.pathname.startsWith("/courses/") && window.opener !== null;

    // Check if user has visited before
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");

    if (!hasVisitedBefore && !isCoursePageInNewTab) {
      // Show popup after 2 seconds for first-time visitors only, but not on course pages in new tabs
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      // Mark that user has visited
      localStorage.getItem("hasVisitedBefore") ||
        localStorage.setItem("hasVisitedBefore", "true");

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closePopup}
      ></div>

      {/* Popup */}
      <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-md mx-3 sm:mx-4 overflow-hidden animate-scale-in">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-10 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 p-4 sm:p-6 md:p-8 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
              <span className="text-xl sm:text-2xl md:text-3xl">🎓</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-2">
              FREE DEMO CLASS!
            </h2>
            <p className="text-orange-100 text-xs sm:text-sm">
              Experience our VLSI training firsthand
            </p>
          </div>

          {/* Background decoration - reduced on mobile */}
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10 sm:-translate-y-12 sm:translate-x-12 md:-translate-y-16 md:translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8 sm:translate-y-10 sm:-translate-x-10 md:translate-y-12 md:-translate-x-12"></div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-4 md:mb-6">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
              Book Your Free Demo Class
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Get a taste of our comprehensive VLSI training program. See our
              teaching methodology, meet our expert instructors, and understand
              why 500+ students chose us.
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 md:mb-6">
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-vlsi-500 rounded-full mr-2 sm:mr-3"></div>
              <span>Live instructor-led session</span>
            </div>
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-vlsi-500 rounded-full mr-2 sm:mr-3"></div>
              <span>Hands-on VLSI tools demonstration</span>
            </div>
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-vlsi-500 rounded-full mr-2 sm:mr-3"></div>
              <span>Career guidance & course overview</span>
            </div>
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-vlsi-500 rounded-full mr-2 sm:mr-3"></div>
              <span>Q&A with industry experts</span>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white font-bold py-2.5 sm:py-3 text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/demo" onClick={closePopup}>
                Book ₹99 Workshop Demo Now
              </Link>
            </Button>

            <Button
              variant="outline"
              onClick={closePopup}
              className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base"
            >
              Maybe Later
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-3 md:mt-4">
            No spam, no commitments. Just great learning experience!
          </p>
        </div>
      </div>
    </div>
  );
}
