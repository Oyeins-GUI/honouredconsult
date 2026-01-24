import { Routes, Route } from 'react-router-dom'
import { Home } from "@/components/Home"
import { PrivacyPolicy } from "@/components/PrivacyPolicy"
import { TermsOfService } from "@/components/TermsOfService"
import { CookiePolicy } from "@/components/CookiePolicy"

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
      </Routes>
    </div>
  )
}

export default App
