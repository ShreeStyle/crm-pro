"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }
  }, [isAuthenticated, loading, router])

  return null
}
