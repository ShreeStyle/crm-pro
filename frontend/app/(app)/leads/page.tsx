"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { useLeads, useUsers } from "@/lib/hooks/use-api"
import type { Lead } from "@/lib/types/api"
import { DataTable } from "@/components/ui/data-table"
import { LeadDialog } from "@/components/leads/lead-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function LeadsPage() {
  const { token } = useAuth()
  const [leads, setLeads] = useState<Lead[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>()

  const { data: leadsData, isLoading } = useLeads(token)
  const { data: usersData } = useUsers(token)

  const users = usersData || []

  useEffect(() => {
    if (leadsData) setLeads(leadsData)
  }, [leadsData])

  const handleSave = async (data: any) => {
    if (selectedLead) {
      setLeads(leads.map((l) => (l.id === selectedLead.id ? { ...selectedLead, ...data } : l)))
    } else {
      setLeads([
        ...leads,
        {
          ...data,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
    }
    setSelectedLead(undefined)
  }

  const handleDelete = (lead: Lead) => {
    setLeads(leads.filter((l) => l.id !== lead.id))
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: "bg-gray-100 text-gray-800",
      contacted: "bg-blue-100 text-blue-800",
      qualified: "bg-yellow-100 text-yellow-800",
      converted: "bg-green-100 text-green-800",
      lost: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const columns = [
    {
      id: "name",
      label: "Name",
      render: (lead: Lead) => lead.name,
    },
    {
      id: "company",
      label: "Company",
      render: (lead: Lead) => lead.company,
    },
    {
      id: "email",
      label: "Email",
      render: (lead: Lead) => lead.email,
    },
    {
      id: "status",
      label: "Status",
      render: (lead: Lead) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
          {lead.status.replace("_", " ").toUpperCase()}
        </span>
      ),
    },
    {
      id: "source",
      label: "Source",
      render: (lead: Lead) => lead.source.replace("_", " "),
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Leads</h2>
          <p className="text-muted-foreground">Manage and track leads</p>
        </div>
        <Button
          onClick={() => {
            setSelectedLead(undefined)
            setDialogOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={leads}
        loading={isLoading}
        onEdit={(lead) => {
          setSelectedLead(lead)
          setDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <LeadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        lead={selectedLead}
        users={users}
        onSave={handleSave}
      />
    </div>
  )
}
