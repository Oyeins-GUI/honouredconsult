import { Routes, Route } from 'react-router-dom'
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Home } from "@/components/Home"
import { PrivacyPolicy } from "@/components/PrivacyPolicy"
import { TermsOfService } from "@/components/TermsOfService"
import { CookiePolicy } from "@/components/CookiePolicy"
import Newsletters from "@/pages/Newsletters"

function App() {
  return (
    <div className="min-h-screen">
      <Navbar onBookConsultation={() => {}} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newsletters" element={<Newsletters />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
        </Routes>
      </main>
      <Footer onBookConsultation={() => {}} />
    </div>
  )
}

export default App
