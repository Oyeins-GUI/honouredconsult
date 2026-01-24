import { Button } from "@/components/ui/button"
import { ArrowRight, ChatCircle } from "@phosphor-icons/react"
import { motion } from "framer-motion"

interface CTABannerProps {
  onBookConsultation: () => void
}

export function CTABanner({ onBookConsultation }: CTABannerProps) {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, white 2%, transparent 0%),
          radial-gradient(circle at 75% 75%, white 2%, transparent 0%)
        `,
        backgroundSize: '50px 50px'
      }} />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <ChatCircle size={40} weight="duotone" className="text-white" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to Start Your Journey?
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Book a free consultation with our expert counselors today and take the first step 
            towards your dream of studying abroad.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 group"
              onClick={onBookConsultation}
            >
              Book Free Consultation
              <ArrowRight size={24} weight="bold" className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm text-white border-white/40 hover:bg-white hover:text-primary px-10 py-7 text-lg font-semibold"
              asChild
            >
              <a href="tel:+2348001234567">Call: +234 (800) 123-4567</a>
            </Button>
          </div>
          
          <p className="text-white/70 text-sm mt-8">
            🎉 Limited slots available this month - Book now to secure your spot!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
