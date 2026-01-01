"use client"

import { useState } from "react"
import type { Lead, User } from "@/lib/types/api"
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

const LEAD_STATUSES = ["new", "contacted", "qualified", "converted", "lost"]
const LEAD_SOURCES = ["website", "referral", "cold_call", "event", "social_media", "email"]

interface LeadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead?: Lead
  users: User[]
  onSave: (data: any) => Promise<void>
}

export function LeadDialog({ open, onOpenChange, lead, users, onSave }: LeadDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(
    lead || {
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "new",
      source: "website",
      assigned_to: "",
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
          <DialogTitle>{lead ? "Edit Lead" : "Create Lead"}</DialogTitle>
          <DialogDescription>{lead ? "Update lead details" : "Add a new lead"}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Lead name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@company.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1-555-0000"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Company</label>
            <Input
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {LEAD_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replace("_", " ").toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Source</label>
            <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                {LEAD_SOURCES.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source.replace("_", " ").toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Assigned To</label>
            <Select
              value={formData.assigned_to}
              onValueChange={(value) => setFormData({ ...formData, assigned_to: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select user" />
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
