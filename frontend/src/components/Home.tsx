import { useState, useEffect } from "react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { Destinations } from "@/components/Destinations"
import { ApplicationProcess } from "@/components/ApplicationProcess"
import { Services } from "@/components/Services"
import { Testimonials } from "@/components/Testimonials"
import { CTABanner } from "@/components/CTABanner"
import { Footer } from "@/components/Footer"
import { ConsultationForm } from "@/components/ConsultationForm"
import { AdminDashboard } from "@/components/AdminDashboard"
import { LoginDialog } from "@/components/LoginDialog"

export function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false)
  const [consultationContext, setConsultationContext] = useState("")
  const [adminOpen, setAdminOpen] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    const checkOwner = async () => {
      try {
        // Check if user is logged in as admin
        const token = localStorage.getItem('auth_token');
        const user = localStorage.getItem('user');

        if (token && user) {
          const userData = JSON.parse(user);
          setIsOwner(userData.isAdmin || userData.isOwner || false);
        } else {
          setIsOwner(false);
        }
      } catch (error) {
        setIsOwner(false)
      }
    }
    checkOwner()

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault()
        setAdminOpen(true)
      }
    }

    const handleOpenLoginDialog = () => {
      setLoginOpen(true)
    }

    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("open-login-dialog", handleOpenLoginDialog)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("open-login-dialog", handleOpenLoginDialog)
    }
  }, [])

  const handleBookConsultation = (context?: string) => {
    setConsultationContext(context || "")
    setConsultationOpen(true)
  }

  const handleLearnMore = (destination: string) => {
    toast.info(`Explore ${destination}`, {
      description: "Book a consultation to learn more about studying in this destination."
    })
    handleBookConsultation()
  }

  return (
    <div className="min-h-screen">
      <main>
        <Hero onBookConsultation={() => handleBookConsultation()} />

        <WhyChooseUs />

        <div id="destinations">
          <Destinations onLearnMore={handleLearnMore} />
        </div>

        <ApplicationProcess />

        <div id="services">
          <Services />
        </div>

        <CTABanner onBookConsultation={() => handleBookConsultation()} />

        <div id="success-stories">
          <Testimonials />
        </div>
      </main>

      <ConsultationForm
        open={consultationOpen}
        onOpenChange={setConsultationOpen}
        initialContext={consultationContext}
      />

      <AdminDashboard
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onLoginSuccess={() => {
          // Refresh isOwner state after successful login
          const token = localStorage.getItem('auth_token');
          const user = localStorage.getItem('user');
          if (token && user) {
            const userData = JSON.parse(user);
            setIsOwner(userData.isAdmin || userData.isOwner || false);
            // Open admin dashboard immediately after login
            setAdminOpen(true);
          }
        }}
      />

      {isOwner && (
        <button
          onClick={() => setAdminOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl hover:shadow-3xl transition-all hover:scale-110 flex items-center justify-center z-40 font-bold text-xl"
          title="Admin Dashboard (Ctrl+Shift+A)"
        >
          A
        </button>
      )}

      <Toaster />
    </div>
  )
}
