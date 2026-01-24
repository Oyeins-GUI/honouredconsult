import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Envelope, Calendar, CheckCircle, Copy } from "@phosphor-icons/react"
import { getNotificationHistory } from "@/lib/notifications"
import { toast } from "sonner"
import { motion } from "framer-motion"

interface NotificationHistoryProps {
  refreshTrigger?: number
}

export function NotificationHistory({ refreshTrigger }: NotificationHistoryProps) {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    loadNotifications()
  }, [refreshTrigger])

  const loadNotifications = async () => {
    try {
      const history = await getNotificationHistory()
      setNotifications(history)
    } catch (error) {
      console.error("Failed to load notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Loading notification history...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Notification History</CardTitle>
            <CardDescription>
              View all email notifications sent for consultations
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-base px-3 py-1">
            {notifications.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Envelope size={48} weight="duotone" className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No notifications sent yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Notifications will appear here when consultations are submitted
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification: any) => (
                <motion.div
                  key={notification.consultationId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                            <Envelope size={18} weight="duotone" className="text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-1">
                              {notification.subject || "New Consultation"}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar size={12} />
                              {new Date(notification.sentAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-accent/10 text-accent border-accent/20 flex-shrink-0">
                          <CheckCircle size={12} className="mr-1" />
                          Sent
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">To:</span>
                          <span className="font-medium">{notification.recipientEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">ID:</span>
                          <code className="text-xs bg-secondary/50 px-2 py-0.5 rounded">
                            {notification.consultationId}
                          </code>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-3 h-9"
                        onClick={() =>
                          setExpandedId(
                            expandedId === notification.consultationId
                              ? null
                              : notification.consultationId
                          )
                        }
                      >
                        {expandedId === notification.consultationId
                          ? "Hide Email Content"
                          : "View Email Content"}
                      </Button>

                      {expandedId === notification.consultationId && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-border"
                        >
                          <div className="relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 z-10 h-8 w-8 p-0"
                              onClick={() => copyToClipboard(notification.emailContent)}
                            >
                              <Copy size={16} />
                            </Button>
                            <pre className="text-xs bg-secondary/30 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                              {notification.emailContent}
                            </pre>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
