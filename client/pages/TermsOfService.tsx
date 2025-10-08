import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-vlsi-700 to-vlsi-800 text-white py-24">
          <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-vlsi-100 leading-relaxed max-w-3xl mx-auto">
              Terms and conditions for using our services and enrolling in our courses
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                    By accessing our website, enrolling in our courses, or using our services, you agree to be 
                    bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Course Enrollment and Fees</h2>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Enrollment Process</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Enrollment is subject to availability and eligibility criteria</li>
                    <li>Application fees, if any, are non-refundable</li>
                    <li>Course confirmation is subject to payment of fees</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Fee Payment</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Course fees must be paid as per the payment schedule</li>
                    <li>Late payment may result in course suspension</li>
                    <li>All fees are exclusive of applicable taxes</li>
                    <li>Payment plans are available for eligible students</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Refund and Cancellation Policy</h2>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Cancellation before course start: 90% refund (processing fees deducted)</li>
                    <li>Cancellation within 7 days of course start: 70% refund</li>
                    <li>Cancellation within 15 days of course start: 50% refund</li>
                    <li>No refund after 15 days of course commencement</li>
                    <li>Medical emergencies may be considered case-by-case</li>
                    <li>Refunds will be processed within 30 business days</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Student Responsibilities</h2>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Attend classes regularly and participate actively</li>
                    <li>Complete assignments and projects on time</li>
                    <li>Maintain professional conduct during classes</li>
                    <li>Respect intellectual property and confidentiality</li>
                    <li>Provide accurate information during enrollment</li>
                    <li>Inform us of any changes in contact information</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Course Content and Materials</h2>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Course materials are for personal use only</li>
                    <li>Sharing, copying, or distributing materials is prohibited</li>
                    <li>Course content may be updated without prior notice</li>
                    <li>Access to materials expires after course completion</li>
                    <li>We reserve the right to modify course curriculum</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Placement Assistance</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We provide placement assistance but do not guarantee job placement:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Placement support is provided for 2 years post-completion</li>
                    <li>Students must actively participate in placement activities</li>
                    <li>Final selection depends on company requirements</li>
                    <li>Placement statistics are based on historical data</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                  <p className="text-gray-600 leading-relaxed">
                    All course content, materials, and intellectual property belong to Azorix VLSI Technologies. 
                    Students are granted limited, non-transferable access for educational purposes only.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Your privacy is important to us. Please refer to our Privacy Policy for information on 
                    how we collect, use, and protect your personal information.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our liability is limited to the course fees paid. We are not liable for indirect, 
                    consequential, or punitive damages. Students participate in courses at their own risk.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Code of Conduct</h2>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Maintain respectful behavior towards instructors and peers</li>
                    <li>Use appropriate language in all communications</li>
                    <li>Report any concerns to the administration</li>
                    <li>Follow lab safety guidelines and equipment protocols</li>
                    <li>Violation may result in course suspension or termination</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
                  <p className="text-gray-600 leading-relaxed">
                    These terms are governed by the laws of India. Any disputes will be subject to the 
                    jurisdiction of courts in Hyderabad, Telangana.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
                  <p className="text-gray-600 leading-relaxed">
                    For questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <p className="text-gray-700">
                      <strong>Azorix VLSI Technologies Pvt Ltd</strong><br />
                      <strong>Address:</strong> Plot No 102,103, Temple Lane, Mythri Nagar,<br/> 
                      Mathrusri Nagar, K.v.rangareddy, Serilingampally,<br/>
                      Hyderabad, Telangana 500049<br/>
                      <strong>Email:</strong> info@azorix.com<br />
                      <strong>Phone:</strong> +91 9052653636
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to modify these terms at any time. Changes will be effective 
                    immediately upon posting on our website. Continued use of our services constitutes 
                    acceptance of the modified terms.
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
