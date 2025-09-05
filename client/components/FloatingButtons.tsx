import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, ChevronUp } from "lucide-react";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    document.documentElement.classList.add('smooth-scroll');
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => document.documentElement.classList.remove('smooth-scroll'), 1000);
  };

  const openWhatsApp = () => {
    const phoneNumber = "919052653636"; // Updated to correct number
    const message = "Hi! I'm interested in your VLSI training programs. Could you please provide more information?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const makeCall = () => {
    window.open("tel:+919390847838", "_self");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col space-y-3">
      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        aria-label="Contact us on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat on WhatsApp
        </div>
      </button>

      {/* Call Button */}
      <button
        onClick={makeCall}
        className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        aria-label="Call us"
        title="Call us"
      >
        <Phone className="w-7 h-7" />
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Call us
        </div>
      </button>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-14 h-14 bg-vlsi-600 hover:bg-vlsi-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group animate-fade-in"
          aria-label="Scroll to top"
          title="Back to top"
        >
          <ChevronUp className="w-7 h-7" />
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Back to top
          </div>
        </button>
      )}
    </div>
  );
}
