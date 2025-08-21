import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, ArrowLeft } from "lucide-react";
import Logo from "./Logo";
import { useBrochureModalContext } from "../contexts/BrochureModalContext";

interface HeaderProps {
  showBackButton?: boolean;
}

export default function Header({ showBackButton = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openModal } = useBrochureModalContext();

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-2xl"
            : "bg-navy-900/30 backdrop-blur-xl border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 relative z-10">
              <Logo
                variant={isScrolled ? "dark" : "light"}
                size="md"
                showText={true}
              />
            </div>

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 rounded-xl group ${
                    location.pathname === item.href
                      ? isScrolled
                        ? "text-vlsi-600 bg-vlsi-50"
                        : "text-vlsi-300 bg-white/10"
                      : isScrolled
                        ? "text-gray-700 hover:text-vlsi-600 hover:bg-vlsi-50/50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {location.pathname === item.href && (
                    <div className="absolute inset-0 bg-gradient-to-r from-vlsi-500/10 to-vlsi-600/10 rounded-xl"></div>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-vlsi-400/0 to-vlsi-600/0 group-hover:from-vlsi-400/5 group-hover:to-vlsi-600/5 transition-all duration-300"></div>
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {showBackButton && (
                <Button
                  onClick={handleBackToCourses}
                  variant="outline"
                  size="sm"
                  className={`transition-all duration-300 font-medium ${
                    isScrolled
                      ? "border-vlsi-600 text-vlsi-600 hover:bg-vlsi-600 hover:text-white hover:border-vlsi-600"
                      : "border-white text-white bg-white/10 hover:bg-white hover:text-navy-900 hover:border-white"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Courses
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={openModal}
                className={`transition-all duration-300 font-medium cta-button-enhanced cta-brochure ${
                  isScrolled
                    ? "border-vlsi-600 text-vlsi-600 hover:bg-vlsi-600 hover:text-white hover:border-vlsi-600"
                    : "border-white text-white bg-white/10 hover:bg-white hover:text-navy-900 hover:border-white"
                }`}
              >
                Download Brochure
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-vlsi-500/25 border border-vlsi-400/50 cta-button-enhanced cta-enroll"
              >
                <Link to="/enroll">Enroll Now</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 transition-colors duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`px-4 py-6 space-y-2 ${
              isScrolled ? "bg-white/95" : "bg-navy-900/95"
            } backdrop-blur-xl border-t ${
              isScrolled ? "border-gray-200/50" : "border-white/10"
            }`}
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  location.pathname === item.href
                    ? isScrolled
                      ? "text-vlsi-600 bg-vlsi-50"
                      : "text-vlsi-300 bg-white/10"
                    : isScrolled
                      ? "text-gray-700 hover:text-vlsi-600 hover:bg-vlsi-50/50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              {showBackButton && (
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleBackToCourses();
                  }}
                  variant="outline"
                  size="sm"
                  className={`w-full font-medium ${
                    isScrolled
                      ? "border-vlsi-600 text-vlsi-600 hover:bg-vlsi-600 hover:text-white"
                      : "border-white text-white bg-white/10 hover:bg-white hover:text-navy-900"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Courses
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openModal();
                }}
                className={`w-full font-medium cta-button-enhanced cta-brochure ${
                  isScrolled
                    ? "border-vlsi-600 text-vlsi-600 hover:bg-vlsi-600 hover:text-white"
                    : "border-white text-white bg-white/10 hover:bg-white hover:text-navy-900"
                }`}
              >
                Download Brochure
              </Button>
              <Button
                asChild
                size="sm"
                className="w-full bg-gradient-to-r from-vlsi-500 to-vlsi-600 hover:from-vlsi-600 hover:to-vlsi-700 text-white cta-button-enhanced cta-enroll"
              >
                <Link to="/enroll" onClick={() => setIsMobileMenuOpen(false)}>
                  Enroll Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
