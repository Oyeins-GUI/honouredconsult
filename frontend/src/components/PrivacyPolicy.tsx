import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function PrivacyPolicy() {
   const handleBookConsultation = () => {
      // Handle consultation booking
   };

   return (
      <div className="min-h-screen mt-16">
         <Navbar onBookConsultation={handleBookConsultation} />

         <main className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">
               Privacy Policy
            </h1>

            <div className="prose prose-lg max-w-none">
               <p className="text-sm text-muted-foreground mb-8">
                  Last updated: {new Date().toLocaleDateString()}
               </p>

               <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                     1. Introduction
                  </h2>
                  <p>
                     Honoured Consult ("we," "us," or "our") is committed to
                     protecting your privacy and personal data in compliance
                     with the Nigeria Data Protection Regulation (NDPR) 2019 and
                     other applicable Nigerian laws. This Privacy Policy
                     explains how we collect, use, disclose, and safeguard your
                     information when you use our study abroad consulting
                     services.
                  </p>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                     2. Information We Collect
                  </h2>
                  <h3 className="text-xl font-medium mb-2">
                     2.1 Personal Information
                  </h3>
                  <p>We may collect the following personal information:</p>
                  <ul className="list-disc pl-6 mb-4">
                     <li>Name, email address, phone number</li>
                     <li>Educational background and qualifications</li>
                     <li>Passport and visa information</li>
                     <li>
                        Financial information for scholarship and funding
                        purposes
                     </li>
                     <li>Communication records with our consultants</li>
                  </ul>

                  <h3 className="text-xl font-medium mb-2">2.2 Usage Data</h3>
                  <p>
                     We automatically collect certain information when you use
                     our website:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                     <li>IP address and location data</li>
                     <li>Browser type and version</li>
                     <li>Pages visited and time spent on our site</li>
                     <li>Device information</li>
                  </ul>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                     3. How We Use Your Information
                  </h2>
                  <p>We use your personal data for the following purposes:</p>
                  <ul className="list-disc pl-6 mb-4">
                     <li>To provide study abroad consulting services</li>
                     <li>
                        To communicate with you about your applications and
                        consultations
                     </li>
                     <li>To process payments and manage your account</li>
                     <li>To improve our services and website functionality</li>
                     <li>
                        To comply with legal obligations under Nigerian law
                     </li>
                     <li>
                        To send you relevant information about study
                        opportunities
                     </li>
                  </ul>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                     4. Legal Basis for Processing
                  </h2>
                  <p>Under the NDPR, we process your data based on:</p>
                  <ul className="list-disc pl-6 mb-4">
                     <li>
                        <strong>Consent:</strong> When you explicitly agree to
                        our data processing
                     </li>
                     <li>
                        <strong>Contract:</strong> To perform our consulting
                        services agreement
                     </li>
                     <li>
                        <strong>Legal Obligation:</strong> To comply with
                        Nigerian laws and regulations
                     </li>
                     <li>
                        <strong>Legitimate Interest:</strong> To improve our
                        services and communicate with you
                     </li>
                  </ul>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                     5. Data Sharing and Disclosure
                  </h2>
                  <p>We may share your information with:</p>
                  <ul className="list-disc pl-6 mb-4">
                     <li>
                        Educational institutions and immigration authorities as
                        required for your applications
                     </li>
                     <li>
                        Service providers who assist us in delivering our
                        services
                     </li>
                     <li>Legal authorities when required by Nigerian law</li>
                     <li>With your explicit consent for specific purposes</li>
                  </ul>
                  <p>We do not sell your personal data to third parties.</p>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                     6. Data Security
                  </h2>
                  <p>
                     We implement appropriate technical and organizational
                     measures to protect your personal data against unauthorized
                     access, alteration, disclosure, or destruction, in
                     accordance with NDPR requirements. This includes
                     encryption, access controls, and regular security
                     assessments.
                  </p>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                     7. Data Retention
                  </h2>
                  <p>
                     We retain your personal data only as long as necessary for
                     the purposes outlined in this policy or as required by
                     Nigerian law. Typically, we retain consultation records for
                     7 years after service completion, in line with regulatory
                     requirements.
                  </p>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                     8. Your Data Protection Rights
                  </h2>
                  <p>Under the NDPR, you have the following rights:</p>
                  <ul className="list-disc pl-6 mb-4">
                     <li>
                        <strong>Right to Access:</strong> Request copies of your
                        personal data
                     </li>
                     <li>
                        <strong>Right to Rectification:</strong> Correct
                        inaccurate or incomplete data
                     </li>
                     <li>
                        <strong>Right to Erasure:</strong> Request deletion of
                        your data under certain conditions
                     </li>
                     <li>
                        <strong>Right to Restriction:</strong> Limit processing
                        of your data
                     </li>
                     <li>
                        <strong>Right to Data Portability:</strong> Receive your
                        data in a structured format
                     </li>
                     <li>
                        <strong>Right to Object:</strong> Object to processing
                        based on legitimate interests
                     </li>
                     <li>
                        <strong>Right to Withdraw Consent:</strong> Withdraw
                        consent at any time
                     </li>
                  </ul>
                  <p>
                     To exercise these rights, contact us at
                     privacy@honouredconsult.com
                  </p>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                     9. International Data Transfers
                  </h2>
                  <p>
                     As a study abroad consultancy, we may transfer data
                     internationally to educational institutions abroad. We
                     ensure such transfers comply with NDPR requirements and
                     implement appropriate safeguards.
                  </p>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                     10. Cookies and Tracking
                  </h2>
                  <p>
                     We use cookies and similar technologies to enhance your
                     experience on our website. For detailed information, please
                     see our Cookie Policy.
                  </p>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                     11. Changes to This Policy
                  </h2>
                  <p>
                     We may update this Privacy Policy periodically. We will
                     notify you of any material changes by email or through our
                     website. Your continued use of our services constitutes
                     acceptance of the updated policy.
                  </p>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                     12. Contact Us
                  </h2>
                  <p>
                     If you have any questions about this Privacy Policy or our
                     data practices, please contact our Data Protection Officer
                     at:
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                     <p>
                        <strong>Honoured Consult</strong>
                     </p>
                     <p>Email: privacy@honouredconsult.com</p>
                     <p>Phone: +234 706 838 5111</p>
                     <p>Address: [Company Address], Nigeria</p>
                  </div>
               </section>

               <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">
                     13. Complaints
                  </h2>
                  <p>
                     If you believe we have violated your data protection
                     rights, you may lodge a complaint with the National
                     Information Technology Development Agency (NITDA) at
                     complaints@nitda.gov.ng or through their official channels.
                  </p>
               </section>
            </div>
         </main>

         <Footer onBookConsultation={handleBookConsultation} />
      </div>
   );
}
