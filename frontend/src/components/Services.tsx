import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChatCircle, GraduationCap, FileText, AirplaneTilt, ArrowRight } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { toast } from "sonner"

const services = [
  {
    icon: ChatCircle,
    title: "Career Counseling",
    description: "Personalized guidance to identify the right course and country based on your career goals, interests, and academic background",
    features: ["1-on-1 Sessions", "Psychometric Tests", "Career Roadmap"]
  },
  {
    icon: GraduationCap,
    title: "University Selection",
    description: "Expert help in shortlisting universities that perfectly match your profile, budget, preferences, and career aspirations",
    features: ["Profile Assessment", "University Matching", "Scholarship Search"]
  },
  {
    icon: FileText,
    title: "Application Support",
    description: "Complete assistance with applications, compelling essays, strong LORs, and meticulous documentation to maximize your chances",
    features: ["Essay Writing", "Document Review", "Application Tracking"]
  },
  {
    icon: AirplaneTilt,
    title: "Visa Guidance",
    description: "Step-by-step support for visa applications with industry-leading 98% success rates and comprehensive interview preparation",
    features: ["Document Prep", "Mock Interviews", "Embassy Support"]
  }
]

export function Services() {
  const handleLearnMore = (service: string) => {
    toast.info(`${service} Details`, {
      description: "For comprehensive information about this service, please book a free consultation with our experts."
    })
  }

  return (
    <section className="py-16 md:py-24 bg-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `repeating-radial-gradient(circle at center, transparent 0px, transparent 40px, oklch(0.45 0.12 250 / 0.05) 40px, oklch(0.45 0.12 250 / 0.05) 80px)`
      }} />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Comprehensive Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            End-to-end support for your entire study abroad journey - from counseling to landing abroad
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card border-border/50 group overflow-hidden">
                  <div className="h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="pb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-5 group-hover:scale-110 transition-transform">
                      <Icon size={32} weight="duotone" className="text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-3">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="pt-3 border-t border-border/50">
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between group/btn hover:bg-primary/5 mt-4"
                      onClick={() => handleLearnMore(service.title)}
                    >
                      Learn More
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}