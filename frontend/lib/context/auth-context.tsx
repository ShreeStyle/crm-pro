"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/lib/types/api"

const USE_MOCK = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_USE_MOCK !== "false" : true

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Load session from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("crm_token")
    const storedUser = localStorage.getItem("crm_user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      let response: any
      if (USE_MOCK) {
        const { mockService } = await import("@/lib/services/mock-service")
        response = mockService.mockLogin()
      } else {
        const { apiService } = await import("@/lib/services/api-service")
        response = await apiService.login({ email, password })
      }

      const newToken = response.token
      const newUser = response.user

      setToken(newToken)
      setUser(newUser)

      localStorage.setItem("crm_token", newToken)
      localStorage.setItem("crm_user", JSON.stringify(newUser))
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("crm_token")
    localStorage.removeItem("crm_user")
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
