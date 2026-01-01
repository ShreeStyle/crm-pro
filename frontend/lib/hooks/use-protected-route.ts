"use client"

// Hook to protect routes that require authentication
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/auth-context"
import { useEffect } from "react"

export function useProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading, router])

  return { isAuthenticated, loading }
}
