"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { useEodReports, useUsers } from "@/lib/hooks/use-api"
import type { EODReport } from "@/lib/types/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EODReportsPage() {
  const { token } = useAuth()
  const [reports, setReports] = useState<EODReport[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<EODReport | undefined>()
  const [formData, setFormData] = useState({
    user_id: "",
    date: new Date().toISOString().split("T")[0],
    content: "",
    tasks_completed: 0,
    tasks_pending: 0,
    blockers: "",
  })

  const { data: reportsData, isLoading } = useEodReports(token)
  const { data: usersData } = useUsers(token)

  const users = usersData || []

  useEffect(() => {
    if (reportsData) setReports(reportsData)
  }, [reportsData])

  const handleSave = async () => {
    if (selectedReport) {
      setReports(reports.map((r) => (r.id === selectedReport.id ? { ...selectedReport, ...formData } : r)))
    } else {
      setReports([
        ...reports,
        {
          ...formData,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as EODReport,
      ])
    }
    setDialogOpen(false)
    setSelectedReport(undefined)
  }

  const handleDelete = (report: EODReport) => {
    setReports(reports.filter((r) => r.id !== report.id))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">EOD Reports</h2>
          <p className="text-muted-foreground">End of day progress reports</p>
        </div>
        <Button
          onClick={() => {
            setSelectedReport(undefined)
            setFormData({
              user_id: "",
              date: new Date().toISOString().split("T")[0],
              content: "",
              tasks_completed: 0,
              tasks_pending: 0,
              blockers: "",
            })
            setDialogOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Submit Report
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {reports.map((report) => {
            const user = users.find((u) => u.id === report.user_id)
            return (
              <Card key={report.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{user?.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{new Date(report.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedReport(report)
                          setFormData({
                            user_id: report.user_id,
                            date: report.date,
                            content: report.content,
                            tasks_completed: report.tasks_completed,
                            tasks_pending: report.tasks_pending,
                            blockers: report.blockers,
                          })
                          setDialogOpen(true)
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(report)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Progress</p>
                    <p className="text-sm text-muted-foreground">{report.content}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-green-50 p-2 rounded">
                      <p className="text-xs text-muted-foreground">Completed</p>
                      <p className="font-semibold text-green-600">{report.tasks_completed}</p>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded">
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="font-semibold text-yellow-600">{report.tasks_pending}</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded">
                      <p className="text-xs text-muted-foreground">Blockers</p>
                      <p className="text-xs text-red-600">{report.blockers || "None"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedReport ? "Edit Report" : "Submit EOD Report"}</DialogTitle>
            <DialogDescription>
              {selectedReport ? "Update report details" : "Submit your end of day report"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Employee</label>
              <Select value={formData.user_id} onValueChange={(value) => setFormData({ ...formData, user_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Progress & Activities</label>
              <Input
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="What did you accomplish today?"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium">Tasks Completed</label>
                <Input
                  type="number"
                  value={formData.tasks_completed}
                  onChange={(e) => setFormData({ ...formData, tasks_completed: Number.parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Tasks Pending</label>
                <Input
                  type="number"
                  value={formData.tasks_pending}
                  onChange={(e) => setFormData({ ...formData, tasks_pending: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Blockers</label>
              <Input
                value={formData.blockers}
                onChange={(e) => setFormData({ ...formData, blockers: e.target.value })}
                placeholder="Any blockers or challenges?"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
