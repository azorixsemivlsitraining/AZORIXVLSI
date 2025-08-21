import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Code of Conduct & Student Policy
              </h1>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-6">
                  <strong>Effective Date:</strong> January 1, 2025<br />
                  <strong>Last Updated:</strong> January 1, 2025
                </p>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Academic Integrity</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Honest Academic Work</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                      <li>All assignments and projects must be your own original work</li>
                      <li>Collaboration is encouraged where explicitly permitted</li>
                      <li>Proper citation required for any external resources used</li>
                      <li>Plagiarism in any form will result in course dismissal</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Examination Conduct</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>No unauthorized materials during assessments</li>
                      <li>No communication with other students during exams</li>
                      <li>Report any suspicious activity to instructors immediately</li>
                      <li>Follow all technical guidelines for online assessments</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Attendance Policy</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Minimum Attendance Requirements</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                      <li>Minimum 80% attendance required for course completion</li>
                      <li>Late arrivals (&gt;15 minutes) counted as absent</li>
                      <li>Make-up sessions available for excused absences only</li>
                      <li>Medical leave requires proper documentation</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Punctuality</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Classes begin promptly at scheduled time</li>
                      <li>Notify instructors in advance for known absences</li>
                      <li>Return from breaks within allotted time</li>
                      <li>Respect others' learning by minimizing disruptions</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Classroom Behavior</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Respectful Conduct</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                      <li>Treat all students, instructors, and staff with respect</li>
                      <li>No discriminatory language or behavior of any kind</li>
                      <li>Listen actively and participate constructively</li>
                      <li>Maintain professional demeanor at all times</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Technology Usage</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Electronic devices for educational purposes only during class</li>
                      <li>Silence mobile phones and notifications</li>
                      <li>No recording without explicit instructor permission</li>
                      <li>Use institute equipment responsibly and carefully</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Communication Guidelines</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Communication</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                      <li>Use appropriate language in all communications</li>
                      <li>Email responses within 24-48 hours for course-related queries</li>
                      <li>Follow proper channels for complaints and grievances</li>
                      <li>Maintain confidentiality of sensitive information</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Online Platform Etiquette</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Use real names and professional profile pictures</li>
                      <li>Stay on topic during online discussions</li>
                      <li>Be constructive in feedback and criticism</li>
                      <li>Report inappropriate behavior to moderators</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Facility Usage</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Laboratory and Equipment</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                      <li>Follow all safety protocols and procedures</li>
                      <li>Report damaged equipment immediately</li>
                      <li>No food or drinks in computer laboratories</li>
                      <li>Log off and clean workspace after each session</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Common Areas</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Keep common areas clean and organized</li>
                      <li>Respect others' study space and noise levels</li>
                      <li>Dispose of waste in designated receptacles</li>
                      <li>Follow building security and access protocols</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Materials</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                      <li>Course content is proprietary to Azorix VLSI</li>
                      <li>No unauthorized sharing or distribution of materials</li>
                      <li>Personal use only - not for commercial purposes</li>
                      <li>Respect copyrights of third-party content</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Student Work</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Students retain rights to their original work</li>
                      <li>Institute may use student work for promotional purposes with consent</li>
                      <li>Collaborative projects require clear ownership agreements</li>
                      <li>Industry project work may have specific IP clauses</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Assessment and Evaluation</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Grading Standards</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                      <li>Assessments based on clearly defined criteria</li>
                      <li>Timely feedback provided on all submissions</li>
                      <li>Grade disputes must be raised within 7 days</li>
                      <li>Re-evaluation requests require written justification</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Assignment Submission</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Submit all work by specified deadlines</li>
                      <li>Late submissions may incur grade penalties</li>
                      <li>Extensions granted only for exceptional circumstances</li>
                      <li>Follow specified format and submission guidelines</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Safety and Security</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Safety</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                      <li>Follow all emergency procedures and protocols</li>
                      <li>Report safety hazards immediately</li>
                      <li>Wear appropriate attire and safety equipment</li>
                      <li>No weapons or dangerous items on premises</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Information Security</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Protect login credentials and personal information</li>
                      <li>No sharing of access credentials with others</li>
                      <li>Report security breaches immediately</li>
                      <li>Follow data protection and privacy guidelines</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Violation Consequences</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Progressive Discipline</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                      <li><strong>First Offense:</strong> Verbal warning and counseling</li>
                      <li><strong>Second Offense:</strong> Written warning and probation</li>
                      <li><strong>Third Offense:</strong> Suspension from course</li>
                      <li><strong>Severe Violations:</strong> Immediate dismissal</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Appeal Process</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Written appeals must be submitted within 7 days</li>
                      <li>Appeals reviewed by academic committee</li>
                      <li>Decision communicated within 14 days</li>
                      <li>Final appeal to institute management</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Student Rights</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Right to quality education and instruction</li>
                      <li>Right to fair and unbiased evaluation</li>
                      <li>Right to privacy and confidentiality</li>
                      <li>Right to express opinions and provide feedback</li>
                      <li>Right to appeal decisions through proper channels</li>
                      <li>Right to access academic records and transcripts</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-gray-700 mb-2">
                        <strong>Student Affairs Office:</strong><br />
                        Email: studentaffairs@azorix.com<br />
                        Phone: +91 7981391412<br />
                        Address: 3rd Floor, Tech Park Building<br />
                        HITEC City, Hyderabad, Telangana 500081
                      </p>
                      <p className="text-gray-600 text-sm mt-4">
                        For grievances, violations, or policy clarifications, 
                        contact the Student Affairs Office during business hours (9 AM - 6 PM).
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Acknowledgment</h3>
                    <p className="text-blue-700 text-sm">
                      By enrolling in any course at Azorix VLSI, students acknowledge they have 
                      read, understood, and agree to abide by this Code of Conduct and Student Policy. 
                      Violations may result in disciplinary action up to and including dismissal 
                      from the program.
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
