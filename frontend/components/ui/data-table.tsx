"use client"

import type React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DataTableColumn<T> {
  id: string
  label: string
  render: (item: T) => React.ReactNode
  width?: string
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  loading?: boolean
  pageSize?: number
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  loading = false,
  pageSize = 10,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const [page, setPage] = useState(0)

  const start = page * pageSize
  const end = start + pageSize
  const pageData = data.slice(start, end)
  const totalPages = Math.ceil(data.length / pageSize)

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading...</div>
  }

  if (data.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No data found</div>
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              {columns.map((column) => (
                <TableHead key={column.id} className={column.width}>
                  {column.label}
                </TableHead>
              ))}
              {(onEdit || onDelete) && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                {columns.map((column) => (
                  <TableCell key={`${item.id}-${column.id}`}>{column.render(item)}</TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell className="text-right space-x-2">
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(item)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(item)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {page + 1} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
