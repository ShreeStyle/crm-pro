"use client"

import { useAuth } from "@/lib/context/auth-context"
import { useDashboardMetrics } from "@/lib/hooks/use-api"
import { MetricCard } from "@/components/dashboard/metric-card"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Users, TrendingUp, Briefcase, CheckSquare, Zap } from "lucide-react"

export default function DashboardPage() {
  const { token } = useAuth()
  const { data: metrics, isLoading } = useDashboardMetrics(token)

  if (isLoading || !metrics) {
    return (
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your CRM metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Users"
          value={metrics.total_users}
          icon={<Users className="w-4 h-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Total Sales"
          value={`$${(metrics.total_sales * 1000).toLocaleString()}`}
          icon={<TrendingUp className="w-4 h-4" />}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Active Projects"
          value={metrics.total_projects}
          icon={<Briefcase className="w-4 h-4" />}
          trend={{ value: 3, isPositive: true }}
        />
        <MetricCard
          title="Pending Tasks"
          value={metrics.total_tasks}
          icon={<CheckSquare className="w-4 h-4" />}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentActivity activities={metrics.recent_activities} />
        </div>
        <div className="space-y-4">
          <MetricCard
            title="Attendance Rate"
            value={`${metrics.attendance_rate}%`}
            icon={<Users className="w-4 h-4" />}
          />
          <MetricCard title="Total Leads" value={metrics.total_leads} icon={<Zap className="w-4 h-4" />} />
        </div>
      </div>
    </div>
  )
}
