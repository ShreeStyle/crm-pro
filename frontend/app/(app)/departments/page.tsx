"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { useDepartments, useUsers } from "@/lib/hooks/use-api"
import type { Department } from "@/lib/types/api"
import { DataTable } from "@/components/ui/data-table"
import { DepartmentDialog } from "@/components/departments/department-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function DepartmentsPage() {
  const { token } = useAuth()
  const [departments, setDepartments] = useState<Department[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDept, setSelectedDept] = useState<Department | undefined>()

  const { data: deptsData, isLoading } = useDepartments(token)
  const { data: usersData } = useUsers(token)

  const users = usersData || []

  useEffect(() => {
    if (deptsData) setDepartments(deptsData)
  }, [deptsData])

  const handleSave = async (data: any) => {
    if (selectedDept) {
      setDepartments(departments.map((d) => (d.id === selectedDept.id ? { ...selectedDept, ...data } : d)))
    } else {
      setDepartments([
        ...departments,
        {
          ...data,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
    }
    setSelectedDept(undefined)
  }

  const handleDelete = (dept: Department) => {
    setDepartments(departments.filter((d) => d.id !== dept.id))
  }

  const columns = [
    {
      id: "name",
      label: "Department Name",
      render: (dept: Department) => dept.name,
    },
    {
      id: "description",
      label: "Description",
      render: (dept: Department) => dept.description,
    },
    {
      id: "head",
      label: "Department Head",
      render: (dept: Department) => {
        const user = users.find((u) => u.id === dept.head_id)
        return user?.name || "-"
      },
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Departments</h2>
          <p className="text-muted-foreground">Manage organization departments</p>
        </div>
        <Button
          onClick={() => {
            setSelectedDept(undefined)
            setDialogOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={departments}
        loading={isLoading}
        onEdit={(dept) => {
          setSelectedDept(dept)
          setDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <DepartmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        department={selectedDept}
        users={users}
        onSave={handleSave}
      />
    </div>
  )
}
