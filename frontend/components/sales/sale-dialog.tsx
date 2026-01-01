"use client"

import { useState } from "react"
import type { Sale } from "@/lib/types/api"
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

const SALE_STATUSES = ["pending", "in_progress", "completed", "cancelled"]

interface SaleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sale?: Sale
  onSave: (data: any) => Promise<void>
}

export function SaleDialog({ open, onOpenChange, sale, onSave }: SaleDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(
    sale || {
      title: "",
      description: "",
      amount: 0,
      status: "pending",
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
          <DialogTitle>{sale ? "Edit Sale" : "Create Sale"}</DialogTitle>
          <DialogDescription>{sale ? "Update sale details" : "Record a new sale"}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Sale title"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Sale description"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Amount ($)</label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number.parseFloat(e.target.value) })}
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {SALE_STATUSES.map((status) => (
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
