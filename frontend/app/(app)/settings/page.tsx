"use client"

import { useAuth } from "@/lib/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [settings, setSettings] = useState({
    app_name: "CRM System",
    timezone: "UTC",
    language: "en",
    theme: "light",
    notifications_enabled: true,
  })

  const handleSave = () => {
    // Save settings logic here
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage system settings and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure general application settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Application Name</label>
            <Input value={settings.app_name} onChange={(e) => setSettings({ ...settings, app_name: e.target.value })} />
          </div>

          <div>
            <label className="text-sm font-medium">Timezone</label>
            <Input value={settings.timezone} onChange={(e) => setSettings({ ...settings, timezone: e.target.value })} />
          </div>

          <div>
            <label className="text-sm font-medium">Language</label>
            <Input value={settings.language} onChange={(e) => setSettings({ ...settings, language: e.target.value })} />
          </div>

          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input value={user?.name} disabled />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input value={user?.email} disabled />
          </div>
          <div>
            <label className="text-sm font-medium">Designation</label>
            <Input value={user?.designation} disabled />
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900">Danger Zone</CardTitle>
          <CardDescription className="text-red-800">Actions you cannot undo</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={logout}>
            Logout Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
