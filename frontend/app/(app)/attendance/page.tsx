"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { useAttendance, useUsers } from "@/lib/hooks/use-api"
import type { AttendanceRecord } from "@/lib/types/api"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AttendancePage() {
  const { token } = useAuth()
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const { data: attendanceData, isLoading } = useAttendance(token)
  const { data: usersData } = useUsers(token)

  const users = usersData || []

  useEffect(() => {
    if (attendanceData) setAttendance(attendanceData)
  }, [attendanceData])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      present: "bg-green-100 text-green-800",
      absent: "bg-red-100 text-red-800",
      half_day: "bg-yellow-100 text-yellow-800",
      on_leave: "bg-blue-100 text-blue-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const columns = [
    {
      id: "user",
      label: "Employee",
      render: (record: AttendanceRecord) => {
        const user = users.find((u) => u.id === record.user_id)
        return user?.name || "-"
      },
    },
    {
      id: "status",
      label: "Status",
      render: (record: AttendanceRecord) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
          {record.status.replace("_", " ").toUpperCase()}
        </span>
      ),
    },
    {
      id: "check_in",
      label: "Check In",
      render: (record: AttendanceRecord) => record.check_in_time || "-",
    },
    {
      id: "check_out",
      label: "Check Out",
      render: (record: AttendanceRecord) => record.check_out_time || "-",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Attendance</h2>
          <p className="text-muted-foreground">Track employee attendance</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filter by Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40"
            />
            <Button>View</Button>
          </div>
        </CardContent>
      </Card>

      <DataTable columns={columns} data={attendance} loading={isLoading} />
    </div>
  )
}
