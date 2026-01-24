import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Phone, EnvelopeSimple, FacebookLogo, InstagramLogo, TiktokLogo, TwitterLogo } from "@phosphor-icons/react"

interface FooterProps {
  onBookConsultation: () => void
}

export function Footer({ onBookConsultation }: FooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(255,255,255,.1) 80px, rgba(255,255,255,.1) 160px)`
      }} />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">Honoured Consult</h3>
            <p className="text-primary-foreground/80 leading-relaxed mb-6">
              Nigeria's most trusted study abroad consultancy. We help students achieve their 
              international education dreams with a 98% visa success rate.
            </p>
            <Button 
              onClick={onBookConsultation}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg"
            >
              Book Free Consultation
            </Button>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li>
                <button 
                  onClick={() => scrollToSection("destinations")}
                  className="hover:text-primary-foreground hover:translate-x-1 transition-all inline-flex items-center gap-2"
                >
                  → Study Destinations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="hover:text-primary-foreground hover:translate-x-1 transition-all inline-flex items-center gap-2"
                >
                  → Our Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("success-stories")}
                  className="hover:text-primary-foreground hover:translate-x-1 transition-all inline-flex items-center gap-2"
                >
                  → Success Stories
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  → Scholarships
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Popular Destinations</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">🇦🇺 Study in Australia</li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">🇨🇦 Study in Canada</li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">🇦🇪 Study in UAE</li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">🇩🇪 Study in Germany</li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">🇮🇪 Study in Ireland</li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">🇬🇧 Study in UK</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Us</h4>
            <div className="space-y-4 text-primary-foreground/80">
              <div className="flex items-center gap-3">
                <Phone size={22} weight="duotone" />
                <div>
                  <div>+234 706 838 5111</div>
                  <div className="text-sm">Mon-Sat: 9am-6pm</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeSimple size={22} weight="duotone" />
                <span>info@honouredconsult.com</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Follow Us</h5>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/share/1G9x7o5xXq/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all hover:scale-110">
                  <FacebookLogo size={20} weight="fill" />
                </a>
                <a href="https://www.instagram.com/honoured_consult?igsh=MWQ2YzJxOThva3FqYw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all hover:scale-110">
                  <InstagramLogo size={20} weight="fill" />
                </a>
                <a href="https://www.tiktok.com/@honoured.consult1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all hover:scale-110">
                  <TiktokLogo size={20} weight="fill" />
                </a>
                <a href="https://x.com/HonouredConsult" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all hover:scale-110">
                  <TwitterLogo size={20} weight="fill" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-primary-foreground/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
          <p>© 2024 Honoured Consult. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}