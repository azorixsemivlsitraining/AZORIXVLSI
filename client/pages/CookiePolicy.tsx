import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-vlsi-700 to-vlsi-800 text-white py-24">
          <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-xl text-vlsi-100 leading-relaxed max-w-3xl mx-auto">
              How we use cookies and similar technologies on our website
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Cookies are small text files that are stored on your device when you visit our website. 
                    They help us provide you with a better browsing experience by remembering your preferences 
                    and understanding how you interact with our site.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Essential Cookies</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    These cookies are necessary for the website to function properly:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Session management and user authentication</li>
                    <li>Form submission and error handling</li>
                    <li>Security and fraud prevention</li>
                    <li>Load balancing and website stability</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">Analytics Cookies</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    These help us understand how visitors interact with our website:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Page views and user journey tracking</li>
                    <li>Performance monitoring and optimization</li>
                    <li>Popular content identification</li>
                    <li>Website usage statistics</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">Functional Cookies</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    These enhance your experience by remembering your preferences:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Language and region preferences</li>
                    <li>Form data retention</li>
                    <li>Accessibility settings</li>
                    <li>Course selection and wishlist items</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">Marketing Cookies</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    These help us deliver relevant content and advertisements:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Interest-based advertising</li>
                    <li>Social media integration</li>
                    <li>Campaign effectiveness measurement</li>
                    <li>Retargeting and remarketing</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Third-Party Cookies</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We may use third-party services that place cookies on your device:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li><strong>Google Analytics:</strong> Website traffic analysis and user behavior insights</li>
                    <li><strong>Google Ads:</strong> Advertising and conversion tracking</li>
                    <li><strong>Facebook Pixel:</strong> Social media advertising and analytics</li>
                    <li><strong>LinkedIn Insights:</strong> Professional network advertising</li>
                    <li><strong>YouTube:</strong> Video content and embedded media</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Use Cookies</h2>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Provide personalized course recommendations</li>
                    <li>Remember your login status and preferences</li>
                    <li>Analyze website performance and user engagement</li>
                    <li>Deliver targeted educational content</li>
                    <li>Improve our services and user experience</li>
                    <li>Prevent fraud and enhance security</li>
                    <li>Measure the effectiveness of our marketing campaigns</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookie Duration</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Session Cookies</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Temporary cookies that are deleted when you close your browser.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Persistent Cookies</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Remain on your device for a set period (ranging from 30 days to 2 years) 
                        or until you delete them manually.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Managing Your Cookie Preferences</h2>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Browser Settings</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You can control cookies through your browser settings:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Block all cookies or specific types</li>
                    <li>Delete existing cookies</li>
                    <li>Receive notifications when cookies are set</li>
                    <li>Enable private/incognito browsing</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">Cookie Banner</h3>
                  <p className="text-gray-600 leading-relaxed">
                    When you first visit our website, you'll see a cookie banner where you can:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Accept all cookies</li>
                    <li>Customize your cookie preferences</li>
                    <li>Reject non-essential cookies</li>
                    <li>Learn more about our cookie practices</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Impact of Disabling Cookies</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Disabling cookies may affect your experience on our website:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Some features may not work properly</li>
                    <li>You may need to re-enter information repeatedly</li>
                    <li>Personalized content may not be available</li>
                    <li>Course recommendations may be less relevant</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Updates to This Policy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may update this Cookie Policy from time to time to reflect changes in our 
                    practices or legal requirements. We will notify you of significant changes 
                    through our website or other appropriate channels.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
                  <p className="text-gray-600 leading-relaxed">
                    If you have questions about our use of cookies, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <p className="text-gray-700">
                      <strong>Azorix VLSI Technologies Pvt Ltd</strong><br />
                      Address: Plot No 72, Jubilee Enclave, HITEC City,<br />
                        Backstage pass new building<br />
                        Hyderabad, Telangana 500081<br />
                      <strong>Email:</strong> privacy@azorix.com<br />
                      <strong>Phone:</strong> +91 9876543210
                    </p>
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
