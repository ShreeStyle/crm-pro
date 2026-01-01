"use client"

import { useAuth } from "@/lib/context/auth-context"
import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-background border-b border-border">
      <h1 className="text-lg font-semibold text-foreground">Welcome, {user?.name}</h1>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
