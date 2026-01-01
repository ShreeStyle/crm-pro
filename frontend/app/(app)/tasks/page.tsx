"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { useTasks, useProjects, useUsers } from "@/lib/hooks/use-api"
import type { Task } from "@/lib/types/api"
import { DataTable } from "@/components/ui/data-table"
import { TaskDialog } from "@/components/tasks/task-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function TasksPage() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | undefined>()

  const { data: tasksData, isLoading } = useTasks(token)
  const { data: projectsData } = useProjects(token)
  const { data: usersData } = useUsers(token)

  const projects = projectsData || []
  const users = usersData || []

  useEffect(() => {
    if (tasksData) setTasks(tasksData)
  }, [tasksData])

  const handleSave = async (data: any) => {
    if (selectedTask) {
      setTasks(tasks.map((t) => (t.id === selectedTask.id ? { ...selectedTask, ...data } : t)))
    } else {
      setTasks([
        ...tasks,
        {
          ...data,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
    }
    setSelectedTask(undefined)
  }

  const handleDelete = (task: Task) => {
    setTasks(tasks.filter((t) => t.id !== task.id))
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      todo: "bg-gray-100 text-gray-800",
      in_progress: "bg-blue-100 text-blue-800",
      in_review: "bg-purple-100 text-purple-800",
      completed: "bg-green-100 text-green-800",
      blocked: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "text-green-600",
      medium: "text-yellow-600",
      high: "text-orange-600",
      critical: "text-red-600",
    }
    return colors[priority] || "text-gray-600"
  }

  const columns = [
    {
      id: "title",
      label: "Title",
      render: (task: Task) => task.title,
    },
    {
      id: "project",
      label: "Project",
      render: (task: Task) => {
        const project = projects.find((p) => p.id === task.project_id)
        return project?.name || "-"
      },
    },
    {
      id: "assigned",
      label: "Assigned To",
      render: (task: Task) => {
        const user = users.find((u) => u.id === task.assigned_to)
        return user?.name || "-"
      },
    },
    {
      id: "priority",
      label: "Priority",
      render: (task: Task) => (
        <span className={`font-medium ${getPriorityColor(task.priority)}`}>{task.priority.toUpperCase()}</span>
      ),
    },
    {
      id: "status",
      label: "Status",
      render: (task: Task) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status.replace("_", " ").toUpperCase()}
        </span>
      ),
    },
    {
      id: "due_date",
      label: "Due Date",
      render: (task: Task) => new Date(task.due_date).toLocaleDateString(),
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Tasks</h2>
          <p className="text-muted-foreground">Manage and track tasks</p>
        </div>
        <Button
          onClick={() => {
            setSelectedTask(undefined)
            setDialogOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={tasks}
        loading={isLoading}
        onEdit={(task) => {
          setSelectedTask(task)
          setDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={selectedTask}
        projects={projects}
        users={users}
        onSave={handleSave}
      />
    </div>
  )
}
