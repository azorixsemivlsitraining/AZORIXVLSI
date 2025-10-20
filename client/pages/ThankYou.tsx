import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import MetaPixel from "../components/MetaPixel";
import { Button } from "../components/ui/button";

export default function ThankYou() {
  const whatsapp = "https://wa.me/919052653636?text=Hi%2C%20I%20have%20joined%20the%20Azorix%20VLSI%20workshop%20community";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MetaPixel id="1384755712984854" />

      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Thank you for registering!</h1>
          <p className="text-gray-600 mb-6">
            Your ₹99 workshop registration is successful. Check your email for details and access instructions.
          </p>

          <div className="space-y-4">
            <a href={whatsapp} target="_blank" rel="noreferrer noopener">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">
                Join the WhatsApp Community
              </Button>
            </a>

            <Link to="/" className="block">
              <Button className="w-full border border-gray-200 bg-white text-gray-700 py-3 rounded-lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
