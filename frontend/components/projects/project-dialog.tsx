"use client"

import { useState } from "react"
import type { Project, User } from "@/lib/types/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const PROJECT_STATUSES = ["planning", "in_progress", "on_hold", "completed", "cancelled"]

interface ProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: Project
  users: User[]
  onSave: (data: any) => Promise<void>
}

export function ProjectDialog({ open, onOpenChange, project, users, onSave }: ProjectDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(
    project || {
      name: "",
      description: "",
      status: "planning",
      start_date: "",
      end_date: "",
      manager_id: "",
    },
  )

  const handleSave = async () => {
    setLoading(true)
    try {
      await onSave(formData)
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Create Project"}</DialogTitle>
          <DialogDescription>{project ? "Update project details" : "Create a new project"}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Project Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Project name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Project description"
            />
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
            <label className="text-sm font-medium">Project Manager</label>
            <Select
              value={formData.manager_id}
              onValueChange={(value) => setFormData({ ...formData, manager_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select manager" />
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
            <label className="text-sm font-medium">Status</label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replace("_", " ").toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
