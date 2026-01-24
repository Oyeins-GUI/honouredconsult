import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from "react"
import {
  User,
  Envelope,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  MagnifyingGlass,
  X,
  CheckCircle,
  Clock,
  Bell
} from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { NotificationSettings } from "@/components/NotificationSettings"
import { NotificationHistory } from "@/components/NotificationHistory"
import { consultationsAPI, searchesAPI } from "@/lib/api"

interface AdminDashboardProps {
  open: boolean
  onClose: () => void
}

export function AdminDashboard({ open, onClose }: AdminDashboardProps) {
  const [consultations, setConsultations] = useState<any[]>([])
  const [searches, setSearches] = useState<any[]>([])
  const [isOwner, setIsOwner] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkOwner = async () => {
      try {
        // Check if user is logged in as admin
        const token = localStorage.getItem('auth_token');
        const user = localStorage.getItem('user');

        if (token && user) {
          const userData = JSON.parse(user);
          setIsOwner(userData.isAdmin || userData.isOwner || false);
        } else {
          setIsOwner(false);
        }
      } catch (error) {
        setIsOwner(false)
      }
    }
    checkOwner()
  }, [])

  useEffect(() => {
    if (open && isOwner) {
      loadData()
      setRefreshTrigger(prev => prev + 1)
    }
  }, [open, isOwner])

  const loadData = async () => {
    setLoading(true)
    try {
      const [consultationsRes, searchesRes] = await Promise.all([
        consultationsAPI.getAll(),
        searchesAPI.getAll()
      ])

      setConsultations(consultationsRes.data || [])
      setSearches(searchesRes.data || [])
    } catch (error) {
      console.error('Failed to load admin data:', error)
      setConsultations([])
      setSearches([])
    } finally {
      setLoading(false)
    }
  }

  if (!open || !isOwner) return null

  const sortedConsultations = [...(consultations || [])].sort((a, b) =>
    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  )

  const sortedSearches = [...(searches || [])].sort((a, b) =>
    new Date(b.searchedAt).getTime() - new Date(a.searchedAt).getTime()
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage consultations and track user searches</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-12 w-12">
            <X size={24} weight="bold" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{consultations?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {consultations?.filter((c: any) => c.status === "pending").length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary-foreground">{searches?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="consultations" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="searches">Searches</TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell size={16} className="mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="consultations" className="mt-6">
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {sortedConsultations.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">No consultations yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  sortedConsultations.map((consultation: any) => (
                    <Card key={consultation.id} className="overflow-hidden">
                      <div className="h-1 bg-primary" />
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl mb-1">
                              {consultation.firstName} {consultation.lastName}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <Calendar size={14} />
                              {new Date(consultation.submittedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </CardDescription>
                          </div>
                          <Badge className={
                            consultation.status === "pending" 
                              ? "bg-accent text-accent-foreground" 
                              : "bg-primary text-primary-foreground"
                          }>
                            {consultation.status === "pending" ? (
                              <>
                                <Clock size={14} className="mr-1" />
                                Pending
                              </>
                            ) : (
                              <>
                                <CheckCircle size={14} className="mr-1" />
                                Reviewed
                              </>
                            )}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Envelope size={18} weight="duotone" className="text-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Email</p>
                              <p className="text-sm font-medium">{consultation.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Phone size={18} weight="duotone" className="text-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Phone</p>
                              <p className="text-sm font-medium">{consultation.phone}</p>
                            </div>
                          </div>
                          
                          {consultation.country && (
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <MapPin size={18} weight="duotone" className="text-primary" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Current Country</p>
                                <p className="text-sm font-medium">{consultation.country}</p>
                              </div>
                            </div>
                          )}
                          
                          {consultation.destination && (
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <GraduationCap size={18} weight="duotone" className="text-primary" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Destination</p>
                                <p className="text-sm font-medium capitalize">{consultation.destination}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {consultation.service && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Service Interest</p>
                            <Badge variant="secondary">{consultation.service}</Badge>
                          </div>
                        )}
                        
                        {consultation.message && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Message</p>
                            <p className="text-sm bg-secondary/30 p-3 rounded-lg border border-border/50">
                              {consultation.message}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="searches" className="mt-6">
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {sortedSearches.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">No searches yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  sortedSearches.map((search: any) => (
                    <Card key={search.id}>
                      <CardContent className="py-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                              <MagnifyingGlass size={18} weight="duotone" className="text-accent" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-2 mb-2">
                                {search.level && <Badge variant="secondary">Level: {search.level}</Badge>}
                                {search.destination && <Badge variant="secondary">Destination: {search.destination}</Badge>}
                                {search.field && <Badge variant="secondary">Field: {search.field}</Badge>}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {new Date(search.searchedAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <NotificationHistory refreshTrigger={refreshTrigger} />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <NotificationSettings />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}
