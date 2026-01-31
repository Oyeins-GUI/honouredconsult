import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  MapPin, 
  TrendUp, 
  Heart, 
  Buildings, 
  CurrencyDollar,
  Users,
  Briefcase,
  Globe,
  ChartLineUp,
  AirplaneTilt,
  Clock
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface CountryData {
  id: string;
  name: string;
  flag: string;
  tagline: string;
  heroImage: string;
  description: string;
  fullDescription: string;
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  facts: {
    label: string;
    value: string;
  }[];
  popularCities: string[];
  topUniversities: string[];
  careerProspects: string;
  whyStudyHere: string[];
}

const countryData: Record<string, CountryData> = {
  australia: {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    tagline: "Where Excellence Meets Adventure",
    heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1920&h=600&fit=crop",
    description: "Experience world-class education in one of the most liveable countries with stunning natural beauty.",
    fullDescription: "Australia offers an unparalleled study experience combining academic excellence with an exceptional quality of life. Home to 7 of the world's top 100 universities, Australia provides internationally recognized qualifications that open doors globally. The country's multicultural society welcomes over 700,000 international students annually, creating a vibrant and diverse learning environment.",
    highlights: [
      {
        icon: "graduation",
        title: "World-Class Education",
        description: "43 universities offering 22,000+ programs with globally recognized degrees and cutting-edge research facilities"
      },
      {
        icon: "work",
        title: "Generous Work Rights",
        description: "Post-study work visa for 2-4 years with excellent pathways to permanent residency"
      },
      {
        icon: "lifestyle",
        title: "Outstanding Lifestyle",
        description: "Beautiful beaches, vibrant cities, and a laid-back culture with excellent work-life balance"
      },
      {
        icon: "safety",
        title: "Safe & Welcoming",
        description: "One of the safest countries globally with strong student protection laws and support services"
      }
    ],
    facts: [
      { label: "Universities", value: "43+" },
      { label: "International Students", value: "700,000+" },
      { label: "Average Tuition", value: "$20k-$45k/year" },
      { label: "Post-Study Work", value: "2-4 years" },
      { label: "Quality of Life Rank", value: "Top 10 Globally" },
      { label: "Part-time Work", value: "48 hours/fortnight" }
    ],
    popularCities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra"],
    topUniversities: [
      "Australian National University",
      "University of Melbourne",
      "University of Sydney",
      "University of Queensland",
      "Monash University"
    ],
    careerProspects: "Australia's strong economy and skills shortage across various sectors create excellent job opportunities for graduates. With high minimum wages, strong worker protections, and pathways to permanent residency, Australia is ideal for building a successful international career.",
    whyStudyHere: [
      "7 universities ranked in the world's top 100",
      "Post-study work rights for 2-4 years depending on qualification",
      "Excellent pathway to permanent residency through skilled migration",
      "Safe, multicultural, and welcoming environment",
      "High quality of life with beautiful weather year-round",
      "Strong student protection laws and consumer rights",
      "Work rights during studies (48 hours per fortnight)",
      "English-speaking country with internationally recognized qualifications"
    ]
  },
  canada: {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    tagline: "Your Gateway to North American Success",
    heroImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1920&h=600&fit=crop",
    description: "Study in one of the world's most welcoming countries with affordable education and clear immigration pathways.",
    fullDescription: "Canada has become the top choice for international students worldwide, welcoming over 800,000 students annually. Known for its affordable yet high-quality education, multicultural society, and clear pathways to permanent residency, Canada offers the perfect blend of academic excellence and future opportunities. Canadian degrees are recognized globally, and the country's focus on research and innovation creates a dynamic learning environment.",
    highlights: [
      {
        icon: "education",
        title: "Affordable Excellence",
        description: "High-quality education at significantly lower costs compared to US and UK, with numerous scholarship opportunities"
      },
      {
        icon: "immigration",
        title: "PR Pathways",
        description: "Clear immigration pathways through Express Entry, PNP, and CEC programs designed for international students"
      },
      {
        icon: "diversity",
        title: "Multicultural Hub",
        description: "Extremely diverse and welcoming society with strong international communities and student support"
      },
      {
        icon: "opportunity",
        title: "Career Opportunities",
        description: "Booming tech sector and skills shortages across industries with competitive salaries"
      }
    ],
    facts: [
      { label: "Universities", value: "100+" },
      { label: "International Students", value: "800,000+" },
      { label: "Average Tuition", value: "$20k-$35k/year" },
      { label: "Post-Graduation Work Permit", value: "Up to 3 years" },
      { label: "Education System Rank", value: "Top 5 Globally" },
      { label: "Work During Studies", value: "20 hours/week" }
    ],
    popularCities: ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary", "Winnipeg"],
    topUniversities: [
      "University of Toronto",
      "University of British Columbia",
      "McGill University",
      "McMaster University",
      "University of Alberta"
    ],
    careerProspects: "Canada faces significant skills shortages across technology, healthcare, engineering, and business sectors. International graduates benefit from the Post-Graduation Work Permit (PGWP) program and can transition to permanent residency through various immigration streams. The country's strong economy and immigrant-friendly policies make it ideal for long-term career growth.",
    whyStudyHere: [
      "3-year post-graduation work permit for most programs",
      "Clear pathways to permanent residency and citizenship",
      "More affordable than US and UK while maintaining quality",
      "Extremely safe and politically stable nation",
      "Multicultural society with low discrimination",
      "Strong focus on research and innovation",
      "Work rights during studies (20 hours/week, full-time during breaks)",
      "Spouse work permit and dependent visa options available"
    ]
  },
  uae: {
    id: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    tagline: "Where East Meets West in Education Excellence",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=600&fit=crop",
    description: "Experience cutting-edge education in a rapidly growing international hub connecting three continents.",
    fullDescription: "The UAE has emerged as a leading education destination in the Middle East, attracting students from over 200 countries. With world-class infrastructure, tax-free environment, and strategic location, the UAE offers a unique blend of traditional Arab culture and cosmopolitan lifestyle. Home to branch campuses of prestigious universities and its own rapidly rising institutions, the UAE provides quality education in a safe, modern environment.",
    highlights: [
      {
        icon: "modern",
        title: "World-Class Infrastructure",
        description: "State-of-the-art campuses with cutting-edge facilities, smart classrooms, and research centers"
      },
      {
        icon: "business",
        title: "Business Hub",
        description: "Gateway to Middle East, Africa, and Asia with major multinational corporations and startups"
      },
      {
        icon: "diversity",
        title: "International Environment",
        description: "Over 200 nationalities living together peacefully in a modern, cosmopolitan setting"
      },
      {
        icon: "lifestyle",
        title: "Exceptional Lifestyle",
        description: "Tax-free income, world-class amenities, perfect weather in winter, and unmatched safety"
      }
    ],
    facts: [
      { label: "Universities", value: "70+" },
      { label: "International Students", value: "250,000+" },
      { label: "Average Tuition", value: "$15k-$30k/year" },
      { label: "Safety Rank", value: "Top 10 Globally" },
      { label: "Tax Rate", value: "0% Personal Tax" },
      { label: "Work Opportunities", value: "Post-study visa available" }
    ],
    popularCities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain"],
    topUniversities: [
      "Khalifa University",
      "American University of Sharjah",
      "UAE University",
      "Zayed University",
      "Heriot-Watt University Dubai"
    ],
    careerProspects: "The UAE's booming economy, particularly in technology, finance, tourism, and renewable energy, creates excellent opportunities for graduates. With no personal income tax, competitive salaries, and a strategic location for business, the UAE attracts global talent. Recent visa reforms allow graduates to stay and seek employment.",
    whyStudyHere: [
      "Tax-free environment with high standard of living",
      "Strategic location connecting three continents",
      "Extremely safe with world-class infrastructure",
      "Branch campuses of top US, UK, and Australian universities",
      "Growing tech and innovation ecosystem",
      "Multicultural environment with 200+ nationalities",
      "Perfect winter weather and world-class leisure facilities",
      "English widely spoken in business and education"
    ]
  },
  uk: {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    tagline: "Home of Historic Excellence and Innovation",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&h=600&fit=crop",
    description: "Study at world-renowned institutions with centuries of academic tradition and modern innovation.",
    fullDescription: "The UK remains one of the world's premier study destinations, home to 4 of the global top 10 universities. With a rich academic heritage dating back centuries, UK institutions combine traditional excellence with cutting-edge research and innovation. The shorter degree durations (3 years for bachelors, 1 year for masters) make UK education time and cost-efficient while maintaining world-class standards.",
    highlights: [
      {
        icon: "prestige",
        title: "Global Reputation",
        description: "Historic institutions like Oxford, Cambridge, and Imperial with unmatched global recognition"
      },
      {
        icon: "duration",
        title: "Shorter Degrees",
        description: "3-year bachelors and 1-year masters programs save time and money without compromising quality"
      },
      {
        icon: "work",
        title: "Graduate Route",
        description: "2-year post-study work visa for all graduates (3 years for PhD holders)"
      },
      {
        icon: "culture",
        title: "Rich Culture",
        description: "Historic cities, cultural diversity, and gateway to Europe for travel and opportunities"
      }
    ],
    facts: [
      { label: "Universities", value: "160+" },
      { label: "Programs Available", value: "65,000+" },
      { label: "Average Tuition", value: "£15k-£35k/year" },
      { label: "Post-Study Work", value: "2-3 years" },
      { label: "Top 10 Universities", value: "4 institutions" },
      { label: "Work During Studies", value: "20 hours/week" }
    ],
    popularCities: ["London", "Manchester", "Edinburgh", "Birmingham", "Glasgow", "Bristol"],
    topUniversities: [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "University College London (UCL)",
      "University of Edinburgh"
    ],
    careerProspects: "The UK's Graduate Route visa allows international students to stay and work for 2 years after completing their degree (3 years for PhD). With a strong economy, global companies, and status as a financial and tech hub, the UK offers excellent career opportunities. Many students use UK degrees as a stepping stone for global careers.",
    whyStudyHere: [
      "4 universities in the world's top 10",
      "Shorter degree durations save time and money",
      "2-year post-study work visa for all graduates",
      "English-speaking country with rich cultural heritage",
      "Gateway to Europe for travel and opportunities",
      "Strong research focus and innovation ecosystem",
      "Diverse international student community",
      "Globally recognized qualifications that open doors worldwide"
    ]
  },
  germany: {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    tagline: "Quality Education at No Tuition Cost",
    heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920&h=600&fit=crop",
    description: "Study for free at world-class universities in Europe's economic powerhouse.",
    fullDescription: "Germany stands out as the top destination for tuition-free quality education. Most public universities charge little to no tuition fees, even for international students, making world-class education accessible to all. As Europe's largest economy and a global leader in engineering, automotive, and technology sectors, Germany offers excellent education combined with practical work experience and strong career prospects.",
    highlights: [
      {
        icon: "free",
        title: "No Tuition Fees",
        description: "Most public universities charge minimal fees (€300-500/semester) for world-class education"
      },
      {
        icon: "engineering",
        title: "Engineering Excellence",
        description: "World leader in engineering, automotive, manufacturing, and technical education"
      },
      {
        icon: "economy",
        title: "Strong Economy",
        description: "Europe's largest economy with headquarters of major global corporations"
      },
      {
        icon: "research",
        title: "Innovation Hub",
        description: "Heavily invested in research and development with numerous opportunities for students"
      }
    ],
    facts: [
      { label: "Universities", value: "380+" },
      { label: "Programs Available", value: "20,000+" },
      { label: "Tuition (Public Unis)", value: "€0-€500/semester" },
      { label: "Job Search Visa", value: "18 months" },
      { label: "Engineering Rank", value: "#1 in Europe" },
      { label: "Work During Studies", value: "120 full days/year" }
    ],
    popularCities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart"],
    topUniversities: [
      "Technical University of Munich",
      "Ludwig Maximilian University of Munich",
      "Heidelberg University",
      "Humboldt University of Berlin",
      "RWTH Aachen University"
    ],
    careerProspects: "Germany's strong economy, particularly in engineering, automotive, chemicals, and technology, creates abundant opportunities for graduates. The 18-month job search visa allows ample time to find employment. Once employed, the path to permanent residency is straightforward. Germany's Blue Card scheme facilitates EU work rights for highly skilled professionals.",
    whyStudyHere: [
      "No or very low tuition fees at public universities",
      "World-renowned engineering and technical programs",
      "18-month job search visa after graduation",
      "Strong economy with excellent career prospects",
      "Central European location perfect for travel",
      "High quality of life with efficient public services",
      "Many English-taught programs available",
      "Affordable cost of living compared to UK/US"
    ]
  },
  ireland: {
    id: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    tagline: "Europe's Tech Hub with Irish Charm",
    heroImage: "https://images.unsplash.com/photo-1590074072965-e0e7dc1b1bf6?w=1920&h=600&fit=crop",
    description: "Study in English in the heart of Europe's booming tech industry with friendly immigration policies.",
    fullDescription: "Ireland has become Europe's premier destination for technology and business education, hosting European headquarters of Google, Facebook, Apple, Microsoft, and hundreds of other tech giants. As the only English-speaking country in the EU after Brexit, Ireland offers unique advantages with access to both European and global opportunities. The welcoming Irish culture, combined with high-quality education and excellent work rights, makes Ireland increasingly popular among international students.",
    highlights: [
      {
        icon: "tech",
        title: "Tech Capital of Europe",
        description: "European HQs of Google, Apple, Facebook, Microsoft, and 1000+ tech companies"
      },
      {
        icon: "english",
        title: "English-Speaking EU",
        description: "Only English-speaking country in EU providing access to European opportunities"
      },
      {
        icon: "friendly",
        title: "Welcoming Culture",
        description: "Known for friendly people, vibrant culture, and supportive international student community"
      },
      {
        icon: "work",
        title: "Excellent Work Rights",
        description: "2-year stay-back visa with straightforward pathway to work in tech industry"
      }
    ],
    facts: [
      { label: "Universities", value: "34+" },
      { label: "Tech Companies", value: "1,000+" },
      { label: "Average Tuition", value: "€10k-€25k/year" },
      { label: "Stay-Back Visa", value: "2 years" },
      { label: "EU Access", value: "Only English-speaking" },
      { label: "Work During Studies", value: "20 hours/week" }
    ],
    popularCities: ["Dublin", "Cork", "Galway", "Limerick", "Waterford", "Maynooth"],
    topUniversities: [
      "Trinity College Dublin",
      "University College Dublin",
      "University College Cork",
      "National University of Ireland Galway",
      "Dublin City University"
    ],
    careerProspects: "Ireland's thriving tech sector, combined with finance, pharmaceuticals, and medical devices industries, creates exceptional opportunities for graduates. The 2-year stay-back visa provides ample time to secure employment with competitive salaries. As an EU member, Ireland also offers access to broader European job markets.",
    whyStudyHere: [
      "Only English-speaking country in the EU",
      "European headquarters of major tech companies",
      "2-year post-study work visa for all graduates",
      "Friendly and welcoming Irish culture",
      "Gateway to European travel and opportunities",
      "Strong economy with low unemployment",
      "Beautiful landscapes and rich cultural heritage",
      "Relatively easier visa process compared to UK/US"
    ]
  },
  newzealand: {
    id: "newzealand",
    name: "New Zealand",
    flag: "🇳🇿",
    tagline: "Where Natural Beauty Meets Educational Excellence",
    heroImage: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1920&h=600&fit=crop",
    description: "Experience world-class education in one of the world's most beautiful and peaceful countries.",
    fullDescription: "New Zealand offers an intimate, high-quality education experience in breathtaking natural surroundings. Known for its innovative teaching methods, small class sizes, and focus on practical learning, New Zealand's education system consistently ranks among the world's best. The country's stunning landscapes, outdoor lifestyle, and safe, welcoming culture create an ideal environment for both academic and personal growth.",
    highlights: [
      {
        icon: "quality",
        title: "Top-Ranked Education",
        description: "All 8 universities ranked in top 3% globally with innovative teaching methods"
      },
      {
        icon: "safety",
        title: "Safe & Peaceful",
        description: "One of the world's safest countries with low crime and political stability"
      },
      {
        icon: "nature",
        title: "Stunning Natural Beauty",
        description: "Breathtaking landscapes from mountains to beaches, perfect for adventure lovers"
      },
      {
        icon: "innovation",
        title: "Innovation Focus",
        description: "Emphasis on creativity, critical thinking, and practical problem-solving skills"
      }
    ],
    facts: [
      { label: "Universities", value: "8 (All top-ranked)" },
      { label: "Programs Available", value: "3,000+" },
      { label: "Average Tuition", value: "$22k-$32k/year" },
      { label: "Post-Study Work", value: "Up to 3 years" },
      { label: "Safety Rank", value: "Top 5 Globally" },
      { label: "Work During Studies", value: "20 hours/week" }
    ],
    popularCities: ["Auckland", "Wellington", "Christchurch", "Dunedin", "Hamilton", "Palmerston North"],
    topUniversities: [
      "University of Auckland",
      "University of Otago",
      "Victoria University of Wellington",
      "University of Canterbury",
      "Massey University"
    ],
    careerProspects: "New Zealand's growing economy, particularly in agriculture, technology, tourism, and creative industries, offers good opportunities for graduates. The post-study work visa (up to 3 years) provides time to gain valuable experience. New Zealand's relaxed lifestyle, excellent work-life balance, and pathways to residency make it attractive for long-term settlement.",
    whyStudyHere: [
      "All 8 universities in top 3% globally",
      "Up to 3-year post-study work visa",
      "One of the world's safest and most peaceful countries",
      "Spectacular natural beauty and outdoor lifestyle",
      "Small class sizes with personalized attention",
      "Innovative and practical teaching methods",
      "Friendly, welcoming culture with low discrimination",
      "Strong pathways to permanent residency"
    ]
  },
  singapore: {
    id: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    tagline: "Asia's Premier Education and Business Hub",
    heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920&h=600&fit=crop",
    description: "Study at world-class institutions in one of Asia's most developed and safest nations.",
    fullDescription: "Singapore has established itself as Asia's leading education hub, home to top-ranked universities and branch campuses of prestigious Western institutions. The city-state's strategic location, exceptional safety, world-class infrastructure, and thriving economy make it an ideal destination for ambitious students. Singapore's multicultural society, efficient governance, and focus on innovation create a dynamic environment for learning and career development.",
    highlights: [
      {
        icon: "excellence",
        title: "Academic Excellence",
        description: "2 universities in global top 15 with cutting-edge research and teaching"
      },
      {
        icon: "safety",
        title: "Ultra-Safe",
        description: "One of the world's safest cities with extremely low crime rates"
      },
      {
        icon: "business",
        title: "Business Hub",
        description: "Asian headquarters of 7,000+ multinational corporations"
      },
      {
        icon: "location",
        title: "Strategic Location",
        description: "Gateway to Asia-Pacific with excellent connectivity to the region"
      }
    ],
    facts: [
      { label: "Universities", value: "30+" },
      { label: "Top 15 Globally", value: "2 universities" },
      { label: "Average Tuition", value: "$15k-$30k/year" },
      { label: "Training Employment Pass", value: "Up to 1 year" },
      { label: "Safety Rank", value: "#1 in Asia" },
      { label: "Quality of Life", value: "Top 20 Globally" }
    ],
    popularCities: ["Singapore (City-state)"],
    topUniversities: [
      "National University of Singapore (NUS)",
      "Nanyang Technological University (NTU)",
      "Singapore Management University",
      "Singapore University of Technology and Design",
      "INSEAD Asia Campus"
    ],
    careerProspects: "Singapore's position as Asia's financial, technology, and business hub creates excellent career opportunities. With headquarters of major global corporations and a thriving startup ecosystem, graduates find diverse opportunities. The Training Employment Pass allows graduates to stay and seek employment, though permanent work visas are selective and merit-based.",
    whyStudyHere: [
      "2 universities ranked in global top 15",
      "Asian hub for finance, tech, and business",
      "Extremely safe with world-class infrastructure",
      "Strategic gateway to Asia-Pacific region",
      "Multicultural society with four official languages",
      "Excellent quality of life with modern amenities",
      "Strong focus on innovation and research",
      "English as primary language of instruction"
    ]
  }
};

// Function to get country data with fallback
const getCountryData = (countryId: string): CountryData | null => {
  if (countryData[countryId]) {
    return countryData[countryId];
  }
  
  // Fallback for countries without detailed data
  const fallbackCountries: Record<string, Partial<CountryData>> = {
    switzerland: {
      name: "Switzerland",
      flag: "🇨🇭",
      tagline: "Excellence in Education & Quality of Life"
    },
    italy: {
      name: "Italy",
      flag: "🇮🇹",
      tagline: "Study Where Culture Meets Innovation"
    },
    france: {
      name: "France",
      flag: "🇫🇷",
      tagline: "Embrace Culture, Excellence, and Innovation"
    },
    netherlands: {
      name: "Netherlands",
      flag: "🇳🇱",
      tagline: "Progressive Education in the Heart of Europe"
    },
    sweden: {
      name: "Sweden",
      flag: "🇸🇪",
      tagline: "Innovation Meets Sustainability"
    },
    spain: {
      name: "Spain",
      flag: "🇪🇸",
      tagline: "Vibrant Culture & Quality Education"
    },
    austria: {
      name: "Austria",
      flag: "🇦🇹",
      tagline: "Historic Excellence in the Heart of Europe"
    },
    denmark: {
      name: "Denmark",
      flag: "🇩🇰",
      tagline: "Happiness & Educational Excellence"
    },
    finland: {
      name: "Finland",
      flag: "🇫🇮",
      tagline: "World's Best Education System"
    },
    hungary: {
      name: "Hungary",
      flag: "🇭🇺",
      tagline: "Affordable Quality in Central Europe"
    },
    cyprus: {
      name: "Cyprus",
      flag: "🇨🇾",
      tagline: "Mediterranean Education Paradise"
    },
    poland: {
      name: "Poland",
      flag: "🇵🇱",
      tagline: "Rich Heritage Meets Modern Education"
    },
    malaysia: {
      name: "Malaysia",
      flag: "🇲🇾",
      tagline: "Gateway to Asian Education"
    },
    malta: {
      name: "Malta",
      flag: "🇲🇹",
      tagline: "English Education in the Mediterranean"
    }
  };
  
  const fallback = fallbackCountries[countryId];
  if (!fallback) return null;
  
  return {
    id: countryId,
    name: fallback.name!,
    flag: fallback.flag!,
    tagline: fallback.tagline!,
    heroImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=600&fit=crop",
    description: `Discover excellent educational opportunities in ${fallback.name}.`,
    fullDescription: `${fallback.name} offers high-quality education with a rich cultural experience. International students benefit from diverse programs, welcoming communities, and excellent support services. The country provides a unique blend of academic excellence and cultural immersion.`,
    highlights: [
      {
        icon: "education",
        title: "Quality Education",
        description: `World-class universities and programs recognized globally`
      },
      {
        icon: "culture",
        title: "Rich Culture",
        description: `Immerse yourself in a vibrant cultural experience`
      },
      {
        icon: "support",
        title: "Student Support",
        description: `Comprehensive support services for international students`
      },
      {
        icon: "opportunity",
        title: "Career Opportunities",
        description: `Growing job market with opportunities across sectors`
      }
    ],
    facts: [
      { label: "Universities", value: "Multiple" },
      { label: "International Students", value: "Thousands" },
      { label: "Programs", value: "Wide Range" },
      { label: "Living Cost", value: "Affordable" },
      { label: "Safety", value: "High" },
      { label: "Work Rights", value: "Available" }
    ],
    popularCities: ["Capital City", "Major Cities"],
    topUniversities: [
      "Leading Universities",
      "Top Institutions",
      "Renowned Colleges"
    ],
    careerProspects: `${fallback.name} offers growing career opportunities for international graduates. With work rights available for students and post-graduation, you can gain valuable experience in various industries. The country's developing economy creates opportunities across multiple sectors.`,
    whyStudyHere: [
      "Internationally recognized qualifications",
      "Affordable tuition and living costs",
      "Multicultural environment",
      "Student work rights available",
      "Post-study work opportunities",
      "Safe and welcoming environment",
      "Rich cultural experience",
      "Strategic location for travel"
    ]
  };
};

interface CountryAboutProps {
  onBookConsultation: (context?: string) => void;
}

export function CountryAbout({ onBookConsultation }: CountryAboutProps) {
  const { countryId } = useParams<{ countryId: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [countryId]);

  const country = countryId ? getCountryData(countryId) : null;

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Country Not Found</h1>
          <Button onClick={() => navigate("/")}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    onBookConsultation(`I'm interested in studying in ${country.name}`);
  };

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      graduation: GraduationCap,
      work: Briefcase,
      lifestyle: Heart,
      safety: Heart,
      education: GraduationCap,
      immigration: AirplaneTilt,
      diversity: Users,
      opportunity: ChartLineUp,
      modern: Buildings,
      business: Briefcase,
      prestige: GraduationCap,
      duration: Clock,
      culture: Globe,
      free: CurrencyDollar,
      engineering: Buildings,
      economy: ChartLineUp,
      research: GraduationCap,
      tech: Buildings,
      english: Globe,
      friendly: Heart,
      quality: GraduationCap,
      nature: MapPin,
      innovation: TrendUp,
      excellence: GraduationCap,
      location: MapPin
    };
    const IconComponent = iconMap[iconName] || GraduationCap;
    return <IconComponent size={32} weight="duotone" className="text-primary" />;
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section with Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${country.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl w-full"
          >
            <div className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl mb-4 md:mb-6 drop-shadow-2xl text-primary font-bold">{country.flag}</div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg px-2 break-words">
              Study in {country.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium drop-shadow-lg px-2 break-words">
              {country.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="border-border/50 shadow-lg bg-white">
            <CardContent className="p-6 md:p-8 lg:p-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-foreground break-words">
                {country.description}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed break-words">
                {country.fullDescription}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Facts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-gray-200 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-12 md:py-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center break-words px-2">Quick Facts</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {country.facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all hover:-translate-y-1 bg-white border-border/50">
                  <CardContent className="p-4">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2 break-words">
                      {fact.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {fact.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center break-words px-2">Why Choose {country.name}?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {country.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 bg-white border-border/50">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {getIcon(highlight.icon)}
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 break-words">{highlight.title}</h4>
                        <p className="text-sm md:text-base text-muted-foreground break-words">{highlight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Study Here List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-gray-200 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-12 md:py-16">
            <Card className="bg-white border-border/50">
            <CardContent className="p-6 md:p-8 lg:p-10">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2 md:gap-3 flex-wrap">
                <GraduationCap size={24} weight="duotone" className="text-primary md:hidden flex-shrink-0" />
                <GraduationCap size={32} weight="duotone" className="text-primary hidden md:block flex-shrink-0" />
                <span className="break-words">Top Reasons to Study in {country.name}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {country.whyStudyHere.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-muted-foreground break-words">{reason}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
          </div>
        </motion.div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Popular Cities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full bg-white border-border/50">
              <CardContent className="p-4 md:p-6 lg:p-8">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                  <MapPin size={20} weight="duotone" className="text-primary md:hidden" />
                  <MapPin size={28} weight="duotone" className="text-primary hidden md:block" />
                  Popular Student Cities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {country.popularCities.map((city, index) => (
                    <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                      {city}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Universities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <Card className="h-full bg-white border-border/50">
              <CardContent className="p-4 md:p-6 lg:p-8">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                  <GraduationCap size={20} weight="duotone" className="text-primary md:hidden" />
                  <GraduationCap size={28} weight="duotone" className="text-primary hidden md:block" />
                  Top Universities
                </h3>
                <ul className="space-y-2">
                  {country.topUniversities.map((university, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {university}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Career Prospects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <Card className="bg-white border-border/50">
            <CardContent className="p-6 md:p-8 lg:p-10">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 flex items-center gap-2 md:gap-3 break-words">
                <Briefcase size={24} weight="duotone" className="text-primary md:hidden flex-shrink-0" />
                <Briefcase size={32} weight="duotone" className="text-primary hidden md:block flex-shrink-0" />
                <span>Career Prospects</span>
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed break-words">
                {country.careerProspects}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gray-200 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-12 md:py-16">
            <Card className="bg-white border-border/50">
            <CardContent className="p-6 md:p-8 lg:p-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 break-words">
                Ready to Start Your Journey to {country.name}?
              </h3>
              <p className="text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-muted-foreground max-w-2xl mx-auto break-words px-2">
                Book a free consultation with our expert advisors to learn more about studying in {country.name} and get personalized guidance for your application.
              </p>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base md:text-lg px-6 md:px-8 py-5 md:py-6 hover:scale-105 transition-transform shadow-xl"
                onClick={handleApply}
              >
                <AirplaneTilt size={24} weight="duotone" className="mr-2" />
                Book Your Free Consultation
              </Button>
            </CardContent>
          </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
