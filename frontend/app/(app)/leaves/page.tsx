"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { useLeaves, useUsers } from "@/lib/hooks/use-api"
import type { LeaveRequest } from "@/lib/types/api"
import { DataTable } from "@/components/ui/data-table"
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

const LEAVE_TYPES = ["annual", "sick", "personal", "other"]

export default function LeavesPage() {
  const { token } = useAuth()
  const [leaves, setLeaves] = useState<LeaveRequest[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | undefined>()
  const [formData, setFormData] = useState({
    user_id: "",
    start_date: "",
    end_date: "",
    reason: "",
    leave_type: "annual",
  })

  const { data: leavesData, isLoading } = useLeaves(token)
  const { data: usersData } = useUsers(token)

  const users = usersData || []

  useEffect(() => {
    if (leavesData) setLeaves(leavesData)
  }, [leavesData])

  const handleSave = async () => {
    if (selectedLeave) {
      setLeaves(leaves.map((l) => (l.id === selectedLeave.id ? { ...selectedLeave, ...formData } : l)))
    } else {
      setLeaves([
        ...leaves,
        {
          ...formData,
          id: Date.now().toString(),
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as LeaveRequest,
      ])
    }
    setDialogOpen(false)
    setSelectedLeave(undefined)
  }

  const handleDelete = (leave: LeaveRequest) => {
    setLeaves(leaves.filter((l) => l.id !== leave.id))
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const columns = [
    {
      id: "user",
      label: "Employee",
      render: (leave: LeaveRequest) => {
        const user = users.find((u) => u.id === leave.user_id)
        return user?.name || "-"
      },
    },
    {
      id: "dates",
      label: "Date Range",
      render: (leave: LeaveRequest) =>
        `${new Date(leave.start_date).toLocaleDateString()} - ${new Date(leave.end_date).toLocaleDateString()}`,
    },
    {
      id: "type",
      label: "Type",
      render: (leave: LeaveRequest) => leave.leave_type.replace("_", " ").toUpperCase(),
    },
    {
      id: "reason",
      label: "Reason",
      render: (leave: LeaveRequest) => leave.reason,
    },
    {
      id: "status",
      label: "Status",
      render: (leave: LeaveRequest) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
          {leave.status.toUpperCase()}
        </span>
      ),
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Leaves</h2>
          <p className="text-muted-foreground">Manage leave requests</p>
        </div>
        <Button
          onClick={() => {
            setSelectedLeave(undefined)
            setFormData({ user_id: "", start_date: "", end_date: "", reason: "", leave_type: "annual" })
            setDialogOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Request Leave
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={leaves}
        loading={isLoading}
        onEdit={(leave) => {
          setSelectedLeave(leave)
          setFormData({
            user_id: leave.user_id,
            start_date: leave.start_date,
            end_date: leave.end_date,
            reason: leave.reason,
            leave_type: leave.leave_type,
          })
          setDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedLeave ? "Edit Leave" : "Request Leave"}</DialogTitle>
            <DialogDescription>
              {selectedLeave ? "Update leave request" : "Submit a new leave request"}
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

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">End Date</label>
                <Input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Leave Type</label>
              <Select
                value={formData.leave_type}
                onValueChange={(value) => setFormData({ ...formData, leave_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {LEAVE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace("_", " ").toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Reason</label>
              <Input
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Reason for leave"
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
