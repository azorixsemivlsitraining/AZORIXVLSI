import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="sm"
          className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white shadow-2xl hover:shadow-vlsi-500/25 transition-all duration-300 transform hover:scale-110 border border-vlsi-400/50 backdrop-blur-sm`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
}
