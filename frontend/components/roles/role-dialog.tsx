"use client"

import { useState } from "react"
import type { Role, Permission } from "@/lib/types/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface RoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  role?: Role
  permissions: Permission[]
  onSave: (data: any) => Promise<void>
}

export function RoleDialog({ open, onOpenChange, role, permissions, onSave }: RoleDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(
    role || {
      name: "",
      description: "",
      permissions: [],
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

  const togglePermission = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }))
  }

  // Group permissions by module
  const groupedPermissions = permissions.reduce(
    (acc, perm) => {
      const module = perm.module || "Other"
      if (!acc[module]) acc[module] = []
      acc[module].push(perm)
      return acc
    },
    {} as Record<string, Permission[]>,
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{role ? "Edit Role" : "Create Role"}</DialogTitle>
          <DialogDescription>
            {role ? "Update role details and permissions" : "Add a new role with specific permissions"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Role Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Manager, Admin"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Role description"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">Permissions</label>
            <div className="space-y-3">
              {Object.entries(groupedPermissions).map(([module, perms]) => (
                <div key={module} className="border rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-2 capitalize">{module}</h4>
                  <div className="space-y-2">
                    {perms.map((perm) => (
                      <div key={perm.id} className="flex items-center gap-2">
                        <Checkbox
                          id={perm.id}
                          checked={formData.permissions.includes(perm.id)}
                          onCheckedChange={() => togglePermission(perm.id)}
                        />
                        <label htmlFor={perm.id} className="text-sm cursor-pointer flex items-center gap-2">
                          <span>{perm.name}</span>
                          <span className="text-xs text-muted-foreground">({perm.description})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
