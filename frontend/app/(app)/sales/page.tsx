"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { useSales } from "@/lib/hooks/use-api"
import type { Sale } from "@/lib/types/api"
import { DataTable } from "@/components/ui/data-table"
import { SaleDialog } from "@/components/sales/sale-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function SalesPage() {
  const { token } = useAuth()
  const [sales, setSales] = useState<Sale[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState<Sale | undefined>()

  const { data: salesData, isLoading } = useSales(token)

  useEffect(() => {
    if (salesData) setSales(salesData)
  }, [salesData])

  const handleSave = async (data: any) => {
    if (selectedSale) {
      setSales(sales.map((s) => (s.id === selectedSale.id ? { ...selectedSale, ...data } : s)))
    } else {
      setSales([
        ...sales,
        {
          ...data,
          id: Date.now().toString(),
          user_id: "1",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
    }
    setSelectedSale(undefined)
  }

  const handleDelete = (sale: Sale) => {
    setSales(sales.filter((s) => s.id !== sale.id))
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const columns = [
    {
      id: "title",
      label: "Title",
      render: (sale: Sale) => sale.title,
    },
    {
      id: "amount",
      label: "Amount",
      render: (sale: Sale) => `$${sale.amount.toLocaleString()}`,
    },
    {
      id: "status",
      label: "Status",
      render: (sale: Sale) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
          {sale.status.replace("_", " ").toUpperCase()}
        </span>
      ),
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Sales</h2>
          <p className="text-muted-foreground">Track and manage sales records</p>
        </div>
        <Button
          onClick={() => {
            setSelectedSale(undefined)
            setDialogOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Sale
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={sales}
        loading={isLoading}
        onEdit={(sale) => {
          setSelectedSale(sale)
          setDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <SaleDialog open={dialogOpen} onOpenChange={setDialogOpen} sale={selectedSale} onSave={handleSave} />
    </div>
  )
}
