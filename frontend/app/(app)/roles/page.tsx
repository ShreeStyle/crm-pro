"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { useRoles, usePermissions } from "@/lib/hooks/use-api"
import type { Role } from "@/lib/types/api"
import { DataTable } from "@/components/ui/data-table"
import { RoleDialog } from "@/components/roles/role-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function RolesPage() {
  const { token } = useAuth()
  const [roles, setRoles] = useState<Role[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | undefined>()

  const { data: rolesData, isLoading } = useRoles(token)
  const { data: permsData } = usePermissions(token)

  const permissions = permsData || []

  useEffect(() => {
    if (rolesData) setRoles(rolesData)
  }, [rolesData])

  const handleSave = async (data: any) => {
    if (selectedRole) {
      setRoles(roles.map((r) => (r.id === selectedRole.id ? { ...selectedRole, ...data } : r)))
    } else {
      setRoles([
        ...roles,
        {
          ...data,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
    }
    setSelectedRole(undefined)
  }

  const handleDelete = (role: Role) => {
    setRoles(roles.filter((r) => r.id !== role.id))
  }

  const columns = [
    {
      id: "name",
      label: "Role Name",
      render: (role: Role) => role.name,
    },
    {
      id: "description",
      label: "Description",
      render: (role: Role) => role.description,
    },
    {
      id: "permissions",
      label: "Permissions",
      render: (role: Role) => `${role.permissions.length} permissions`,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Roles & Permissions</h2>
          <p className="text-muted-foreground">Define roles and manage permissions</p>
        </div>
        <Button
          onClick={() => {
            setSelectedRole(undefined)
            setDialogOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Role
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={roles}
        loading={isLoading}
        onEdit={(role) => {
          setSelectedRole(role)
          setDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <RoleDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        role={selectedRole}
        permissions={permissions}
        onSave={handleSave}
      />
    </div>
  )
}
