import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, ShieldCheck, ChartLineUp, Handshake, Globe } from "@phosphor-icons/react"
import { motion } from "framer-motion"

const features = [
  {
    icon: CheckCircle,
    title: "98% Success Rate",
    description: "Industry-leading visa approval rate backed by expert guidance and meticulous preparation"
  },
  {
    icon: Users,
    title: "15,000+ Students",
    description: "Successfully placed students in top universities across 50+ countries worldwide"
  },
  {
    icon: ShieldCheck,
    title: "End-to-End Support",
    description: "Complete assistance from counseling to visa approval and pre-departure preparation"
  },
  {
    icon: ChartLineUp,
    title: "25+ Years Expertise",
    description: "Decades of experience helping Nigerian students achieve their international education dreams"
  },
  {
    icon: Handshake,
    title: "Personalized Service",
    description: "Dedicated counselors who understand your unique goals and provide tailored guidance"
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Direct partnerships with universities worldwide ensuring priority processing and scholarships"
  }
]

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, oklch(0.45 0.12 250 / 0.1) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
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
            Why Choose Honoured Consult?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We're not just consultants - we're your partners in achieving international education success
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm group">
                  <CardContent className="pt-8 pb-8 px-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                      <Icon size={32} weight="duotone" className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
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
