import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer ring */}
        <div
          className={`${sizeClasses[size]} rounded-full border-2 border-vlsi-200 absolute`}
        ></div>

        {/* Inner spinning ring */}
        <div
          className={`${sizeClasses[size]} rounded-full border-2 border-transparent border-t-vlsi-500 border-r-vlsi-500 animate-spin`}
        ></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-vlsi-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
