import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { toast } from "sonner"
import { CheckCircle, ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"
import { consultationsAPI } from "@/lib/api"

interface ConsultationFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialContext?: string
}

export function ConsultationForm({ open, onOpenChange, initialContext }: ConsultationFormProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    destination: "",
    service: initialContext || "",
    message: ""
  })

  const handleSubmit = async () => {
    if (step !== 2) {
      console.log("Form submitted from step", step, " - ignoring")
      return
    }

    setIsSubmitting(true)

    try {
      const newConsultation = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        destination: formData.destination,
        service: formData.service,
        message: formData.message
      }

      await consultationsAPI.create(newConsultation)

      toast.success("Consultation Booked Successfully!", {
        description: "Our counselor will contact you within 24 hours. A notification has been sent."
      })

      setStep(3)
      setIsSubmitting(false)
    } catch (error) {
      console.error("Failed to book consultation:", error)
      toast.error("Failed to book consultation", {
        description: "Please try again or contact us directly."
      })
      setIsSubmitting(false)
    }
  }

  const nextStep = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    if (step === 1 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone)) {
      toast.error("Please fill in all required fields")
      return
    }
    setStep(step + 1)
  }

  const progress = (step / 2) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 3 ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-12 px-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6"
              >
                <CheckCircle size={48} weight="duotone" className="text-accent" />
              </motion.div>
              <DialogTitle className="text-3xl mb-3">Consultation Booked!</DialogTitle>
              <DialogDescription className="text-base leading-relaxed">
                Thank you for choosing Honoured Educational Consult. Our expert counselor will contact you
                within 24 hours to confirm your appointment and discuss your study abroad goals.
              </DialogDescription>
              <div className="mt-6 text-sm text-muted-foreground">
                Check your email for confirmation details.
              </div>
              <div className="mt-8">
                <Button
                  onClick={() => {
                    onOpenChange(false)
                    setStep(1)
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      country: "",
                      destination: "",
                      service: initialContext || "",
                      message: ""
                    })
                  }}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12 px-8"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-primary p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-primary-foreground">Book Your Free Consultation</DialogTitle>
                  <DialogDescription className="text-primary-foreground/90 text-base">
                    Step {step} of 2 - {step === 1 ? "Personal Information" : "Study Preferences"}
                  </DialogDescription>
                </DialogHeader>
                <Progress value={progress} className="mt-4 h-2 bg-white/20" />
              </div>

              <form className="p-6 space-y-6">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                e.stopPropagation()
                                nextStep(e)
                              }
                            }}
                            required
                            className="h-11"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                e.stopPropagation()
                                nextStep(e)
                              }
                            }}
                            required
                            className="h-11"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              e.stopPropagation()
                              nextStep(e)
                            }
                          }}
                          required
                          className="h-11"
                          placeholder="john.doe@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              e.stopPropagation()
                              nextStep(e)
                            }
                          }}
                          required
                          className="h-11"
                          placeholder="+2347068385111"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Current Country</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              e.stopPropagation()
                              nextStep(e)
                            }
                          }}
                          placeholder="e.g., Nigeria"
                          className="h-11"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="destination">Preferred Study Destination</Label>
                        <Select value={formData.destination} onValueChange={(value) => setFormData({...formData, destination: value})}>
                          <SelectTrigger id="destination" className="h-11">
                            <SelectValue placeholder="Select destination" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usa">🇺🇸 United States</SelectItem>
                            <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                            <SelectItem value="canada">🇨🇦 Canada</SelectItem>
                            <SelectItem value="australia">🇦🇺 Australia</SelectItem>
                            <SelectItem value="germany">🇩🇪 Germany</SelectItem>
                            <SelectItem value="ireland">🇮🇪 Ireland</SelectItem>
                            <SelectItem value="netherlands">🇳🇱 Netherlands</SelectItem>
                            <SelectItem value="other">🌍 Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Service Interest</Label>
                        <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                          <SelectTrigger id="service" className="h-11">
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Consultation</SelectItem>
                            <SelectItem value="visa">Visa Guidance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Tell Us About Your Goals</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Share your study plans, qualifications, budget, or any questions you have..."
                          rows={5}
                          className="resize-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3 pt-4">
                  {step === 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 h-12"
                    >
                      <ArrowLeft size={20} className="mr-2" />
                      Back
                    </Button>
                  )}
                  {step === 1 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12"
                    >
                      Next
                      <ArrowRight size={20} className="ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => handleSubmit()}
                      disabled={isSubmitting}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12 disabled:opacity-50"
                    >
                      {isSubmitting ? "Booking..." : "Book Consultation"}
                      <CheckCircle size={20} weight="bold" className="ml-2" />
                    </Button>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
