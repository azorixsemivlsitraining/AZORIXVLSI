import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Refund & Cancellation Policy
              </h1>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-6">
                  <strong>Effective Date:</strong> January 1, 2025<br />
                  <strong>Last Updated:</strong> January 1, 2025
                </p>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Refund Policy</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Cancellation Before Start Date</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                      <li>Cancellation 30+ days before course start: 90% refund (10% processing fee)</li>
                      <li>Cancellation 15-29 days before course start: 75% refund</li>
                      <li>Cancellation 7-14 days before course start: 50% refund</li>
                      <li>Cancellation less than 7 days before course start: 25% refund</li>
                      <li>No-show or cancellation on start date: No refund</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Cancellation After Start Date</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                      <li>Within first 7 days of course: 50% refund (minus any materials provided)</li>
                      <li>After 7 days but within 2 weeks: 25% refund</li>
                      <li>After 2 weeks: No refund</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Special Circumstances</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Medical emergencies with proper documentation: Case-by-case review</li>
                      <li>Course cancellation by Azorix VLSI: 100% refund or transfer to next batch</li>
                      <li>Technical issues preventing course delivery: 100% refund or makeup sessions</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cancellation Process</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">How to Cancel</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                      <li>Send written request to: <strong>refunds@azorix.com</strong></li>
                      <li>Include: Full name, course name, enrollment date, reason for cancellation</li>
                      <li>Provide original payment receipt or transaction ID</li>
                      <li>Submit request from registered email address</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Processing Time</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Refund requests processed within 7-10 business days</li>
                      <li>Refunds credited to original payment method within 15-20 business days</li>
                      <li>For cash payments: Refund by cheque or bank transfer</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Non-Refundable Items</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Registration/Application fees</li>
                      <li>Course materials once delivered (books, software licenses, etc.)</li>
                      <li>Certification fees</li>
                      <li>Late payment penalties</li>
                      <li>Administrative charges</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Transfer Policy</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Transfer</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                      <li>One-time transfer to next available batch allowed</li>
                      <li>Transfer request must be made 48 hours before course start</li>
                      <li>Subject to seat availability in requested batch</li>
                      <li>Transfer fee: ₹1,000 (waived for medical emergencies)</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Mode Transfer</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Online to Offline: Allowed with additional fee (if applicable)</li>
                      <li>Offline to Online: Allowed, price difference refunded</li>
                      <li>Subject to course availability and instructor approval</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment Plan Cancellations</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Installment payments: Refund calculated on amount paid to date</li>
                      <li>Outstanding installments must be settled before refund processing</li>
                      <li>Early settlement discount applies to remaining amount</li>
                      <li>No refund if less than 25% of course fee has been paid</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Placement Guarantee Courses</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Special refund terms apply as per placement guarantee agreement</li>
                      <li>Refund eligibility subject to course completion and attendance criteria</li>
                      <li>Student must actively participate in placement activities</li>
                      <li>Refund claims must be made within specified guarantee period</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Force Majeure</h2>
                    <p className="text-gray-600 mb-4">
                      In case of events beyond our control (natural disasters, government restrictions, 
                      pandemics, etc.), we reserve the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Postpone course delivery without penalty</li>
                      <li>Offer alternative delivery methods (online/offline)</li>
                      <li>Provide course credits valid for 12 months</li>
                      <li>Refund on a case-by-case basis</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Dispute Resolution</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>All refund disputes will be handled through mediation first</li>
                      <li>Escalations can be made to management within 30 days</li>
                      <li>Final decisions rest with Azorix VLSI management</li>
                      <li>Legal jurisdiction: Hyderabad, Telangana, India</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-gray-700 mb-2">
                        <strong>Refunds Department:</strong><br />
                        Email: refunds@azorix.com<br />
                        Phone: +91 7981391412<br />
                        Address: Plot No 102,103, Temple Lane, Mythri Nagar,<br/> 
                        Mathrusri Nagar, K.v.rangareddy, Serilingampally,<br/>
                        Hyderabad, Telangana 500049<br/>
                      </p>
                      <p className="text-gray-600 text-sm mt-4">
                        For faster processing, please include your enrollment number and 
                        original payment receipt with all refund requests.
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notes</h3>
                    <ul className="list-disc pl-6 space-y-1 text-yellow-700 text-sm">
                      <li>This policy is subject to change with 30 days notice</li>
                      <li>Refund amounts are calculated before applicable taxes</li>
                      <li>Bank charges for refund transactions may be deducted</li>
                      <li>International students may have different refund timelines</li>
                    </ul>
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
