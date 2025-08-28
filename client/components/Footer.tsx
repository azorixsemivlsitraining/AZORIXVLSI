import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { useBrochureModalContext } from "../contexts/BrochureModalContext";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Download,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const { openModal } = useBrochureModalContext();

  return (
    <footer className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="mb-6">
              <Logo variant="light" size="md" showText={true} />
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Leading VLSI training institute transforming careers through
              expert-led semiconductor design and verification programs. Join
              500+ successful engineers.
            </p>
            <div className="flex space-x-4">
              <Link
                to="#"
                className="w-12 h-12 bg-vlsi-500/20 hover:bg-vlsi-500 rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110 border border-vlsi-500/30"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-vlsi-400 group-hover:text-white transition-colors" />
              </Link>
              <Link
                to="#"
                className="w-12 h-12 bg-vlsi-500/20 hover:bg-vlsi-500 rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110 border border-vlsi-500/30"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-vlsi-400 group-hover:text-white transition-colors" />
              </Link>
              <Link
                to="#"
                className="w-12 h-12 bg-vlsi-500/20 hover:bg-vlsi-500 rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110 border border-vlsi-500/30"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-vlsi-400 group-hover:text-white transition-colors" />
              </Link>
              <Link
                to="#"
                className="w-12 h-12 bg-vlsi-500/20 hover:bg-vlsi-500 rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110 border border-vlsi-500/30"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-vlsi-400 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">
              Important Links
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={openModal}
                  className="text-gray-400 hover:text-vlsi-400 transition-all duration-200 hover:translate-x-1 inline-block flex items-center gap-2 group"
                >
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  Download Brochure
                </button>
              </li>
              <li>
                <Link
                  to="/enroll"
                  className="text-gray-400 hover:text-vlsi-400 transition-all duration-200 hover:translate-x-1 inline-block flex items-center gap-2 group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:animate-bounce" />
                  Enroll Now
                </Link>
              </li>
              <li>
                <Link
                  to="/demo"
                  className="text-gray-400 hover:text-vlsi-400 transition-all duration-200 hover:translate-x-1 inline-block flex items-center gap-2 group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:animate-bounce" />
                  Book Free Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">
              Contact Info
            </h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-vlsi-400 flex-shrink-0" />
                <p>HITEC City, Hyderabad, India</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-vlsi-400 flex-shrink-0" />
                <p>+91 9052653636</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-vlsi-400 flex-shrink-0" />
                <p>info@azorix.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Azorix Technologies Pvt Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-vlsi-400 text-sm transition-colors hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-gray-400 hover:text-vlsi-400 text-sm transition-colors hover:underline"
              >
                Terms of Service
              </Link>
              <Link
                to="/copyright-policy"
                className="text-gray-400 hover:text-vlsi-400 text-sm transition-colors hover:underline"
              >
                Copyright Policy
              </Link>
              <Link
                to="/code-of-conduct"
                className="text-gray-400 hover:text-vlsi-400 text-sm transition-colors hover:underline"
              >
                Code of Conduct
              </Link>
              <Link
                to="/cookie-policy"
                className="text-gray-400 hover:text-vlsi-400 text-sm transition-colors hover:underline"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
