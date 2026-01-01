"use client"

// Hook to check user permissions based on role
import { useAuth } from "@/lib/context/auth-context"
import type { PermissionSet } from "@/lib/types/api"

export function usePermissions(): PermissionSet {
  const { user, token } = useAuth()

  // For now, assume admin role (role_id: "1") has all permissions
  // This will be refined when backend returns actual role permissions
  const isAdmin = user?.role_id === "1"

  return {
    canViewDashboard: !!token,
    canManageUsers: isAdmin,
    canManageDepartments: isAdmin,
    canManageRoles: isAdmin,
    canManageSales: !!token,
    canManageLeads: !!token,
    canManageProjects: !!token,
    canManageTasks: !!token,
    canViewAttendance: !!token,
    canManageLeaves: !!token,
    canViewEODReports: !!token,
    canUploadData: !!token,
    canManageSettings: isAdmin,
  }
}
