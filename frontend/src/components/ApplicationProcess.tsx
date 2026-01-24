import { Card, CardContent } from "@/components/ui/card"
import { ChatCircle, MagnifyingGlass, FileText, Stamp, AirplaneTakeoff, CheckCircle } from "@phosphor-icons/react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: ChatCircle,
    number: "01",
    title: "Free Consultation",
    description: "Meet with our expert counselors to discuss your goals, preferences, and eligibility",
    duration: "30-60 mins"
  },
  {
    icon: MagnifyingGlass,
    number: "02",
    title: "Course & University Selection",
    description: "We help you shortlist the best programs and universities matching your profile",
    duration: "1-2 weeks"
  },
  {
    icon: FileText,
    number: "03",
    title: "Application Preparation",
    description: "Expert assistance with applications, essays, LORs, and complete documentation",
    duration: "2-4 weeks"
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Offer Letter & Acceptance",
    description: "Track applications and receive offers from universities. We help you choose the best fit",
    duration: "4-12 weeks"
  },
  {
    icon: Stamp,
    number: "05",
    title: "Visa Application",
    description: "Complete visa guidance, interview preparation, and documentation support",
    duration: "2-8 weeks"
  },
  {
    icon: AirplaneTakeoff,
    number: "06",
    title: "Pre-Departure Support",
    description: "Accommodation, travel, and orientation support to ensure a smooth transition",
    duration: "2-4 weeks"
  }
]

export function ApplicationProcess() {
  return (
    <section className="py-16 md:py-24 bg-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 80px, oklch(0.45 0.12 250 / 0.05) 80px, oklch(0.45 0.12 250 / 0.05) 160px)`
      }} />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Your Journey in 6 Simple Steps
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From initial consultation to departure - we're with you every step of the way
          </p>
        </motion.div>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-1 bg-primary" style={{ top: '80px' }} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="h-full border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card group">
                    <CardContent className="pt-6 pb-6 px-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon size={28} weight="duotone" className="text-primary-foreground" />
                        </div>
                        <div className="text-4xl font-bold text-primary/20">{step.number}</div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {step.description}
                      </p>
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-foreground text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {step.duration}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-5 top-20 w-10 h-1 bg-primary" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
