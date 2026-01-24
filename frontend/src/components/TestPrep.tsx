import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, ChartBar, Users } from "@phosphor-icons/react"
import { motion } from "framer-motion"

interface TestPrepProps {
  onBookTest: (test: string) => void
}

const tests = [
  {
    id: "toefl",
    name: "TOEFL",
    fullName: "Test of English as a Foreign Language",
    description: "Widely accepted by universities in USA, Canada, and beyond, measuring academic English proficiency",
    features: ["Reading", "Listening", "Speaking", "Writing"],
    duration: "3 hours",
    score: "0-120",
    acceptedBy: "11,000+ institutions",
    validity: "2 years",
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "gre",
    name: "GRE",
    fullName: "Graduate Record Examination",
    description: "Required for Master's and PhD programs, especially in USA, testing verbal, quantitative, and analytical skills",
    features: ["Verbal Reasoning", "Quantitative Reasoning", "Analytical Writing"],
    duration: "3h 45min",
    score: "260-340",
    acceptedBy: "1,200+ business schools",
    validity: "5 years",
    color: "from-green-500 to-green-600"
  },
  {
    id: "gmat",
    name: "GMAT",
    fullName: "Graduate Management Admission Test",
    description: "Essential for MBA and business school admissions, assessing analytical, writing, and problem-solving skills",
    features: ["Quantitative", "Verbal", "Integrated Reasoning", "Analytical Writing"],
    duration: "3h 30min",
    score: "200-800",
    acceptedBy: "7,000+ programs",
    validity: "5 years",
    color: "from-orange-500 to-orange-600"
  },
  {
    id: "sat",
    name: "SAT",
    fullName: "Scholastic Assessment Test",
    description: "Standardized test for undergraduate admissions in USA, testing readiness for college-level work",
    features: ["Reading", "Writing & Language", "Math (Calculator & No Calculator)"],
    duration: "3 hours",
    score: "400-1600",
    acceptedBy: "Most US universities",
    validity: "5 years",
    color: "from-red-500 to-red-600"
  }
]

export function TestPrep({ onBookTest }: TestPrepProps) {
  return (
    <section className="py-16 md:py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Test Preparation Programs
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert coaching with proven strategies to help you achieve your target scores
          </p>
        </motion.div>
        
        <Tabs defaultValue="toefl" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto bg-secondary/30">
            {tests.map((test) => (
              <TabsTrigger 
                key={test.id} 
                value={test.id} 
                className="text-sm md:text-base py-3 font-semibold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                {test.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tests.map((test) => (
            <TabsContent key={test.id} value={test.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-2 border-border/50 shadow-xl overflow-hidden">
                  <div className="h-2 bg-primary" />
                  <CardHeader className="pb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <CardTitle className="text-3xl mb-3 flex items-center gap-3">
                          {test.fullName}
                          <Badge className="bg-accent text-accent-foreground">
                            {test.name}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {test.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-secondary/30 rounded-xl p-5 border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <CheckCircle size={20} weight="duotone" className="text-primary" />
                          </div>
                          <h4 className="font-semibold text-foreground">Test Sections</h4>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {test.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-secondary/30 rounded-xl p-5 border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Clock size={20} weight="duotone" className="text-primary" />
                          </div>
                          <h4 className="font-semibold text-foreground">Duration</h4>
                        </div>
                        <p className="text-2xl font-bold text-foreground mt-2">{test.duration}</p>
                      </div>
                      
                      <div className="bg-secondary/30 rounded-xl p-5 border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <ChartBar size={20} weight="duotone" className="text-primary" />
                          </div>
                          <h4 className="font-semibold text-foreground">Score Range</h4>
                        </div>
                        <p className="text-2xl font-bold text-foreground mt-2">{test.score}</p>
                      </div>
                      
                      <div className="bg-secondary/30 rounded-xl p-5 border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Users size={20} weight="duotone" className="text-primary" />
                          </div>
                          <h4 className="font-semibold text-foreground">Accepted By</h4>
                        </div>
                        <p className="text-lg font-semibold text-muted-foreground mt-2">{test.acceptedBy}</p>
                      </div>
                    </div>
                    
                    <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
                      <h4 className="font-semibold text-foreground mb-3 text-lg">What's Included in Our {test.name} Program</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          "Expert trainers with 10+ years experience",
                          "Comprehensive study materials & resources",
                          "Regular mock tests & performance tracking",
                          "Personalized feedback & improvement plans",
                          "Flexible online & offline batch options",
                          "Score improvement guarantee"
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle size={20} weight="fill" className="text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button 
                        size="lg" 
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base"
                        onClick={() => onBookTest(test.name)}
                      >
                        Book {test.name} Coaching
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}