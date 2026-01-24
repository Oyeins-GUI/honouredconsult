import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Envelope, Bell, CheckCircle } from "@phosphor-icons/react"
import { getNotificationSettings, updateNotificationSettings } from "@/lib/notifications"

export function NotificationSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    ownerEmail: "",
    enableNotifications: true,
    notifyOnSubmission: true
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const savedSettings = await getNotificationSettings()

      setSettings({
        ownerEmail: savedSettings.ownerEmail || "info@honouredconsult.com",
        enableNotifications: savedSettings.enableNotifications,
        notifyOnSubmission: savedSettings.notifyOnSubmission
      })
    } catch (error) {
      console.error("Failed to load settings:", error)
      toast.error("Failed to load notification settings")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateNotificationSettings(settings)
      toast.success("Settings Saved", {
        description: "Your notification preferences have been updated."
      })
    } catch (error) {
      console.error("Failed to save settings:", error)
      toast.error("Failed to save settings", {
        description: "Please try again."
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Loading settings...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bell size={20} weight="duotone" className="text-primary" />
          </div>
          <div>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Configure when to receive email alerts</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="owner-email">Notification Email Address</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Envelope
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="owner-email"
                  type="email"
                  value={settings.ownerEmail}
                  onChange={(e) => setSettings({ ...settings, ownerEmail: e.target.value })}
                  placeholder="your.email@example.com"
                  className="pl-10 h-11"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Email notifications will be logged and sent to this address
            </p>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-border">
            <div className="space-y-1">
              <Label htmlFor="enable-notifications" className="cursor-pointer font-medium">
                Enable Email Notifications
              </Label>
              <p className="text-xs text-muted-foreground">
                Receive email alerts for important events
              </p>
            </div>
            <Switch
              id="enable-notifications"
              checked={settings.enableNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, enableNotifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between py-3 border-t border-border">
            <div className="space-y-1">
              <Label htmlFor="notify-submission" className="cursor-pointer font-medium">
                New Consultation Alerts
              </Label>
              <p className="text-xs text-muted-foreground">
                Get notified when a student books a consultation
              </p>
            </div>
            <Switch
              id="notify-submission"
              checked={settings.notifyOnSubmission}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, notifyOnSubmission: checked })
              }
              disabled={!settings.enableNotifications}
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving || !settings.ownerEmail}
          className="w-full h-11 font-semibold"
        >
          {saving ? (
            "Saving..."
          ) : (
            <>
              <CheckCircle size={20} weight="bold" className="mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
