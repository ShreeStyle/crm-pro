"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { useUsers, useDepartments, useRoles } from "@/lib/hooks/use-api"
import type { User } from "@/lib/types/api"
import { DataTable } from "@/components/ui/data-table"
import { UserDialog } from "@/components/users/user-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function UsersPage() {
  const { token } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | undefined>()

  const { data: usersData, isLoading: usersLoading } = useUsers(token)
  const { data: deptsData } = useDepartments(token)
  const { data: rolesData } = useRoles(token)

  const departments = deptsData || []
  const roles = rolesData || []

  useEffect(() => {
    if (usersData) setUsers(usersData)
  }, [usersData])

  const handleSave = async (data: any) => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === selectedUser.id ? { ...selectedUser, ...data } : u)))
    } else {
      setUsers([
        ...users,
        {
          ...data,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
    }
    setSelectedUser(undefined)
  }

  const handleDelete = (user: User) => {
    setUsers(users.filter((u) => u.id !== user.id))
  }

  const columns = [
    {
      id: "name",
      label: "Name",
      render: (user: User) => user.name,
    },
    {
      id: "email",
      label: "Email",
      render: (user: User) => user.email,
    },
    {
      id: "designation",
      label: "Designation",
      render: (user: User) => user.designation,
    },
    {
      id: "department",
      label: "Department",
      render: (user: User) => {
        const dept = departments.find((d) => d.id === user.department_id)
        return dept?.name || "-"
      },
    },
    {
      id: "role",
      label: "Role",
      render: (user: User) => {
        const role = roles.find((r) => r.id === user.role_id)
        return role?.name || "-"
      },
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Users</h2>
          <p className="text-muted-foreground">Manage system users and their roles</p>
        </div>
        <Button
          onClick={() => {
            setSelectedUser(undefined)
            setDialogOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        loading={usersLoading}
        onEdit={(user) => {
          setSelectedUser(user)
          setDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <UserDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        user={selectedUser}
        departments={departments}
        roles={roles}
        onSave={handleSave}
      />
    </div>
  )
}
