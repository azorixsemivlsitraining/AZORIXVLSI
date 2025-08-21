import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({
  variant = "dark",
  size = "md",
  showText = true,
}: LogoProps) {
  const sizeClasses = {
    sm: "h-10",
    md: "h-16",
    lg: "h-20",
  };

  // Choose logo based on variant
  const logoSrc = variant === "light"
    ? "https://cdn.builder.io/api/v1/image/assets%2F07ba826074254d3191a55ee32e800a58%2F6cb60bc355e34ca3b95cd4f556d300fc?format=webp&width=800" // New white logo for dark backgrounds
    : "https://cdn.builder.io/api/v1/image/assets%2F430462231a954011a074c42b299f7582%2F3dae1da3868c4223afbd53e588dd5d86?format=webp&width=800"; // Dark logo for light backgrounds

  return (
    <Link to="/" className="flex items-center group relative z-10">
      <div className="relative">
        <img
          src={logoSrc}
          alt="Azorix VLSI"
          className={`${sizeClasses[size]} w-auto transition-all duration-300 group-hover:scale-105 filter drop-shadow-lg`}
        />
        <div className="absolute -inset-2 bg-gradient-to-r from-vlsi-400/20 to-vlsi-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
      </div>
    </Link>
  );
}
