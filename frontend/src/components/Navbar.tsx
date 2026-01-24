import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { List, X, Phone } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"

interface NavbarProps {
  onBookConsultation: () => void
}

export function Navbar({ onBookConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (window.scrollY / windowHeight) * 100
      setScrollProgress(scrolled)
    }
    
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md border-b border-border/50`}>
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                <span className="text-primary">
                  Honoured
                </span>
                <span className="text-accent"> Consult</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <button 
                onClick={() => scrollToSection("destinations")}
                className="font-medium transition-colors text-foreground/80 hover:text-accent"
              >
                Destinations
              </button>
              <button 
                onClick={() => scrollToSection("services")}
                className="font-medium transition-colors text-foreground/80 hover:text-accent"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection("test-prep")}
                className="font-medium transition-colors text-foreground/80 hover:text-accent"
              >
                Test Prep
              </button>
              <button 
                onClick={() => scrollToSection("success-stories")}
                className="font-medium transition-colors text-foreground/80 hover:text-accent"
              >
                Success Stories
              </button>
              
              <div className="flex items-center gap-3 ml-2">
                <a 
                  href="tel:+2348001234567"
                  className="flex items-center gap-2 font-medium transition-colors text-foreground/80 hover:text-accent"
                >
                  <Phone size={20} weight="duotone" />
                  <span className="hidden xl:inline">+234 800 123 4567</span>
                </a>
                <Button 
                  onClick={onBookConsultation}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Book Consultation
                </Button>
              </div>
            </div>
            
            <button
              className="lg:hidden transition-colors text-foreground p-2 hover:bg-secondary/50 rounded-lg active:scale-95 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
            </button>
          </div>
        </div>
      </nav>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 border-b border-border/50">
                  <div className="text-lg sm:text-xl font-bold">
                    <span className="text-primary">Menu</span>
                  </div>
                  <button
                    className="transition-colors text-foreground p-2 hover:bg-secondary/50 rounded-lg active:scale-95 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={28} weight="bold" />
                  </button>
                </div>
                
                <div className="flex-1 flex flex-col px-4 sm:px-6 py-6 overflow-y-auto">
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => scrollToSection("destinations")}
                      className="text-left py-4 px-5 rounded-xl text-foreground font-medium transition-all hover:bg-secondary/80 active:scale-[0.98] touch-manipulation min-h-[56px] text-base sm:text-lg border border-transparent hover:border-border/50"
                    >
                      Destinations
                    </button>
                    <button 
                      onClick={() => scrollToSection("services")}
                      className="text-left py-4 px-5 rounded-xl text-foreground font-medium transition-all hover:bg-secondary/80 active:scale-[0.98] touch-manipulation min-h-[56px] text-base sm:text-lg border border-transparent hover:border-border/50"
                    >
                      Services
                    </button>
                    <button 
                      onClick={() => scrollToSection("test-prep")}
                      className="text-left py-4 px-5 rounded-xl text-foreground font-medium transition-all hover:bg-secondary/80 active:scale-[0.98] touch-manipulation min-h-[56px] text-base sm:text-lg border border-transparent hover:border-border/50"
                    >
                      Test Prep
                    </button>
                    <button 
                      onClick={() => scrollToSection("success-stories")}
                      className="text-left py-4 px-5 rounded-xl text-foreground font-medium transition-all hover:bg-secondary/80 active:scale-[0.98] touch-manipulation min-h-[56px] text-base sm:text-lg border border-transparent hover:border-border/50"
                    >
                      Success Stories
                    </button>
                  </div>
                  
                  <div className="mt-6 p-5 bg-gradient-to-br from-secondary/50 to-accent/10 rounded-xl border border-border/50">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 font-medium">Contact us directly:</p>
                    <a 
                      href="tel:+2348001234567"
                      className="flex items-center gap-3 text-base sm:text-lg font-bold text-accent hover:text-accent/80 transition-colors active:scale-[0.98] touch-manipulation min-h-[44px]"
                    >
                      <div className="bg-accent/10 p-2 rounded-lg">
                        <Phone size={24} weight="duotone" />
                      </div>
                      +234 800 123 4567
                    </a>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 border-t border-border/50 bg-secondary/20">
                  <Button 
                    onClick={() => {
                      onBookConsultation()
                      setMobileMenuOpen(false)
                    }}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base sm:text-lg py-7 shadow-xl w-full active:scale-[0.98] touch-manipulation"
                    size="lg"
                  >
                    Book Free Consultation
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}