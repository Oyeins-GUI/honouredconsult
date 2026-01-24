import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export function TermsOfService() {
  const handleBookConsultation = () => {
    // Handle consultation booking
  }

  return (
    <div className="min-h-screen">
      <Navbar onBookConsultation={handleBookConsultation} />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Honoured Consult. These Terms of Service ("Terms") govern your use of our website, services, and any related applications (collectively, the "Service") provided by Honoured Consult, a Nigerian company specializing in study abroad consulting services. By accessing or using our Service, you agree to be bound by these Terms.
            </p>
            <p>
              If you do not agree to these Terms, please do not use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>"Client"</strong> or <strong>"You"</strong>: The individual or entity using our services</li>
              <li><strong>"Consultant"</strong>: Our expert advisors providing study abroad guidance</li>
              <li><strong>"Services"</strong>: Study abroad consulting, university admissions support, visa guidance, and related services</li>
              <li><strong>"Agreement"</strong>: These Terms of Service and any additional agreements entered into</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Description of Services</h2>
            <p>Honoured Consult provides the following services:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Personalized study abroad counseling and guidance</li>
              <li>University and course selection assistance</li>
              <li>Application process support and document preparation</li>
              <li>Visa application guidance and support</li>
              <li>Scholarship and funding advice</li>
              <li>Pre-departure orientation and support</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Eligibility</h2>
            <p>To use our services, you must:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Be at least 18 years old or have parental/guardian consent</li>
              <li>Provide accurate and complete information</li>
              <li>Have legal capacity to enter into contracts under Nigerian law</li>
              <li>Not be prohibited from receiving services under applicable laws</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Service Agreement</h2>
            <h3 className="text-xl font-medium mb-2">5.1 Formation of Agreement</h3>
            <p>
              The agreement between you and Honoured Consult is formed when you book a consultation or engage our services. This includes acceptance of these Terms and our Privacy Policy.
            </p>

            <h3 className="text-xl font-medium mb-2">5.2 Service Fees</h3>
            <p>
              Our service fees are clearly stated on our website and in consultation agreements. All fees are in Nigerian Naira unless otherwise specified. Payment terms and methods are detailed in individual service agreements.
            </p>

            <h3 className="text-xl font-medium mb-2">5.3 Payment Obligations</h3>
            <p>
              Clients are responsible for timely payment of all fees. Late payments may result in suspension of services. Refunds are subject to our refund policy and applicable Nigerian consumer protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Client Obligations</h2>
            <p>As a client, you agree to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate, complete, and timely information</li>
              <li>Cooperate with our consultants and provide requested documentation</li>
              <li>Attend scheduled consultations and meetings</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect intellectual property rights</li>
              <li>Maintain confidentiality of sensitive information shared during consultations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Our Obligations</h2>
            <p>Honoured Consult agrees to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide services with reasonable skill and care</li>
              <li>Maintain confidentiality of client information</li>
              <li>Comply with applicable Nigerian laws and professional standards</li>
              <li>Deliver services within agreed timelines</li>
              <li>Keep clients informed of progress and any issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
            <h3 className="text-xl font-medium mb-2">8.1 Our Intellectual Property</h3>
            <p>
              All content, materials, and resources provided by Honoured Consult, including but not limited to text, graphics, logos, and software, are protected by Nigerian copyright laws and international intellectual property laws.
            </p>

            <h3 className="text-xl font-medium mb-2">8.2 Client Materials</h3>
            <p>
              Clients retain ownership of their personal documents and information. By providing materials to us, clients grant us a limited license to use them for service delivery purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Confidentiality</h2>
            <p>
              Both parties agree to maintain confidentiality of information disclosed during the course of service delivery. This obligation survives termination of the agreement and is subject to legal disclosure requirements under Nigerian law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by Nigerian law, Honoured Consult's liability for any claims arising from service delivery is limited to the amount paid for the specific service in question. We are not liable for:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>University admission decisions</li>
              <li>Visa approval outcomes</li>
              <li>Indirect or consequential losses</li>
              <li>Force majeure events</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Disclaimers</h2>
            <p>
              Our services are provided "as is" without warranties of any kind. While we strive for success, we cannot guarantee specific outcomes including university admissions or visa approvals. Success rates are based on historical data and do not constitute guarantees.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
            <h3 className="text-xl font-medium mb-2">12.1 Termination by Client</h3>
            <p>
              Clients may terminate services with written notice. Refunds are subject to our refund policy and the stage of service delivery.
            </p>

            <h3 className="text-xl font-medium mb-2">12.2 Termination by Honoured Consult</h3>
            <p>
              We may terminate services for breach of these Terms, non-payment, or other valid reasons, with appropriate notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms shall be resolved through:
            </p>
            <ol className="list-decimal pl-6 mb-4">
              <li>Negotiation between parties</li>
              <li>Mediation through a neutral third party</li>
              <li>Nigerian courts with jurisdiction in Lagos State</li>
            </ol>
            <p>
              These Terms are governed by Nigerian law, specifically the Lagos State High Court for disputes involving Lagos-based clients.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Force Majeure</h2>
            <p>
              Neither party shall be liable for failure to perform obligations due to circumstances beyond reasonable control, including natural disasters, government restrictions, or pandemics.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Amendments</h2>
            <p>
              We may amend these Terms with reasonable notice. Continued use of our services constitutes acceptance of amended Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">16. Severability</h2>
            <p>
              If any provision of these Terms is found invalid under Nigerian law, the remaining provisions shall remain in effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">17. Consumer Protection</h2>
            <p>
              These Terms comply with the Nigerian Consumer Protection Framework and other relevant consumer protection laws. Clients have rights under these laws in addition to the terms herein.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">18. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p><strong>Honoured Consult</strong></p>
              <p>Email: legal@honouredconsult.com</p>
              <p>Phone: +234 706 838 5111</p>
              <p>Address: [Company Address], Nigeria</p>
            </div>
          </section>
        </div>
      </main>

      <Footer onBookConsultation={handleBookConsultation} />
    </div>
  )
}
