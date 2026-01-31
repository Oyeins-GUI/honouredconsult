import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, GraduationCap, CurrencyDollar, TrendUp, Clock } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useState } from "react"

interface Destination {
  id: string
  name: string
  flag: string
  universities: number
  programs: number
  avgCost: string
  popular: boolean
  trending: boolean
  description: string
  studyDuration: string
  workRights: string
  category: "popular" | "europe" | "asia" | "other"
}

const destinations: Destination[] = [
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    universities: 43,
    programs: 22000,
    avgCost: "$20k-$45k/year",
    popular: true,
    trending: false,
    description: "High quality of life, excellent universities, generous work rights, and stunning natural beauty",
    studyDuration: "3-4 years (UG), 2 years (PG)",
    workRights: "2-4 years PSW + PR options",
    category: "popular"
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    universities: 100,
    programs: 15000,
    avgCost: "$20k-$35k/year",
    popular: true,
    trending: true,
    description: "Affordable education with excellent work opportunities, immigration pathways, and welcoming multicultural environment",
    studyDuration: "4 years (UG), 2 years (PG)",
    workRights: "3 years PGWP + PR pathway",
    category: "popular"
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    universities: 70,
    programs: 8000,
    avgCost: "$15k-$30k/year",
    popular: true,
    trending: true,
    description: "Modern campuses, diverse international environment, and strategic location connecting East and West",
    studyDuration: "4 years (UG), 2 years (PG)",
    workRights: "Post-study visa options available",
    category: "asia"
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    universities: 380,
    programs: 20000,
    avgCost: "€500-€20k/year",
    popular: true,
    trending: true,
    description: "Low or no tuition fees at public universities, strong engineering programs, and Europe's economic powerhouse",
    studyDuration: "3 years (UG), 2 years (PG)",
    workRights: "18 months job search visa",
    category: "europe"
  },
  {
    id: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    universities: 34,
    programs: 5000,
    avgCost: "€10k-€25k/year",
    popular: true,
    trending: true,
    description: "English-speaking European hub with booming tech industry, friendly immigration policies, and beautiful landscapes",
    studyDuration: "3-4 years (UG), 1-2 years (PG)",
    workRights: "2 years stay-back visa",
    category: "europe"
  },
  {
    id: "newzealand",
    name: "New Zealand",
    flag: "🇳🇿",
    universities: 8,
    programs: 3000,
    avgCost: "$22k-$32k/year",
    popular: false,
    trending: false,
    description: "Safe, friendly environment with excellent work-life balance, stunning landscapes, and high-quality education",
    studyDuration: "3 years (UG), 1-2 years (PG)",
    workRights: "Up to 3 years PSW visa",
    category: "other"
  },
  {
    id: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    universities: 30,
    programs: 5000,
    avgCost: "$15k-$30k/year",
    popular: false,
    trending: false,
    description: "World-class education in Asia's business hub with excellent safety, infrastructure, and career prospects",
    studyDuration: "3-4 years (UG), 1-2 years (PG)",
    workRights: "Up to 1 year TEP",
    category: "asia"
  },
  {
    id: "switzerland",
    name: "Switzerland",
    flag: "🇨🇭",
    universities: 12,
    programs: 2000,
    avgCost: "€1k-€4k/year",
    popular: false,
    trending: true,
    description: "World-renowned universities, multilingual environment, and exceptional quality of life in the heart of Europe",
    studyDuration: "3 years (UG), 2 years (PG)",
    workRights: "6 months job search visa",
    category: "europe"
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    universities: 160,
    programs: 65000,
    avgCost: "£15k-£35k/year",
    popular: true,
    trending: false,
    description: "Historic institutions with shorter degree durations, global recognition, and 2-year post-study work visa",
    studyDuration: "3 years (UG), 1 year (PG)",
    workRights: "18 months PSW visa",
    category: "popular"
  },
  {
    id: "italy",
    name: "Italy",
    flag: "🇮🇹",
    universities: 90,
    programs: 5000,
    avgCost: "€900-€4k/year",
    popular: false,
    trending: false,
    description: "Rich cultural heritage, affordable tuition, excellent arts and design programs, and Mediterranean lifestyle",
    studyDuration: "3 years (UG), 2 years (PG)",
    workRights: "1 year job search visa",
    category: "europe"
  },
  {
    id: "france",
    name: "France",
    flag: "🇫🇷",
    universities: 80,
    programs: 3500,
    avgCost: "€200-€15k/year",
    popular: false,
    trending: false,
    description: "Low tuition at public universities, strong academic tradition, and vibrant cultural experience",
    studyDuration: "3 years (UG), 2 years (PG)",
    workRights: "2 years APS visa",
    category: "europe"
  },
  {
    id: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    universities: 75,
    programs: 2100,
    avgCost: "€8k-€20k/year",
    popular: false,
    trending: false,
    description: "High-quality English-taught programs, bike-friendly cities, and central European location for travel",
    studyDuration: "3 years (UG), 1-2 years (PG)",
    workRights: "1 year orientation visa",
    category: "europe"
  },
  {
    id: "sweden",
    name: "Sweden",
    flag: "🇸🇪",
    universities: 40,
    programs: 1000,
    avgCost: "€10k-€15k/year",
    popular: false,
    trending: false,
    description: "Innovation-focused education, sustainable living, excellent English proficiency, and high quality of life",
    studyDuration: "3 years (UG), 2 years (PG)",
    workRights: "Up to 1 year residence permit",
    category: "europe"
  },
  {
    id: "spain",
    name: "Spain",
    flag: "🇪🇸",
    universities: 80,
    programs: 3000,
    avgCost: "€1k-€10k/year",
    popular: false,
    trending: false,
    description: "Affordable education, vibrant culture, excellent weather, and growing opportunities in tech and business",
    studyDuration: "4 years (UG), 1-2 years (PG)",
    workRights: "1 year job search visa",
    category: "europe"
  },
  {
    id: "austria",
    name: "Austria",
    flag: "🇦🇹",
    universities: 22,
    programs: 1500,
    avgCost: "€1.5k-€2k/year",
    popular: false,
    trending: false,
    description: "Low tuition fees, high quality of life, central European location, and strong academic reputation",
    studyDuration: "3 years (UG), 2 years (PG)",
    workRights: "6 months job search visa",
    category: "europe"
  },
  {
    id: "denmark",
    name: "Denmark",
    flag: "🇩🇰",
    universities: 8,
    programs: 700,
    avgCost: "€8k-€16k/year",
    popular: false,
    trending: false,
    description: "Innovative teaching methods, work-life balance, sustainable living, and high happiness index",
    studyDuration: "3 years (UG), 2 years (PG)",
    workRights: "3 years residence permit",
    category: "europe"
  },
  {
    id: "finland",
    name: "Finland",
    flag: "🇫🇮",
    universities: 13,
    programs: 500,
    avgCost: "€8k-€18k/year",
    popular: false,
    trending: false,
    description: "Top-ranked education system, innovative culture, beautiful nature, and excellent living standards",
    studyDuration: "3 years (UG), 2 years (PG)",
    workRights: "1 year extension for job search",
    category: "europe"
  },
  {
    id: "hungary",
    name: "Hungary",
    flag: "🇭🇺",
    universities: 65,
    programs: 600,
    avgCost: "€1k-€7k/year",
    popular: false,
    trending: false,
    description: "Affordable tuition, rich history, growing international student community, and central European location",
    studyDuration: "3 years (UG), 2 years (PG)",
    workRights: "9 months job search visa",
    category: "europe"
  },
  {
    id: "cyprus",
    name: "Cyprus",
    flag: "🇨🇾",
    universities: 20,
    programs: 400,
    avgCost: "€4k-€9k/year",
    popular: false,
    trending: false,
    description: "English-taught programs, sunny Mediterranean climate, safe environment, and EU member benefits",
    studyDuration: "4 years (UG), 1-2 years (PG)",
    workRights: "EU work rights",
    category: "europe"
  },
  {
    id: "poland",
    name: "Poland",
    flag: "🇵🇱",
    universities: 130,
    programs: 4000,
    avgCost: "€2k-€4k/year",
    popular: false,
    trending: false,
    description: "Very affordable tuition, growing economy, rich cultural heritage, and central European location",
    studyDuration: "3 years (UG), 2 years (PG)",
    workRights: "9 months job search visa",
    category: "europe"
  },
  {
    id: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    universities: 20,
    programs: 1500,
    avgCost: "$5k-$10k/year",
    popular: false,
    trending: false,
    description: "Affordable quality education, multicultural environment, tropical paradise, and gateway to Asia",
    studyDuration: "3-4 years (UG), 1-2 years (PG)",
    workRights: "Limited work options",
    category: "asia"
  },
  {
    id: "malta",
    name: "Malta",
    flag: "🇲🇹",
    universities: 10,
    programs: 200,
    avgCost: "€8k-€12k/year",
    popular: false,
    trending: false,
    description: "English-speaking EU country, beautiful Mediterranean island, small class sizes, and safe environment",
    studyDuration: "3 years (UG), 1-2 years (PG)",
    workRights: "EU work rights",
    category: "europe"
  }
]

interface DestinationsProps {
  onLearnMore: (destination: string) => void
}

export function Destinations({ onLearnMore }: DestinationsProps) {
  const [filter, setFilter] = useState<"all" | "popular" | "europe" | "asia" | "other">("all")
  
  const filteredDestinations = filter === "all" 
    ? destinations 
    : destinations.filter(d => d.category === filter)

  return (
    <section className="py-16 md:py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Explore Study Destinations
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover world-class education opportunities in 21+ countries worldwide
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs value={filter} onValueChange={(value: any) => setFilter(value)} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 md:grid-cols-5 h-auto">
              <TabsTrigger value="all" className="text-sm md:text-base py-3">All Destinations</TabsTrigger>
              <TabsTrigger value="popular" className="text-sm md:text-base py-3">Most Popular</TabsTrigger>
              <TabsTrigger value="europe" className="text-sm md:text-base py-3">Europe</TabsTrigger>
              <TabsTrigger value="asia" className="text-sm md:text-base py-3">Asia-Pacific</TabsTrigger>
              <TabsTrigger value="other" className="text-sm md:text-base py-3">Others</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredDestinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-border/50 group overflow-hidden">
                <div className="h-2 bg-primary" />
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-6xl drop-shadow-lg">{dest.flag}</div>
                    <div className="flex flex-col gap-2">
                      {dest.popular && (
                        <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                      )}
                      {dest.trending && (
                        <Badge className="bg-accent text-accent-foreground">
                          <TrendUp size={14} weight="bold" className="mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{dest.name}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {dest.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 py-4 border-y border-border/50">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap size={18} className="text-primary" weight="duotone" />
                        <span>Universities</span>
                      </div>
                      <span className="font-semibold text-foreground">{dest.universities}+</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CurrencyDollar size={18} className="text-primary" weight="duotone" />
                        <span>Tuition (approx)</span>
                      </div>
                      <span className="font-semibold text-foreground">{dest.avgCost}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock size={18} className="text-primary" weight="duotone" />
                        <span>Duration</span>
                      </div>
                      <span className="font-semibold text-foreground text-right">{dest.studyDuration}</span>
                    </div>
                  </div>
                  
                  <div className="bg-accent/5 rounded-lg p-3 border border-accent/20">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Work Rights:</span> {dest.workRights}
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" 
                    onClick={() => onLearnMore(dest.id)}
                  >
                    Learn More & Apply
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}