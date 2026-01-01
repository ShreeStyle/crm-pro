"use client"

import useSWR from "swr"
import { mockService } from "@/lib/services/mock-service"

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false"

export function useDashboardMetrics(token: string | null) {
  return useSWR(
    token ? "dashboard-metrics" : null,
    () => {
      if (USE_MOCK) {
        return mockService.mockGetDashboardMetrics()
      }
      return mockService.mockGetDashboardMetrics()
    },
    { revalidateOnFocus: false },
  )
}

export function useUsers(token: string | null) {
  return useSWR(
    token ? "users" : null,
    () => {
      if (USE_MOCK) {
        return mockService.mockGetUsers().users
      }
      return mockService.mockGetUsers().users
    },
    { revalidateOnFocus: false },
  )
}

export function useDepartments(token: string | null) {
  return useSWR(
    token ? "departments" : null,
    () => {
      if (USE_MOCK) {
        return mockService.mockGetDepartments()
      }
      return mockService.mockGetDepartments()
    },
    { revalidateOnFocus: false },
  )
}

export function useRoles(token: string | null) {
  return useSWR(
    token ? "roles" : null,
    () => {
      if (USE_MOCK) {
        return mockService.mockGetRoles()
      }
      return mockService.mockGetRoles()
    },
    { revalidateOnFocus: false },
  )
}

export function usePermissions(token: string | null) {
  return useSWR(
    token ? "permissions" : null,
    () => {
      if (USE_MOCK) {
        return mockService.mockGetPermissions()
      }
      return mockService.mockGetPermissions()
    },
    { revalidateOnFocus: false },
  )
}

export function useSales(token: string | null) {
  return useSWR(
    token ? "sales" : null,
    () => {
      if (USE_MOCK) {
        return mockService.mockGetSales().items
      }
      return mockService.mockGetSales().items
    },
    { revalidateOnFocus: false },
  )
}

export function useLeads(token: string | null) {
  return useSWR(
    token ? "leads" : null,
    () => {
      if (USE_MOCK) {
        return mockService.mockGetLeads().items
      }
      return mockService.mockGetLeads().items
    },
    { revalidateOnFocus: false },
  )
}

export function useProjects(token: string | null) {
  return useSWR(
    token ? "projects" : null,
    () => {
      if (USE_MOCK) {
        return mockService.mockGetProjects().items
      }
      return mockService.mockGetProjects().items
    },
    { revalidateOnFocus: false },
  )
}

export function useTasks(token: string | null) {
  return useSWR(
    token ? "tasks" : null,
    () => {
      if (USE_MOCK) {
        return mockService.mockGetTasks().items
      }
      return mockService.mockGetTasks().items
    },
    { revalidateOnFocus: false },
  )
}

export function useAttendance(token: string | null) {
  return useSWR(
    token ? "attendance" : null,
    () => {
      if (USE_MOCK) {
        return mockService.mockGetAttendance()
      }
      return mockService.mockGetAttendance()
    },
    { revalidateOnFocus: false },
  )
}

export function useLeaves(token: string | null) {
  return useSWR(
    token ? "leaves" : null,
    () => {
      if (USE_MOCK) {
        return mockService.mockGetLeaves().items
      }
      return mockService.mockGetLeaves().items
    },
    { revalidateOnFocus: false },
  )
}

export function useEodReports(token: string | null) {
  return useSWR(
    token ? "eod-reports" : null,
    () => {
      if (USE_MOCK) {
        return mockService.mockGetEodReports().items
      }
      return mockService.mockGetEodReports().items
    },
    { revalidateOnFocus: false },
  )
}

export function useDataUploads(token: string | null) {
  return useSWR(
    token ? "data-uploads" : null,
    () => {
      if (USE_MOCK) {
        return mockService.mockGetDataUploads()
      }
      return mockService.mockGetDataUploads()
    },
    { revalidateOnFocus: false },
  )
}
