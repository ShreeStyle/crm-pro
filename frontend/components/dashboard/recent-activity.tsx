import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Activity } from "@/lib/types/api"

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
