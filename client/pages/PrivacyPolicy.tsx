import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-vlsi-700 to-vlsi-800 text-white py-24">
          <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-vlsi-100 leading-relaxed max-w-3xl mx-auto">
              How we collect, use, and protect your personal information
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                <strong>Effective Date:</strong> January 1, 2024<br />
                <strong>Last Updated:</strong> January 1, 2024
              </p>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Azorix VLSI Technologies Pvt Ltd ("we," "our," or "us") is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                    you visit our website, enroll in our courses, or interact with our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Name, email address, phone number</li>
                    <li>Educational background and qualifications</li>
                    <li>Professional experience and current employment details</li>
                    <li>Course preferences and learning objectives</li>
                    <li>Payment and billing information</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Technical Information</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>IP address, browser type, and device information</li>
                    <li>Website usage data and analytics</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Process course enrollments and manage student accounts</li>
                    <li>Provide educational services and support</li>
                    <li>Communicate about courses, schedules, and updates</li>
                    <li>Process payments and manage billing</li>
                    <li>Provide placement assistance and career services</li>
                    <li>Improve our website and services</li>
                    <li>Send marketing communications (with consent)</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your 
                    information in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>With industry partners for placement opportunities (with your consent)</li>
                    <li>With service providers who assist in our operations</li>
                    <li>When required by law or to protect our rights</li>
                    <li>In case of business transfer or merger</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal 
                    information against unauthorized access, alteration, disclosure, or destruction. However, 
                    no internet-based service is completely secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request data portability</li>
                    <li>Lodge a complaint with supervisory authorities</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We use cookies and similar technologies to enhance your browsing experience, analyze 
                    website traffic, and personalize content. You can manage cookie preferences through 
                    your browser settings.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We retain your personal information for as long as necessary to fulfill the purposes 
                    outlined in this policy, comply with legal obligations, and resolve disputes.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
                  <p className="text-gray-600 leading-relaxed">
                    If you have questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <p className="text-gray-700">
                      <strong>Azorix VLSI Technologies Pvt Ltd</strong><br />
                      Address: Plot No 72, Jubilee Enclave, HITEC City,<br />
                        Backstage pass new building<br />
                        Hyderabad, Telangana 500081<br/>
                      <strong>Email:</strong> privacy@azorix.com<br />
                      <strong>Phone:</strong> +91 9876543210
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any material 
                    changes by posting the updated policy on our website and updating the effective date.
                  </p>
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
