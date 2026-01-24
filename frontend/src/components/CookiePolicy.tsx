import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export function CookiePolicy() {
  const handleBookConsultation = () => {
    // Handle consultation booking
  }

  return (
    <div className="min-h-screen">
      <Navbar onBookConsultation={handleBookConsultation} />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Cookie Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              This Cookie Policy explains how Honoured Consult ("we," "us," or "our") uses cookies and similar technologies on our website. This policy is part of our commitment to transparency and compliance with the Nigeria Data Protection Regulation (NDPR) 2019 and other applicable Nigerian laws.
            </p>
            <p>
              By using our website, you consent to the use of cookies in accordance with this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>

            <h3 className="text-xl font-medium mb-2">3.1 Essential Cookies</h3>
            <p>These cookies are necessary for the website to function properly:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
              <li><strong>Authentication Cookies:</strong> Used to remember your login status</li>
              <li><strong>Security Cookies:</strong> Help protect against security threats</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">3.2 Performance Cookies</h3>
            <p>These cookies help us understand how visitors interact with our website:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Google Analytics cookies for website traffic analysis</li>
              <li>Page load time and error tracking</li>
              <li>User journey analytics</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">3.3 Functional Cookies</h3>
            <p>These cookies enable enhanced functionality and personalization:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Language preferences</li>
              <li>Location-based content</li>
              <li>Form data preservation</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">3.4 Marketing Cookies</h3>
            <p>These cookies are used to deliver relevant advertisements:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Social media advertising pixels</li>
              <li>Retargeting cookies for relevant content</li>
              <li>Campaign performance tracking</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
            <p>We use the following third-party services that set cookies:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong>Facebook Pixel:</strong> For social media advertising and retargeting</li>
              <li><strong>LinkedIn Insight Tag:</strong> For professional networking and advertising</li>
              <li><strong>YouTube:</strong> For embedded video content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>To ensure the website functions properly</li>
              <li>To remember your preferences and settings</li>
              <li>To analyze website traffic and user behavior</li>
              <li>To provide personalized content and recommendations</li>
              <li>To deliver targeted advertising</li>
              <li>To improve our services and user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Cookie Management</h2>
            <h3 className="text-xl font-medium mb-2">6.1 Cookie Consent</h3>
            <p>
              When you first visit our website, you will see a cookie banner asking for your consent to use non-essential cookies. You can accept all cookies or manage your preferences.
            </p>

            <h3 className="text-xl font-medium mb-2">6.2 Managing Cookies</h3>
            <p>You can control cookies through:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Browser settings to block or delete cookies</li>
              <li>Our cookie preference center</li>
              <li>Opt-out links provided in our emails</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">6.3 Withdrawing Consent</h3>
            <p>
              You can withdraw your consent at any time by changing your cookie settings or contacting us. However, this may affect website functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Protection and Cookies</h2>
            <p>
              Our use of cookies complies with the NDPR and other Nigerian data protection laws. We only collect data necessary for the specified purposes and implement appropriate security measures.
            </p>
            <p>
              For more information about how we handle your personal data, please see our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Cookie Retention</h2>
            <p>
              Different cookies have different lifespans:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain until deleted or expired (typically 1-2 years)</li>
              <li><strong>Third-party Cookies:</strong> Subject to the third party's retention policies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes through our website or email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Browser-Specific Instructions</h2>
            <h3 className="text-xl font-medium mb-2">10.1 Google Chrome</h3>
            <p>Settings → Privacy and security → Cookies and other site data</p>

            <h3 className="text-xl font-medium mb-2">10.2 Mozilla Firefox</h3>
            <p>Settings → Privacy & Security → Cookies and Site Data</p>

            <h3 className="text-xl font-medium mb-2">10.3 Microsoft Edge</h3>
            <p>Settings → Cookies and site permissions → Cookies and site data</p>

            <h3 className="text-xl font-medium mb-2">10.4 Safari</h3>
            <p>Preferences → Privacy → Manage Website Data</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this policy, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p><strong>Honoured Consult</strong></p>
              <p>Email: privacy@honouredconsult.com</p>
              <p>Phone: +234 706 838 5111</p>
              <p>Address: [Company Address], Nigeria</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Legal Compliance</h2>
            <p>
              This Cookie Policy complies with:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Nigeria Data Protection Regulation (NDPR) 2019</li>
              <li>NITDA Guidelines on Data Protection</li>
              <li>Consumer Protection Framework</li>
              <li>International cookie and privacy standards</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer onBookConsultation={handleBookConsultation} />
    </div>
  )
}
