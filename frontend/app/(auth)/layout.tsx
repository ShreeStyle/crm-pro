import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - CRM System",
  description: "Login to your CRM account",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
