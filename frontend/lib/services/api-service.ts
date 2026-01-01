// Base API service for making requests
import type {
  LoginRequest,
  LoginResponse,
  DashboardMetrics,
  UserListResponse,
  User,
  Department,
  Role,
  Permission,
  Sale,
  Lead,
  Project,
  Task,
  AttendanceRecord,
  LeaveRequest,
  EODReport,
  DataUpload,
} from "@/lib/types/api"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  body?: any
  headers?: Record<string, string>
  token?: string
}

async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {}, token } = options

  const url = `${BASE_URL}${endpoint}`
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  }

  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `API error: ${response.status}`)
  }

  return response.json()
}

export const apiService = {
  // Authentication
  login: (data: LoginRequest) => apiRequest<LoginResponse>("/auth/login", { method: "POST", body: data }),

  // Dashboard
  getDashboardMetrics: (token: string) => apiRequest<DashboardMetrics>("/dashboard/metrics", { token }),

  // Users
  getUsers: (token: string, page = 1, limit = 10) =>
    apiRequest<UserListResponse>(`/users?page=${page}&limit=${limit}`, { token }),
  getUserById: (token: string, id: string) => apiRequest<User>(`/users/${id}`, { token }),
  createUser: (token: string, data: any) => apiRequest<User>("/users", { method: "POST", body: data, token }),
  updateUser: (token: string, id: string, data: any) =>
    apiRequest<User>(`/users/${id}`, { method: "PUT", body: data, token }),
  deleteUser: (token: string, id: string) => apiRequest<void>(`/users/${id}`, { method: "DELETE", token }),

  // Departments
  getDepartments: (token: string) => apiRequest<Department[]>("/departments", { token }),
  getDepartmentById: (token: string, id: string) => apiRequest<Department>(`/departments/${id}`, { token }),
  createDepartment: (token: string, data: any) =>
    apiRequest<Department>("/departments", { method: "POST", body: data, token }),
  updateDepartment: (token: string, id: string, data: any) =>
    apiRequest<Department>(`/departments/${id}`, { method: "PUT", body: data, token }),
  deleteDepartment: (token: string, id: string) => apiRequest<void>(`/departments/${id}`, { method: "DELETE", token }),

  // Roles
  getRoles: (token: string) => apiRequest<Role[]>("/roles", { token }),
  getRoleById: (token: string, id: string) => apiRequest<Role>(`/roles/${id}`, { token }),
  createRole: (token: string, data: any) => apiRequest<Role>("/roles", { method: "POST", body: data, token }),
  updateRole: (token: string, id: string, data: any) =>
    apiRequest<Role>(`/roles/${id}`, { method: "PUT", body: data, token }),
  deleteRole: (token: string, id: string) => apiRequest<void>(`/roles/${id}`, { method: "DELETE", token }),

  // Permissions
  getPermissions: (token: string) => apiRequest<Permission[]>("/permissions", { token }),

  // Sales
  getSales: (token: string, page = 1, limit = 10) =>
    apiRequest<{ items: Sale[]; total: number }>(`/sales?page=${page}&limit=${limit}`, { token }),
  getSaleById: (token: string, id: string) => apiRequest<Sale>(`/sales/${id}`, { token }),
  createSale: (token: string, data: any) => apiRequest<Sale>("/sales", { method: "POST", body: data, token }),
  updateSale: (token: string, id: string, data: any) =>
    apiRequest<Sale>(`/sales/${id}`, { method: "PUT", body: data, token }),
  deleteSale: (token: string, id: string) => apiRequest<void>(`/sales/${id}`, { method: "DELETE", token }),

  // Leads
  getLeads: (token: string, page = 1, limit = 10) =>
    apiRequest<{ items: Lead[]; total: number }>(`/leads?page=${page}&limit=${limit}`, { token }),
  getLeadById: (token: string, id: string) => apiRequest<Lead>(`/leads/${id}`, { token }),
  createLead: (token: string, data: any) => apiRequest<Lead>("/leads", { method: "POST", body: data, token }),
  updateLead: (token: string, id: string, data: any) =>
    apiRequest<Lead>(`/leads/${id}`, { method: "PUT", body: data, token }),
  deleteLead: (token: string, id: string) => apiRequest<void>(`/leads/${id}`, { method: "DELETE", token }),

  // Projects
  getProjects: (token: string, page = 1, limit = 10) =>
    apiRequest<{ items: Project[]; total: number }>(`/projects?page=${page}&limit=${limit}`, { token }),
  getProjectById: (token: string, id: string) => apiRequest<Project>(`/projects/${id}`, { token }),
  createProject: (token: string, data: any) => apiRequest<Project>("/projects", { method: "POST", body: data, token }),
  updateProject: (token: string, id: string, data: any) =>
    apiRequest<Project>(`/projects/${id}`, { method: "PUT", body: data, token }),
  deleteProject: (token: string, id: string) => apiRequest<void>(`/projects/${id}`, { method: "DELETE", token }),

  // Tasks
  getTasks: (token: string, page = 1, limit = 10) =>
    apiRequest<{ items: Task[]; total: number }>(`/tasks?page=${page}&limit=${limit}`, { token }),
  getTaskById: (token: string, id: string) => apiRequest<Task>(`/tasks/${id}`, { token }),
  createTask: (token: string, data: any) => apiRequest<Task>("/tasks", { method: "POST", body: data, token }),
  updateTask: (token: string, id: string, data: any) =>
    apiRequest<Task>(`/tasks/${id}`, { method: "PUT", body: data, token }),
  deleteTask: (token: string, id: string) => apiRequest<void>(`/tasks/${id}`, { method: "DELETE", token }),

  // Attendance
  getAttendance: (token: string, date?: string) =>
    apiRequest<AttendanceRecord[]>(`/attendance${date ? `?date=${date}` : ""}`, { token }),
  recordAttendance: (token: string, data: any) =>
    apiRequest<AttendanceRecord>("/attendance", { method: "POST", body: data, token }),
  updateAttendance: (token: string, id: string, data: any) =>
    apiRequest<AttendanceRecord>(`/attendance/${id}`, { method: "PUT", body: data, token }),

  // Leaves
  getLeaves: (token: string, page = 1, limit = 10) =>
    apiRequest<{ items: LeaveRequest[]; total: number }>(`/leaves?page=${page}&limit=${limit}`, { token }),
  getLeaveById: (token: string, id: string) => apiRequest<LeaveRequest>(`/leaves/${id}`, { token }),
  requestLeave: (token: string, data: any) =>
    apiRequest<LeaveRequest>("/leaves", { method: "POST", body: data, token }),
  updateLeave: (token: string, id: string, data: any) =>
    apiRequest<LeaveRequest>(`/leaves/${id}`, { method: "PUT", body: data, token }),

  // EOD Reports
  getEODReports: (token: string, page = 1, limit = 10) =>
    apiRequest<{ items: EODReport[]; total: number }>(`/eod-reports?page=${page}&limit=${limit}`, { token }),
  getEODReportById: (token: string, id: string) => apiRequest<EODReport>(`/eod-reports/${id}`, { token }),
  submitEODReport: (token: string, data: any) =>
    apiRequest<EODReport>("/eod-reports", { method: "POST", body: data, token }),
  updateEODReport: (token: string, id: string, data: any) =>
    apiRequest<EODReport>(`/eod-reports/${id}`, { method: "PUT", body: data, token }),

  // Data Upload
  uploadData: (token: string, file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    return fetch(`${BASE_URL}/data-upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }).then((res) => {
      if (!res.ok) throw new Error("Upload failed")
      return res.json()
    })
  },

  getUploadedData: (token: string) => apiRequest<DataUpload[]>("/data-upload", { token }),
}
