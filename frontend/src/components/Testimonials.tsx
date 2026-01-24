import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quotes } from "@phosphor-icons/react"
import { motion } from "framer-motion"

interface Testimonial {
  id: string
  name: string
  country: string
  university: string
  image: string
  text: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Chioma Adebayo",
    country: "Canada",
    university: "University of Toronto",
    image: "",
    text: "Honoured Consult made my dream of studying in Canada a reality. Their guidance through the application and visa process was exceptional. I'm now pursuing my Master's at U of T!",
    rating: 5
  },
  {
    id: "2",
    name: "Oluwaseun James",
    country: "United Kingdom",
    university: "University of Manchester",
    image: "",
    text: "The team's expertise in UK admissions was invaluable. They helped me secure admission with a scholarship. The IELTS coaching was top-notch too. Highly recommended!",
    rating: 5
  },
  {
    id: "3",
    name: "Amina Hassan",
    country: "United States",
    university: "Columbia University",
    image: "",
    text: "From choosing the right university to visa approval, every step was handled professionally. I got into my dream school - Columbia! Thank you Honoured Consult!",
    rating: 5
  },
  {
    id: "4",
    name: "Emmanuel Okon",
    country: "Australia",
    university: "University of Melbourne",
    image: "",
    text: "Their personalized approach made all the difference. The counselors understood my goals and helped me choose the perfect program in Australia. Living my dream now!",
    rating: 5
  },
  {
    id: "5",
    name: "Fatima Abubakar",
    country: "Germany",
    university: "Technical University of Munich",
    image: "",
    text: "Amazing support throughout my journey to Germany. They helped with everything from university selection to finding accommodation. Professional and caring team!",
    rating: 5
  },
  {
    id: "6",
    name: "David Okoro",
    country: "Ireland",
    university: "Trinity College Dublin",
    image: "",
    text: "Best decision I made was working with Honoured Consult. Got into Trinity with their help and guidance. The visa process was smooth thanks to their expert preparation.",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `repeating-conic-gradient(from 0deg, transparent 0deg 60deg, oklch(0.45 0.12 250 / 0.03) 60deg 120deg)`
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
            Success Stories from Our Students
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful students who achieved their study abroad dreams with our guidance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card group">
                <CardContent className="pt-8 pb-8 px-6 space-y-4 relative">
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quotes size={48} weight="fill" className="text-primary" />
                  </div>

                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={18} weight="fill" className="text-accent" />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed relative z-10">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground text-base">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.university}
                      </div>
                      <div className="text-xs text-foreground font-medium">
                        📍 {testimonial.country}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
