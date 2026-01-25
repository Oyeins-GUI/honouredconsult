import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, ArrowRight, CheckCircle } from "@phosphor-icons/react"
import { QuickSearch } from "./QuickSearch"
import { motion } from "framer-motion"

interface HeroProps {
  onBookConsultation: () => void
}

export function Hero({ onBookConsultation }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gray-200" />
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(0,0,0,.05) 60px, rgba(0,0,0,.05) 120px)
          `
        }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-primary/90 text-white border-primary backdrop-blur-sm mb-6 px-4 py-2 text-sm">
              <CheckCircle size={16} weight="fill" className="mr-2" />
              Nigeria's Leading Study Abroad Consultants
            </Badge>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transform Your Future<br />
            <span className="text-foreground">Study Abroad</span> with Confidence
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-foreground/90 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your trusted partner in international education. Expert counseling, seamless applications,
            visa support, and test preparation. We handle everything so you can focus on your dreams.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-7 text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 group"
              onClick={onBookConsultation}
            >
              Book Free Consultation
              <ArrowRight size={20} weight="bold" className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-card backdrop-blur-sm text-foreground border-border/50 hover:bg-card/80 px-8 py-7 text-lg font-semibold"
              onClick={() => scrollToSection("destinations")}
            >
              <GraduationCap size={24} weight="duotone" className="mr-2" />
              Explore Destinations
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto lg:mx-0 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { value: "21+", label: "Partner Countries" },
              { value: "98%", label: "Visa Success Rate" },
              { value: "5+", label: "Years Experience" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-card backdrop-blur-sm border border-border/50">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end -mt-52">
          <motion.div
            className=""
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <img
              src="/honoured.png"
              alt="Honoured Consult"
              className="w-full max-w-md h-auto"
            />
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-8 pb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <QuickSearch />
      </motion.div>
    </section>
  )
}