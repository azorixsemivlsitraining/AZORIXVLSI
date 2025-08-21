import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EnhancedAdminDashboard from "../components/EnhancedAdminDashboard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

// Simple password protection for admin access
const ADMIN_PASSWORD = "azorix2024"; // In a real app, this would be handled securely

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password. Please try again.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setError("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  System Access
                </h1>
                <p className="text-gray-600">
                  Enter access credentials to continue
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                    placeholder="Enter admin password"
                    required
                  />
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
                >
                  Access System
                </Button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-vlsi-700 to-vlsi-800 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="flex justify-between items-start"
              style={{ paddingTop: "15px" }}
            >
              <div className="pt-4">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Data Management System
                </h1>
                <p className="text-xl text-vlsi-100">
                  Form submissions and data export tools
                </p>
              </div>

              {/* Logout button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="mt-6 px-5 py-2 border-2 border-white text-white bg-transparent cursor-pointer"
              >
                Logout
              </Button>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <EnhancedAdminDashboard />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
