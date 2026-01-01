import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={`text-xs pt-1 ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
            {trend.isPositive ? "+" : "-"}
            {Math.abs(trend.value)}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}
