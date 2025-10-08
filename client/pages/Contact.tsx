import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { saveContactData } from "../lib/supabase";
import { saveContactToStorage } from "../lib/excelExporter";
import { sendContactFormToSheets } from "../lib/googleSheetsService";
import Swal from "sweetalert2";

const contactInfo = {
  address: {
    main: "Azorix VLSI  ",
    smain: "Azorix Technologies Pvt.Ltd",

    street: "Plot No 102,103, Temple Lane, Mythri Nagar,, ",
    area: "Mathrusri Nagar, K.v.rangareddy, Serilingampally,",
    city: "Hyderabad, Telangana 500049",
    country: "India",
  },
  phone: {
    primary: "+91 9052653636",
    secondary: "+91 9052633636",
    
  },
  email: {
    general: "info@azorixvlsi.com",
    admissions: "admissions@azorixvlsi.com",
    support: "support@azorixvlsi.com",
    careers: "careers@azorixvlsi.com",
  },
  hours: {
    weekdays: "Monday - Friday: 9:00 AM - 7:00 PM",
    saturday: "Saturday: Closed",
    sunday: "Sunday: Closed",
  },
  social: {
    linkedin: "https://linkedin.com/company/azorix-vlsi",
    twitter: "https://twitter.com/azorixvlsi",
    facebook: "https://facebook.com/azorixvlsi",
    youtube: "https://youtube.com/azorixvlsi",
  },
};

const faqs = [
  {
    question: "What is the duration of the VLSI course?",
    answer:
      "Our comprehensive Design Verification (DV) course is 8 months long, covering all essential modules from Verilog to advanced verification methodologies.",
  },
  {
    question: "Do you provide placement assistance?",
    answer:
      "Yes, we provide 2 years of placement assistance including resume building, interview preparation, and direct connections with our 50+ industry partners.",
  },
  {
    question: "What are the prerequisites for the course?",
    answer:
      "You need a B.E/B.Tech or M.E/M.Tech degree in ECE, EEE, or related fields with basic understanding of digital electronics. No prior coding experience is required.",
  },
  {
    question: "Are the classes online or offline?",
    answer:
      "We offer both online and offline classes. You can choose your preferred mode during enrollment, and we also provide hybrid options.",
  },
  {
    question: "What tools and software will I learn?",
    answer:
      "You'll learn industry-standard EDA tools including ModelSim, QuestaSim, VCS, Synopsys tools, and Cadence verification tools used in real industry projects.",
  },
  {
    question: "Is there any financial assistance available?",
    answer:
      "Yes, we offer various financial assistance options including installment plans, early bird discounts, and scholarships for deserving candidates.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiryType: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message ||
      !formData.inquiryType
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields.",
        confirmButtonColor: "#0d9488",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Save to localStorage for Excel export
      saveContactToStorage(formData);

      // Send to Google Sheets automatically
      try {
        await sendContactFormToSheets(formData);
        console.log("Contact form data sent to Google Sheets successfully");
      } catch (sheetsError) {
        console.warn(
          "Failed to sync with Google Sheets (data still saved locally):",
          sheetsError,
        );
      }

      // Try to save to Supabase (optional)
      try {
        await saveContactData(formData);
      } catch (dbError) {
        console.warn(
          "Failed to save to database (data still saved locally):",
          dbError,
        );
      }

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for your message! We will get back to you within 24 hours.",
        confirmButtonColor: "#0d9488",
        timer: 5000,
        showConfirmButton: true,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        inquiryType: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      Swal.fire({
        icon: "error",
        title: "Message Error",
        text: `There was an error sending your message: ${error.message || "Unknown error"}. Please try again or contact us directly at info@azorix.com or +91 9876543210.`,
        confirmButtonColor: "#0d9488",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Contact Azorix VLSI | Best Semiconductor & VLSI Institute in Hyderabad"
        description="Have questions about our VLSI & semiconductor courses? Contact Azorix VLSI Hyderabad today for admissions, training details, and placement guidance."
        canonical="https://azorixtech.com/contact"
        keywords="Contact Azorix VLSI, VLSI institute Hyderabad contact, semiconductor training contact, admissions, placement guidance, VLSI courses inquiry"
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-vlsi-700 to-vlsi-800 text-white py-16">
          <div className="max-w-4xl mx-auto pt-5 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-vlsi-100 leading-relaxed max-w-3xl mx-auto">
              Have questions about our VLSI training programs? We're here to
              help you start your journey in semiconductor verification.
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Get in Touch
                </h2>

                {/* Address */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-3">📍</span> Our Location
                  </h3>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="space-y-2 text-gray-600">
                      <div className="font-semibold text-gray-900">
                        {contactInfo.address.main}
                      </div>
                      <div className="font-semibold text-gray-700">
                        {contactInfo.address.smain}
                      </div>

                      <div>{contactInfo.address.street}</div>
                      <div>{contactInfo.address.area}</div>
                      <div>{contactInfo.address.city}</div>
                      <div>{contactInfo.address.country}</div>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-3">📞</span> Phone Numbers
                  </h3>
                  <div className="bg-white p-6 rounded-lg shadow-sm space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Primary:</span>
                      <a
                        href={`tel:${contactInfo.phone.primary}`}
                        className="text-vlsi-600 font-medium hover:underline"
                      >
                        {contactInfo.phone.primary}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Secondary:</span>
                      <a
                        href={`tel:${contactInfo.phone.secondary}`}
                        className="text-vlsi-600 font-medium hover:underline"
                      >
                        {contactInfo.phone.secondary}
                      </a>
                    </div>
                    
                  </div>
                </div>

                {/* Email */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-3">✉️</span> Email Addresses
                  </h3>
                  <div className="bg-white p-6 rounded-lg shadow-sm space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">General Inquiries:</span>
                      <a
                        href={`mailto:${contactInfo.email.general}`}
                        className="text-vlsi-600 font-medium hover:underline"
                      >
                        {contactInfo.email.general}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Admissions:</span>
                      <a
                        href={`mailto:${contactInfo.email.admissions}`}
                        className="text-vlsi-600 font-medium hover:underline"
                      >
                        {contactInfo.email.admissions}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Support:</span>
                      <a
                        href={`mailto:${contactInfo.email.support}`}
                        className="text-vlsi-600 font-medium hover:underline"
                      >
                        {contactInfo.email.support}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Careers:</span>
                      <a
                        href={`mailto:${contactInfo.email.careers}`}
                        className="text-vlsi-600 font-medium hover:underline"
                      >
                        {contactInfo.email.careers}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-3">🕒</span> Office Hours
                  </h3>
                  <div className="bg-white p-6 rounded-lg shadow-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weekdays:</span>
                      <span className="font-medium">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday:</span>
                      <span className="font-medium text-red-600">Closed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday:</span>
                      <span className="font-medium text-red-600">Closed</span>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-3">🌐</span> Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href={contactInfo.social.linkedin}
                      className="text-vlsi-600 hover:text-vlsi-700 transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={contactInfo.social.twitter}
                      className="text-vlsi-600 hover:text-vlsi-700 transition-colors"
                    >
                      Twitter
                    </a>
                    <a
                      href={contactInfo.social.facebook}
                      className="text-vlsi-600 hover:text-vlsi-700 transition-colors"
                    >
                      Facebook
                    </a>
                    <a
                      href={contactInfo.social.youtube}
                      className="text-vlsi-600 hover:text-vlsi-700 transition-colors"
                    >
                      YouTube
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div id="contact-form">
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                        className="mt-1"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
                          className="mt-1"
                          placeholder=""
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="mt-1"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type *</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("inquiryType", value)
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="course-info">
                            Course Information
                          </SelectItem>
                          <SelectItem value="enrollment">
                            Enrollment Process
                          </SelectItem>
                          <SelectItem value="fees">Fees & Payment</SelectItem>
                          <SelectItem value="placement">
                            Placement Support
                          </SelectItem>
                          <SelectItem value="schedule">
                            Class Schedule
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        required
                        className="mt-1"
                        placeholder="Brief subject of your inquiry"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        required
                        className="mt-1"
                        rows={5}
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      size="lg"
                      className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Find answers to common questions about our VLSI training
                programs
              </p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Visit Our Campus
              </h2>
              <p className="text-lg text-gray-600">
                Located in the heart of Hyderabad's IT corridor
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {/* Interactive Google Map */}
              <div className="mb-6">
                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1902.654284473667!2d78.34529508884089!3d17.4927775458531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9267acba612f%3A0xa3caf6980786c818!2z4KSu4KWI4KSk4KWN4KSw4KWAIOCkqOCkl-CksCwg4KSu4KSm4KS_4KSo4KS-4KSX4KWB4KSm4KS-LCDgpLngpYjgpKbgpLDgpL7gpKzgpL7gpKYsIOCkpOClh-CksuCkguCkl-CkvuCkqOCkviA1MDAwNDk!5e0!3m2!1shi!2sin!4v1759903743994!5m2!1shi!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  title="Azorix VLSI Location - Jubilee Enclave, HITEC City"
                ></iframe> */}
              </div>

              {/* Location Details */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Azorix Technologies Pvt Ltd
                </h3>
                <p className="text-gray-600 mb-4">
                  Plot No 102,103, Temple Lane, Mythri Nagar,<br/> 
                  Mathrusri Nagar, K.v.rangareddy, Serilingampally, <br/>
                  
                  Hyderabad, Telangana 500049, India
                </p>
                {/* <a
                  href="https://maps.app.goo.gl/Y8y8PqK97gkQiNJH9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-vlsi-600 hover:text-vlsi-700 font-medium"
                >
                  📍 Open in Google Maps
                </a> */}
              </div>

              {/* Transportation Options */}
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🚌</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Bus Stop</h4>
                  <p className="text-sm text-gray-600">
                    Serlingampalli Bus Stop
                    <br />
                    <span className="font-medium text-vlsi-600">
                      6 min walk
                    </span>
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🚆</div>
                  <h4 className="font-semibold text-gray-900 mb-1">MMTS</h4>
                  <p className="text-sm text-gray-600">
                    Lingampally Railway Station
                    <br />
                    <span className="font-medium text-vlsi-600">
                      1km
                    </span>
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🅿️</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Parking</h4>
                  <p className="text-sm text-gray-600">
                    Free parking available
                    <br />
                    <span className="font-medium text-vlsi-600">
                      Secure area
                    </span>
                  </p>
                </div>
              </div>

              {/* Nearby Landmarks */}
              <div className="mt-6 p-4 bg-vlsi-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 text-center">
                  Nearby Landmarks
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                  <div className="text-center">
                    <span className="font-medium">🏞️Mytrinagar Park</span>
                    <div>1.5 km</div>
                  </div>
                  <div className="text-center">
                    <span className="font-medium">🏢 Genpact</span>
                    <div>2 km </div>
                  </div>
                  <div className="text-center">
                    <span className="font-medium"> 🏢Cognizant Technology Solutions</span>
                    <div>2.2 km</div>
                  </div>
                  <div className="text-center">
                    <span className="font-medium">🎓 Sri Chaitanya Junior College</span>
                    <div>1 km</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
