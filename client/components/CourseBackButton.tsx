import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function CourseBackButton() {
  const handleBackToCourses = () => {
    // First try to go back in history if it was from courses page
    if (window.history.length > 1 && document.referrer.includes("/courses")) {
      window.history.back();
    } else {
      // Otherwise, open courses page in parent window (original tab)
      if (window.opener) {
        window.opener.location.href = "/courses";
        window.close();
      } else {
        // Fallback: navigate to courses page
        window.location.href = "/courses";
      }
    }
  };

  return (
    <div className="fixed top-20 left-4 z-50">
      <Button
        onClick={handleBackToCourses}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-gray-200 hover:border-vlsi-300 transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Courses
      </Button>
    </div>
  );
}
