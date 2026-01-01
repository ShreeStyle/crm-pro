"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { useDataUploads } from "@/lib/hooks/use-api"
import type { DataUpload } from "@/lib/types/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DataUploadPage() {
  const { token } = useAuth()
  const [uploads, setUploads] = useState<DataUpload[]>([])
  const [uploading, setUploading] = useState(false)

  const { data: uploadsData, isLoading } = useDataUploads(token)

  useEffect(() => {
    if (uploadsData) setUploads(uploadsData)
  }, [uploadsData])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !token) return

    setUploading(true)
    for (const file of Array.from(files)) {
      // Mock upload
      setUploads([
        ...uploads,
        {
          id: Date.now().toString(),
          user_id: "1",
          file_name: file.name,
          file_url: "#",
          file_type: file.type,
          uploaded_at: new Date().toISOString(),
          status: "completed",
        },
      ])
    }
    setUploading(false)
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      processing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Data Upload</h2>
        <p className="text-muted-foreground">Upload and manage data files</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upload Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <label className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">CSV, XLS, JSON files up to 10MB</p>
              <Input type="file" multiple onChange={handleFileUpload} disabled={uploading} className="hidden" />
            </label>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : uploads.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No uploads yet</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {uploads.map((upload) => (
              <Card key={upload.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{upload.file_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(upload.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(upload.status)}`}>
                      {upload.status.toUpperCase()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
