"use client"

import type React from "react"
import { useProtectedRoute } from "@/lib/hooks/use-protected-route"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, loading } = useProtectedRoute()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 md:ml-0">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
