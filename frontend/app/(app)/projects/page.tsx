"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { useProjects, useUsers } from "@/lib/hooks/use-api"
import type { Project } from "@/lib/types/api"
import { DataTable } from "@/components/ui/data-table"
import { ProjectDialog } from "@/components/projects/project-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ProjectsPage() {
  const { token } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | undefined>()

  const { data: projectsData, isLoading } = useProjects(token)
  const { data: usersData } = useUsers(token)

  const users = usersData || []

  useEffect(() => {
    if (projectsData) setProjects(projectsData)
  }, [projectsData])

  const handleSave = async (data: any) => {
    if (selectedProject) {
      setProjects(projects.map((p) => (p.id === selectedProject.id ? { ...selectedProject, ...data } : p)))
    } else {
      setProjects([
        ...projects,
        {
          ...data,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
    }
    setSelectedProject(undefined)
  }

  const handleDelete = (project: Project) => {
    setProjects(projects.filter((p) => p.id !== project.id))
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      planning: "bg-gray-100 text-gray-800",
      in_progress: "bg-blue-100 text-blue-800",
      on_hold: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const columns = [
    {
      id: "name",
      label: "Project Name",
      render: (project: Project) => project.name,
    },
    {
      id: "description",
      label: "Description",
      render: (project: Project) => project.description,
    },
    {
      id: "manager",
      label: "Manager",
      render: (project: Project) => {
        const user = users.find((u) => u.id === project.manager_id)
        return user?.name || "-"
      },
    },
    {
      id: "dates",
      label: "Timeline",
      render: (project: Project) =>
        `${new Date(project.start_date).toLocaleDateString()} - ${new Date(project.end_date).toLocaleDateString()}`,
    },
    {
      id: "status",
      label: "Status",
      render: (project: Project) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status.replace("_", " ").toUpperCase()}
        </span>
      ),
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Projects</h2>
          <p className="text-muted-foreground">Manage and track projects</p>
        </div>
        <Button
          onClick={() => {
            setSelectedProject(undefined)
            setDialogOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={projects}
        loading={isLoading}
        onEdit={(project) => {
          setSelectedProject(project)
          setDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        project={selectedProject}
        users={users}
        onSave={handleSave}
      />
    </div>
  )
}
