import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Home } from "@/components/Home";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { TermsOfService } from "@/components/TermsOfService";
import { CookiePolicy } from "@/components/CookiePolicy";
import Newsletters from "@/pages/Newsletters";
import { ConsultationForm } from "@/components/ConsultationForm";
import { useState } from "react";
import { AdminDashboard } from "./components/AdminDashboard";

function App() {
   const [consultationOpen, setConsultationOpen] = useState(false);
   const [consultationContext, setConsultationContext] = useState("");

   const handleBookConsultation = (context?: string) => {
      setConsultationContext(context || "");
      setConsultationOpen(true);
   };

   return (
      <div className="min-h-screen">
         <Navbar onBookConsultation={handleBookConsultation} />
         <main>
            <Routes>
               <Route
                  path="/"
                  element={<Home onBookConsultation={handleBookConsultation} />}
               />
               <Route path="/newsletters" element={<Newsletters />} />
               <Route path="/privacy" element={<PrivacyPolicy />} />
               <Route path="/terms" element={<TermsOfService />} />
               <Route path="/cookies" element={<CookiePolicy />} />
               <Route path="/random/admin" element={<AdminDashboard />} />
            </Routes>
         </main>
         <Footer onBookConsultation={handleBookConsultation} />
         <ConsultationForm
            open={consultationOpen}
            onOpenChange={setConsultationOpen}
            initialContext={consultationContext}
         />
      </div>
   );
}

export default App;
