import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { useState } from "react"
import { toast } from "sonner"
import { searchesAPI } from "@/lib/api"

interface QuickSearchProps {
  onBookConsultation?: () => void
}

export function QuickSearch({ onBookConsultation }: QuickSearchProps) {
  const [searchData, setSearchData] = useState({
    level: "",
    destination: "",
    field: ""
  })

  const handleSearch = async () => {
    if (!searchData.level && !searchData.destination && !searchData.field) {
      toast.error("Please fill at least one field", {
        description: "Select a study level, destination, or field of study to search."
      })
      return
    }

    try {
      const query = `${searchData.level} ${searchData.destination} ${searchData.field}`.trim()
      await searchesAPI.create(query, searchData)

      console.log("Search:", searchData)

      toast.success("Search Saved!", {
        description: "Opening consultation form for personalized recommendations."
      })

      // Trigger the Book Consultation flow immediately after successful search
      if (onBookConsultation) {
        onBookConsultation()
      }
    } catch (error) {
      console.error("Failed to save search:", error)
      toast.error("Failed to save search", {
        description: "Please try again or contact support."
      })
    }
  }

  return (
    <Card className="w-full max-w-5xl mx-auto -mt-8 relative z-20 p-6 md:p-8 shadow-2xl bg-card border-none">
      <h3 className="text-lg font-semibold mb-6 text-foreground">Find Your Perfect Study Program</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select value={searchData.level} onValueChange={(value) => setSearchData({...searchData, level: value})}>
          <SelectTrigger id="level">
            <SelectValue placeholder="Study Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="undergraduate">Undergraduate</SelectItem>
            <SelectItem value="postgraduate">Postgraduate</SelectItem>
            <SelectItem value="phd">PhD/Doctorate</SelectItem>
            <SelectItem value="diploma">Diploma/Certificate</SelectItem>
          </SelectContent>
        </Select>

        <Select value={searchData.destination} onValueChange={(value) => setSearchData({...searchData, destination: value})}>
          <SelectTrigger id="destination">
            <SelectValue placeholder="Destination" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="australia">Australia</SelectItem>
            <SelectItem value="canada">Canada</SelectItem>
            <SelectItem value="uae">United Arab Emirates</SelectItem>
            <SelectItem value="germany">Germany</SelectItem>
            <SelectItem value="ireland">Ireland</SelectItem>
            <SelectItem value="newzealand">New Zealand</SelectItem>
            <SelectItem value="singapore">Singapore</SelectItem>
            <SelectItem value="switzerland">Switzerland</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="italy">Italy</SelectItem>
            <SelectItem value="france">France</SelectItem>
            <SelectItem value="netherlands">Netherlands</SelectItem>
            <SelectItem value="sweden">Sweden</SelectItem>
            <SelectItem value="spain">Spain</SelectItem>
            <SelectItem value="austria">Austria</SelectItem>
            <SelectItem value="denmark">Denmark</SelectItem>
            <SelectItem value="finland">Finland</SelectItem>
            <SelectItem value="hungary">Hungary</SelectItem>
            <SelectItem value="cyprus">Cyprus</SelectItem>
            <SelectItem value="poland">Poland</SelectItem>
            <SelectItem value="malaysia">Malaysia</SelectItem>
            <SelectItem value="malta">Malta</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Field of Study"
          value={searchData.field}
          onChange={(e) => setSearchData({...searchData, field: e.target.value})}
        />

        <Button
          onClick={handleSearch}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
        >
          <MagnifyingGlass size={20} weight="bold" className="mr-2" />
          Search
        </Button>
      </div>
    </Card>
  )
}
