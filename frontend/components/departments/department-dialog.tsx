"use client"

import { useState } from "react"
import type { Department, User } from "@/lib/types/api"
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

interface DepartmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  department?: Department
  users: User[]
  onSave: (data: any) => Promise<void>
}

export function DepartmentDialog({ open, onOpenChange, department, users, onSave }: DepartmentDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(
    department || {
      name: "",
      description: "",
      head_id: "",
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
          <DialogTitle>{department ? "Edit Department" : "Create Department"}</DialogTitle>
          <DialogDescription>{department ? "Update department details" : "Add a new department"}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Department Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Sales, Engineering"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Department description"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Department Head</label>
            <Select value={formData.head_id} onValueChange={(value) => setFormData({ ...formData, head_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select department head" />
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
